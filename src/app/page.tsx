"use client";
import Image from "next/image";
import TRANSCRIPT from "@/app/data/transcript.json";
import AUDIO from "@/app/data/audiomessage.wav";
import { useRef, useState } from "react";

export interface Message {
  content: string;
  role: "agent" | "user";
  start: number;
  end: number;
}

export default function Home() {
  const [progress, setProgress] = useState<number>(0);
  const audio = useRef<HTMLAudioElement>(null);
  const match = useRef<Message>(null);

  const handleClick = (time: number) => {
    audio.current!.currentTime = time;
    audio.current?.play();
  };

  const handleTimeChange = (time: number) => {
    const newMatch = TRANSCRIPT.findLast((message) => message.start < progress);
    setProgress(time);

    if (newMatch !== match.current) {
      // @ts-ignore
      match.current = newMatch;
      document.getElementById(String(match.current?.start))?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section className="grid gap-8 p-6 max-w-6xl mx-auto h-[100vh]">
      <div className="grid gap-4">
        {TRANSCRIPT.map(({ start, content, role }) => (
          <button
            id={String(start)}
            type="button"
            onClick={() => handleClick(start)}
            className={`p-4 rounded max-w-[90%] ${
              role === "user"
                ? "bg-neutral-700 justify-self-end"
                : "bg-neutral-800"
            } ${progress < start ? "opacity-50" : "opacity-100"}`}
            key={start}
          >
            {content}
          </button>
        ))}
      </div>
      <audio
        ref={audio}
        className="w-full sticky bottom-4"
        src={AUDIO}
        onTimeUpdate={(e) => handleTimeChange(e.currentTarget.currentTime)}
        controls
      ></audio>
    </section>
  );
}
