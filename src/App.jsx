import { useState } from "react";

const ENGINES = [
  { id: "buy", emoji: "🎣", name: "Buy Engine", desc: "Top of funnel and conversion" },
  { id: "sell", emoji: "🤝", name: "Sell Engine", desc: "Customer acquisition" },
  { id: "rosso", emoji: "🌹", name: "Rosso", desc: "tem's proprietary pricing algorithm" },
];

const SERVICES = [
  { id: "growth", emoji: "📈", name: "Growth Marketing", desc: "Driving awareness and demand generation" },
  { id: "creative", emoji: "🎨", name: "Creative Design", desc: "Visual design and creative production" },
  { id: "brand", emoji: "📣", name: "Brand & Credibility", desc: "Brand strategy, content and market presence" },
  { id: "talent", emoji: "🧲", name: "Talent", desc: "Attracting and hiring the best people" },
  { id: "performance", emoji: "🧑‍💼", name: "Performance", desc: "People ops and performance management" },
  { id: "agents", emoji: "🤖", name: "Agents", desc: "AI agents and automation across the business" },
  { id: "designplatform", emoji: "🖌️", name: "Design Platform", desc: "Design systems and product experience" },
  { id: "platform", emoji: "🖥️", name: "Platform", desc: "Core product and technology platform" },
  { id: "dms", emoji: "📂", name: "DMS", desc: "Data management service" },
  { id: "finance", emoji: "💼", name: "Financial Performance", desc: "FP&A, financial controls, risk management" },
  { id: "legal", emoji: "⚖️", name: "Legal & Regs", desc: "Legal, compliance and regulatory affairs" },
  { id: "billing", emoji: "💳", name: "Billing & Payments", desc: "Billing processes and generator payouts" },
  { id: "market", emoji: "🔌", name: "Market Integration", desc: "Data ingestion and market connectivity" },
];

const DRIVERS = [
  { id: "risk", emoji: "🛡️", name: "Risk Assessment", desc: "Total Foreseeable Loss ÷ Maximum Risk Limit. Measures how much risk we're taking on across the business." },
  { id: "mcr", emoji: "💰", name: "Monthly Contracted Revenue", desc: "Total EAC (MWh) signed (Buy & Sell), fortnightly. A key pulse of commercial health." },
  { id: "fee", emoji: "💳", name: "tem Transaction Fee", desc: "Order + Booking Margin ÷ Gross Transaction Value. How tem makes money — target ~15%." },
  { id: "rev", emoji: "📈", name: "Revenue per Employee", desc: "Annualised Net Transaction Revenue ÷ Headcount. More revenue per person = leaner, stronger business." },
  { id: "retention", emoji: "🔄", name: "Customer Retention", desc: "Volume retained at customer level. Are customers staying?" },
];

const VALUES = [
  { id: "v1", value: "Bullish in our mission", contrast: "Not following the status quo" },
  { id: "v2", value: "Excited but not overwhelmed", contrast: "Stay energised, not paralysed" },
  { id: "v3", value: "Bias for action", contrast: "Not passing over the fence" },
  { id: "v4", value: "Momentum over perfection", contrast: "Ship it, then improve it" },
  { id: "v5", value: "Low ego, high ownership", contrast: "Not arrogance" },
  { id: "v6", value: "Embrace ambiguity", contrast: "Not wait for clarity" },
  { id: "v7", value: "Courage", contrast: "Not carelessness" },
  { id: "v8", value: "Abundance", contrast: "Not scarcity" },
  { id: "v9", value: "Kind", contrast: "Not nice" },
];

