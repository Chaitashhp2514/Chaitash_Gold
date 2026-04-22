import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { profile, navLinks } from "../mock/mock";
import { Button } from "./ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = navLinks.map((l) => document.getElementById(l.id));
      const y = window.scrollY + window.innerHeight * 0.35;
      for (const s of sections) {
        if (s && s.offsetTop <= y && s.offsetTop + s.offsetHeight > y) {
          setActive(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#05080d]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <nav className="h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2 text-zinc-100"
          >
            <span className="mono text-cyan-400 text-sm">{"<"}</span>
            <span className="font-semibold tracking-tight">
              {profile.firstName}
              <span className="text-cyan-400">.</span>
              {profile.lastName.toLowerCase()}
            </span>
            <span className="mono text-cyan-400 text-sm">{" />"}</span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((l, i) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative px-4 py-2 text-sm transition-colors duration-200 ${
                    active === l.id
                      ? "text-cyan-400"
                      : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  <span className="mono text-[10px] text-zinc-600 mr-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                  {active === l.id && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-cyan-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" download>
              <Button
                size="sm"
                className="bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Résumé
              </Button>
            </a>
          </div>

          <button
            className="md:hidden text-zinc-100 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden pb-6 pt-2 border-t border-white/5">
            <ul className="flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`w-full text-left px-3 py-3 rounded-md text-sm ${
                      active === l.id
                        ? "bg-white/5 text-cyan-400"
                        : "text-zinc-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="mono text-xs text-zinc-500 mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" download>
                  <Button className="w-full bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Download Résumé
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
