import { useState } from "react";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const ENGINES = [
  { id: "buy",   name: "Buy Engine",  desc: "Top of funnel and conversion" },
  { id: "sell",  name: "Sell Engine", desc: "Customer acquisition" },
  { id: "rosso", name: "Rosso",       desc: "tem's proprietary pricing algorithm" },
];

const SERVICES = [
  { id: "growth",         name: "Growth Marketing",       desc: "Driving awareness and demand generation" },
  { id: "creative",       name: "Creative Design",        desc: "Visual design and creative production" },
  { id: "brand",          name: "Brand & Credibility",    desc: "Brand strategy, content and market presence" },
  { id: "talent",         name: "Talent",                 desc: "Attracting and hiring the best people" },
  { id: "performance",    name: "Performance",            desc: "People ops and performance management" },
  { id: "agents",         name: "Agents",                 desc: "AI agents and automation across the business" },
  { id: "designplatform", name: "Design Platform",        desc: "Design systems and product experience" },
  { id: "platform",       name: "Platform",               desc: "Core product and technology platform" },
  { id: "dms",            name: "DMS",                    desc: "Data management service" },
  { id: "finance",        name: "Financial Performance",  desc: "FP&A, financial controls, risk management" },
  { id: "legal",          name: "Legal & Regs",           desc: "Legal, compliance and regulatory affairs" },
  { id: "billing",        name: "Billing & Payments",     desc: "Billing processes and generator payouts" },
  { id: "market",         name: "Market Integration",     desc: "Data ingestion and market connectivity" },
];

const DRIVERS = [
  { id: "risk",      name: "Risk Assessment",        desc: "Total Foreseeable Loss ÷ Maximum Risk Limit. Measures how much risk we're taking on across the business." },
  { id: "mcr",       name: "Monthly Contracted Revenue", desc: "Total EAC (MWh) signed (Buy & Sell), fortnightly. A key pulse of commercial health." },
  { id: "fee",       name: "tem Transaction Fee",    desc: "Order + Booking Margin ÷ Gross Transaction Value. How tem makes money — target ~15%." },
  { id: "rev",       name: "Revenue per Employee",   desc: "Annualised Net Transaction Revenue ÷ Headcount. More revenue per person = leaner, stronger business." },
  { id: "retention", name: "Customer Retention",     desc: "Volume retained at customer level. Are customers staying?" },
];

const VALUES = [
  { id: "v1", value: "Bullish in our mission",    contrast: "Not following the status quo" },
  { id: "v2", value: "Excited but not overwhelmed", contrast: "Stay energised, not paralysed" },
  { id: "v3", value: "Bias for action",           contrast: "Not passing over the fence" },
  { id: "v4", value: "Momentum over perfection",  contrast: "Ship it, then improve it" },
  { id: "v5", value: "Low ego, high ownership",   contrast: "Not arrogance" },
  { id: "v6", value: "Embrace ambiguity",         contrast: "Not wait for clarity" },
  { id: "v7", value: "Courage",                   contrast: "Not carelessness" },
  { id: "v8", value: "Abundance",                 contrast: "Not scarcity" },
  { id: "v9", value: "Kind",                      contrast: "Not nice" },
];

const DRIVER_SCENARIOS = [
  { id: 1, scenario: "tem has signed 500 new MWh of energy contracts this fortnight across buy and sell.", answer: "mcr", hint: "This measures contracted energy volume." },
  { id: 2, scenario: "After a deal, tem earned £3,000 on a £20,000 transaction. What driver does this feed?", answer: "fee", hint: "Think about how tem monetises each transaction." },
  { id: 3, scenario: "The team grew from 10 to 12 people but revenue stayed flat. Which driver just got worse?", answer: "rev", hint: "This measures how much money each person generates." },
  { id: 4, scenario: "A large customer renewed their contract for another year at the same volume.", answer: "retention", hint: "This is about keeping customers." },
  { id: 5, scenario: "The risk team flags that total foreseeable losses across open deals are approaching the board limit.", answer: "risk", hint: "This is about how much exposure tem has across the whole business." },
  { id: 6, scenario: "tem just closed its biggest ever deal — a 1,200 MWh buy contract with a major industrial customer.", answer: "mcr", hint: "This deal directly changes how much contracted volume tem holds." },
];

