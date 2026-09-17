const experiences = [
  ["IT کارشناس", "فرودگاه بین المللی مهرآباد", "۰۷/۱۳۹۵ - اکنون", "پشتیبانی سیستم‌های رایانه‌ای، نصب و راه‌اندازی سیستم، انجام امورات پسیو شبکه، آرایش رک، تعمیر و عیب‌یابی و ارتقاء سیستم‌ها، انجام امورات تحت شبکه.", true],
  ["IT کارشناس", "کیان بتون پارسه", "۰۱/۱۴۰۴ - اکنون", "کارشناس فنی و پشتیبانی مجموعه؛ تعمیر و نگهداری سیستم‌های شرکت و کارگاه‌های مستقر در سطح شهر، مدیریت و نگهداری سایت شرکت و مشاوره در زمینه توسعه شبکه.", true],
  ["IT کارشناس", "تعاونی تولیدی توزیعی مجموعه میلاد پرنیا ایرانیان", "۱۰/۱۴۰۳ - اکنون", "کارشناس IT و پشتیبانی دفتر مرکزی و کارخانه؛ مدیریت و پشتیبانی سایت مجموعه؛ مدیریت سرور و دوربین‌های شرکت؛ VMware، ESXi، MikroTik، GRE و VOIP.", true],
  ["موسس", "موسسه طراحی سایت Tashtag", "۰۸/۱۴۰۲ - اکنون", "مدیر سایت Tashtag و فعال در طراحی سایت‌های فروشگاهی، شرکتی و شخصی. برای مشاهده نمونه کار به tashtag.com مراجعه شود.", true],
  ["IT کارشناس", "شرکت تعاونی میراث فرهنگی، گردشگری و صنایع دستی ایرانیان", "۰۴/۱۴۰۲ - ۱۲/۱۴۰۲", "مدیر فناوری اطلاعات و ارتباطات، شبکه و سیستم‌های اداری؛ پشتیبانی شبکه و سیستم‌های اداری؛ مسئول وب‌سایت hamiyanco.com؛ مسئول سرویس‌های اجرایی در مجموعه؛ Virtualization، MTCNA، MCSE."],
  ["بهره بردار", "پروژه بام نیایش", "۰۸/۱۴۰۱ - ۰۱/۱۴۰۲", "عضو تیم بهره‌برداری زیرساخت و اینترنت واحدها، شبکه و دوربین مداربسته بام نیایش؛ انجام امورات پسیو شبکه، فیبر نوری، کابل‌کشی، داکت‌کشی و نصب دوربین در واحدها؛ نصب ویندوز و برنامه‌های کاربردی، پرینتر و راه‌اندازی شبکه."],
  ["مدرس کامپیوتر", "موسسه علوی", "۰۷/۱۳۹۹ - ۰۳/۱۴۰۰", "تدریس IT و آشنایی با فناوری اطلاعات و نرم‌افزارهای کاربردی."],
  ["خدمات پس از فروش", "شرکت دایاتک کساء", "۰۴/۱۳۹۲ - ۰۶/۱۳۹۵", "تکنسین و مسئول خدمات پس از فروش محصولات شبکه و تین کلاینت."],
  ["مسئول فروش", "شرکت دایاتک کساء", "۰۴/۱۳۹۲ - ۰۶/۱۳۹۵", "مسئول فروش محصولات اکتیو و پسیو شبکه."],
  ["انباردار", "شرکت دایاتک کساء", "۰۴/۱۳۹۲ - ۰۶/۱۳۹۴", "انباردار."],
  ["مسئول آموزش و برنامه ریزی آموزشی کل کشور", "خانه کارگر", "۰۱/۱۳۸۹ - ۱۰/۱۳۹۰", "برنامه‌ریزی و هماهنگی دوره‌های کوتاه‌مدت خانه کارگر سراسر کشور؛ نصب و راه‌اندازی شبکه و سیستم؛ خرید و تعمیر و نگهداری سیستم‌های درون سازمانی."],
  ["پشتیبان فنی", "موسسه آرتافون", "۰۷/۱۳۸۷ - ۱۲/۱۳۸۷", "مسئول فنی و نرم‌افزار."],
] as const;

type SkillGroup = readonly [string, readonly string[]];

