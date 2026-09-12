export function toFaDigits(n: number): string {
  const fa = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return String(n).replace(/\d/g, (d) => fa[+d]);
}

export function formatDuration(min: number): string {
  if (min < 60) return `${toFaDigits(min)} دقیقه`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${toFaDigits(h)} ساعت و ${toFaDigits(m)} دقیقه` : `${toFaDigits(h)} ساعت`;
}

export const DIFFICULTY_LABELS: Record<string, string> = {
  "مبتدی": "مبتدی",
  "متوسط": "متوسط",
  "پیشرفته": "پیشرفته",
  "سخت": "سخت",
};