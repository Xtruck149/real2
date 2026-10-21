import type { ReactNode } from "react";
import type { SceneName } from "@/content/types";

/**
 * Flat "sign-painter" illustrations drawn for Chez Thia: ink outlines, solid colours, no photographs.
 * They are explicit illustrations (never presented as photos of the restaurant) and weigh a few hundred bytes each.
 * Each piece is a <g> centred on (0,0) so scenes can place, scale and rotate it freely.
 */
export const C = {
  ink: "#10202E",
  sun: "#FFC21A",
  coral: "#D93A1F",
  lagoon: "#0A6670",
  leaf: "#1F7A55",
  cream: "#FFF3D6",
  paper: "#FFFBF0",
  slate: "#14333A",
  sand: "#FFE3A0",
} as const;

const line = { stroke: C.ink, strokeWidth: 4, strokeLinejoin: "round", strokeLinecap: "round" } as const;

type Place = { x?: number; y?: number; s?: number; r?: number; bob?: boolean; delay?: number };

function Piece({ x = 0, y = 0, s = 1, r = 0, bob, delay = 0, children }: Place & { children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {bob ? (
        <g className="bob" style={{ animationDelay: `${delay}s` }}>
          {children}
        </g>
      ) : (
        children
      )}
    </g>
  );
}

export function Sun(p: Place) {
  return (
    <Piece {...p}>
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="0" y1="-62" x2="0" y2="-80" transform={`rotate(${i * 30})`} {...line} strokeWidth={6} />
      ))}
      <circle r="48" fill={C.sun} {...line} />
      <path d="M-22 6 Q0 24 22 6" fill="none" {...line} strokeWidth={4} />
      <circle cx="-16" cy="-8" r="4" fill={C.ink} />
      <circle cx="16" cy="-8" r="4" fill={C.ink} />
    </Piece>
  );
}

export function Fish(p: Place) {
  return (
    <Piece {...p}>
      <path d="M62 0 L102 -36 Q92 0 102 36 Z" fill={C.coral} {...line} />
      <path d="M-70 0 Q-30 -50 30 -36 Q64 -22 64 0 Q64 22 30 36 Q-30 50 -70 0Z" fill={C.coral} {...line} />
      <path d="M-10 -40 L10 -66 L30 -36Z" fill={C.sun} {...line} />
      <path d="M-58 10 Q-6 34 46 16" fill="none" stroke={C.sun} strokeWidth={7} strokeLinecap="round" />
      <path d="M-22 -22 Q-8 0 -22 22" fill="none" {...line} />
      <circle cx="-44" cy="-6" r="7" fill={C.paper} {...line} strokeWidth={3} />
      <circle cx="-45" cy="-6" r="3" fill={C.ink} />
    </Piece>
  );
}

export function Shrimp(p: Place) {
  return (
    <Piece {...p}>
      <path d="M64 -36 C104 -26 104 34 44 48 C4 56 -38 34 -50 0" fill="none" stroke={C.ink} strokeWidth={38} strokeLinecap="round" />
      <path d="M64 -36 C104 -26 104 34 44 48 C4 56 -38 34 -50 0" fill="none" stroke={C.coral} strokeWidth={30} strokeLinecap="round" />
      <path d="M82 -26 L62 -2 M96 -4 L70 16 M82 24 L56 34 M52 42 L36 18" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <path d="M-50 0 L-82 -20 M-50 0 L-88 4 M-50 0 L-78 28" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
      <path d="M-50 0 L-82 -20 M-50 0 L-88 4 M-50 0 L-78 28" stroke={C.coral} strokeWidth={6} strokeLinecap="round" />
      <circle cx="70" cy="-40" r="6" fill={C.ink} />
      <path d="M72 -52 Q96 -90 134 -80 M66 -54 Q74 -96 106 -108" fill="none" {...line} strokeWidth={3} />
    </Piece>
  );
}

