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
  Workflow,
  Sparkles
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
    { timestamp: "10:04:01", level: "INFO", thread: "main", class: "o.s.b.w.e.tomcat.TomcatWebServer", message: "Tomcat initialized on port: 8080 (http)" },
    { timestamp: "10:04:02", level: "INFO", thread: "main", class: "o.s.b.a.e.web.EndpointLinksResolver", message: "Exposing 14 actuator endpoints beneath base path '/actuator'" },
    { timestamp: "10:04:03", level: "INFO", thread: "main", class: "j.s.BackendApplication", message: "Started DynamicPortfolioApplication in 2.14s (JVM running for 2.8s)" },
    { timestamp: "10:04:08", level: "INFO", thread: "exec-1", class: "o.a.c.c.C.[Tomcat].[localhost].[/]", message: "Initializing Spring DispatcherServlet 'dispatcherServlet'" },
    { timestamp: "10:04:08", level: "DEBUG", thread: "exec-1", class: "o.s.web.servlet.DispatcherServlet", message: "FrameworkServlet 'dispatcherServlet': initialization completed" },
    { timestamp: "10:04:09", level: "SUCCESS", thread: "exec-1", class: "o.s.s.web.FilterChainProxy", message: "Spring Security Filter Chain initialized. Stateless JWT authorization active." },
  ]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs internally without jumping the page
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
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

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Simulation parameters for triggerable rest routes
  const triggerEndpoint = async (endpoint: string) => {
    if (activePathNode !== null) return;
    setCurrentRequest(endpoint);
    setActivePathNode("client");
    setResponseCode(null);
    setResponseLatency(null);

    // 1. Client sends request
    addLog("INFO", "o.s.web.servlet.DispatcherServlet", `Mapping REST request: [${endpoint}]`);
    
    // 2. Gateway/Security check
    await delay(280);
    setActivePathNode("security");
    if (endpoint === "/api/v1/secure-vault") {
      addLog("SUCCESS", "o.s.s.web.FilterChainProxy", "JWT Token validated successfully. Authentication: ROLE_ADMIN");
    } else {
      addLog("DEBUG", "o.s.s.web.FilterChainProxy", "PermitAll security scope verification matching: OK");
    }

    // 3. Spring Service execution
    await delay(320);
    setActivePathNode("service");
    if (endpoint === "/api/v1/auth") {
      addLog("INFO", "j.s.services.AuthService", "Executing cryptographic hash verification protocol (BCrypt)");
    } else if (endpoint === "/api/v1/db-fetch") {
      addLog("INFO", "j.s.services.QueryService", "Preparing native JPA repository query execution with HikariCP");
    } else if (endpoint === "/api/v1/metrics") {
      addLog("INFO", "j.s.services.HealthIndicator", "Aggregating system statistics & disk/memory prober components");
    }

    // 4. Database execution
    await delay(280);
    setActivePathNode("database");
    if (endpoint === "/api/v1/db-fetch") {
      addLog("SUCCESS", "o.h.engine.jdbc.spi.SqlStatementLogger", "SELECT * FROM projects p LEFT JOIN metrics m ON p.id = m.project_id (12 rows, 6ms)");
    } else {
      addLog("DEBUG", "o.h.e.t.internal.TransactionImpl", "ACID Transaction opened and committed cleanly");
    }

    // 5. Response packaging and return
    await delay(240);
    setActivePathNode("client");
    const code = 200;
    const latency = Math.floor(Math.random() * 35) + 32;
    setResponseCode(code);
    setResponseLatency(latency);
    addLog("SUCCESS", "o.s.web.servlet.DispatcherServlet", `Returned HTTP ${code} (${latency}ms) - Payload fully marshalled.`);

    // 6. Complete
    await delay(350);
    setActivePathNode(null);
    setCurrentRequest(null);

    setHeapMemory(prev => Math.min(94, prev + 2.2));
  };

  // Run Garbage Collector Simulation
  const triggerGc = async () => {
    if (isRunningGc) return;
    setIsRunningGc(true);
    addLog("WARN", "o.s.b.actuator.SystemGc", "Manual request received: Initiating JVM Garbage Collection...");
    
    const steps = 12;
    const targetMemory = Math.floor(Math.random() * 12) + 22;
    const currentMemory = heapMemory;
    const stepDiff = (currentMemory - targetMemory) / steps;

    for (let i = 1; i <= steps; i++) {
      await delay(55);
      setHeapMemory(prev => Math.max(targetMemory, parseFloat((prev - stepDiff).toFixed(1))));
    }

    addLog("SUCCESS", "o.s.b.actuator.SystemGc", `GC Complete: Heap compacted in 48ms. Reallocated ${Math.floor((currentMemory - targetMemory) * 4.8)}MB storage objects.`);
    setIsRunningGc(false);
  };

  return (
    <div className="relative w-full max-w-[480px] aspect-[4/5] sm:aspect-square md:w-[480px] lg:w-[450px] xl:w-[480px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col font-sans group select-none relative z-10 bg-[#0c0d12] border border-neutral-800 text-neutral-100">
      
      {/* Top micro hairline */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-neutral-700" />

      {/* Control console window head */}
      <div className="flex justify-between items-center bg-[#13141c] px-4 py-3 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600/80" />
          </div>
          <span className="text-[10px] font-mono text-neutral-300 font-semibold tracking-wider ml-2">
            Spring Boot Actuator v3.2.4
          </span>
        </div>

        {/* Live status badge */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunningGc ? "bg-amber-400" : "bg-neutral-300"}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunningGc ? "bg-amber-400" : "bg-white"}`} />
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-200">
            {isRunningGc ? "GC RUNNING" : "ONLINE"}
          </span>
        </div>
      </div>

      {/* Mode tab selectors */}
      <div className="flex bg-[#161722] border-b border-neutral-800 p-1 shrink-0 gap-1 font-mono text-[10px]">
        {[
          { id: "terminal", label: "Terminal Logs", icon: TerminalIcon },
          { id: "architecture", label: "Trace Canvas", icon: Network },
          { id: "jvm", label: "JVM Metrics", icon: Cpu }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[10px] uppercase tracking-wider transition-all cursor-pointer relative ${
                isActive 
                  ? "bg-white text-black font-bold shadow-xs" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main active subview */}
      <div className="flex-1 overflow-hidden relative flex flex-col p-4 bg-[#0c0d12] select-text">

        {/* VIEW 1: TERMINAL LOGGER */}
        {activeTab === "terminal" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Realtime stream box */}
            <div 
              ref={terminalContainerRef} 
              className="flex-1 overflow-y-auto font-mono text-[9.5px] leading-relaxed space-y-1.5 pr-1.5"
            >
              {logs.map((log, idx) => (
                <div key={idx} className="hover:bg-neutral-900/60 py-0.5 px-1 rounded transition-colors flex items-start gap-1.5">
                  <span className="text-neutral-500 shrink-0">{log.timestamp}</span>
                  <span className={`shrink-0 font-bold px-1 py-0.2 rounded text-[8px] uppercase tracking-wider ${
                    log.level === "INFO" ? "text-neutral-200 bg-neutral-800" : 
                    log.level === "DEBUG" ? "text-neutral-400 bg-neutral-900" : 
                    log.level === "WARN" ? "text-amber-300 bg-amber-950/60" : 
                    "text-white bg-neutral-700"
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-neutral-500 shrink-0">[{log.thread}]</span>
                  <span className="text-neutral-400 shrink-0">{log.class} :</span>
                  <span className={log.level === "SUCCESS" ? "text-white font-medium" : log.level === "WARN" ? "text-amber-200" : "text-neutral-300"}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Trigger Dispatch buttons */}
            <div className="mt-3 pt-3 border-t border-neutral-800/80 shrink-0">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Simulate Inbound REST Request:
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-[9px]">
                <button
                  onClick={() => triggerEndpoint("/api/v1/auth")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-500 text-neutral-200 cursor-pointer transition-all disabled:opacity-40"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-white font-bold">GET</span>
                    <span>/auth</span>
                  </span>
                  <Play className="w-2.5 h-2.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => triggerEndpoint("/api/v1/db-fetch")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-500 text-neutral-200 cursor-pointer transition-all disabled:opacity-40"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-white font-bold">GET</span>
                    <span>/db-fetch</span>
                  </span>
                  <Play className="w-2.5 h-2.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => triggerEndpoint("/api/v1/secure-vault")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-500 text-neutral-200 cursor-pointer transition-all disabled:opacity-40"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-white font-bold">POST</span>
                    <span>/secure</span>
                  </span>
                  <Lock className="w-2.5 h-2.5 text-neutral-400" />
                </button>

                <button
                  onClick={() => triggerEndpoint("/api/v1/metrics")}
                  disabled={activePathNode !== null}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-500 text-neutral-200 cursor-pointer transition-all disabled:opacity-40"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-white font-bold">GET</span>
                    <span>/metrics</span>
                  </span>
                  <Activity className="w-2.5 h-2.5 text-neutral-400" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: ARCHITECTURE TRACE CANVAS */}
        {activeTab === "architecture" && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
            
            {/* Visual Header */}
            <div className="text-center py-0.5">
              <span className="text-[10px] font-mono font-bold text-neutral-200 uppercase tracking-wider block">
                SPRING SECURITY &amp; DISPATCHER PIPELINE
              </span>
              <span className="text-[8px] font-mono text-neutral-500 block">
                {currentRequest ? `Routing request: ${currentRequest}` : "Standby · Select a route below to trace request flow"}
              </span>
            </div>

            {/* Architecture Node Map */}
            <div className="flex-1 relative flex flex-col justify-around py-2 items-center bg-neutral-950/70 border border-neutral-800/80 rounded-xl my-2">
              
              {/* Vertical connector line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-neutral-800 z-0" />

              {/* Node 1: REST CLIENT */}
              <div className={`relative z-10 w-48 px-3 py-1.5 rounded-lg flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "client" 
                  ? "bg-white text-black border-white shadow-lg scale-105" 
                  : "bg-neutral-900 border-neutral-800 text-neutral-300"
              }`}>
                <Network className={`w-3.5 h-3.5 shrink-0 ${activePathNode === "client" ? "text-black animate-pulse" : "text-neutral-400"}`} />
                <div className="text-left leading-tight">
                  <span className="text-[7.5px] font-mono uppercase block opacity-70">Inbound Channel</span>
                  <span className="text-[9px] font-bold">REST Client (Port 8080)</span>
                </div>
              </div>

              {/* Node 2: SECURITY GATEWAY */}
              <div className={`relative z-10 w-48 px-3 py-1.5 rounded-lg flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "security" 
                  ? "bg-white text-black border-white shadow-lg scale-105" 
                  : "bg-neutral-900 border-neutral-800 text-neutral-300"
              }`}>
                <ShieldCheck className={`w-3.5 h-3.5 shrink-0 ${activePathNode === "security" ? "text-black animate-spin" : "text-neutral-400"}`} />
                <div className="text-left leading-tight">
                  <span className="text-[7.5px] font-mono uppercase block opacity-70">Security Filter</span>
                  <span className="text-[9px] font-bold">JWT Security Chain</span>
                </div>
              </div>

              {/* Node 3: DISPATCHER & CORE SERVICES */}
              <div className={`relative z-10 w-48 px-3 py-1.5 rounded-lg flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "service" 
                  ? "bg-white text-black border-white shadow-lg scale-105" 
                  : "bg-neutral-900 border-neutral-800 text-neutral-300"
              }`}>
                <Server className={`w-3.5 h-3.5 shrink-0 ${activePathNode === "service" ? "text-black animate-bounce" : "text-neutral-400"}`} />
                <div className="text-left leading-tight">
                  <span className="text-[7.5px] font-mono uppercase block opacity-70">Application Service</span>
                  <span className="text-[9px] font-bold">DispatcherServlet / Service</span>
                </div>
              </div>

              {/* Node 4: DATABASE LAYER */}
              <div className={`relative z-10 w-48 px-3 py-1.5 rounded-lg flex items-center gap-2 border transition-all duration-300 ${
                activePathNode === "database" 
                  ? "bg-white text-black border-white shadow-lg scale-105" 
                  : "bg-neutral-900 border-neutral-800 text-neutral-300"
              }`}>
                <Database className={`w-3.5 h-3.5 shrink-0 ${activePathNode === "database" ? "text-black animate-pulse" : "text-neutral-400"}`} />
                <div className="text-left leading-tight">
                  <span className="text-[7.5px] font-mono uppercase block opacity-70">Data Store Engine</span>
                  <span className="text-[9px] font-bold">JPA / PostgreSQL</span>
                </div>
              </div>

            </div>

            {/* Response telemetry metrics at bottom */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg shrink-0 font-mono text-[9px] items-center text-center">
              <div className="border-r border-neutral-800">
                <span className="text-neutral-500 block text-[8px]">HTTP STATUS</span>
                <span className={`text-[11px] font-black tracking-widest ${responseCode === 200 ? "text-white" : "text-neutral-400"}`}>
                  {responseCode ? `${responseCode} OK` : "--"}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[8px]">LATENCY</span>
                <span className="text-[11px] text-white font-bold tracking-tight">
                  {responseLatency ? `${responseLatency} ms` : "--"}
                </span>
              </div>
            </div>

            {/* Quick click routes */}
            <div className="grid grid-cols-4 gap-1.5 mt-2 font-mono text-[8.5px]">
              {["/auth", "/db-fetch", "/secure", "/metrics"].map(route => (
                <button
                  key={route}
                  onClick={() => triggerEndpoint(`/api/v1${route === "/secure" ? "/secure-vault" : route}`)}
                  disabled={activePathNode !== null}
                  className="py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded text-neutral-300 hover:text-white font-bold transition-all cursor-pointer disabled:opacity-40"
                >
                  {route}
                </button>
              ))}
            </div>

          </div>
        )}

        {/* VIEW 3: JVM LIVE METRICS */}
        {activeTab === "jvm" && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200 mb-2 text-center flex items-center justify-center gap-1.5 shrink-0">
              <Cpu className="w-3.5 h-3.5 text-neutral-300" />
              <span>JVM Garbage Collector &amp; Memory Monitor</span>
            </div>

            <div className="flex-1 space-y-3 py-1 overflow-y-auto">
              
              {/* Heap Memory Pool meter */}
              <div className="bg-neutral-900/80 border border-neutral-800 p-3.5 rounded-xl relative overflow-hidden">
                <div className="flex justify-between items-center font-mono text-[9px] mb-2">
                  <span className="text-neutral-400 font-bold uppercase">HEAP MEMORY UTILIZATION</span>
                  <span className={`font-mono font-bold ${heapMemory > 80 ? "text-amber-300" : "text-white"}`}>
                    {heapMemory}% ({Math.floor(heapMemory * 4.096)}MB / 4096MB)
                  </span>
                </div>
                
                {/* Visual bar container */}
                <div className="h-3.5 bg-neutral-950 rounded-full border border-neutral-800 overflow-hidden relative">
                  <motion.div 
                    animate={{ width: `${heapMemory}%` }}
                    transition={{ ease: "easeInOut", duration: 0.8 }}
                    className={`h-full rounded-full ${
                      heapMemory > 80 ? "bg-amber-400" : "bg-white"
                    }`}
                  />
                </div>

                {/* GC manual button inside widget */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-neutral-800">
                  <span className="text-[8px] font-mono text-neutral-400 leading-relaxed max-w-[210px]">
                    Garbage accumulates as requests hit the worker threads.
                  </span>
                  <button
                    onClick={triggerGc}
                    disabled={isRunningGc}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-neutral-200 text-black font-bold text-[9px] font-mono uppercase tracking-wider cursor-pointer transition-colors disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRunningGc ? "animate-spin" : ""}`} />
                    <span>Run GC</span>
                  </button>
                </div>
              </div>

              {/* Grid indicators for Threads & Cpu stats */}
              <div className="grid grid-cols-2 gap-2.5 shrink-0">
                
                <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[8px] font-mono text-neutral-400 uppercase font-bold block">ACTIVE THREAD POOL</span>
                  <span className="text-xl font-bold font-mono text-white tracking-tight pt-0.5">
                    {activeThreads} <span className="text-[9px] text-neutral-400 font-normal">threads</span>
                  </span>
                  <span className="text-[8px] font-mono text-neutral-500 pt-0.5 block uppercase">
                    HikariPool-1 Active
                  </span>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl flex flex-col justify-center">
                  <span className="text-[8px] font-mono text-neutral-400 uppercase font-bold block">CPU INTEL LOAD</span>
                  <span className="text-xl font-bold font-mono text-white tracking-tight pt-0.5">
                    {cpuUsage}%
                  </span>
                  <span className="text-[8px] font-mono text-neutral-300 pt-0.5 block uppercase font-bold">
                    Optimum Range
                  </span>
                </div>

              </div>

              {/* System Properties Environment */}
              <div className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-xl font-mono text-[8.5px] text-neutral-400 space-y-1">
                <span className="text-[8px] font-bold text-neutral-300 uppercase block tracking-wider">ENVIRONMENT PROPERTIES</span>
                <div className="flex justify-between">
                  <span>java.vm.name:</span>
                  <span className="text-white">OpenJDK 64-Bit Server VM</span>
                </div>
                <div className="flex justify-between">
                  <span>java.version:</span>
                  <span className="text-white font-bold">21.0.2 LTS</span>
                </div>
                <div className="flex justify-between">
                  <span>spring.boot:</span>
                  <span className="text-white font-bold">3.2.4</span>
                </div>
                <div className="flex justify-between">
                  <span>dialect:</span>
                  <span className="text-white">PostgreSQL 15</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Actuator control visual bar */}
      <div className="px-4 py-2 border-t border-neutral-800 bg-[#13141c] text-[8px] font-mono text-neutral-400 flex justify-between items-center shrink-0">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-neutral-300" />
          <span>STATUS: 100% HEALTHY</span>
        </span>
        <span className="text-neutral-400 font-bold">PING: 29MS</span>
      </div>

    </div>
  );
}
