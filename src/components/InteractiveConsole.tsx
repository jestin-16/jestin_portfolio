import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, Code2, Cpu, Database, Globe2, List, Play, RotateCcw, Route, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "motion/react";

const tabs = [
  { id: "flow", label: "Request flow", icon: Route },
  { id: "activity", label: "Activity", icon: List },
  { id: "runtime", label: "Runtime", icon: Cpu },
] as const;
const steps = [
  { title: "Receive", detail: "A request arrives at the API.", icon: Globe2 },
  { title: "Protect", detail: "Validate access at the boundary.", icon: ShieldCheck },
  { title: "Process", detail: "Run one focused service operation.", icon: Code2 },
  { title: "Persist", detail: "Read or write through the data layer.", icon: Database },
];
const endpoints = [
  { value: "/api/v1/db-fetch", label: "GET /projects", action: "Project records retrieved." },
  { value: "/api/v1/auth", label: "POST /auth", action: "Authentication flow completed." },
  { value: "/api/v1/secure-vault", label: "GET /secure-vault", action: "Protected resource retrieved." },
  { value: "/api/v1/metrics", label: "GET /metrics", action: "Service health collected." },
];
type TabId = typeof tabs[number]["id"];

export default function InteractiveConsole() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabId>("flow");
  const [endpoint, setEndpoint] = useState(endpoints[0].value);
  const [phase, setPhase] = useState<number | null>(null);
  const [heapMemory, setHeapMemory] = useState(58);
  const [collecting, setCollecting] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const running = phase !== null && phase < steps.length;
  const complete = phase === steps.length;
  const selectedEndpoint = endpoints.find((item) => item.value === endpoint)!;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setPhase((current) => current === null ? null : current + 1), reduceMotion ? 0 : 450);
    return () => window.clearTimeout(timer);
  }, [phase, running, reduceMotion]);

  useEffect(() => {
    if (!collecting) return;
    const timer = window.setTimeout(() => {
      setHeapMemory(28);
      setCollecting(false);
    }, reduceMotion ? 0 : 500);
    return () => window.clearTimeout(timer);
  }, [collecting, reduceMotion]);

  const runRequest = () => {
    if (running || collecting) return;
    setHeapMemory((current) => Math.min(90, current + 2));
    setPhase(0);
  };

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowRight" ? (index + 1) % tabs.length
      : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length
      : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="engineering-workbench" aria-label="Interactive engineering walkthrough">
      <div className="workbench-heading">
        <div><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#7c876d]">Behind the request</span><h3 className="mt-2 font-display text-xl font-medium text-[#303b27]">Small steps. Solid systems.</h3></div>
        <span className="workbench-demo">Interactive demo</span>
      </div>

      <div role="tablist" aria-label="Engineering demo views" className="workbench-tabs">
        {tabs.map(({ id, label, icon: Icon }, index) => (
          <button key={id} ref={(element) => { tabRefs.current[index] = element; }} type="button" id={`workbench-tab-${id}`} role="tab" aria-selected={activeTab === id} aria-controls="workbench-panel" tabIndex={activeTab === id ? 0 : -1} onClick={() => setActiveTab(id)} onKeyDown={(event) => handleTabKey(event, index)}>
            <Icon size={13} aria-hidden="true" />{label}
          </button>
        ))}
      </div>

      <div id="workbench-panel" role="tabpanel" aria-labelledby={`workbench-tab-${activeTab}`} tabIndex={0} className="workbench-panel">
        {activeTab === "flow" && (
          <ol className="workbench-steps" aria-label="Request lifecycle">
            {steps.map(({ title, detail, icon: Icon }, index) => {
              const done = phase !== null && phase > index;
              return (
                <li key={title} data-active={phase === index} data-done={done} aria-current={phase === index ? "step" : undefined}>
                  <span className="workbench-step-icon">{done ? <Check size={15} aria-hidden="true" /> : <Icon size={15} strokeWidth={1.5} aria-hidden="true" />}</span>
                  <span className="min-w-0 flex-1"><span className="block text-xs font-medium text-[#4e5943]">{title}</span><span className="mt-1 block text-[11px] leading-4 text-neutral-500">{detail}</span></span>
                  <span className="font-mono text-[9px] text-[#97a08c]">0{index + 1}</span>
                </li>
              );
            })}
          </ol>
        )}

        {activeTab === "activity" && (
          <div className="workbench-activity" role="log" aria-label="Simulated request activity" aria-live="off">
            <p className="mb-4 text-[11px] leading-5 text-neutral-500">A readable record of the same request.</p>
            <p><span>READY</span>Spring Boot service initialized.</p>
            {phase !== null && steps.slice(0, Math.min(phase + 1, steps.length)).map((step, index) => <p key={step.title}><span>0{index + 1}</span>{step.detail}</p>)}
            {complete && <p className="text-[#627f3f]"><span>200</span>{selectedEndpoint.action}</p>}
            {phase === null && <p className="mt-4 text-neutral-400">Run a request to see the steps here.</p>}
          </div>
        )}

        {activeTab === "runtime" && (
          <div className="workbench-runtime">
            <p className="mb-6 text-[11px] leading-5 text-neutral-500">Illustrative JVM values for this demo.</p>
            <div className="flex justify-between text-xs"><span className="text-neutral-600">Heap memory</span><span className="font-mono text-[#607747]">{heapMemory}%</span></div>
            <div role="progressbar" aria-label="Simulated heap memory" aria-valuemin={0} aria-valuemax={100} aria-valuenow={heapMemory} className="workbench-meter"><span style={{ width: `${heapMemory}%` }} /></div>
            <dl className="mt-5 grid grid-cols-2 gap-5 border-b border-[#e4e7dd] pb-5">
              <div><dt className="text-[10px] text-neutral-500">Active threads</dt><dd className="mt-1.5 font-mono text-base text-[#4e5943]">{running ? 16 : 14}</dd></div>
              <div><dt className="text-[10px] text-neutral-500">CPU usage</dt><dd className="mt-1.5 font-mono text-base text-[#4e5943]">{running ? "8.6" : "4.2"}%</dd></div>
            </dl>
            <button type="button" onClick={() => setCollecting(true)} disabled={collecting || running} className="mt-4 inline-flex min-h-10 items-center gap-2 text-[11px] text-[#627f3f] transition-colors hover:text-[#344a20] disabled:opacity-50"><RotateCcw size={12} aria-hidden="true" />{collecting ? "Reclaiming memory…" : "Simulate garbage collection"}</button>
          </div>
        )}
      </div>

      <div className="workbench-controls">
        <label htmlFor="demo-endpoint" className="sr-only">Example endpoint</label>
        <select id="demo-endpoint" value={endpoint} disabled={running} onChange={(event) => { setEndpoint(event.target.value); setPhase(null); }}>
          {endpoints.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
        <button type="button" onClick={runRequest} disabled={running || collecting}><Play size={12} aria-hidden="true" />{running ? "Tracing…" : complete ? "Run again" : "Trace request"}</button>
      </div>
      <p className="workbench-status" role="status">{running ? `${steps[phase!].title.toLowerCase()} — following the request` : complete ? "200 OK · Demo complete. Every layer has a purpose." : "Choose an example to follow a request through the layers."}</p>
    </div>
  );
}
