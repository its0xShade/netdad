---
title: آدرس MAC
titleEn: Media Access Control Address
chapter: 4
chapterTitle: Ethernet و Switching
chapterEn: Ethernet & Switching
order: 2
difficulty: fundamentals
duration: 5
prerequisites:
  - 02-02-network-models/01
  - 03-03-physical-layer/01
summary: ''
slug: 4-2
---
# آدرس MAC — Media Access Control Address

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- ساختار آدرس MAC را توضیح دهد
- تفاوت آدرس MAC و آدرس IP را بیان کند
- نحوه یافتن آدرس MAC سیستم خود را بداند

---

> **پیش‌نیاز:** [Ethernet چیست؟](01-introduction-to-ethernet.md)

---

## ۱. آدرس MAC چیست؟

آدرس MAC یک شناسه **سخت‌افزاری ۶ بایتی (۴۸ بیتی)** است که به هر کارت شبکه (NIC) اختصاص داده شده و **منحصربفرد** است.

**فرمت:** `XX:XX:XX:XX:XX:XX` (hexadecimal)

مثال: `A4:C3:F0:12:34:56`

---

## ۲. ساختار آدرس MAC

```
A4:C3:F0:12:34:56
│       │
│       └── شماره سریال تولیدکننده (OUI + Serial)
└── OUI (rganizationally Unique Identifier)
     ───── ۳ بایت اول ─────
     شناسه سازنده کارت شبکه
```

- **۳ بایت اول:** OUI — شناسه سازنده (مثلاً Intel، Cisco)
- **۳ بایت دوم:** شماره سریال منحصربفرد

---

## ۳. انواع آدرس MAC

| نوع | توضیح |
|---|---|
| **Unicast** | ارسال به یک دستگاه خاص (بیت اول = 0) |
| **Broadcast** | ارسال به همه (FF:FF:FF:FF:FF:FF) |
| **Multicast** | ارسال به گروهی از دستگاه‌ها (بیت اول = 1) |

---

## ۴. MAC vs. IP

| ویژگی | MAC Address | IP Address |
|---|---|---|
| لایه | Data Link (لایه ۲) | Network (لایه ۳) |
| اندازه | ۴۸ بیت | ۳۲ بیت (IPv4) |
| نوع | سخت‌افزاری | منطقی |
| تغییر | ثابت (ساخت کارخانه) | متغیر (با شبکه) |
| مسیریابی | فقط در LAN | بین شبکه‌ها |

---

## ۵. یافتن آدرس MAC

**Windows:**
```bash
ipconfig /all
# Physical Address
```

**Linux/macOS:**
```bash
ip link show
# یا
ifconfig
```

---

## ۶. آیا می‌توان آدرس MAC را تغییر داد؟

**بله.** به این کار **MAC Spoofing** می‌گویند. برخی دلایل:
- حریم خصوصی
- تست امنیت
- دور زدن فیلتر MAC

> **نکته:** MAC Spoofing می‌تواند غیرقانونی باشد!

---

## ❓ سوالات مرور

1. آدرس MAC چند بایت است؟
2. OUI چیست؟
3. فرق MAC Unicast و Broadcast چیست؟
4. چرا IP و MAC هر دو لازم هستند؟
5. آدرس MAC را چگونه پیدا کنیم؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| MAC Address | آدرس MAC | شناسه سخت‌افزاری کارت شبکه |
| OUI | شناسه سازمانی | ۳ بایت اول آدرس MAC |
| NIC | کارت شبکه | Network Interface Card |
| Unicast | تک‌ارسال | ارسال به یک دستگاه |
| Broadcast | پخش | ارسال به همه |

---

> **درس بعدی:** [Frame — ساختار فریم اترنت](03-ethernet-frame.md)
