import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Search, Database, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Temporal Knowledge Graph — interactive visualization              */
/* ------------------------------------------------------------------ */

const NODES = [
  { id: "you",      label: "entity",  value: "YOU",            x: 50, y: 50, kind: "self",     activeFrom: 0 },
  { id: "sf",       label: "city",    value: "San Francisco",  x: 16, y: 26, kind: "location", activeFrom: 1, supersededAt: 5, supersededBy: "ny" },
  { id: "ny",       label: "city",    value: "New York",       x: 14, y: 62, kind: "location", activeFrom: 5 },
  { id: "stripe",   label: "company", value: "Stripe",         x: 84, y: 22, kind: "org",      activeFrom: 2, supersededAt: 6, supersededBy: "google" },
  { id: "google",   label: "company", value: "Google",         x: 86, y: 56, kind: "org",      activeFrom: 6 },
  { id: "designer", label: "role",    value: "Designer",       x: 82, y: 82, kind: "role",     activeFrom: 2, supersededAt: 4, supersededBy: "engineer" },
  { id: "engineer", label: "role",    value: "Engineer",       x: 68, y: 90, kind: "role",     activeFrom: 4 },
  { id: "football", label: "likes",   value: "Football",       x: 36, y: 90, kind: "hobby",    activeFrom: 3 },
  { id: "chess",    label: "likes",   value: "Chess",          x: 50, y: 92, kind: "hobby",    activeFrom: 7 },
];

const EDGES = [
  { from: "you",      to: "sf",       label: "LIVES_IN",  activeFrom: 1, supersededAt: 5 },
  { from: "you",      to: "ny",       label: "LIVES_IN",  activeFrom: 5 },
  { from: "sf",       to: "ny",       label: "SUPERSEDES", kind: "supersede", activeFrom: 5, curve: -24 },
  { from: "you",      to: "stripe",   label: "WORKS_AT",  activeFrom: 2, supersededAt: 6 },
  { from: "you",      to: "google",   label: "WORKS_AT",  activeFrom: 6 },
  { from: "stripe",   to: "google",   label: "SUPERSEDES", kind: "supersede", activeFrom: 6, curve: 24 },
  { from: "you",      to: "designer", label: "HAS_ROLE",  activeFrom: 2, supersededAt: 4 },
  { from: "you",      to: "engineer", label: "HAS_ROLE",  activeFrom: 4 },
  { from: "designer", to: "engineer", label: "SUPERSEDES", kind: "supersede", activeFrom: 4, curve: 20 },
  { from: "you",      to: "football", label: "LIKES",     activeFrom: 3 },
  { from: "you",      to: "chess",    label: "LIKES",     activeFrom: 7 },
];

const EVENTS = [
  { t: 0, date: "T0 · Genesis",   store: null,                                          query: null },
  { t: 1, date: "Jan 2023",       store: "I live in San Francisco",                      query: null },
  { t: 2, date: "Mar 2023",       store: "I joined Stripe as a designer",                query: null },
  { t: 3, date: "Aug 2023",       store: "I love playing football on weekends",          query: null },
  { t: 4, date: "Jan 2024",       store: "I transitioned to engineering at Stripe",      query: null },
  { t: 5, date: "Jun 2024",       store: "I just moved from SF to New York",             query: null },
  { t: 6, date: "Nov 2024",       store: "I joined Google as a senior engineer",         query: null },
  { t: 7, date: "Mar 2025",       store: "Picked up chess this month",                   query: null },
  { t: 8, date: "Today",          store: null, query: "Where do I live, and have I ever lived elsewhere?" },
];

