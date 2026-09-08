---
title: مفاهیم امنیت شبکه
titleEn: Network Security Concepts
chapter: 11
chapterTitle: امنیت شبکه
chapterEn: Network Security
order: 1
difficulty: intermediate
duration: 5
prerequisites:
  - 08-08-tcp-udp/01
  - 09-09-dns-dhcp-nat/01
summary: ''
slug: 11-1
---
# مفاهیم امنیت شبکه — Network Security Concepts

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- مثلث CIA را توضیح دهد
- انواع تهدیدات شبکه را بشناسد
- اصول امنیت پایه را بیان کند

---

## ۱. مثلث CIA

سه ستون امنیت:

| مفهوم | توضیح | مثال |
|---|---|---|
| **Confidentiality** | محرمانگی — دسترسی فقط برای مجازان | رمزنگاری |
| **Integrity** | یکپارچگی — تغییر نکردن داده | Checksum, Hash |
| **Availability** | در دسترس بودن — سرویس همیشه فعال | قابلیت اطمینان |

---

## ۲. اصول امنیتی

- **Defense in Depth:** چند لایه امنیتی
- **Least Privilege:** حداقل دسترسی لازم
- **Need to Know:** فقط اطلاعات ضروری
- **Separation of Duties:** جداسازی وظایف

---

## ۳. انواع تهدیدات

| تهدید | توضیح |
|---|---|
| Malware | ویروس، تروجان، رمزافزار |
| Phishing | فیشینگ — فریب برای دریافت اطلاعات |
| DoS/DDoS | از کار انداختن سرویس |
| Man-in-the-Middle | شنود و تغییر ارتباط |
| Social Engineering | مهندسی اجتماعی |

---

## ۴. ابزارهای امنیتی

- Firewall
- IDS/IPS
- VPN
- آنتی‌ویروس
- رمزنگاری

---

## ❓ سوالات مرور

1. مثلث CIA شامل چه مفاهیمی است؟
2. DDoS چیست؟
3. Defense in Depth چه معنی دارد؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| CIA | مثلث امنیتی | محرمانگی، یکپارچگی، در دسترس |
| DoS | سرویس‌دهی | حمله از کار انداختن |
| DDoS | سرویس‌دهی توزیع‌شده | حمله از چند منبع |

---

> **درس بعدی:** [Firewall](02-firewall.md)
