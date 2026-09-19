import { Router, type IRouter } from "express";
import { count, avg, gt, eq } from "drizzle-orm";
import {
  db,
  usersTable,
  lessonProgressTable,
  lessonsTable,
  unitsTable,
} from "@indilingo/db";

const router: IRouter = Router();

/**
 * GET /stats/overview
 * Platform-wide aggregate analytics — total users, completions, avg XP, active streaks.
 * Sourced from Indore02 (distinct contribution: platform analytics not present in other builds).
 */
router.get("/stats/overview", async (req, res): Promise<void> => {
  const [[userStats], [completionStats], [activeStreakCount]] = await Promise.all([
    db.select({ totalUsers: count(usersTable.id), avgXp: avg(usersTable.xp) }).from(usersTable),
    db.select({ totalCompletions: count(lessonProgressTable.id) }).from(lessonProgressTable),
    db
      .select({ activeStreaks: count(usersTable.id) })
      .from(usersTable)
      .where(gt(usersTable.streak, 0)),
  ]);

  res.json({
    totalUsers: Number(userStats?.totalUsers ?? 0),
    totalCompletions: Number(completionStats?.totalCompletions ?? 0),
    avgXp: Math.round(Number(userStats?.avgXp ?? 0)),
    activeStreaks: Number(activeStreakCount?.activeStreaks ?? 0),
  });
});

/**
 * GET /stats/unit-progress
 * Per-unit completion rates across all users — for platform analytics dashboards.
 * Sourced from Indore02 (distinct contribution: platform-wide unit breakdown).
 */
router.get("/stats/unit-progress", async (req, res): Promise<void> => {
  // All units with their lesson counts
  const units = await db.select().from(unitsTable).orderBy(unitsTable.order);
  const lessons = await db.select().from(lessonsTable);
  const completions = await db.select().from(lessonProgressTable);

  // Build maps for fast lookup
  const lessonsByUnit = new Map<string, string[]>();
  for (const l of lessons) {
    const arr = lessonsByUnit.get(l.unitId) ?? [];
    arr.push(l.id);
    lessonsByUnit.set(l.unitId, arr);
  }

  const completionsByLesson = new Map<string, number>();
  for (const c of completions) {
    completionsByLesson.set(c.lessonId, (completionsByLesson.get(c.lessonId) ?? 0) + 1);
  }

  const result = units.map((unit) => {
    const unitLessons = lessonsByUnit.get(unit.id) ?? [];
    const totalLessons = unitLessons.length;
    const totalCompletions = unitLessons.reduce(
      (sum, lid) => sum + (completionsByLesson.get(lid) ?? 0),
      0,
    );
    return {
      unitId: unit.id,
      unitTitle: unit.title,
      totalLessons,
      totalCompletions,
      completionRate: totalLessons > 0 ? Math.round((totalCompletions / totalLessons) * 100) : 0,
    };
  });

  res.json(result);
});

export default router;