const skillGroups: readonly SkillGroup[] = [
  ["Network & Infrastructure", ["Network+", "CCNA", "MTCNA", "Active & Passive Network", "MikroTik", "TCP/IP & Network Services", "راه‌اندازی و عیب‌یابی شبکه", "کابل‌کشی و داکت‌کشی", "Rack & Server Room"]],
  ["Server & Virtualization", ["Windows Server", "VMware ESXi", "Virtualization", "GNU/Linux"]],
  ["Hardware & IT Support", ["سخت‌افزار کامپیوتر", "نصب و راه‌اندازی سیستم‌ها", "تعمیر و عیب‌یابی", "ارتقاء سیستم‌ها", "Ticketing System", "پشتیبانی کاربران"]],
  ["Web & Digital", ["WordPress", "طراحی وب", "مدیریت وب‌سایت"]],
  ["Professional", ["حل مسئله", "مشاوره IT", "کار تیمی", "یادگیری و تحقیق"]],
];

const courses = [
  ["A+", "آموزش مبانی سخت افزار سیستم‌های کامپیوتری"],
  ["Network+", "آموزش مبانی شبکه و راه اندازی شبکه"],
  ["MCSE", "مبانی ویندوز سرور ۲۰۱۶ و مدیریت اکانت‌ها"],
  ["CCNA", "دوره آشنایی با تجهیزات سیسکو و راه اندازی شبکه"],
  ["MTCNA", "MTCNA"],
  ["LPIC Essentials", "مبانی لینوکس و استفاده آن در شبکه و در زندگی شخصی"],
  ["LPIC1", "سطح ۱ لینوکس مقدماتی، آشنایی با راه اندازها و کرنل"],
];

function Arrow() {
  return <span aria-hidden="true">←</span>;
}