export function Crab(p: Place) {
  return (
    <Piece {...p}>
      <path d="M-44 14 L-86 34 M-40 26 L-78 56 M-30 36 L-58 70 M44 14 L86 34 M40 26 L78 56 M30 36 L58 70" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <path d="M-40 -14 L-62 -42 M40 -14 L62 -42" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <circle cx="-66" cy="-48" r="22" fill={C.coral} {...line} />
      <path d="M-66 -48 L-82 -64 L-60 -66Z" fill={C.paper} {...line} strokeWidth={3} />
      <circle cx="66" cy="-48" r="22" fill={C.coral} {...line} />
      <path d="M66 -48 L82 -64 L60 -66Z" fill={C.paper} {...line} strokeWidth={3} />
      <ellipse rx="56" ry="40" cy="8" fill={C.coral} {...line} />
      <path d="M-24 -4 Q0 -22 24 -4" fill="none" stroke={C.sun} strokeWidth={6} strokeLinecap="round" />
      <path d="M-26 -34 L-26 -18 M26 -34 L26 -18" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      <circle cx="-26" cy="-36" r="7" fill={C.paper} {...line} strokeWidth={3} />
      <circle cx="26" cy="-36" r="7" fill={C.paper} {...line} strokeWidth={3} />
      <circle cx="-26" cy="-36" r="3" fill={C.ink} />
      <circle cx="26" cy="-36" r="3" fill={C.ink} />
    </Piece>
  );
}

export function Flame(p: Place) {
  return (
    <Piece {...p}>
      <path d="M0 -76 C16 -40 48 -26 48 14 C48 46 26 68 0 68 C-26 68 -48 46 -48 14 C-48 -12 -28 -24 -20 -48 C-12 -32 -6 -54 0 -76Z" fill={C.coral} {...line} />
      <path d="M0 -10 C12 8 24 16 24 36 C24 50 14 60 0 60 C-14 60 -24 50 -24 36 C-24 22 -8 14 0 -10Z" fill={C.sun} {...line} strokeWidth={3} />
    </Piece>
  );
}

export function Bowl(p: Place) {
  return (
    <Piece {...p}>
      <path d="M-26 -22 Q-36 -40 -26 -54 T-26 -86 M0 -26 Q-10 -44 0 -58 T0 -90 M26 -22 Q16 -40 26 -54 T26 -86" fill="none" {...line} />
      <rect x="-28" y="62" width="56" height="12" rx="6" fill={C.ink} />
      <path d="M-74 -6 H74 C74 44 42 68 0 68 C-42 68 -74 44 -74 -6Z" fill={C.lagoon} {...line} />
      <path d="M-56 22 Q0 40 56 22" fill="none" stroke={C.sun} strokeWidth={6} strokeLinecap="round" />
      <ellipse cy="-6" rx="74" ry="15" fill={C.sun} {...line} />
      <ellipse cy="-6" rx="58" ry="9" fill={C.coral} stroke={C.ink} strokeWidth={3} />
      <circle cx="-18" cy="-7" r="4" fill={C.paper} />
      <circle cx="14" cy="-5" r="3.5" fill={C.paper} />
      <circle cx="30" cy="-8" r="3" fill={C.sun} />
    </Piece>
  );
}

export function Plantain(p: Place) {
  return (
    <Piece {...p}>
      <path d="M-62 22 Q-8 -54 64 -18 Q8 -12 -62 22Z" fill={C.sun} {...line} />
      <path d="M-50 40 Q4 -26 70 6 Q14 6 -50 40Z" fill={C.sun} {...line} />
      <circle cx="-14" cy="-6" r="3.5" fill={C.ink} />
      <circle cx="20" cy="-8" r="3.5" fill={C.ink} />
      <circle cx="-2" cy="18" r="3.5" fill={C.ink} />
      <circle cx="30" cy="14" r="3.5" fill={C.ink} />
    </Piece>
  );
}

export function Glass(p: Place) {
  return (
    <Piece {...p}>
      <path d="M14 -40 L40 -96" stroke={C.lagoon} strokeWidth={9} strokeLinecap="round" />
      <path d="M-36 -62 H36 L26 58 H-26Z" fill={C.paper} {...line} />
      <path d="M-33 -34 H33 L26 58 H-26Z" fill={C.coral} stroke={C.ink} strokeWidth={4} strokeLinejoin="round" />
      <rect x="-18" y="-24" width="16" height="16" rx="3" fill={C.paper} opacity="0.85" transform="rotate(-10 -10 -16)" />
      <rect x="4" y="-8" width="16" height="16" rx="3" fill={C.paper} opacity="0.85" transform="rotate(12 12 0)" />
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={i} cx={-30 + i * 15} cy="-62" rx="9" ry="12" fill={C.coral} stroke={C.ink} strokeWidth={3} transform={`rotate(${-60 + i * 30} ${-30 + i * 15} -62)`} />
      ))}
      <circle cx="0" cy="-62" r="6" fill={C.sun} {...line} strokeWidth={3} />
    </Piece>
  );
}

