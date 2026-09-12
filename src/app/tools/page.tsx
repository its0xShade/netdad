import Link from "next/link";
import { Calculator, Binary, ListTree, Network, GraduationCap, Cable, Gamepad2, Trophy, Spline, Brain, Clock, Blocks, Target, Zap, FileText, Share2 } from "lucide-react";
import { TiltCard } from "@/components/motion/tilt-card";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Tools" };

const TOOLS = [
  { href: "/tools/subnet", title: "Subnet Calculator", desc: "Subnet Mask, CIDR, network and broadcast address", icon: Calculator },
  { href: "/tools/binary", title: "Binary Converter", desc: "Binary, decimal and hexadecimal conversion", icon: Binary },
  { href: "/tools/ports", title: "Port Reference", desc: "Common TCP/UDP ports", icon: ListTree },
  { href: "/tools/subnet-viz", title: "Subnet Visualization", desc: "Visual CIDR splitting with animated blocks", icon: Blocks },
  { href: "/tools/cheat-sheet", title: "Subnet Cheat Sheet", desc: "Printable /8 to /30 reference table", icon: FileText },
  { href: "/cable", title: "Cable Tester", desc: "T568A/T568B — straight-through vs crossover", icon: Cable },
  { href: "/game", title: "Card Sort Game", desc: "TCP/UDP and OSI layer sorting challenges", icon: Gamepad2 },
  { href: "/exam", title: "Final Exam", desc: "20 questions + certificate", icon: Trophy },
  { href: "/drill", title: "Smart Drill", desc: "Auto-review of your wrong questions", icon: Zap },
  { href: "/flashcards", title: "Flashcards", desc: "35 terms with spaced repetition", icon: Brain },
  { href: "/timeline", title: "Protocol Timeline", desc: "ARPANET to Wi-Fi 7 — history", icon: Clock },
  { href: "/mind-map", title: "Concept Map", desc: "Interactive networking mind map", icon: Share2 },
  { href: "/network-builder", title: "Network Builder", desc: "Drag & drop devices, build a topology", icon: Spline },
  { href: "/weak-points", title: "Weak Points", desc: "Your accuracy by chapter", icon: Target },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-primary-600">ابزارهای شبکه</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-text-primary">ابزارهای کمکی</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-muted">
          برای تمرین و یادگیری مفاهیم شبکه — محاسبه سریع و دقیق.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {TOOLS.map(({ href, title, desc, icon: Icon }) => (
          <TiltCard key={href} max={8} className="rounded-2xl border border-border bg-white">
            <Link href={href} className="group block p-7 no-underline">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-text-muted">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-600">
                استفاده
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              </span>
            </Link>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}