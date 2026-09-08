---
title: Firewall
titleEn: دیوار آتش
chapter: 11
chapterTitle: امنیت شبکه
chapterEn: Network Security
order: 2
difficulty: intermediate
duration: 5
prerequisites:
  - 08-08-tcp-udp/01
  - 09-09-dns-dhcp-nat/01
summary: ''
slug: 11-2
---
# Firewall — دیوار آتش

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- انواع فایروال را نام ببرد
- فایروال Stateful و Stateless را مقایسه کند
- نقش فایروال در امنیت شبکه را توضیح دهد

---

## ۱. فایروال چیست؟

فایروال دستگاه یا نرم‌افزاری است که ترافیک ورودی/خروجی را بر اساس **قوانین** فیلتر می‌کند.

---

## ۲. انواع فایروال

| نوع | توضیح |
|---|---|
| **Packet Filtering** | بررسی Header هر بسته (Stateless) |
| **Stateful** | وضعیت اتصالات را ردیابی می‌کند |
| **Application Layer** | محتوای داده را بررسی می‌کند |
| **Next-Gen (NGFW)** | ترکیب چند لایه + DPI + IPS |

---

## ۳. Stateless vs. Stateful

| ویژگی | Stateless | Stateful |
|---|---|---|
| ردیابی اتصال | خیر | بله |
| سرعت | سریع‌تر | کندتر |
| امنیت | پایه | پیشرفته‌تر |

---

## ۴. قوانین فایروال

```
اجازه: HTTPS (port 443) به همه
اجازه: DNS (port 53) به 8.8.8.8
مسدود: Telnet (port 23) به همه
مسدود: بقیه
```

---

## ❓ سوالات مرور

1. تفاوت Stateless و Stateful چیست؟
2. فایروال Next-Gen چه مزیتی دارد؟
3. فایروال لایه Application چه بررسی می‌کند؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| Firewall | دیوار آتش | فیلتر ترافیک |
| Stateful | وضعیت‌دار | ردیابی اتصال |
| NGFW | فایروال نسل جدید | ترکیب چند لایه |

---

> **درس بعدی:** [VPN](03-vpn.md)
