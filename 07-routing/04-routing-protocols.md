---
title: پروتکل‌های مسیریابی
titleEn: Routing Protocols
chapter: 7
chapterTitle: مسیریابی
chapterEn: Routing
order: 4
difficulty: practical
duration: 5
prerequisites:
  - 05-05-ip-addressing/01
  - 06-06-arp-and-ndp/01
summary: ''
slug: 7-4
---
# پروتکل‌های مسیریابی — Routing Protocols

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- RIP، OSPF و BGP را مقایسه کند
- مفاهیم自治系统 (AS) و Metric را درک کند
- تشخیص دهد هر پروتکل در چه مقیاسی استفاده می‌شود

---

> **پیش‌نیاز:** [مسیریابی استاتیک و داینامیک](03-static-dynamic-routing.md)

---

## ۱. انواع پروتکل بر اساس محدوده

| دسته | محدوده | پروتکل‌ها |
|---|---|---|
| **IGP** (Interior Gateway) | درون یک سازمان/AS | RIP, OSPF, EIGRP |
| **EGP** (Exterior Gateway) | بین سازمان‌ها | BGP |

---

## ۲. RIP — Routing Information Protocol

- **نوع:** Distance Vector
- **Metric:** تعداد Hop (حداکثر ۱۵)
- **به‌روزرسانی:** هر ۳۰ ثانیه
- **کاربرد:** شبکه‌های کوچک
- **محدودیت:** مقیاس کوچک (حداکثر ۱۵ Hop)

---

## ۳. OSPF — Open Shortest Path First

- **نوع:** Link State
- **Metric:** Cost (مبتنی بر پهنای باند)
- **الگوریتم:** Dijkstra
- **کاربرد:** سازمان‌های متوسط تا بزرگ
- **مزیت:** مقیاس‌پذیری بالا، بازیابی سریع

---

## ۴. BGP — Border Gateway Protocol

- **نوع:** Path Vector
- **کاربرد:** اتصال自治系统‌ها (AS) به هم — **پروتکل اصلی اینترنت**
- **ویژگی:** پیچیده‌ترین و مقیاس‌پذیرترین
- **استفاده:** بین ISPها

---

## ۵. خلاصه مقایسه

| ویژگی | RIP | OSPF | BGP |
|---|---|---|---|
| نوع | Distance Vector | Link State | Path Vector |
| مقیاس | کوچک | متوسط-بزرگ | بزرگ‌ترین |
| Metric | Hop | Cost | Path Attributes |
| سرعت همگرایی | کند | سریع | متوسط |

---

## ❓ سوالات مرور

1. تفاوت IGP و EGP چیست؟
2. RIP حداکثر چند Hop دارد؟
3. BGP چه نقشی در اینترنت دارد؟
4. OSPF از چه الگوریتمی استفاده می‌کند؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| IGP | پروتکل درون‌سازمانی | مسیریابی داخلی |
| EGP | پروتکل بین‌سازمانی | مسیریابی بیرونی |
| AS |自治系统 | مجموعه شبکه‌های تحت مدیریت واحد |
| Metric | معیار | معیار انتخاب بهترین مسیر |

---

> **درس بعدی:** [لایه انتقال — نمای کلی](../08-tcp-udp/01-transport-layer-overview.md)
