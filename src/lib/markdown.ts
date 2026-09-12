import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { createHighlighter } from "shiki";

export interface TocItem { id: string; text: string; level: number; }

let _hl: Awaited<ReturnType<typeof createHighlighter>> | null = null;
async function getHl() {
  if (!_hl) _hl = await createHighlighter({ themes: ["github-light"], langs: ["javascript", "typescript", "python", "bash", "json", "html", "css", "yaml", "sql", "c", "cpp", "java", "go", "rust"] });
  return _hl;
}

export async function renderMarkdown(md: string): Promise<string> {
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(md);

  let result = String(html);

  // Shiki highlight: find <pre><code class="language-xxx">...</code></pre>
  const hl = await getHl();
  const codeBlockRe = /<pre[^>]*><code[^>]*class="language-(\w+)"[^>]*>([\s\S]*?)<\/code><\/pre>/g;
  result = result.replace(codeBlockRe, (_, lang, code) => {
    try {
      const decoded = code
        .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
      return hl.codeToHtml(decoded, { lang, theme: "github-light" });
    } catch { return `<pre><code>${code}</code></pre>`; }
  });

  return result;
}

export function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /<h([1-6])[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    items.push({ level: parseInt(m[1]), id: m[2], text: m[3].replace(/<[^>]+>/g, "").trim() });
  }
  return items;
}