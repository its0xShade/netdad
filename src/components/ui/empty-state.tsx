"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}) {
  return (
    <div className={cn("card flex flex-col items-center justify-center p-10 text-center", className)}>
      <div className="grid size-16 place-items-center rounded-2xl bg-primary-50">
        <Icon className="size-8 text-primary-500" />
      </div>
      <h3 className="mt-5 text-lg font-black text-text-primary">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-text-muted">{description}</p>}
      {action && (
        <Button onClick={action.onClick} variant="primary" size="sm" className="mt-6 rounded-xl">
          {action.label}
        </Button>
      )}
    </div>
  );
}