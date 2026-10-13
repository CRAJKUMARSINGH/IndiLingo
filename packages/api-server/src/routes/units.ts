import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, unitsTable, lessonsTable, lessonProgressTable } from "@indilingo/db";
import {
  GetLanguageUnitsParams,
  GetLanguageUnitsResponse,
  GetUserLanguageUnitsParams,
  GetUserLanguageUnitsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function getUnitsForLanguage(languageId: string, userId?: string) {
  const units = await db
    .select()
    .from(unitsTable)
    .where(eq(unitsTable.languageId, languageId))
    .orderBy(unitsTable.order);

  const [allLessons, allProgress] = await Promise.all([
    db.select().from(lessonsTable).orderBy(lessonsTable.order),
    userId
      ? db.select().from(lessonProgressTable).where(eq(lessonProgressTable.userId, userId))
      : Promise.resolve([]),
  ]);

  const unitIds = new Set(units.map((u) => u.id));
  const relevantLessons = allLessons.filter((l) => unitIds.has(l.unitId));

  const progressMap = new Map(allProgress.map((p) => [p.lessonId, p]));

  return units.map((unit) => {
    const lessons = relevantLessons
      .filter((lesson) => lesson.unitId === unit.id)
      .map((lesson) => {
        const progress = progressMap.get(lesson.id);
        return {
          id: lesson.id,
          unitId: lesson.unitId,
          title: lesson.title,
          orderIndex: lesson.order,
          xpReward: lesson.xpReward,
          stars: progress?.stars ?? null,
          completed: Boolean(progress),
        };
      });

    return {
      id: unit.id,
      languageId: unit.languageId,
      title: unit.title,
      description: unit.description,
      orderIndex: unit.order,
      unitType: unit.unitType,
      lessons,
      completedLessons: lessons.filter((lesson) => lesson.completed).length,
      totalLessons: lessons.length,
    };
  });
}

router.get("/languages/:languageId/units", async (req, res): Promise<void> => {
  const params = GetLanguageUnitsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const result = await getUnitsForLanguage(params.data.languageId);
  res.json(GetLanguageUnitsResponse.parse(result));
});

router.get("/users/:userId/languages/:languageId/units", async (req, res): Promise<void> => {
  const params = GetUserLanguageUnitsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const result = await getUnitsForLanguage(params.data.languageId, params.data.userId);
  res.json(GetUserLanguageUnitsResponse.parse(result));
});

export default router;