const DRIVER_SCENARIOS = [
  { id: 1, scenario: "tem has signed 500 new MWh of energy contracts this fortnight across buy and sell.", answer: "mcr", hint: "This measures contracted energy volume." },
  { id: 2, scenario: "After a deal, tem earned £3,000 on a £20,000 transaction. What driver does this feed?", answer: "fee", hint: "Think about how tem monetises each transaction." },
  { id: 3, scenario: "The team grew from 10 to 12 people but revenue stayed flat. Which driver just got worse?", answer: "rev", hint: "This measures how much money each person generates." },
  { id: 4, scenario: "A large customer renewed their contract for another year at the same volume.", answer: "retention", hint: "This is about keeping customers." },
  { id: 5, scenario: "The risk team flags that total foreseeable losses across open deals are approaching the board limit.", answer: "risk", hint: "This is about how much exposure tem has across the whole business." },
  { id: 6, scenario: "tem just closed its biggest ever deal — a 1,200 MWh buy contract with a major industrial customer.", answer: "mcr", hint: "This deal directly changes how much contracted volume tem holds." },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function ProgressBar({ step, total }) {
  const labels = ["Welcome", "Build It", "Drivers", "Values", "Done"];
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        {labels.map((label, i) => (
          <div key={i} style={{ fontSize: 10, fontWeight: i <= step ? 700 : 400, color: i <= step ? "#FF3F10" : "#bbbbbb", textAlign: "center", flex: 1 }}>{label}</div>
        ))}
      </div>
      <div style={{ background: "#eeeeee", borderRadius: 99, height: 6 }}>
        <div style={{ background: "#FF3F10", height: 6, borderRadius: 99, transition: "width 0.4s", width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  );
}

function Welcome({ onNext }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>💓</div>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: "#222", margin: "0 0 10px", letterSpacing: "-0.5px" }}>Welcome to the Heartbeat</h1>
      <p style={{ color: "#666", fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 24px" }}>
        tem's operating model — the rhythm that keeps us in sync. Before you dive into your role, let's make sure you understand <strong>how the company works</strong> and <strong>what we stand for</strong>.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, maxWidth: 520, margin: "0 auto 28px" }}>
        {[["🏗️", "Build It", "Sort engines & services into the right layer"], ["🎯", "Drivers", "Match metrics to real situations"], ["💡", "Values", "Match tem values to their contrasts"]].map(([e, t, d]) => (
          <div key={t} style={{ background: "#fff5f2", border: "1.5px solid #ffd5c8", borderRadius: 12, padding: "12px 10px" }}>
            <div style={{ fontSize: 24, marginBottom: 5 }}>{e}</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#222", marginBottom: 3 }}>{t}</div>
            <div style={{ fontSize: 11, color: "#888", lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </div>
      <button onClick={onNext} style={S.btnPrimary}>Let's go 💓</button>
    </div>
  );
}

function BuildIt({ onNext }) {
  const all = [...ENGINES.map(e => ({ ...e, type: "engine" })), ...SERVICES.map(s => ({ ...s, type: "service" }))];
  const [placed, setPlaced] = useState({});
  const [dragId, setDragId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [over, setOver] = useState(null);

  const unplaced = all.filter(i => !placed[i.id]);
  const inEngines = all.filter(i => placed[i.id] === "engine");
  const inServices = all.filter(i => placed[i.id] === "service");
  const allPlaced = unplaced.length === 0;
  const score = submitted ? all.filter(i => placed[i.id] === i.type).length : null;

  function drop(e, zone) { e.preventDefault(); setOver(null); if (dragId) { setPlaced(p => ({ ...p, [dragId]: zone })); setDragId(null); } }
  function remove(id) { if (!submitted) setPlaced(p => { const n = { ...p }; delete n[id]; return n; }); }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 6 }}>🏗️</div>
        <h2 style={S.h2}>Build the Heartbeat</h2>
        <p style={{ color: "#888", fontSize: 13 }}>Drag each team into the correct layer — <strong>Engines</strong> (growth) or <strong>Services</strong> (foundation)</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        {[["engine", "🚀 Engines", "Dynamic growth teams"], ["service", "🔧 Services", "Always-on foundation teams"]].map(([zone, label, sub]) => {
          const items = zone === "engine" ? inEngines : inServices;
          return (
            <div key={zone} onDragOver={e => { e.preventDefault(); setOver(zone); }} onDragLeave={() => setOver(null)} onDrop={e => drop(e, zone)}
              style={{ background: over === zone ? "#fff5f2" : "#fafafa", border: `2px dashed ${over === zone ? "#FF3F10" : "#dddddd"}`, borderRadius: 14, padding: 12, minHeight: 200, transition: "all 0.15s" }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#222", marginBottom: 2 }}>{label}</div>
              <div style={{ color: "#aaa", fontSize: 11, marginBottom: 10 }}>{sub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {items.map(item => {
                  const correct = submitted ? placed[item.id] === item.type : null;
                  return (
                    <div key={item.id} draggable={!submitted} onDragStart={() => setDragId(item.id)}
                      style={{ background: submitted ? (correct ? "#f0fdf4" : "#fef2f2") : "#fff", border: `1.5px solid ${submitted ? (correct ? "#86efac" : "#fca5a5") : "#e5e5e5"}`, borderRadius: 10, padding: "7px 10px", display: "flex", alignItems: "center", gap: 8, cursor: submitted ? "default" : "grab" }}>
                      <span style={{ fontSize: 16 }}>{item.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#222" }}>{item.name}</div>
                        <div style={{ fontSize: 10, color: "#aaa" }}>{item.desc}</div>
                      </div>
                      {submitted && <span>{correct ? "✅" : "❌"}</span>}
                      {!submitted && <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 14, padding: 0 }}>×</button>}
                    </div>
                  );
                })}
                {items.length === 0 && <div style={{ color: "#ddd", fontSize: 12, textAlign: "center", padding: "16px 0" }}>drop here</div>}
              </div>
            </div>
          );
        })}
      </div>
      {!submitted && (
        <div style={{ background: "#fafafa", border: "1.5px solid #eeeeee", borderRadius: 14, padding: 12, marginBottom: 14 }}>
          <div style={{ color: "#bbb", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DRAG FROM HERE — {unplaced.length} remaining</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {unplaced.map(item => (
              <div key={item.id} draggable onDragStart={() => setDragId(item.id)}
                style={{ background: "#fff", border: "1.5px solid #e5e5e5", borderRadius: 10, padding: "6px 10px", display: "flex", alignItems: "center", gap: 7, cursor: "grab" }}>
                <span style={{ fontSize: 16 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#222" }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#aaa" }}>{item.desc}</div>
                </div>
              </div>
            ))}
            {allPlaced && <div style={{ color: "#FF3F10", fontWeight: 700, fontSize: 13 }}>✓ All placed — ready to check!</div>}
          </div>
        </div>
      )}
      {submitted ? (
        <div style={{ background: score === all.length ? "#f0fdf4" : "#fafafa", border: `1.5px solid ${score === all.length ? "#86efac" : "#e5e5e5"}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{score === all.length ? "🎉 Perfect!" : `${score}/${all.length} correct`}</div>
            <div style={{ color: "#666", fontSize: 13, marginTop: 3 }}>{score === all.length ? "You've nailed the two-layer structure!" : "Red items were in the wrong layer."}</div>
          </div>
          <button onClick={onNext} style={S.btnPrimary}>Next →</button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setSubmitted(true)} disabled={!allPlaced} style={{ ...S.btnPrimary, opacity: allPlaced ? 1 : 0.4, cursor: allPlaced ? "pointer" : "not-allowed" }}>Check answers</button>
        </div>
      )}
    </div>
  );
}

function DriversGame({ onNext }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const q = DRIVER_SCENARIOS[current];
  const done = current >= DRIVER_SCENARIOS.length;

  function pick(id) { if (selected) return; setSelected(id); if (id === q.answer) setScore(s => s + 1); }
  function next() { setCurrent(c => c + 1); setSelected(null); setShowHint(false); }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 6 }}>🎯</div>
        <h2 style={S.h2}>Company Drivers</h2>
        <p style={{ color: "#888", fontSize: 13 }}>Match each situation to the right company driver</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6, marginBottom: 18 }}>
        {DRIVERS.map(d => (
          <div key={d.id} style={{ background: "#fff", border: `1.5px solid ${selected && q.answer === d.id ? "#FF3F10" : "#eeeeee"}`, borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 18, marginBottom: 3 }}>{d.emoji}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#333", lineHeight: 1.3 }}>{d.name}</div>
          </div>
        ))}
      </div>
      {done ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{score === DRIVER_SCENARIOS.length ? "🏆" : "💪"}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#222", marginBottom: 6 }}>{score}/{DRIVER_SCENARIOS.length} correct</div>
          <div style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>{score === DRIVER_SCENARIOS.length ? "You know your drivers cold!" : "Keep the reference cards above in mind — they'll click soon!"}</div>
          <button onClick={onNext} style={S.btnPrimary}>Next →</button>
        </div>
      ) : (
        <>
          <div style={{ background: "#fff5f2", border: "1.5px solid #ffd5c8", borderRadius: 14, padding: 16, marginBottom: 14 }}>
            <div style={{ color: "#FF3F10", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>SITUATION {current + 1} OF {DRIVER_SCENARIOS.length}</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#222", margin: 0, lineHeight: 1.5 }}>{q.scenario}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
            {DRIVERS.map(d => {
              let bg = "#fff", border = "#e5e5e5", col = "#222";
              if (selected) {
                if (d.id === q.answer) { bg = "#f0fdf4"; border = "#86efac"; }
                else if (d.id === selected) { bg = "#fef2f2"; border = "#fca5a5"; }
                else { bg = "#fafafa"; col = "#aaa"; }
              }
              return (
                <div key={d.id} onClick={() => pick(d.id)}
                  style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "10px 12px", cursor: selected ? "default" : "pointer", transition: "all 0.15s" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{d.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{d.name}</div>
                </div>
              );
            })}
          </div>
          {selected && (
            <div style={{ background: selected === q.answer ? "#f0fdf4" : "#fef2f2", border: `1.5px solid ${selected === q.answer ? "#86efac" : "#fca5a5"}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{selected === q.answer ? "✅ Correct!" : "❌ Not quite!"}</div>
              <div style={{ fontSize: 13, color: "#555" }}>{DRIVERS.find(d => d.id === q.answer).desc}</div>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {!selected && <button onClick={() => setShowHint(h => !h)} style={S.btnSecondary}>💡 Hint</button>}
            {showHint && !selected && <div style={{ fontSize: 13, color: "#888", flex: 1 }}>{q.hint}</div>}
            {selected && <button onClick={next} style={{ ...S.btnPrimary, marginLeft: "auto" }}>{current + 1 === DRIVER_SCENARIOS.length ? "See results →" : "Next →"}</button>}
          </div>
        </>
      )}
    </div>
  );
}

function ValuesGame({ onNext }) {
  const [pairs, setPairs] = useState(() => {
    const shuffledContrasts = shuffle(VALUES.map(v => ({ id: v.id, text: v.contrast })));
    return { contrasts: shuffledContrasts, matched: {}, dragId: null, over: null };
  });
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
  function removeMatch(valueId) { if (!submitted) setPairs(p => { const m = { ...p.matched }; delete m[valueId]; return { ...p, matched: m }; }); }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 6 }}>💡</div>
        <h2 style={S.h2}>tem Values</h2>
        <p style={{ color: "#888", fontSize: 13 }}>Drag each contrast from the right and drop it onto the matching value on the left</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: 1, marginBottom: 8 }}>THE VALUE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {VALUES.map(v => {
              const matchedContrastId = matched[v.id];
              const matchedContrast = contrasts.find(c => c.id === matchedContrastId);
              const correct = submitted ? matched[v.id] === v.id : null;
              return (
                <div key={v.id} onDragOver={e => onDragOver(e, v.id)} onDragLeave={onDragLeave} onDrop={e => onDrop(e, v.id)}
                  style={{ background: submitted ? (correct ? "#f0fdf4" : matchedContrastId ? "#fef2f2" : "#fafafa") : pairs.over === v.id ? "#fff5f2" : "#fafafa", border: `1.5px solid ${submitted ? (correct ? "#86efac" : matchedContrastId ? "#fca5a5" : "#e5e5e5") : pairs.over === v.id ? "#FF3F10" : "#e5e5e5"}`, borderRadius: 10, padding: "9px 12px", minHeight: 52, transition: "all 0.15s" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#222", marginBottom: matchedContrast ? 4 : 0 }}>{v.value}</div>
                  {matchedContrast ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 11, color: submitted ? (correct ? "#16a34a" : "#dc2626") : "#FF3F10", fontStyle: "italic" }}>{matchedContrast.text}</span>
                      {!submitted && <button onClick={() => removeMatch(v.id)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 12, padding: 0, marginLeft: "auto" }}>×</button>}
                      {submitted && <span style={{ marginLeft: "auto" }}>{correct ? "✅" : "❌"}</span>}
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: "#ddd" }}>drop contrast here</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: 1, marginBottom: 8 }}>THE CONTRAST</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {contrasts.map(c => {
              const isPlaced = Object.values(matched).includes(c.id);
              return (
                <div key={c.id} draggable={!submitted && !isPlaced} onDragStart={() => onDragStart(c.id)}
                  style={{ background: isPlaced ? "#f9f9f9" : "#fff", border: `1.5px solid ${isPlaced ? "#eeeeee" : "#e5e5e5"}`, borderRadius: 10, padding: "9px 12px", cursor: submitted || isPlaced ? "default" : "grab", opacity: isPlaced ? 0.35 : 1, fontSize: 13, color: isPlaced ? "#aaa" : "#333", fontWeight: 500, transition: "all 0.15s", minHeight: 38, display: "flex", alignItems: "center" }}>
                  {c.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {submitted ? (
        <div style={{ background: score === VALUES.length ? "#f0fdf4" : "#fafafa", border: `1.5px solid ${score === VALUES.length ? "#86efac" : "#e5e5e5"}`, borderRadius: 12, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{score === VALUES.length ? "🎉 Perfect match!" : `${score}/${VALUES.length} correct`}</div>
            <div style={{ color: "#666", fontSize: 13, marginTop: 3 }}>{score === VALUES.length ? "You know the tem values inside out!" : "Check the red pairs — the correct matches are shown."}</div>
          </div>
          <button onClick={onNext} style={S.btnPrimary}>See results →</button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setSubmitted(true)} disabled={!allMatched} style={{ ...S.btnPrimary, opacity: allMatched ? 1 : 0.4, cursor: allMatched ? "pointer" : "not-allowed" }}>
            {allMatched ? "Check answers" : `Match all ${VALUES.length - Object.keys(matched).length} remaining values first`}
          </button>
        </div>
      )}
    </div>
  );
}

function Results() {
  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 10 }}>💓</div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#222", margin: "0 0 6px" }}>That's the tem Heartbeat!</h2>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>You've completed all three sections. Here's your quick reference to keep.</p>
      <div style={{ background: "#fff", border: "1.5px solid #eeeeee", borderRadius: 16, padding: 20, textAlign: "left", marginBottom: 16 }}>
        <div style={{ color: "#FF3F10", fontWeight: 700, fontSize: 12, marginBottom: 14, letterSpacing: 0.5 }}>QUICK REFERENCE — THE HEARTBEAT</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#333", marginBottom: 8 }}>🚀 The Three Engines</div>
            {ENGINES.map(e => <div key={e.id} style={{ fontSize: 12, color: "#666", marginBottom: 5, display: "flex", gap: 6 }}><span>{e.emoji}</span><span>{e.name}</span></div>)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#333", marginBottom: 8 }}>🔧 The Services</div>
            {SERVICES.map(s => <div key={s.id} style={{ fontSize: 12, color: "#666", marginBottom: 5, display: "flex", gap: 6 }}><span>{s.emoji}</span><span>{s.name}</span></div>)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#333", marginBottom: 8 }}>🎯 The Five Drivers</div>
            {DRIVERS.map(d => <div key={d.id} style={{ fontSize: 12, color: "#666", marginBottom: 5, display: "flex", gap: 6 }}><span>{d.emoji}</span><span>{d.name}</span></div>)}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #eeeeee", paddingTop: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#333", marginBottom: 8 }}>💡 tem Values</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            {VALUES.map(v => (
              <div key={v.id} style={{ fontSize: 11, color: "#666", background: "#fafafa", borderRadius: 8, padding: "6px 8px" }}>
                <span style={{ fontWeight: 700, color: "#222" }}>{v.value}</span><br />
                <span style={{ color: "#aaa" }}>{v.contrast}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ color: "#aaa", fontSize: 12 }}>💓 tem — The Heartbeat keeps us in sync</div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", background: "#f2f2f2", padding: "24px 16px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {step > 0 && step < 5 && <ProgressBar step={step} total={4} />}
        <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
          {step === 0 && <Welcome onNext={() => setStep(1)} />}
          {step === 1 && <BuildIt onNext={() => setStep(2)} />}
          {step === 2 && <DriversGame onNext={() => setStep(3)} />}
          {step === 3 && <ValuesGame onNext={() => setStep(4)} />}
          {step === 4 && <Results />}
        </div>
      </div>
    </div>
  );
}

const S = {
  btnPrimary: { background: "#FF3F10", color: "#fff", fontWeight: 700, border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontSize: 14 },
  btnSecondary: { background: "#fff", color: "#666", fontWeight: 600, border: "1.5px solid #e5e5e5", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13 },
  h2: { fontSize: 20, fontWeight: 800, color: "#222", margin: "0 0 6px", letterSpacing: "-0.3px" },
};
