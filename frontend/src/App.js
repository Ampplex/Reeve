import { useEffect, useState, useCallback } from "react";
import "@/App.css";
import {
  Sun,
  Moon,
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
  Brain,
  Clock,
  GitBranch,
  Layers,
  Network,
  Fingerprint,
  Infinity as InfinityIcon,
  Plug,
  Minus,
  CornerDownRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Theme toggle                                                       */
/* ------------------------------------------------------------------ */
const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("reeve-theme");
    const initial =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("reeve-theme", next);
      return next;
    });
  }, []);

  return { theme, toggle };
};

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */
const Nav = ({ theme, toggle }) => (
  <nav
    data-testid="main-nav"
    className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl"
  >
    <div className="container-edge flex h-16 items-center justify-between">
      <a
        href="#top"
        data-testid="nav-logo"
        className="flex items-center gap-2 font-mono text-sm tracking-[0.2em] uppercase"
      >
        <span className="inline-block h-2 w-2 bg-[hsl(var(--primary))] pulse-dot" />
        Reeve
      </a>
      <div className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
        <a href="#problem" data-testid="nav-problem" className="hover:text-foreground transition-colors">
          Problem
        </a>
        <a href="#how" data-testid="nav-how" className="hover:text-foreground transition-colors">
          How it works
        </a>
        <a href="#architecture" data-testid="nav-architecture" className="hover:text-foreground transition-colors">
          Architecture
        </a>
        <a href="#features" data-testid="nav-features" className="hover:text-foreground transition-colors">
          Features
        </a>
        <a href="#quickstart" data-testid="nav-quickstart" className="hover:text-foreground transition-colors">
          Quick start
        </a>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="Toggle theme"
          onClick={toggle}
          data-testid="theme-toggle"
          className="flex h-9 w-9 items-center justify-center border border-border hover:border-[hsl(var(--primary))] transition-colors"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <a
          href="https://reeve.co.in/docs"
          target="_blank"
          rel="noreferrer"
          data-testid="nav-docs-cta"
          className="hidden md:inline-flex items-center gap-1.5 border border-foreground bg-foreground text-background px-4 h-9 font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] hover:text-white transition-colors"
        >
          Docs <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  </nav>
);

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const HERO_WORDS = ["Stop", "building", "amnesiac", "agents."];

