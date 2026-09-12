// Spaced-repetition flashcards — all networking terms
export type Flashcard = {
  id: string;
  front: string;
  back: string;
  category: string;
};

export const FLASHCARD_DECK: Flashcard[] = [
  // Layer 1-2
  { id: "f1", front: "MAC Address", back: "48-bit hardware address burned into the NIC. Written as 6 hex octets (e.g. 00:1A:2B:3C:4D:5E). Used at Layer 2 for local delivery.", category: "Data Link" },
  { id: "f2", front: "ARP", back: "Address Resolution Protocol. Resolves IP → MAC within a LAN. Sends ARP Request (broadcast) and gets ARP Reply (unicast) with MAC.", category: "Data Link" },
  { id: "f3", front: "Switch", back: "Layer 2 device that forwards frames by MAC address. Builds a MAC address table (CAM table) by learning source MACs on each port.", category: "Data Link" },
  { id: "f4", front: "Frame", back: "Layer 2 PDU. Contains: Preamble, Destination MAC, Source MAC, Type/Length, Payload, FCS (CRC).", category: "Data Link" },
  { id: "f5", front: "VLAN", back: "Virtual LAN — logically segment a switch into separate broadcast domains without physical separation.", category: "Data Link" },
  // Layer 3
  { id: "f6", front: "IPv4", back: "32-bit dotted-decimal address. Classes A-E, now CIDR-based. ~4.3 billion addresses. Header: 20 bytes minimum.", category: "Network" },
  { id: "f7", front: "Subnet Mask", back: "Defines which bits are network vs host. /24 = 255.255.255.0. Usable hosts = 2^(host bits) − 2.", category: "Network" },
  { id: "f8", front: "Default Gateway", back: "The router interface on your LAN. When destination IP is outside your subnet, traffic goes here.", category: "Network" },
  { id: "f9", front: "TTL / Hop Limit", back: "Field in IP header that decreases by 1 at each router. When it hits 0, packet is discarded. Prevents loops.", category: "Network" },
  { id: "f10", front: "NAT", back: "Network Address Translation — maps private IPs to public IP(s). PAT (overload) uses port numbers to multiplex many private hosts.", category: "Network" },
  { id: "f11", front: "CIDR", back: "Classless Inter-Domain Routing. Replaces classful addressing. Notation: 192.168.1.0/24 where 24 = number of network bits.", category: "Network" },
  { id: "f12", front: "Route", back: "Table of network prefixes → next-hop IP. Managed by routing protocols (OSPF, BGP) or static entries.", category: "Network" },
  // Layer 4
  { id: "f13", front: "TCP", back: "Connection-oriented, reliable. 3-way handshake (SYN→SYN-ACK→ACK). Flow control via sliding window. Ports: 16-bit (0-65535).", category: "Transport" },
  { id: "f14", front: "UDP", back: "Connectionless, unreliable, fast. No handshake, no ACK. Used for DNS, VoIP, gaming, streaming. 8-byte header.", category: "Transport" },
  { id: "f15", front: "Three-Way Handshake", back: "1) Client → SYN  2) Server → SYN-ACK  3) Client → ACK. Establishes a TCP connection before data transfer.", category: "Transport" },
  { id: "f16", front: "Port Number", back: "16-bit identifier in TCP/UDP header. Well-known: 0-1023 (HTTP=80, HTTPS=443). Ephemeral: 49152-65535.", category: "Transport" },
  { id: "f17", front: "RST Flag", back: "TCP Reset — abruptly terminates a connection. Sent when a host receives a segment for a non-existent connection.", category: "Transport" },
  // Layer 7
  { id: "f18", front: "DNS", back: "Domain Name System — resolves human-readable names (google.com) to IP addresses. UDP port 53 (queries), TCP 53 (zone transfers).", category: "Application" },
  { id: "f19", front: "DHCP", back: "Dynamic Host Configuration Protocol. DORA: Discover→Offer→Request→Ack. Assigns IP, mask, gateway, DNS automatically.", category: "Application" },
  { id: "f20", front: "HTTP", back: "HyperText Transfer Protocol. Request/Response model. Methods: GET, POST, PUT, DELETE. Stateful via cookies or JWT.", category: "Application" },
  { id: "f21", front: "HTTPS", back: "HTTP + TLS encryption. Certificate from CA. Negotiates cipher suite during TLS handshake. Default port 443.", category: "Application" },
  { id: "f22", front: "SSH", back: "Secure Shell — encrypted remote terminal. Port 22. Uses public-key authentication. Replaces Telnet.", category: "Application" },
  { id: "f23", front: "FTP", back: "File Transfer Protocol. Two connections: Control (21) and Data (20). Passive mode for firewalls.", category: "Application" },
  { id: "f24", front: "SMTP", back: "Simple Mail Transfer Protocol — sending email. Port 25/587. Store-and-forward model between MTAs.", category: "Application" },
  { id: "f25", front: "SNMP", back: "Simple Network Management Protocol — monitoring devices. Uses MIB database. Ports: 161/162.", category: "Application" },
  // Infrastructure
  { id: "f26", front: "Router", back: "Layer 3 device. Forwards packets between different networks using IP addresses. Runs routing protocols (OSPF, BGP, RIP).", category: "Infrastructure" },
  { id: "f27", front: "Firewall", back: "Filters traffic by rules (IP, port, protocol). Stateful tracks connections. Stateless inspects each packet independently.", category: "Security" },
  { id: "f28", front: "TLS", back: "Transport Layer Security — encrypts data in transit. Handshake: ClientHello → ServerHello → Cert → Key Exchange → Finished.", category: "Security" },
  { id: "f29", front: "VPN", back: "Virtual Private Network — encrypted tunnel over public internet. IPSec (Layer 3) or TLS (Layer 7). Remote access or site-to-site.", category: "Security" },
  { id: "f30", front: "AAA", back: "Authentication, Authorization, Accounting. Who are you? What can you do? What did you do? Protocol: RADIUS (1812) or TACACS+ (49).", category: "Security" },
  // Wireless & Modern
  { id: "f31", front: "Wi-Fi (802.11)", back: "Wireless LAN standard. 2.4 GHz (long range, slow) and 5/6 GHz (fast, short). WPA3 encryption. CSMA/CA access method.", category: "Wireless" },
  { id: "f32", front: "SDN", back: "Software-Defined Networking. Separates control plane (centralized) from data plane (distributed). Programmable via API.", category: "Modern" },
  { id: "f33", front: "Cloud Networking", back: "Virtual networks in cloud (VPC, VNet). Subnets, security groups, load balancers, NAT gateways. Everything as code.", category: "Modern" },
  { id: "f34", front: "IPv6", back: "128-bit address space (3.4×10^38). No NAT needed. Simplified header. Built-in IPsec. Link-local (fe80::), global (2000::/3).", category: "Modern" },
  { id: "f35", front: "MPLS", back: "Multi-Protocol Label Switching. Adds labels for fast forwarding without full IP lookup. Used in ISP backbone networks.", category: "Modern" },
];

export type SRSCard = {
  id: string;
  ease: number;      // 1-5 ease factor
  interval: number;  // days until next review
  nextReview: number; // timestamp
  repetitions: number;
};

export function getDefaultSRS(): SRSCard {
  return { id: "", ease: 2.5, interval: 1, nextReview: 0, repetitions: 0 };
}

export function gradeSRS(card: SRSCard, quality: number): SRSCard {
  const now = Date.now();
  if (quality < 3) {
    return { ...card, ease: Math.max(1.3, card.ease - 0.2), interval: 1, nextReview: now + 86400000, repetitions: 0 };
  }
  const newReps = card.repetitions + 1;
  const interval = newReps === 1 ? 1 : newReps === 2 ? 6 : Math.round(card.interval * card.ease);
  const newEase = Math.max(1.3, card.ease + 0.1 - (5 - quality) * 0.08);
  return { ...card, ease: newEase, interval, nextReview: now + interval * 86400000, repetitions: newReps };
}