/* ─── Tokens (mirrored from CSS vars for inline styles) ─────────────────── */

const T = {
  solarRed:       "#FF3F10",
  orange:         "#FF7700",
  ultraSoftWhite: "#FEFEFE",
  softWhite:      "#F8F8F8",
  fog:            "#EEEEEE",
  mist:           "#E4E4E4",
  silver:         "#D4D4D4",
  slate:          "#767676",
  ash:            "#4A4A4A",
  charcoal:       "#222222",
  ink:            "#141414",
  lavender:       "#E5E0FF",
  lavenderText:   "#3B2B8A",
  mint:           "#E4FFF5",
  mintText:       "#0B5F3A",
  mintDot:        "#1F8A4C",
  dew:            "#F7FFE9",
  warnBg:         "#FFF0E4",
  warnText:       "#8A3E00",
  errBg:          "#FFEDE6",
  errText:        "#9E2600",
  fontDisplay:    '"DM Serif Display", Georgia, "Times New Roman", serif',
  fontSans:       '"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
};

const gradSun = "linear-gradient(180deg,#FF3F10 0%,#FF3F10 36%,#FF6305 52%,#FF8E2A 66%,#FFC38E 80%,#FEDCBE 90%,#FEF1E5 96%,#F8F8F8 100%)";

/* ─── Shared style helpers ───────────────────────────────────────────────── */

const S = {
  btnPrimary: {
    background: T.solarRed, color: "#fff",
    fontFamily: T.fontSans, fontWeight: 500, fontSize: 14,
    border: "none", borderRadius: 8, padding: "0 20px", height: 40,
    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
    whiteSpace: "nowrap",
  },
  btnSecondary: {
    background: T.ink, color: "#fff",
    fontFamily: T.fontSans, fontWeight: 500, fontSize: 14,
    border: "none", borderRadius: 8, padding: "0 20px", height: 40,
    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
    whiteSpace: "nowrap",
  },
  btnGhost: {
    background: "transparent", color: T.ash,
    fontFamily: T.fontSans, fontWeight: 500, fontSize: 13,
    border: `1px solid ${T.mist}`, borderRadius: 8, padding: "0 16px", height: 36,
    cursor: "pointer", display: "inline-flex", alignItems: "center",
  },
  panel: {
    background: "#fff", border: `1px solid ${T.fog}`,
    borderRadius: 12, padding: 24,
  },
  sectionLabel: {
    fontFamily: T.fontSans, fontSize: 11, fontWeight: 600,
    letterSpacing: "0.12em", textTransform: "uppercase", color: T.slate,
    marginBottom: 8,
  },
  h2: {
    fontFamily: T.fontDisplay, fontWeight: 600,
    fontSize: 28, letterSpacing: "0.01em", color: T.ink, margin: "0 0 6px",
  },
  bodySmall: { fontFamily: T.fontSans, fontSize: 13, color: T.slate, lineHeight: 1.6 },
};

/* ─── Pill component ─────────────────────────────────────────────────────── */

function Pill({ variant = "neu", children }) {
  const styles = {
    ok:   { bg: T.mint,    color: T.mintText,   dot: T.mintDot  },
    warn: { bg: T.warnBg,  color: T.warnText,   dot: T.orange   },
    err:  { bg: T.errBg,   color: T.errText,    dot: T.solarRed },
    neu:  { bg: T.fog,     color: T.ash,        dot: null       },
    lav:  { bg: T.lavender,color: T.lavenderText,dot: null      },
  };
  const { bg, color, dot } = styles[variant] || styles.neu;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "0 16px", height: 26, borderRadius: 999,
      background: bg, color, fontFamily: T.fontSans,
      fontSize: 11, fontWeight: 500, letterSpacing: "0.04em",
      whiteSpace: "nowrap",
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: dot, flexShrink: 0 }} />}
      {children}
    </span>
  );
}

/* ─── Header ─────────────────────────────────────────────────────────────── */

