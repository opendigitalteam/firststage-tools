"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import FocusBox from "./FocusBox";
import H1 from "./H1";
import UtilityButton from "./UtilityButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <FocusBox>
      <H1>
        <div className="text-center font-display">Something went wrong</div>
      </H1>

      <div>
        <UtilityButton onClick={() => reset()} color="pink">
          Try again
        </UtilityButton>
      </div>
    </FocusBox>
  );
}
