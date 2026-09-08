---
title: Frame
titleEn: ساختار فریم اترنت
chapter: 4
chapterTitle: Ethernet و Switching
chapterEn: Ethernet & Switching
order: 3
difficulty: fundamentals
duration: 5
prerequisites:
  - 02-02-network-models/01
  - 03-03-physical-layer/01
summary: ''
slug: 4-3
---
# Frame — ساختار فریم اترنت

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- فیلدهای یک Ethernet Frame را نام ببرد
- حداقل و حداکثر اندازه Frame را بداند
- فرآیند Encapsulation در لایه ۲ را توضیح دهد

---

> **پیش‌نیاز:** [آدرس MAC](02-mac-address.md)

---

## ۱. Ethernet Frame چیست؟

**Frame** قالب داده‌ای است که در لایه Data Link استفاده می‌شود. هر بسته اطلاعاتی که در شبکه ارسال می‌شود، داخل یک Frame قرار می‌گیرد.

---

## ۲. ساختار Frame

```
┌────────┬──────────┬───────┬──────────────┬─────┬──────┐
│Preamble│DST MAC   │SRC MAC│Type/Length   │ Data│ FCS  │
│ 7B     │ 6B       │ 6B    │ 2B           │46-  │ 4B   │
│        │          │       │              │1500B│      │
└────────┴──────────┴───────┴──────────────┴─────┴──────┘
```

### فیلدهای اصلی:

| فیلد | اندازه | توضیح |
|---|---|---|
| **Preamble** | ۷ بایت | الگوی همگام‌سازی |
| **SFD** | ۱ بایت | شروع فریم |
| **Destination MAC** | ۶ بایت | آدرس MAC مقصد |
| **Source MAC** | ۶ بایت | آدرس MAC مبدأ |
| **Type/Length** | ۲ بایت | نوع پروتکل لایه بالا یا طول Data |
| **Data (Payload)** | ۴۶-۱۵۰۰ بایت | داده حمل‌شده |
| **FCS** | ۴ بایت | بررسی خطا (CRC) |

---

## ۳. Type/Length

- اگر مقدار ≥ ۱۵۳۶ باشد: **Type** (نوع پروتکل)
  - `0x0800` = IPv4
  - `0x0806` = ARP
  - `0x86DD` = IPv6
- اگر مقدار ≤ ۱۵۰۰ باشد: **Length** (طول داده)

---

## ۴. MTU — Maximum Transmission Unit

حداکثر اندازه **Payload** در یک Ethernet Frame برابر **۱۵۰۰ بایت** است.

اگر داده بزرگ‌تر باشد، به چند Frame تقسیم می‌شود (**Fragmentation**).

---

## ۵. Jumbo Frame

Frameهایی با اندازه بزرگتر (تا ۹۰۰۰ بایت). در مراکز داده استفاده می‌شوند.

---

## ❓ سوالات مرور

1. حداقل و حداکثر اندازه Payload یک Ethernet Frame چقدر است؟
2. فیلد FCS چه کاری انجام می‌دهد؟
3. اگر Type = 0x0800 باشد، پروتکل لایه بالا چیست؟
4. MTU چیست؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| Frame | فریم | قالب داده لایه ۲ |
| Payload | بار مفید | داده اصلی داخل Frame |
| FCS | بررسی خطا | Frame Check Sequence — CRC |
| MTU | حداکثر واحد انتقال | بزرگترین Payload قابل ارسال |

---

> **درس بعدی:** [Switch چگونه کار می‌کند؟](04-switch-operation.md)
