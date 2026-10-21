import type { Fact, FactStatus } from "@/content/types";

const LABELS: Record<FactStatus, string | null> = {
  demo: "Démo",
  public: "Source publique · à confirmer",
  confirme: null,
};

const DOT: Record<FactStatus, string> = {
  demo: "bg-coral",
  public: "bg-lagoon",
  confirme: "bg-leaf",
};

/**
 * Visible marker for any detail the establishment has not confirmed yet.
 * A filled paper pill with an ink outline: readable on cream, sand, lagoon or slate alike.
 */
export function FactBadge({ status, source }: { status: FactStatus; source?: string }) {
  const label = LABELS[status];
  if (!label) return null;
  return (
    <span
      title={source}
      className="ml-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] border-ink bg-surface px-2 py-0.5 align-middle text-[0.68rem] font-bold uppercase tracking-wide text-ink"
    >
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${DOT[status]}`} />
      {label}
    </span>
  );
}

export function FactText({ fact, className }: { fact: Fact; className?: string }) {
  return (
    <span className={className}>
      {fact.value}
      <FactBadge status={fact.status} source={fact.source} />
    </span>
  );
}
