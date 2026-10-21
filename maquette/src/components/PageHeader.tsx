import type { ReactNode } from "react";

/** Page opener: a sticker label, a big painted title and a squiggle. `art` is an optional decorative block. */
export function PageHeader({ eyebrow, title, children, art }: { eyebrow: string; title: string; children?: ReactNode; art?: ReactNode }) {
  return (
    <div className="container-site pb-10 pt-12 md:pb-14 md:pt-16">
      <div className="flex items-end justify-between gap-8">
        <div className="min-w-0">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-5xl sm:text-6xl md:text-7xl">{title}</h1>
          <svg aria-hidden="true" viewBox="0 0 120 12" className="mt-4 h-3 w-28 text-coral" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M2 6 Q12 -2 22 6 T42 6 T62 6 T82 6 T102 6 T118 6" />
          </svg>
          {children ? <div className="mt-5 max-w-2xl text-lg text-muted">{children}</div> : null}
        </div>
        {art ? <div aria-hidden="true" className="hidden shrink-0 md:block">{art}</div> : null}
      </div>
    </div>
  );
}
