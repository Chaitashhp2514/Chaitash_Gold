import { ArrowUp, Heart, Download } from "lucide-react";
import { profile, navLinks } from "../mock/mock";

const Footer = () => {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/5 bg-[#04060b]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="mono text-cyan-400">{"<"}</span>
              <span className="font-semibold text-zinc-50">
                {profile.firstName}
                <span className="text-cyan-400">.</span>
                {profile.lastName.toLowerCase()}
              </span>
              <span className="mono text-cyan-400">{" />"}</span>
            </div>
            <p className="mt-4 text-sm text-zinc-400 max-w-xs leading-relaxed">
              {profile.title} focused on thoughtful software — shipping across
              web, mobile and hardware-aware stacks.
            </p>
          </div>

          <div>
            <div className="mono text-[11px] uppercase tracking-widest text-zinc-500">
              Explore
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-zinc-300 text-sm hover:text-cyan-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono text-[11px] uppercase tracking-widest text-zinc-500">
              Get in touch
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block text-zinc-100 hover:text-cyan-300"
            >
              {profile.email}
            </a>
            <div className="text-zinc-400 text-sm mt-1">{profile.phone}</div>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
            >
              <Download className="w-4 h-4" />
              Download résumé (PDF)
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="mono text-xs text-zinc-500">
            © {new Date().getFullYear()} {profile.name}. Built with
            <Heart className="inline w-3 h-3 mx-1 text-cyan-400" />
            and a lot of coffee.
          </div>
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-300 transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
