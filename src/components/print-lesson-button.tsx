"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintLessonButton({ className }: { className?: string }) {
  return (
    <Button variant="outline" size="sm" className={className} onClick={() => window.print()} aria-label="نسخه PDF درس">
      <Printer className="size-4" />
      PDF / چاپ
    </Button>
  );
}