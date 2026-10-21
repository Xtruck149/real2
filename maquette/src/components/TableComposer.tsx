"use client";

import { useState } from "react";
import { menu } from "@/content/menu";
import { Icon } from "./Illustrations";

const CHECK = "M5 12.5 10 17.5 19 7";
const MAX = 400;

/**
 * "Composer ma table": tick the dishes you fancy and they are added to the reservation request.
 *
 * The chips are plain checkboxes (keyboard and screen-reader friendly). Only one hidden field, `selection`, is attached
 * to the reservation form through the `form` attribute; the checkboxes themselves are never submitted. The dishes are
 * the demo menu's examples, so the component says plainly that availability and prices are for the restaurant to confirm.
 */
export function TableComposer({ restaurant }: { restaurant: string }) {
  const [chosen, setChosen] = useState<string[]>([]);
  const toggle = (name: string) => setChosen((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]));
  // Keep the value under the server limit even if every dish is ticked.
  const value = chosen.join(", ").slice(0, MAX);

  return (
    <div className="card bg-surface p-5 sm:p-8">
      <p className="eyebrow">Facultatif</p>
      <h2 id="composer-title" className="mt-4 text-3xl sm:text-4xl">
        Composer ma table
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        Cochez ce qui vous tente : votre sélection est jointe à votre demande. Ce sont des plats d&apos;exemple : {restaurant} confirmera
        ce qui est disponible, et aucun prix n&apos;est annoncé.
      </p>

      <div className="mt-6 space-y-6">
        {menu.map((cat) => (
          <fieldset key={cat.id}>
            <legend className="font-display text-xl">{cat.name}</legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {cat.items.map((item) => {
                const on = chosen.includes(item.name);
                return (
                  <label key={item.name} className="relative cursor-pointer">
                    <input type="checkbox" checked={on} onChange={() => toggle(item.name)} className="peer sr-only" />
                    <span className="inline-flex min-h-11 items-center gap-2 rounded-full border-[2.5px] border-ink bg-surface px-4 text-sm font-bold shadow-[3px_3px_0_var(--color-ink)] transition-transform peer-checked:translate-x-0.5 peer-checked:translate-y-0.5 peer-checked:bg-sun peer-checked:shadow-none peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-coral">
                      {on ? <Icon d={CHECK} className="h-4 w-4" /> : <span aria-hidden="true" className="h-4 w-4 rounded-full border-2 border-ink" />}
                      {item.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Joined to the reservation form by id, even though it sits outside the <form> element. */}
      <input type="hidden" name="selection" form="form-reservation" value={value} />

      <div className="ticket mb-5 mt-8 p-5 font-mono text-sm" role="status" aria-live="polite" data-testid="composer-summary">
        <p className="font-bold uppercase tracking-wider">Ma table</p>
        {chosen.length === 0 ? (
          <p className="mt-2 text-muted">Aucun plat coché pour l&apos;instant.</p>
        ) : (
          <ul className="mt-2 space-y-1">
            {chosen.map((name) => (
              <li key={name} className="flex items-baseline gap-2">
                <span aria-hidden="true">•</span>
                {name}
              </li>
            ))}
          </ul>
        )}
        {chosen.length > 0 ? (
          <button type="button" onClick={() => setChosen([])} className="mt-4 text-sm font-bold underline underline-offset-4">
            Tout effacer
          </button>
        ) : null}
      </div>
    </div>
  );
}
