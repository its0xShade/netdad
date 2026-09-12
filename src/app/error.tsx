"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="card mx-auto my-24 max-w-md p-10 text-center">
      <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-50">
        <AlertTriangle className="size-8 text-amber-500" />
      </div>
      <h2 className="mt-5 text-xl font-black text-text-primary">مشکلی پیش آمد</h2>
      <p className="mt-2 text-sm leading-7 text-text-muted">
        خطایی غیرمنتظره رخ داد. دوباره تلاش کنید یا بعداً مراجعه کنید.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-700"
      >
        تلاش مجدد
      </button>
    </div>
  );
}