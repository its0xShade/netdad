"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Event = { year: number; title: string; desc: string; tag: string; color: string };

const TIMELINE: Event[] = [
  { year: 1969, title: "ARPANET", desc: "First message sent between UCLA and Stanford. 4 nodes. The birth of packet switching.", tag: "Foundation", color: "bg-violet-500" },
  { year: 1971, title: "Email (RFC 524)", desc: "Ray Tomlinson sends the first network email using @ sign. ARPANET now has 15 nodes.", tag: "Application", color: "bg-violet-400" },
  { year: 1973, title: "Ethernet (Metcalfe)", desc: "Bob Metcalfe invents Ethernet at Xerox PARC. 3 Mbps. CSMA/CD collision detection.", tag: "LAN", color: "bg-sky-500" },
  { year: 1974, title: "TCP Proposed (Cerf & Kahn)", desc: "Vint Cerf & Bob Kahn publish TCP design. Interconnects multiple packet-switched networks.", tag: "Protocol", color: "bg-emerald-500" },
  { year: 1978, title: "TCP/IP Split", desc: "TCP split into TCP + IP. IP handles addressing/routing, TCP handles reliability.", tag: "Protocol", color: "bg-emerald-400" },
  { year: 1980, title: "802.3 (Ethernet Standard)", desc: "IEEE standardizes Ethernet. 10 Mbps. Coax backbone becomes the LAN backbone of the 80s.", tag: "LAN", color: "bg-sky-400" },
  { year: 1981, title: "IBM PC + Token Ring", desc: "IBM enters networking. Token Ring (802.5) challenges Ethernet in enterprise.", tag: "LAN", color: "bg-sky-300" },
  { year: 1983, title: "TCP/IP Adopted (NCP → TCP/IP)", desc: "Jan 1st: ARPANET switches from NCP to TCP/IP. The modern internet protocol stack is born.", tag: "Protocol", color: "bg-emerald-600" },
  { year: 1984, title: "DNS", desc: "Paul Mockapetris creates DNS. Replaces HOSTS.TXT. Humans can use names instead of IPs.", tag: "Application", color: "bg-violet-300" },
  { year: 1986, title: "NSFNET", desc: "National Science Foundation Network connects 5 supercomputing centers. 56 Kbps → backbone.", tag: "Internet", color: "bg-amber-500" },
  { year: 1989, title: "World Wide Web (Berners-Lee)", desc: "Tim Berners-Lee proposes the Web at CERN. HTTP, HTML, URLs — the internet becomes usable.", tag: "Application", color: "bg-rose-500" },
  { year: 1990, title: "ISDN", desc: "Integrated Services Digital Network. First digital phone lines. 64-128 Kbps.", tag: "WAN", color: "bg-orange-400" },
  { year: 1993, title: "Mosaic Browser", desc: "First graphical web browser. Web goes mainstream. 28.8 Kbps dial-up becomes the norm.", tag: "Application", color: "bg-rose-400" },
  { year: 1994, title: "VLANs (802.1Q)", desc: "IEEE 802.1Q standard. Logical network segmentation without rewiring.", tag: "LAN", color: "bg-sky-600" },
  { year: 1995, title: "Wi-Fi (802.11)", desc: "IEEE 802.11 standard. 2 Mbps wireless. The beginning of untethered networking.", tag: "Wireless", color: "bg-teal-500" },
  { year: 1996, title: "SSL 3.0", desc: "Netscape creates SSL for secure web transactions. HTTPS becomes possible.", tag: "Security", color: "bg-rose-600" },
  { year: 1998, title: "ISP Dial-Up Peak", desc: "56K modems. AOL, CompuServe. The screech of dial-up connects 40 million Americans.", tag: "Internet", color: "bg-amber-400" },
  { year: 1999, title: "802.11b (Wi-Fi)", desc: "11 Mbps Wi-Fi. Consumer wireless takes off. Home routers become common.", tag: "Wireless", color: "bg-teal-400" },
  { year: 2000, title: "IPv6 Published (RFC 2460)", desc: "128-bit addresses. Solves IPv4 exhaustion. Simplified header, built-in IPsec.", tag: "Protocol", color: "bg-emerald-300" },
  { year: 2001, title: "NAT becomes universal", desc: "RFC 3022. Private IPs + NAT mask IPv4 exhaustion. Most homes behind one public IP.", tag: "Network", color: "bg-amber-600" },
  { year: 2002, title: "MPLS", desc: "Multi-Protocol Label Switching. ISPs move to label-based forwarding. Faster routing.", tag: "WAN", color: "bg-orange-500" },
  { year: 2003, title: "VoIP (Skype)", desc: "Skype launches. Voice over IP becomes mainstream. PSTN starts dying.", tag: "Application", color: "bg-violet-500" },
  { year: 2004, title: "Facebook / Web 2.0", desc: "User-generated content era. Bandwidth explodes. Gigabit Ethernet in data centers.", tag: "Internet", color: "bg-amber-300" },
  { year: 2006, title: "AWS Launches", desc: "Amazon Web Services. Cloud networking — VPC, elastic IPs, security groups.", tag: "Cloud", color: "bg-indigo-500" },
  { year: 2009, title: "802.11n (Wi-Fi 4)", desc: "300-600 Mbps. MIMO antennas. 2.4 + 5 GHz. Streaming becomes possible.", tag: "Wireless", color: "bg-teal-600" },
  { year: 2011, title: "TLS 1.2", desc: "Replaces SSL. Stronger encryption. SHA-256. Required for PCI compliance.", tag: "Security", color: "bg-rose-700" },
  { year: 2012, title: "SDN (OpenFlow)", desc: "Software-Defined Networking. Control plane separated from data plane. Programmable networks.", tag: "Modern", color: "bg-indigo-400" },
  { year: 2013, title: "IPv4 Exhaustion (IANA)", desc: "Last /8 block allocated. IPv6 adoption becomes urgent.", tag: "Protocol", color: "bg-emerald-700" },
  { year: 2014, title: "TLS 1.3", desc: "1-RTT handshake (down from 2-RTT). Removes weak ciphers. 0-RTT resumption.", tag: "Security", color: "bg-rose-500" },
  { year: 2016, title: "IoT Explosion", desc: "20 billion connected devices. MQTT, CoAP protocols. Network security becomes critical.", tag: "Modern", color: "bg-indigo-300" },
  { year: 2019, title: "Wi-Fi 6 (802.11ax)", desc: "OFDMA, 1024-QAM. Up to 9.6 Gbps. Designed for dense environments (stadiums, offices).", tag: "Wireless", color: "bg-teal-700" },
  { year: 2020, title: "Zero Trust Architecture", desc: "Never trust, always verify. BeyondCorp model. Microsegmentation replaces perimeter security.", tag: "Security", color: "bg-rose-400" },
  { year: 2021, title: "Wi-Fi 6E", desc: "Extends Wi-Fi 6 into 6 GHz band. 1200 MHz of new spectrum. Less congestion.", tag: "Wireless", color: "bg-teal-300" },
  { year: 2022, title: "MEF (Multi-Access Edge)", desc: "Edge computing meets networking. 5G + MEC. Sub-5ms latency at the edge.", tag: "Modern", color: "bg-indigo-600" },
  { year: 2024, title: "Wi-Fi 7 (802.11be)", desc: "320 MHz channels, 4096-QAM, MLO. Up to 46 Gbps. The fastest wireless ever.", tag: "Wireless", color: "bg-teal-800" },
];

