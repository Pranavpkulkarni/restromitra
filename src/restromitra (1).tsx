import { useState, useEffect, useRef } from "react";

const ROLES = [
  { icon: "👨‍🍳", title: "Head Chef" },
  { icon: "🍽️", title: "Waiter/Waitress" },
  { icon: "🍹", title: "Bartender" },
  { icon: "🧁", title: "Pastry Chef" },
  { icon: "🧑‍💼", title: "Manager" },
];

const BRANDS = ["Zomato", "Swiggy", "Biryani Blues", "Haldiram's", "McDonald's", "Pizza Hut", "Subway", "KFC"];

const SERVICES = [
  { icon: "👨‍🍳", title: "Chef Hiring", bg: "orange", jobs: "2,400+ openings" },
  { icon: "🍽️", title: "Floor Staff", bg: "dark", jobs: "3,100+ openings" },
  { icon: "🍹", title: "Bar & Mixology", bg: "orange", jobs: "800+ openings" },
  { icon: "🏨", title: "Hotel Catering", bg: "dark", jobs: "1,200+ openings" },
  { icon: "🧑‍💼", title: "Management", bg: "orange", jobs: "650+ openings" },
  { icon: "🚗", title: "Delivery Jobs", bg: "dark", jobs: "4,500+ openings" },
];

const FAQS = [
  { q: "What is RestroMitra?", a: "RestroMitra is India's first dedicated restaurant & hospitality hiring platform. We connect restaurant owners with skilled food service professionals — from chefs and managers to delivery staff and floor crew." },
  { q: "How does payment work?", a: "Posting a job is completely free. We offer premium plans for restaurants that want priority visibility, featured listings, and unlimited applications." },
  { q: "Is RestroMitra free to use?", a: "Yes! Basic job posting and candidate browsing is free. Premium plans unlock advanced filters, instant hire, and dedicated support." },
  { q: "How quickly can I hire?", a: "With our Instant Hire feature, you can post a job and receive qualified applications within 2 hours. Most restaurants find their hire within 24–48 hours." },
  { q: "Can I hire from outside my city?", a: "Absolutely. RestroMitra lists candidates across all major Indian cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, and 200+ tier-2 cities." },
];

