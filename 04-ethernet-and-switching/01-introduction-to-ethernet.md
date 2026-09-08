---
title: Ethernet چیست؟
titleEn: Introduction to Ethernet
chapter: 4
chapterTitle: Ethernet و Switching
chapterEn: Ethernet & Switching
order: 1
difficulty: fundamentals
duration: 5
prerequisites:
  - 02-02-network-models/01
  - 03-03-physical-layer/01
summary: ''
slug: 4-1
---
# Ethernet چیست؟ — Introduction to Ethernet

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- Ethernet را به‌عنوان استاندارد اصلی LAN توضیح دهد
- تاریخچه مختصر و نسخه‌های مختلف Ethernet را بشناسد
- نحوه عملکرد Ethernet در لایه ۲ OSI را درک کند

---

> **پیش‌نیاز:** [مدل OSI](../02-network-models/01-osi-model.md)

---

## ۱. مقدمه

**Ethernet** استاندارد اصلی شبکه‌های محلی (LAN) باسیم است. تقریباً تمام شبکه‌های باسیم امروزی از Ethernet استفاده می‌کنند.

---

## ۲. تاریخچه مختصر

| سال | نسخه | سرعت |
|---|---|---|
| ۱۹۷۳ | Ethernet اصلی | 2.94 Mbps |
| ۱۹۸۰ | Ethernet II (DIX) | 10 Mbps |
| ۱۹۹۵ | Fast Ethernet (802.3u) | 100 Mbps |
| ۱۹۹۹ | Gigabit Ethernet (802.3ab) | 1 Gbps |
| ۲۰۰۶ | 10 Gigabit Ethernet (802.3ae) | 10 Gbps |
| ۲۰۱۰ | 40G/100G Ethernet (802.3ba) | 40-100 Gbps |

---

## ۳. Ethernet در لایه ۲ OSI

Ethernet در **لایه Data Link** (لایه ۲) کار می‌کند و دو زیرلایه دارد:

- **MAC (Media Access Control)** — آدرس‌دهی و کنترل دسترسی
- **LLC (Logical Link Control)** — اتصال با لایه بالا

---

## ۴. ویژگی‌های اصلی Ethernet

- **روش دسترسی:** CSMA/CD (برای شبکه‌های مشترک)
- **قالب فریم:** Ethernet Frame با Header، Data و Trailer
- **آدرس‌دهی:** بر اساس آدرس MAC ۶ بایتی
- **توپولوژی فیزیکی:** Star (امروزی)
- **توپولوژی منطقی:** Bus (امروزی Star)

---

## ۵. CSMA/CD

**Carrier Sense Multiple Access / Collision Detection**

روشی که Ethernet برای مدیریت دسترسی به رسانه اشتراکی استفاده می‌کرد:

1. **Carrier Sense:** قبل از ارسال، گوش بده آیا لینک مشغول است
2. **Multiple Access:** چند دستگاه می‌توانند به رسانه مشترک دسترسی داشته باشند
3. **Collision Detection:** اگر دو دستگاه همزمان ارسال کنند، تشخیص بده

> **نکته:** در Ethernet مدرن (Full Duplex با Switch)، CSMA/CD دیگر استفاده نمی‌شود چون هر پورت مستقل است.

---

## ❓ سوالات مرور

1. Ethernet در کدام لایه OSI کار می‌کند؟
2. سرعت Gigabit Ethernet چقدر است؟
3. CSMA/CD چه کاری انجام می‌دهد؟
4. چرا CSMA/CD در شبکه‌های مدرن کمتر استفاده می‌شود؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| Ethernet | اترنت | استاندارد اصلی LAN باسیم |
| CSMA/CD | — | روش تشخیص برخورد |
| Full Duplex | تمام‌دوطرفه | ارسال و دریافت همزمان |
| Half Duplex | نیمه‌دوطرفه | ارسال یا دریافت (نه هر دو) |

---

> **درس بعدی:** [آدرس MAC](02-mac-address.md)
