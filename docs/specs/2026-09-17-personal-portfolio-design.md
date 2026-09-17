# Design Specification — Personal Portfolio Website

**Date:** 2026-09-17  
**Project:** fayyazzadeh.ir  
**Repository:** fayyazzadeh/fayyazadeh

## 1. Goal

Build a professional Persian RTL personal portfolio for **رامین فیاض‌زاده**, presenting 15+ years of IT experience with emphasis on network, infrastructure, systems support, virtualization, and web skills. The site should also communicate availability for part-time professional opportunities.

## 2. Visual Direction

- Dark, technological, premium, professional aesthetic.
- Cyan/turquoise accent with restrained glow; avoid a gaming aesthetic.
- Suggested palette:
  - Background: `#071014`
  - Primary cyan: `#00D9E8`
  - Light cyan: `#8BEAF0`
  - Main text: `#EAFBFC`
  - Secondary text: cool grays
- Subtle network-topology visual treatment in the Hero background.
- Profile photo is a placeholder initially and will be replaced later by the user's photo.

## 3. Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- Vercel deployment
- RTL-first Persian layout, with structure ready for future English support.

## 4. Sections

### Hero

Content direction:

- `HELLO, I'M`
- `رامین فیاض‌زاده`
- `IT Specialist`
- `Network & Infrastructure`
- `Network • Infrastructure • Support`
- `15+ Years Experience`
- `من با فناوری کار نمی‌کنم؛ مشکلاتش را حل می‌کنم.` (provisional copy)
- `● Available for Part-Time Opportunities`
- CTA buttons: `درباره من` and `سوابق کاری`

### About

Use a professional + personal narrative describing 15+ years in IT, growth from hardware/support into networks, servers, virtualization, organizational systems and web management, continuous learning, research, problem solving, teamwork, and current availability for part-time work due to shift work at the airport.

Supporting cards:

- `15+` years experience
- `IT` Network & Infrastructure
- `∞` continuous learning
- `●` Available for Part-Time

### Skills

Use categorized tag/badge presentation, not percentage progress bars.

**Network & Infrastructure**
- Network+
- CCNA
- MTCNA
- Active & Passive Network
- MikroTik
- TCP/IP & Network Services
- راه‌اندازی و عیب‌یابی شبکه
- کابل‌کشی و داکت‌کشی
- Rack & Server Room

**Server & Virtualization**
- Windows Server
- VMware ESXi
- Virtualization
- GNU/Linux

**Hardware & IT Support**
- سخت‌افزار کامپیوتر
- نصب و راه‌اندازی سیستم‌ها
- تعمیر و عیب‌یابی
- ارتقاء سیستم‌ها
- Ticketing System
- پشتیبانی کاربران

**Web & Digital**
- WordPress
- طراحی وب
- مدیریت وب‌سایت

**Professional**
- حل مسئله
- مشاوره IT
- کار تیمی
- یادگیری و تحقیق

Fiber Optics is intentionally omitted from the Skills section per user request.

### Work Experience

Use a newest-to-oldest vertical timeline. Each entry is initially collapsed and expands with a smooth animation to show full responsibilities. Current/simultaneous roles remain separate and preserve their actual dates.

1. IT کارشناس — ۰۷/۱۳۹۵ - اکنون — فرودگاه بین المللی مهرآباد
   - پشتیبانی سیستم‌های رایانه‌ای، نصب و راه اندازی سیستم، انجام امورات پسیو شبکه، آرایش رک، تعمیر و عیب یابی و ارتقاء سیستم‌ها، انجام امورات تحت شبکه
2. IT کارشناس — ۰۱/۱۴۰۴ - اکنون — کیان بتون پارسه
   - کارشناس فنی و پشتیبانی مجموعه؛ تعمیر و نگهداری سیستم‌های شرکت و کارگاه‌های مستقر در سطح شهر؛ مدیریت و نگهداری سایت شرکت؛ مشاوره در زمینه توسعه شبکه
3. IT کارشناس — ۱۰/۱۴۰۳ - اکنون — تعاونی تولیدی توزیعی مجموعه میلاد پرنیا ایرانیان
   - کارشناس IT و پشتیبانی دفتر مرکزی و کارخانه؛ مدیریت و پشتیبانی سایت مجموعه؛ مدیریت سرور و دوربین‌های شرکت؛ VMware, ESXi, MikroTik, GRE, VOIP
