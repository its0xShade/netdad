---
title: مهاجرت و هماهنگی با IPv4
titleEn: ipv4
chapter: 13
chapterTitle: IPv6
chapterEn: IPv6
order: 3
difficulty: practical
duration: 5
prerequisites:
  - 05-05-ip-addressing/01
summary: ''
slug: 13-3
---
# مهاجرت و هماهنگی با IPv4

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- روش‌های انتقال از IPv4 به IPv6 را نام ببرد
- Dual Stack را توضیح دهد
- Tunneling و Translation را شرح دهد

---

## ۱. چرا انتقال ناگهانی غیرممکن است؟

میلیاردها دستگاه و میلیون‌ها شبکه هنوز IPv4 دارند. انتقال باید **تدریجی** باشد.

---

## ۲. روش‌های انتقال

### Dual Stack
دستگاه هم IPv4 و هم IPv6 را همزمان پشتیبانی می‌کند:

```
[دستگاه] ──── IPv4 ────→ شبکه IPv4
   │
   └──── IPv6 ────→ شبکه IPv6
```

**رایج‌ترین روش انتقال**

### Tunneling
بسته‌های IPv6 داخل بسته‌های IPv4 پنهان می‌شوند:

```
IPv6 Packet → IPv4 Header → ارسال از طریق شبکه IPv4 → IPv6 Packet
```

### Translation (NAT64)
تبدیل آدرس IPv6 به IPv4 و بالعکس (وقتی فقط یک پروتکل موجود است).

---

## ۳. وضعیت فعلی

- IPv6 حدود **۴۰٪** ترافیک جهانی را تشکیل می‌دهد
- ایران و برخی کشورها IPv6 فعال دارند
- Dual Stack رایج‌ترین روش است

---

## ❓ سوالات مرور

1. Dual Stack چیست؟
2. Tunneling چگونه کار می‌کند؟
3. چرا انتقال ناگهانی ممکن نیست؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| Dual Stack | پشته دوگانه | IPv4 + IPv6 همزمان |
| Tunneling | تونل‌سازی | IPv6 درون IPv4 |
| NAT64 | — | تبدیل IPv6 ↔ IPv4 |

---

> **درس بعدی:** [Cloud Computing و شبکه](../14-cloud-and-modern-networking/01-cloud-computing.md)
