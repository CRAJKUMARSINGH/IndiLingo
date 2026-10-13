/**
 * Netlify Function — API handler
 *
 * Wraps the Express app with serverless-http so every request to
 * /.netlify/functions/api (or /api/* via netlify.toml redirect) is
 * handled by the same router used in local development.
 *
 * Neon note: packages/db detects Neon URLs at startup and switches to
 * the @neondatabase/serverless HTTP driver automatically, which avoids
 * TCP connection timeouts inside Netlify's serverless sandbox.
 */
import serverless from "serverless-http";
import app from "../../packages/api-server/src/app";

// serverless-http wraps Express so it works as a Netlify Function handler.
export const handler = serverless(app);
