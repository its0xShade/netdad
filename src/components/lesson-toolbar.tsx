"use client";
import { Bookmark, Check, Circle, Zap } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks";
import { useProgress } from "@/lib/progress";
import { useGamification } from "@/lib/gamification";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { toFaDigits } from "@/lib/format";

export function LessonToolbar({ lessonId }: { lessonId: string }) {
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();
  const { isCompleted, toggle: toggleComplete } = useProgress();
  const { addXp } = useGamification();
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
    if (!was) {
      addXp(15);
      toast({
        title: "آفرین! درس تکمیل شد 🎉",
        description: `+۱۵ XP گرفتی — با ادامه مسیر، سطحت بالا می‌ره!`,
        variant: "success",
      });
    } else {
      toast({
        title: "درس ناتمام شد",
        description: "از لیست تکمیل‌شده حذف شد.",
        variant: "info",
      });
    }
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