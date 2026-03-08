import { useState, useEffect, useRef } from "react";

const categories = [
  { icon: "💎", name: "Fine Jewellery", desc: "Necklaces, earrings, bangles, maang tikka, rings & bridal sets — crafted for every occasion", span: true },
  { icon: "💄", name: "Makeup & Cosmetics", desc: "Foundations, lipsticks, eyeshadows & all top beauty brands" },
  { icon: "✨", name: "Skincare", desc: "Moisturizers, serums, sunscreens, face washes & premium treatments" },
  { icon: "🌸", name: "Perfumes & Fragrances", desc: "Designer attars, sprays & luxury perfumes for every mood" },
  { icon: "👑", name: "Bridal Special", desc: "Complete bridal kits, mehendi accessories, bridal jewellery sets & more" },
];

const products = [
  { icon: "💍", brand: "Memsab Ji Exclusive", name: "Kundan Bridal Set", price: "₹2,499", old: "₹3,200", badge: "New" },
  { icon: "💋", brand: "Lakme", name: "9 to 5 Primer + Matte Lipstick", price: "₹699", old: "₹899", badge: "Hot" },
  { icon: "🌿", brand: "Biotique", name: "Himalayan Glow Serum", price: "₹449", old: "₹599", badge: "" },
  { icon: "🌹", brand: "Skinn by Titan", name: "Celeste Rose Perfume EDP", price: "₹1,299", old: "₹1,599", badge: "Best" },
  { icon: "🔮", brand: "Memsab Ji Exclusive", name: "Oxidised Silver Earrings", price: "₹349", old: "₹499", badge: "" },
  { icon: "🎨", brand: "Maybelline", name: "Fit Me Foundation & Blush Kit", price: "₹899", old: "₹1,100", badge: "" },
  { icon: "🌟", brand: "Lotus Herbals", name: "Whiteglow SPF 40 Day Cream", price: "₹549", old: "₹699", badge: "" },
  { icon: "✨", brand: "Memsab Ji Exclusive", name: "Maang Tikka Gold Plated", price: "₹799", old: "₹999", badge: "New" },
];

const brands = [
  "Lakme","Maybelline","L'Oréal Paris","Biotique","Lotus Herbals",
  "Himalaya","Skinn by Titan","Nykaa","Forest Essentials","SUGAR Cosmetics",
  "Mac Studio","Elle 18","WOW Skin Science","Colorbar","Revlon",
];

const testimonials = [
  { avatar: "👰", name: "Priya Sharma", location: "Latur, Maharashtra", text: "I bought my entire bridal jewellery set from Memsab Ji. The quality is extraordinary and the prices were so reasonable. Every guest complimented my look!" },
  { avatar: "💄", name: "Sunita Patil", location: "Latur City", text: "Best cosmetics shop in Latur! They have every brand I need and the staff is so helpful. I never go anywhere else for my makeup shopping." },
  { avatar: "🌟", name: "Kavita Deshmukh", location: "Ausa Road, Latur", text: "Memsab Ji is our family's trusted shop for 10 years. The jewellery collection is huge and always up to date with latest trends. Highly recommend!" },
];

const marqueeItems = ["Jewellery","Cosmetics","Skincare","Bangles & Accessories","Makeup","Perfumes","Bridal Collections","Haircare"];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) { setVisible(true); return; }
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    const t = setTimeout(() => setVisible(true), 600);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
  return { ref, visible };
}

