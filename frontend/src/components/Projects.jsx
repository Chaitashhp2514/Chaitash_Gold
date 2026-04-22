import { useState } from "react";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { projects } from "../mock/mock";
import { Badge } from "./ui/badge";

const Projects = () => {
  const [active, setActive] = useState(projects[0].id);
  const current = projects.find((p) => p.id === active) || projects[0];

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-kicker">03 — Selected work</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-zinc-50 max-w-3xl">
              Projects that shipped, scaled, or surprised.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md">
            A small sample of things I’ve built end-to-end — from architecture
            to interface.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          {/* Project list */}
          <div className="lg:col-span-5 reveal">
            <ul className="space-y-3">
              {projects.map((p, i) => {
                const isActive = p.id === active;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => setActive(p.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "bg-[#0c1320] border-cyan-400/40 shadow-[0_10px_40px_-20px_rgba(34,211,238,0.35)]"
                          : "bg-white/[0.015] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`mono text-xs ${
                              isActive ? "text-cyan-400" : "text-zinc-500"
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <h3
                            className={`text-lg font-semibold ${
                              isActive ? "text-zinc-50" : "text-zinc-200"
                            }`}
                          >
                            {p.title}
                          </h3>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive
                              ? "text-cyan-400 translate-x-1"
                              : "text-zinc-600"
                          }`}
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-3 mono text-[11px] tracking-widest uppercase text-zinc-500">
                        <span>{p.year}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span>{p.type}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Project detail */}
          <div className="lg:col-span-7 reveal">
            <div className="relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden">
              {/* Decorative header */}
              <div className="relative h-48 md:h-56 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.25),transparent_60%)] border-b border-white/5">
                <div className="absolute inset-0 dot-pattern opacity-40" />
                <div className="relative h-full flex items-end p-6">
                  <div>
                    <div className="mono text-[11px] tracking-widest uppercase text-cyan-400">
                      {current.type} · {current.year}
                    </div>
                    <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-zinc-50">
                      {current.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-zinc-300 leading-relaxed">
                  {current.summary}
                </p>

                <ul className="mt-6 space-y-2">
                  {current.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-zinc-300"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {current.stack.map((s) => (
                    <Badge
                      key={s}
                      variant="outline"
                      className="border-white/10 bg-white/[0.03] text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    onClick={() => alert("Project link coming soon.")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-zinc-950 text-sm font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live demo
                  </button>
                  <button
                    onClick={() => alert("Source link coming soon.")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-zinc-200 text-sm transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </button>
                  <span className="ml-auto mono text-[11px] uppercase tracking-widest text-zinc-500">
                    Role: {current.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
