"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type CountdownUnit = {
  label: string;
  value: string;
};

function getCountdownUnits(target: string): CountdownUnit[] {
  const distance = new Date(target).getTime() - Date.now();
  const safe = Math.max(distance, 0);
  const days = Math.floor(safe / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safe / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safe / (1000 * 60)) % 60);
  const seconds = Math.floor((safe / 1000) % 60);

  return [
    { label: "Days", value: String(days).padStart(2, "0") },
    { label: "Hours", value: String(hours).padStart(2, "0") },
    { label: "Min", value: String(minutes).padStart(2, "0") },
    { label: "Sec", value: String(seconds).padStart(2, "0") },
  ];
}

export function Countdown({ target }: { target: string }) {
  const [units, setUnits] = useState(() => getCountdownUnits(target));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setUnits(getCountdownUnits(target));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [target]);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {units.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className="panel-edge rounded-[2rem] border border-border bg-foreground/[0.04] px-4 py-5 text-center md:px-6"
        >
          <div className="font-heading text-4xl leading-none font-black uppercase text-foreground md:text-6xl">
            {unit.value}
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-foreground/50">{unit.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
