import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { experience, education, achievements } from "../mock/mock";

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal">
          <span className="section-kicker">04 — Journey</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-zinc-50 max-w-3xl">
            Experience, education & moments of pride.
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10">
          {/* Experience column */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">Experience</h3>
            </div>

            <ol className="relative border-l border-white/10 pl-6 space-y-8">
              {experience.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                  <div className="mono text-[11px] uppercase tracking-widest text-zinc-500">
                    {e.period} · {e.location}
                  </div>
                  <h4 className="mt-1 text-lg text-zinc-50 font-semibold">
                    {e.role}
                  </h4>
                  <div className="text-amber-300 text-sm">{e.company}</div>
                  <ul className="mt-3 space-y-2">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-zinc-400 text-sm leading-relaxed flex items-start gap-2"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">
                Achievements
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-amber-400/30 transition-colors"
                >
                  <div className="text-zinc-100 font-medium">{a.title}</div>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    {a.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education column */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-100">Education</h3>
            </div>

            <div className="space-y-5">
              {education.map((ed) => (
                <div
                  key={ed.degree}
                  className="relative p-6 rounded-2xl border border-white/5 bg-[#0f0f11] hover:border-amber-400/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mono text-[11px] uppercase tracking-widest text-amber-400">
                        {ed.period}
                      </div>
                      <h4 className="mt-1 text-zinc-50 font-semibold text-lg">
                        {ed.degree}
                      </h4>
                      <div className="text-zinc-300 text-sm">{ed.org}</div>
                      <div className="text-zinc-500 text-xs mt-0.5">
                        {ed.sub}
                      </div>
                    </div>
                    <span
                      className={`mono text-[11px] uppercase tracking-widest px-2 py-1 rounded-full border ${
                        ed.status === "Pursuing"
                          ? "border-amber-400/40 text-amber-300 bg-amber-400/5"
                          : "border-white/10 text-zinc-400 bg-white/[0.02]"
                      }`}
                    >
                      {ed.status}
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-300">
                    <span className="mono text-amber-400">◆</span>
                    {ed.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
