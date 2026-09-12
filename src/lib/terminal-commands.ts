// Pure terminal simulation logic — no React, no side effects, fully deterministic
export type TermLine = { text: string; kind?: "out" | "err" | "ok" | "dim" | "warn" };

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fakeIp(host: string): string {
  const h = hashStr(host.toLowerCase());
  const first = 8 + (h % 20);
  return `${first}.${h % 256}.${(h >>> 8) % 256}.${(h >>> 16) % 256}`;
}

function fakeMac(i: number): string {
  const parts = [0x00, 0x1a, 0x2b, 0x3c, 0x40, 0x50 + i * 3];
  return parts.map((p) => p.toString(16).padStart(2, "0")).join("-").toUpperCase();
}

const HOST_RE = /^[a-zA-Z0-9]([a-zA-Z0-9.-]{0,240})$/;
const LOCAL_IP = "192.168.1.35";
const GATEWAY = "192.168.1.1";

const COMMANDS = [
  "ping", "tracert", "ipconfig", "ifconfig", "nslookup", "arp", "netstat",
  "route", "whoami", "echo", "clear", "help", "exit",
];

function fail(msg: string): TermLine[] {
  return [{ text: msg, kind: "err" }];
}

function usage(cmd: string, example: string): TermLine[] {
  return fail(`Usage: ${cmd} ${example}`);
}

const cmdPing = (host: string): TermLine[] => {
  if (!host) return usage("ping", "<host>  — e.g. ping cisco.com");
  if (!HOST_RE.test(host)) return fail(`Ping request could not find host ${host}.`);
  const ip = fakeIp(host);
  const rng = mulberry32(hashStr(host + ":ping"));
  const times: number[] = [];
  for (let i = 0; i < 4; i++) times.push(Math.round(8 + rng() * 38));
  const lost = rng() < 0.12;
  const lines: TermLine[] = [
    { text: `Pinging ${host} [${ip}] with 32 bytes of data:`, kind: "dim" },
  ];
  for (let i = 0; i < 4; i++) {
    if (lost && i === 2) {
      lines.push({ text: `Request timed out.`, kind: "warn" });
    } else {
      lines.push({ text: `Reply from ${ip}: bytes=32 time=${times[i]}ms TTL=${115 + (i % 5)}`, kind: "out" });
    }
  }
  const received = lost ? 3 : 4;
  const sent = 4;
  const loss = Math.round(((sent - received) / sent) * 100);
  const min = Math.min(...times);
  const max = Math.max(...times);
  const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  lines.push(
    { text: "", kind: "dim" },
    { text: `Ping statistics for ${ip}:`, kind: "dim" },
    { text: `    Packets: Sent = ${sent}, Received = ${received}, Lost = ${sent - received} (${loss}% loss),`, kind: "out" },
    { text: "Approximate round trip times in milli-seconds:", kind: "dim" },
    { text: `    Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms`, kind: "out" },
  );
  return lines;
};

const cmdTracert = (host: string): TermLine[] => {
  if (!host) return usage("tracert", "<host>  — e.g. tracert youtube.com");
  if (!HOST_RE.test(host)) return fail(`Unable to resolve target system name ${host}.`);
  const ip = fakeIp(host);
  const rng = mulberry32(hashStr(host + ":trace"));
  const lines: TermLine[] = [
    { text: `Tracing route to ${host} [${ip}] over a maximum of 30 hops:`, kind: "dim" },
    { text: "", kind: "dim" },
  ];
  for (let hop = 1; hop <= 10; hop++) {
    if (hop === 4 && rng() < 0.3) {
      lines.push({ text: `${hop.toString().padStart(2)}    Request timed out.`, kind: "warn" });
      continue;
    }
    const t1 = Math.round(1 + rng() * 30);
    const t2 = t1 + Math.round(rng() * 6);
    const t3 = t2 + Math.round(rng() * 6);
    const hopIp = hop === 1 ? GATEWAY : `${10 + (hop % 8)}.${rng() * 200 + 20 | 0}.${rng() * 250 + 2 | 0}.1`;
    lines.push({ text: `${hop.toString().padStart(2)}    ${t1} ms    ${t2} ms    ${t3} ms   ${hopIp}`, kind: "out" });
  }
  lines.push({ text: "", kind: "dim" }, { text: "Trace complete.", kind: "ok" });
  return lines;
};