export default function RestroMitra() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [counts, setCounts] = useState({ brands: 0, pros: 0, gigs: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { brands: 1200, pros: 28400, gigs: 540 };
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts({
        brands: Math.round(ease * targets.brands),
        pros: Math.round(ease * targets.pros),
        gigs: Math.round(ease * targets.gigs),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statsVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      fontFamily: "'Sora', 'Poppins', sans-serif", 
      background: "#0a0a0f", 
      color: "#f0ece4", 
      minHeight: "100vh", 
      overflowX: "hidden", 
      width: "100%",
      maxWidth: "100vw"  // 👈 add this line
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; max-width: 100%; overflow-x: hidden; scroll-behavior: smooth; }
#root { max-width: 100%; overflow-x: hidden; }

        /* NAV */
        .nav-link { color: rgba(240,236,228,0.8); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #FF6B35; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #f0ece4; border-radius: 2px; transition: all 0.3s; }

        /* PILL */
        .pill {
          display: inline-block; padding: 5px 14px; border-radius: 999px;
          background: rgba(255,107,53,0.15); border: 1px solid rgba(255,107,53,0.4);
          color: #FF6B35; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
        }

        /* SEARCH */
        .search-bar {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.07); backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 14px;
          overflow: hidden; width: 100%; max-width: 560px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }
        .search-input {
          flex: 1; min-width: 0; background: transparent; border: none; outline: none;
          padding: 14px 16px; color: #f0ece4; font-size: 14px; font-family: inherit;
        }
        .search-input::placeholder { color: rgba(240,236,228,0.4); }
        .search-btn {
          padding: 10px 20px; margin: 5px; background: #FF6B35; color: white;
          border: none; border-radius: 10px; font-size: 13px; font-weight: 700;
          cursor: pointer; font-family: inherit; transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap; flex-shrink: 0;
        }
        .search-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255,107,53,0.5); }

        /* MARQUEE */
        .marquee-wrapper { overflow: hidden; width: 100%; }
        .marquee-track {
          display: flex; gap: 48px; align-items: center;
          animation: marquee 20s linear infinite;
          white-space: nowrap; width: max-content;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* STATS */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); width: 100%; }
        .stat-cell {
          text-align: center; padding: 56px 20px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .stat-cell:last-child { border-right: none; }

        /* SERVICES */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .service-card {
          border-radius: 20px; padding: 30px 26px; cursor: pointer;
          display: flex; flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 56px rgba(255,107,53,0.22); }
        .service-card-orange { background: linear-gradient(135deg, #FF6B35 0%, #e85d2b 100%); }
        .service-card-dark   { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); }

        /* HOW */
        .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .how-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 32px 26px;
          display: flex; flex-direction: column;
          transition: border-color 0.3s;
        }
        .how-card:hover { border-color: rgba(255,107,53,0.4); }

        /* FAQ */
        .faq-layout { display: grid; grid-template-columns: 1fr 1.6fr; gap: 72px; align-items: start; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); padding: 18px 0; cursor: pointer; }
        .faq-q { display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 14px; gap: 12px; }
        .faq-a { color: rgba(240,236,228,0.6); font-size: 13px; line-height: 1.75; margin-top: 12px; }

        /* BUTTONS */
        .btn-orange {
          display: inline-block; padding: 13px 30px; background: #FF6B35;
          color: white; border: none; border-radius: 12px; font-size: 14px;
          font-weight: 700; cursor: pointer; font-family: inherit;
          transition: all 0.2s; text-decoration: none; text-align: center;
        }
        .btn-orange:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,107,53,0.4); }
        .btn-outline {
          display: inline-block; padding: 13px 30px;
          background: transparent; color: #f0ece4;
          border: 1.5px solid rgba(240,236,228,0.25); border-radius: 12px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          font-family: inherit; transition: all 0.2s; text-decoration: none; text-align: center;
        }
        .btn-outline:hover { border-color: #FF6B35; color: #FF6B35; }

        /* ROLE TAGS */
        .role-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 999px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          font-size: 12px; transition: all 0.2s; white-space: nowrap;
        }
        .role-tag:hover { background: rgba(255,107,53,0.12); border-color: rgba(255,107,53,0.35); }

        /* FOOTER */
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .footer-link { color: rgba(240,236,228,0.45); text-decoration: none; font-size: 13px; transition: color 0.2s; display: block; margin-bottom: 10px; }
        .footer-link:hover { color: #FF6B35; }
        .social-icon {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          display: inline-flex; align-items: center; justify-content: center;
          color: rgba(240,236,228,0.5); font-size: 12px; text-decoration: none;
          transition: all 0.2s;
        }
        .social-icon:hover { border-color: #FF6B35; color: #FF6B35; }

        /* ANIMATIONS */
        @keyframes scrollPulse { 0%,100%{opacity:.3} 50%{opacity:.9} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .fade-up   { animation: fadeUp 0.7s 0.00s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.28s ease both; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .faq-layout  { grid-template-columns: 1fr !important; gap: 40px; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 700px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .how-grid      { grid-template-columns: 1fr !important; }
          .hero-roles    { display: none !important; }
          .stats-grid    { grid-template-columns: 1fr !important; }
          .stat-cell     { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .stat-cell:last-child { border-bottom: none; }
        }
        @media (max-width: 480px) {
          .services-grid  { grid-template-columns: 1fr !important; }
          .footer-grid    { grid-template-columns: 1fr !important; }
          .cta-row        { flex-direction: column !important; align-items: stretch !important; }
          .footer-bottom  { flex-direction: column !important; text-align: center; gap: 6px; }
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 1vw",
        background: scrolled ? "rgba(10,10,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition: "all 0.3s",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🍴</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700 }}>
            Restro<span style={{ color: "#FF6B35" }}>Mitra</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#services" className="nav-link">Services</a>
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <a href="#" className="nav-link">Pricing</a>
          <a href="#" className="btn-orange" style={{ padding: "8px 22px", fontSize: 13, borderRadius: 9 }}>Sign Up Free</a>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 5vw 28px", display: "flex", flexDirection: "column", gap: 0,
        }}>
          {["Services", "How it Works", "FAQ", "Pricing"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="nav-link"
              style={{ fontSize: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "block" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="#" className="btn-orange" style={{ marginTop: 20, textAlign: "center" }}>Sign Up Free</a>
        </div>
      )}

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 5vw 80px" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1600&q=80') center/cover no-repeat" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(10,10,15,0.93) 0%, rgba(10,10,15,0.65) 55%, rgba(255,107,53,0.2) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 720, margin: "0 auto", width: "100%" }}>
          <div className="pill fade-up" style={{ marginBottom: 22 }}>🇮🇳 India's #1 Restaurant Hiring Platform</div>

          <h1 className="fade-up-2" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(34px, 6vw, 76px)",
            fontWeight: 900, lineHeight: 1.1,
            marginBottom: 22,
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}>
            Hire Restaurant<br />
            <span style={{ color: "#FF6B35", position: "relative" }}>
              Talent in Minutes
              <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 6 }} viewBox="0 0 300 6" fill="none">
                <path d="M2 5 C80 1, 220 1, 298 5" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
              </svg>
            </span>
          </h1>

          <p className="fade-up-3" style={{ fontSize: "clamp(13px, 1.8vw, 17px)", color: "rgba(240,236,228,0.7)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 32px" }}>
            Connect with verified chefs, floor staff, bartenders & managers. No middlemen, no delays.
          </p>

          <div className="fade-up-3" style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <div className="search-bar">
              <input className="search-input" placeholder="Chef, Waiter, Manager, Bartender…" value={query} onChange={e => setQuery(e.target.value)} />
              <button className="search-btn">Search →</button>
            </div>
          </div>

          <p style={{ fontSize: 11, color: "rgba(240,236,228,0.35)", marginTop: 10 }}>Free to post · No credit card required</p>

          <div className="hero-roles" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            {ROLES.map(r => (
              <span key={r.title} className="role-tag">{r.icon} {r.title}</span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 2 }}>
          <p style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(240,236,228,0.35)", textTransform: "uppercase", marginBottom: 6 }}>Scroll</p>
          <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, rgba(255,107,53,0.7), transparent)", margin: "0 auto", animation: "scrollPulse 2s infinite" }} />
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ background: "#FF6B35", padding: "14px 0", overflow: "hidden" }}>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
              <span key={i} style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div ref={statsRef} style={{ background: "#0f0f17", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>
          {[
            { val: counts.brands.toLocaleString() + "+", label: "Restaurants Hiring", sub: "across India" },
            { val: counts.pros.toLocaleString() + "+", label: "Skilled Professionals", sub: "verified & ready" },
            { val: counts.gigs.toLocaleString() + "+", label: "Jobs Published", sub: "this month" },
          ].map((s, i) => (
            <div key={i} className="stat-cell">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 62px)", fontWeight: 900, color: "#FF6B35", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: "clamp(13px, 1.5vw, 16px)", fontWeight: 700, marginTop: 10 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "rgba(240,236,228,0.4)", marginTop: 5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: "clamp(60px, 8vw, 100px) 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div className="pill" style={{ marginBottom: 14 }}>Popular Categories</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, margin: 0 }}>
              Hire for Every <span style={{ color: "#FF6B35" }}>Role</span>
            </h2>
            <p style={{ color: "rgba(240,236,228,0.5)", marginTop: 12, fontSize: "clamp(13px, 1.4vw, 15px)", maxWidth: 400, margin: "12px auto 0" }}>
              From fine dining to fast food, cloud kitchens to 5-star hotels.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className={`service-card service-card-${s.bg}`}>
                <div style={{ fontSize: 38, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontSize: "clamp(15px, 1.8vw, 19px)", fontWeight: 700, marginBottom: 6, color: "#f0ece4" }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: s.bg === "orange" ? "rgba(255,255,255,0.75)" : "rgba(240,236,228,0.45)" }}>{s.jobs}</div>
                <div style={{ marginTop: "auto", paddingTop: 22, fontSize: 13, fontWeight: 700, color: s.bg === "orange" ? "white" : "#FF6B35" }}>
                  Browse Jobs →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" style={{ padding: "clamp(60px, 8vw, 100px) 5vw", background: "#0f0f17" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div className="pill" style={{ marginBottom: 14 }}>Simple Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, margin: 0 }}>
              How <span style={{ color: "#FF6B35" }}>RestroMitra</span> Works
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36 }}>
            {["Hire Staff", "Find a Job"].map((t, i) => (
              <button key={i} style={{
                padding: "10px 22px", borderRadius: 8, fontFamily: "inherit",
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.15)",
                background: i === 0 ? "#FF6B35" : "transparent",
                color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>{t}</button>
            ))}
          </div>
          <div className="how-grid">
            {[
              { icon: "📋", step: "01", title: "Post a Job for Free", desc: "Create your restaurant job post in under 3 minutes — no upfront cost, no hidden charges." },
              { icon: "📩", step: "02", title: "Receive Applications", desc: "Get proposals from verified food industry professionals or instantly browse our curated database." },
              { icon: "✅", step: "03", title: "Hire & Pay Securely", desc: "Payments are only released after the work is confirmed complete — protecting both sides." },
            ].map((s, i) => (
              <div key={i} className="how-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                  <span style={{ fontSize: 38 }}>{s.icon}</span>
                  <span style={{ fontSize: 36, fontWeight: 900, color: "rgba(255,107,53,0.12)", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{s.step}</span>
                </div>
                <div style={{ fontSize: "clamp(14px, 1.6vw, 17px)", fontWeight: 700, marginBottom: 12, color: "#f0ece4" }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "rgba(240,236,228,0.5)", lineHeight: 1.8 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ══ */}
      <section style={{ padding: "clamp(56px, 7vw, 88px) 5vw", background: "linear-gradient(135deg, #FF6B35 0%, #d4522a 100%)", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 16 }}>What restaurateurs say</p>
        <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 30px)", fontWeight: 700, maxWidth: 680, margin: "0 auto 24px", lineHeight: 1.45 }}>
          "We hired a trained tandoor chef within 6 hours of posting. Absolutely game-changing."
        </blockquote>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>👨‍🍳</div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>Rajesh Sharma</p>
            <p style={{ fontSize: 11, opacity: 0.7, margin: 0 }}>Owner, Spice Route — Bangalore</p>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "clamp(60px, 8vw, 100px) 5vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="faq-layout">
            {/* Left */}
            <div>
              <div className="pill" style={{ marginBottom: 14 }}>Got Questions?</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.2vw, 42px)", fontWeight: 900, lineHeight: 1.2, margin: 0 }}>
                Frequently<br />Asked <span style={{ color: "#FF6B35" }}>Questions</span>
              </h2>
              <p style={{ marginTop: 16, color: "rgba(240,236,228,0.45)", fontSize: 13, lineHeight: 1.75 }}>Can't find the answer?</p>
              <a href="#" className="btn-orange" style={{ marginTop: 22, display: "inline-block" }}>Contact Support</a>
            </div>
            {/* Right */}
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-q">
                    <span>{f.q}</span>
                    <span style={{ fontSize: 18, color: "#FF6B35", transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", flexShrink: 0 }}>⌄</span>
                  </div>
                  {openFaq === i && <p className="faq-a">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section style={{ padding: "clamp(60px, 8vw, 96px) 5vw", background: "#0f0f17", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🍴</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
            Ready to Build Your<br /><span style={{ color: "#FF6B35" }}>Perfect Restaurant Team?</span>
          </h2>
          <p style={{ color: "rgba(240,236,228,0.5)", fontSize: "clamp(13px, 1.4vw, 15px)", marginBottom: 36, lineHeight: 1.8, maxWidth: 500, margin: "0 auto 36px" }}>
            Join 1,200+ restaurants already hiring smarter with RestroMitra.
          </p>
          <div className="cta-row" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" className="btn-orange">Post a Job Free →</a>
            <a href="#" className="btn-outline">Browse Candidates</a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#07070d", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(44px, 5vw, 72px) 5vw 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🍴</div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700 }}>Restro<span style={{ color: "#FF6B35" }}>Mitra</span></span>
              </div>
              <p style={{ color: "rgba(240,236,228,0.4)", fontSize: 12.5, lineHeight: 1.75, maxWidth: 230 }}>
                India's dedicated platform for restaurant & hospitality hiring.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                {["𝕏", "in", "f"].map((s, i) => (
                  <a key={i} href="#" className="social-icon">{s}</a>
                ))}
              </div>
            </div>
            {/* Link columns */}
            {[
              { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
              { title: "For Restaurants", links: ["Post a Job", "Pricing", "Featured", "Case Studies"] },
              { title: "Support", links: ["Help Center", "Privacy", "Terms", "Contact"] },
            ].map((col, i) => (
              <div key={i}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,236,228,0.35)", marginBottom: 16 }}>{col.title}</p>
                {col.links.map((l, j) => <a key={j} href="#" className="footer-link">{l}</a>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }} className="footer-bottom">
            <p style={{ fontSize: 11, color: "rgba(240,236,228,0.3)", margin: 0 }}>© 2026 RestroMitra. All rights reserved.</p>
            <p style={{ fontSize: 11, color: "rgba(240,236,228,0.3)", margin: 0 }}>Made with ❤️ for India's Food Industry</p>
          </div>
        </div>
      </footer>
    </div>
  );
}