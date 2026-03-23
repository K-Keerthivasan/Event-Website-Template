"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Speaker, Talk, Track } from "@/lib/mock-data";
import { trackStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const days: Array<Talk["day"]> = ["Day 1", "Day 2", "Day 3"];
const tracks: Array<Track | "All"> = ["All", "Main Stage", "Growth", "Design", "After Dark"];

export function ScheduleExplorer({
  talks,
  speakers,
}: {
  talks: Talk[];
  speakers: Speaker[];
}) {
  const [activeDay, setActiveDay] = useState<Talk["day"]>("Day 1");
  const [activeTrack, setActiveTrack] = useState<Track | "All">("All");

  const visibleTalks = talks.filter((talk) => {
    return talk.day === activeDay && (activeTrack === "All" || talk.track === activeTrack);
  });

  const speakerMap = new Map(speakers.map((speaker) => [speaker.id, speaker]));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={cn(
                "rounded-full border px-5 py-3 text-sm font-medium uppercase tracking-[0.28em] transition",
                activeDay === day
                  ? "border-primary bg-primary text-primary-foreground pink-glow"
                  : "border-border bg-foreground/[0.03] text-foreground/65 hover:border-foreground/30 hover:text-foreground"
              )}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {tracks.map((track) => (
            <button
              key={track}
              type="button"
              onClick={() => setActiveTrack(track)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] transition",
                activeTrack === track
                  ? "border-foreground/40 bg-foreground text-background"
                  : "border-border bg-foreground/[0.03] text-foreground/55 hover:text-foreground"
              )}
            >
              {track}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {visibleTalks.map((talk, index) => {
          const speaker = speakerMap.get(talk.speakerId);
          return (
            <motion.article
              key={talk.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="panel-edge grid gap-5 rounded-[2rem] border border-border bg-foreground/[0.03] p-5 lg:grid-cols-[120px_1fr_160px]"
            >
              <div className="font-heading text-3xl font-black tracking-[-0.08em] text-foreground">{talk.time}</div>
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className={cn("rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.28em]", trackStyles[talk.track])}>
                    {talk.track}
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-foreground/45">{talk.room}</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-foreground">{talk.title}</h3>
                {speaker ? (
                  <p className="mt-2 text-sm text-foreground/60">
                    {speaker.name} · {speaker.title}, {speaker.company}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center justify-start lg:justify-end">
                <div className="rounded-[1.5rem] border border-border bg-background/60 px-4 py-3 text-right">
                  <p className="font-heading text-lg uppercase text-foreground">{activeDay}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-foreground/40">Live track slot</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
