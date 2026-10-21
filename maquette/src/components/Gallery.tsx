"use client";

import { useRef, useState } from "react";
import type { GalleryCategory, GalleryImage } from "@/content/types";
import { Visual } from "./Visual";

const FILTERS: { id: GalleryCategory | "tout"; label: string }[] = [
  { id: "tout", label: "Tout" },
  { id: "plats", label: "Plats" },
  { id: "ambiance", label: "Ambiance" },
  { id: "evenements", label: "Événements" },
];

const TILT = ["-rotate-1", "rotate-1", "rotate-[0.5deg]", "-rotate-[1.5deg]"];

/**
 * Filterable collage with an accessible viewer (dialog: arrow keys, Escape, focus returns to the tile).
 * Each tile is an illustration today and a real photo as soon as the item gets a `file`.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("tout");
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = filter === "tout" ? images : images.filter((i) => i.category === filter);
  const available = FILTERS.filter((f) => f.id === "tout" || images.some((i) => i.category === f.id));

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }
  const step = (delta: number) => setIndex((i) => (i + delta + visible.length) % visible.length);
  const current = visible[index];

  return (
    <>
      <div role="group" aria-label="Filtrer la galerie" className="flex flex-wrap gap-3">
        {available.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className="min-h-11 rounded-full border-[2.5px] border-ink bg-surface px-5 text-sm font-extrabold shadow-[3px_3px_0_var(--color-ink)] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none aria-pressed:bg-ink aria-pressed:text-sun"
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} visuels affichés
      </p>

      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((img, i) => (
          <li key={img.scene + i} className={`${TILT[i % TILT.length]}`}>
            <button
              type="button"
              onClick={() => open(i)}
              className="hard zoom-art group block w-full overflow-hidden rounded-2xl border-[3px] border-ink bg-surface text-left transition-transform hover:-translate-y-1"
            >
              <Visual scene={img.scene} file={img.file} alt={img.alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              <span className="sr-only">Agrandir : </span>
              <span className="block border-t-[3px] border-ink px-4 py-3 font-display text-lg">{img.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Visionneuse d'images"
        className="m-auto max-h-[92vh] w-[min(96vw,60rem)] overflow-auto rounded-3xl border-[3px] border-ink bg-bg p-0 text-ink shadow-[8px_8px_0_var(--color-ink)] backdrop:bg-ink/85"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current ? (
          <figure>
            <Visual scene={current.scene} file={current.file} alt={current.alt} sizes="96vw" className="border-b-[3px] border-ink" />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 p-4">
              <span className="font-display text-xl">
                {current.caption} <span className="font-body text-base text-muted">({index + 1}/{visible.length})</span>
              </span>
              <span className="flex gap-2">
                <button type="button" className="btn btn-ghost min-h-11 px-4" onClick={() => step(-1)} aria-label="Image précédente">
                  ←
                </button>
                <button type="button" className="btn btn-ghost min-h-11 px-4" onClick={() => step(1)} aria-label="Image suivante">
                  →
                </button>
                <button type="button" className="btn btn-primary min-h-11 px-4" onClick={() => dialogRef.current?.close()}>
                  Fermer
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
