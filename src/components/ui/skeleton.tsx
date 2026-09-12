"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-gray-200/80", className)} aria-hidden />;
}

export function LessonPageSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
      {/* Title */}
      <Skeleton className="h-9 w-2/3" />
      {/* Meta */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-4 w-14 rounded-full" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
      {/* TL;DR */}
      <Skeleton className="h-24 w-full rounded-2xl" />
      {/* Body fake */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
        <div className="hidden space-y-3 lg:block">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function GenericPageSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <Skeleton className="mx-auto h-3 w-24" />
        <Skeleton className="mx-auto mt-3 h-9 w-2/3" />
        <Skeleton className="mx-auto mt-3 h-4 w-1/2" />
      </div>
      <Skeleton className="h-64 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}