"use client";

import Image from "next/image";
import { useState } from "react";

export default function ResultsGallery({ results }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentResult = results[currentIndex];

  function showPrevious() {
    setCurrentIndex((current) =>
      current === 0 ? results.length - 1 : current - 1
    );
  }

  function showNext() {
    setCurrentIndex((current) =>
      current === results.length - 1 ? 0 : current + 1
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={showPrevious}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-bold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
          aria-label="Предишна снимка"
        >
          ‹
        </button>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200">
          <Image
            src={currentResult.image}
            alt="Реален резултат от дентална практика"
            width={900}
            height={1600}
            className="max-h-[560px] w-full object-contain bg-white"
            sizes="(max-width: 768px) 80vw, 520px"
            priority={currentIndex === 0}
          />
        </div>

        <button
          type="button"
          onClick={showNext}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-bold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
          aria-label="Следваща снимка"
        >
          ›
        </button>
      </div>
    </div>
  );
}