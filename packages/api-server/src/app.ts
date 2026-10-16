import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// ── Security headers via Helmet ───────────────────────────────────────────────
// Adds X-DNS-Prefetch-Control, X-Frame-Options, HSTS, X-Content-Type-Options,
// X-XSS-Protection, and more.  Disable the CSP here because Netlify sets it
// per-response; the API never serves HTML pages directly.
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// ── CORS — only allow known origins ──────────────────────────────────────────
// In development (no ALLOWED_ORIGINS env) every origin is permitted so that
// Vite's dev-server proxy keeps working without extra setup.
const rawOrigins = process.env["ALLOWED_ORIGINS"];
const allowedOrigins: string[] = rawOrigins
  ? rawOrigins.split(",").map((o) => o.trim()).filter(Boolean)
  : [];

app.use(
  cors(
    allowedOrigins.length > 0
      ? {
          origin: (origin, callback) => {
            // Allow requests with no origin (server-to-server, mobile apps)
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error(`CORS: origin '${origin}' not allowed`));
            }
          },
          credentials: true,
        }
      : // Development fallback — all origins allowed
        undefined,
  ),
);

// ── Global rate limiter — 200 req / 15 min per IP ────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(globalLimiter);

// ── Stricter limiter for write / mutating endpoints ──────────────────────────
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
// Applied to user creation and lesson completion endpoints
app.use("/api/users", writeLimiter);
app.use("/api/lessons", writeLimiter);
app.use("/api/exercises", writeLimiter);

// ── Request logging ───────────────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// ── Body parsers — explicit size limit (100 kb) ───────────────────────────────
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use("/api", router);

export default app;
