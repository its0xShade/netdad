import { FlashcardReviewer } from "@/components/flashcard-reviewer";

export const metadata = { title: "فلش‌کارت‌ها" };

export default function FlashcardsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">Spaced Repetition</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">Flashcard Review</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          35 networking terms with spaced repetition — review daily to build long-term memory.
        </p>
      </div>
      <FlashcardReviewer />
    </div>
  );
}