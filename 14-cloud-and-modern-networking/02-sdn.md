---
title: SDN
titleEn: Software-Defined Networking
chapter: 14
chapterTitle: Cloud و شبکه‌های مدرن
chapterEn: Cloud & Modern Networking
order: 2
difficulty: intermediate
duration: 5
prerequisites:
  - 01-01-network-fundamentals/01
  - 08-08-tcp-udp/01
summary: ''
slug: 14-2
---
# SDN — Software-Defined Networking

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- SDN را به‌عنوان جداسازی کنترل از داده توضیح دهد
- مزایای SDN را بیان کند
- SD-WAN را معرفی کند

---

## ۱. SDN چیست؟

**Software-Defined Networking** رویکردی است که **لایه کنترل** (تصمیم‌گیری مسیر) از **لایه داده** (ارسال واقعی) جدا می‌شود.

```
سنتی:
[روتر] = کنترل + داده در یک دستگاه

SDN:
[Controller] = کنترل مرکزی
     ↓ قوانین
[Switches] = فقط ارسال داده
```

---

## ۲. لایه‌های SDN

| لایه | توضیح |
|---|---|
| **Application** | برنامه‌های مدیریت شبکه |
| **Control** | Controller مرکزی (Decision Maker) |
| **Infrastructure** | Switch/Router (Data Plane) |

---

## ۳. مزایای SDN

- **مدیریت مرکزی:** یک نقطه کنترل
- **انعطاف‌پذیری:** تغییر سریع قوانین
- **دید کامل:** نمای جامع از شبکه
- **اتوماسیون:** پیکربندی خودکار
- **کاهش هزینه:** نیاز به تجهیزات گران‌تر کمتر

---

## ۴. SD-WAN

**Software-Defined WAN** مدیریت هوشمند ترافیک WAN با استفاده از اصول SDN.

- انتخاب خودکار بهترین مسیر (MPLS، اینترنت، 4G)
- اولویت‌بندی ترافیک Cloud
- مدیریت متمرکز

---

## ❓ سوالات مرور

1. SDN چه چیزی را جدا می‌کند؟
2. Controller در SDN چه کاری انجام می‌دهد؟
3. SD-WAN چه مزیتی دارد؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| SDN | شبکه‌سازی تعریف‌شده نرم‌افزاری | جداسازی کنترل و داده |
| SD-WAN | WAN تعریف‌شده نرم‌افزاری | مدیریت هوشمند WAN |
| Controller | کنترلر | نقطه کنترل مرکزی |
| Data Plane | لایه داده | ارسال واقعی بسته‌ها |

---

> **درس بعدی:** [آینده شبکه‌ها](03-future-of-networking.md)
