import Link from "next/link";
import { ListTree } from "lucide-react";

export const metadata = { title: "مرجع پورت‌ها" };

const PORTS = [
  { port: 20, name: "FTP Data", proto: "TCP", desc: "انتقال داده FTP" },
  { port: 21, name: "FTP Control", proto: "TCP", desc: "کنترل FTP" },
  { port: 22, name: "SSH", proto: "TCP", desc: "Shell امن از راه دور" },
  { port: 23, name: "Telnet", proto: "TCP", desc: "Shell غیرامن" },
  { port: 25, name: "SMTP", proto: "TCP", desc: "ارسال ایمیل" },
  { port: 53, name: "DNS", proto: "UDP/TCP", desc: "نام‌دامنه به IP" },
  { port: 67, name: "DHCP Server", proto: "UDP", desc: "تخصیص IP خودکار" },
  { port: 68, name: "DHCP Client", proto: "UDP", desc: "دریافت IP" },
  { port: 69, name: "TFTP", proto: "UDP", desc: "FTP ساده" },
  { port: 80, name: "HTTP", proto: "TCP", desc: "وب ساده" },
  { port: 110, name: "POP3", proto: "TCP", desc: "دریافت ایمیل" },
  { port: 143, name: "IMAP", proto: "TCP", desc: "مدیریت ایمیل" },
  { port: 443, name: "HTTPS", proto: "TCP", desc: "وب امن" },
  { port: 993, name: "IMAPS", proto: "TCP", desc: "IMAP امن" },
  { port: 995, name: "POP3S", proto: "TCP", desc: "POP3 امن" },
  { port: 3389, name: "RDP", proto: "TCP", desc: "دستکتاپ از راه دور" },
  { port: 8080, name: "HTTP Alt", proto: "TCP", desc: "وب جایگزین" },
  { port: 3306, name: "MySQL", proto: "TCP", desc: "پایگاه داده MySQL" },
  { port: 5432, name: "PostgreSQL", proto: "TCP", desc: "پایگاه داده PostgreSQL" },
  { port: 27017, name: "MongoDB", proto: "TCP", desc: "پایگاه داده MongoDB" },
];

export default function PortsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <nav className="mb-3 flex items-center gap-2 text-xs text-text-muted">
          <Link href="/tools" className="transition-colors hover:text-primary-600 no-underline">ابزارها</Link>
          <span>/</span>
          <span className="text-text-primary">مرجع پورت‌ها</span>
        </nav>
        <h1 className="text-3xl font-black tracking-tight text-text-primary">مرجع پورت‌ها</h1>
        <p className="mt-2 text-sm text-text-muted">پورت‌های پرکاربرد TCP/UDP برای یادگیری و عیب‌یابی.</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-primary-50/60">
              <th className="px-5 py-3.5 text-right font-bold text-text-primary">پورت</th>
              <th className="px-5 py-3.5 text-right font-bold text-text-primary">نام</th>
              <th className="px-5 py-3.5 text-right font-bold text-text-primary">پروتکل</th>
              <th className="px-5 py-3.5 text-right font-bold text-text-primary">توضیح</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {PORTS.map((p) => (
              <tr key={p.port} className="transition-colors hover:bg-primary-50/30">
                <td className="px-5 py-3 font-mono text-sm font-bold text-primary-600 ltr">{p.port}</td>
                <td className="px-5 py-3 font-semibold text-text-primary ltr">{p.name}</td>
                <td className="px-5 py-3 text-xs text-text-muted ltr">{p.proto}</td>
                <td className="px-5 py-3 text-text-secondary">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}