function RevealDiv({ children, className = "", delay = 0, style = {} }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function MemsabJi() {
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", category: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  };

  return (
    <div style={{ background: "#1A0A0F", color: "#FDF5EB", fontFamily: "'Montserrat', sans-serif", overflowX: "hidden", width: "100%", maxWidth: "100vw"  }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#1A0A0F; }
        ::-webkit-scrollbar-thumb { background:#C9A96E; border-radius:3px; }
        .playfair { font-family:'Playfair Display',serif; }
        .cormorant { font-family:'Cormorant Garamond',serif; }

        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        @keyframes scrollPulse { 0%,100%{opacity:.4;transform:scaleY(.8)} 50%{opacity:1;transform:scaleY(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes menuSlide { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

        .orb1 { animation: orbFloat 8s ease-in-out infinite; }
        .orb2 { animation: orbFloat 10s ease-in-out infinite reverse; }
        .orb3 { animation: orbFloat 6s ease-in-out infinite 2s; }
        .scroll-line { animation: scrollPulse 2s ease-in-out infinite; }

        /* Hero text — visible by default, animation is enhancement only */
        .hero-eyebrow, .hero-title, .hero-subtitle, .hero-actions, .hero-scroll-wrap { opacity:1; }
        .hero-eyebrow { animation: fadeUp .8s ease forwards; }
        .hero-title    { animation: fadeUp .8s ease .15s forwards; }
        .hero-subtitle { animation: fadeUp .8s ease .3s forwards; }
        .hero-actions  { animation: fadeUp .8s ease .45s forwards; }
        .hero-scroll-wrap { animation: fadeUp 1s ease 1s forwards; }

        .marquee-inner { animation: marquee 25s linear infinite; }

        /* Cards */
        .cat-card { transition: transform .4s, border-color .4s; height:100%; }
        .cat-card:hover { transform:translateY(-6px); border-color:rgba(201,169,110,.5) !important; }
        .cat-card:hover .cat-arrow { opacity:1 !important; transform:translateY(0) !important; }
        .cat-card:hover .cat-bg { opacity:.1 !important; }
        .cat-card:hover .cat-icon-el { transform:scale(1.1) rotate(5deg); }
        .cat-icon-el { transition:transform .4s; display:block; }
        .cat-arrow { transition: opacity .3s, transform .3s; }

        .product-card { transition: transform .4s, border-color .4s; }
        .product-card:hover { transform:translateY(-8px); border-color:rgba(201,169,110,.4) !important; }
        .product-card:hover .product-add { opacity:1 !important; transform:translateY(0) !important; }
        .product-add { transition: opacity .3s, transform .3s, background .3s, color .3s; }
        .product-add:hover { background:#C9A96E !important; color:#1A0A0F !important; }

        .why-feature { transition: border-color .3s, background .3s; }
        .why-feature:hover { border-color:rgba(201,169,110,.25) !important; background:rgba(44,21,32,.5) !important; }
        .brand-pill { transition: all .3s; cursor:pointer; }
        .brand-pill:hover { border-color:#C9A96E !important; color:#C9A96E !important; background:rgba(201,169,110,.05) !important; }
        .testi-card { transition: border-color .3s; }
        .testi-card:hover { border-color:rgba(201,169,110,.35) !important; }
        .contact-item { transition: border-color .3s; }
        .contact-item:hover { border-color:rgba(201,169,110,.3) !important; }

        /* Nav */
        .nav-link { position:relative; padding-bottom:4px; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:#C9A96E; transition:width .4s; }
        .nav-link:hover::after { width:100%; }
        .nav-link:hover { color:#C9A96E !important; }
        .btn-primary { position:relative; overflow:hidden; }
        .btn-primary::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,.15); transform:translateX(-100%); transition:transform .4s; }
        .btn-primary:hover::before { transform:translateX(0); }
        .btn-secondary:hover { background:rgba(201,169,110,.08) !important; border-color:#C9A96E !important; }
        .social-btn:hover { background:#C9A96E !important; color:#1A0A0F !important; }
        .footer-link:hover { color:#C9A96E !important; }
        .nav-cta:hover { background:#C9A96E !important; color:#1A0A0F !important; }
        input,select,textarea { outline:none; }
        input:focus,select:focus,textarea:focus { border-color:#C9A96E !important; background:rgba(44,21,32,.6) !important; }
        select option { background:#2C1520; }

        /* ── LAYOUT CLASSES ── */
        .section-pad { padding: clamp(3rem,8vw,6rem) clamp(1.25rem,5vw,4rem); }
        .container { max-width:1200px; margin:0 auto; }

        /* Categories */
        .cat-grid {
          display:grid;
          grid-template-columns: repeat(3,1fr);
          grid-template-rows: auto auto;
          gap:1.25rem;
        }
        .cat-span { grid-row: span 2; }

        /* Products */
        .products-grid {
          display:grid;
          grid-template-columns: repeat(4,1fr);
          gap:1.25rem;
        }

        /* Why layout */
        .why-grid {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:clamp(2.5rem,5vw,5rem);
          align-items:center;
        }

        /* Testi */
        .testi-grid {
          display:grid;
          grid-template-columns: repeat(3,1fr);
          gap:1.25rem;
        }

        /* Contact */
        .contact-grid {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:clamp(2rem,5vw,5rem);
          align-items:start;
        }

        /* Footer */
        .footer-grid {
          display:grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap:2.5rem;
          margin-bottom:3rem;
        }

        /* Form row */
        .form-row {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:1rem;
        }

        /* Nav desktop */
        .nav-links { display:flex; gap:2.5rem; list-style:none; }
        .nav-cta-desk { display:inline-flex; }
        .hamburger { display:none; background:none; border:none; cursor:pointer; padding:6px; color:#C9A96E; font-size:1.5rem; line-height:1; z-index:1001; }

        /* Mobile menu overlay */
        .mobile-overlay {
          display:none;
          position:fixed; inset:0; z-index:998;
          background:rgba(26,10,15,.98);
          backdrop-filter:blur(20px);
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:2rem;
          animation: menuSlide .3s ease forwards;
        }
        .mobile-overlay.open { display:flex; }

        /* Featured header */
        .featured-header {
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
          flex-wrap:wrap;
          gap:1rem;
          margin-bottom:2.5rem;
        }

        /* ── TABLET ≤900px ── */
        @media (max-width:900px) {
          .cat-grid { grid-template-columns:1fr 1fr; }
          .cat-span { grid-row:span 1; }
          .products-grid { grid-template-columns:repeat(2,1fr); }
          .why-grid { grid-template-columns:1fr; }
          .why-visual { display:none; }
          .testi-grid { grid-template-columns:1fr 1fr; }
          .contact-grid { grid-template-columns:1fr; }
          .footer-grid { grid-template-columns:1fr 1fr; gap:2rem; }
          .nav-links { display:none; }
          .nav-cta-desk { display:none; }
          .hamburger { display:flex; align-items:center; justify-content:center; }
        }

        /* ── MOBILE ≤600px ── */
        @media (max-width:600px) {
          .cat-grid { grid-template-columns:1fr; }
          .products-grid { grid-template-columns:repeat(2,1fr); gap:.75rem; }
          .testi-grid { grid-template-columns:1fr; }
          .footer-grid { grid-template-columns:1fr; gap:1.75rem; }
          .form-row { grid-template-columns:1fr; }
          .hero-actions { flex-direction:column !important; align-items:center !important; }
          .hero-actions button { width:100%; max-width:280px; justify-content:center !important; }
          .featured-header { flex-direction:column; align-items:flex-start !important; }
          .nav-brand { font-size:1.3rem !important; }
        }

        /* ── SMALL MOBILE ≤380px ── */
        @media (max-width:380px) {
          .products-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding: scrolled ? ".75rem clamp(1.25rem,5vw,4rem)" : "1.1rem clamp(1.25rem,5vw,4rem)",
        background: scrolled ? "rgba(26,10,15,.97)" : "linear-gradient(to bottom,rgba(26,10,15,.97),transparent)",
        backdropFilter: scrolled ? "blur(20px)" : undefined,
        borderBottom: scrolled ? "1px solid rgba(201,169,110,.2)" : "none",
        transition:"all .4s",
      }}>
        <span className="playfair nav-brand" style={{ fontSize:"1.6rem", fontWeight:700, color:"#C9A96E", letterSpacing:1, flexShrink:0 }}>
          Memsab<span style={{ fontStyle:"italic", color:"#F2C4CE" }}>Ji</span>
        </span>

        <ul className="nav-links">
          {["categories","featured","why","brands","contact"].map((id, i) => (
            <li key={id}>
              <span className="nav-link" onClick={() => scrollTo(id)} style={{
                fontSize:".7rem", letterSpacing:"2.5px", textTransform:"uppercase",
                color:"#FAF0E6", cursor:"pointer", fontWeight:500,
              }}>
                {["Collections","Shop","About","Brands","Contact"][i]}
              </span>
            </li>
          ))}
        </ul>

        <button className="nav-cta nav-cta-desk" onClick={() => scrollTo("contact")} style={{
          background:"transparent", border:"1px solid #C9A96E", color:"#C9A96E",
          padding:".5rem 1.5rem", fontSize:".65rem", letterSpacing:"2px", textTransform:"uppercase",
          fontFamily:"'Montserrat',sans-serif", fontWeight:600, cursor:"pointer", transition:"all .3s", flexShrink:0,
        }}>📍 Visit Store</button>

        <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`}>
        {["categories","featured","why","brands","contact"].map((id, i) => (
          <span key={id} onClick={() => scrollTo(id)} style={{
            fontSize:"1rem", letterSpacing:"3px", textTransform:"uppercase",
            color:"#FAF0E6", cursor:"pointer", fontWeight:500,
          }}>
            {["Collections","Shop","About","Brands","Contact"][i]}
          </span>
        ))}
        <button onClick={() => scrollTo("contact")} style={{
          background:"linear-gradient(135deg,#8B6914,#C9A96E)", color:"#1A0A0F",
          padding:".8rem 2.5rem", fontSize:".7rem", letterSpacing:"2px", textTransform:"uppercase",
          fontFamily:"'Montserrat',sans-serif", fontWeight:700, border:"none", cursor:"pointer", marginTop:"1rem",
        }}>📍 Visit Store</button>
      </div>

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative", overflow:"hidden",
        background:"radial-gradient(ellipse at 30% 60%,rgba(92,46,58,.5) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(139,105,20,.3) 0%,transparent 50%),#1A0A0F",
      }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 60px,rgba(201,169,110,.03) 60px,rgba(201,169,110,.03) 61px),repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(201,169,110,.03) 60px,rgba(201,169,110,.03) 61px)" }} />
        {[
          { cls:"orb1", s:{ width:"clamp(200px,40vw,500px)", height:"clamp(200px,40vw,500px)", background:"rgba(212,116,138,.12)", top:-100, right:-100 } },
          { cls:"orb2", s:{ width:"clamp(150px,32vw,400px)", height:"clamp(150px,32vw,400px)", background:"rgba(201,169,110,.1)", bottom:-80, left:-80 } },
          { cls:"orb3", s:{ width:"clamp(120px,24vw,300px)", height:"clamp(120px,24vw,300px)", background:"rgba(92,46,58,.2)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" } },
        ].map(({ cls, s }) => (
          <div key={cls} className={cls} style={{ position:"absolute", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none", ...s as React.CSSProperties }} />
        ))}

        <div style={{ textAlign:"center", position:"relative", zIndex:2, maxWidth:"min(900px,90vw)", padding:"0 clamp(1.25rem,5vw,3rem)", width:"100%" }}>
          <div className="hero-eyebrow" style={{ fontSize:"clamp(.55rem,.8vw,.65rem)", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"1.5rem", flexWrap:"wrap" }}>
            <span style={{ width:40, height:1, background:"#C9A96E", opacity:.6, display:"block", flexShrink:0 }} />
            Latur's Most Beloved Beauty Destination
            <span style={{ width:40, height:1, background:"#C9A96E", opacity:.6, display:"block", flexShrink:0 }} />
          </div>
          <h1 className="hero-title playfair" style={{ fontSize:"clamp(3rem,10vw,7.5rem)", fontWeight:400, lineHeight:1.05, color:"#FDF5EB" }}>
            Memsab<em style={{ color:"#C9A96E", display:"block" }}>Ji</em>
          </h1>
          <p className="hero-subtitle cormorant" style={{ fontSize:"clamp(1rem,2.5vw,1.4rem)", color:"#E8D5A3", fontWeight:300, fontStyle:"italic", margin:"1.5rem 0 2.5rem" }}>
            Where Jewellery Whispers Elegance &amp; Cosmetics Speak Confidence
          </p>
          <div className="hero-actions" style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("categories")} style={{
              background:"linear-gradient(135deg,#8B6914,#C9A96E)", color:"#1A0A0F",
              padding:"clamp(.8rem,2vw,1rem) clamp(1.5rem,4vw,2.5rem)", fontSize:"clamp(.6rem,.9vw,.7rem)", letterSpacing:"2.5px", textTransform:"uppercase",
              fontFamily:"'Montserrat',sans-serif", fontWeight:700, border:"none", cursor:"pointer",
              display:"inline-flex", alignItems:"center", gap:".5rem",
            }}>✦ Explore Collections</button>
            <button className="btn-secondary" onClick={() => scrollTo("contact")} style={{
              background:"transparent", border:"1px solid rgba(201,169,110,.5)", color:"#C9A96E",
              padding:"clamp(.8rem,2vw,1rem) clamp(1.5rem,4vw,2.5rem)", fontSize:"clamp(.6rem,.9vw,.7rem)", letterSpacing:"2.5px", textTransform:"uppercase",
              fontFamily:"'Montserrat',sans-serif", fontWeight:500, cursor:"pointer",
              display:"inline-flex", alignItems:"center", gap:".5rem", transition:"all .4s",
            }}>📞 Contact Us</button>
          </div>
        </div>

        <div className="hero-scroll-wrap" style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem", color:"#C9A96E", fontSize:".55rem", letterSpacing:"3px", textTransform:"uppercase" }}>
          <div className="scroll-line" style={{ width:1, height:50, background:"linear-gradient(to bottom,#C9A96E,transparent)" }} />
          Scroll
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background:"linear-gradient(135deg,#8B6914,#C9A96E,#8B6914)", padding:".8rem 0", overflow:"hidden", borderTop:"1px solid rgba(201,169,110,.3)", borderBottom:"1px solid rgba(201,169,110,.3)" }}>
        <div className="marquee-inner" style={{ display:"flex", gap:"3rem", width:"max-content" }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ fontSize:".65rem", letterSpacing:"3px", textTransform:"uppercase", color:"#1A0A0F", fontWeight:700, whiteSpace:"nowrap", display:"inline-flex", alignItems:"center", gap:"1.5rem" }}>
              {item} <span style={{ fontSize:".5rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="section-pad" style={{ background:"radial-gradient(ellipse at center,rgba(44,21,32,.6) 0%,#1A0A0F 70%)" }}>
        <RevealDiv className="container" style={{ textAlign:"center", maxWidth:600, marginBottom:"clamp(2rem,5vw,4rem)" }}>
          <div style={{ fontSize:".6rem", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, marginBottom:"1rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
            <span style={{ width:30, height:1, background:"#C9A96E", display:"block" }} />Our World
          </div>
          <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,4vw,3.5rem)", fontWeight:400, lineHeight:1.2, marginBottom:"1rem" }}>
            Curated <em style={{ fontStyle:"italic", color:"#C9A96E" }}>Collections</em>
          </h2>
          <div style={{ color:"#C9A96E", fontSize:"1.2rem", letterSpacing:8, opacity:.5, margin:".5rem 0" }}>✦ ✦ ✦</div>
          <p className="cormorant" style={{ fontSize:"clamp(1rem,2vw,1.15rem)", color:"#E8D5A3", fontStyle:"italic", lineHeight:1.8 }}>
            Discover everything from stunning jewellery to the finest cosmetics — all under one roof at Latur's most trusted beauty destination.
          </p>
        </RevealDiv>

        <div className="cat-grid container">
          {categories.map((cat, i) => (
            <RevealDiv key={i} delay={i * 80} className={cat.span ? "cat-span" : ""}>
              <div className="cat-card" style={{
                position:"relative", overflow:"hidden",
                background:"linear-gradient(135deg,rgba(44,21,32,.9),rgba(26,10,15,.9))",
                border:"1px solid rgba(201,169,110,.15)", cursor:"pointer",
              }}>
                <div className="cat-bg" style={{ position:"absolute", inset:0, opacity:.06, pointerEvents:"none", fontSize:"clamp(6rem,12vw,12rem)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", transition:"opacity .4s" }}>{cat.icon}</div>
                <div style={{ padding:"clamp(1.5rem,4vw,3rem) clamp(1.25rem,3vw,2.5rem)", minHeight: cat.span ? "clamp(280px,40vw,500px)" : "clamp(160px,20vw,220px)", display:"flex", flexDirection:"column", justifyContent:"flex-end", position:"relative" }}>
                  <span className="cat-icon-el" style={{ fontSize:"clamp(2rem,5vw,3.5rem)", marginBottom:"1rem" }}>{cat.icon}</span>
                  <div className="playfair" style={{ fontSize:"clamp(1rem,2.5vw,1.5rem)", fontWeight:600, color:"#FDF5EB", marginBottom:".4rem" }}>{cat.name}</div>
                  <div style={{ fontSize:"clamp(.7rem,1.2vw,.75rem)", color:"#E8D5A3", letterSpacing:".5px", lineHeight:1.6, fontWeight:300 }}>{cat.desc}</div>
                </div>
                <div className="cat-arrow" style={{ position:"absolute", top:"1.25rem", right:"1.25rem", width:38, height:38, border:"1px solid rgba(201,169,110,.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#C9A96E", opacity:0, transform:"translateY(5px)" }}>→</div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section id="featured" className="section-pad" style={{ background:"linear-gradient(to bottom,#1A0A0F,rgba(44,21,32,.3),#1A0A0F)" }}>
        <RevealDiv className="container featured-header">
          <div>
            <div style={{ fontSize:".6rem", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, marginBottom:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
              <span style={{ width:30, height:1, background:"#C9A96E", display:"block" }} />Bestsellers
            </div>
            <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,4vw,3.5rem)", fontWeight:400 }}>
              Most <em style={{ fontStyle:"italic", color:"#C9A96E" }}>Loved</em> Products
            </h2>
          </div>
          <button className="btn-secondary" onClick={() => scrollTo("contact")} style={{ background:"transparent", border:"1px solid rgba(201,169,110,.5)", color:"#C9A96E", padding:".75rem 1.6rem", fontSize:".65rem", letterSpacing:"2px", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif", fontWeight:500, cursor:"pointer", transition:"all .4s", whiteSpace:"nowrap", flexShrink:0 }}>
            View All →
          </button>
        </RevealDiv>

        <div className="products-grid container">
          {products.map((p, i) => (
            <RevealDiv key={i} delay={i * 50}>
              <div className="product-card" style={{ background:"rgba(44,21,32,.5)", border:"1px solid rgba(201,169,110,.1)", position:"relative", overflow:"hidden", cursor:"pointer" }}>
                <div style={{ width:"100%", aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"clamp(2.5rem,8vw,5rem)", background:"linear-gradient(135deg,rgba(92,46,58,.3),rgba(26,10,15,.6))", position:"relative" }}>
                  {p.icon}
                  {p.badge && <span style={{ position:"absolute", top:".75rem", left:".75rem", background:"#D4748A", color:"white", fontSize:".52rem", letterSpacing:"1.5px", textTransform:"uppercase", padding:".25rem .6rem", fontWeight:600 }}>{p.badge}</span>}
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(26,10,15,.5),transparent)" }} />
                </div>
                <div style={{ padding:"clamp(.8rem,2vw,1.2rem)" }}>
                  <div style={{ fontSize:".52rem", letterSpacing:"2px", textTransform:"uppercase", color:"#C9A96E", marginBottom:".3rem" }}>{p.brand}</div>
                  <div className="playfair" style={{ fontSize:"clamp(.82rem,1.8vw,1rem)", fontWeight:600, color:"#FDF5EB", marginBottom:".4rem", lineHeight:1.3 }}>{p.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:".6rem", fontSize:"clamp(.75rem,1.5vw,.85rem)", fontWeight:600, color:"#C9A96E" }}>
                    {p.price} <span style={{ textDecoration:"line-through", color:"rgba(253,245,235,.3)", fontWeight:400, fontSize:".72rem" }}>{p.old}</span>
                  </div>
                  <button className="product-add" onClick={() => scrollTo("contact")} style={{
                    width:"100%", marginTop:".75rem", padding:".6rem", background:"transparent",
                    border:"1px solid rgba(201,169,110,.3)", color:"#C9A96E",
                    fontSize:".58rem", letterSpacing:"2px", textTransform:"uppercase",
                    fontFamily:"'Montserrat',sans-serif", fontWeight:600, cursor:"pointer",
                    opacity:0, transform:"translateY(5px)",
                  }}>Enquire Now</button>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why" className="section-pad" style={{ background:"linear-gradient(135deg,rgba(44,21,32,.5),#1A0A0F)", borderTop:"1px solid rgba(201,169,110,.1)", borderBottom:"1px solid rgba(201,169,110,.1)" }}>
        <div className="why-grid container">
          <RevealDiv className="why-visual">
            <div style={{ position:"relative", aspectRatio:".85", maxWidth:480 }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(92,46,58,.4),rgba(44,21,32,.8))", border:"1px solid rgba(201,169,110,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"clamp(5rem,10vw,10rem)" }}>🌺</div>
              {[
                { style:{ top:"-1.5rem", right:"-1.5rem" }, num:"15+", label:"Years of Trust" },
                { style:{ bottom:"-1.5rem", left:"-1.5rem" }, num:"50K+", label:"Happy Customers" },
              ].map(({ style, num, label }) => (
                <div key={label} style={{ position:"absolute", background:"rgba(26,10,15,.95)", border:"1px solid rgba(201,169,110,.3)", padding:"1.1rem 1.4rem", backdropFilter:"blur(10px)", ...style as React.CSSProperties }}>
                  <div className="playfair" style={{ fontSize:"clamp(1.5rem,3vw,2rem)", color:"#C9A96E", fontWeight:700 }}>{num}</div>
                  <div style={{ fontSize:".58rem", letterSpacing:"2px", textTransform:"uppercase", color:"#E8D5A3" }}>{label}</div>
                </div>
              ))}
            </div>
          </RevealDiv>

          <RevealDiv>
            <div style={{ fontSize:".6rem", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, marginBottom:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
              <span style={{ width:30, height:1, background:"#C9A96E", display:"block" }} />Our Promise
            </div>
            <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,4vw,3.5rem)", fontWeight:400, lineHeight:1.2, marginBottom:"1.25rem" }}>
              Why <em style={{ fontStyle:"italic", color:"#C9A96E" }}>Latur</em> Loves Us
            </h2>
            <p className="cormorant" style={{ fontSize:"clamp(.95rem,2vw,1.1rem)", color:"#E8D5A3", fontStyle:"italic", lineHeight:1.8, marginBottom:"1.75rem" }}>
              For over 15 years, Memsab Ji has been the heart of beauty in Latur — trusted by mothers, daughters, and brides alike.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {[
                { icon:"🏆", title:"Authentic Premium Brands", desc:"100% genuine products from all major brands. No fakes, no compromises — only the best for our customers." },
                { icon:"💍", title:"Largest Jewellery Collection in Latur", desc:"From everyday accessories to complete bridal sets — thousands of designs under one roof." },
                { icon:"🎀", title:"Expert Beauty Guidance", desc:"Our trained staff helps you find the perfect look for every occasion, skin type, and budget." },
                { icon:"✨", title:"Best Prices, Every Day", desc:"Competitive pricing, seasonal offers, and exclusive deals only for our loyal customers." },
              ].map((f) => (
                <div key={f.title} className="why-feature" style={{ display:"flex", gap:"1.25rem", alignItems:"flex-start", padding:"1.1rem", background:"rgba(44,21,32,.3)", border:"1px solid rgba(201,169,110,.08)" }}>
                  <div style={{ fontSize:"clamp(1.2rem,2.5vw,1.5rem)", flexShrink:0, width:46, height:46, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(201,169,110,.1)", border:"1px solid rgba(201,169,110,.2)" }}>{f.icon}</div>
                  <div>
                    <h4 className="playfair" style={{ fontSize:"clamp(.85rem,1.8vw,1rem)", color:"#FDF5EB", marginBottom:".25rem" }}>{f.title}</h4>
                    <p style={{ fontSize:"clamp(.7rem,1.2vw,.78rem)", color:"#E8D5A3", lineHeight:1.7, fontWeight:300 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section id="brands" className="section-pad" style={{ background:"#1A0A0F", textAlign:"center" }}>
        <RevealDiv style={{ maxWidth:600, margin:"0 auto 1rem" }}>
          <div style={{ fontSize:".6rem", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, marginBottom:"1rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
            <span style={{ width:30, height:1, background:"#C9A96E", display:"block" }} />Trusted Partners
          </div>
          <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,4vw,3.5rem)", fontWeight:400 }}>
            Top Brands <em style={{ fontStyle:"italic", color:"#C9A96E" }}>We Carry</em>
          </h2>
        </RevealDiv>
        <RevealDiv style={{ display:"flex", flexWrap:"wrap", gap:"clamp(.6rem,2vw,1.25rem)", justifyContent:"center", alignItems:"center", maxWidth:960, margin:"2.5rem auto 0" }}>
          {brands.map((b) => (
            <div key={b} className="brand-pill" style={{ padding:"clamp(.45rem,1.5vw,.7rem) clamp(.9rem,3vw,1.8rem)", border:"1px solid rgba(201,169,110,.2)", fontSize:"clamp(.58rem,1.1vw,.65rem)", letterSpacing:"2.5px", textTransform:"uppercase", color:"#E8D5A3", fontWeight:500 }}>{b}</div>
          ))}
        </RevealDiv>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="section-pad" style={{ background:"radial-gradient(ellipse at center bottom,rgba(92,46,58,.2) 0%,#1A0A0F 60%)" }}>
        <RevealDiv style={{ textAlign:"center", maxWidth:600, margin:"0 auto clamp(2rem,5vw,4rem)" }}>
          <div style={{ fontSize:".6rem", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, marginBottom:"1rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
            <span style={{ width:30, height:1, background:"#C9A96E", display:"block" }} />Customer Love
          </div>
          <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,4vw,3.5rem)", fontWeight:400 }}>
            What <em style={{ fontStyle:"italic", color:"#C9A96E" }}>Latur Says</em>
          </h2>
          <div style={{ color:"#C9A96E", fontSize:"1.2rem", letterSpacing:8, opacity:.5, margin:".5rem 0" }}>✦ ✦ ✦</div>
        </RevealDiv>
        <div className="testi-grid container">
          {testimonials.map((t, i) => (
            <RevealDiv key={i} delay={i * 100}>
              <div className="testi-card" style={{ background:"linear-gradient(135deg,rgba(44,21,32,.6),rgba(26,10,15,.8))", border:"1px solid rgba(201,169,110,.12)", padding:"clamp(1.25rem,3vw,2rem)", position:"relative" }}>
                <div className="playfair" style={{ fontSize:"clamp(2.5rem,5vw,4rem)", lineHeight:1, color:"#C9A96E", opacity:.4, position:"absolute", top:"1rem", left:"1.25rem" }}>"</div>
                <div style={{ color:"#C9A96E", fontSize:".7rem", letterSpacing:"3px", marginBottom:".9rem", marginTop:"2rem" }}>★★★★★</div>
                <p className="cormorant" style={{ fontSize:"clamp(.9rem,1.8vw,1.05rem)", lineHeight:1.8, color:"#FAF0E6", fontStyle:"italic", marginBottom:"1.25rem" }}>{t.text}</p>
                <div style={{ display:"flex", alignItems:"center", gap:".9rem" }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#8B6914,#D4748A)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", border:"2px solid rgba(201,169,110,.3)", flexShrink:0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize:".8rem", fontWeight:600, color:"#FDF5EB" }}>{t.name}</div>
                    <div style={{ fontSize:".65rem", color:"#C9A96E", letterSpacing:"1px" }}>{t.location}</div>
                  </div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ background:"linear-gradient(to bottom,#1A0A0F,rgba(44,21,32,.3))" }}>
        <div className="contact-grid container">
          <RevealDiv>
            <div style={{ fontSize:".6rem", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, marginBottom:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
              <span style={{ width:30, height:1, background:"#C9A96E", display:"block" }} />Come Visit Us
            </div>
            <h2 className="playfair" style={{ fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:400, marginBottom:"1.25rem" }}>
              Find <em style={{ fontStyle:"italic", color:"#C9A96E" }}>Us</em> in Latur
            </h2>
            <p className="cormorant" style={{ fontSize:"clamp(.95rem,2vw,1.1rem)", color:"#E8D5A3", lineHeight:1.8, fontStyle:"italic", marginBottom:"2rem" }}>
              We'd love to welcome you to our store. Come in, explore our collections, and let our experts guide you to your perfect look.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              {[
                { icon:"📍", label:"Store Address", value:"Main Market, Latur, Maharashtra — 413512" },
                { icon:"📞", label:"Phone & WhatsApp", value:"+91 98765 43210" },
                { icon:"🕐", label:"Store Hours", value:"Mon – Sat: 10:00 AM – 9:00 PM\nSunday: 11:00 AM – 8:00 PM" },
                { icon:"📸", label:"Instagram", value:"@memsabji_latur" },
              ].map((item) => (
                <div key={item.label} className="contact-item" style={{ display:"flex", gap:".9rem", alignItems:"flex-start", padding:"1rem", border:"1px solid rgba(201,169,110,.1)", background:"rgba(44,21,32,.3)" }}>
                  <div style={{ fontSize:"1.2rem", flexShrink:0, marginTop:2 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize:".52rem", letterSpacing:"2px", textTransform:"uppercase", color:"#C9A96E", marginBottom:".25rem" }}>{item.label}</div>
                    <div style={{ fontSize:"clamp(.8rem,1.5vw,.9rem)", color:"#FDF5EB", whiteSpace:"pre-line" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealDiv>

          <RevealDiv delay={150}>
            <div style={{ fontSize:".6rem", letterSpacing:"4px", textTransform:"uppercase", color:"#C9A96E", fontWeight:500, marginBottom:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
              <span style={{ width:30, height:1, background:"#C9A96E", display:"block" }} />Send a Message
            </div>
            <h3 className="playfair" style={{ fontSize:"clamp(1.4rem,3vw,1.8rem)", marginBottom:"1.25rem", color:"#FDF5EB" }}>
              Quick <em style={{ color:"#C9A96E" }}>Enquiry</em>
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:".9rem" }}>
              <div className="form-row">
                {[{ label:"Your Name", placeholder:"Priya Sharma", key:"name", type:"text" },
                  { label:"Phone Number", placeholder:"+91 98765 43210", key:"phone", type:"tel" }].map((f) => (
                  <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
                    <label style={{ fontSize:".58rem", letterSpacing:"2px", textTransform:"uppercase", color:"#C9A96E" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ background:"rgba(44,21,32,.4)", border:"1px solid rgba(201,169,110,.2)", color:"#FDF5EB", padding:".85rem 1rem", fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(.75rem,1.5vw,.8rem)", transition:"border-color .3s", width:"100%" }} />
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
                <label style={{ fontSize:".58rem", letterSpacing:"2px", textTransform:"uppercase", color:"#C9A96E" }}>Category of Interest</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ background:"rgba(44,21,32,.4)", border:"1px solid rgba(201,169,110,.2)", color:form.category ? "#FDF5EB" : "rgba(253,245,235,.4)", padding:".85rem 1rem", fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(.75rem,1.5vw,.8rem)", cursor:"pointer", width:"100%" }}>
                  <option value="">Select a category...</option>
                  {["Jewellery","Cosmetics & Makeup","Skincare","Perfumes","Bridal Collection","Other"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:".4rem" }}>
                <label style={{ fontSize:".58rem", letterSpacing:"2px", textTransform:"uppercase", color:"#C9A96E" }}>Your Message</label>
                <textarea placeholder="Tell us what you're looking for and we'll help you find it..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ background:"rgba(44,21,32,.4)", border:"1px solid rgba(201,169,110,.2)", color:"#FDF5EB", padding:".85rem 1rem", fontFamily:"'Montserrat',sans-serif", fontSize:"clamp(.75rem,1.5vw,.8rem)", resize:"vertical", transition:"border-color .3s", width:"100%" }} />
              </div>
              <button className="btn-primary" onClick={handleSubmit} style={{
                background:"linear-gradient(135deg,#8B6914,#C9A96E)", color:"#1A0A0F",
                padding:"1rem", fontSize:".68rem", letterSpacing:"2.5px", textTransform:"uppercase",
                fontFamily:"'Montserrat',sans-serif", fontWeight:700, border:"none", cursor:"pointer", width:"100%",
              }}>✦ Send Enquiry</button>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"rgba(15,5,8,.98)", borderTop:"1px solid rgba(201,169,110,.15)", padding:"clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,4rem) clamp(1.5rem,3vw,2rem)" }}>
        <div className="footer-grid">
          <div>
            <span className="playfair" style={{ fontSize:"clamp(1.4rem,3vw,1.8rem)", color:"#C9A96E", fontWeight:700, display:"block", marginBottom:"1rem" }}>
              Memsab<span style={{ fontStyle:"italic", color:"#F2C4CE" }}>Ji</span>
            </span>
            <p style={{ fontSize:"clamp(.7rem,1.3vw,.78rem)", color:"#E8D5A3", lineHeight:1.8, maxWidth:280, fontWeight:300 }}>
              Latur's most beloved beauty and jewellery destination for over 15 years. Where every woman finds her perfect glow.
            </p>
            <div style={{ display:"flex", gap:".75rem", marginTop:"1.25rem", flexWrap:"wrap" }}>
              {["📸","💬","📘","▶"].map((icon) => (
                <a key={icon} className="social-btn" href="#" style={{ width:36, height:36, border:"1px solid rgba(201,169,110,.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"#C9A96E", fontSize:".85rem", cursor:"pointer", transition:"all .3s", textDecoration:"none" }}>{icon}</a>
              ))}
            </div>
          </div>
          {[
            { title:"Collections", links:["Fine Jewellery","Makeup","Skincare","Perfumes","Bridal Sets","Accessories"] },
            { title:"Quick Links", links:["About Us","New Arrivals","Best Sellers","Offers & Deals","Contact"] },
            { title:"Contact", links:["📍 Main Market, Latur","📞 +91 98765 43210","💬 WhatsApp Us","📸 @memsabji_latur"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize:".58rem", letterSpacing:"3px", textTransform:"uppercase", color:"#C9A96E", marginBottom:"1.25rem", fontWeight:600 }}>{col.title}</h4>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:".65rem" }}>
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="footer-link" style={{ fontSize:"clamp(.7rem,1.2vw,.78rem)", color:"rgba(253,245,235,.6)", textDecoration:"none", fontWeight:300, transition:"color .3s", display:"flex", alignItems:"center", gap:".5rem" }}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(201,169,110,.1)", paddingTop:"1.75rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:".75rem" }}>
          <p style={{ fontSize:".62rem", color:"rgba(253,245,235,.35)", letterSpacing:".5px" }}>
            © 2024 <span style={{ color:"#C9A96E" }}>Memsab Ji Cosmetics & Jewellery</span>. All rights reserved. | Latur, Maharashtra
          </p>
          <p style={{ fontSize:".62rem", color:"rgba(253,245,235,.35)" }}>Made with <span style={{ color:"#C9A96E" }}>♥</span> for the women of Latur</p>
        </div>
      </footer>

      {/* ── TOAST ── */}
      <div style={{
        position:"fixed", bottom:"1.5rem", right:"1.5rem",
        background:"linear-gradient(135deg,#8B6914,#C9A96E)", color:"#1A0A0F",
        padding:".9rem 1.75rem", fontSize:".78rem", letterSpacing:"1px", fontWeight:600,
        zIndex:9999, borderLeft:"4px solid rgba(255,255,255,.4)",
        transform: toast ? "translateY(0)" : "translateY(120px)",
        opacity: toast ? 1 : 0,
        transition:"all .5s cubic-bezier(.34,1.56,.64,1)",
        pointerEvents:"none", maxWidth:"calc(100vw - 3rem)",
      }}>✓ Enquiry sent! We'll call you soon.</div>
    </div>
  );
}