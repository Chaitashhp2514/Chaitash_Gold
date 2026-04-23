import { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import { api, fireAndForget } from "../lib/api";

const Portfolio = () => {
  // Reveal-on-scroll for elements with `.reveal`
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Bump visit counter once per browser session (fire-and-forget).
  useEffect(() => {
    try {
      if (sessionStorage.getItem("visit-bumped")) return;
      sessionStorage.setItem("visit-bumped", "1");
      fireAndForget(() => api.bumpVisit());
    } catch {
      /* storage disabled — still try once */
      fireAndForget(() => api.bumpVisit());
    }
  }, []);

  return (
    <div className="relative bg-[#05080d] text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
