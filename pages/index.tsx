import React, { useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

import useInterval from "use-interval";

export default function Home() {
  const [is_playing, set_is_playing] = useState(false);

  if (typeof window !== "undefined") {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    const user_bpm = document.getElementById("bpm") as HTMLInputElement;

    const bpm = user_bpm.value ? parseInt(user_bpm.value) : 120;

    useInterval(
      () => {
        audio.currentTime = 0;
        audio.play();
      },
      // not accurat, but good enough
      is_playing ? (60 / bpm) * 1000 : null
    );
  }

  return (
    <main className="dark:bg-[#0E1319] min-h-screen grid place-items-center">
      <audio controls id="audio" className="hidden">
        <source src="beat.wav" type="audio/mpeg" />
      </audio>

      <form
        className="bg-white flex border rounded-2xl overflow-hidden outline outline-2 outline-slate-900 outline-offset-[-2px]"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          className="p-4 m-0 bg-transparent text-slate-800"
          placeholder="Enter BPM"
          id="bpm"
          type="text"
        />

        <button type="submit" className="hidden" hidden></button>

        <button
          className="p-4 m-0 bg-slate-900 text-white cursor-pointer"
          onClick={() => set_is_playing(!is_playing)}
        >
          {is_playing ? <AiFillPauseCircle size={35} /> : <AiFillPlayCircle size={35} />}
        </button>
      </form>
    </main>
  );
}
