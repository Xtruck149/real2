"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Delay in ms, to stagger siblings. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Lets content slide in when it reaches the viewport.
 *
 * Content is visible by default. It is hidden only after hydration, only when it sits below the fold, and
 * never under reduced motion; a timer, the print event and the "no IntersectionObserver" case all reveal it.
 * Nothing the visitor needs can therefore stay invisible.
 */
export function Appear({ children, delay = 0, as: Tag = "div", className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    let observer: IntersectionObserver | undefined;
    const show = () => {
      el.dataset.appear = "shown";
      observer?.disconnect();
    };

    el.dataset.appear = "hidden";
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) show();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);

    const fallback = window.setTimeout(show, 6000);
    window.addEventListener("beforeprint", show);
    return () => {
      observer?.disconnect();
      window.clearTimeout(fallback);
      window.removeEventListener("beforeprint", show);
    };
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ "--appear-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
