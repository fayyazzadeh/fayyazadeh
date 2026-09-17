# Personal Portfolio Implementation Plan

## Goal
Implement the approved RTL Persian portfolio for رامین فیاض‌زاده as a responsive, dark, cyan/turquoise, technology-focused single-page Next.js site suitable for Vercel deployment.

## Architecture
- Next.js App Router + TypeScript.
- Single-page sections with anchor navigation.
- Componentized React UI for header, hero, about, skills, experience, courses, contact, and footer.
- CSS variables and responsive CSS for the visual system; keep dependencies minimal for performance and maintainability.
- Contact form presented as a functional front-end form with a clear mail-based fallback; no third-party email service is introduced until requested.

## Sections
1. Sticky navigation with smooth scrolling.
2. Hero with profile area, title, experience, availability, CTA buttons, and subtle network-topology background.
3. About with professional biography and four stat cards.
4. Skills grouped into Network & Infrastructure, Server & Virtualization, Hardware & IT Support, Web & Digital, and Professional.
5. Experience timeline, newest-first, expandable entries with active-role markers.
6. Courses as cards without dates.
7. Contact form plus GitHub, email, and Telegram links.
8. Footer.

## Content constraints
- Preserve the approved Persian copy and supplied work history.
- Keep Fiber Optics out of the Skills section, while retaining the supplied work-history wording where it belongs.
- Do not invent course dates or MTCNA course details.
- Do not add a Projects section in v1.
- Use the supplied profile photo when a repository-backed asset is available; otherwise keep the profile image area ready for the photo without inventing an image.

## Quality checks
- TypeScript/build correctness.
- RTL layout and mobile responsiveness.
- Keyboard-visible interactions for expandable experience items.
- Semantic headings and labels.
- Metadata/SEO basics.
- No DNS or hosting changes.
