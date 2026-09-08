---
title: Switch چگونه کار می‌کند؟
titleEn: Layer 2 Switching
chapter: 4
chapterTitle: Ethernet و Switching
chapterEn: Ethernet & Switching
order: 4
difficulty: fundamentals
duration: 5
prerequisites:
  - 02-02-network-models/01
  - 03-03-physical-layer/01
summary: ''
slug: 4-4
---
# Switch چگونه کار می‌کند؟ — Layer 2 Switching

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- نحوه یادگیری آدرس MAC توسط Switch را توضیح دهد
- مکانیزم Forwarding و Filtering را بیان کند
- تفاوت Switching modes را مقایسه کند

---

> **پیش‌نیاز:** [آدرس MAC](02-mac-address.md) و [ساختار Frame](03-ethernet-frame.md)

---

## ۱. مقدمه

Switch دستگاهی است که در **لایه ۲ OSI** کار می‌کند و Frameها را بر اساس **آدرس MAC** به پورت صحیح ارسال می‌کند.

---

## ۲. MAC Address Table

Switch یک جدول داخلی به نام **MAC Address Table** (یا CAM Table) دارد که نگاشت آدرس MAC به پورت را ذخیره می‌کند:

```
┌─────────────────────┐
│ MAC Address Table   │
├───────────┬─────────┤
│ MAC       │ Port    │
├───────────┼─────────┤
│ AA:BB:CC: │ Port 1  │
│  11:22:33 │         │
│ DD:EE:FF: │ Port 3  │
│  44:55:66 │         │
└───────────┴─────────┘
```

---

## ۳. نحوه یادگیری (Learning)

Switch به‌صورت **خودکار** آدرس MAC دستگاه‌های متصل را یاد می‌گیرد:

1. دستگاه A از پورت ۱ فریمی ارسال می‌کند
2. Switch آدرس MAC مبدأ (A) را با پورت ۱ در جدول ذخیره می‌کند
3. اگر MAC مقصد در جدول نباشد، فریم را به **همه پورت‌ها** ارسال می‌کند (**Flooding**)
4. وقتی دستگاه B پاسخ می‌دهد، Switch MAC B را با پورت ۳ یاد می‌گیرد
5. حالا ارتباط A↔B مستقیم و سریع است

---

## ۴. Forwarding و Filtering

| عمل | توضیح |
|---|---|
| **Forwarding** | ارسال Frame فقط به پورت مقصد |
| **Filtering** | نگه‌داشتن Frame (اگر مبدأ و مقصد روی همان پورت باشند) |
| **Flooding** | ارسال به همه پورت‌ها (وقتی مقصد ناشناخته است) |

---

## ۵. حالت‌های Switching

| حالت | توضیح | تأخیر | کاربرد |
|---|---|---|---|
| **Store-and-Forward** | کل Frame را می‌خواند، FCS بررسی، بعد Forward | بیشتر | رایج‌ترین، مطمئن‌ترین |
| **Cut-Through** | فقط Destination MAC را می‌خواند، بلافاصله Forward | کمتر | سرعت بالا |
| **Fragment-Free** | ۶۴ بایت اول را بررسی می‌کند | متوسط | تعادل |

---

## ۶. Collision Domain

هر پورت Switch یک **Collision Domain** مجزا دارد:

```text
       [PC1]        [PC2]
        │             │
   ┌────┤             ├────┐
   │P1  │  Switch     │ P2 │  ← هر پورت مستقل
   └────┘             └────┘
```

**نتیجه:** در Switch، هر پورت پهنای باند اختصاصی دارد و Collision وجود ندارد (در Full Duplex).

---

## ۷. Broadcast Domain

Switch کل **Broadcast Domain** را گسترش می‌دهد — یعنی Broadcast از همه پورت‌ها خارج می‌شود:

```
PC1 ── Switch ── PC2 ── Switch ── PC3
        ↑
  Broadcast از PC1 به PC2 و PC3 می‌رسد
```

برای جدا کردن Broadcast Domain به **Router** یا **VLAN** نیاز است.

---

## ❓ سوالات مرور

1. Switch در کدام لایه OSI کار می‌کند؟
2. MAC Address Table چه اطلاعاتی ذخیره می‌کند؟
3. Flooding چه زمانی اتفاق می‌افتد؟
4. تفاوت Store-and-Forward و Cut-Through چیست؟
5. Switch یا Hub — کدام Collision Domain کمتری ایجاد می‌کند؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| MAC Address Table | جدول آدرس MAC | نگاشت MAC به پورت |
| Forwarding | ارسال | ارسال Frame به پورت مقصد |
| Flooding | سیلاب | ارسال به همه پورت‌ها |
| Collision Domain | دامنه برخورد | مجموعه دستگاه‌های دارای تداخل |
| Broadcast Domain | دامنه پخش | مجموعه دستگاه‌های دریافت‌کننده Broadcast |

---

> **درس بعدی:** [VLAN — Virtual LAN](05-vlan.md)