export default function Home() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <nav className="container nav" aria-label="ناوبری اصلی">
          <a className="brand" href="#top">RF<span>.</span></a>
          <div className="nav-links">
            <a href="#about">درباره من</a>
            <a href="#skills">مهارت‌ها</a>
            <a href="#experience">سوابق</a>
            <a href="#courses">دوره‌ها</a>
            <a href="#contact">تماس</a>
          </div>
          <a className="btn btn-secondary" href="#contact">در تماس باشیم</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">HELLO, I&apos;M</div>
            <h1>رامین <span>فیاض‌زاده</span></h1>
            <p className="hero-title">IT Specialist | Network &amp; Infrastructure</p>
            <p className="hero-sub">متخصص IT، شبکه و زیرساخت با بیش از ۱۵ سال تجربه؛ از پشتیبانی و عیب‌یابی سیستم‌ها تا مدیریت شبکه، سرورها، مجازی‌سازی و زیرساخت.</p>
            <p className="quote">من با فناوری کار نمی‌کنم؛ مشکلاتش را حل می‌کنم.</p>
            <div className="availability"><span className="dot" /> Available for Part-Time Opportunities</div>
            <div className="actions">
              <a className="btn btn-primary" href="#about">درباره من <Arrow /></a>
              <a className="btn btn-secondary" href="#experience">سوابق کاری <Arrow /></a>
            </div>
          </div>
          <div className="profile-card" aria-label="تصویر پروفایل رامین فیاض‌زاده">
            <div className="profile-frame">
              <div className="profile-inner">
                <div className="profile-fallback" aria-hidden="true">RF</div>
                <img src="/profile-tech-headshot.jpg" alt="رامین فیاض‌زاده" />
                <div className="profile-caption">Network • Infrastructure • Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">ABOUT</div><h2>درباره من</h2></div>
            <p>یک مسیر فنی که از پشتیبانی و سخت‌افزار شروع شد و به شبکه، زیرساخت، سرور و وب رسید.</p>
          </div>
          <div className="about-grid">
            <article className="panel about-copy">
              <p>من رامین فیاض‌زاده هستم؛ متخصص فناوری اطلاعات با بیش از ۱۵ سال تجربه در حوزه‌های شبکه، زیرساخت، پشتیبانی، سخت‌افزار و سیستم‌های سازمانی.</p>
              <p>مسیر کاری من از پشتیبانی فنی و سخت‌افزار شروع شده و در طول سال‌ها به مدیریت و پشتیبانی شبکه، سرورها، مجازی‌سازی، سیستم‌های سازمانی و زیرساخت‌های IT گسترش پیدا کرده است. در کنار فعالیت‌های فنی، در حوزه طراحی و مدیریت وب‌سایت نیز تجربه دارم.</p>
              <p>یادگیری مداوم برای من بخش جدایی‌ناپذیر کار است. جست‌وجو، حل مسئله، کار تیمی و تجربه‌کردن راهکارهای جدید چیزهایی هستند که باعث می‌شوند از کارم لذت ببرم.</p>
              <p>در حال حاضر به دلیل فعالیت شیفتی در فرودگاه، بخشی از زمانم را می‌توانم به پروژه‌ها و فرصت‌های پاره‌وقت و همکاری‌های تخصصی اختصاص دهم؛ فرصت‌هایی که علاوه بر ایجاد ارزش، امکان یادگیری و تجربه‌های جدید را نیز فراهم کنند.</p>
            </article>
            <div className="stats">
              <div className="panel stat"><strong>15+</strong><span>سال تجربه</span></div>
              <div className="panel stat"><strong>IT</strong><span>Network &amp; Infrastructure</span></div>
              <div className="panel stat"><strong>∞</strong><span>یادگیری مداوم</span></div>
              <div className="panel stat"><strong>●</strong><span>Available for Part-Time</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">SKILLS</div><h2>مهارت‌ها</h2></div>
            <p>تمرکز اصلی روی مهارت‌های عملی IT، شبکه، زیرساخت و پشتیبانی.</p>
          </div>
          <div className="skill-groups">
            {skillGroups.map(([title, skills]) => (
              <article className="panel skill-group" key={title}>
                <h3>{title}</h3>
                <div className="tags">{skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">EXPERIENCE</div><h2>سوابق کاری</h2></div>
            <p>مسیر شغلی از ۱۳۸۷ تا امروز؛ موارد هر عنوان با کلیک باز می‌شوند.</p>
          </div>
          <div className="timeline">
            {experiences.map(([title, company, date, description, isActive]) => (
              <div className="experience-item" key={`${company}-${date}-${title}`}>
                <details>
                  <summary>
                    <div>
                      <div className="job-title">{title}{isActive && <span className="active">ACTIVE</span>}</div>
                      <div className="job-company">{company}</div>
                    </div>
                    <div className="job-date">{date}</div>
                  </summary>
                  <div className="job-body"><p>{description}</p></div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">COURSES</div><h2>دوره‌ها</h2></div>
            <p>دوره‌ها و آموزش‌های تخصصی، بدون نمایش تاریخ یا تصویر مدرک.</p>
          </div>
          <div className="courses">
            {courses.map(([code, description]) => (
              <article className="panel course" key={code}>
                <div className="course-code">{code}</div>
                <h3>{code === "MTCNA" ? "MTCNA" : code}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="section-head">
            <div><div className="kicker">CONTACT</div><h2>در تماس باشیم</h2></div>
            <p>برای همکاری، پروژه‌های پاره‌وقت یا گفتگو درباره زیرساخت و IT پیام بفرستید.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-links">
              <a className="panel contact-link" href="https://github.com/fayyazzadeh" target="_blank" rel="noreferrer">
                <div><strong>GitHub</strong><span>github.com/fayyazzadeh</span></div><Arrow />
              </a>
              <a className="panel contact-link" href="mailto:ramin@fayyazzadeh.ir">
                <div><strong>Email</strong><span>ramin@fayyazzadeh.ir</span></div><Arrow />
              </a>
              <a className="panel contact-link" href="https://t.me/fayyazzadeh" target="_blank" rel="noreferrer">
                <div><strong>Telegram</strong><span>@fayyazzadeh</span></div><Arrow />
              </a>
            </div>
            <form className="panel contact-form" action="mailto:ramin@fayyazzadeh.ir" method="post" encType="text/plain">
              <div className="field"><label htmlFor="name">نام</label><input id="name" name="name" required placeholder="نام شما" /></div>
              <div className="field"><label htmlFor="email">ایمیل</label><input id="email" name="email" type="email" required placeholder="name@example.com" /></div>
              <div className="field"><label htmlFor="message">پیام</label><textarea id="message" name="message" required placeholder="پیام شما..."></textarea></div>
              <button className="btn btn-primary" type="submit">ارسال پیام <Arrow /></button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <span>© 2026 رامین فیاض‌زاده — IT Specialist | Network &amp; Infrastructure</span>
          <span>Built for the web · fayyazzadeh.ir</span>
        </div>
      </footer>
    </main>
  );
}
