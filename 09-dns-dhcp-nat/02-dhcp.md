---
title: DHCP
titleEn: Dynamic Host Configuration Protocol
chapter: 9
chapterTitle: DNS، DHCP و NAT
chapterEn: 'DNS, DHCP & NAT'
order: 2
difficulty: practical
duration: 5
prerequisites:
  - 05-05-ip-addressing/01
  - 08-08-tcp-udp/01
summary: ''
slug: 9-2
---
# DHCP — Dynamic Host Configuration Protocol

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- DHCP را به‌عنوان سرویس آدرس‌دهی خودکار توضیح دهد
- فرآیند DORA را مراحل به مراحل شرح دهد
- تنظیمات DHCP را بیان کند

---

## ۱. DHCP چیست؟

**Dynamic Host Configuration Protocol** به‌صورت **خودکار** آدرس IP و سایر تنظیمات شبکه را به دستگاه‌ها اختصاص می‌دهد.

بدون DHCP باید آدرس IP، Subnet Mask، Gateway و DNS را روی هر دستگاه **دستی** وارد کنید!

---

## ۲. فرآیند DORA

```
Client                              DHCP Server
   |                                    |
   |  --- ۱. DISCOVER (Broadcast) ---→ |  "آیا سرور DHCP هست؟"
   |                                    |
   |  ←-- ۲. OFFER (Unicast) --------- |  "آدرس 192.168.1.100 پیشنهاد می‌دهم"
   |                                    |
   |  --- ۳. REQUEST (Broadcast) ----→ |  "قبول! آدرس 192.168.1.100 می‌خواهم"
   |                                    |
   |  ←-- ۴. ACK (Unicast) ----------- |  "تأیید! مال تو شد"
   |                                    |
```

**D**iscover → **O**ffer → **R**equest → **A**ck = **DORA**

---

## ۳. اطلاعات DHCP

DHCP علاوه بر آدرس IP، این تنظیمات را نیز ارسال می‌کند:

- **Subnet Mask**
- **Default Gateway** (روتر)
- **DNS Server**
- **Lease Time** (مدت اعتبار آدرس)

---

## ۴. Lease Time

آدرس IP به‌صورت **امانی** (Lease) داده می‌شود. بعد از مدتی باید تمدید شود.

```
Lease Time: ۲۴ ساعت
۱۲ ساعت بعد: Client درخواست تمدید (RENEW) می‌دهد
```

---

## ۵. APIPA — وقتی DHCP کار نمی‌کند

اگر دستگاه نتواند از DHCP آدرس بگیرد، به‌صورت خودکار آدرسی در بازه `169.254.x.x` اختصاص می‌دهد.

---

## ❓ سوالات مرور

1. DHCP چه چیزهایی را به‌صورت خودکار تنظیم می‌کند؟
2. حروف DORA نشان‌دهنده چه مراحلی هستند؟
3. Lease Time چیست؟
4. APIPA چه زمانی استفاده می‌شود؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| DHCP | پروتکل پیکربندی خودکار | آدرس‌دهی خودکار |
| DORA | — | مراحل DHCP |
| Lease | امانی | مدت اعتبار آدرس |
| APIPA | — | آدرس خودکار 169.254.x.x |

---

> **درس بعدی:** [NAT](03-nat.md)
