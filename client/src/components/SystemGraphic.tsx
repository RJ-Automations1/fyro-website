/*
 * SYSTEM GRAPHICS — one small schematic per build.
 *
 * Hand-drawn SVG rather than stock or generated imagery: these show the actual
 * shape of each system, so the picture carries information instead of decoration.
 * Every diagram uses the same visual grammar — hairline boxes, one orange node for
 * the part that matters, mono labels — so six of them read as one family.
 */
import type { GraphicKind } from "@/data/work";

const INK = "#F2F2EF";   // diagram ink on the dark card
const LINE = "#33333A";  // hairline boxes and rules
const MUT = "#8C8C86";   // captions and arrows
const RED = "#F87904";   // brand orange — the one node that matters

const label = {
  fontFamily: "'DM Mono', ui-monospace, monospace",
  fontSize: 9,
  letterSpacing: "0.06em",
  fill: MUT,
} as const;

const strong = { ...label, fill: INK, fontSize: 9.5 } as const;
const tiny = { ...label, fontSize: 7.5, letterSpacing: "0.02em" } as const;
const redStrong = { ...strong, fill: RED } as const;

function Box({
  x,
  y,
  w = 74,
  h = 34,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  accent?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={accent ? "rgba(248,121,4,0.10)" : "#1B1B20"}
      stroke={accent ? RED : LINE}
      strokeWidth={accent ? 1.4 : 1}
    />
  );
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke={MUT} strokeWidth={1} fill="none">
      <line x1={x1} y1={y} x2={x2 - 5} y2={y} />
      <path d={`M${x2 - 5} ${y - 3} L${x2} ${y} L${x2 - 5} ${y + 3}`} fill={MUT} stroke="none" />
    </g>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 150"
      width="100%"
      role="img"
      style={{ display: "block", background: "#111116" }}
    >
      {children}
    </svg>
  );
}

