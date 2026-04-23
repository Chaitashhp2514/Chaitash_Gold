import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download, Mail, MapPin, Github, Linkedin } from "lucide-react";
import { profile, stats as mockStats, toolbelt } from "../mock/mock";
import { Button } from "./ui/button";
import { api, fireAndForget } from "../lib/api";

const Hero = () => {
  const photoRef = useRef(null);
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    const onMove = (e) => {
      const el = photoRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateZ(0)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = () =>
      api
        .getStats()
        .then((s) => !cancelled && setLiveStats(s))
        .catch(() => {});
    fetchStats();
    const t = setInterval(fetchStats, 20000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  const onResumeClick = () => fireAndForget(() => api.bumpResumeDownload());

  // Merge live stats into the first stat card ("Years coding" replaced with Visitors if available)
  const renderStats = () => {
    const visits = liveStats?.visits;
    const downloads = liveStats?.downloads;
    const cards = [
      visits != null
        ? { label: "Live visitors", value: String(visits) }
        : mockStats[0],
      mockStats[1],
      mockStats[2],
      downloads != null
        ? { label: "Resume downloads", value: String(downloads) }
        : mockStats[3],
    ];
    return cards.map((s) => (
      <div
        key={s.label}
        className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
      >
        <div className="text-2xl font-semibold text-zinc-50">{s.value}</div>
        <div className="mono text-[11px] uppercase tracking-widest text-zinc-500 mt-1">
          {s.label}
        </div>
      </div>
    ));
  };

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden noise min-h-[100svh] pt-24 md:pt-28"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="scan-line" />
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute top-20 right-1/4 w-[300px] h-[300px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05080d_85%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="mono text-[11px] tracking-widest uppercase text-zinc-300">
                {profile.availability}
              </span>
            </div>

            <h1 className="mt-6 text-[44px] leading-[1.04] sm:text-6xl lg:text-[72px] font-semibold text-zinc-50">
              Hi, I’m{" "}
              <span className="relative inline-block">
                <span
                  data-text={profile.firstName}
                  className="glitch neon-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                >
                  {profile.firstName}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-cyan-400/30 blur-md" />
              </span>
              <br />
              a {profile.title}.
              <span className="caret" aria-hidden="true" />
            </h1>

            <p className="mt-6 max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed">
              {profile.tagline} I design & build{" "}
              <span className="text-zinc-200">web, mobile and hardware-aware software</span>{" "}
              with a craftsman’s attention to detail.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" download onClick={onResumeClick}>
                <Button
                  size="lg"
                  className="bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-semibold h-12 px-6 rounded-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Résumé
                </Button>
              </a>
              <a href={`mailto:${profile.email}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 rounded-full border-white/15 bg-white/[0.02] text-zinc-100 hover:bg-white/[0.06] hover:text-cyan-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get in touch
                </Button>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-5 text-zinc-400">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400" />
                {profile.location}
              </div>
              <span className="w-px h-4 bg-white/10" />
              <a
                href={profile.social.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-100 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
              {renderStats()}
            </div>
          </div>

          {/* Right photo */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="glow-ring" />
              <div
                ref={photoRef}
                className="scanlines relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] lg:w-[380px] lg:h-[500px] rounded-[28px] overflow-hidden border border-cyan-400/25 shadow-[0_30px_80px_-20px_rgba(34,211,238,0.45)] transition-transform duration-200 ease-out"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080d] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="mono text-[11px] tracking-widest uppercase text-zinc-300/90">
                    {profile.firstName} · {new Date().getFullYear()}
                  </div>
                  <div className="mono text-[11px] text-cyan-300">v1.0</div>
                </div>
              </div>

              {/* Floating tag */}
              <div className="absolute -left-6 top-10 hidden md:block rotate-[-8deg] px-3 py-2 rounded-lg bg-[#0c1320] border border-cyan-400/25 shadow-[0_0_24px_-6px_rgba(34,211,238,0.55)]">
                <div className="mono text-[10px] tracking-widest uppercase text-cyan-300">
                  engineer.exe
                </div>
                <div className="text-xs text-zinc-300 mt-0.5">
                  status: <span className="magenta-pop">running</span>
                </div>
              </div>
              <div className="absolute -right-4 bottom-14 hidden md:block rotate-[6deg] px-3 py-2 rounded-lg bg-[#0c1320] border border-emerald-400/30 shadow-[0_0_24px_-6px_rgba(74,222,128,0.45)]">
                <div className="mono text-[10px] tracking-widest uppercase text-emerald-300">
                  stack
                </div>
                <div className="text-xs text-zinc-300 mt-0.5">
                  React · Node · Flutter
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="relative mt-6 md:mt-10 border-y border-white/5 bg-white/[0.02]">
        <div className="overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap py-4 animate-marquee">
            {[...toolbelt, ...toolbelt].map((t, i) => (
              <span
                key={i}
                className="mono text-xs tracking-widest uppercase text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                <span className="text-cyan-400/60 mr-2">◆</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute left-1/2 -translate-x-1/2 bottom-6 hidden md:flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors"
        aria-label="Scroll to about section"
      >
        <span className="mono text-[11px] uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
