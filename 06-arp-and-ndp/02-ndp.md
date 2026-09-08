---
title: NDP
titleEn: Neighbor Discovery Protocol
chapter: 6
chapterTitle: ARP و NDP
chapterEn: ARP and NDP
order: 2
difficulty: practical
duration: 5
prerequisites:
  - 04-04-ethernet-and-switching/01
  - 05-05-ip-addressing/01
summary: ''
slug: 6-2
---
# NDP — Neighbor Discovery Protocol

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- NDP را به‌عنوان جایگزین ARP در IPv6 توضیح دهد
- وظایف NDP را نام ببرد
- تفاوت NDP و ARP را بیان کند

---

> **پیش‌نیاز:** [ARP](01-arp.md)

---

## ۱. NDP چیست؟

**Neighbor Discovery Protocol** پروتکل لایه ۳ در IPv6 است که جایگزین ARP، ICMP Router Discovery و ICMP Redirect می‌شود.

NDP بر روی **ICMPv6** کار می‌کند.

---

## ۲. وظایف NDP

| عمل | توضیح |
|---|---|
| **Router Discovery** | پیدا کردن روترهای موجود |
| **Prefix Discovery** | یادگیری پیشوند شبکه |
| **Address Autoconfiguration** | آدرس‌دهی خودکار (SLAAC) |
| **Neighbor Unreachability Detection** | بررسی فعال بودن همسایه |
| **Duplicate Address Detection** | بررسی تکراری نبودن آدرس |
| **Neighbor Solicitation/Advertisement** | تبدیل IPv6 به MAC (مشابه ARP) |

---

## ۳. NDP vs. ARP

| ویژگی | ARP | NDP |
|---|---|---|
| نسخه IP | IPv4 | IPv6 |
| پروتکل | مستقل | روی ICMPv6 |
| Broadcast | بله | نه (Multicast) |
| کارایی | کمتر (Broadcast) | بیشتر (Multicast) |
| امنیت | ضعیف (ARP Spoofing) | بهتر (SEND) |

---

## ۴. SLAAC — Stateless Address Autoconfiguration

با NDP، دستگاه IPv6 می‌تواند **بدون DHCP** آدرس IP خود را به‌صورت خودکار بسازد:

1. Router Advertisement دریافت می‌کند
2. پیشوند شبکه را یاد می‌گیرد
3. بخش Host را به‌صورت تصادفی انتخاب می‌کند
4. Duplicate Address Detection انجام می‌دهد

---

## ❓ سوالات مرور

1. NDP در کدام نسخه IP استفاده می‌شود؟
2. NDP چه جایگزین‌هایی دارد؟
3. SLAAC چیست؟
4. NDP چرا از ARP امن‌تر است؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| NDP | پروتکل کشف همسایه | پروتکل لایه ۳ IPv6 |
| SLAAC | آدرس‌دهی خودکار بدون state | ساخت خودکار آدرس IPv6 |
| ICMPv6 | — | نسخه ICMP برای IPv6 |

---

> **درس بعدی:** [مسیریابی چیست؟](../07-routing/01-introduction-to-routing.md)
