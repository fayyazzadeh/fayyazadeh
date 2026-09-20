export type WikiArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  tags: string[];
};

export const wikiArticles: WikiArticle[] = [
  {
    slug: "network-troubleshooting-checklist",
    title: "چک‌لیست حرفه‌ای عیب‌یابی شبکه",
    category: "Troubleshooting",
    excerpt: "یک مسیر مرحله‌ای برای پیدا کردن محل خرابی از کلاینت تا سرویس مقصد.",
    tags: ["network", "شبکه", "troubleshooting", "عیب یابی", "checklist", "ping", "gateway", "dns"],
    content: [
      "ابتدا دامنه مشکل را مشخص کنید: یک دستگاه، چند دستگاه، یک VLAN، کل سایت یا فقط یک سرویس.",
      "از لایه‌های پایین‌تر شروع کنید: برق و لینک، اتصال محلی، IP و Gateway، Route، DNS و در نهایت سرویس مقصد.",
      "برای مقایسه، یک دستگاه سالم و یک دستگاه مشکل‌دار را در همان شبکه بررسی کنید.",
      "نتیجه هر تست را ثبت کنید؛ تغییر هم‌زمان چند تنظیم، پیدا کردن علت اصلی را سخت می‌کند."
    ]
  },
  {
    slug: "dns-troubleshooting",
    title: "DNS چیست و چگونه خطاهای DNS را عیب‌یابی کنیم؟",
    category: "DNS",
    excerpt: "راهنمای بررسی DNS Failure، DNS Error، Resolve نشدن نام دامنه و مشکلات Name Resolution.",
    tags: ["dns", "dns fail", "dns failure", "dns error", "dns problem", "dns not working", "resolve", "resolution", "name resolution", "nslookup", "dig"],
    content: [
      "اگر IP مقصد قابل دسترسی است اما نام دامنه Resolve نمی‌شود، ابتدا DNS را بررسی کنید.",
      "با nslookup یا dig نام دامنه را در برابر DNS Resolver مشخص تست کنید و پاسخ، زمان پاسخ و Server را ثبت کنید.",
      "آدرس DNS کلاینت، دسترسی به Resolver و وضعیت سرویس DNS را بررسی کنید.",
      "در شبکه‌های سازمانی، تفاوت DNS داخلی و عمومی و همچنین Split DNS را در نظر بگیرید.",
      "در صورت نیاز، یک Resolver جایگزین را فقط برای تست مقایسه کنید و نتیجه را با DNS اصلی مقایسه کنید."
    ]
  },
  {
    slug: "dhcp-troubleshooting",
    title: "عیب‌یابی DHCP و نگرفتن IP",
    category: "DHCP",
    excerpt: "مراحل بررسی زمانی که کلاینت از DHCP آدرس IP دریافت نمی‌کند.",
    tags: ["dhcp", "ip", "no ip", "ip address", "dora", "discover", "offer", "request", "ack", "relay", "ip helper"],
    content: [
      "بررسی کنید آداپتور شبکه فعال است و لینک یا اتصال Wi-Fi برقرار است.",
      "مطمئن شوید DHCP Pool ظرفیت دارد و Leaseهای موجود، Reservationها و Exclusionها درست هستند.",
      "در ارتباط DHCP معمولاً چرخه Discover، Offer، Request و Acknowledgement بررسی می‌شود.",
      "اگر کلاینت و DHCP Server در Subnetهای متفاوت هستند، DHCP Relay یا IP Helper را بررسی کنید.",
      "در صورت نیاز با Wireshark بررسی کنید کدام بخش از تبادل DHCP به کلاینت یا سرور نمی‌رسد."
    ]
  },
  {
    slug: "ip-conflict",
    title: "IP Conflict و تداخل آدرس IP",
    category: "IP Addressing",
    excerpt: "تشخیص IP تکراری و پیدا کردن دستگاهی که باعث تداخل آدرس شده است.",
    tags: ["ip conflict", "duplicate ip", "ip duplicate", "conflict", "تداخل ip", "آی پی تکراری", "ip address"],
    content: [
      "نشانه‌های رایج شامل قطع و وصل شدن ارتباط، هشدار Duplicate IP و دسترسی ناپایدار به Gateway یا سرویس‌هاست.",
      "بررسی کنید آیا یک آدرس به‌صورت Static روی دستگاهی تنظیم شده که داخل DHCP Pool قرار دارد.",
      "جدول ARP و MAC Address Table سوئیچ می‌توانند برای پیدا کردن دستگاه دارای آدرس تکراری کمک کنند.",
      "Reservationهای DHCP و تنظیمات Static IP را با مستندات شبکه مقایسه کنید.",
      "بعد از رفع تداخل، Cacheهای ARP و Leaseهای مرتبط را در صورت نیاز و با توجه به سیستم‌عامل یا تجهیزات شبکه بررسی کنید."
    ]
  },
  {
    slug: "ip-subnet-gateway",
    title: "IP، Subnet Mask و Default Gateway",
    category: "IP Addressing",
    excerpt: "درک و عیب‌یابی آدرس IP، Subnet و Gateway در شبکه‌های IPv4.",
    tags: ["ip", "ipv4", "subnet", "subnet mask", "gateway", "default gateway", "آی پی", "ساب نت", "گیت وی"],
    content: [
      "IP Address مشخص می‌کند یک Interface در چه شبکه‌ای قرار دارد و Subnet Mask مرز شبکه و Host را تعیین می‌کند.",
      "Default Gateway معمولاً مسیر خروج ترافیک به شبکه‌های دیگر است.",
      "اگر دو دستگاه در یک Subnet باشند، انتظار می‌رود برای ارتباط محلی نیازی به Router نداشته باشند.",
      "برای عیب‌یابی، IP، Mask، Gateway و Route را کنار هم بررسی کنید؛ فقط درست بودن IP به‌تنهایی کافی نیست.",
      "در شبکه‌های بزرگ، خطای Subnetting می‌تواند باعث شود بعضی مقصدها محلی و بعضی مقصدها Remote تشخیص داده شوند."
    ]
  },
  {
    slug: "vlan-trunk-access",
    title: "VLAN، Access Port و Trunk",
    category: "Switching",
    excerpt: "مفاهیم VLAN و روش عیب‌یابی پورت‌های Access و Trunk.",
    tags: ["vlan", "802.1q", "trunk", "access port", "switch", "tagged", "untagged", "native vlan"],
    content: [
      "VLANها برای جداسازی منطقی Broadcast Domainها روی زیرساخت سوئیچینگ استفاده می‌شوند.",
      "پورت Access معمولاً برای یک VLAN مشخص استفاده می‌شود، در حالی که Trunk می‌تواند چند VLAN را حمل کند.",
      "در عیب‌یابی، VLAN مورد انتظار، Allowed VLANها، Native VLAN و Tagging دو طرف لینک را مقایسه کنید.",
      "اگر کلاینت IP نمی‌گیرد، مسیر VLAN تا DHCP Server و در صورت وجود، DHCP Relay را بررسی کنید.",
      "تغییر VLAN روی یک پورت می‌تواند دسترسی دستگاه را کاملاً تغییر دهد؛ قبل از تغییر، وضعیت فعلی را ثبت کنید."
    ]
  },
  {
    slug: "nat-port-forwarding",
    title: "NAT و Port Forwarding",
    category: "Routing",
    excerpt: "درک NAT، SNAT، DNAT و عیب‌یابی Port Forwarding.",
    tags: ["nat", "snat", "dnat", "port forwarding", "dst-nat", "src-nat", "masquerade", "router"],
    content: [
      "NAT آدرس یا پورت‌های ترافیک را در مسیر عبور تغییر می‌دهد؛ نوع دقیق تغییر به سناریوی NAT بستگی دارد.",
      "SNAT و Masquerade بیشتر برای خروج ترافیک از شبکه خصوصی به سمت شبکه دیگر استفاده می‌شوند.",
      "DNAT و Port Forwarding برای هدایت ترافیک ورودی به یک سرویس داخلی به‌کار می‌روند.",
      "در Port Forwarding فقط Rule NAT کافی نیست؛ Route برگشت، Firewall و سرویس مقصد نیز باید درست باشند.",
      "برای تست، ابتدا از داخل شبکه و سپس از یک شبکه خارجی مسیر را جداگانه بررسی کنید."
    ]
  },
  {
    slug: "firewall-troubleshooting",
    title: "عیب‌یابی Firewall و Ruleها",
    category: "Security",
    excerpt: "روش مرحله‌ای برای پیدا کردن Ruleای که ترافیک را مسدود یا اشتباه هدایت می‌کند.",
    tags: ["firewall", "rule", "security", "blocked", "deny", "allow", "acl", "mikrotik firewall"],
    content: [
      "ابتدا مشخص کنید ترافیک از کدام Source به کدام Destination و با چه Protocol و Portی عبور می‌کند.",
      "ترتیب Ruleها مهم است؛ یک Rule عمومی می‌تواند قبل از Rule اختصاصی قرار گرفته و آن را بی‌اثر کند.",
      "Logهای Firewall را با زمان دقیق تست تطبیق دهید تا مشخص شود Ruleای واقعاً Hit شده است.",
      "برای DNS، HTTP/HTTPS، VPN و سرویس‌های داخلی، Protocol و Portهای مورد نیاز را جداگانه بررسی کنید.",
      "برای تست موقت، به‌جای خاموش کردن کامل Firewall، یک Rule محدود و قابل بازگشت برای سناریوی مشخص ایجاد کنید."
    ]
  },
  {
    slug: "tcp-udp-ports",
    title: "TCP، UDP و Portها",
    category: "Protocols",
    excerpt: "تفاوت TCP و UDP و روش بررسی Portهای مورد نیاز سرویس‌ها.",
    tags: ["tcp", "udp", "port", "ports", "connection", "timeout", "reset", "protocol"],
    content: [
      "TCP اتصال‌محور است و مکانیزم‌هایی برای تحویل مرتب و قابل اتکای داده دارد؛ UDP سربار و رفتار متفاوتی دارد و بسیاری از جزئیات تحویل را به برنامه واگذار می‌کند.",
      "وقتی یک سرویس در دسترس نیست، مشخص کنید سرویس از TCP یا UDP و از کدام Port استفاده می‌کند.",
      "در تست‌های TCP، تفاوت بین Timeout و Connection Refused می‌تواند سرنخ مهمی درباره مسیر یا وضعیت مقصد باشد.",
      "Firewall، NAT و ACLها را در هر دو جهت بررسی کنید؛ باز بودن Port روی سرور به‌تنهایی کافی نیست.",
      "برای مشاهده دقیق‌تر جریان ترافیک، Packet Capture با Wireshark می‌تواند مشخص کند درخواست و پاسخ در کدام نقطه متوقف می‌شوند."
    ]
  },
  {
    slug: "packet-loss-latency",
    title: "Packet Loss، Latency و ناپایداری شبکه",
    category: "Performance",
    excerpt: "بررسی Packet Loss، تأخیر، Jitter و ارتباط آن‌ها با کیفیت سرویس.",
    tags: ["packet loss", "loss", "latency", "ping", "jitter", "delay", "network performance", "کندی شبکه"],
    content: [
      "Packet Loss یعنی بخشی از بسته‌ها به مقصد نمی‌رسند و می‌تواند باعث Retry، Timeout و افت کیفیت سرویس شود.",
      "Latency زمان رفت‌وبرگشت یا تأخیر مسیر است و باید در کنار فاصله، مسیر و نوع سرویس تفسیر شود.",
      "برای تشخیص محل مشکل، Ping و در صورت نیاز Traceroute را از چند نقطه شبکه مقایسه کنید.",
      "اگر فقط یک مقصد مشکل دارد، احتمالاً باید مسیر یا خود مقصد بررسی شود؛ اگر چند مقصد هم‌زمان مشکل دارند، زیرساخت مشترک را بررسی کنید.",
      "زمان تست و شرایط بار شبکه را ثبت کنید تا نتایج قابل مقایسه باشند."
    ]
  },
  {
    slug: "wifi-troubleshooting",
    title: "عیب‌یابی Wi-Fi و وای‌فای کند",
    category: "Wireless",
    excerpt: "راهنمای بررسی اتصال، Authentication، Signal، Channel و مشکلات سرعت Wi-Fi.",
    tags: ["wifi", "wi-fi", "wireless", "وای فای", "وایفای", "wifi slow", "وای فای کند", "ssid", "signal", "channel", "roaming"],
    content: [
      "ابتدا مشخص کنید مشکل اتصال است، Authentication است، گرفتن IP است یا فقط سرعت و کیفیت ارتباط پایین است.",
      "اگر Wi-Fi متصل است اما اینترنت کار نمی‌کند، IP، Gateway، DNS، Firewall و مسیر WAN را جداگانه بررسی کنید.",
      "برای مشکلات رادیویی، Signal، Channel، Band، تداخل و وضعیت Roaming بین Access Pointها را بررسی کنید.",
      "اتصال همان SSID با یک دستگاه سالم می‌تواند مشخص کند مشکل بیشتر در Client است یا Infrastructure.",
      "در Windows می‌توان از netsh wlan و گزارش‌های Wi-Fi برای جمع‌آوری شواهد قبل از Reset کردن تنظیمات استفاده کرد."
    ]
  },
  {
    slug: "slow-internet",
    title: "اینترنت کند است؛ از کجا شروع کنیم؟",
    category: "Performance",
    excerpt: "مسیر عیب‌یابی کندی اینترنت بدون اینکه سریع سراغ Reset یا تعویض تجهیزات برویم.",
    tags: ["slow internet", "internet slow", "کندی اینترنت", "اینترنت کند", "speed", "bandwidth", "isp", "wan"],
    content: [
      "ابتدا مشخص کنید کندی روی یک دستگاه است یا چند دستگاه و آیا فقط یک سایت یا همه سرویس‌ها تحت تأثیر هستند.",
      "سرعت Link داخلی، Wi-Fi، مصرف پهنای‌باند، CPU یا Load تجهیزات و وضعیت WAN را بررسی کنید.",
      "یک تست با کابل و یک تست با Wi-Fi انجام دهید تا تفاوت LAN و Wireless مشخص شود.",
      "Latency و Packet Loss را جدا از Bandwidth بررسی کنید؛ سرعت دانلود بالا الزاماً به معنی مسیر سالم نیست.",
      "در صورت گسترده بودن مشکل، وضعیت Gateway، Firewall، NAT و در نهایت لینک یا ISP را بررسی کنید."
    ]
  },
  {
    slug: "vpn-troubleshooting",
    title: "عیب‌یابی VPN",
    category: "Remote Access",
    excerpt: "بررسی مرحله‌ای VPN برای خطای اتصال، Authentication، Route و دسترسی به منابع داخلی.",
    tags: ["vpn", "ipsec", "wireguard", "openvpn", "l2tp", "tunnel", "remote access", "authentication", "route"],
    content: [
      "اول مشخص کنید Tunnel اصلاً برقرار نمی‌شود یا Tunnel برقرار است ولی منابع داخلی قابل دسترسی نیستند.",
      "برای VPNهای رمزنگاری‌شده، Peer، Endpoint، کلیدها یا Credentials، زمان سیستم و تنظیمات Firewall را بررسی کنید.",
      "پس از برقراری Tunnel، Routeها، Allowed Networks و مسیر برگشت ترافیک را بررسی کنید.",
      "اگر فقط یک سرویس داخلی در دسترس نیست، DNS و Firewall داخلی را جداگانه بررسی کنید.",
      "برای خطاهای ناپایدار، زمان قطع شدن و Logهای دو سمت Tunnel را با هم مقایسه کنید."
    ]
  },
  {
    slug: "linux-networking",
    title: "Linux Networking و دستورات پایه",
    category: "Linux",
    excerpt: "دستورات مهم برای بررسی Interface، IP، Route، DNS و اتصال شبکه در Linux.",
    tags: ["linux", "networking", "ip", "route", "dns", "ss", "ping", "traceroute", "ip addr", "ip route"],
    content: [
      "برای مشاهده Interfaceها و IPها از ip addr و برای بررسی مسیرها از ip route استفاده کنید.",
      "با ping و در صورت نیاز traceroute یا tracepath مسیر و دسترسی را بررسی کنید.",
      "برای مشاهده Socketهای فعال و Portهای Listening، ابزار ss کاربردی است.",
      "Resolver و تنظیمات DNS را متناسب با توزیع و سرویس مدیریت شبکه همان سیستم بررسی کنید.",
      "قبل از تغییر تنظیمات شبکه سرور، وضعیت فعلی Interface، Route و DNS را ثبت کنید تا امکان Rollback داشته باشید."
    ]
  },
  {
    slug: "windows-network-basics",
    title: "Windows Networking و دستورات عیب‌یابی",
    category: "Windows",
    excerpt: "چک‌لیست IP، Gateway، DNS و ابزارهای خط فرمان شبکه در Windows.",
    tags: ["windows", "ipconfig", "ping", "tracert", "nslookup", "netstat", "dns", "gateway", "powershell"],
    content: [
      "با ipconfig /all آدرس IP، Subnet Mask، Default Gateway، DNS و اطلاعات DHCP را بررسی کنید.",
      "برای تست مسیر پایه، ابتدا Gateway و سپس یک IP مقصد را Ping کنید.",
      "برای DNS از nslookup و برای مشاهده مسیر از tracert استفاده کنید.",
      "برای بررسی Connectionها و Portهای محلی می‌توان از netstat یا ابزارهای PowerShell استفاده کرد.",
      "اگر Wi-Fi متصل است اما دسترسی شبکه وجود ندارد، TCP/IP، DHCP، DNS، Proxy و Firewall را به‌صورت جداگانه بررسی کنید."
    ]
  },
  {
    slug: "mikrotik-basic-troubleshooting",
    title: "عیب‌یابی اولیه MikroTik",
    category: "MikroTik",
    excerpt: "چک‌لیست سریع برای بررسی Interface، IP، Route، NAT، Firewall و DNS در MikroTik.",
    tags: ["mikrotik", "routeros", "router", "network", "شبکه", "firewall", "nat", "routing"],
    content: [
      "ابتدا وضعیت Interfaceها، Link و IP Addressها را بررسی کنید.",
      "سپس Routeها و Default Route را بررسی کنید و از خود Router تست Ping بگیرید.",
      "برای اینترنت، NAT، Firewall Filter و مسیر برگشت را بررسی کنید.",
      "اگر مشکل فقط برای یک VLAN یا Subnet است، Bridge، VLAN، DHCP و Route همان بخش را بررسی کنید.",
      "قبل از تغییرات مهم، Export یا Backup مناسب از تنظیمات تهیه کنید و تغییرات را مرحله‌ای انجام دهید."
    ]
  },
  {
    slug: "raspberry-pi-network",
    title: "شبکه روی Raspberry Pi",
    category: "Raspberry Pi",
    excerpt: "مراحل پایه برای بررسی Ethernet، Wi-Fi، IP، Gateway و DNS روی Raspberry Pi.",
    tags: ["raspberry pi", "raspberry", "linux", "network", "wifi", "ethernet", "dhcp"],
    content: [
      "ابتدا وضعیت Interface و آدرس IP را بررسی کنید و مشخص کنید اتصال از Ethernet است یا Wi-Fi.",
      "Gateway پیش‌فرض و DNS را کنترل کنید و سپس دسترسی به Gateway و یک مقصد IP را تست کنید.",
      "اگر IP دریافت نمی‌شود، DHCP و Link را بررسی کنید؛ اگر IP درست است ولی نام‌ها Resolve نمی‌شوند، DNS را بررسی کنید.",
      "برای سرویس‌های ثابت، قبل از تغییر Network Manager یا تنظیمات شبکه، روش مدیریت شبکه همان سیستم را مشخص کنید.",
      "در پروژه‌های IoT، بهتر است IP، VLAN و DNS دستگاه‌ها مستند باشند تا عیب‌یابی سریع‌تر انجام شود."
    ]
  },
  {
    slug: "https-ssl-certificates",
    title: "HTTPS، SSL/TLS و خطاهای Certificate",
    category: "Web & Security",
    excerpt: "بررسی خطاهای HTTPS، Certificate، نام دامنه و زنجیره اعتماد.",
    tags: ["https", "ssl", "tls", "certificate", "cert", "https error", "ssl error", "443", "ca", "chain"],
    content: [
      "HTTPS معمولاً از TLS برای ایجاد ارتباط رمزنگاری‌شده بین Client و Server استفاده می‌کند.",
      "در خطاهای Certificate، نام دامنه، تاریخ اعتبار، Issuer و Certificate Chain را بررسی کنید.",
      "اگر فقط بعضی دستگاه‌ها خطا دارند، ساعت سیستم و Trusted CAهای همان دستگاه‌ها را بررسی کنید.",
      "در Reverse Proxy یا Load Balancer، مطمئن شوید Certificate روی نقطه‌ای نصب شده که اتصال TLS واقعاً در آن Terminate می‌شود.",
      "برای عیب‌یابی دقیق، جزئیات خطای Browser و در صورت نیاز ابزارهایی مانند openssl s_client را بررسی کنید."
    ]
  },
  {
    slug: "ping-traceroute-diagnostics",
    title: "Ping، Traceroute و ابزارهای تشخیص مسیر",
    category: "Diagnostics",
    excerpt: "چه زمانی Ping کافی است و چه زمانی باید سراغ Traceroute و ابزارهای دقیق‌تر برویم.",
    tags: ["ping", "traceroute", "tracert", "tracepath", "diagnostics", "icmp", "route"],
    content: [
      "Ping برای بررسی Reachability و اندازه‌گیری تقریبی زمان رفت‌وبرگشت مفید است، اما پاسخ ندادن Ping همیشه به معنی قطع بودن سرویس نیست.",
      "Traceroute یا tracert مسیر عبور بسته‌ها را به‌صورت Hop-by-Hop بررسی می‌کند.",
      "اگر یک Hop پاسخ ICMP نمی‌دهد ولی Hopهای بعدی پاسخ می‌دهند، لزوماً همان Hop علت خرابی نیست.",
      "برای سرویس‌های حساس، Reachability را با تست واقعی همان Port یا Application نیز بررسی کنید.",
      "نتایج را از چند نقطه و در زمان‌های مختلف مقایسه کنید تا مشکل موقت با مشکل ساختاری اشتباه نشود."
    ]
  },
  {
    slug: "network-services-ports",
    title: "Portهای رایج سرویس‌های شبکه",
    category: "Reference",
    excerpt: "مرجع سریع برای شناسایی Port و Protocol هنگام عیب‌یابی سرویس‌ها.",
    tags: ["ports", "port numbers", "tcp", "udp", "53", "67", "68", "80", "443", "22", "3389", "445"],
    content: [
      "DNS معمولاً از UDP و در برخی شرایط TCP روی Port 53 استفاده می‌کند.",
      "DHCP در IPv4 از UDP و Portهای 67 و 68 استفاده می‌کند.",
      "HTTP معمولاً روی TCP 80 و HTTPS معمولاً روی TCP 443 ارائه می‌شود.",
      "SSH معمولاً روی TCP 22 و RDP معمولاً روی TCP 3389 استفاده می‌شود؛ سرویس‌های واقعی ممکن است Port سفارشی داشته باشند.",
      "هنگام عیب‌یابی، فقط شماره Port را بررسی نکنید؛ Protocol، Source Port، Destination و Firewall Rule نیز مهم هستند."
    ]
  }
];

