---
title: Encapsulation و De-encapsulation
titleEn: encapsulation-de-encapsulation
chapter: 2
chapterTitle: مدل‌های شبکه
chapterEn: Network Models
order: 3
difficulty: fundamentals
duration: 5
prerequisites:
  - 01-01-network-fundamentals/01
summary: ''
slug: 2-3
---
# Encapsulation و De-encapsulation

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- فرآیند Encapsulation را در هر لایه توضیح دهد
- نام واحد داده در هر لایه (Data, Segment, Packet, Frame, Bit) را بیان کند
- فرآیند De-encapsulation را شرح دهد
- درک کند چرا هر لایه Header جداگانه دارد

---

> **پیش‌نیاز:** [درس ۰۳ — مدل OSI](01-osi-model.md)

---

## ۱. مقدمه

وقتی داده‌ای از یک برنامه ارسال می‌شود، در هر لایه پایین‌تر، اطلاعات اضافی (Header) به آن اضافه می‌شود. این فرآیند **Encapsulation** (کپسوله‌سازی) نام دارد.

وقتی داده به مقصد می‌رسد، عکس این فرآیند اتفاق می‌افتد: Headerها یکی‌یکی حذف می‌شوند. این **De-encapsulation** (کپسوله‌زدایی) است.

---

## ۲. فرآیند Encapsulation (ارسال)

```text
L7 Application:     [      DATA       ]

L6 Presentation:    [      DATA       ]

L5 Session:         [      DATA       ]

L4 Transport:       [TCP Hdr][   DATA   ]  ← Segment / Datagram

L3 Network:         [IP Hdr][TCP Hdr][ DATA ]  ← Packet

L2 Data Link:       [Frame Hdr][IP Hdr][TCP Hdr][ DATA ][Frame Trailer]  ← Frame

L1 Physical:        101101001001101001010...  ← Bits
```

---

## ۳. نام‌گذاری واحد داده در هر لایه

| لایه | نام واحد داده | توضیح |
|---|---|---|
| L7-L5 | Data | داده خام برنامه |
| L4 | Segment (TCP) / Datagram (UDP) | با شماره پورت |
| L3 | Packet | با آدرس IP |
| L2 | Frame | با آدرس MAC |
| L1 | Bits | سیگنال الکتریکی/نوری |

---

## ۴. هر Header چه اطلاعاتی دارد؟

### TCP Header (لایه 4)
- شماره پورت مبدأ و مقصد
- شماره ترتیب (Sequence Number)
- پرچم‌های کنترلی (SYN, ACK, FIN)
- Window Size (کنترل جریان)

### IP Header (لایه 3)
- آدرس IP مبدأ
- آدرس IP مقصد
- TTL (مدت زمان اعتبار)
- Protocol (TCP یا UDP)

### Ethernet Frame Header (لایه 2)
- آدرس MAC مبدأ
- آدرس MAC مقصد
- Type (نوع پروتکل لایه بالا)
- CRC/Checksum (بررسی خطا)

---

## ۵. فرآیند De-encapsulation (دریافت)

وقتی بسته به مقصد می‌رسد، عکس Encapsulation اتفاق می‌افتد:

```text
L1: Bits دریافت می‌شود
 ↓
L2: Frame Header حذف → بررسی MAC → Packet استخراج
 ↓
L3: IP Header حذف → بررسی IP → Segment استخراج
 ↓
L4: TCP Header حذف → بررسی پورت → Data استخراج
 ↓
L7-L5: Data به برنامه تحویل داده می‌شود
```

---

## ۶. مثال واقعی

فرض کنید پیامی در Telegram ارسال می‌کنید:

```text
1. اپلیکیشن Telegram → "سلام" را به عنوان Data آماده می‌کند

2. TCP → پورت مقصد (443) اضافه می‌کند → Segment

3. IP → آدرس IP سرور Telegram اضافه می‌کند → Packet

4. Ethernet → آدرس MAC روتر اضافه می‌کند → Frame

5. فیزیکی → Frame به سیگنال نوری/الکتریکی تبدیل → Bits
```

---

## ❓ سوالات مرور

1. فرآیند Encapsulation چیست؟
2. واحد داده لایه Transport چیست؟
3. TCP Header شامل چه اطلاعاتی است؟
4. چرا هر لایه Header جداگانه اضافه می‌کند؟
5. در De-encapsulation، اولین Header کدام حذف می‌شود؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| Encapsulation | کپسوله‌سازی | اضافه شدن Header در هر لایه |
| De-encapsulation | کپسوله‌زدایی | حذف Header در مقصد |
| Header | سرآیند | اطلاعات کنترلی اضافه‌شده به داده |
| Segment | بخش | واحد داده TCP |
| Packet | بسته | واحد داده IP |
| Frame | فریم | واحد داده Ethernet |

---

> **درس بعدی:** [مقایسه نهایی OSI و TCP/IP](04-comparison-osi-tcp-ip.md)
