import { SENTRY_DSN, VERCEL_ENV } from "@/app/_public-constants";
import * as Sentry from "@sentry/nextjs";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: VERCEL_ENV,

      tracesSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      replaysSessionSampleRate: 0,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: VERCEL_ENV,

      tracesSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      replaysSessionSampleRate: 0,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }
}