export function ProtocolTimeline() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tags = [...new Set(TIMELINE.map((e) => e.tag))];
  const events = filterTag ? TIMELINE.filter((e) => e.tag === filterTag) : TIMELINE;

  const tagColors: Record<string, string> = {
    Foundation: "bg-violet-100 text-violet-700 border-violet-200",
    Application: "bg-rose-100 text-rose-700 border-rose-200",
    Protocol: "bg-emerald-100 text-emerald-700 border-emerald-200",
    LAN: "bg-sky-100 text-sky-700 border-sky-200",
    Wireless: "bg-teal-100 text-teal-700 border-teal-200",
    WAN: "bg-orange-100 text-orange-700 border-orange-200",
    Internet: "bg-amber-100 text-amber-700 border-amber-200",
    Security: "bg-rose-100 text-rose-700 border-rose-200",
    Network: "bg-amber-100 text-amber-700 border-amber-200",
    Modern: "bg-indigo-100 text-indigo-700 border-indigo-200",
    Cloud: "bg-indigo-100 text-indigo-700 border-indigo-200",
  };

  return (
    <div className="space-y-6">
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setFilterTag(null)} className={cn("rounded-full border px-3 py-1 text-xs font-semibold transition-colors", !filterTag ? "bg-primary-600 border-primary-600 text-white" : "border-border text-text-muted hover:border-primary-300")}>All</button>
        {tags.map((tag) => (
          <button key={tag} type="button" onClick={() => setFilterTag(filterTag === tag ? null : tag)} className={cn("rounded-full border px-3 py-1 text-xs font-semibold transition-colors", filterTag === tag ? tagColors[tag] : "border-border text-text-muted hover:border-primary-300")}>{tag}</button>
        ))}
      </div>

      {/* Timeline */}
      <div ref={scrollRef} className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gray-200" />

        <div className="space-y-0">
          {events.map((ev, i) => {
            const isLeft = i % 2 === 0;
            const isOpen = selected === i;
            return (
              <motion.div
                key={`${ev.year}-${ev.title}`}
                initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
                className={cn("relative flex items-start py-4", isLeft ? "flex-row" : "flex-row-reverse")}
              >
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <span className={cn("block size-4 rounded-full border-4 border-white shadow-sm", ev.color)} />
                </div>

                {/* Content card */}
                <div className={cn("w-5/12", isLeft ? "pr-10 text-right" : "pl-10")}>
                  <button
                    type="button"
                    onClick={() => setSelected(isOpen ? null : i)}
                    className="w-full text-left"
                  >
                    <div className={cn("rounded-xl border-2 p-4 transition-all", isOpen ? "border-primary-400 bg-primary-50 shadow-sm" : "border-border bg-white hover:border-primary-200")}>
                      <div className={cn("flex items-center gap-2", isLeft ? "justify-end" : "")}>
                        <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", tagColors[ev.tag])}>
                          {ev.tag}
                        </span>
                        <span className="font-mono text-sm font-black text-primary-600">{ev.year}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-text-primary">{ev.title}</h3>
                      {isOpen && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs leading-6 text-text-muted">
                          {ev.desc}
                        </motion.p>
                      )}
                    </div>
                  </button>
                </div>

                {/* Spacer for other side */}
                <div className="w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}