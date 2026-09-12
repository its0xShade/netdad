"use client";
import { Bookmark, Check, Circle } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks";
import { useProgress } from "@/lib/progress";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export function LessonToolbar({ lessonId }: { lessonId: string }) {
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();
  const { isCompleted, toggle: toggleComplete } = useProgress();
  const { toast } = useToast();
  const bm = isBookmarked(lessonId);
  const done = isCompleted(lessonId);

  function handleBookmark() {
    const was = bm;
    toggleBookmark(lessonId);
    toast({
      title: was ? "از ذخیره‌ها حذف شد" : "درس ذخیره شد",
      description: was ? "دیگر در لیست ذخیره‌شده نیست." : "از پروفایل می‌تونی پیداش کنی.",
      variant: was ? "info" : "success",
    });
  }

  function handleComplete() {
    const was = done;
    toggleComplete(lessonId);
    toast({
      title: was ? "درس ناتمام شد" : "آفرین! درس تکمیل شد 🎉",
      description: was ? "از لیست تکمیل‌شده حذف شد." : "پیشرفتت ذخیره شد — ادامه بده!",
      variant: was ? "info" : "success",
    });
  }

  return (
    <>
      <Button variant={bm ? "secondary" : "ghost"} size="sm" onClick={handleBookmark}>
        <Bookmark className={bm ? "fill-current" : undefined} />
        {bm ? "ذخیره شده" : "ذخیره درس"}
      </Button>
      <Button variant={done ? "primary" : "outline"} size="sm" onClick={handleComplete}>
        {done ? <Check className="size-4" /> : <Circle className="size-4" />}
        {done ? "تکمیل شد" : "تکمیل درس"}
      </Button>
    </>
  );
}