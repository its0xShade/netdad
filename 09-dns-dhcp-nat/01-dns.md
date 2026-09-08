---
title: DNS
titleEn: Domain Name System
chapter: 9
chapterTitle: DNS، DHCP و NAT
chapterEn: 'DNS, DHCP & NAT'
order: 1
difficulty: practical
duration: 5
prerequisites:
  - 05-05-ip-addressing/01
  - 08-08-tcp-udp/01
summary: ''
slug: 9-1
---
# DNS — Domain Name System

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- DNS را به‌عنوان دفتر تلفن اینترنت توضیح دهد
- فرآیند DNS Resolution را مراحل به مراحل شرح دهد
- انواع رکوردهای DNS را نام ببرد

---

## ۱. DNS چیست؟

**Domain Name System** سیستم تبدیل **نام دامنه** به **آدرس IP** است.

بدون DNS باید به‌جای `google.com` عدد `142.250.185.78` را حفظ باشید!

---

## ۲. ساختار DNS (درختی)

```
. (Root)
├── .com
│   ├── google.com → 142.250.185.78
│   └── example.com
├── .org
│   └── wikipedia.org
└── .ir
    └── google.ir
```

---

## ۳. فرآیند DNS Resolution

وقتی `google.com` را تایپ می‌کنید:

```
۱. Browser Cache ← آیا قبلاً پرسیده؟
۲. OS Cache     ← آیا سیستم عامل می‌داند؟
۳. Router Cache ← آیا روتر می‌داند؟
۴. ISP DNS Server ← سرور DNS ارائه‌دهنده
۵. Root Server  ← "." را پیدا می‌کند
۶. .com Server  ← "com." را پیدا می‌کند
۷. Google DNS   ← "google.com" → 142.250.185.78
۸. پاسخ بر‌می‌گردد → Browser صفحه را باز می‌کند
```

---

## ۴. انواع رکوردهای DNS

| رکورد | توضیح | مثال |
|---|---|---|
| **A** | نام → IPv4 | google.com → 142.250.185.78 |
| **AAAA** | نام → IPv6 | google.com → 2607:f8b0:4004:... |
| **CNAME** | نام → نام دیگر | www → google.com |
| **MX** | سرور ایمیل | → mail.google.com |
| **NS** | سرور DNS | → ns1.google.com |
| **TXT** | متن (SPF, DKIM) | → "v=spf1 include:..." |

---

## ۵. ابزارهای DNS

**Windows:** `nslookup google.com`
**Linux/Mac:** `dig google.com`

**سرورهای DNS عمومی:**

| سرور | آدرس |
|---|---|
| Google | 8.8.8.8 و 8.8.4.4 |
| Cloudflare | 1.1.1.1 |
| Quad9 | 9.9.9.9 |

---

## ۶. TTL (Time To Live)

هر رکورد DNS یک **TTL** دارد (ثانیه) — مدت زمانی که در Cache ذخیره می‌ماند.

---

## ❓ سوالات مرور

1. DNS چه کاری انجام می‌دهد؟
2. رکورد A و AAAA چه تفاوتی دارند؟
3. فرآیند DNS Resolution از کجا شروع می‌شود؟
4. TTL چیست؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| DNS | سامانه نام دامنه | تبدیل نام به IP |
| A Record | رکورد A | نام → IPv4 |
| TTL | زمان زندگی | مدت Cache رکورد |
| DNS Resolver | حل‌کننده DNS | سرور DNS محلی |

---

> **درس بعدی:** [DHCP](02-dhcp.md)