export function Attieke(p: Place) {
  return (
    <Piece {...p}>
      <path d="M-70 10 H70 C70 50 40 66 0 66 C-40 66 -70 50 -70 10Z" fill={C.paper} {...line} />
      <path d="M-52 10 C-52 -34 -22 -52 0 -52 C22 -52 52 -34 52 10Z" fill={C.sand} {...line} />
      {[-30, -12, 8, 28, -20, 16].map((x, i) => (
        <circle key={i} cx={x} cy={-6 - (i % 3) * 12} r="3" fill={C.ink} opacity="0.55" />
      ))}
    </Piece>
  );
}

/** Horizontal wave band, `w` wide, drawn from x=0. */
export function Waves({ w = 400, y = 0, color = C.cream, amp = 12, len = 48, stroke = true }: { w?: number; y?: number; color?: string; amp?: number; len?: number; stroke?: boolean }) {
  const waves = Math.ceil(w / len) + 1;
  let d = `M0 ${amp}`;
  for (let i = 0; i < waves; i++) d += ` q ${len / 4} ${-amp} ${len / 2} 0 t ${len / 2} 0`;
  d += ` V ${amp + 400} H0 Z`;
  return <path d={d} transform={`translate(0 ${y})`} fill={color} {...(stroke ? line : {})} />;
}

const Table = ({ x = 0, y = 0, w = 220, color = C.lagoon }: { x?: number; y?: number; w?: number; color?: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y="0" width={w} height="16" rx="6" fill={color} {...line} />
    <path d={`M${-w / 2 + 24} 16 V74 M${w / 2 - 24} 16 V74`} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
  </g>
);

const Plate = ({ x = 0, y = 0, r = 26 }: { x?: number; y?: number; r?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse rx={r} ry={r * 0.32} fill={C.paper} {...line} strokeWidth={3} />
    <ellipse rx={r * 0.55} ry={r * 0.16} fill={C.sun} />
  </g>
);


const SCENE_LABEL: Record<SceneName, string> = {
  "fruits-de-mer": "Illustration : crabe et crevette sur les vagues",
  grillades: "Illustration : poisson et flamme",
  soupe: "Illustration : bol de soupe fumante",
  accompagnements: "Illustration : alloco et attiéké",
  salle: "Illustration : une salle avec sa table",
  terrasse: "Illustration : une terrasse avec parasol",
  famille: "Illustration : une table de famille en fête",
  entreprise: "Illustration : un repas d'équipe",
};

const SCENE_BG: Record<SceneName, string> = {
  "fruits-de-mer": C.lagoon,
  grillades: C.sun,
  soupe: C.coral,
  accompagnements: C.leaf,
  salle: C.sand,
  terrasse: C.sun,
  famille: C.lagoon,
  entreprise: C.slate,
};

function SceneArt({ name }: { name: SceneName }) {
  switch (name) {
    case "fruits-de-mer":
      return (
        <>
          <Sun x={310} y={70} s={0.8} />
          <Waves w={400} y={170} color={C.paper} />
          <Waves w={400} y={205} color={C.sand} len={60} amp={10} />
          <Crab x={110} y={160} s={0.8} bob />
          <Shrimp x={290} y={196} s={0.7} r={-8} bob delay={0.6} />
        </>
      );
    case "grillades":
      return (
        <>
          <Sun x={64} y={62} s={0.55} />
          <path d="M40 150 H360 M40 172 H360 M40 194 H360" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
          <Fish x={200} y={118} s={0.95} bob />
          <Flame x={90} y={236} s={0.75} bob delay={0.3} />
          <Flame x={200} y={244} s={0.95} bob />
          <Flame x={312} y={236} s={0.75} bob delay={0.6} />
        </>
      );
    case "soupe":
      return (
        <>
          <circle cx="200" cy="130" r="104" fill={C.sun} {...line} />
          <Bowl x={200} y={150} s={1.15} bob />
        </>
      );
    case "accompagnements":
      return (
        <>
          <Sun x={336} y={58} s={0.5} />
          <Waves w={400} y={226} color={C.slate} len={56} amp={8} stroke={false} />
          <Plantain x={110} y={150} s={1.25} r={-10} bob />
          <Attieke x={290} y={152} s={1.05} bob delay={0.5} />
        </>
      );
    case "salle":
      return (
        <>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={i * 50} y="0" width="50" height="62" fill={i % 2 ? C.paper : C.coral} stroke={C.ink} strokeWidth={4} />
          ))}
          <path d="M0 62 Q25 84 50 62 T100 62 T150 62 T200 62 T250 62 T300 62 T350 62 T400 62" fill="none" stroke={C.ink} strokeWidth={4} />
          <path d="M200 62 V104" stroke={C.ink} strokeWidth={4} />
          <path d="M170 150 Q200 98 230 150Z" fill={C.sun} {...line} />
          <Table x={200} y={210} w={260} />
          <Plate x={150} y={204} />
          <Plate x={250} y={204} />
        </>
      );
    case "terrasse":
      return (
        <>
          <path d="M60 130 A140 120 0 0 1 340 130Z" fill={C.coral} {...line} />
          <path d="M200 10 V130 M130 36 L158 130 M270 36 L242 130" stroke={C.paper} strokeWidth={6} />
          <path d="M200 130 V250" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
          <Table x={200} y={216} w={200} color={C.lagoon} />
          <Glass x={160} y={170} s={0.45} bob />
          <Glass x={242} y={176} s={0.4} bob delay={0.4} />
        </>
      );
    case "famille":
      return (
        <>
          {[
            [90, 70, C.sun],
            [150, 44, C.coral],
            [250, 52, C.paper],
            [310, 78, C.sun],
          ].map(([x, y, c], i) => (
            <g key={i} className="bob" style={{ animationDelay: `${i * 0.35}s` }}>
              <path d={`M${x} ${Number(y) + 22} V${Number(y) + 82}`} stroke={C.ink} strokeWidth={3} />
              <ellipse cx={x as number} cy={y as number} rx="26" ry="30" fill={c as string} {...line} />
            </g>
          ))}
          <Table x={200} y={206} w={300} color={C.coral} />
          <Plate x={110} y={200} r={30} />
          <Plate x={200} y={196} r={30} />
          <Plate x={290} y={200} r={30} />
        </>
      );
    case "entreprise":
      return (
        <>
          <circle cx="200" cy="82" r="46" fill={C.paper} {...line} />
          <path d="M200 82 V52 M200 82 L222 94" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
          <Table x={200} y={216} w={300} color={C.sun} />
          <Glass x={120} y={168} s={0.5} bob />
          <Glass x={200} y={162} s={0.55} bob delay={0.3} />
          <Glass x={282} y={168} s={0.5} bob delay={0.6} />
        </>
      );
  }
}