const STOP_WORDS = new Set([
  "و", "در", "از", "به", "برای", "را", "که", "با", "این", "آن", "یک", "روی",
  "است", "چیست", "چطور", "چگونه", "می", "شود", "شد", "من", "ما", "the", "a",
  "an", "is", "are", "to", "of", "for", "in", "on", "and", "or", "what", "how"
]);

const QUERY_ALIASES: Record<string, string[]> = {
  "ي": ["ی"],
  "ك": ["ک"],
  "wifi": ["wi-fi", "wireless", "وای", "فای", "وایفای"],
  "wi-fi": ["wifi", "wireless", "وای", "فای"],
  "wireless": ["wifi", "wi-fi", "وای", "فای"],
  "وای": ["wifi", "wireless"],
  "فای": ["wifi", "wireless"],
  "وایفای": ["wifi", "wireless"],
  "dns": ["name", "resolution", "resolve"],
  "resolve": ["resolution", "dns"],
  "fail": ["failure", "error", "problem"],
  "failure": ["fail", "error", "problem"],
  "error": ["fail", "failure", "problem"],
  "آی": ["ip"],
  "پی": ["ip"],
  "تکراری": ["duplicate", "conflict"],
  "duplicate": ["conflict", "تکراری"],
  "conflict": ["duplicate", "تکراری"],
  "کند": ["slow", "latency"],
  "کندی": ["slow", "latency"],
  "slow": ["کند", "کندی"],
  "گیت": ["gateway"],
  "وی": ["gateway"],
  "گیتوی": ["gateway"],
  "ساب": ["subnet"],
  "نت": ["subnet"],
  "زیرشبکه": ["subnet"],
  "فایروال": ["firewall"],
  "فایر": ["firewall"],
  "پورت": ["port", "ports"]
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[‌]/g, " ")
    .replace(/[\\u064B-\\u065F]/g, "")
    .replace(/[.,!?;:()[\\]{}"'«»؟،؛]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(/\\s+/)
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term));
}