const cmdIpconfig = (): TermLine[] => [
  { text: "Windows IP Configuration", kind: "dim" },
  { text: "", kind: "dim" },
  { text: "Ethernet adapter Ethernet:", kind: "out" },
  { text: `   Connection-specific DNS Suffix  . : netdad.local`, kind: "dim" },
  { text: `   IPv4 Address. . . . . . . . . . . : ${LOCAL_IP}`, kind: "out" },
  { text: `   Subnet Mask . . . . . . . . . . . : 255.255.255.0`, kind: "out" },
  { text: `   Default Gateway . . . . . . . . . : ${GATEWAY}`, kind: "out" },
  { text: "", kind: "dim" },
  { text: "Wireless LAN adapter Wi-Fi:", kind: "out" },
  { text: `   Connection-specific DNS Suffix  . : netdad.local`, kind: "dim" },
  { text: `   Link-local IPv6 Address . . . . . : fe80::4d5a:2c11:9f3e:88a1%17`, kind: "dim" },
  { text: `   IPv4 Address. . . . . . . . . . . : 10.10.10.12`, kind: "out" },
  { text: `   Subnet Mask . . . . . . . . . . . : 255.0.0.0`, kind: "out" },
  { text: `   Default Gateway . . . . . . . . . : 10.10.10.1`, kind: "out" },
];

const cmdIfconfig = (): TermLine[] => [
  { text: "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500", kind: "out" },
  { text: `        inet ${LOCAL_IP}  netmask 255.255.255.0  broadcast 192.168.1.255`, kind: "out" },
  { text: "        ether 02:42:ac:11:00:02  txqueuelen 1000  (Ethernet)", kind: "dim" },
  { text: "", kind: "dim" },
  { text: "wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500", kind: "out" },
  { text: "        inet 10.10.10.12  netmask 255.0.0.0  broadcast 10.255.255.255", kind: "out" },
  { text: "        ether 00:1a:2b:3c:40:50  txqueuelen 1000  (Ethernet)", kind: "dim" },
];

const cmdNslookup = (domain: string): TermLine[] => {
  if (!domain) return usage("nslookup", "<domain>  — مثل: nslookup google.com");
  if (!HOST_RE.test(domain)) return fail(`*** server can't find ${domain}: NXDOMAIN`);
  const ip = fakeIp(domain);
  return [
    { text: `Server:  dns.netdad.ir`, kind: "dim" },
    { text: `Address:  178.22.122.100`, kind: "dim" },
    { text: "", kind: "dim" },
    { text: "Non-authoritative answer:", kind: "out" },
    { text: `Name:    ${domain}`, kind: "out" },
    { text: `Address:  ${ip}`, kind: "ok" },
  ];
};

const cmdArp = (args: string[]): TermLine[] => {
  if (args[0] !== "-a") return usage("arp", "-a");
  const lines: TermLine[] = [
    { text: `Interface: ${LOCAL_IP} --- 0xa`, kind: "dim" },
    { text: "  Internet Address      Physical Address      Type", kind: "dim" },
    { text: `  ${GATEWAY}           ${fakeMac(0)}     dynamic`, kind: "out" },
    { text: `  192.168.1.10           ${fakeMac(1)}     dynamic`, kind: "out" },
    { text: `  192.168.1.22           ${fakeMac(2)}     dynamic`, kind: "out" },
    { text: `  192.168.1.50           ${fakeMac(3)}     static`, kind: "out" },
  ];
  return lines;
};

const cmdNetstat = (args: string[]): TermLine[] => {
  if (!args.includes("-an")) return usage("netstat", "-an");
  return [
    { text: "Active Connections", kind: "dim" },
    { text: "", kind: "dim" },
    { text: "  Proto  Local Address          Foreign Address        State", kind: "dim" },
    { text: "  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING", kind: "out" },
    { text: "  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING", kind: "out" },
    { text: "  TCP    192.168.1.35:54321     142.250.185.78:443     ESTABLISHED", kind: "out" },
    { text: "  TCP    192.168.1.35:54322     104.244.42.129:443     ESTABLISHED", kind: "out" },
    { text: "  TCP    192.168.1.35:54323     5.45.192.100:443       TIME_WAIT", kind: "out" },
    { text: "  UDP    0.0.0.0:53              *:*                   -", kind: "out" },
  ];
};

