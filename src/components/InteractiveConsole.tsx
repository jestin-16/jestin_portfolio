import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Database, 
  Network, 
  RefreshCw, 
  Play, 
  CheckCircle, 
  Server,
  Zap,
  Lock,
  Workflow
} from "lucide-react";

interface LogLine {
  timestamp: string;
  level: "INFO" | "DEBUG" | "WARN" | "SUCCESS";
  thread: string;
  class: string;
  message: string;
}

export default function InteractiveConsole() {
  const [activeTab, setActiveTab] = useState<"terminal" | "jvm" | "architecture">("terminal");
  const [heapMemory, setHeapMemory] = useState(58); // Percentage
  const [activeThreads, setActiveThreads] = useState(14);
  const [cpuUsage, setCpuUsage] = useState(4.2);
  const [isRunningGc, setIsRunningGc] = useState(false);
  const [activePathNode, setActivePathNode] = useState<string | null>(null);
  const [responseCode, setResponseCode] = useState<number | null>(null);
  const [responseLatency, setResponseLatency] = useState<number | null>(null);
  const [currentRequest, setCurrentRequest] = useState<string | null>(null);

  const [logs, setLogs] = useState<LogLine[]>([
    { timestamp: "03:55:01", level: "INFO", thread: "main", class: "o.s.b.w.e.tomcat.TomcatWebServer", message: "Tomcat initialized on port(s): 8080 (http)" },
    { timestamp: "03:55:02", level: "INFO", thread: "main", class: "o.s.b.a.e.web.EndpointLinksResolver", message: "Exposing 14 actuator endpoints beneath base path '/actuator'" },
    { timestamp: "03:55:03", level: "INFO", thread: "main", class: "j.s.BackendApplication", message: "Started DynamicPortfolioApplication in 2.84 seconds (JVM running for 3.4)" },
    { timestamp: "03:55:10", level: "INFO", thread: "exec-1", class: "o.a.c.c.C.[Tomcat].[localhost].[/]", message: "Initializing Spring DispatcherServlet 'dispatcherServlet'" },
    { timestamp: "03:55:10", level: "DEBUG", thread: "exec-1", class: "o.s.web.servlet.DispatcherServlet", message: "Initializing Servlet 'dispatcherServlet'" },
    { timestamp: "03:55:11", level: "SUCCESS", thread: "exec-1", class: "o.s.s.web.FilterChainProxy", message: "Spring Security Filter Chain initialized. Secure parameters enforced ✔" },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Fluctuating JVM status to make it feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const delta = (Math.random() - 0.5) * 1.5;
        return Math.max(1.2, Math.min(18.5, parseFloat((prev + delta).toFixed(1))));
      });
      setActiveThreads(prev => {
        const delta = Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(8, Math.min(24, prev + delta));
      });
      setHeapMemory(prev => {
        if (isRunningGc) return prev;
        const delta = Math.random() > 0.7 ? parseFloat((Math.random() * 0.8).toFixed(1)) : 0;
        return Math.min(94, prev + delta);
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isRunningGc]);

  // Function to print log messages smoothly
  const addLog = (level: "INFO" | "DEBUG" | "WARN" | "SUCCESS", className: string, message: string) => {
    const now = new Date();
    const ts = now.toTimeString().split(" ")[0];
    const threadId = `exec-${Math.floor(Math.random() * 8) + 1}`;
    setLogs(prev => [...prev, { timestamp: ts, level, thread: threadId, class: className, message }]);
  };

  // Simulation parameters for triggerable rest routes
  const triggerEndpoint = async (endpoint: string) => {
    if (activePathNode !== null) return; // already running
    setCurrentRequest(endpoint);
    setActivePathNode("client");
    setResponseCode(null);
    setResponseLatency(null);

    // Timeline actions:
    // 1. Client sends request
    addLog("INFO", "o.s.web.servlet.DispatcherServlet", `Mapping REST request: [${endpoint}]`);
    
    // 2. Gateway/Security check
    await delay(320);
    setActivePathNode("security");
    if (endpoint === "/api/v1/secure-vault") {
      addLog("SUCCESS", "o.s.s.web.FilterChainProxy", "JWT Token validated successfully. Authentication: ROLE_ADMIN");
    } else {
      addLog("DEBUG", "o.s.s.web.FilterChainProxy", "PermitAll security scope verification matching: OK");
    }

    // 3. Spring Service execution
    await delay(380);
    setActivePathNode("service");
    if (endpoint === "/api/v1/auth") {
      addLog("INFO", "j.s.services.AuthService", "Executing cryptographic hash verification protocol");
    } else if (endpoint === "/api/v1/db-fetch") {
      addLog("INFO", "j.s.services.QueryService", "Preparing native JPA repository payload mapping");
    } else if (endpoint === "/api/v1/metrics") {
      addLog("INFO", "j.s.services.HealthIndicator", "Aggregating system statistics components");
    }

    // 4. Database execution
    await delay(300);
    setActivePathNode("database");
    if (endpoint === "/api/v1/db-fetch") {
      addLog("SUCCESS", "o.h.engine.jdbc.spi.SqlStatementLogger", "SELECT * FROM projects p LEFT JOIN metrics m ON p.id = m.project_id (12 rows, 8ms)");
    } else {
      addLog("DEBUG", "o.h.e.t.internal.TransactionImpl", "Transaction opened and committed securely");
    }

    // 5. Response packaging and return
    await delay(250);
    setActivePathNode("client");
    const code = 200;
    const latency = Math.floor(Math.random() * 45) + 38;
    setResponseCode(code);
    setResponseLatency(latency);
    addLog("SUCCESS", "o.s.web.servlet.DispatcherServlet", `Returned HTTP ${code} (${latency}ms) - Payload fully marshalled.`);

    // 6. Complete
    await delay(400);
    setActivePathNode(null);
    setCurrentRequest(null);

    // Slightly increase heap memory representing work done
    setHeapMemory(prev => Math.min(94, prev + 2.5));
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Run Garbage Collector Simulation
  const triggerGc = async () => {
    if (isRunningGc) return;
    setIsRunningGc(true);
    addLog("WARN", "o.s.b.actuator.SystemGc", "Manual request received: Initiating JVM Garbage Collection...");
    
    // Smoothly drain the memory gauge
    const steps = 15;
    const targetMemory = Math.floor(Math.random() * 15) + 24; // Reduce to ~25%
    const currentMemory = heapMemory;
    const stepDiff = (currentMemory - targetMemory) / steps;

    for (let i = 1; i <= steps; i++) {
      await delay(60);
      setHeapMemory(prev => Math.max(targetMemory, parseFloat((prev - stepDiff).toFixed(1))));
    }

    addLog("SUCCESS", "o.s.b.actuator.SystemGc", `GC Complete: Heap compacted in 52ms. Reallocated ${Math.floor((currentMemory - targetMemory) * 4.8)}MB storage objects.`);
    setIsRunningGc(false);
  };

  return (
    <div className="relative w-full max-w-[460px] aspect-[4/5] sm:aspect-square md:max-w-none md:w-[480px] lg:w-[440px] xl:w-[480px] rounded-3xl glass-panel overflow-hidden shadow-[0_0_50px_rgba(30,58,138,0.20)] hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col font-sans group select-none relative z-10 bg-[#09090e]/90">
      
      {/* Decorative top glass bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 opacity-90" />

      {/* Control console head tabs */}
      <div className="flex justify-between items-center bg-[#0d0d14]/90 px-4 py-3 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-wider ml-2.5">
            SPRING_BOOT_ACTUATOR_V3
          </span>
        </div>

        {/* Status indicator pill */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunningGc ? "bg-amber-400" : "bg-emerald-400"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunningGc ? "bg-amber-500" : "bg-emerald-500"}`}></span>
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#0e0]">LIVE</span>
        </div>
      </div>

      {/* Mode selectors */}
      <div className="flex bg-[#07070a] border-b border-white/[0.04] p-1 shrink-0 gap-1">
        <button
          onClick={() => setActiveTab("terminal")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "terminal" ? "bg-white/[0.06] text-white font-extrabold border border-white/[0.08]" : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <TerminalIcon className="w-3.5 h-3.5" />
          Terminal Logs
        </button>
        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "architecture" ? "bg-white/[0.06] text-white font-extrabold border border-white/[0.08]" : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          Trace Canvas
        </button>
        <button
          onClick={() => setActiveTab("jvm")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "jvm" ? "bg-white/[0.06] text-white font-extrabold border border-white/[0.08]" : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          JVM Metrics
        </button>
      </div>

      {/* Main active subview mapping */}
      <div className="flex-1 overflow-hidden relative flex flex-col p-4 bg-[#050508]/95 select-text">

        {/* VIEW 1: TERMINAL LOGGER */}
        {activeTab === "terminal" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Realtime stream box */}
            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-[#dedede] leading-relaxed space-y-1.5 pr-1.5 custom-scrollbar">
              {logs.map((log, idx) => (
                <div key={idx} className="hover:bg-white/[0.02] py-0.5 rounded transition-colors flex items-start gap-1">
                  <span className="text-neutral-600 shrink-0">{log.timestamp}</span>
                  <span className={`shrink-0 font-bold px-1 rounded-[3px] text-[8px] ${
                    log.level === "INFO" ? "text-blue-400 bg-blue-950/40" : 
                    log.level === "DEBUG" ? "text-neutral-500 bg-neutral-900/40" : 
                    log.level === "WARN" ? "text-amber-400 bg-amber-950/40 animate-pulse" : 
                    "text-emerald-400 bg-emerald-950/40"
                  }`}>{log.level}</span>
                  <span className="text-neutral-500 shrink-0">[{log.thread}]</span>
                  <span className="text-slate-400 shrink-0">{log.class} :</span>
                  <span className={`${log.level === "SUCCESS" ? "text-emerald-300 font-medium" : log.level === "WARN" ? "text-amber-200" : "text-[#eaeaea]"}`}>{log.message}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Quick Trigger Dispatch buttons */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] shrink-0">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-500 block mb-2">// COMMENCE ENDPOINT TEST REQUEST</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => triggerEndpoint("/api/v1/auth")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/40 hover:bg-blue-500/[0.03] text-[9px] font-mono text-neutral-300 cursor-pointer transition-all disabled:opacity-45Disabled"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#3B82F6] font-bold">GET</span>
                    <span>/auth</span>
                  </span>
                  <Play className="w-2.5 h-2.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => triggerEndpoint("/api/v1/db-fetch")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] text-[9px] font-mono text-neutral-300 cursor-pointer transition-all disabled:opacity-45"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">GET</span>
                    <span>/db-fetch</span>
                  </span>
                  <Play className="w-2.5 h-2.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => triggerEndpoint("/api/v1/secure-vault")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-red-500/40 hover:bg-red-500/[0.03] text-[9px] font-mono text-neutral-300 cursor-pointer transition-all disabled:opacity-45"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-rose-500 font-bold font-black">POST</span>
                    <span>/secure</span>
                  </span>
                  <Lock className="w-2.5 h-2.5 text-neutral-500" />
                </button>

                <button
                  onClick={() => triggerEndpoint("/api/v1/metrics")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-[#06B6D4]/40 hover:bg-[#06B6D4]/[0.03] text-[9px] font-mono text-neutral-300 cursor-pointer transition-all disabled:opacity-45"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#06B6D4] font-bold">GET</span>
                    <span>/metrics</span>
                  </span>
                  <Activity className="w-2.5 h-2.5 text-neutral-500" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: ARCHITECTURE TRACE CANVAS */}
        {activeTab === "architecture" && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
            
            {/* Visual Header */}
            <div className="text-center py-1">
              <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase tracking-wider block">
                SPRING SECURITY & DISPATCHER PIPELINE
              </span>
              <span className="text-[8px] font-mono text-neutral-500 block uppercase">
                {currentRequest ? `Routing call: ${currentRequest}` : "Standby. Select a Route below to trace execution."}
              </span>
            </div>

            {/* Architecture Node Map */}
            <div className="flex-1 relative flex flex-col justify-around py-2 items-center bg-black/40 border border-white/[0.03] rounded-2xl my-3">
              
              {/* Vertical connector line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/20 via-neutral-800 to-emerald-500/20 z-0" />

              {/* Node 1: REST CLIENT */}
              <div className={`relative z-10 w-44 px-3 py-2 rounded-xl flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "client" 
                  ? "bg-blue-500/10 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.25)] scale-105" 
                  : "bg-[#111] border-neutral-800 text-neutral-400"
              }`}>
                <Network className={`w-4 h-4 shrink-0 ${activePathNode === "client" ? "text-blue-400 animate-pulse" : "text-neutral-500"}`} />
                <div className="text-left leading-none">
                  <span className="text-[8px] font-mono text-neutral-500 block uppercase font-bold">Inbound Channel</span>
                  <span className="text-[9px] font-bold">API client (Port 80)</span>
                </div>
              </div>

              {/* Node 2: SPRING SECURITY TOKEN GATEWAY */}
              <div className={`relative z-10 w-44 px-3 py-2 rounded-xl flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "security" 
                  ? "bg-red-500/10 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.25)] scale-105" 
                  : "bg-[#111] border-neutral-800 text-neutral-400"
              }`}>
                <ShieldCheck className={`w-4 h-4 shrink-0 ${activePathNode === "security" ? "text-red-400 animate-spin" : "text-neutral-500"}`} />
                <div className="text-left leading-none">
                  <span className="text-[8px] font-mono text-neutral-500 block uppercase font-bold">Security Filter</span>
                  <span className="text-[9px] font-bold">JWT Security Chain</span>
                </div>
              </div>

              {/* Node 3: DISPATCHER SERVLET & CORE SERVICES */}
              <div className={`relative z-10 w-44 px-3 py-2 rounded-xl flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "service" 
                  ? "bg-[#3b82f6]/10 border-[#3b82f6] text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.25)] scale-105" 
                  : "bg-[#111] border-neutral-800 text-neutral-400"
              }`}>
                <Server className={`w-4 h-4 shrink-0 ${activePathNode === "service" ? "text-blue-400 animate-bounce" : "text-neutral-500"}`} />
                <div className="text-left leading-none">
                  <span className="text-[8px] font-mono text-neutral-500 block uppercase font-bold">Application Logic</span>
                  <span className="text-[9px] font-bold">HikariPool Service</span>
                </div>
              </div>

              {/* Node 4: SECURE HIBERNATE DATABASE LAYER */}
              <div className={`relative z-10 w-44 px-3 py-2 rounded-xl flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "database" 
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] scale-105" 
                  : "bg-[#111] border-neutral-800 text-neutral-400"
              }`}>
                <Database className={`w-4 h-4 shrink-0 ${activePathNode === "database" ? "text-emerald-400 animate-pulse" : "text-neutral-500"}`} />
                <div className="text-left leading-none">
                  <span className="text-[8px] font-mono text-neutral-500 block uppercase font-bold">Data Store Engine</span>
                  <span className="text-[9px] font-bold">JPA / PostgreSQL</span>
                </div>
              </div>

            </div>

            {/* Response telemetry metrics at bottom */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-950/60 border border-white/[0.04] p-3 rounded-xl shrink-0 font-mono text-[9px] items-center text-center">
              <div className="border-r border-white/[0.05]">
                <span className="text-neutral-500 block">HTTP STATUS CODE</span>
                <span className={`text-[11px] font-black tracking-widest ${responseCode === 200 ? "text-emerald-400" : "text-neutral-400"}`}>
                  {responseCode ? `${responseCode} OK` : "--"}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">TOTAL API MEASUREMENT</span>
                <span className="text-[11px] text-white font-bold tracking-tight">
                  {responseLatency ? `${responseLatency} ms` : "--"}
                </span>
              </div>
            </div>

            {/* Quick click routes panel duplicated specifically for trace canvas to enrich interactive capability */}
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              <button
                onClick={() => triggerEndpoint("/api/v1/auth")}
                disabled={activePathNode !== null}
                className="py-1.5 bg-[#111]/80 hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/30 border border-neutral-900 rounded-lg text-[8px] font-mono font-bold uppercase transition-all cursor-pointer disabled:opacity-45"
              >
                /auth
              </button>
              <button
                onClick={() => triggerEndpoint("/api/v1/db-fetch")}
                disabled={activePathNode !== null}
                className="py-1.5 bg-[#111]/80 hover:bg-emerald-500/10 hover:border-emerald-500/30 border border-neutral-900 rounded-lg text-[8px] font-mono font-bold uppercase transition-all cursor-pointer disabled:opacity-45"
              >
                /db-fetch
              </button>
              <button
                onClick={() => triggerEndpoint("/api/v1/secure-vault")}
                disabled={activePathNode !== null}
                className="py-1.5 bg-[#111]/80 hover:bg-red-500/10 hover:border-red-500/30 border border-neutral-900 rounded-lg text-[8px] font-mono font-bold uppercase transition-all cursor-pointer disabled:opacity-45"
              >
                /secure
              </button>
              <button
                onClick={() => triggerEndpoint("/api/v1/metrics")}
                disabled={activePathNode !== null}
                className="py-1.5 bg-[#111]/80 hover:bg-[#06B6D4]/10 hover:border-[#06B6D4]/30 border border-neutral-900 rounded-lg text-[8px] font-mono font-bold uppercase transition-all cursor-pointer disabled:opacity-45"
              >
                /metrics
              </button>
            </div>

          </div>
        )}

        {/* VIEW 3: JVM LIVE METRICS */}
        {activeTab === "jvm" && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#06B6D4] mb-3 text-center flex items-center justify-center gap-1.5 shrink-0">
              <Cpu className="w-4 h-4 text-[#06B6D4]" />
              <span>JVM Garbage Collector & Actuator Monitor</span>
            </div>

            <div className="flex-1 space-y-4 py-2">
              
              {/* Heap Memory Pool meter */}
              <div className="bg-black/30 border border-white/[0.04] p-4 rounded-xl relative overflow-hidden">
                <div className="flex justify-between items-center font-mono text-[9px] mb-2">
                  <span className="text-neutral-400 font-bold">HEAP MEMORY UTILIZATION</span>
                  <span className={`font-mono font-bold ${heapMemory > 80 ? "text-amber-400" : "text-white"}`}>
                    {heapMemory}% ({Math.floor(heapMemory * 4.096)}MB / 4096MB)
                  </span>
                </div>
                
                {/* Visual bar container */}
                <div className="h-4 bg-neutral-900 rounded-full border border-neutral-800 overflow-hidden relative">
                  <motion.div 
                    animate={{ width: `${heapMemory}%` }}
                    transition={{ ease: "easeInOut", duration: 0.8 }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      heapMemory > 80 
                        ? "from-amber-600 to-amber-500" 
                        : "from-blue-600 via-indigo-500 to-[#06B6D4]"
                    }`}
                  />
                  {/* Stripes moving visual representation */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] bg-[size:16px_16px] animate-[pulse_2s_infinite]" />
                </div>

                {/* GC manual button inside widget */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/[0.04]">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase leading-relaxed max-w-[210px]">
                    Garbage levels accumulate as API requests occur in the thread pool.
                  </span>
                  <button
                    onClick={triggerGc}
                    disabled={isRunningGc}
                    className="flex items-center gap-1 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold text-[9px] font-mono uppercase tracking-widest cursor-pointer transition-colors disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRunningGc ? "animate-spin" : ""}`} />
                    <span>Trigger GC</span>
                  </button>
                </div>
              </div>

              {/* Grid indicators for Threads & Cpu stats */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                
                <div className="bg-black/30 border border-white/[0.04] p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase font-black block">ACTIVE THREAD POOL</span>
                  <span className="text-2xl font-bold font-mono text-white tracking-tight pt-1">
                    {activeThreads} <span className="text-[10px] text-neutral-400 font-normal">threads</span>
                  </span>
                  <span className="text-[8px] font-mono text-neutral-500 pt-1 block uppercase font-bold">
                    [HikariPool-1 Active]
                  </span>
                </div>

                <div className="bg-black/30 border border-white/[0.04] p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase font-black block">CPU INTEL CORE LOAD</span>
                  <span className="text-2xl font-bold font-mono text-white tracking-tight pt-1">
                    {cpuUsage}%
                  </span>
                  <span className="text-[8px] font-mono text-emerald-400 pt-1 block uppercase font-mono bg-emerald-900/10 border border-emerald-900/20 px-1 rounded max-w-max self-start font-bold">
                    ⚡ RUNNING COOL
                  </span>
                </div>

              </div>

              {/* Conceptual Microservice telemetry mapping */}
              <div className="bg-black/30 border border-white/[0.04] p-3.5 rounded-xl font-mono text-[9px] text-neutral-400 space-y-1.5">
                <span className="text-[8px] font-black text-neutral-500 uppercase block tracking-wider">// SYSTEM PROPERTIES ENVIRONMENT</span>
                <div className="flex justify-between">
                  <span>java.vm.name:</span>
                  <span className="text-white">OpenJDK 64-Bit Server VM</span>
                </div>
                <div className="flex justify-between">
                  <span>java.version:</span>
                  <span className="text-[#06B6D4] font-bold">21.0.2 LTS</span>
                </div>
                <div className="flex justify-between">
                  <span>spring.boot.version:</span>
                  <span className="text-[#06B6D4] font-bold">3.2.4</span>
                </div>
                <div className="flex justify-between">
                  <span>database.connector:</span>
                  <span className="text-white">PostgreSQL Dialect 15</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Actuator control visual bar */}
      <div className="px-4 py-2 border-t border-white/[0.06] bg-[#09090d] text-[8px] font-mono text-neutral-500 flex justify-between items-center shrink-0">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#06B6D4]" />
          <span>SERVER HEALTH STATUS: 100% HEALTHY</span>
        </span>
        <span className="text-neutral-500">PING: 29MS</span>
      </div>

    </div>
  );
}
