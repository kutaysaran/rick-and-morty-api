"use client";

import { StandardError } from "@/components/route/StandardError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <StandardError error={error} reset={reset} />;
}
