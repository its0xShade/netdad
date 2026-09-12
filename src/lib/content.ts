import fs from "fs";
import path from "path";
import matter from "gray-matter";

const LESSON_DIRS = [
  "01-network-fundamentals",
  "02-network-models",
  "03-physical-layer",
  "04-ethernet-and-switching",
  "05-ip-addressing",
  "06-arp-and-ndp",
  "07-routing",
  "08-tcp-udp",
  "09-dns-dhcp-nat",
  "10-wireless-networking",
  "11-network-security",
  "12-troubleshooting",
  "13-ipv6",
  "14-cloud-and-modern-networking",
] as const;

const ROOT = process.cwd();

export interface LessonMeta {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  chapter: number;
  chapterTitle: string;
  chapterEn: string;
  order: number;
  difficulty: string;
  duration: number;
  prerequisites: string[];
  summary: string;
  body: string;
}

export interface ChapterMeta {
  number: number;
  title: string;
  titleEn: string;
  lessons: LessonMeta[];
}

interface Course {
  chapters: ChapterMeta[];
  lessons: LessonMeta[];
  totalLessons: number;
  totalMinutes: number;
}

let _cache: Course | null = null;

export function buildCourse(): Course {
  if (_cache) return _cache;
  const chapters: ChapterMeta[] = [];
  const allLessons: LessonMeta[] = [];

  for (const dir of LESSON_DIRS) {
    const dirPath = path.join(ROOT, dir);
    if (!fs.existsSync(dirPath)) continue;
    const match = dir.match(/^(\d+)-(.+)$/);
    if (!match) continue;
    const chapterNum = parseInt(match[1]);
    const lessons: LessonMeta[] = [];

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md")).sort();
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data, content } = matter(raw);
      const id = file.replace(".md", "");
      const lesson: LessonMeta = {
        id,
        slug: id,
        title: data.title || id,
        titleEn: data.titleEn || "",
        chapter: data.chapter || chapterNum,
        chapterTitle: data.chapterTitle || "",
        chapterEn: data.chapterEn || "",
        order: data.order || lessons.length + 1,
        difficulty: data.difficulty || "مبتدی",
        duration: data.duration || 5,
        prerequisites: data.prerequisites || [],
        summary: data.summary || "",
        body: content,
      };
      lessons.push(lesson);
      allLessons.push(lesson);
    }

    if (lessons.length) {
      chapters.push({
        number: chapterNum,
        title: lessons[0]?.chapterTitle || dir,
        titleEn: lessons[0]?.chapterEn || "",
        lessons,
      });
    }
  }

  _cache = {
    chapters,
    lessons: allLessons,
    totalLessons: allLessons.length,
    totalMinutes: allLessons.reduce((s, l) => s + l.duration, 0),
  };
  return _cache;
}

export function findLesson(id: string): LessonMeta | undefined {
  return buildCourse().lessons.find((l) => l.id === id);
}

export function getChapter(num: number): ChapterMeta | undefined {
  return buildCourse().chapters.find((c) => c.number === num);
}

export function getAdjacentLessons(id: string) {
  const { lessons } = buildCourse();
  const idx = lessons.findIndex((l) => l.id === id);
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  };
}