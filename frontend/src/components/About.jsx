import { Code2, Cpu, Database, Smartphone, Sparkles } from "lucide-react";
import { profile, softSkills } from "../mock/mock";

const focuses = [
  {
    icon: Code2,
    title: "Web Engineering",
    body: "React front-ends paired with Node/Express APIs — clean, tested, and built to scale."
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    body: "Cross-platform Flutter & native Android (Java/Kotlin) with Firebase backends."
  },
  {
    icon: Database,
    title: "Data & APIs",
    body: "MongoDB, MySQL and SQL modelling — from schema design to query optimisation."
  },
  {
    icon: Cpu,
    title: "Hardware + Software",
    body: "Circuit design and embedded thinking when problems live below the UI."
  }
];

const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal">
          <span className="section-kicker">01 — About</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-zinc-50 max-w-3xl">
            Engineer at heart, builder by craft.
          </h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 reveal">
            <p className="text-zinc-300 text-lg leading-relaxed">
              {profile.summary}
            </p>
            <p className="mt-5 text-zinc-400 leading-relaxed">
              Based in {profile.location}, I’m currently completing my Bachelor
              of Computer Engineering while shipping side projects that touch
              everything from augmented reality to e-commerce checkout.
              Whether it’s the front of a web app or the logic of a circuit, I
              like problems that demand both taste and rigor.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 text-sm hover:border-amber-400/40 hover:text-amber-300 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2 mono text-xs uppercase tracking-widest text-amber-400">
                <Sparkles className="w-4 h-4" /> Current focus
              </div>
              <p className="mt-3 text-zinc-300">
                Final-year project work, deepening full-stack skills with
                React + Node, and exploring AR & realtime experiences on
                mobile.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
            {focuses.map((f) => (
              <div
                key={f.title}
                className="reveal group relative p-5 rounded-2xl border border-white/5 bg-[#0f0f11] hover:border-amber-400/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-950 transition-colors">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-zinc-50 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