const cmdRoute = (args: string[]): TermLine[] => {
  if (args[0] !== "print") return usage("route", "print");
  return [
    { text: "IPv4 Route Table", kind: "dim" },
    { text: "==========================================================", kind: "dim" },
    { text: "Active Routes:", kind: "dim" },
    { text: "  Network Destination        Netmask          Gateway       Interface  Metric", kind: "dim" },
    { text: `  0.0.0.0          0.0.0.0       ${GATEWAY}      ${LOCAL_IP}      35`, kind: "out" },
    { text: `  127.0.0.0        255.0.0.0      On-link        127.0.0.1    331`, kind: "out" },
    { text: `  192.168.1.0      255.255.255.0  On-link        ${LOCAL_IP}    291`, kind: "out" },
  ];
};

const cmdHelp = (): TermLine[] => [
  { text: "Available commands:", kind: "ok" },
  { text: "  ping <host>              Test connectivity (ICMP Echo)", kind: "out" },
  { text: "  tracert <host>           Show route to destination", kind: "out" },
  { text: "  ipconfig                 IP configuration — Windows", kind: "out" },
  { text: "  ifconfig                 IP configuration — Linux", kind: "out" },
  { text: "  nslookup <domain>        DNS lookup", kind: "out" },
  { text: "  arp -a                   ARP table", kind: "out" },
  { text: "  netstat -an              Active connections", kind: "out" },
  { text: "  route print              Routing table", kind: "out" },
  { text: "  whoami                   Current user", kind: "out" },
  { text: "  echo <text>              Print text", kind: "out" },
  { text: "  clear / cls              Clear screen", kind: "out" },
  { text: "  help                     Show this help", kind: "out" },
  { text: "  exit                     Exit simulator", kind: "out" },
  { text: "", kind: "dim" },
  { text: "Tip: Tab auto-completes commands, Arrow Up/Down cycles history.", kind: "dim" },
];

export function banner(): TermLine[] {
  return [
    { text: "Netdad Network Simulator v1.0", kind: "ok" },
    { text: "Practice network commands in a safe, simulated environment.", kind: "dim" },
    { text: "Type 'help' to see available commands.", kind: "dim" },
    { text: "", kind: "dim" },
  ];
}

export function runCommand(raw: string): { lines: TermLine[]; clear: boolean } {
  const trimmed = raw.trim();
  if (!trimmed) return { lines: [], clear: false };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (cmd === "clear") return { lines: [], clear: true };
  if (cmd === "exit") {
    return {
      lines: [
        { text: "Exited simulator. You can reopen it anytime from the bottom-left button.", kind: "dim" },
        { text: "Keep learning → https://netdad.ir/curriculum", kind: "dim" },
      ],
      clear: false,
    };
  }
  if (cmd === "help") return { lines: cmdHelp(), clear: false };
  if (cmd === "ping") return { lines: cmdPing(args.join(".") || ""), clear: false };
  if (cmd === "tracert") return { lines: cmdTracert(args.join(".") || ""), clear: false };
  if (cmd === "ipconfig") return { lines: cmdIpconfig(), clear: false };
  if (cmd === "ifconfig") return { lines: cmdIfconfig(), clear: false };
  if (cmd === "nslookup") return { lines: cmdNslookup(args[0] || ""), clear: false };
  if (cmd === "arp") return { lines: cmdArp(args), clear: false };
  if (cmd === "netstat") return { lines: cmdNetstat(args), clear: false };
  if (cmd === "route") return { lines: cmdRoute(args), clear: false };
  if (cmd === "whoami") return { lines: [{ text: "netdad\\student", kind: "out" }], clear: false };
  if (cmd === "echo") return { lines: [{ text: args.join(" "), kind: "out" }], clear: false };

  return {
    lines: [
      { text: `'${parts[0]}' is not recognized as an internal or external command,`, kind: "err" },
      { text: "operable program or batch file.", kind: "err" },
      { text: "Type 'help' to see available commands.", kind: "dim" },
    ],
    clear: false,
  };
}

export const SUGGESTED_COMMANDS = [
  "ping google.com",
  "tracert youtube.com",
  "nslookup cisco.com",
  "ipconfig",
  "arp -a",
  "netstat -an",
  "route print",
  "ifconfig",
];

export const KNOWN_COMMANDS = COMMANDS;