/** A framed 4:3 illustration scene. Decorative by default; pass `label` to name it for assistive technology. */
export function Scene({ name, label, className }: { name: SceneName; label?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="300" fill={SCENE_BG[name]} />
      <SceneArt name={name} />
    </svg>
  );
}

export const sceneLabel = (name: SceneName) => SCENE_LABEL[name];

/** The hero poster: a sun, the sea, the catch and the fire, composed like a painted sign. */
export function HeroPoster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 540" className={className} role="img" aria-label="Illustration : soleil, vagues, poisson, crevette, bol de soupe et flamme">
      <rect width="480" height="540" fill={C.sand} />
      <circle cx="240" cy="190" r="150" fill={C.sun} {...line} />
      <Sun x={240} y={190} s={1.25} />
      <Waves w={480} y={300} color={C.lagoon} amp={14} len={64} />
      <Waves w={480} y={344} color={C.paper} amp={12} len={56} />
      <Waves w={480} y={388} color={C.coral} amp={12} len={72} />
      <Waves w={480} y={432} color={C.ink} amp={10} len={52} stroke={false} />
      <Fish x={118} y={292} s={0.85} r={-6} bob />
      <Shrimp x={372} y={278} s={0.7} r={8} bob delay={0.7} />
      <Bowl x={120} y={470} s={0.6} bob delay={0.4} />
      <Flame x={360} y={470} s={0.6} bob delay={0.2} />
      <Crab x={240} y={500} s={0.5} bob delay={0.9} />
    </svg>
  );
}

/** Round-cornered pictogram used in small places (dock, highlights). Paths are 24×24 line icons. */
export function Icon({ d, className = "h-6 w-6" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export const ICONS = {
  home: "M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10",
  menu: "M5 4h14v16H5ZM8 9h8M8 13h8M8 17h5",
  star: "M12 3l2.6 5.600 6.100.7-4.500 4.200 1.200 6L12 16.600 6.600 19.500l1.200-6L3.300 9.300l6.100-.7Z",
  table: "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  image: "M4 5h16v14H4ZM4 16l5-5 4 4 3-3 4 4M15 9.500h.01",
  phone: "M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21ZM12 7a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5Z",
  arrow: "M5 12h14m0 0-6-6m6 6-6 6",
} as const;
