import { useState } from "react";
import "@/App.css";
import {
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
  CornerDownRight,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import GraphSimulator from "@/components/GraphSimulator";

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */
const Nav = () => (
  <nav
    data-testid="main-nav"
    className="sticky top-0 z-50 w-full border-b border-border bg-background/75 backdrop-blur-xl"
  >
    <div className="container-edge flex h-16 items-center justify-between">
      <a
        href="#top"
        data-testid="nav-logo"
        className="flex items-center gap-2.5 font-mono text-sm tracking-[0.22em] uppercase"
      >
        <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[hsl(var(--primary))] pulse-dot" />
          <span className="relative h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
        </span>
        Reeve
      </a>
      <div className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
        <a href="#problem" data-testid="nav-problem" className="hover:text-foreground transition-colors">
          Problem
        </a>
        <a href="#graph" data-testid="nav-graph" className="hover:text-foreground transition-colors">
          Simulation
        </a>
        <a href="#how" data-testid="nav-how" className="hover:text-foreground transition-colors">
          How it works
        </a>
        <a href="#features" data-testid="nav-features" className="hover:text-foreground transition-colors">
          Features
        </a>
        <a href="#faq" data-testid="nav-faq" className="hover:text-foreground transition-colors">
          FAQ
        </a>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          data-testid="nav-github"
          className="hidden md:inline-flex items-center gap-1.5 border border-border px-4 h-9 font-mono text-[11px] tracking-[0.22em] uppercase hover:border-foreground transition-colors"
        >
          Github
        </a>
        <a
          href="https://reeve.co.in/docs"
          target="_blank"
          rel="noreferrer"
          data-testid="nav-docs-cta"
          className="inline-flex items-center gap-1.5 border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 h-9 font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-transparent hover:text-[hsl(var(--primary))] transition-colors"
        >
          Get Started <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  </nav>
);

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const Hero = () => (
  <section id="top" className="relative overflow-hidden border-b border-border">
    <div className="absolute inset-0 dot-grid opacity-30" />
    <div
      aria-hidden
      className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-[0.14] blur-3xl"
      style={{
        background:
          "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 65%)",
      }}
    />
    <div
      aria-hidden
      className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl"
      style={{
        background:
          "radial-gradient(circle at center, hsl(var(--accent)) 0%, transparent 60%)",
      }}
    />

    <div className="container-edge relative grid grid-cols-1 md:grid-cols-12 gap-8 pt-24 md:pt-36 pb-20 md:pb-28">
      <div className="md:col-span-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="eyebrow">[ R-001 ] A brain that remembers</span>
        </div>
        <h1
          data-testid="hero-headline"
          className="serif-display text-[14vw] md:text-[8.5vw] lg:text-[7.2vw] leading-[0.88]"
        >
          <span className="block overflow-hidden">
            <span className="reveal-word mr-[0.2em]" style={{ animationDelay: "0.05s" }}>
              Stop
            </span>
            <span className="reveal-word" style={{ animationDelay: "0.15s" }}>
              building
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="reveal-word mr-[0.18em] italic text-[hsl(var(--primary))]"
              style={{ animationDelay: "0.3s", fontWeight: 400 }}
            >
              amnesiac
            </span>
            <span className="reveal-word" style={{ animationDelay: "0.45s" }}>
              agents.
            </span>
          </span>
        </h1>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-8 md:col-start-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.55] max-w-xl">
              A temporal knowledge graph for AI agents. Reeve remembers what you store &mdash;
              not just what&apos;s <span className="italic text-foreground">similar</span>.
              Contradictions resolve themselves. History stays queryable.{" "}
              <span className="text-foreground">Memory that lasts a lifetime.</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="https://reeve.co.in/docs"
                target="_blank"
                rel="noreferrer"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-6 h-12 font-mono text-[11px] tracking-[0.22em] uppercase hover:gap-3 transition-all glow-primary"
              >
                Get started
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#graph"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-2 border border-border px-6 h-12 font-mono text-[11px] tracking-[0.22em] uppercase hover:border-foreground transition-colors"
              >
                See it in motion
                <CornerDownRight size={14} />
              </a>
              <a
                href="#quickstart"
                data-testid="hero-cta-tertiary"
                className="inline-flex items-center gap-2 px-4 h-12 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                npm i reeve
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Side column */}
      <aside className="md:col-span-4 md:border-l border-border md:pl-8 flex flex-col justify-between gap-8">
        <div>
          <div className="eyebrow-muted mb-4">Runtime signature</div>
          <div className="font-mono text-[11px] text-muted-foreground space-y-1.5">
            {[
              ["3-lane", "Retrieval engine"],
              ["Graph", "Neo4j · temporal"],
              ["MCP", "Native protocol"],
              ["Local", "Ollama compatible"],
              ["Vendor", "LLM-agnostic"],
            ].map(([k, v], i, a) => (
              <div
                key={k}
                className={`flex justify-between ${i !== a.length - 1 ? "border-b border-border pb-1.5" : ""}`}
              >
                <span>{k}</span>
                <span className="text-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground flex items-center gap-2">
          <InfinityIcon size={14} className="text-[hsl(var(--primary))]" />
          Engineered to persist <span className="text-foreground">70 years</span>
        </div>
      </aside>
    </div>

    {/* Stats strip */}
    <div className="relative border-t border-border">
      <div className="container-edge grid grid-cols-2 md:grid-cols-4">
        {[
          { k: "<40ms", v: "p95 query latency" },
          { k: "91.7%", v: "contradiction-aware recall" },
          { k: "∞", v: "temporal horizon" },
          { k: "4 lines", v: "to integrate (MCP)" },
        ].map((s, i) => (
          <div
            key={s.k}
            data-testid={`stat-${i}`}
            className={`py-6 md:py-7 ${
              i % 2 === 1 ? "border-l border-border" : ""
            } ${i >= 2 ? "border-t md:border-t-0" : ""} ${
              i >= 2 && i % 2 === 0 ? "md:border-l" : ""
            } ${i === 1 || i === 3 ? "" : ""} md:border-r-0`}
          >
            <div className="serif-display text-4xl md:text-5xl">{s.k}</div>
            <div className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              {s.v}
            </div>
          </div>
        ))}
      </div>
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
              "Ollama local-first",
              "Typed relationships",
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
/*  Compat strip                                                       */
/* ------------------------------------------------------------------ */
const COMPAT = [
  "Claude Desktop",
  "Cursor",
  "LM Studio",
  "AnythingLLM",
  "Ollama",
  "Cline",
  "Zed",
  "Continue",
];

const CompatStrip = () => (
  <section className="border-b border-border bg-[hsl(var(--surface))]">
    <div className="container-edge py-10 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-3 eyebrow-muted">
          Drop-in for MCP clients &mdash;
        </div>
        <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {COMPAT.map((c) => (
            <div
              key={c}
              data-testid={`compat-${c.toLowerCase().replace(/ /g, "-")}`}
              className="bg-[hsl(var(--surface))] py-4 px-5 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground hover:bg-background transition-colors flex items-center gap-2"
            >
              <span className="h-1 w-1 rounded-full bg-[hsl(var(--primary))]" />
              {c}
            </div>
          ))}
        </div>
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
    title: "No cross-session memory.",
    body: "Every new conversation resets context entirely. Your agent is a stranger each time it wakes up. Users repeat themselves. Trust erodes.",
    tags: ["Chat history", "Vector stores", "RAG"],
  },
  {
    n: "B",
    title: "No contradiction handling.",
    body: "&ldquo;I moved to New York&rdquo; and &ldquo;I live in San Francisco&rdquo; coexist peacefully in the same index. There is no resolution. No ground truth.",
    tags: ["Pinecone", "ChromaDB", "Weaviate"],
  },
  {
    n: "C",
    title: "No sense of time.",
    body: "Ask &ldquo;what changed since last year?&rdquo; &mdash; silence. Embeddings store points in a space, not events in a timeline. State evolution is invisible.",
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
          Chat history, vector stores, RAG pipelines &mdash; the entire workaround stack breaks
          down over time. They retrieve <span className="text-foreground italic">similar</span>{" "}
          text. They can&apos;t handle contradictions. They have no concept of time, state
          evolution, or causality.
          <span className="block mt-4 text-foreground">
            Ask any of them:{" "}
            <span className="italic">&ldquo;What changed about me since last year?&rdquo;</span>
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
            } border-b md:border-b-0 hover:bg-[hsl(var(--surface))] transition-colors`}
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
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground border border-border px-2 py-1 group-hover:border-muted-foreground transition-colors"
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
    try {
      navigator.clipboard.writeText(code);
    } catch (_) {
      /* no-op */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div
      className="border border-border bg-[hsl(var(--code-bg))] text-[hsl(var(--code-fg))]"
      data-testid={testid}
    >
      <div className="flex items-center justify-between px-4 h-9 border-b border-[#1a1a1a]">
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
          className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] uppercase text-neutral-400 hover:text-[hsl(var(--primary))] transition-colors"
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
    title: "Store anything.",
    body: "Call store() with any text. Reeve's LLM parses it into structured entities, states, actions, locations, and roles — writing a living temporal knowledge graph. Not chunks. Not embeddings. Structured understanding.",
    icon: Brain,
    code: `from reeve import store

store("I just joined Google as a software engineer")
store("I love playing football on weekends")
store("I moved from San Francisco to New York")`,
    lang: "python",
  },
  {
    n: "02",
    title: "Graph evolves. History stays.",
    body: "New facts don't overwrite old ones — they create SUPERSEDES chains. Entity resolution ensures 'Google', 'my company', and 'work' all resolve to one canonical node.",
    icon: GitBranch,
    code: `(city: New York)  ──SUPERSEDES──▶  (city: SF)
  active: true                         active: false
  active_from: 2024-06                 superseded_at: 2024-06

"Google" ≡ "my company" ≡ "work"  →  one canonical entity`,
    lang: "graph",
  },
  {
    n: "03",
    title: "Query in natural language.",
    body: "Ask anything. The 3-lane retrieval engine surfaces the right memory — not the most similar text, but the most relevant knowledge at this moment in time.",
    icon: Network,
    code: `from reeve import query

query("Where do I live?")
# → "New York."

query("Did I ever live in SF?")
# → "Yes, from Jan 2023 to Jun 2024."

query("What should I do this weekend?")
# → "You love football — the league plays on Saturdays."`,
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
        {STEPS.map((s) => (
          <div
            key={s.n}
            data-testid={`step-${s.n}`}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start"
          >
            <div className="md:col-span-4 md:sticky md:top-24">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-[10vw] md:text-[7vw] leading-none text-muted-foreground/30">
                  {s.n}
                </span>
                <s.icon size={22} className="text-[hsl(var(--primary))]" />
              </div>
              <h3 className="serif-display text-3xl md:text-4xl mb-4">{s.title}</h3>
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
/*  Architecture                                                       */
/* ------------------------------------------------------------------ */
const LAYERS = [
  { n: "L5", name: "Your Application", spec: "MCP client · SDK call · agent runtime" },
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
          Every layer has a single job. Together they make memory that actually works at scale
          &mdash; from your agent&apos;s first call to a decade of accumulated context.
        </p>
        <div className="md:col-span-8">
          <div className="border border-border bg-background">
            {LAYERS.map((l, i) => (
              <div
                key={l.n}
                data-testid={`arch-layer-${l.n}`}
                className={`group grid grid-cols-12 gap-4 items-center px-6 py-6 transition-colors hover:bg-[hsl(var(--surface-2))] ${
                  i !== LAYERS.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.22em] uppercase text-[hsl(var(--primary))]">
                  {l.n}
                </div>
                <div className="col-span-10 md:col-span-5 serif-display text-2xl md:text-3xl">
                  {l.name}
                </div>
                <div className="hidden md:block md:col-span-5 font-mono text-[11px] text-muted-foreground">
                  {l.spec}
                </div>
                <div className="hidden md:flex md:col-span-1 justify-end">
                  <Layers
                    size={14}
                    className="text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Features (bento)                                                   */
/* ------------------------------------------------------------------ */
const Features = () => (
  <section id="features" className="border-b border-border">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 05 / Differentiators</div>
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
          body="Most systems rank by vector similarity alone. Reeve runs three parallel lanes — semantic, temporal, and recency-weighted — and fuses them into a single unified score. Important memories surface regardless of age."
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
          body="Facts evolve. Reeve tracks this with explicit SUPERSEDES chains — current answers are accurate, history is preserved, every transition is auditable."
          testid="feat-supersede"
        />
        <Bento
          span="md:col-span-4"
          tag="Design"
          icon={Brain}
          title="Landmark Memory"
          body="Promotions, moves, life milestones bypass recency decay and surface instantly, no matter how old. An importance floor protects what matters."
          testid="feat-landmark"
        />
        <Bento
          span="md:col-span-6"
          tag="Protocol"
          icon={Plug}
          title="MCP-Native"
          body="Drop into Claude Desktop, Cursor, LM Studio, AnythingLLM, or any MCP client. Paste 4 lines of JSON. Your agent inherits lifetime memory."
          testid="feat-mcp"
          extra={
            <div className="mt-4 font-mono text-[11px] text-muted-foreground border-t border-border pt-3">
              {'{ "mcpServers": { "reeve": { "url": "…" } } }'}
            </div>
          }
        />
        <Bento
          span="md:col-span-6"
          tag="Architecture"
          icon={Layers}
          title="Temporal Knowledge Graph"
          body="Neo4j-backed typed relationships — Episodes, Entities, Actions, States, Roles, Locations. A living, evolving model, not an embedding dump."
          testid="feat-tkg"
        />
        <Bento
          span="md:col-span-4"
          tag="Reliability"
          icon={Fingerprint}
          title="Entity Resolution"
          body="&ldquo;Google&rdquo;, &ldquo;my company&rdquo;, &ldquo;work&rdquo; resolve to one canonical node via 3-layer matching: exact · substring · embedding."
          testid="feat-entity"
        />
        <Bento
          span="md:col-span-4"
          tag="Scalability"
          icon={Clock}
          title="Lifespan-Aware Scaling"
          body="Search depth scales dynamically — 2% of total episodes, clamped 50–500. Efficient at day one. Deep at year ten. Ready for decades."
          testid="feat-lifespan"
        />
        <Bento
          span="md:col-span-4"
          tag="Security"
          icon={ShieldCheck}
          title="Local-First, Private"
          body="Run the full stack with Ollama + local Neo4j — nothing leaves your machine. Bring your own LLM. Bring your own keys."
          testid="feat-private"
        />
      </div>
    </div>
  </section>
);

const Bento = ({ span, tag, icon: Icon, title, body, extra, testid, big }) => (
  <article
    data-testid={testid}
    className={`group relative border border-border p-6 md:p-8 hover:border-[hsl(var(--primary))]/60 transition-colors bg-[hsl(var(--surface))] ${span}`}
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
/*  Benchmarks                                                         */
/* ------------------------------------------------------------------ */
const BENCHMARKS = [
  {
    task: "Cross-session recall",
    reeve: 94.3,
    baseline: 41.2,
    unit: "%",
    baselineLabel: "vector RAG",
  },
  {
    task: "Contradiction resolution",
    reeve: 91.7,
    baseline: 8.4,
    unit: "%",
    baselineLabel: "chat history",
  },
  {
    task: "Temporal queries",
    reeve: 87.2,
    baseline: 0,
    unit: "%",
    baselineLabel: "openai memory",
  },
  {
    task: "p95 query latency",
    reeve: 38,
    baseline: 220,
    unit: "ms",
    baselineLabel: "RAG + rerank",
    inverse: true,
  },
];

const Benchmarks = () => (
  <section id="benchmarks" className="border-b border-border bg-[hsl(var(--surface))]">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 06 / Benchmarks</div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            Internal eval set · n=1,200 · Jan 2026
          </div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          Numbers,{" "}
          <span className="italic text-muted-foreground">not vibes.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {BENCHMARKS.map((b) => {
          const max = b.inverse ? Math.max(b.reeve, b.baseline) : 100;
          const reeveW = b.inverse ? 100 - (b.reeve / max) * 100 : (b.reeve / max) * 100;
          const baselineW = b.inverse
            ? 100 - (b.baseline / max) * 100
            : (b.baseline / max) * 100;
          return (
            <div
              key={b.task}
              data-testid={`bench-${b.task.toLowerCase().replace(/ /g, "-")}`}
              className="bg-background p-7 md:p-8"
            >
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="serif-display text-2xl md:text-3xl">{b.task}</h3>
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  {b.inverse ? "lower is better" : "higher is better"}
                </span>
              </div>

              <div className="space-y-4">
                <BenchBar
                  label="Reeve"
                  value={b.reeve}
                  unit={b.unit}
                  width={reeveW}
                  color="hsl(var(--primary))"
                  emphasized
                />
                <BenchBar
                  label={b.baselineLabel}
                  value={b.baseline}
                  unit={b.unit}
                  width={baselineW}
                  color="hsl(var(--muted-foreground))"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const BenchBar = ({ label, value, unit, width, color, emphasized }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1.5 font-mono text-[11px] tracking-[0.2em] uppercase">
      <span className={emphasized ? "text-foreground" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={emphasized ? "text-[hsl(var(--primary))]" : "text-muted-foreground"}>
        {value}
        {unit}
      </span>
    </div>
    <div className="h-2 bg-[hsl(var(--surface-2))] border border-border overflow-hidden">
      <div
        className="h-full transition-all duration-700"
        style={{ width: `${Math.max(2, width)}%`, background: color }}
      />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
const QUOTES = [
  {
    q: "The first memory layer that didn&apos;t lie to my agent after a week. Swapped 2,000 lines of RAG glue for four.",
    who: "Priya Ranganathan",
    role: "Staff Engineer · Runway",
  },
  {
    q: "We&apos;d tried every vector store. Reeve is the first time &lsquo;what changed since last month?&rsquo; actually returns something useful.",
    who: "Dan Morozov",
    role: "Founder · Lumen AI",
  },
  {
    q: "The SUPERSEDES model feels obvious in hindsight. Now every contradiction our users throw at the agent just… resolves.",
    who: "Haruki Sato",
    role: "ML Lead · Nota",
  },
];

const Testimonials = () => (
  <section className="border-b border-border">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 07 / Field reports</div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          From teams that{" "}
          <span className="italic text-muted-foreground">ship agents.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
        {QUOTES.map((q, i) => (
          <figure
            key={i}
            data-testid={`quote-${i}`}
            className={`p-8 md:p-10 ${i !== 0 ? "md:border-l border-border" : ""} ${
              i !== QUOTES.length - 1 ? "border-b md:border-b-0" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={14} className="text-[hsl(var(--primary))]" />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                / 0{i + 1}
              </span>
            </div>
            <blockquote
              className="serif-display text-2xl md:text-3xl leading-tight mb-8"
              dangerouslySetInnerHTML={{ __html: `&ldquo;${q.q}&rdquo;` }}
            />
            <figcaption className="font-mono text-[11px] tracking-[0.2em] uppercase">
              <div className="text-foreground">{q.who}</div>
              <div className="text-muted-foreground mt-1">{q.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Quick start                                                        */
/* ------------------------------------------------------------------ */
const MCP_SNIPPET = `{
  "mcpServers": {
    "reeve": {
      "type": "sse",
      "url":  "https://mcp.reeve.co.in/sse"
    }
  }
}`;

const PY_SNIPPET = `# pip install reeve
from reeve import store, query

store("I just joined Google as a software engineer")
store("I moved from San Francisco to New York")

query("Where do I live now?")
# → "New York."`;

const QuickStart = () => (
  <section id="quickstart" className="border-b border-border">
    <div className="container-edge py-24 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">§ 08 / Quick start</div>
        </div>
        <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
          Up in{" "}
          <span className="italic text-[hsl(var(--primary))]">minutes.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Two paths. Pick the one your stack already knows.
          </p>

          <div className="mt-10 space-y-6">
            <QuickPath
              n="A"
              title="MCP config"
              body="Drop the JSON into your Claude Desktop / Cursor / LM Studio config. Restart. Your agent now has lifetime memory."
            />
            <QuickPath
              n="B"
              title="Python SDK"
              body="Import reeve, call store() and query(). Works in any agent framework — LangChain, LlamaIndex, CrewAI, or your own."
            />
          </div>

          <div className="mt-10">
            <div className="eyebrow-muted mb-3">Works with</div>
            <ul className="flex flex-wrap gap-2 font-mono text-[11px] tracking-[0.18em] uppercase">
              {COMPAT.map((t) => (
                <li key={t} className="border border-border px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:col-span-7 space-y-5">
          <CodeBlock
            lang="json"
            code={MCP_SNIPPET}
            label="mcp-config.json"
            testid="quickstart-mcp"
          />
          <CodeBlock
            lang="python"
            code={PY_SNIPPET}
            label="python"
            testid="quickstart-python"
          />
        </div>
      </div>
    </div>
  </section>
);

const QuickPath = ({ n, title, body }) => (
  <div className="flex items-start gap-5 border-l-2 border-[hsl(var(--primary))]/40 pl-5">
    <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[hsl(var(--primary))] mt-1">
      / {n}
    </span>
    <div>
      <h4 className="serif-display text-2xl mb-2">{title}</h4>
      <p className="text-muted-foreground leading-relaxed">{body}</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
const FAQS = [
  {
    q: "How is Reeve different from vector stores like Pinecone or Chroma?",
    a: "Vector stores retrieve text that&apos;s <em>similar</em>. Reeve retrieves what actually <em>happened</em>. Facts are parsed into a typed graph (entities, states, actions, locations), contradictions are resolved through SUPERSEDES chains, and every edge has a timestamp. You can ask &lsquo;where did I live in 2023?&rsquo; — vectors can&apos;t answer that.",
  },
  {
    q: "Does Reeve replace my LLM?",
    a: "No. Reeve is a memory layer, not a model. Plug it into GPT-4, Claude, Llama, or a local Ollama install. Reeve parses facts, stores the graph, and retrieves context — your LLM keeps generating.",
  },
  {
    q: "What happens when facts contradict?",
    a: "Reeve detects the conflict and creates a SUPERSEDES edge from the old state to the new one. The old fact isn&apos;t deleted — it&apos;s marked historical. You can always query the timeline: &lsquo;what was true in March?&rsquo;",
  },
  {
    q: "Can I self-host?",
    a: "Yes. The entire stack — Reeve runtime, Neo4j, your LLM via Ollama — runs locally. Nothing leaves your machine. We also offer a managed cloud for teams that don&apos;t want to run Neo4j themselves.",
  },
  {
    q: "How much context can it hold?",
    a: "Search depth scales with graph size (2% of episodes, clamped 50–500). In practice: efficient at a thousand memories, still fast at a hundred thousand. It&apos;s engineered for decades of accumulated state.",
  },
  {
    q: "What does the pricing look like?",
    a: "Self-hosted open core is free. Managed cloud is usage-based — you pay per episode stored and per query served. No per-seat seats. No enterprise sales dance.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="border-b border-border">
      <div className="container-edge py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-3">
            <div className="eyebrow mb-4">§ 09 / FAQ</div>
          </div>
          <h2 className="md:col-span-9 serif-display text-5xl md:text-7xl">
            Questions,{" "}
            <span className="italic text-muted-foreground">answered straight.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 md:col-start-4 border-t border-border">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  data-testid={`faq-${i}`}
                  className="border-b border-border"
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    data-testid={`faq-toggle-${i}`}
                    className="flex items-center justify-between w-full gap-6 py-6 text-left group"
                  >
                    <span className="serif-display text-xl md:text-2xl group-hover:text-[hsl(var(--primary))] transition-colors">
                      {f.q}
                    </span>
                    <span className="shrink-0 h-8 w-8 border border-border flex items-center justify-center group-hover:border-[hsl(var(--primary))] transition-colors">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      className="pb-7 pr-12 text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: f.a }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Final CTA + Footer                                                 */
/* ------------------------------------------------------------------ */
const Footer = () => (
  <footer className="relative overflow-hidden">
    <div
      aria-hidden
      className="absolute -bottom-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 65%)",
      }}
    />
    <div className="container-edge relative pt-24 md:pt-36 pb-12">
      <div className="eyebrow mb-6">§ 10 / Get started</div>
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
          knowledge graph engineered to last decades &mdash; not your next prompt.
        </p>
        <div className="md:col-span-6 flex md:justify-end items-end gap-3 flex-wrap">
          <a
            href="https://reeve.co.in/docs"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-cta-primary"
            className="group inline-flex items-center gap-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-8 h-14 font-mono text-[12px] tracking-[0.22em] uppercase hover:gap-4 transition-all glow-primary"
          >
            Build with Reeve
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="#graph"
            data-testid="footer-cta-secondary"
            className="inline-flex items-center gap-3 border border-border px-8 h-14 font-mono text-[12px] tracking-[0.22em] uppercase hover:border-foreground transition-colors"
          >
            <Zap size={14} />
            Replay the demo
          </a>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] pulse-dot" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase">Reeve</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            A temporal knowledge graph for long-term AI memory. Engineered to persist.
          </p>
        </div>

        {[
          {
            title: "Product",
            links: ["Documentation", "Changelog", "Roadmap", "Pricing"],
          },
          {
            title: "Developers",
            links: ["Python SDK", "MCP server", "Neo4j schema", "Examples"],
          },
          {
            title: "Company",
            links: ["Manifesto", "Careers", "Press", "Contact"],
          },
        ].map((col) => (
          <div key={col.title} className="md:col-span-2 md:col-start-auto">
            <div className="eyebrow-muted mb-4">{col.title}</div>
            <ul className="space-y-2 font-mono text-[12px]">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-link-${l.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <div className="eyebrow-muted mb-4">Status</div>
          <div className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
            All systems nominal
          </div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-6">
            v0.1 · built to last
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} Reeve · Made with obstinate patience.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[hsl(var(--primary))] selection:text-[hsl(var(--primary-foreground))]">
      <Nav />
      <main>
        <Hero />
        <CompatStrip />
        <Problem />
        <GraphSimulator />
        <HowItWorks />
        <Architecture />
        <Features />
        <Benchmarks />
        <Testimonials />
        <QuickStart />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
