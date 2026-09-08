---
title: VLAN
titleEn: Virtual Local Area Network
chapter: 4
chapterTitle: Ethernet و Switching
chapterEn: Ethernet & Switching
order: 5
difficulty: fundamentals
duration: 5
prerequisites:
  - 02-02-network-models/01
  - 03-03-physical-layer/01
summary: ''
slug: 4-5
---
# VLAN — Virtual Local Area Network

## 🎯 اهداف یادگیری

در پایان این درس، دانشجو می‌تواند:

- VLAN را به‌عنوان تقسیم منطقی شبکه توضیح دهد
- مزایای VLAN را بیان کند
- نحوه عبور ترافیک بین VLANها را توضیح دهد

---

> **پیش‌نیاز:** [Switch Operation](04-switch-operation.md)

---

## ۱. مشکل: Broadcast Domain بزرگ

بدون VLAN، تمام پورت‌های Switch در یک Broadcast Domain قرار دارند. هر Broadcast به همه پورت‌ها می‌رسد → کندی و مشکلات امنیتی.

---

## ۲. VLAN چیست؟

**VLAN** تقسیم منطقی یک Switch فیزیکی به چند شبکه منطقی مستقل است.

```text
Switch فیزیکی (۲۴ پورت)
┌──────────────────────────┐
│ VLAN 10: پورت ۱-۸ (مالی) │
│ VLAN 20: پورت ۹-۱۶ (IT)  │
│ VLAN 30: پورت ۱۷-۲۴ (مدیریت)│
└──────────────────────────┘
```

پورت ۱ (VLAN 10) نمی‌تواند Broadcast را به پورت ۹ (VLAN 20) برساند — حتی روی یک Switch واحد!

---

## ۳. مزایای VLAN

| مزیت | توضیح |
|---|---|
| **کاهش Broadcast** | Broadcast فقط در VLAN خودش |
| **امنیت** | جداسازی ترافیک گروه‌ها |
| **انعطاف‌پذیری** | تغییر منطقی بدون کابل‌کشی مجدد |
| **مدیریت آسان** | گروه‌بندی منطقی |

---

## ۴. انواع پورت

| نوع | توضیح |
|---|---|
| **Access Port** | پورتی که فقط در یک VLAN است (اتصال کامپیوتر) |
| **Trunk Port** | پورتی که ترافیک چند VLAN را حمل می‌کند (اتصال Switch به Switch) |

---

## ۵. VLAN Tagging (IEEE 802.1Q)

وقتی ترافیک چند VLAN از یک Trunk عبور می‌کند، یک **Tag** به Frame اضافه می‌شود:

```
┌──────────┬─────────┬──────┬───────┬─────┬──────┐
│ DST MAC  │SRC MAC  │Tag   │ Type  │ Data│ FCS  │
│ 6B       │ 6B      │4B    │ 2B    │     │ 4B   │
└──────────┴─────────┴──────┴───────┴─────┴──────┘
                       ↑
            VLAN ID (12 بیت → حداکثر ۴۰۹۴ VLAN)
```

---

## ۶. Inter-VLAN Routing

برای اتصال دو VLAN به هم، به **Router** یا **Layer 3 Switch** نیاز است:

```
VLAN 10 ←→ [Router] ←→ VLAN 20
```

**روش‌ها:**
1. **Router-on-a-Stick** — روتر با یک لینک Trunk به Switch
2. **Layer 3 Switch** — سوئیچ با قابلیت روتینگ (SVI)

---

## ❓ سوالات مرور

1. VLAN چه مشکلی را حل می‌کند؟
2. Access Port و Trunk Port چه تفاوتی دارند؟
3. IEEE 802.Q چیست؟
4. چگونه ترافیک بین VLANها منتقل می‌شود؟

---

## 📚 اصطلاحات مهم

| English | فارسی | توضیح |
|---|---|---|
| VLAN | شبکه محلی مجازی | تقسیم منطقی Switch |
| Access Port | پورت دسترسی | پورت تک‌VLAN |
| Trunk Port | پورت ترانک | پورت چند-VLAN |
| Tagging | برچسب‌گذاری | اضافه کردن VLAN ID به Frame |
| 802.1Q | — | استاندارد VLAN Tagging |

---

> **درس بعدی:** [آدرس‌دهی IPv4](../05-ip-addressing/01-ipv4-addressing.md)
