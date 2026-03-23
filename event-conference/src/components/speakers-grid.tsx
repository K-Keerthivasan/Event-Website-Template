"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import type { Speaker } from "@/lib/mock-data";

function SpeakerPortrait({ speaker }: { speaker: Speaker }) {
  const initials = speaker.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-gradient-to-br ${speaker.palette}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_34%)]" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <span className="font-heading text-7xl font-black uppercase text-white/90">{initials}</span>
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white/70">
          Live
        </span>
      </div>
    </div>
  );
}

export function SpeakersGrid({ speakers }: { speakers: Speaker[] }) {
  const [selected, setSelected] = useState<Speaker | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="panel-edge group rounded-[2rem] border border-border bg-foreground/[0.03] p-4"
          >
            <button
              type="button"
              onClick={() => setSelected(speaker)}
              className="w-full text-left"
            >
              <SpeakerPortrait speaker={speaker} />
              <div className="mt-4">
                <p className="font-heading text-2xl font-bold uppercase text-foreground transition group-hover:text-primary">
                  {speaker.name}
                </p>
                <p className="mt-1 text-sm text-foreground/65">
                  {speaker.title}, {speaker.company}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-foreground/40">Tap for bio + socials</p>
              </div>
            </button>
            <Link
              href={`/speakers/${speaker.id}`}
              className="mt-4 block rounded-full border border-border px-4 py-2 text-center text-xs uppercase tracking-[0.24em] text-foreground/55 transition hover:border-primary hover:text-primary"
            >
              Full Profile →
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Speaker detail modal */}
      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-4 backdrop-blur-lg md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="panel-edge relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-card"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-border bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-foreground/65 transition hover:text-foreground"
              >
                Close
              </button>
              <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                <SpeakerPortrait speaker={selected} />
                <div className="space-y-5 p-6 md:p-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-primary">Speaker Profile</p>
                    <h3 className="mt-3 font-heading text-4xl font-black uppercase text-foreground">{selected.name}</h3>
                    <p className="mt-2 text-foreground/60">
                      {selected.title}, {selected.company}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border bg-foreground/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-foreground/40">Featured Talk</p>
                    <p className="mt-2 font-heading text-2xl font-bold uppercase text-foreground">{selected.talkTitle}</p>
                  </div>
                  <p className="text-base leading-7 text-foreground/70">{selected.bio}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={selected.social.x}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.28em] text-foreground/65 transition hover:border-primary hover:text-primary"
                    >
                      X / Live Feed
                    </a>
                    <a
                      href={selected.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.28em] text-foreground/65 transition hover:border-primary hover:text-primary"
                    >
                      LinkedIn
                    </a>
                    <Link
                      href={`/speakers/${selected.id}`}
                      className="rounded-full bg-primary px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary-foreground transition hover:opacity-85"
                    >
                      Full Profile
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
