---
title: ARP
titleEn: Address Resolution Protocol
chapter: 6
chapterTitle: ARP و NDP
chapterEn: ARP and NDP
order: 1
difficulty: practical
duration: 5
prerequisites:
  - 04-04-ethernet-and-switching/01
  - 05-05-ip-addressing/01
summary: ''
slug: 6-1
---
# ARP — Address Resolution Protocol

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- نیاز به ARP را توضیح دهد
- فرآیند ARP Request/Reply را مراحل به مراحل شرح دهد
- ARP Cache را توضیح دهد
- مشکل ARP Spoofing را بشناسد

---

> **پیش‌نیاز:** [آدرس MAC](../04-ethernet-and-switching/02-mac-address.md) و [آدرس‌دهی IPv4](../05-ip-addressing/01-ipv4-addressing.md)

---

## ۱. مشکل: IP و MAC چگونه با هم ارتباط پیدا می‌کنند؟

وقتی دستگاه A می‌خواهد به دستگاه B در **همان شبکه محلی** پیام بفرستد، آدرس IP مقصد را دارد (مثلاً 192.168.1.5)، اما برای ارسال در لایه ۲ به **آدرس MAC** نیاز دارد.

**ARP** این مشکل را حل می‌کند.

---

## ۲. فرآیند ARP

### مرحله ۱: ARP Request (درخواست)

دستگاه A یک پیام **Broadcast** ارسال می‌کند:
> "آدرس IP 192.168.1.5 مال کیست؟ لطفاً آدرس MAC خود را بفرستید."

```
ARP Request (Broadcast):
  فرستنده: PC-A (MAC: AA:AA:AA:AA:AA:AA, IP: 192.168.1.10)
  مقصد:    MAC: FF:FF:FF:FF:FF:FF (Broadcast)
  پیام:    "چه کسی IP 192.168.1.5 است؟"
```

### مرحله ۲: ARP Reply (پاسخ)

دستگاه B با آدرس 192.168.1.5 یک پیام **Unicast** برمی‌گرداند:
> "192.168.1.5 من هستم. آدرس MAC من BB:BB:BB:BB:BB:BB است."

```
ARP Reply (Unicast):
  فرستنده: PC-B (MAC: BB:BB:BB:BB:BB:BB, IP: 192.168.1.5)
  مقصد:    PC-A (MAC: AA:AA:AA:AA:AA:AA)
```

### مرحله ۳: ذخیره در ARP Cache

PC-A نگاشت IP→MAC را در **ARP Cache** ذخیره می‌کند تا دفعه بعد نیازی به ARP Request نباشد.

---

## ۳. ARP Cache

جدولی در حافظه هر دستگاه که نگاشت‌های IP→MAC اخیر را نگهداری می‌کند.

**مشاهده ARP Cache:**
- Windows: `arp -a`
- Linux: `ip neigh` یا `arp -n`

---

## ۴. ARP Proxy

روتر می‌تواند به نمایندگی از دستگاه‌های دیگر به ARP Request پاسخ دهد — در شبکه‌های بزرگ استفاده می‌شود.

---

## ۵. ARP Spoofing (تهدید امنیتی)

مهاجم می‌تواند ARP Reply جعلی ارسال کند و خودش را به‌جای روتر معرفی کند → **Man-in-the-Middle Attack**.

**راه حل:** Dynamic ARP Inspection (DAI) در Switchها

---

## ❓ سوالات مرور

1. چرا ARP لازم است؟
2. ARP Request چه نوع آدرسی دارد (Broadcast/Unicast)؟
3. ARP Cache چیست؟
4. ARP Spoofing چیست و چرا خطرناک است؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| ARP | پروتکل حل آدرس | تبدیل IP به MAC |
| ARP Cache | حافظه ARP | جدول نگاشت IP→MAC |
| ARP Spoofing | جعل ARP | حمله Man-in-the-Middle |

---

> **درس بعدی:** [NDP](02-ndp.md)
