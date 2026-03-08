import { useState, useEffect, useRef } from "react";
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton,
  Grid, Stack, Collapse, Drawer, List,
  ListItemButton, Divider, useMediaQuery,
  ThemeProvider, createTheme, CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FF6B35" },
    background: { default: "#0a0a0f", paper: "#0f0f17" },
    text: { primary: "#f0ece4" },
  },
  typography: { fontFamily: "'Sora', 'Poppins', sans-serif" },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "'Sora', 'Poppins', sans-serif",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        html, body, #root { margin:0; padding:0; width:100%; max-width:100%; overflow-x:hidden; }

        @keyframes marquee      { 0%{transform:translateX(0)}  100%{transform:translateX(-50%)} }
        @keyframes scrollPulse  { 0%,100%{opacity:.3}          50%{opacity:.9} }
        @keyframes fadeUp       { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .fade-up   { animation: fadeUp 0.7s 0.00s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.30s ease both; }

        /* pill badge */
        .pill {
          display:inline-block; padding:5px 14px; border-radius:999px;
          background:rgba(255,107,53,0.15); border:1px solid rgba(255,107,53,0.4);
          color:#FF6B35; font-size:11px; font-weight:600;
          letter-spacing:0.08em; text-transform:uppercase;
        }

        /* nav links */
        .nav-link { color:rgba(240,236,228,0.8); text-decoration:none; font-size:14px; font-weight:500; transition:color 0.2s; white-space:nowrap; }
        .nav-link:hover { color:#FF6B35; }

        /* footer links */
        .footer-link { color:rgba(240,236,228,0.45); text-decoration:none; font-size:13px; transition:color 0.2s; display:block; margin-bottom:9px; }
        .footer-link:hover { color:#FF6B35; }

        /* search */
        .search-wrap {
          display:flex; align-items:center; width:100%; max-width:560px;
          background:rgba(255,255,255,0.07); backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,0.12); border-radius:14px;
          overflow:hidden; box-shadow:0 8px 40px rgba(0,0,0,0.4);
        }
        .search-input {
          flex:1; min-width:0; background:transparent; border:none; outline:none;
          padding:14px 16px; color:#f0ece4; font-size:14px; font-family:'Sora','Poppins',sans-serif;
        }
        .search-input::placeholder { color:rgba(240,236,228,0.4); }

        /* role chips in hero */
        .role-chip {
          display:inline-flex; align-items:center; gap:6px;
          padding:8px 14px; border-radius:999px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          font-size:12px; white-space:nowrap; transition:all 0.2s; cursor:default;
        }
        .role-chip:hover { background:rgba(255,107,53,0.12); border-color:rgba(255,107,53,0.35); }

        /* service cards */
        .svc-card {
          border-radius:20px; padding:28px 24px; cursor:pointer; height:100%;
          transition:transform 0.25s ease, box-shadow 0.25s ease;
          display:flex; flex-direction:column;
        }
        .svc-card:hover { transform:translateY(-6px); box-shadow:0 20px 56px rgba(255,107,53,0.22) !important; }
        .svc-orange { background:linear-gradient(135deg,#FF6B35,#e85d2b); }
        .svc-dark   { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); }

        /* how-it-works cards */
        .how-card {
          border-radius:20px; padding:32px 26px; height:100%;
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);
          transition:border-color 0.3s; display:flex; flex-direction:column;
        }
        .how-card:hover { border-color:rgba(255,107,53,0.4); }

        /* faq rows */
        .faq-row { border-bottom:1px solid rgba(255,255,255,0.08); padding:18px 0; cursor:pointer; }

        /* marquee */
        .mq-outer { overflow:hidden; width:100%; }
        .mq-inner {
          display:flex; gap:56px; align-items:center;
          white-space:nowrap; width:max-content;
          animation:marquee 22s linear infinite;
        }

        /* social icons */
        .soc-icon {
          width:34px; height:34px; border-radius:50%;
          border:1px solid rgba(255,255,255,0.12);
          display:inline-flex; align-items:center; justify-content:center;
          color:rgba(240,236,228,0.5); font-size:12px; text-decoration:none;
          transition:all 0.2s;
        }
        .soc-icon:hover { border-color:#FF6B35; color:#FF6B35; }
      `,
    },
  },
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const ROLES    = ["👨‍🍳 Head Chef", "🍽️ Waiter", "🍹 Bartender", "🧁 Pastry Chef", "🧑‍💼 Manager"];
const BRANDS   = ["Zomato","Swiggy","Biryani Blues","Haldiram's","McDonald's","Pizza Hut","Subway","KFC"];
const SERVICES = [
  { icon:"👨‍🍳", title:"Chef Hiring",   variant:"orange", jobs:"2,400+ openings" },
  { icon:"🍽️",  title:"Floor Staff",   variant:"dark",   jobs:"3,100+ openings" },
  { icon:"🍹",  title:"Bar & Mixology",variant:"orange", jobs:"800+ openings"   },
  { icon:"🏨",  title:"Hotel Catering",variant:"dark",   jobs:"1,200+ openings" },
  { icon:"🧑‍💼", title:"Management",    variant:"orange", jobs:"650+ openings"   },
  { icon:"🚗",  title:"Delivery Jobs", variant:"dark",   jobs:"4,500+ openings" },
];
const HOW_STEPS = [
  { icon:"📋", step:"01", title:"Post a Job for Free",  desc:"Create your restaurant job post in under 3 minutes — no upfront cost, no hidden charges." },
  { icon:"📩", step:"02", title:"Receive Applications", desc:"Get proposals from verified food industry professionals or instantly browse our curated database." },
  { icon:"✅", step:"03", title:"Hire & Pay Securely",  desc:"Payments are only released after the work is confirmed complete — protecting both sides." },
];
const FAQS = [
  { q:"What is RestroMitra?",             a:"RestroMitra is India's first dedicated restaurant & hospitality hiring platform. We connect restaurant owners with skilled food service professionals — from chefs and managers to delivery staff and floor crew." },
  { q:"How does payment work?",           a:"Posting a job is completely free. We offer premium plans for restaurants that want priority visibility, featured listings, and unlimited applications." },
  { q:"Is RestroMitra free to use?",      a:"Yes! Basic job posting and candidate browsing is free. Premium plans unlock advanced filters, instant hire, and dedicated support." },
  { q:"How quickly can I hire?",          a:"With our Instant Hire feature, you can post a job and receive qualified applications within 2 hours. Most restaurants find their hire within 24–48 hours." },
  { q:"Can I hire from outside my city?", a:"Absolutely. RestroMitra lists candidates across all major Indian cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, and 200+ tier-2 cities." },
];
const FOOTER_COLS = [
  { title:"Company",         links:["About","Careers","Blog","Press"] },
  { title:"For Restaurants", links:["Post a Job","Pricing","Featured","Case Studies"] },
  { title:"Support",         links:["Help Center","Privacy","Terms","Contact"] },
];

// ─── Reusable sx button presets ───────────────────────────────────────────────
const btnFilled: object = {
  bgcolor:"#FF6B35", color:"#fff", borderRadius:"11px",
  px:3.5, py:1.5, fontSize:14, fontWeight:700,
  "&:hover":{ bgcolor:"#e85d2b", transform:"translateY(-1px)", boxShadow:"0 6px 24px rgba(255,107,53,0.4) !important" },
};
const btnGhost: object = {
  borderColor:"rgba(240,236,228,0.25)", color:"#f0ece4",
  borderRadius:"11px", px:3.5, py:1.5, fontSize:14, fontWeight:600,
  "&:hover":{ borderColor:"#FF6B35", color:"#FF6B35", bgcolor:"transparent" },
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ id, bg, children, center = false, py = { xs:8, md:12 } }: {
  id?: string; bg?: string; children: React.ReactNode; center?: boolean; py?: object;
}) => (
  <Box
    component="section"
    id={id}
    sx={{
      bgcolor: bg ?? "#0a0a0f",
      py,
      px: { xs:3, sm:4, md:6, lg:8 },
      width:"100%",
    }}
  >
    <Box sx={{ maxWidth:1200, mx:"auto", textAlign: center ? "center" : "left" }}>
      {children}
    </Box>
  </Box>
);

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionHead = ({ pill, title, sub }: { pill: string; title: React.ReactNode; sub?: string }) => (
  <Box textAlign="center" mb={{ xs:5, md:7 }}>
    <Box className="pill" sx={{ mb:2 }}>{pill}</Box>
    <Typography sx={{ fontFamily:"'Playfair Display', serif", fontSize:{ xs:28, sm:36, md:46 }, fontWeight:900, lineHeight:1.1 }}>
      {title}
    </Typography>
    {sub && (
      <Typography sx={{ color:"rgba(240,236,228,0.5)", mt:1.5, fontSize:{ xs:13, md:15 }, maxWidth:420, mx:"auto" }}>
        {sub}
      </Typography>
    )}
  </Box>
);

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <Stack direction="row" alignItems="center" spacing={1} component="a" href="#"
    sx={{ textDecoration:"none", flexShrink:0 }}>
    <Box sx={{ width:32, height:32, borderRadius:"9px", bgcolor:"#FF6B35", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>🍴</Box>
    <Typography sx={{ fontFamily:"'Playfair Display', serif", fontSize:21, fontWeight:700, color:"#f0ece4", lineHeight:1 }}>
      Restro<Box component="span" sx={{ color:"#FF6B35" }}>Mitra</Box>
    </Typography>
  </Stack>
);

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [openFaq, setOpenFaq]   = useState<number|null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery]       = useState("");
  const [drawer, setDrawer]     = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [counts, setCounts]     = useState({ brands:0, pros:0, gigs:0 });
  const [statsVis, setStatsVis] = useState(false);
  const statsRef                = useRef<HTMLDivElement>(null);
  const isMobile                = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!statsVis) return;
    const targets = { brands:1200, pros:28400, gigs:540 };
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts({ brands:Math.round(e*targets.brands), pros:Math.round(e*targets.pros), gigs:Math.round(e*targets.gigs) });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statsVis]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold:0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Box sx={{ bgcolor:"#0a0a0f", color:"#f0ece4", width:"100%", overflowX:"hidden" }}>

      {/* ══════════════════════════ NAV ═══════════════════════════════════════ */}
      <AppBar position="fixed" elevation={0} sx={{
        bgcolor: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        transition:"all 0.3s",
        px:{ xs:2, sm:3, md:5 },
      }}>
        <Toolbar disableGutters sx={{ height:64, justifyContent:"space-between", maxWidth:1400, mx:"auto", width:"100%" }}>
          <Logo />
          {!isMobile ? (
            <Stack direction="row" alignItems="center" spacing={3.5}>
              {["Services","How it Works","FAQ","Pricing"].map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} className="nav-link">{l}</a>
              ))}
              <Button variant="contained"
                sx={{ ...btnFilled, px:2.5, py:0.9, fontSize:13, borderRadius:"8px" }}>
                Sign Up Free
              </Button>
            </Stack>
          ) : (
            <IconButton onClick={() => setDrawer(true)} sx={{ color:"#f0ece4" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}
        PaperProps={{ sx:{ bgcolor:"rgba(12,12,18,0.98)", backdropFilter:"blur(20px)", width:270, px:2, pt:2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Logo />
          <IconButton onClick={() => setDrawer(false)} sx={{ color:"#f0ece4" }}><CloseIcon /></IconButton>
        </Stack>
        <Divider sx={{ borderColor:"rgba(255,255,255,0.08)", mb:1 }} />
        <List disablePadding>
          {["Services","How it Works","FAQ","Pricing"].map(l => (
            <ListItemButton key={l} onClick={() => setDrawer(false)} component="a"
              href={`#${l.toLowerCase().replace(/ /g,"-")}`}
              sx={{ py:1.5, borderBottom:"1px solid rgba(255,255,255,0.06)", color:"rgba(240,236,228,0.8)", fontWeight:500 }}>
              {l}
            </ListItemButton>
          ))}
        </List>
        <Button fullWidth variant="contained" sx={{ ...btnFilled, mt:3 }}>Sign Up Free</Button>
      </Drawer>

      {/* ══════════════════════════ HERO ══════════════════════════════════════ */}
      <Box component="section" sx={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", px:{ xs:3, md:6 }, pt:"80px", pb:"60px" }}>
        <Box sx={{ position:"absolute", inset:0, background:"url('https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=1600&q=80') center/cover no-repeat" }} />
        <Box sx={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(10,10,15,0.93) 0%,rgba(10,10,15,0.65) 55%,rgba(255,107,53,0.2) 100%)" }} />

        <Box sx={{ position:"relative", zIndex:2, textAlign:"center", width:"100%", maxWidth:720, mx:"auto" }}>
          <Box className="pill fade-up" sx={{ mb:2.5 }}>🇮🇳 India's #1 Restaurant Hiring Platform</Box>

          <Typography component="h1" className="fade-up-2" sx={{
            fontFamily:"'Playfair Display', serif",
            fontSize:{ xs:"2.2rem", sm:"3rem", md:"4rem", lg:"4.8rem" },
            fontWeight:900, lineHeight:1.1, mb:2.5,
            textShadow:"0 4px 30px rgba(0,0,0,0.6)",
          }}>
            Hire Restaurant<br />
            <Box component="span" sx={{ color:"#FF6B35", position:"relative" }}>
              Talent in Minutes
              <Box component="svg" viewBox="0 0 300 6" fill="none"
                sx={{ position:"absolute", bottom:-4, left:0, width:"100%", height:6 }}>
                <path d="M2 5 C80 1,220 1,298 5" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
              </Box>
            </Box>
          </Typography>

          <Typography className="fade-up-3" sx={{ fontSize:{ xs:14, md:16.5 }, color:"rgba(240,236,228,0.7)", lineHeight:1.8, maxWidth:460, mx:"auto", mb:4 }}>
            Connect with verified chefs, floor staff, bartenders &amp; managers. No middlemen, no delays.
          </Typography>

          <Stack className="fade-up-3" alignItems="center" mb={1.5}>
            <div className="search-wrap">
              <input className="search-input" placeholder="Chef, Waiter, Manager, Bartender…" value={query} onChange={e => setQuery(e.target.value)} />
              <Button variant="contained" sx={{ ...btnFilled, m:"5px", px:{ xs:1.75, sm:2.5 }, py:1.2, fontSize:13, borderRadius:"10px", flexShrink:0, whiteSpace:"nowrap" }}>
                Search →
              </Button>
            </div>
          </Stack>

          <Typography sx={{ fontSize:11, color:"rgba(240,236,228,0.35)" }}>
            Free to post · No credit card required
          </Typography>

          <Box sx={{ display:{ xs:"none", sm:"flex" }, flexWrap:"wrap", gap:1.25, justifyContent:"center", mt:3.5 }}>
            {ROLES.map(r => <span key={r} className="role-chip">{r}</span>)}
          </Box>
        </Box>

        <Box sx={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", textAlign:"center", zIndex:2 }}>
          <Typography sx={{ fontSize:9, letterSpacing:"0.15em", color:"rgba(240,236,228,0.3)", textTransform:"uppercase", mb:0.75 }}>Scroll</Typography>
          <Box sx={{ width:1, height:28, background:"linear-gradient(to bottom,rgba(255,107,53,0.7),transparent)", mx:"auto", animation:"scrollPulse 2s infinite" }} />
        </Box>
      </Box>

      {/* ══════════════════════════ MARQUEE ═══════════════════════════════════ */}
      <Box sx={{ bgcolor:"#FF6B35", py:1.75, overflow:"hidden" }}>
        <div className="mq-outer">
          <div className="mq-inner">
            {[...BRANDS,...BRANDS,...BRANDS].map((b,i) => (
              <span key={i} style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.85)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{b}</span>
            ))}
          </div>
        </div>
      </Box>

      {/* ══════════════════════════ STATS ═════════════════════════════════════ */}
      <Box ref={statsRef} sx={{ bgcolor:"#0f0f17", borderBottom:"1px solid rgba(255,255,255,0.06)", width:"100%" }}>
        <Grid container sx={{ maxWidth:1200, mx:"auto" }}>
          {[
            { val:`${counts.brands.toLocaleString()}+`, label:"Restaurants Hiring",    sub:"across India"     },
            { val:`${counts.pros.toLocaleString()}+`,   label:"Skilled Professionals", sub:"verified & ready" },
            { val:`${counts.gigs.toLocaleString()}+`,   label:"Jobs Published",        sub:"this month"       },
          ].map((s,i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Box sx={{
                textAlign:"center",
                py:{ xs:4, md:6.5 },
                px:{ xs:2, md:3 },
                borderRight:{ xs:"none", sm: i<2 ? "1px solid rgba(255,255,255,0.07)" : "none" },
                borderBottom:{ xs: i<2 ? "1px solid rgba(255,255,255,0.07)" : "none", sm:"none" },
              }}>
                <Typography sx={{
                  fontFamily:"'Playfair Display', serif",
                  fontSize:{ xs:"2.6rem", sm:"3rem", md:"3.8rem", lg:"4.2rem" },
                  fontWeight:900, color:"#FF6B35", lineHeight:1,
                }}>
                  {s.val}
                </Typography>
                <Typography sx={{ fontSize:{ xs:13, sm:14, md:16 }, fontWeight:700, mt:1.25, color:"#f0ece4" }}>
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize:12, color:"rgba(240,236,228,0.4)", mt:0.5 }}>
                  {s.sub}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ══════════════════════════ SERVICES ══════════════════════════════════ */}
      <Section id="services" py={{ xs:8, md:12 }}>
        <SectionHead
          pill="Popular Categories"
          title={<>Hire for Every <Box component="span" sx={{ color:"#FF6B35" }}>Role</Box></>}
          sub="From fine dining to fast food, cloud kitchens to 5-star hotels."
        />
        <Grid container spacing={2.5} justifyContent="center">
  {SERVICES.map((s,i) => (
    <Grid item xs={12} sm={6} md={4} key={i} sx={{ display:"flex" }}>
      <div className={`svc-card svc-${s.variant}`} style={{ width:"100%" }}>
        <Typography sx={{ fontSize:38, mb:2 }}>{s.icon}</Typography>

        <Typography
          sx={{
            fontSize:{ xs:16, md:19 },
            fontWeight:700,
            mb:0.75,
            color: s.variant==="orange" ? "#fff" : "#f0ece4"
          }}
        >
          {s.title}
        </Typography>

        <Typography
          sx={{
            fontSize:12.5,
            color: s.variant==="orange"
              ? "rgba(255,255,255,0.75)"
              : "rgba(240,236,228,0.45)"
          }}
        >
          {s.jobs}
        </Typography>

        <Typography
          sx={{
            mt:"auto",
            pt:2.5,
            fontSize:13,
            fontWeight:700,
            color: s.variant==="orange" ? "white" : "#FF6B35"
          }}
        >
          Browse Jobs →
        </Typography>
      </div>
    </Grid>
  ))}
</Grid>
      </Section>

      {/* ══════════════════════════ HOW IT WORKS ══════════════════════════════ */}
      <Section id="how-it-works" bg="#0f0f17" py={{ xs:8, md:12 }}>
        <SectionHead
          pill="Simple Process"
          title={<>How <Box component="span" sx={{ color:"#FF6B35" }}>RestroMitra</Box> Works</>}
        />
        <Stack direction="row" justifyContent="center" spacing={1} mb={5}>
          {["Hire Staff","Find a Job"].map((t,i) => (
            <Button key={i} variant={activeTab===i ? "contained" : "outlined"}
              onClick={() => setActiveTab(i)}
              sx={ activeTab===i
                ? { ...btnFilled, px:2.5, py:1, fontSize:13, borderRadius:"8px" }
                : { borderColor:"rgba(255,255,255,0.15)", color:"#f0ece4", borderRadius:"8px", px:2.5, py:1, fontSize:13,
                    "&:hover":{ borderColor:"rgba(255,255,255,0.3)", bgcolor:"rgba(255,255,255,0.04)" } }
              }>
              {t}
            </Button>
          ))}
        </Stack>
        <Grid container spacing={2.5}>
          {HOW_STEPS.map((s,i) => (
            <Grid item xs={12} md={4} key={i} sx={{ display:"flex" }}>
              <div className="how-card" style={{ width:"100%" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2.5}>
                  <Typography sx={{ fontSize:38 }}>{s.icon}</Typography>
                  <Typography sx={{ fontSize:36, fontWeight:900, color:"rgba(255,107,53,0.12)", fontFamily:"'Playfair Display', serif", lineHeight:1 }}>
                    {s.step}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize:{ xs:15, md:17 }, fontWeight:700, mb:1.25, color:"#f0ece4" }}>{s.title}</Typography>
                <Typography sx={{ fontSize:13, color:"rgba(240,236,228,0.5)", lineHeight:1.8 }}>{s.desc}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* ══════════════════════════ TESTIMONIAL ═══════════════════════════════ */}
      <Box component="section" sx={{ py:{ xs:8, md:10 }, px:{ xs:3, md:6 }, background:"linear-gradient(135deg,#FF6B35,#d4522a)", textAlign:"center" }}>
        <Typography sx={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", opacity:0.7, mb:2 }}>
          What restaurateurs say
        </Typography>
        <Typography component="blockquote" sx={{
          fontFamily:"'Playfair Display', serif",
          fontSize:{ xs:"1.15rem", sm:"1.5rem", md:"1.9rem" },
          fontWeight:700, maxWidth:680, mx:"auto", mb:3.5, lineHeight:1.45,
        }}>
          "We hired a trained tandoor chef within 6 hours of posting. Absolutely game-changing."
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5}>
          <Box sx={{ width:42, height:42, borderRadius:"50%", bgcolor:"rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>👨‍🍳</Box>
          <Box textAlign="left">
            <Typography sx={{ fontWeight:700, fontSize:14 }}>Rajesh Sharma</Typography>
            <Typography sx={{ fontSize:11, opacity:0.7 }}>Owner, Spice Route — Bangalore</Typography>
          </Box>
        </Stack>
      </Box>

      {/* ══════════════════════════ FAQ ═══════════════════════════════════════ */}
      <Section id="faq" py={{ xs:8, md:12 }}>
        <Grid container spacing={{ xs:5, md:8 }} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Box className="pill" sx={{ mb:2 }}>Got Questions?</Box>
            <Typography sx={{ fontFamily:"'Playfair Display', serif", fontSize:{ xs:28, md:40 }, fontWeight:900, lineHeight:1.2 }}>
              Frequently<br />Asked <Box component="span" sx={{ color:"#FF6B35" }}>Questions</Box>
            </Typography>
            <Typography sx={{ mt:2, color:"rgba(240,236,228,0.45)", fontSize:13, lineHeight:1.75 }}>
              Can't find the answer?
            </Typography>
            <Button variant="contained" sx={{ ...btnFilled, mt:3 }}>Contact Support</Button>
          </Grid>
          <Grid item xs={12} md={8}>
            {FAQS.map((f,i) => (
              <div key={i} className="faq-row" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Typography sx={{ fontWeight:600, fontSize:{ xs:13, md:14.5 }, lineHeight:1.5 }}>{f.q}</Typography>
                  <KeyboardArrowDownIcon sx={{ color:"#FF6B35", flexShrink:0, transition:"transform 0.3s", transform: openFaq===i ? "rotate(180deg)" : "rotate(0deg)" }} />
                </Stack>
                <Collapse in={openFaq===i}>
                  <Typography sx={{ color:"rgba(240,236,228,0.6)", fontSize:13, lineHeight:1.8, mt:1.5 }}>{f.a}</Typography>
                </Collapse>
              </div>
            ))}
          </Grid>
        </Grid>
      </Section>

      {/* ══════════════════════════ BOTTOM CTA ════════════════════════════════ */}
      <Section bg="#0f0f17" py={{ xs:8, md:11 }}>
        <Box textAlign="center" sx={{ maxWidth:580, mx:"auto" }}>
          <Typography sx={{ fontSize:48, mb:2 }}>🍴</Typography>
          <Typography sx={{ fontFamily:"'Playfair Display', serif", fontSize:{ xs:"1.65rem", md:"2.7rem" }, fontWeight:900, mb:2, lineHeight:1.2 }}>
            Ready to Build Your<br />
            <Box component="span" sx={{ color:"#FF6B35" }}>Perfect Restaurant Team?</Box>
          </Typography>
          <Typography sx={{ color:"rgba(240,236,228,0.5)", fontSize:{ xs:13, md:15 }, mb:4.5, lineHeight:1.8, maxWidth:500, mx:"auto" }}>
            Join 1,200+ restaurants already hiring smarter with RestroMitra.
          </Typography>
          <Stack direction={{ xs:"column", sm:"row" }} spacing={2} justifyContent="center" alignItems="center">
            <Button variant="contained" sx={{ ...btnFilled, width:{ xs:"100%", sm:"auto" }, minWidth:200 }}>
              Post a Job Free →
            </Button>
            <Button variant="outlined" sx={{ ...btnGhost, width:{ xs:"100%", sm:"auto" }, minWidth:200 }}>
              Browse Candidates
            </Button>
          </Stack>
        </Box>
      </Section>

      {/* ══════════════════════════ FOOTER ════════════════════════════════════ */}
      <Box component="footer" sx={{ bgcolor:"#07070d", borderTop:"1px solid rgba(255,255,255,0.06)", pt:{ xs:6, md:8 }, pb:3.5, px:{ xs:3, sm:4, md:6, lg:8 } }}>
        <Box sx={{ maxWidth:1200, mx:"auto" }}>
          <Grid container spacing={{ xs:4, md:5 }} mb={5}>
            <Grid item xs={12} sm={6} md={3}>
              <Logo />
              <Typography sx={{ color:"rgba(240,236,228,0.4)", fontSize:12.5, lineHeight:1.75, mt:1.75, maxWidth:230 }}>
                India's dedicated platform for restaurant &amp; hospitality hiring.
              </Typography>
              <Stack direction="row" spacing={1.25} mt={2.25}>
                {["𝕏","in","f"].map((s,i) => (
                  <a key={i} href="#" className="soc-icon">{s}</a>
                ))}
              </Stack>
            </Grid>
            {FOOTER_COLS.map((col,i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Typography sx={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,236,228,0.35)", mb:2 }}>
                  {col.title}
                </Typography>
                {col.links.map((l,j) => <a key={j} href="#" className="footer-link">{l}</a>)}
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ borderColor:"rgba(255,255,255,0.06)", mb:3 }} />
          <Stack direction={{ xs:"column", sm:"row" }} justifyContent="space-between" alignItems="center" gap={1.25}>
            <Typography sx={{ fontSize:11, color:"rgba(240,236,228,0.3)" }}>© 2026 RestroMitra. All rights reserved.</Typography>
            <Typography sx={{ fontSize:11, color:"rgba(240,236,228,0.3)" }}>Made with ❤️ for India's Food Industry</Typography>
          </Stack>
        </Box>
      </Box>

    </Box>
  );
}

export default function RestroMitra() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
