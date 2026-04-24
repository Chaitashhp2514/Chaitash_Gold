import { useState } from "react";
import { Mail, MapPin, Phone, Send, Download, Github, Linkedin, Twitter } from "lucide-react";
import { profile } from "../mock/mock";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { api, fireAndForget } from "../lib/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in every field before sending.");
      return;
    }
    setSending(true);
    try {
      await api.submitMessage(form);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent. I’ll get back to you soon!");
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const onResumeClick = () => fireAndForget(() => api.bumpResumeDownload());

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal">
          <span className="section-kicker">05 — Contact</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-zinc-50 max-w-3xl">
            Let’s build something worth shipping.
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Have a role, a freelance brief, or just want to nerd out over a
            project idea? My inbox is open — I reply within a day or two.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          {/* Info card */}
          <div className="lg:col-span-5 reveal">
            <div className="relative p-6 md:p-8 rounded-3xl border border-white/5 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.12),transparent_60%)] overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
              <div className="relative">
                <div className="mono text-[11px] uppercase tracking-widest text-cyan-400">
                  Direct contacts
                </div>

                <ul className="mt-6 space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs mono uppercase tracking-widest text-zinc-500">
                        Email
                      </div>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-zinc-100 hover:text-cyan-300"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs mono uppercase tracking-widest text-zinc-500">
                        Phone
                      </div>
                      <a
                        href={`tel:${profile.phone.replace(/\s/g, "")}`}
                        className="text-zinc-100 hover:text-cyan-300"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-cyan-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs mono uppercase tracking-widest text-zinc-500">
                        Location
                      </div>
                      <div className="text-zinc-100">{profile.address}</div>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={profile.social.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>

                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    onClick={onResumeClick}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-400/40 bg-cyan-400/5 text-cyan-300 hover:bg-cyan-400 hover:text-zinc-950"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Résumé
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default Contact;
