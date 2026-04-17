"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const companies = [
  { name: "TechFlow", letters: "TF", color: "from-emerald-500/20 to-green-500/20" },
  { name: "Bloom", letters: "Bl", color: "from-pink-500/20 to-rose-500/20" },
  { name: "DataSync", letters: "DS", color: "from-sky-500/20 to-blue-500/20" },
  { name: "Quantum", letters: "Qt", color: "from-violet-500/20 to-purple-500/20" },
  { name: "NovaTech", letters: "NT", color: "from-amber-500/20 to-orange-500/20" },
  { name: "Streamline", letters: "SL", color: "from-teal-500/20 to-cyan-500/20" },
  { name: "PulseAI", letters: "PA", color: "from-red-500/20 to-pink-500/20" },
  { name: "Vertex", letters: "Vx", color: "from-indigo-500/20 to-blue-500/20" },
  { name: "CloudNine", letters: "C9", color: "from-cyan-500/20 to-sky-500/20" },
  { name: "Synapse", letters: "Sy", color: "from-lime-500/20 to-green-500/20" },
];

function LogoPlaceholder({ company }: { company: typeof companies[0] }) {
  return (
    <div className="flex items-center gap-2.5 px-2 opacity-50 transition-opacity duration-300 hover:opacity-90">
      {/* ASSET NEEDED: /images/logos/{company.name.toLowerCase()}.svg — Replace with real logos */}
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${company.color}`}>
        <span className="text-xs font-bold text-foreground/70">{company.letters}</span>
      </div>
      <span className="text-sm font-semibold tracking-tight text-foreground/40">
        {company.name}
      </span>
    </div>
  );
}

export function LogoMarquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-10 overflow-hidden border-y border-border/30">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
          Trusted by 50,000+ creators worldwide
        </p>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling track */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 items-center gap-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...companies, ...companies].map((company, i) => (
                <LogoPlaceholder key={`${company.name}-${i}`} company={company} />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
