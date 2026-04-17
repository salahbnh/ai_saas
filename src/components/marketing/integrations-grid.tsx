"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const models = [
  { name: "OpenAI", model: "GPT-4o", desc: "Text & reasoning", color: "from-emerald-500 to-green-600", letter: "O" },
  { name: "Anthropic", model: "Claude 3.5", desc: "Analysis & writing", color: "from-amber-500 to-orange-600", letter: "A" },
  { name: "Meta", model: "Llama 3.1", desc: "Open source LLM", color: "from-blue-500 to-indigo-600", letter: "M" },
  { name: "OpenAI", model: "DALL-E 3", desc: "Image generation", color: "from-violet-500 to-purple-600", letter: "D" },
  { name: "Stability AI", model: "SDXL", desc: "Image synthesis", color: "from-pink-500 to-rose-600", letter: "S" },
  { name: "Google", model: "Gemini Pro", desc: "Multimodal AI", color: "from-sky-500 to-cyan-600", letter: "G" },
  { name: "Groq", model: "Mixtral", desc: "Ultra-fast inference", color: "from-orange-500 to-red-600", letter: "G" },
  { name: "ElevenLabs", model: "Voice AI", desc: "Speech synthesis", color: "from-teal-500 to-emerald-600", letter: "E" },
];

export function IntegrationsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-sm text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Integrations
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Powered by the{" "}
            <span className="text-gradient bg-gradient-to-r from-emerald-400 to-green-500">
              Best AI Models
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Access all leading AI models from a single platform. We add new models as they launch.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {models.map((model, i) => (
            <motion.div
              key={`${model.name}-${model.model}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.06 * i }}
              className="group relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                {/* ASSET NEEDED: /images/logos/{model.name.toLowerCase().replace(' ', '-')}.svg */}
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${model.color} shadow-lg transition-transform duration-200 group-hover:scale-110`}>
                  <span className="text-sm font-bold text-white">{model.letter}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold truncate">{model.model}</h3>
                  <p className="text-[11px] text-muted-foreground">{model.name}</p>
                </div>
              </div>
              <p className="mt-2.5 text-xs text-muted-foreground/80">{model.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
