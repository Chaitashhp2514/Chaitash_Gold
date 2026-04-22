import { useEffect, useRef, useState } from "react";
import { skillGroups } from "../mock/mock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const Bar = ({ name, level }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(level);
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="group">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-zinc-200">{name}</span>
        <span className="mono text-[11px] text-zinc-500">{level}%</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-300 to-emerald-400 transition-[width] duration-[1200ms] ease-out"
          style={{ width: `${shown}%` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-kicker">02 — Skills</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-zinc-50 max-w-3xl">
              A stack that spans pixels to silicon.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md">
            Tools, languages and frameworks I reach for. Levels are honest
            self-assessments — always improving.
          </p>
        </div>

        <div className="mt-12 reveal">
          <Tabs defaultValue={skillGroups[0].category} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 justify-start">
              {skillGroups.map((g) => (
                <TabsTrigger
                  key={g.category}
                  value={g.category}
                  className="data-[state=active]:bg-cyan-400 data-[state=active]:text-zinc-950 bg-white/[0.03] text-zinc-300 border border-white/10 rounded-full px-4 py-2 text-sm hover:text-zinc-50"
                >
                  {g.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {skillGroups.map((g) => (
              <TabsContent
                key={g.category}
                value={g.category}
                className="mt-8"
              >
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                  {g.items.map((s) => (
                    <Bar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Skills;
