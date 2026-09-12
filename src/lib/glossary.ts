// Network glossary — Persian/English terms with definitions
export type GlossaryEntry = {
  term: string;
  termEn: string;
  definition: string;
  category: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  { term: "آدرس IP", termEn: "IP Address", definition: "شماره منحصربه‌فردی که به هر دستگاه در شبکه اختصاص داده می‌شود تا بتواند با دستگاه‌های دیگر ارتباط برقرار کند.", category: "آدرس‌دهی" },
  { term: "سابنت مسک", termEn: "Subnet Mask", definition: "رقمی ۳۲ بیتی که مشخص می‌کند بخش شبکه و بخش میزبان آدرس IP کدام قسمت‌ها هستند.", category: "آدرس‌دهی" },
  { term: "MAC Address", termEn: "MAC Address", definition: "آدرس سخت‌افزاری ۴۸ بیتی که به کارت شبکه اختصاص داده شده و در لایه پیوند داده استفاده می‌شود.", category: "لایه ۲" },
  { term: "VLAN", termEn: "Virtual LAN", definition: "شبکه محلی مجازی — تقسیم یک سوئیچ فیزیکی به چندین شبکه منطقی مستقل.", category: "لایه ۲" },
  { term: "ARP", termEn: "Address Resolution Protocol", definition: "پروتکلی که آدرس IP را به آدرس MAC تبدیل می‌کند تا ارتباط در لایه پیوند داده ممکن شود.", category: "آدرس‌دهی" },
  { term: "TCP", termEn: "Transmission Control Protocol", definition: "پروتکل انتقال قابل اعتماد — اتصال محور، با تأیید دریافت و بازیابی خودکار.", category: "لایه ۴" },
  { term: "UDP", termEn: "User Datagram Protocol", definition: "پروتکل انتقال سبک و سریع بدون تضمین تحویل — مناسب استریم و DNS.", category: "لایه ۴" },
  { term: "DNS", termEn: "Domain Name System", definition: "سیستم نام‌دامنه — تبدیل نام‌های دامنه (مثل google.com) به آدرس IP.", category: "لایه ۷" },
  { term: "DHCP", termEn: "Dynamic Host Configuration Protocol", definition: "پروتکل تخصیص خودکار آدرس IP، مسک، گیت‌وی و DNS به دستگاه‌ها.", category: "لایه ۷" },
  { term: "NAT", termEn: "Network Address Translation", definition: "ترجمه آدرس شبکه — تبدیل آدرس‌های خصوصی به عمومی برای اتصال به اینترنت.", category: "لایه ۳" },
  { term: "VLAN", termEn: "Virtual Local Area Network", definition: "شبکه محلی مجازی که ترافیک را به صورت منطقی بخش‌بندی می‌کند.", category: "لایه ۲" },
  { term: "OSI Model", termEn: "OSI Model", definition: "مدل مفهومی ۷ لایه‌ای که ارتباطات شبکه را از فیزیکی تا کاربردی دسته‌بندی می‌کند.", category: "مدل‌ها" },
  { term: "TCP/IP Model", termEn: "TCP/IP Model", definition: "مدل عملیاتی ۴ لایه‌ای اینترنت — لینک، اینترنت، انتقال، کاربرد.", category: "مدل‌ها" },
  { term: "Encapsulation", termEn: "Encapsulation", definition: "فرآیند بسته‌بندی داده در هر لایه با اضافه کردن هدر مخصوص آن لایه.", category: "مدل‌ها" },
  { term: "Ethernet", termEn: "Ethernet", definition: "استاندارد فناوری شبکه سیمی (IEEE 802.3) که در LAN‌ها استفاده می‌شود.", category: "لایه ۱-۲" },
  { term: "Switch", termEn: "Network Switch", definition: "دستگاه لایه ۲ که فریم‌ها را بر اساس آدرس MAC به پورت مقصد ارسال می‌کند.", category: "لایه ۲" },
  { term: "Router", termEn: "Router", definition: "دستگاه لایه ۳ که بسته‌ها را بین شبکه‌های مختلف مسیریابی می‌کند.", category: "لایه ۳" },
  { term: "Firewall", termEn: "Firewall", definition: "دیوار آتش — سیستم امنیتی که ترافیک شبکه را بر اساس قوانین فیلتر می‌کند.", category: "امنیت" },
  { term: "VPN", termEn: "Virtual Private Network", definition: "شبکه خصوصی مجازی — تونل رمزنگاری‌شده برای اتصال امن از راه دور.", category: "امنیت" },
  { term: "SSL/TLS", termEn: "Secure Sockets Layer / Transport Layer Security", definition: "پروتکل رمزنگاری لایه انتقال — پایه امنیت HTTPS.", category: "امنیت" },
];
