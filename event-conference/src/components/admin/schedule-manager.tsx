"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Speaker, Talk, Track } from "@/lib/mock-data";
import { trackStyles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type TalkFormValues = {
  title: string;
  speakerId: string;
  time: string;
  track: Track;
  room: string;
  day: Talk["day"];
};

export function ScheduleManager({
  initialTalks,
  speakers,
}: {
  initialTalks: Talk[];
  speakers: Speaker[];
}) {
  const [talks, setTalks] = useState(initialTalks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<TalkFormValues>({
    defaultValues: {
      title: "",
      speakerId: speakers[0]?.id ?? "",
      time: "09:00",
      track: "Main Stage",
      room: "Hangar A",
      day: "Day 1",
    },
  });

  const resetForm = () => {
    setEditingId(null);
    reset({
      title: "",
      speakerId: speakers[0]?.id ?? "",
      time: "09:00",
      track: "Main Stage",
      room: "Hangar A",
      day: "Day 1",
    });
  };

  const onSubmit = (values: TalkFormValues) => {
    if (editingId) {
      setTalks((current) =>
        current.map((talk) =>
          talk.id === editingId ? { ...talk, ...values } : talk
        )
      );
    } else {
      setTalks((current) => [
        {
          id: `talk-${current.length + 1}`,
          ...values,
        },
        ...current,
      ]);
    }
    resetForm();
  };

  const startEdit = (talk: Talk) => {
    setEditingId(talk.id);
    setValue("title", talk.title);
    setValue("speakerId", talk.speakerId);
    setValue("time", talk.time);
    setValue("track", talk.track);
    setValue("room", talk.room);
    setValue("day", talk.day);
  };

  const speakerMap = new Map(speakers.map((speaker) => [speaker.id, speaker]));

  const inputCls = "w-full rounded-[1.2rem] border border-border bg-foreground/[0.04] px-4 py-3 text-foreground outline-none focus:border-primary";
  const labelCls = "mb-2 block text-xs uppercase tracking-[0.24em] text-foreground/45";

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Talk Inventory</p>
          <h2 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">Schedule manager</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.28em] text-foreground/45">
              <tr>
                <th className="pb-4 pr-6">Time</th>
                <th className="pb-4 pr-6">Talk</th>
                <th className="pb-4 pr-6">Track</th>
                <th className="pb-4 pr-6">Room</th>
                <th className="pb-4 pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {talks.map((talk) => (
                <tr key={talk.id} className="border-t border-border text-foreground/70">
                  <td className="py-4 pr-6">{talk.day} · {talk.time}</td>
                  <td className="py-4 pr-6">
                    <p className="font-medium text-foreground">{talk.title}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">{speakerMap.get(talk.speakerId)?.name ?? "TBD"}</p>
                  </td>
                  <td className="py-4 pr-6">
                    <span className={cn("rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em]", trackStyles[talk.track])}>
                      {talk.track}
                    </span>
                  </td>
                  <td className="py-4 pr-6">{talk.room}</td>
                  <td className="py-4 pr-6">
                    <button
                      type="button"
                      onClick={() => startEdit(talk)}
                      className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.24em] text-foreground/65 transition hover:border-primary hover:text-primary"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.03] p-6">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">{editingId ? "Edit Talk" : "Add Talk"}</p>
        <h3 className="mt-3 font-heading text-3xl font-black uppercase text-foreground">
          {editingId ? "Update slot" : "Create a new slot"}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <label className="block">
            <span className={labelCls}>Title</span>
            <input
              {...register("title", { required: true })}
              className={inputCls}
              placeholder="Talk title"
            />
          </label>
          <label className="block">
            <span className={labelCls}>Speaker</span>
            <select {...register("speakerId")} className={inputCls}>
              {speakers.map((speaker) => (
                <option key={speaker.id} value={speaker.id}>
                  {speaker.name}
                </option>
              ))}
            </select>
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Day</span>
              <select {...register("day")} className={inputCls}>
                <option value="Day 1">Day 1</option>
                <option value="Day 2">Day 2</option>
                <option value="Day 3">Day 3</option>
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Time</span>
              <input {...register("time")} className={inputCls} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Track</span>
              <select {...register("track")} className={inputCls}>
                <option value="Main Stage">Main Stage</option>
                <option value="Growth">Growth</option>
                <option value="Design">Design</option>
                <option value="After Dark">After Dark</option>
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Room</span>
              <input {...register("room")} className={inputCls} />
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-primary-foreground transition hover:opacity-85"
            >
              {editingId ? "Save Talk" : "Add Talk"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-foreground/65 transition hover:text-foreground"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </aside>
    </div>
  );
}