const ANSWERS = {
  8: [
    { type: "primary",   text: "New York." },
    { type: "detail",    text: "Previously: San Francisco (Jan 2023 → Jun 2024)." },
    { type: "evidence",  text: "3 active nodes · 4 superseded · 1 SUPERSEDES chain traversed" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const nodeIsActive = (n, t) =>
  n.activeFrom <= t && (n.supersededAt === undefined || t < n.supersededAt);

const nodeIsSuperseded = (n, t) =>
  n.supersededAt !== undefined && t >= n.supersededAt;

const nodeVisible = (n, t) => n.activeFrom <= t;

const edgeVisible = (e, t) => e.activeFrom <= t;

const edgeActive = (e, t) =>
  e.activeFrom <= t && (e.supersededAt === undefined || t < e.supersededAt);

/* Curved path between two nodes */
const pathFor = (a, b, curve = 10) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Perpendicular vector
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * curve;
  const cy = my + ny * curve;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GraphSimulator() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);
  const timerRef = useRef(null);
  const lastEvent = EVENTS[t];

  // Auto-play
  useEffect(() => {
    if (!playing) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setT((prev) => {
        if (prev >= EVENTS.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const nodesById = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])),
    [],
  );

  const activeId = pinned || hovered;
  const connectedSet = useMemo(() => {
    if (!activeId) return null;
    const s = new Set([activeId]);
    EDGES.forEach((e) => {
      if (!edgeVisible(e, t)) return;
      if (e.from === activeId) s.add(e.to);
      if (e.to === activeId) s.add(e.from);
    });
    return s;
  }, [activeId, t]);

  const reset = () => {
    setT(0);
    setPlaying(false);
    setPinned(null);
    setHovered(null);
  };

  const togglePlay = () => {
    if (t >= EVENTS.length - 1) setT(0);
    setPlaying((p) => !p);
  };

  const stats = useMemo(() => {
    const visible = NODES.filter((n) => nodeVisible(n, t));
    const active = visible.filter((n) => nodeIsActive(n, t)).length;
    const superseded = visible.filter((n) => nodeIsSuperseded(n, t)).length;
    const edgesVis = EDGES.filter((e) => edgeVisible(e, t)).length;
    const chains = EDGES.filter((e) => e.kind === "supersede" && edgeVisible(e, t)).length;
    return { active, superseded, edges: edgesVis, chains };
  }, [t]);

  return (
    <section
      id="graph"
      data-testid="graph-simulator"
      className="relative border-b border-border overflow-hidden"
    >
      <div className="container-edge py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-3">
            <div className="eyebrow mb-4">§ 03 / Live simulation</div>
            <div className="font-mono text-[11px] text-muted-foreground space-y-1">
              <div>File: temporal.graph</div>
              <div>
                Status: <span className="text-[hsl(var(--primary))]">streaming</span>
              </div>
            </div>
          </div>
          <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
            Watch memory{" "}
            <span className="italic text-muted-foreground">evolve in real time.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <p className="md:col-span-6 md:col-start-4 text-lg text-muted-foreground leading-relaxed mb-14">
            Stream in seven facts across two years. No overwrites &mdash; every change is a{" "}
            <span className="text-foreground italic">SUPERSEDES</span> chain. Scrub the timeline or
            hit play. Hover any node to see what it connects to.
          </p>
        </div>

        {/* Graph canvas */}
        <div className="relative border border-border bg-[hsl(var(--surface))] overflow-hidden">
          {/* Grid backdrop */}
          <div className="absolute inset-0 mono-grid opacity-40 pointer-events-none" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[720px] rounded-full opacity-[0.10] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 65%)",
            }}
          />

          {/* Top bar */}
          <div className="relative flex items-center justify-between border-b border-border px-5 h-11 font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
            <div className="flex items-center gap-2">
              <Database size={12} className="text-[hsl(var(--primary))]" />
              Neo4j · temporal_kg
            </div>
            <div className="hidden md:flex items-center gap-5">
              <span>
                active <span className="text-foreground">{stats.active}</span>
              </span>
              <span>
                superseded <span className="text-foreground">{stats.superseded}</span>
              </span>
              <span>
                edges <span className="text-foreground">{stats.edges}</span>
              </span>
              <span>
                chains <span className="text-foreground">{stats.chains}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] pulse-dot" />
              {lastEvent.date}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* SVG graph */}
            <div className="lg:col-span-8 relative border-b lg:border-b-0 lg:border-r border-border">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                className="w-full aspect-[4/3] md:aspect-[16/10]"
              >
                <defs>
                  <marker
                    id="arrowPrimary"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--primary))" />
                  </marker>
                  <marker
                    id="arrowMuted"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
                  </marker>
                  <marker
                    id="arrowAccent"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--accent))" />
                  </marker>
                </defs>

                {/* Edges */}
                {EDGES.filter((e) => edgeVisible(e, t)).map((e, idx) => {
                  const a = nodesById[e.from];
                  const b = nodesById[e.to];
                  const active = edgeActive(e, t);
                  const isSupersede = e.kind === "supersede";
                  const highlighted =
                    activeId && (e.from === activeId || e.to === activeId);
                  const dim =
                    activeId && !highlighted && !isSupersede;

                  const stroke = isSupersede
                    ? "hsl(var(--accent))"
                    : active
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))";
                  const opacity = dim ? 0.15 : active || isSupersede ? 0.9 : 0.45;
                  const curve = e.curve ?? (isSupersede ? 18 : 6);
                  const d = pathFor(a, b, curve);

                  return (
                    <g key={`${e.from}-${e.to}-${idx}`} className="transition-opacity">
                      <path
                        d={d}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={isSupersede ? 0.35 : 0.25}
                        strokeDasharray={isSupersede ? "1.5 1.2" : undefined}
                        opacity={opacity}
                        markerEnd={
                          isSupersede
                            ? "url(#arrowAccent)"
                            : active
                            ? "url(#arrowPrimary)"
                            : "url(#arrowMuted)"
                        }
                        className={active && !isSupersede ? "flow-dash" : ""}
                        style={active && !isSupersede ? { strokeDasharray: "1.2 1" } : {}}
                      />
                      {/* Edge label */}
                      <EdgeLabel
                        a={a}
                        b={b}
                        curve={curve}
                        label={e.label}
                        isSupersede={isSupersede}
                        opacity={opacity}
                      />
                    </g>
                  );
                })}

                {/* Nodes */}
                {NODES.filter((n) => nodeVisible(n, t)).map((n) => {
                  const active = nodeIsActive(n, t);
                  const superseded = nodeIsSuperseded(n, t);
                  const isSelf = n.kind === "self";
                  const isHover = activeId === n.id;
                  const connected = connectedSet?.has(n.id);
                  const dim = activeId && !connected;

                  const r = isSelf ? 3.2 : 2.2;
                  const fill = isSelf
                    ? "hsl(var(--primary))"
                    : active
                    ? "hsl(var(--background))"
                    : "hsl(var(--muted))";
                  const stroke = isSelf
                    ? "hsl(var(--primary))"
                    : active
                    ? "hsl(var(--foreground))"
                    : "hsl(var(--muted-foreground))";

                  return (
                    <g
                      key={n.id}
                      className={`cursor-pointer node-enter transition-opacity`}
                      style={{
                        opacity: dim ? 0.25 : 1,
                        transformOrigin: `${n.x}px ${n.y}px`,
                      }}
                      onMouseEnter={() => setHovered(n.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setPinned(pinned === n.id ? null : n.id)}
                      data-testid={`graph-node-${n.id}`}
                    >
                      {/* Active ring pulse */}
                      {active && !superseded && (
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={r}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth={0.25}
                          opacity={0.6}
                          className="ring-pulse"
                        />
                      )}
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={r}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isHover ? 0.6 : 0.35}
                        strokeDasharray={superseded ? "0.8 0.6" : undefined}
                        opacity={superseded ? 0.6 : 1}
                      />
                      {/* Kind indicator dot */}
                      {!isSelf && active && (
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={0.6}
                          fill="hsl(var(--primary))"
                        />
                      )}
                      {/* Label */}
                      <NodeLabel node={n} active={active} superseded={superseded} isHover={isHover} />
                    </g>
                  );
                })}
              </svg>

              {/* Hover hint */}
              <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/70">
                click a node to pin · hover to inspect
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 p-6 md:p-7 space-y-6 bg-[hsl(var(--surface-2))]">
              {/* Current event */}
              <div>
                <div className="eyebrow-muted mb-3">Current event</div>
                {lastEvent.store && (
                  <div className="border border-border bg-[hsl(var(--code-bg))] p-4 font-mono text-[12px] leading-relaxed">
                    <span className="text-[hsl(var(--primary))]">store</span>
                    <span className="text-muted-foreground">(&ldquo;</span>
                    <span className="text-foreground">{lastEvent.store}</span>
                    <span className="text-muted-foreground">&rdquo;)</span>
                  </div>
                )}
                {lastEvent.query && (
                  <>
                    <div className="border border-border bg-[hsl(var(--code-bg))] p-4 font-mono text-[12px] leading-relaxed">
                      <span className="text-[hsl(var(--accent))]">query</span>
                      <span className="text-muted-foreground">(&ldquo;</span>
                      <span className="text-foreground">{lastEvent.query}</span>
                      <span className="text-muted-foreground">&rdquo;)</span>
                    </div>
                    {ANSWERS[t] && (
                      <div className="mt-3 space-y-2">
                        {ANSWERS[t].map((a, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2 text-[13px] leading-relaxed ${
                              a.type === "primary"
                                ? "text-foreground font-medium"
                                : a.type === "evidence"
                                ? "font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {a.type !== "evidence" && (
                              <ArrowRight
                                size={12}
                                className="mt-1 text-[hsl(var(--primary))] shrink-0"
                              />
                            )}
                            <span>{a.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
                {!lastEvent.store && !lastEvent.query && (
                  <div className="text-sm text-muted-foreground italic">
                    Empty graph. Press play to stream in memories.
                  </div>
                )}
              </div>

              {/* Inspector */}
              <div className="border-t border-border pt-6">
                <div className="eyebrow-muted mb-3">Inspector</div>
                {activeId ? (
                  <Inspector node={nodesById[activeId]} t={t} />
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Hover a node to see its state, supersession chain, and connected edges.
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="border-t border-border pt-6">
                <div className="eyebrow-muted mb-3">Legend</div>
                <ul className="space-y-2 font-mono text-[11px] text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                    active
                  </li>
                  <li className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full border border-muted-foreground"
                      style={{ borderStyle: "dashed" }}
                    />
                    superseded
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-0 w-5 border-t border-[hsl(var(--accent))] border-dashed" />
                    supersedes
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-0 w-5 border-t border-[hsl(var(--primary))]" />
                    active relation
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Timeline scrubber */}
          <div className="border-t border-border p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={togglePlay}
                data-testid="graph-play"
                className="flex items-center gap-2 border border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] h-9 px-4 font-mono text-[10px] tracking-[0.24em] uppercase transition-all"
              >
                {playing ? <Pause size={12} /> : <Play size={12} />}
                {playing ? "Pause" : t >= EVENTS.length - 1 ? "Replay" : "Play"}
              </button>
              <button
                onClick={reset}
                data-testid="graph-reset"
                className="flex items-center gap-2 border border-border h-9 px-4 font-mono text-[10px] tracking-[0.24em] uppercase hover:border-foreground transition-colors"
              >
                <RotateCcw size={12} />
                Reset
              </button>
              <div className="ml-auto font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
                step {t} / {EVENTS.length - 1}
              </div>
            </div>

            {/* Scrubber track */}
            <div className="relative">
              <input
                type="range"
                min={0}
                max={EVENTS.length - 1}
                step={1}
                value={t}
                onChange={(e) => {
                  setT(parseInt(e.target.value, 10));
                  setPlaying(false);
                }}
                data-testid="graph-scrubber"
                className="w-full appearance-none h-1 bg-border outline-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                    (t / (EVENTS.length - 1)) * 100
                  }%, hsl(var(--border)) ${
                    (t / (EVENTS.length - 1)) * 100
                  }%, hsl(var(--border)) 100%)`,
                }}
              />
              <div className="flex justify-between mt-4">
                {EVENTS.map((ev, i) => (
                  <button
                    key={ev.t}
                    onClick={() => {
                      setT(i);
                      setPlaying(false);
                    }}
                    data-testid={`graph-step-${i}`}
                    className="flex flex-col items-start group"
                    style={{ flex: "1 0 0" }}
                  >
                    <span
                      className={`h-2 w-[2px] mb-1.5 transition-colors ${
                        i <= t ? "bg-[hsl(var(--primary))]" : "bg-border"
                      }`}
                    />
                    <span
                      className={`hidden md:block font-mono text-[9px] tracking-[0.18em] uppercase transition-colors text-left ${
                        i === t
                          ? "text-foreground"
                          : "text-muted-foreground/60 group-hover:text-muted-foreground"
                      }`}
                    >
                      {ev.date}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Below-graph explainers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <ExplainerCard
            idx="01"
            title="Facts never overwrite."
            body="When you say &lsquo;I moved to New York&rsquo;, Reeve doesn&apos;t delete San Francisco. It marks it superseded and keeps the full chain queryable."
          />
          <ExplainerCard
            idx="02"
            title="One entity, many names."
            body="&lsquo;Stripe&rsquo;, &lsquo;my company&rsquo;, &lsquo;work&rsquo; all resolve to a single canonical node. Your agent stops getting confused by synonyms."
          />
          <ExplainerCard
            idx="03"
            title="Time is a first-class primitive."
            body="Ask &lsquo;where did I live in 2023?&rsquo; and Reeve rewinds the graph to that moment. No other memory layer can do this."
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const NodeLabel = ({ node, active, superseded, isHover }) => {
  const isSelf = node.kind === "self";
  // position label below node, except self which is above
  const offsetY = isSelf ? -4.5 : 4.5;
  const yPos = node.y + offsetY;
  const textAnchor = "middle";

  return (
    <g
      style={{
        pointerEvents: "none",
        opacity: superseded ? 0.55 : 1,
      }}
    >
      {/* Kind label (tiny, mono, uppercase) */}
      <text
        x={node.x}
        y={yPos - 1.8}
        textAnchor={textAnchor}
        fill="hsl(var(--muted-foreground))"
        fontSize="1.3"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.08"
        style={{ textTransform: "uppercase" }}
      >
        /{node.label}
      </text>
      {/* Value (serif, readable) */}
      <text
        x={node.x}
        y={yPos + 1}
        textAnchor={textAnchor}
        fill={isSelf ? "hsl(var(--primary))" : active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
        fontSize={isSelf ? "3.4" : "2.4"}
        fontFamily="Cormorant Garamond, serif"
        fontWeight={isHover ? 500 : 400}
        style={{ fontStyle: isSelf ? "normal" : "normal" }}
      >
        {node.value}
      </text>
    </g>
  );
};

const EdgeLabel = ({ a, b, curve, label, isSupersede, opacity }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const x = mx + nx * (curve * 0.55);
  const y = my + ny * (curve * 0.55);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={isSupersede ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"}
      fontSize="1.25"
      fontFamily="JetBrains Mono, monospace"
      letterSpacing="0.08"
      style={{
        textTransform: "uppercase",
        pointerEvents: "none",
        opacity,
      }}
    >
      {label}
    </text>
  );
};

const Inspector = ({ node, t }) => {
  const active = nodeIsActive(node, t);
  const superseded = nodeIsSuperseded(node, t);
  const incoming = EDGES.filter((e) => e.to === node.id && edgeVisible(e, t));
  const outgoing = EDGES.filter((e) => e.from === node.id && edgeVisible(e, t));

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            /{node.label}
          </div>
          <div className="serif-display text-3xl mt-1">{node.value}</div>
        </div>
        <span
          className={`font-mono text-[9px] tracking-[0.22em] uppercase px-2 py-1 border ${
            superseded
              ? "border-muted-foreground text-muted-foreground"
              : active
              ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
              : "border-border text-muted-foreground"
          }`}
        >
          {superseded ? "superseded" : active ? "active" : "dormant"}
        </span>
      </div>
      <div className="h-px bg-border" />
      <div className="font-mono text-[11px] text-muted-foreground space-y-1.5">
        <div className="flex justify-between">
          <span>kind</span>
          <span className="text-foreground">{node.kind}</span>
        </div>
        <div className="flex justify-between">
          <span>active_from</span>
          <span className="text-foreground">{EVENTS[node.activeFrom]?.date ?? "—"}</span>
        </div>
        {node.supersededAt !== undefined && (
          <div className="flex justify-between">
            <span>superseded_at</span>
            <span className="text-foreground">{EVENTS[node.supersededAt]?.date ?? "—"}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>edges_in / out</span>
          <span className="text-foreground">
            {incoming.length} / {outgoing.length}
          </span>
        </div>
      </div>
      {(incoming.length > 0 || outgoing.length > 0) && (
        <div className="pt-2">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
            relations
          </div>
          <ul className="space-y-1 font-mono text-[11px]">
            {outgoing.map((e, i) => (
              <li key={`o-${i}`} className="flex items-center gap-2">
                <Search size={10} className="text-[hsl(var(--primary))]" />
                <span className="text-muted-foreground">{e.label.toLowerCase()}</span>
                <ArrowRight size={10} className="text-muted-foreground" />
                <span className="text-foreground">
                  {NODES.find((n) => n.id === e.to)?.value}
                </span>
              </li>
            ))}
            {incoming.map((e, i) => (
              <li key={`i-${i}`} className="flex items-center gap-2">
                <span className="text-foreground">
                  {NODES.find((n) => n.id === e.from)?.value}
                </span>
                <ArrowRight size={10} className="text-muted-foreground" />
                <span className="text-muted-foreground">{e.label.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ExplainerCard = ({ idx, title, body }) => (
  <div className="border border-border p-6 bg-[hsl(var(--surface))]/60 hover:border-[hsl(var(--primary))]/50 transition-colors">
    <div className="eyebrow-muted mb-4">/ {idx}</div>
    <h4 className="serif-display text-2xl md:text-3xl mb-3">{title}</h4>
    <p
      className="text-sm text-muted-foreground leading-relaxed"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);