export default function SystemGraphic({ kind }: { kind: GraphicKind }) {
  if (kind === "filing") {
    return (
      <Frame>
        <title>Report data drives three portal pages, then stops before payment</title>
        <Box x={16} y={58} />
        <text x={53} y={79} textAnchor="middle" {...strong}>REPORT</text>
        <Arrow x1={90} x2={112} y={75} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={112 + i * 26} y={50} width={22} height={50} fill="#1B1B20" stroke={LINE} />
        ))}
        <text x={145} y={116} textAnchor="middle" {...tiny}>3 PORTAL PAGES</text>
        <Arrow x1={192} x2={214} y={75} />
        <Box x={214} y={58} w={78} accent />
        <text x={253} y={73} textAnchor="middle" {...redStrong}>STOP</text>
        <text x={253} y={86} textAnchor="middle" {...tiny}>BEFORE PAYMENT</text>
        <Arrow x1={292} x2={314} y={75} />
        <Box x={314} y={58} w={70} />
        <text x={349} y={79} textAnchor="middle" {...strong}>HUMAN</text>
      </Frame>
    );
  }

  if (kind === "documents") {
    return (
      <Frame>
        <title>Data is written after printed labels inside the client&rsquo;s own template</title>
        <Box x={20} y={30} w={80} h={90} />
        <text x={60} y={22} textAnchor="middle" {...tiny}>CLIENT TEMPLATE</text>
        {[46, 62, 78, 94].map((y, i) => {
          const anchor = i === 1 || i === 2;
          return (
            <g key={y}>
              <line
                x1={30}
                y1={y}
                x2={anchor ? 58 : 90}
                y2={y}
                stroke={anchor ? RED : LINE}
                strokeWidth={anchor ? 1.4 : 1}
              />
              {anchor && <line x1={62} y1={y} x2={90} y2={y} stroke={LINE} strokeDasharray="2 2" />}
            </g>
          );
        })}
        <text x={60} y={134} textAnchor="middle" {...{ ...tiny, fill: RED }}>PRINTED LABELS</text>
        <Arrow x1={112} x2={140} y={75} />
        <Box x={140} y={58} w={84} />
        <text x={182} y={73} textAnchor="middle" {...strong}>ANCHOR MATCH</text>
        <text x={182} y={86} textAnchor="middle" {...tiny}>after the label</text>
        <Arrow x1={228} x2={256} y={75} />
        <Box x={256} y={30} w={80} h={90} accent />
        <text x={296} y={22} textAnchor="middle" {...{ ...tiny, fill: RED }}>FILED PACKET</text>
        {[46, 62, 78, 94].map((y) => (
          <line key={y} x1={266} y1={y} x2={326} y2={y} stroke={LINE} />
        ))}
        <text x={296} y={134} textAnchor="middle" {...tiny}>letterhead intact</text>
      </Frame>
    );
  }

  if (kind === "fieldops") {
    return (
      <Frame>
        <title>Field crew reports feed the same record the office bills from</title>
        <rect x={22} y={36} width={44} height={78} rx={4} fill="#1B1B20" stroke={LINE} />
        <line x1={30} y1={52} x2={58} y2={52} stroke={LINE} />
        <line x1={30} y1={62} x2={52} y2={62} stroke={LINE} />
        <line x1={30} y1={72} x2={58} y2={72} stroke={LINE} />
        <text x={44} y={128} textAnchor="middle" {...tiny}>CREW</text>
        <Arrow x1={74} x2={100} y={75} />
        <Box x={100} y={50} w={96} h={50} />
        <text x={148} y={71} textAnchor="middle" {...strong}>JOB RECORD</text>
        <text x={148} y={85} textAnchor="middle" {...tiny}>reports · phases</text>
        <Arrow x1={200} x2={226} y={75} />
        <Box x={226} y={50} w={96} h={50} accent />
        <text x={274} y={71} textAnchor="middle" {...redStrong}>INVOICE</text>
        <text x={274} y={85} textAnchor="middle" {...tiny}>integer cents</text>
        <Arrow x1={326} x2={350} y={75} />
        <text x={370} y={72} textAnchor="middle" {...tiny}>SIGNED</text>
        <text x={370} y={84} textAnchor="middle" {...tiny}>LINK</text>
      </Frame>
    );
  }

  if (kind === "crm") {
    return (
      <Frame>
        <title>Registering a system generates its NFPA inspection schedule automatically</title>
        <Box x={16} y={20} w={80} h={26} />
        <text x={56} y={37} textAnchor="middle" {...strong}>SITE</text>
        <line x1={56} y1={46} x2={56} y2={62} stroke={LINE} />
        <Box x={16} y={62} w={80} h={26} />
        <text x={56} y={79} textAnchor="middle" {...strong}>SYSTEM</text>
        <line x1={56} y1={88} x2={56} y2={104} stroke={LINE} />
        <Box x={16} y={104} w={80} h={26} />
        <text x={56} y={121} textAnchor="middle" {...strong}>DEVICE</text>
        <Arrow x1={102} x2={128} y={75} />
        <Box x={128} y={50} w={100} h={50} accent />
        <text x={178} y={71} textAnchor="middle" {...redStrong}>SCHEDULE</text>
        <text x={178} y={85} textAnchor="middle" {...tiny}>auto · NFPA cited</text>
        <text x={178} y={118} textAnchor="middle" {...tiny}>nightly scan · 30 days</text>
        <Arrow x1={232} x2={258} y={75} />
        <Box x={258} y={50} w={92} h={50} />
        <text x={304} y={71} textAnchor="middle" {...strong}>WORK ORDER</text>
        <text x={304} y={85} textAnchor="middle" {...tiny}>+ customer notice</text>
      </Frame>
    );
  }

  if (kind === "rfp") {
    return (
      <Frame>
        <title>Portals are monitored, solicitations scored, only viable bids reach a person</title>
        {[36, 60, 84, 108].map((y) => (
          <rect key={y} x={16} y={y} width={68} height={16} fill="#1B1B20" stroke={LINE} />
        ))}
        <text x={50} y={136} textAnchor="middle" {...tiny}>PORTALS</text>
        <Arrow x1={90} x2={116} y={75} />
        <Box x={116} y={50} w={90} h={50} accent />
        <text x={161} y={71} textAnchor="middle" {...redStrong}>SCORE FIT</text>
        <text x={161} y={85} textAnchor="middle" {...tiny}>vs past work</text>
        <Arrow x1={210} x2={236} y={75} />
        <rect x={236} y={60} width={68} height={16} fill="#1B1B20" stroke={INK} strokeWidth={1.2} />
        <text x={270} y={96} textAnchor="middle" {...tiny}>only viable bids</text>
        <Arrow x1={308} x2={332} y={68} />
        <Box x={332} y={51} w={52} h={34} />
        <text x={358} y={72} textAnchor="middle" {...strong}>DRAFT</text>
      </Frame>
    );
  }

  // scheduling
  return (
    <Frame>
      <title>Booking against live availability, with sends that cannot duplicate</title>
      {[0, 1, 2, 3].map((c) =>
        [0, 1, 2].map((r) => {
          const taken = (c === 1 && r === 1) || (c === 3 && r === 0);
          return (
            <rect
              key={`${c}-${r}`}
              x={20 + c * 20}
              y={44 + r * 20}
              width={16}
              height={16}
              fill={taken ? "rgba(248,121,4,0.16)" : "#1B1B20"}
              stroke={taken ? RED : LINE}
            />
          );
        }),
      )}
      <text x={58} y={124} textAnchor="middle" {...tiny}>LIVE AVAILABILITY</text>
      <Arrow x1={110} x2={136} y={75} />
      <Box x={136} y={50} w={92} h={50} />
      <text x={182} y={71} textAnchor="middle" {...strong}>BOOKING</text>
      <text x={182} y={85} textAnchor="middle" {...tiny}>+ staff assigned</text>
      <Arrow x1={232} x2={258} y={75} />
      <Box x={258} y={50} w={100} h={50} accent />
      <text x={308} y={71} textAnchor="middle" {...redStrong}>ONE EMAIL</text>
      <text x={308} y={85} textAnchor="middle" {...tiny}>unique index</text>
      <text x={308} y={118} textAnchor="middle" {...tiny}>retries collapse</text>
    </Frame>
  );
}