function expandedTerms(query: string) {
  const base = tokenize(query);
  const extra = base.flatMap((term) => QUERY_ALIASES[term] || []);
  return [...new Set([...base, ...extra].map(normalizeText).filter(Boolean))];
}

function fieldScore(value: string, terms: string[], weight: number) {
  const normalized = normalizeText(value);
  return terms.reduce((score, term) => score + (normalized.includes(term) ? weight : 0), 0);
}

export function searchWiki(query: string) {
  const normalizedQuery = normalizeText(query);
  const terms = expandedTerms(query);

  if (!terms.length) return wikiArticles;

  return wikiArticles
    .map((article) => {
      const title = normalizeText(article.title);
      const tags = article.tags.map(normalizeText);

      let score = 0;
      score += fieldScore(article.title, terms, 10);
      score += fieldScore(article.category, terms, 3);
      score += fieldScore(article.excerpt, terms, 4);
      score += terms.reduce((total, term) => total + (tags.some((tag) => tag === term || tag.includes(term)) ? 8 : 0), 0);
      score += terms.reduce((total, term) => total + (article.content.some((line) => normalizeText(line).includes(term)) ? 1 : 0), 0);

      if (normalizedQuery.length >= 3 && title.includes(normalizedQuery)) score += 20;
      if (normalizedQuery.length >= 3 && tags.some((tag) => tag.includes(normalizedQuery))) score += 16;
      if (normalizedQuery.includes("dns") && article.slug === "dns-troubleshooting") score += 12;
      if ((normalizedQuery.includes("ip") || normalizedQuery.includes("آی پی")) && (normalizedQuery.includes("تکراری") || normalizedQuery.includes("duplicate") || normalizedQuery.includes("conflict")) && article.slug === "ip-conflict") score += 15;

      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article);
}

export function getWikiArticle(slug: string) {
  return wikiArticles.find((article) => article.slug === slug);
}
