---
title: TCP Three-Way Handshake
titleEn: tcp-three-way-handshake
chapter: 8
chapterTitle: TCP و UDP
chapterEn: TCP and UDP
order: 3
difficulty: practical
duration: 5
prerequisites:
  - 02-02-network-models/01
summary: ''
slug: 8-3
---
# TCP Three-Way Handshake

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- مراحل Three-Way Handshake را توضیح دهد
- مفهوم SYN، SYN-ACK، ACK را بیان کند
- نحوه خاتمه اتصال (Four-Way Teardown) را توضیح دهد

---

## ۱. برقراری اتصال — Three-Way Handshake

قبل از انتقال داده، TCP یک اتصال برقرار می‌کند:

```
Client                          Server
   |                               |
   |  --- SYN (seq=x) ----------→ |  مرحله ۱
   |                               |
   |  ←-- SYN-ACK (seq=y,ack=x+1)-|  مرحله ۲
   |                               |
   |  --- ACK (ack=y+1) --------→ |  مرحله ۳
   |                               |
   |    اتصال برقرار شد ✓          |
```

**مرحله ۱ — SYN:** Client درخواست اتصال می‌دهد
**مرحله ۲ — SYN-ACK:** Server درخواست را تأیید و پاسخ می‌دهد
**مرحله ۳ — ACK:** Client تأیید نهایی را ارسال می‌کند

---

## ۲. خاتمه اتصال — Four-Way Teardown

```
Client                          Server
   |  --- FIN ----------------→ |  Client می‌خواهد قطع کند
   |  ←-- ACK ---------------- |  Server تأیید می‌کند
   |  ←-- FIN ---------------- |  Server هم می‌خواهد قطع کند
   |  --- ACK ----------------→ |  Client تأیید می‌کند
   |    اتصال قطع شد ✗          |
```

---

## ۳. مثال واقعی

وقتی وارد سایتی می‌شوید:
1. Browser با پورت ۸۰/۴۴۳ سرور TCP Handshake انجام می‌دهد
2. اتصال برقرار می‌شود
3. HTTP Request ارسال می‌شود
4. پاسخ دریافت می‌شود
5. اتصال بسته می‌شود (یا keep-alive باقی می‌ماند)

---

## ❓ سوالات مرور

1. Three-Way Handshake چند مرحله دارد؟
2. پرچم SYN چه معنی دارد؟
3. چرا Four-Way Teardown لازم است؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| Three-Way Handshake | اتصال سه‌طرفه | برقراری اتصال TCP |
| Four-Way Teardown | قطع چهارطرفه | خاتمه اتصال TCP |
| SYN | همگام‌سازی | درخواست اتصال |
| FIN | پایان | درخواست قطع اتصال |

---

> **درس بعدی:** [UDP — ساختار و عملکرد](04-udp-structure.md)