4. موسس — ۰۸/۱۴۰۲ - اکنون — موسسه طراحی سایت Tashtag
   - مدیر سایت Tashtag؛ طراحی سایت‌های فروشگاهی، شرکتی و شخصی؛ برای مشاهده نمونه کار به tashtag.com مراجعه شود.
5. IT کارشناس — ۰۴/۱۴۰۲ - ۱۲/۱۴۰۲ — شرکت تعاونی میراث فرهنگی، گردشگری و صنایع دستی ایرانیان
   - مدیر فناوری اطلاعات و ارتباطات، شبکه و سیستم‌های اداری؛ پشتیبانی شبکه و سیستم‌های اداری؛ مسئول وبسایت hamiyanco.com؛ مسئول سرویس‌های اجرایی در مجموعه؛ Virtualization, MTCNA, MCSE
6. بهره بردار — ۰۸/۱۴۰۱ - ۰۱/۱۴۰۲ — پروژه بام نیایش
   - عضو تیم بهره‌برداری زیرساخت و اینترنت واحدها و شبکه و دوربین مداربسته بام نیایش؛ انجام امورات پسیو شبکه، فیبر نوری، کابل کشی، داکت کشی و نصب دوربین در واحد‌ها بنا به نیاز مشتری؛ نصب ویندوز و برنامه‌های کاربردی، پرینتر و راه‌اندازی شبکه
7. مدرس کامپیوتر — ۰۷/۱۳۹۹ - ۰۳/۱۴۰۰ — موسسه علوی
   - تدریس IT و آشنایی با فناوری اطلاعات و نرم‌افزارهای کاربردی
8. خدمات پس از فروش — ۰۴/۱۳۹۲ - ۰۶/۱۳۹۵ — شرکت دایاتک کساء
   - تکنسین و مسئول خدمات پس از فروش محصولات شبکه و تین کلاینت
9. مسئول فروش — ۰۴/۱۳۹۲ - ۰۶/۱۳۹۵ — شرکت دایاتک کساء
   - مسئول فروش محصولات اکتیو و پسیو شبکه
10. انباردار — ۰۴/۱۳۹۲ - ۰۶/۱۳۹۴ — شرکت دایاتک کساء
    - انباردار
11. مسئول آموزش و برنامه ریزی آموزشی کل کشور — ۰۱/۱۳۸۹ - ۱۰/۱۳۹۰ — خانه کارگر
    - برنامه‌ریزی و هماهنگی دوره‌های کوتاه مدت خانه کارگر سراسر کشور؛ نصب و راه اندازی شبکه و سیستم؛ خرید و تعمیر و نگهداری سیستم‌های درون سازمانی
12. پشتیبان فنی — ۰۷/۱۳۸۷ - ۱۲/۱۳۸۷ — موسسه آرتافون
    - مسئول فنی و نرم افزار

### Courses

Courses only; no dates and no certificate images.

- A+ — آموزش مبانی سخت افزار سیستم‌های کامپیوتری
- Network+ — آموزش مبانی شبکه و راه اندازی شبکه
- MCSE — مبانی ویندوز سرور ۲۰۱۶ و مدیریت اکانت‌ها
- CCNA — دوره آشنایی با تجهیزات سیسکو و راه اندازی شبکه
- MTCNA
- LPIC Essentials — مبانی لینوکس و استفاده آن در شبکه و در زندگی شخصی
- LPIC1 — سطح ۱ لینوکس مقدماتی، آشنایی با راه اندازها و کرنل

### Projects

Omit Projects in version 1. The user does not currently have real project photos. The structure may be extended later with clearly labeled conceptual/AI-generated visuals if desired; such visuals must not be presented as real project photographs.

### Contact

Simple contact form:

- Name
- Email
- Message
- Send button

Contact links will include only:

- GitHub
- Email
- Telegram ID

No phone number for version 1. Actual contact URLs/handles/email will be configured later when supplied by the user.

## 5. UX / Quality

- Persian RTL.
- Responsive desktop/mobile layout.
- Smooth scrolling.
- Subtle, purposeful animations.
- Accessible controls and readable contrast.
- SEO basics.
- Fast performance.
- Architecture ready for future English content.

## 6. Content Notes

The Hero statement `من با فناوری کار نمی‌کنم؛ مشکلاتش را حل می‌کنم.` is provisional and can be revised later. The profile image remains a placeholder until the user supplies a suitable photo.
