---
title: ابزارهای عیب‌یابی
titleEn: Troubleshooting Tools
chapter: 12
chapterTitle: عیب‌یابی شبکه
chapterEn: Network Troubleshooting
order: 1
difficulty: practical
duration: 5
prerequisites:
  - 01-01-network-fundamentals/01
  - 02-02-network-models/01
summary: ''
slug: 12-1
---
# ابزارهای عیب‌یابی — Troubleshooting Tools

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- ابزارهای اصلی عیب‌یابی شبکه را نام ببرد
- از ping و traceroute استفاده کند
- ipconfig/ifconfig را بخواند

---

## ۱. ابزارهای اصلی

### ping

تست اتصال و تأخیر:

```bash
ping 8.8.8.8
# Reply from 8.8.8.8: bytes=32 time=12ms TTL=116
```

### traceroute / tracert

مسیر بسته تا مقصد:

```bash
traceroute google.com
# 1  192.168.1.1  1ms   (روتر خانگی)
# 2  10.0.0.1     5ms   (ISP)
# 3  ...               (مسیر)
```

### ipconfig (Windows) / ip addr (Linux)

بررسی تنظیمات شبکه:

```bash
ipconfig /all
# آدرس IP، Subnet Mask، Gateway، DNS
```

```bash
ip addr show
# آدرس IP و وضعیت رابط‌ها
```

### nslookup / dig

تست DNS:

```bash
nslookup google.com
# Address: 142.250.185.78
```

### netstat / ss

بررسی اتصالات فعال:

```bash
netstat -tuln
# لیست پورت‌های شنودشونده
```

---

## ۲. فرمان‌های مکمل

| فرمان | کاربرد |
|---|---|
| `arp -a` | جدول ARP |
| `route print` | جدول مسیریابی |
| `pathping` | ترکیب ping و traceroute |

---

## ❓ سوالات مرور

1. ping چه اطلاعاتی می‌دهد؟
2. تفاوت traceroute و ping چیست؟
3. چگونه DNS را تست کنیم؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| Ping | — | تست اتصال و RTT |
| Traceroute | — | نمایش مسیر بسته |
| TTL | — | شمارنده عبور روترها |

---

> **درس بعدی:** [روش‌شناسی عیب‌یابی](02-troubleshooting-methodology.md)