const Hero = () => (
  <section id="top" className="relative overflow-hidden border-b border-border">
    <div className="absolute inset-0 dot-grid opacity-40" />
    <div
      aria-hidden
      className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full opacity-[0.25] blur-3xl"
      style={{
        background:
          "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 65%)",
      }}
    />
    <div className="container-edge relative grid grid-cols-1 md:grid-cols-12 gap-8 py-24 md:py-36">
      <div className="md:col-span-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="eyebrow">[ R-001 ] A brain that remembers</span>
        </div>
        <h1
          data-testid="hero-headline"
          className="serif-display text-[14vw] md:text-[8.5vw] lg:text-[7.5vw] leading-[0.9]"
          style={{ fontWeight: 300 }}
        >
          <span className="block overflow-hidden">
            {HERO_WORDS.slice(0, 2).map((w, i) => (
              <span
                key={i}
                className="reveal-word mr-[0.2em]"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                {w}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden">
            <span
              className="reveal-word mr-[0.2em] italic text-[hsl(var(--primary))]"
              style={{ animationDelay: "0.3s", fontWeight: 400 }}
            >
              amnesiac
            </span>
            <span
              className="reveal-word"
              style={{ animationDelay: "0.45s" }}
            >
              agents.
            </span>
          </span>
        </h1>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7 md:col-start-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.55] max-w-xl">
              Because <span className="italic text-foreground">&ldquo;similar&rdquo;</span> isn&apos;t the
              same as <span className="italic text-foreground">remembered</span>. Reeve is a temporal
              knowledge graph that understands what you store &mdash; not just what&apos;s similar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://reeve.co.in/docs"
                target="_blank"
                rel="noreferrer"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center gap-2 bg-foreground text-background px-6 h-12 font-mono text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
              >
                Get started
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#quickstart"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-2 border border-border px-6 h-12 font-mono text-[12px] tracking-[0.22em] uppercase hover:border-foreground transition-colors"
              >
                Quick start
                <CornerDownRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Side column */}
      <aside className="md:col-span-4 md:border-l border-border md:pl-8 flex flex-col justify-between gap-8">
        <div>
          <div className="eyebrow mb-4">Runtime signature</div>
          <div className="font-mono text-[11px] text-muted-foreground space-y-1.5">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span>3-lane</span>
              <span className="text-foreground">Retrieval engine</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span>Graph</span>
              <span className="text-foreground">Knowledge DB</span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span>MCP</span>
              <span className="text-foreground">Native protocol</span>
            </div>
            <div className="flex justify-between">
              <span>Local</span>
              <span className="text-foreground">Ollama compatible</span>
            </div>
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground flex items-center gap-2">
          <InfinityIcon size={14} className="text-[hsl(var(--primary))]" />
          Engineered to persist <span className="text-foreground">70 years</span>
        </div>
      </aside>
    </div>

    {/* Ticker */}
    <div className="relative border-t border-border overflow-hidden">
      <div className="flex whitespace-nowrap marquee-track">
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex shrink-0 items-center gap-10 py-4 pr-10 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            {[
              "Temporal Knowledge Graph",
              "SUPERSEDES chains",
              "Neo4j-native",
              "3-lane retrieval",
              "MCP protocol",
              "Entity resolution",
              "Lifespan-aware scaling",
              "Landmark memory",
            ].map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>{t}</span>
                <span className="text-[hsl(var(--primary))]">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Problem                                                            */
/* ------------------------------------------------------------------ */
const PROBLEMS = [
  {
    n: "A",
    title: "No cross-session memory",
    body: "Every new conversation resets context entirely. Your agent is a stranger every time it wakes up.",
    tags: ["Chat history", "Vector stores", "RAG"],
  },
  {
    n: "B",
    title: "No contradiction handling",
    body: "&ldquo;I moved to New York&rdquo; and &ldquo;I live in San Francisco&rdquo; coexist. No resolution. No truth.",
    tags: ["Pinecone", "ChromaDB", "Weaviate"],
  },
  {
    n: "C",
    title: "No sense of time",
    body: "Ask &ldquo;what changed since last year?&rdquo; &mdash; silence. Memory systems store facts, not state evolution.",
    tags: ["MemGPT", "LangMem", "OpenAI memory"],
  },
];

const Problem = () => (
  <section id="problem" className="border-b border-border">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 md:mb-20">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 01 / The problem</div>
          <div className="font-mono text-[11px] text-muted-foreground">
            File: amnesia.md
            <br />
            Status: <span className="text-[hsl(var(--primary))]">open</span>
          </div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          LLMs forget.
          <br />
          <span className="italic text-muted-foreground">Every conversation</span>{" "}
          <span className="italic">starts from zero.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <p className="md:col-span-7 md:col-start-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
          Common workarounds &mdash; chat history, vector stores, RAG pipelines &mdash; all break down
          over time. They retrieve <span className="text-foreground italic">similar</span> text. They can&apos;t
          handle contradictions. They have no concept of time or state evolution.
          <span className="block mt-4 text-foreground">
            Ask any of them: <span className="italic">&ldquo;What changed about me since last year?&rdquo;</span>
          </span>
          <span className="block mt-2">Silence. Ask Reeve &mdash; it knows.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
        {PROBLEMS.map((p, i) => (
          <article
            key={p.n}
            data-testid={`problem-card-${i}`}
            className={`group relative p-8 md:p-10 ${
              i !== 0 ? "md:border-l border-border" : ""
            } border-b md:border-b-0 hover:bg-[hsl(var(--muted))]/40 transition-colors`}
          >
            <div className="flex items-start justify-between mb-8">
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                /{p.n}
              </span>
              <span className="text-[hsl(var(--primary))] font-serif text-4xl leading-none -mt-1">
                &times;
              </span>
            </div>
            <h3 className="serif-display text-3xl md:text-4xl mb-4">{p.title}</h3>
            <p
              className="text-muted-foreground leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: p.body }}
            />
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground border border-border px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Code block                                                         */
/* ------------------------------------------------------------------ */
const CodeBlock = ({ lang = "python", code, label, testid }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div
      className="border border-border bg-[hsl(var(--code-bg))] text-[hsl(var(--code-fg))]"
      data-testid={testid}
    >
      <div className="flex items-center justify-between px-4 h-9 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-[hsl(var(--primary))]" />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-neutral-400">
            {label || lang}
          </span>
        </div>
        <button
          onClick={copy}
          aria-label="Copy code"
          data-testid={`${testid}-copy`}
          className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-neutral-400 hover:text-white"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-[13px] leading-[1.7] font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    n: "01",
    title: "Store anything",
    body: "Call store() with any text. Reeve's LLM parses it into structured entities, states, actions, and locations — writing a living temporal knowledge graph to Neo4j. Not chunks. Not embeddings. Structured understanding.",
    icon: Brain,
    code: `from reeve import store

store("I just joined Google as a software engineer")
store("I love playing football")
store("I moved from San Francisco to New York")`,
    lang: "python",
  },
  {
    n: "02",
    title: "Graph evolves, history preserved",
    body: "New facts don't overwrite old ones — they create SUPERSEDES chains. Entity resolution ensures 'Google', 'my company', and 'work' all resolve to one canonical node.",
    icon: GitBranch,
    code: `(city: New York) ──SUPERSEDES──▶ (city: SF)
   active: true                active: false

"Google" = "my company" = "work"  → one node`,
    lang: "graph",
  },
  {
    n: "03",
    title: "Query in natural language",
    body: "Ask anything. The 3-lane retrieval engine surfaces the right memory — not just the most similar text, but the most relevant knowledge at this moment in time.",
    icon: Network,
    code: `from reeve import query

query("Where do I live?")
# → "New York."

query("Should I play football with my friend?")
# → "Yes — you love football."

query("Did I ever live in SF?")
# → "Yes, before moving to New York."`,
    lang: "python",
  },
];

const HowItWorks = () => (
  <section id="how" className="border-b border-border">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 02 / How it works</div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          Three steps. <br />
          <span className="italic text-muted-foreground">Lifetime memory.</span>
        </h2>
      </div>

      <div className="space-y-20 md:space-y-28">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            data-testid={`step-${s.n}`}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
          >
            <div className="md:col-span-4 md:sticky md:top-24">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-[10vw] md:text-[7vw] leading-none text-muted-foreground/40">
                  {s.n}
                </span>
                <s.icon size={22} className="text-[hsl(var(--primary))]" />
              </div>
              <h3 className="serif-display text-3xl md:text-4xl mb-4">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {s.body}
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <CodeBlock
                lang={s.lang}
                code={s.code}
                label={s.lang}
                testid={`step-${s.n}-code`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Memory evolves simulator                                           */
/* ------------------------------------------------------------------ */
const MemoryEvolves = () => {
  const [moved, setMoved] = useState(false);
  return (
    <section id="evolution" className="border-b border-border relative overflow-hidden">
      <div className="container-edge py-24 md:py-32 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-3">
            <div className="eyebrow mb-4">§ 03 / How memory evolves</div>
          </div>
          <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
            Facts change. <br />
            <span className="italic text-muted-foreground">History stays.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Reeve doesn&apos;t overwrite memories &mdash; it creates auditable chains. Every state
              transition is tracked, every contradiction resolved.
            </p>
            <p className="mt-6 text-foreground leading-relaxed">
              <span className="font-semibold">Reduces hallucinations.</span> When an LLM answers
              from structured, versioned facts instead of fuzzy vector similarity, it retrieves what{" "}
              <span className="italic">actually happened</span> &mdash; not what sounds plausible.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <button
                onClick={() => setMoved((v) => !v)}
                data-testid="simulate-toggle"
                className="inline-flex items-center gap-2 bg-foreground text-background px-5 h-11 font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
              >
                {moved ? "Reset" : "Simulate: Move to New York"}
                <ArrowUpRight size={12} />
              </button>
            </div>

            <ul className="mt-10 space-y-3 font-mono text-[11px] tracking-[0.18em] uppercase">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[hsl(var(--primary))]" /> Active state
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-muted-foreground/50" />
                Superseded (history preserved)
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 border border-foreground" />
                Landmark memory (decay-proof)
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 bg-foreground" />
                Role / entity state
              </li>
            </ul>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="border border-border bg-[hsl(var(--surface))] p-8 md:p-10 relative overflow-hidden min-h-[420px]">
              <div className="absolute inset-0 dot-grid opacity-50" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Entity: YOU</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    t = {moved ? "2025-03" : "2024-09"}
                  </span>
                </div>

                <Node
                  label="city"
                  value="San Francisco"
                  active={!moved}
                  testid="node-sf"
                />
                {moved && (
                  <div className="flex justify-center py-1">
                    <div className="font-mono text-[10px] tracking-[0.25em] text-[hsl(var(--primary))]">
                      ─── SUPERSEDES ──▶
                    </div>
                  </div>
                )}
                {moved && (
                  <Node
                    label="city"
                    value="New York"
                    active
                    landmark
                    testid="node-ny"
                  />
                )}

                <div className="h-px bg-border my-6" />

                <Node label="company" value="Google" active testid="node-goog" role />
                <Node label="likes" value="football" active testid="node-football" role />

                <div className="mt-8 font-mono text-[11px] text-muted-foreground border-t border-border pt-4">
                  <span className="text-[hsl(var(--primary))]">query</span>(&ldquo;Where do I live?&rdquo;)
                  <br />
                  <span className="text-foreground">
                    → {moved ? "New York." : "San Francisco."}
                  </span>
                  {moved && (
                    <span className="block mt-2 text-muted-foreground">
                      query(&ldquo;Did I ever live in SF?&rdquo;)
                      <br />
                      <span className="text-foreground">→ Yes, before moving to New York.</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Node = ({ label, value, active, landmark, role, testid }) => (
  <div
    data-testid={testid}
    className={`relative flex items-center justify-between border px-5 py-4 transition-all ${
      active ? "border-foreground" : "border-dashed border-muted-foreground/40 opacity-60"
    } ${landmark ? "bg-[hsl(var(--primary))]/5" : ""}`}
  >
    <div className="flex items-center gap-4">
      <span
        className={`h-2.5 w-2.5 ${
          landmark
            ? "border border-foreground"
            : role
            ? "bg-foreground"
            : active
            ? "bg-[hsl(var(--primary))]"
            : "bg-muted-foreground/50"
        }`}
      />
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
    <span className="serif-display text-2xl md:text-3xl">{value}</span>
    {!active && (
      <span className="absolute -right-2 top-1/2 -translate-y-1/2 bg-background px-1 font-mono text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
        superseded
      </span>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Architecture                                                       */
/* ------------------------------------------------------------------ */
const LAYERS = [
  { n: "L5", name: "Your Application", spec: "MCP client / SDK call" },
  { n: "L4", name: "Reeve API", spec: "store() · query() · schema-aware parser" },
  { n: "L3", name: "Retrieval Engine", spec: "3-lane: semantic · temporal · recency" },
  { n: "L2", name: "Entity Resolver", spec: "exact · substring · embedding match" },
  { n: "L1", name: "Temporal Knowledge Graph", spec: "Neo4j · SUPERSEDES chains" },
];

const Architecture = () => (
  <section id="architecture" className="border-b border-border bg-[hsl(var(--surface))]">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 04 / Architecture</div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          Five layers.{" "}
          <span className="italic text-muted-foreground">One memory.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <p className="md:col-span-4 text-muted-foreground leading-relaxed">
          From your app to the knowledge graph &mdash; every layer has a single job, and together they
          make memory that actually works at scale.
        </p>
        <div className="md:col-span-8">
          <div className="border border-border">
            {LAYERS.map((l, i) => (
              <div
                key={l.n}
                data-testid={`arch-layer-${l.n}`}
                className={`group grid grid-cols-12 gap-4 items-center px-6 py-6 transition-colors hover:bg-background ${
                  i !== LAYERS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.22em] uppercase text-[hsl(var(--primary))]">
                  {l.n}
                </div>
                <div className="col-span-10 md:col-span-6 serif-display text-2xl md:text-3xl">
                  {l.name}
                </div>
                <div className="hidden md:block md:col-span-4 font-mono text-[11px] text-muted-foreground">
                  {l.spec}
                </div>
                <div className="hidden md:flex md:col-span-1 justify-end">
                  <Layers size={14} className="text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            <button
              className="flex items-center gap-1.5 border border-border px-3 h-8 hover:border-foreground transition-colors"
              data-testid="simulate-write-path"
            >
              <Minus size={10} /> Simulate Write Path
            </button>
            <button
              className="flex items-center gap-1.5 border border-border px-3 h-8 hover:border-foreground transition-colors"
              data-testid="simulate-query-path"
            >
              <Minus size={10} /> Simulate Query Path
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Differentiators (Bento)                                            */
/* ------------------------------------------------------------------ */
const Features = () => (
  <section id="features" className="border-b border-border">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 05 / What makes Reeve different</div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          Built for permanence, <br />
          <span className="italic text-muted-foreground">not prototypes.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <Bento
          span="md:col-span-8 md:row-span-2"
          tag="Core"
          icon={Network}
          title="3-Lane Retrieval"
          body="Most systems rank by vector similarity alone. Reeve combines three parallel lanes — semantic, temporal, and recency-weighted — into a single unified score. Important memories surface regardless of age."
          testid="feat-3lane"
          big
          extra={
            <div className="mt-6 p-4 border border-border bg-[hsl(var(--code-bg))] text-[hsl(var(--code-fg))] font-mono text-[12px] leading-relaxed">
              <span className="text-neutral-400">score =</span>{" "}
              <span className="text-[hsl(var(--primary))]">0.65</span>×similarity +{" "}
              <span className="text-[hsl(var(--primary))]">0.30</span>×importance +{" "}
              <span className="text-[hsl(var(--primary))]">0.05</span>×recency
            </div>
          }
        />
        <Bento
          span="md:col-span-4"
          tag="Core"
          icon={GitBranch}
          title="State Supersession"
          body="Facts evolve. Reeve tracks this with explicit SUPERSEDES chains — current answers are accurate, history is preserved."
          testid="feat-supersede"
        />
        <Bento
          span="md:col-span-4"
          tag="Design"
          icon={Brain}
          title="Landmark Memory"
          body="Major life events — promotions, moves, milestones — bypass recency decay and surface instantly, no matter how old."
          testid="feat-landmark"
        />
        <Bento
          span="md:col-span-6"
          tag="Protocol"
          icon={Plug}
          title="MCP-Native"
          body="Works with any MCP-compatible client — Claude Desktop, LM Studio, AnythingLLM, Cursor. Paste 4 lines of JSON. Done."
          testid="feat-mcp"
          extra={
            <div className="mt-4 font-mono text-[11px] text-muted-foreground border-t border-border pt-3">
              {"{"}&ldquo;mcpServers&rdquo;: {"{"}&ldquo;reeve&rdquo;: {"{"}&ldquo;url&rdquo;: &ldquo;…&rdquo;{"}}}"}
            </div>
          }
        />
        <Bento
          span="md:col-span-6"
          tag="Architecture"
          icon={Layers}
          title="Temporal Knowledge Graph"
          body="Built on Neo4j with typed relationships — Episodes, Entities, Actions, States, Roles, Locations. Not an embedding dump. A living, evolving model."
          testid="feat-tkg"
        />
        <Bento
          span="md:col-span-6"
          tag="Reliability"
          icon={Fingerprint}
          title="Entity Resolution"
          body="&ldquo;Google&rdquo;, &ldquo;my company&rdquo;, &ldquo;work&rdquo; all resolve to one canonical node via 3-layer matching: exact, substring, and embedding similarity."
          testid="feat-entity"
        />
        <Bento
          span="md:col-span-6"
          tag="Scalability"
          icon={Clock}
          title="Lifespan-Aware Scaling"
          body="Search depth scales dynamically with graph size — 2% of total episodes, clamped between 50 and 500. Efficient at day one. Deep at year ten."
          testid="feat-lifespan"
        />
      </div>
    </div>
  </section>
);

const Bento = ({ span, tag, icon: Icon, title, body, extra, testid, big }) => (
  <article
    data-testid={testid}
    className={`group relative border border-border p-6 md:p-8 hover:border-foreground transition-colors bg-background ${span}`}
  >
    <div className="flex items-start justify-between mb-6">
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        / {tag}
      </span>
      <Icon size={16} className="text-[hsl(var(--primary))]" />
    </div>
    <h3
      className={`serif-display mb-4 ${
        big ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl"
      }`}
    >
      {title}
    </h3>
    <p
      className="text-muted-foreground leading-relaxed"
      dangerouslySetInnerHTML={{ __html: body }}
    />
    {extra}
  </article>
);

/* ------------------------------------------------------------------ */
/*  Quick start                                                        */
/* ------------------------------------------------------------------ */
const MCP_SNIPPET = `{
  "mcpServers": {
    "threelane-memory": {
      "type": "sse",
      "url":  "https://mcp.reeve.co.in/sse"
    }
  }
}`;

const QuickStart = () => (
  <section id="quickstart" className="border-b border-border">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 06 / Quick start</div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          Up in{" "}
          <span className="italic text-[hsl(var(--primary))]">minutes.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Paste into your MCP client config. Restart your client after saving &mdash; your AI will
            remember everything from this point forward.
          </p>
          <div className="mt-8">
            <div className="eyebrow mb-3">Works with</div>
            <ul className="flex flex-wrap gap-2 font-mono text-[11px] tracking-[0.18em] uppercase">
              {[
                "Claude Desktop",
                "LM Studio",
                "AnythingLLM",
                "Cursor",
                "Ollama",
                "Any MCP client",
              ].map((t) => (
                <li key={t} className="border border-border px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:col-span-7">
          <CodeBlock
            lang="json"
            code={MCP_SNIPPET}
            label="mcp-config.json"
            testid="quickstart-code"
          />
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Footer / Final CTA                                                 */
/* ------------------------------------------------------------------ */
const Footer = () => (
  <footer className="relative overflow-hidden">
    <div className="container-edge pt-24 md:pt-36 pb-12">
      <div className="eyebrow mb-6">§ 07 / Get started</div>
      <h2
        data-testid="final-headline"
        className="serif-display text-[13vw] md:text-[10vw] leading-[0.92]"
      >
        Give your agent
        <br />
        <span className="italic text-[hsl(var(--primary))]">a lifetime.</span>
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6">
        <p className="md:col-span-6 text-lg text-muted-foreground leading-relaxed">
          Memory that persists, evolves, and never forgets what matters. Built on a temporal
          knowledge graph engineered to last decades.
        </p>
        <div className="md:col-span-6 flex md:justify-end items-end">
          <a
            href="https://reeve.co.in/docs"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-cta"
            className="group inline-flex items-center gap-3 bg-foreground text-background px-8 h-14 font-mono text-[12px] tracking-[0.22em] uppercase hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
          >
            Build with Reeve
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-6 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
        <div className="md:col-span-4 flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-[hsl(var(--primary))] pulse-dot" />
          Reeve &mdash; A brain that remembers.
        </div>
        <div className="md:col-span-4">Temporal Knowledge Graph · v0.1</div>
        <div className="md:col-span-4 md:text-right">
          &copy; {new Date().getFullYear()} Reeve.co.in
        </div>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */
export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[hsl(var(--primary))] selection:text-white">
      <Nav theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <MemoryEvolves />
        <Architecture />
        <Features />
        <QuickStart />
      </main>
      <Footer />
    </div>
  );
}