function ArtifactHeader({ title, subtitle }) {
  return (
    <header style={{
      background: gradSun,
      padding: "32px 48px 48px",
      color: "#fff",
    }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 12px 6px 14px", borderRadius: 999,
        background: "#FFFFFF", color: T.solarRed,
        fontSize: 10, fontWeight: 600,
        letterSpacing: "0.16em", textTransform: "uppercase",
        marginBottom: 12,
      }}>
        Made with Tem 🚀
      </div>
      <h1 style={{
        fontFamily: T.fontDisplay, fontWeight: 600,
        fontSize: 56, letterSpacing: "0.01em", lineHeight: 1,
        margin: 0, color: "#FFFFFF",
      }}>
        {title}
      </h1>
      <p style={{
        fontFamily: T.fontSans, fontWeight: 500, fontSize: 13, color: "#FFFFFF",
        margin: "12px 0 0",
      }}>
        {subtitle}
      </p>
    </header>
  );
}

/* ─── Progress bar ───────────────────────────────────────────────────────── */

function ProgressBar({ step, total }) {
  const labels = ["Welcome", "Build It", "Drivers", "Values", "Done"];
  return (
    <div style={{ padding: "16px 48px 0", background: "#fff", borderBottom: `1px solid ${T.fog}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        {labels.map((label, i) => (
          <div key={i} style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
            color: i < step ? T.solarRed : i === step ? T.ink : T.silver,
            flex: 1, textAlign: "center",
            fontFamily: T.fontSans,
          }}>
            {label}
          </div>
        ))}
      </div>
      <div style={{ background: T.fog, height: 3, marginBottom: 0 }}>
        <div style={{
          background: T.solarRed, height: 3,
          transition: "width 0.4s ease",
          width: `${(step / total) * 100}%`,
        }} />
      </div>
    </div>
  );
}

/* ─── Welcome ────────────────────────────────────────────────────────────── */

function Welcome({ onNext }) {
  const cards = [
    { label: "Build It",   desc: "Sort engines and services into the right layer" },
    { label: "Drivers",    desc: "Match metrics to real-world situations" },
    { label: "Values",     desc: "Match tem values to their contrasts" },
  ];
  return (
    <div style={{ padding: "40px 48px" }}>
      <p style={{ ...S.bodySmall, maxWidth: 560, marginBottom: 32 }}>
        tem's operating model — the rhythm that keeps us in sync. Before you dive into your role,
        let's make sure you understand <strong style={{ color: T.ink }}>how the company works</strong> and <strong style={{ color: T.ink }}>what we stand for</strong>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36 }}>
        {cards.map(({ label, desc }) => (
          <div key={label} style={{ ...S.panel, padding: 20 }}>
            <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 14, color: T.ink, marginBottom: 6 }}>{label}</div>
            <div style={{ fontFamily: T.fontSans, fontSize: 12, color: T.slate, lineHeight: 1.5 }}>{desc}</div>
          </div>
        ))}
      </div>
      <button onClick={onNext} style={S.btnPrimary}>
        Let's go
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4"/>
        </svg>
      </button>
    </div>
  );
}

/* ─── Build It ───────────────────────────────────────────────────────────── */

function BuildIt({ onNext }) {
  const all = [
    ...ENGINES.map(e => ({ ...e, type: "engine" })),
    ...SERVICES.map(s => ({ ...s, type: "service" })),
  ];
  const [placed, setPlaced]     = useState({});
  const [dragId, setDragId]     = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [over, setOver]         = useState(null);

  const unplaced   = all.filter(i => !placed[i.id]);
  const inEngines  = all.filter(i => placed[i.id] === "engine");
  const inServices = all.filter(i => placed[i.id] === "service");
  const allPlaced  = unplaced.length === 0;
  const score      = submitted ? all.filter(i => placed[i.id] === i.type).length : null;

  function drop(e, zone) {
    e.preventDefault(); setOver(null);
    if (dragId) { setPlaced(p => ({ ...p, [dragId]: zone })); setDragId(null); }
  }
  function remove(id) {
    if (!submitted) setPlaced(p => { const n = { ...p }; delete n[id]; return n; });
  }

  return (
    <div style={{ padding: "32px 48px" }}>
      <p style={{ ...S.bodySmall, marginBottom: 24 }}>
        Drag each team into the correct layer — <strong style={{ color: T.ink }}>Engines</strong> (growth) or <strong style={{ color: T.ink }}>Services</strong> (always-on foundation).
      </p>

      {/* Drop zones */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {[["engine", "Engines", "Dynamic growth teams"], ["service", "Services", "Always-on foundation teams"]].map(([zone, label, sub]) => {
          const items = zone === "engine" ? inEngines : inServices;
          const isOver = over === zone;
          return (
            <div key={zone}
              onDragOver={e => { e.preventDefault(); setOver(zone); }}
              onDragLeave={() => setOver(null)}
              onDrop={e => drop(e, zone)}
              style={{
                background: isOver ? "#FEF1E5" : T.softWhite,
                border: `1.5px dashed ${isOver ? T.solarRed : T.silver}`,
                borderRadius: 12, padding: 16, minHeight: 220,
                transition: "all 0.15s",
              }}
            >
              <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 13, color: T.ink, marginBottom: 2 }}>{label}</div>
              <div style={{ fontFamily: T.fontSans, fontSize: 11, color: T.slate, marginBottom: 12 }}>{sub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {items.map(item => {
                  const correct = submitted ? placed[item.id] === item.type : null;
                  return (
                    <div key={item.id}
                      draggable={!submitted}
                      onDragStart={() => setDragId(item.id)}
                      style={{
                        background: submitted ? (correct ? T.mint : T.errBg) : "#fff",
                        border: `1px solid ${submitted ? (correct ? T.mintDot : T.solarRed) : T.fog}`,
                        borderRadius: 8, padding: "8px 12px",
                        display: "flex", alignItems: "center", gap: 10,
                        cursor: submitted ? "default" : "grab",
                        fontFamily: T.fontSans,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: T.slate }}>{item.desc}</div>
                      </div>
                      {submitted && (
                        <Pill variant={correct ? "ok" : "err"}>{correct ? "Correct" : "Wrong"}</Pill>
                      )}
                      {!submitted && (
                        <button onClick={() => remove(item.id)} style={{
                          background: "none", border: "none", color: T.silver,
                          cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1,
                        }}>×</button>
                      )}
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <div style={{ color: T.silver, fontSize: 12, textAlign: "center", padding: "24px 0", fontFamily: T.fontSans }}>
                    Drop here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unplaced tray */}
      {!submitted && (
        <div style={{ ...S.panel, marginBottom: 16, padding: 16 }}>
          <div style={{ ...S.sectionLabel }}>
            Drag from here &mdash; {unplaced.length} remaining
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {unplaced.map(item => (
              <div key={item.id} draggable onDragStart={() => setDragId(item.id)}
                style={{
                  background: T.softWhite, border: `1px solid ${T.fog}`,
                  borderRadius: 8, padding: "6px 12px",
                  cursor: "grab", fontFamily: T.fontSans,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{item.name}</div>
                <div style={{ fontSize: 10, color: T.slate }}>{item.desc}</div>
              </div>
            ))}
            {allPlaced && (
              <div style={{ fontFamily: T.fontSans, fontSize: 13, fontWeight: 500, color: T.mintText, alignSelf: "center" }}>
                All placed — ready to check
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      {submitted ? (
        <div style={{
          ...S.panel, padding: 16,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: score === all.length ? T.mint : T.softWhite,
          borderColor: score === all.length ? T.mintDot : T.fog,
        }}>
          <div>
            <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 16, color: T.ink }}>
              {score === all.length ? "Perfect score" : `${score} / ${all.length} correct`}
            </div>
            <div style={{ ...S.bodySmall, marginTop: 2 }}>
              {score === all.length ? "You've nailed the two-layer structure." : "Red items were in the wrong layer."}
            </div>
          </div>
          <button onClick={onNext} style={S.btnPrimary}>
            Next
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </div>
      ) : (
        <button onClick={() => setSubmitted(true)} disabled={!allPlaced}
          style={{ ...S.btnPrimary, opacity: allPlaced ? 1 : 0.35, cursor: allPlaced ? "pointer" : "not-allowed" }}
        >
          Check answers
        </button>
      )}
    </div>
  );
}

/* ─── Drivers game ───────────────────────────────────────────────────────── */

function DriversGame({ onNext }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore]     = useState(0);
  const [showHint, setShowHint] = useState(false);
  const q    = DRIVER_SCENARIOS[current];
  const done = current >= DRIVER_SCENARIOS.length;

  function pick(id) { if (selected) return; setSelected(id); if (id === q.answer) setScore(s => s + 1); }
  function next() { setCurrent(c => c + 1); setSelected(null); setShowHint(false); }

  return (
    <div style={{ padding: "32px 48px" }}>
      {/* Driver reference pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {DRIVERS.map(d => (
          <div key={d.id} style={{
            ...S.panel, padding: "10px 14px",
            borderColor: selected && q?.answer === d.id ? T.solarRed : T.fog,
            flex: "0 0 auto",
          }}>
            <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 11, color: T.ink }}>{d.name}</div>
          </div>
        ))}
      </div>

      {done ? (
        <div style={{ ...S.panel, textAlign: "center", padding: "40px 24px" }}>
          <Pill variant={score === DRIVER_SCENARIOS.length ? "ok" : "neu"}>
            {score === DRIVER_SCENARIOS.length ? "Full marks" : `${score} / ${DRIVER_SCENARIOS.length} correct`}
          </Pill>
          <div style={{ fontFamily: T.fontDisplay, fontSize: 32, color: T.ink, margin: "16px 0 8px" }}>
            {score === DRIVER_SCENARIOS.length ? "You know your drivers cold." : "Keep the reference cards in mind."}
          </div>
          <p style={{ ...S.bodySmall, marginBottom: 24 }}>
            {score === DRIVER_SCENARIOS.length
              ? "All six situations mapped correctly."
              : "Review the cards above — they'll click soon."}
          </p>
          <button onClick={onNext} style={S.btnPrimary}>
            Next
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </div>
      ) : (
        <>
          {/* Scenario card */}
          <div style={{
            background: "#FEF1E5",
            border: `1px solid #FEDCBE`,
            borderRadius: 12, padding: 20, marginBottom: 20,
          }}>
            <div style={{ ...S.sectionLabel, color: T.solarRed }}>
              Situation {current + 1} of {DRIVER_SCENARIOS.length}
            </div>
            <p style={{ fontFamily: T.fontSans, fontWeight: 500, fontSize: 15, color: T.ink, margin: 0, lineHeight: 1.6 }}>
              {q.scenario}
            </p>
          </div>

          {/* Driver options */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
            {DRIVERS.map(d => {
              let bg = "#fff", border = T.fog, color = T.ink;
              if (selected) {
                if (d.id === q.answer)      { bg = T.mint;   border = T.mintDot; }
                else if (d.id === selected) { bg = T.errBg;  border = T.solarRed; }
                else                        { bg = T.softWhite; color = T.silver; }
              }
              return (
                <div key={d.id} onClick={() => pick(d.id)}
                  style={{
                    background: bg, border: `1px solid ${border}`,
                    borderRadius: 8, padding: "12px 14px",
                    cursor: selected ? "default" : "pointer",
                    transition: "all 0.12s", fontFamily: T.fontSans,
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13, color }}>{d.name}</div>
                </div>
              );
            })}
          </div>

          {/* Feedback */}
          {selected && (
            <div style={{
              ...S.panel,
              background: selected === q.answer ? T.mint : T.errBg,
              borderColor: selected === q.answer ? T.mintDot : T.solarRed,
              marginBottom: 16,
            }}>
              <Pill variant={selected === q.answer ? "ok" : "err"}>
                {selected === q.answer ? "Correct" : "Not quite"}
              </Pill>
              <p style={{ ...S.bodySmall, marginTop: 8, marginBottom: 0 }}>
                {DRIVERS.find(d => d.id === q.answer).desc}
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {!selected && (
              <button onClick={() => setShowHint(h => !h)} style={S.btnGhost}>
                Hint
              </button>
            )}
            {showHint && !selected && (
              <span style={{ ...S.bodySmall, flex: 1 }}>{q.hint}</span>
            )}
            {selected && (
              <button onClick={next} style={{ ...S.btnPrimary, marginLeft: "auto" }}>
                {current + 1 === DRIVER_SCENARIOS.length ? "See results" : "Next"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Values game ────────────────────────────────────────────────────────── */

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function ValuesGame({ onNext }) {
  const [pairs, setPairs] = useState(() => ({
    contrasts: shuffle(VALUES.map(v => ({ id: v.id, text: v.contrast }))),
    matched: {},
    dragId: null,
    over: null,
  }));
  const [submitted, setSubmitted] = useState(false);
  const { contrasts, matched } = pairs;
  const allMatched = Object.keys(matched).length === VALUES.length;
  const score = submitted ? VALUES.filter(v => matched[v.id] === v.id).length : null;

  function onDragStart(id) { setPairs(p => ({ ...p, dragId: id })); }
  function onDragOver(e, id) { e.preventDefault(); setPairs(p => ({ ...p, over: id })); }
  function onDragLeave() { setPairs(p => ({ ...p, over: null })); }
  function onDrop(e, valueId) {
    e.preventDefault();
    const { dragId } = pairs;
    if (!dragId) return;
    const newMatched = { ...matched };
    Object.keys(newMatched).forEach(k => { if (newMatched[k] === dragId) delete newMatched[k]; });
    newMatched[valueId] = dragId;
    setPairs(p => ({ ...p, matched: newMatched, dragId: null, over: null }));
  }
  function removeMatch(valueId) {
    if (!submitted) setPairs(p => { const m = { ...p.matched }; delete m[valueId]; return { ...p, matched: m }; });
  }

  return (
    <div style={{ padding: "32px 48px" }}>
      <p style={{ ...S.bodySmall, marginBottom: 24 }}>
        Drag each contrast from the right and drop it onto the matching value on the left.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Values column */}
        <div>
          <div style={S.sectionLabel}>The value</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {VALUES.map(v => {
              const matchedContrastId = matched[v.id];
              const matchedContrast   = contrasts.find(c => c.id === matchedContrastId);
              const correct           = submitted ? matched[v.id] === v.id : null;
              const isOver            = pairs.over === v.id;
              return (
                <div key={v.id}
                  onDragOver={e => onDragOver(e, v.id)}
                  onDragLeave={onDragLeave}
                  onDrop={e => onDrop(e, v.id)}
                  style={{
                    background: submitted
                      ? correct ? T.mint : matchedContrastId ? T.errBg : T.softWhite
                      : isOver ? "#FEF1E5" : "#fff",
                    border: `1px solid ${
                      submitted
                        ? correct ? T.mintDot : matchedContrastId ? T.solarRed : T.fog
                        : isOver ? T.solarRed : T.fog
                    }`,
                    borderRadius: 8, padding: "10px 12px", minHeight: 54,
                    transition: "all 0.12s", fontFamily: T.fontSans,
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13, color: T.ink, marginBottom: matchedContrast ? 4 : 0 }}>
                    {v.value}
                  </div>
                  {matchedContrast ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{
                        fontSize: 11, color: submitted ? (correct ? T.mintText : T.errText) : T.solarRed,
                        fontStyle: "italic",
                      }}>
                        {matchedContrast.text}
                      </span>
                      {!submitted && (
                        <button onClick={() => removeMatch(v.id)} style={{
                          background: "none", border: "none", color: T.silver,
                          cursor: "pointer", fontSize: 14, padding: 0, marginLeft: "auto",
                        }}>×</button>
                      )}
                      {submitted && (
                        <Pill variant={correct ? "ok" : "err"} style={{ marginLeft: "auto" }}>
                          {correct ? "Correct" : "Wrong"}
                        </Pill>
                      )}
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: T.silver }}>Drop contrast here</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contrasts column */}
        <div>
          <div style={S.sectionLabel}>The contrast</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {contrasts.map(c => {
              const isPlaced = Object.values(matched).includes(c.id);
              return (
                <div key={c.id}
                  draggable={!submitted && !isPlaced}
                  onDragStart={() => onDragStart(c.id)}
                  style={{
                    background: isPlaced ? T.softWhite : "#fff",
                    border: `1px solid ${T.fog}`,
                    borderRadius: 8, padding: "10px 12px",
                    cursor: submitted || isPlaced ? "default" : "grab",
                    opacity: isPlaced ? 0.3 : 1,
                    fontFamily: T.fontSans, fontSize: 13,
                    fontWeight: 500, color: T.ash,
                    transition: "opacity 0.15s", minHeight: 38,
                    display: "flex", alignItems: "center",
                  }}
                >
                  {c.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {submitted ? (
        <div style={{
          ...S.panel,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: score === VALUES.length ? T.mint : T.softWhite,
          borderColor: score === VALUES.length ? T.mintDot : T.fog,
        }}>
          <div>
            <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 16, color: T.ink }}>
              {score === VALUES.length ? "Perfect match" : `${score} / ${VALUES.length} correct`}
            </div>
            <div style={{ ...S.bodySmall, marginTop: 2 }}>
              {score === VALUES.length ? "You know the tem values inside out." : "Check the red pairs — correct matches are shown."}
            </div>
          </div>
          <button onClick={onNext} style={S.btnPrimary}>
            See results
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </button>
        </div>
      ) : (
        <button onClick={() => setSubmitted(true)} disabled={!allMatched}
          style={{ ...S.btnPrimary, opacity: allMatched ? 1 : 0.35, cursor: allMatched ? "pointer" : "not-allowed" }}
        >
          {allMatched ? "Check answers" : `Match all ${VALUES.length - Object.keys(matched).length} remaining`}
        </button>
      )}
    </div>
  );
}

/* ─── Results ────────────────────────────────────────────────────────────── */

function Results() {
  return (
    <div style={{ padding: "32px 48px" }}>
      <p style={{ ...S.bodySmall, marginBottom: 28 }}>
        You've completed all three sections. Here's your quick reference to keep.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
        {/* Engines */}
        <div style={S.panel}>
          <div style={S.sectionLabel}>The three engines</div>
          {ENGINES.map(e => (
            <div key={e.id} style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 13, color: T.ink }}>{e.name}</div>
              <div style={{ fontFamily: T.fontSans, fontSize: 11, color: T.slate }}>{e.desc}</div>
            </div>
          ))}
        </div>

        {/* Drivers */}
        <div style={S.panel}>
          <div style={S.sectionLabel}>The five drivers</div>
          {DRIVERS.map(d => (
            <div key={d.id} style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 13, color: T.ink }}>{d.name}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={S.panel}>
          <div style={S.sectionLabel}>tem values</div>
          {VALUES.map(v => (
            <div key={v.id} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 12, color: T.ink }}>{v.value}</div>
              <div style={{ fontFamily: T.fontSans, fontSize: 11, color: T.slate, fontStyle: "italic" }}>{v.contrast}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services panel */}
      <div style={S.panel}>
        <div style={S.sectionLabel}>The services</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px 16px" }}>
          {SERVICES.map(s => (
            <div key={s.id}>
              <div style={{ fontFamily: T.fontSans, fontWeight: 600, fontSize: 12, color: T.ink }}>{s.name}</div>
              <div style={{ fontFamily: T.fontSans, fontSize: 11, color: T.slate }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontFamily: T.fontSans, fontSize: 11, color: T.silver, marginTop: 20, textAlign: "center" }}>
        The Heartbeat keeps tem in sync
      </div>
    </div>
  );
}

/* ─── App shell ──────────────────────────────────────────────────────────── */

export default function App() {
  const [step, setStep] = useState(0);

  const stepMeta = [
    { title: "The tem Heartbeat",   subtitle: "How the company works and what we stand for" },
    { title: "Build the Heartbeat", subtitle: "Sort engines and services into the right layer" },
    { title: "Company Drivers",     subtitle: "Match each situation to the right driver" },
    { title: "tem Values",          subtitle: "Match each value to its contrast" },
    { title: "All done",            subtitle: "Your quick reference to keep" },
  ];

  const { title, subtitle } = stepMeta[step] || stepMeta[0];

  return (
    <div style={{
      fontFamily: T.fontSans,
      minHeight: "100vh",
      background: T.softWhite,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", paddingBottom: 48 }}>
        <div style={{ background: "#fff", border: `1px solid ${T.fog}`, borderRadius: 0, overflow: "hidden" }}>
          <ArtifactHeader title={title} subtitle={subtitle} />
          {step > 0 && step < 5 && <ProgressBar step={step} total={4} />}

          {step === 0 && <Welcome     onNext={() => setStep(1)} />}
          {step === 1 && <BuildIt     onNext={() => setStep(2)} />}
          {step === 2 && <DriversGame onNext={() => setStep(3)} />}
          {step === 3 && <ValuesGame  onNext={() => setStep(4)} />}
          {step === 4 && <Results />}
        </div>
      </div>
    </div>
  );
}
