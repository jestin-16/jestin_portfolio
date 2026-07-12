import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { Project } from "../types";
import {
  Github,
  Award,
  ExternalLink,
  Cpu,
  Server,
  Terminal,
  Play,
  CheckCircle,
  Database,
  Layers,
  Sparkles,
  Search,
  Settings,
  ShieldAlert,
  Compass
} from "lucide-react";

export default function Projects() {
  const { projects } = useFirebase();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Simulation pipeline states
  const [deploymentTarget, setDeploymentTarget] = useState<"Minikube" | "AWS EKS" | "Cloud Run">("Minikube");
  const [selectedLaboratory, setSelectedLaboratory] = useState<"MCA Lab 3" | "B.Tech DSP" | "Mainframe Core">("MCA Lab 3");
  const [eventSlots, setEventSlots] = useState<boolean[]>([
    true, false, false, true, false, true, false, false
  ]);
  const [eventBookingLog, setEventBookingLog] = useState<string>("Click slots below to toggle ACID locking constraints.");

  const [jenkinsLogs, setJenkinsLogs] = useState<string[]>([]);
  const [jenkinsStatus, setJenkinsStatus] = useState<"idle" | "building" | "success">("idle");
  const [barcodeInput, setBarcodeInput] = useState("JS-MCA-2026-902");
  const [lastAllocatedSeat, setLastAllocatedSeat] = useState<string | null>(null);
  const [allocationLog, setAllocationLog] = useState<string[]>([]);
  const [selectedMusicMood, setSelectedMusicMood] = useState<string>("Melancholic - Calm");
  const [emotionScanning, setEmotionScanning] = useState(false);
  const [simulatedTracks, setSimulatedTracks] = useState<string[]>([
    "Chopin - Nocturne Op. 9 No. 2",
    "Erik Satie - Gymnopédie No.1",
    "Debussy - Clair de Lune"
  ]);

  // OpsPilot Simulation states
  const [selectedNamespace, setSelectedNamespace] = useState<"student-app-1" | "student-app-2" | "student-app-3">("student-app-1");
  const [replicaCount, setReplicaCount] = useState<number>(2);
  const [isDeployingTenant, setIsDeployingTenant] = useState<boolean>(false);
  const [tenantLog, setTenantLog] = useState<string[]>([]);
  const [cpuUsage, setCpuUsage] = useState<number>(30); // baseline
  const [memUsage, setMemUsage] = useState<number>(40); // baseline

  useEffect(() => {
    if (isDeployingTenant) {
      setTenantLog([
        `[K8S] Dynamic request received for namespace: ${selectedNamespace}`,
        `[RBAC] Authenticated deployment request from tenant identity.`,
        `[QUOTA] Enforcing namespace limits: max CPU 2.0 / max MEM 4.0Gi`,
      ]);
      const t1 = setTimeout(() => {
        setTenantLog(prev => [
          ...prev,
          `[SCHEDULER] Spawning ${replicaCount} replicas of Java Spring Boot microservice...`,
          `[POD] Pod opspilot-app-replica-1 -> ContainerCreating`,
          replicaCount > 1 ? `[POD] Pod opspilot-app-replica-2 -> ContainerCreating` : "",
          replicaCount > 2 ? `[POD] Pod opspilot-app-replica-3 -> ContainerCreating` : "",
          replicaCount > 3 ? `[POD] Pod opspilot-app-replica-4 -> ContainerCreating` : "",
          replicaCount > 4 ? `[POD] Pod opspilot-app-replica-5 -> ContainerCreating` : "",
        ].filter(Boolean));
        setCpuUsage(15);
        setMemUsage(25);
      }, 700);

      const t2 = setTimeout(() => {
        setTenantLog(prev => [
          ...prev,
          `[POD] All target pods are running cleanly. Liveness/Readiness probes passed.`,
          `[INGRESS] Generating dynamic virtual path mapping: http://${selectedNamespace}.opspilot.local`,
          `[PROMETHEUS] Target telemetry initialized. Scraping CPU/Memory metrics live...`,
        ]);
        setCpuUsage(35 + Math.floor(Math.random() * 8));
        setMemUsage(45 + Math.floor(Math.random() * 8));
        setIsDeployingTenant(false);
      }, 1800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isDeployingTenant, selectedNamespace, replicaCount]);

  // Run simulated processes on component mounting
  useEffect(() => {
    if (jenkinsStatus === "building") {
      setJenkinsLogs(["[INFO] Initializing dynamic pipeline hook...", "[INFO] Fetching main branch update..."]);
      const t1 = setTimeout(() => {
        setJenkinsLogs(prev => [
          ...prev,
          "[INFO] Pulled code successfully from Remote.",
          "[MAVEN] Clean package: Running test framework suite...",
          "[MAVEN] Active Unit Tests: 14/14 tests passed successfully."
        ]);
      }, 1000);
      const t2 = setTimeout(() => {
        let platformLog = "";
        if (deploymentTarget === "Minikube") {
          platformLog = "[K8S] Dynamic rolling upgrade command dispatched to local Minikube cluster nodes.";
        } else if (deploymentTarget === "AWS EKS") {
          platformLog = "[AWS] Dispatching production Helm charts over target AWS EKS multi-AZ spot nodegroups.";
        } else {
          platformLog = "[GCP] Dispatching container manifest layout descriptor to Serverless Cloud Run service entrypoint.";
        }
        setJenkinsLogs(prev => [
          ...prev,
          "[DOCKER] Packing target payload into alpine-java-jre image layer",
          "[DOCKER] Syncing artifacts -> Docker Hub Registry [jestinshaji/spring-node]",
          platformLog
        ]);
      }, 2000);
      const t3 = setTimeout(() => {
        let successLog = "";
        if (deploymentTarget === "Minikube") {
          successLog = "[SUCCESS] Local cluster rolling update complete! 0-downtime transition secured under 1.2s.";
        } else if (deploymentTarget === "AWS EKS") {
          successLog = "[SUCCESS] High-availability multi-region EKS traffic balance verified! Scaled nodes stable under high load.";
        } else {
          successLog = "[SUCCESS] Cloud Run revision traffic routing 100% updated dynamically. Cold starts bypassed successfully!";
        }
        setJenkinsLogs(prev => [
          ...prev,
          successLog
        ]);
        setJenkinsStatus("success");
      }, 3200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [jenkinsStatus, deploymentTarget]);

  const handleRunPipeline = () => {
    setJenkinsStatus("building");
  };

  const handleBarcodeScan = () => {
    if (!barcodeInput) return;
    let labMachines: string[] = [];
    if (selectedLaboratory === "MCA Lab 3") {
      labMachines = ["MCA-Station-9B", "MCA-Station-12A", "MCA-Station-3C", "MCA-Station-7F"];
    } else if (selectedLaboratory === "B.Tech DSP") {
      labMachines = ["DSP-Rig-101", "DSP-Rig-204", "DSP-Rig-402", "DSP-Rig-305"];
    } else {
      labMachines = ["CORE-Cabinet-01A", "CORE-Cabinet-03F", "CORE-Cabinet-02B"];
    }
    const randomMachine = labMachines[Math.floor(Math.random() * labMachines.length)];
    setLastAllocatedSeat(randomMachine);
    setAllocationLog([
      `[AUTH] Barcode '${barcodeInput}' decrypted & securely authenticated.`,
      `[NODEALLOC] Target Grid: '${selectedLaboratory}' selected. Recounting current density factor...`,
      `[RESERVED] Session active. Device assigned -> Station: ${randomMachine}.`
    ]);
  };

  const handleToggleEventSlot = (index: number) => {
    const nextSlots = [...eventSlots];
    const isNowReserved = !nextSlots[index];
    nextSlots[index] = isNowReserved;
    setEventSlots(nextSlots);

    const dateNum = 24 + index;
    if (isNowReserved) {
      setEventBookingLog(`[TX_OK] May ${dateNum} secured. SERIALIZABLE lock acquired, database sequence updated.`);
    } else {
      setEventBookingLog(`[TX_RELEASE] May ${dateNum} released. Row lock de-allocated. Shared buffers reclaimed.`);
    }
  };

  const handleMoodSelect = (mood: string) => {
    setEmotionScanning(true);
    setSelectedMusicMood(mood);
    const tracksMap: Record<string, string[]> = {
      "Melancholic - Calm": [
        "Chopin - Nocturne Op. 9 No. 2",
        "Erik Satie - Gymnopédie No.1",
        "Debussy - Clair de Lune"
      ],
      "Energetic - Focused": [
        "Hans Zimmer - Time (Inception Remix)",
        "Ludwig Göransson - CAN YOU HEAR THE MUSIC",
        "Daft Punk - Tron Legacy Standard"
      ],
      "Anxious - Relaxing Ambient": [
        "Marconi Union - Weightless",
        "Brian Eno - An Ending (Ascent)",
        "Aphex Twin - Rhubarb Acoustic"
      ]
    };

    setTimeout(() => {
      setSimulatedTracks(tracksMap[mood] || []);
      setEmotionScanning(false);
    }, 800);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#04040e] via-[#050519] to-[#020206] relative overflow-hidden select-none">
      
      {/* Background atmospheres */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Chapter Header */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono tracking-widest bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-black uppercase">
              // CASE STUDIES
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 text-glow mb-3">
            Featured Systems
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base max-w-xl font-sans mt-3 font-medium">
            Interactive system sandboxes engineered to demonstrate enterprise readiness and cloud-native simulation loops.
          </p>
        </div>

        {/* Narrative columns of Project Worlds */}
        <div className="space-y-40">
          {projects.map((proj, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center ${
                  isLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Information Block */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.1 }}
                  className={`lg:col-span-5 space-y-6 ${isLeft ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-cyan-400 font-extrabold uppercase block tracking-widest">
                      {proj.subtitle}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/45" />
                    <span className="text-[9px] uppercase bg-cyan-950/20 border border-cyan-500/20 px-2.5 py-1 rounded text-cyan-300 font-bold select-none shadow-[0_0_10px_rgba(6,182,212,0.04)]">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-white">
                    {proj.title}
                  </h3>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-medium">
                    {proj.description}
                  </p>

                  {/* Highlights capsules */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.tags.map((tg) => (
                      <motion.span
                        key={tg}
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="text-neutral-300 glass-chip px-3.5 py-1 text-[10px] font-mono hover:text-cyan-300 hover:border-cyan-500/20 active:scale-95 cursor-pointer shadow-sm font-semibold"
                      >
                        #{tg}
                      </motion.span>
                    ))}
                  </div>

                  {/* Performance Indicators */}
                  <div className="grid grid-cols-3 gap-4 border-t border-white/[0.05] pt-6 font-mono text-xs">
                    {proj.metrics.map((met) => (
                      <div key={met.label} className="space-y-1 division-line">
                        <span className="bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent font-black text-lg block">
                          {met.value}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">
                          {met.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="px-6 py-3 rounded-full glass-button text-cyan-300 hover:text-white text-[11px] font-mono font-bold tracking-wider flex items-center gap-2 cursor-pointer uppercase shadow-[0_0_15px_rgba(6,182,212,0.04)]"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300" />
                      Analyze Blueprint
                    </button>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full text-neutral-400 hover:text-cyan-400 text-[11px] font-mono tracking-wider transition-colors flex items-center gap-1.5 uppercase font-bold"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Repository
                    </a>
                  </div>
                </motion.div>

                {/* Simulation Stage Console Window */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.1 }}
                  className={`lg:col-span-7 relative ${isLeft ? "lg:order-2" : "lg:order-1"} group/console`}
                >
                  {/* Outer atmospheric dynamic glow blur */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/15 rounded-[2rem] blur-xl opacity-0 group-hover/console:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel p-1 shadow-2xl hover:border-cyan-500/20 transition-all duration-500 z-10 bg-[#09090e]/80">
                    
                    {/* Shadow atmospheric overlays */}
                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#050505]/80 to-transparent pointer-events-none z-10" />

                    {/* Simulation Module 0: OpsPilot Multi-tenant Orchestrator */}
                    {proj.id === "opspilot" && (
                      <div className="w-full h-full flex flex-col font-mono text-[11px] text-neutral-400 p-6 bg-[#0a0a0f] space-y-4 min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 animate-pulse" />
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-500/80" />
                            <span className="text-neutral-300 text-[10px] ml-2 font-black uppercase tracking-widest block">
                              OpsPilot K8s Multitenancy Control
                            </span>
                          </div>
                          <span className="text-[9px] text-[#22c55e] font-bold bg-[#14532d]/20 border border-[#22c55e]/20 px-2.5 py-1 rounded">
                            CLUSTER ACTIVE
                          </span>
                        </div>

                        {/* Top inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-3 bg-black/40 p-3 rounded-xl border border-neutral-900">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest">Namespace:</span>
                            <select
                              value={selectedNamespace}
                              onChange={(e) => {
                                setSelectedNamespace(e.target.value as any);
                                setTenantLog([`[INFO] Switched context to namespace: ${e.target.value}`]);
                              }}
                              disabled={isDeployingTenant}
                              className="bg-neutral-950 text-[9px] text-cyan-300 font-bold uppercase outline-none cursor-pointer border border-neutral-800 rounded px-2 py-1 w-full"
                            >
                              <option value="student-app-1">student-proj-alpha</option>
                              <option value="student-app-2">student-proj-beta</option>
                              <option value="student-app-3">student-proj-gamma</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-center gap-3">
                            <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest">Replicas:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setReplicaCount(prev => Math.max(1, prev - 1))}
                                disabled={isDeployingTenant || replicaCount <= 1}
                                className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white w-5 h-5 rounded flex items-center justify-center text-xs font-bold disabled:opacity-30 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold text-white w-4 text-center">{replicaCount}</span>
                              <button
                                onClick={() => setReplicaCount(prev => Math.min(5, prev + 1))}
                                disabled={isDeployingTenant || replicaCount >= 5}
                                className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white w-5 h-5 rounded flex items-center justify-center text-xs font-bold disabled:opacity-30 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => setIsDeployingTenant(true)}
                            disabled={isDeployingTenant}
                            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white px-3 py-1.5 rounded text-[9px] font-black tracking-widest cursor-pointer disabled:opacity-40 uppercase h-full flex items-center justify-center"
                          >
                            {isDeployingTenant ? "Deploying..." : "Deploy Tenant Pods"}
                          </button>
                        </div>

                        {/* Middle panel with telemetry bars */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black/30 border border-neutral-900 p-3 rounded-xl flex flex-col justify-between">
                            <span className="text-[8px] text-neutral-500 uppercase font-black">CPU QUOTA UTILIZATION</span>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-sm font-bold text-white">{(cpuUsage * (replicaCount / 2)).toFixed(1)}%</span>
                              <span className="text-[8px] text-neutral-500">of 2.0 vCPU max</span>
                            </div>
                            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden mt-2">
                              <motion.div
                                className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-full"
                                animate={{ width: `${Math.min(100, cpuUsage * (replicaCount / 2))}%` }}
                                transition={{ type: "spring", stiffness: 60 }}
                              />
                            </div>
                          </div>

                          <div className="bg-black/30 border border-neutral-900 p-3 rounded-xl flex flex-col justify-between">
                            <span className="text-[8px] text-neutral-500 uppercase font-black">MEM QUOTA UTILIZATION</span>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-sm font-bold text-white">{(memUsage * (replicaCount / 2.5)).toFixed(1)}%</span>
                              <span className="text-[8px] text-neutral-500">of 4.0 GiB max</span>
                            </div>
                            <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden mt-2">
                              <motion.div
                                className="bg-gradient-to-r from-purple-400 to-purple-500 h-full"
                                animate={{ width: `${Math.min(100, memUsage * (replicaCount / 2.5))}%` }}
                                transition={{ type: "spring", stiffness: 60 }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Lower terminal */}
                        <div className="flex-1 bg-black/60 rounded-xl border border-neutral-900 p-4 overflow-y-auto space-y-1.5 text-[9px] max-h-[110px] scrollbar-none">
                          {tenantLog.length === 0 ? (
                            <div className="h-full flex flex-col justify-center items-center text-center text-neutral-600 font-sans py-4">
                              <Terminal className="w-5 h-5 opacity-20 mb-1" />
                              <span>Select a tenant namespace & replica count, then click Deploy Tenant Pods.</span>
                            </div>
                          ) : (
                            tenantLog.map((log, lidx) => (
                              <div
                                key={lidx}
                                className={`leading-relaxed font-mono ${
                                  log.includes("[K8S]") || log.includes("[QUOTA]")
                                    ? "text-cyan-400"
                                    : log.includes("[POD]")
                                    ? "text-yellow-400"
                                    : log.includes("[INGRESS]") || log.includes("[PROMETHEUS]")
                                    ? "text-green-400 font-semibold"
                                    : "text-neutral-400"
                                }`}
                              >
                                {log}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}

                    {/* Simulation Module 1: CI/CD Pipeline */}
                    {proj.id === "microservices-cicd" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-neutral-400 p-6 bg-[#0a0a0f] space-y-4 min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                            <span className="text-neutral-500 text-[9px] ml-2 font-black uppercase tracking-widest block">
                              Jenkins Kubernetes Orchestrator Sandbox
                            </span>
                          </div>
                          <span className="text-[9px] text-neutral-400 font-bold bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                            V2.414 LTS
                          </span>
                        </div>

                        {/* Control actions */}
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={handleRunPipeline}
                            disabled={jenkinsStatus === "building"}
                            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:opacity-90 text-white px-4 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                          >
                            <Play className="w-3 h-3" />
                            {jenkinsStatus === "building" ? "EXECUTING HOOK..." : "TRIGGER PIPELINE RELEASE"}
                          </button>

                          <div className="flex items-center gap-1 bg-neutral-950 px-2 py-1 border border-neutral-850 rounded-lg">
                            <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest">Platform:</span>
                            <select
                              value={deploymentTarget}
                              onChange={(e) => setDeploymentTarget(e.target.value as any)}
                              disabled={jenkinsStatus === "building"}
                              className="bg-transparent text-[8.5px] text-cyan-300 font-bold uppercase outline-none cursor-pointer border-none p-0.5"
                            >
                              <option value="Minikube" className="bg-neutral-950 text-neutral-300">Minikube (Local)</option>
                              <option value="AWS EKS" className="bg-neutral-950 text-neutral-300">AWS EKS (Secure Cloud)</option>
                              <option value="Cloud Run" className="bg-neutral-950 text-neutral-300">GCP Cloud Run</option>
                            </select>
                          </div>
                        </div>

                        {/* Internal Terminal Output */}
                        <div className="flex-1 bg-black/50 rounded-xl border border-neutral-900 p-4 overflow-y-auto space-y-2 text-[10px] scrollbar-none">
                          {jenkinsStatus === "idle" && (
                            <div className="h-full flex flex-col justify-center items-center text-center text-neutral-600 font-sans">
                              <Terminal className="w-7 h-7 opacity-20 mb-2" />
                              <span>Click "TRIGGER PIPELINE RELEASE" to simulate docker layer triggers and rolling deployments.</span>
                            </div>
                          )}

                          {jenkinsLogs.map((log, lidx) => (
                            <div
                              key={lidx}
                              className={`leading-relaxed font-mono ${
                                log.includes("[SUCCESS]")
                                  ? "text-neutral-200 font-bold"
                                  : log.includes("[DOCKER]")
                                  ? "text-neutral-300 font-bold"
                                  : log.includes("[INFO]")
                                  ? "text-neutral-400"
                                  : "text-neutral-500"
                              }`}
                            >
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Simulation Module 2: Lab Automation Seating */}
                    {proj.id === "lab-automation" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-neutral-400 p-6 bg-[#0a0a0f] space-y-4 min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                          <span className="text-[9px] text-[#777] font-black uppercase tracking-widest">
                            Device Checkin & Attendance Registry System
                          </span>
                          <span className="text-[9px] text-neutral-400 font-bold">
                            Node Server Ready
                          </span>
                        </div>

                        {/* Barcode Scanner Inputs */}
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2">
                              <label className="text-[9px] text-neutral-500 uppercase font-black tracking-widest">
                                RFID BADGE NO:
                              </label>
                              <input
                                type="text"
                                value={barcodeInput}
                                onChange={(e) => setBarcodeInput(e.target.value)}
                                className="bg-black/55 border border-neutral-850 px-3 py-1.5 rounded-lg text-xs text-white max-w-[140px] font-mono focus:border-cyan-500/30 outline-none"
                              />
                            </div>
                            
                            <button
                              onClick={handleBarcodeScan}
                              className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 text-purple-300 border border-purple-500/20 hover:border-purple-500/40 rounded-lg text-[9px] font-bold tracking-widest cursor-pointer uppercase transition-all"
                            >
                              Scan Student ID
                            </button>

                            <div className="flex items-center gap-1 bg-neutral-950 px-2 py-1 border border-neutral-850 rounded-lg">
                              <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest">Lab:</span>
                              <select
                                value={selectedLaboratory}
                                onChange={(e) => setSelectedLaboratory(e.target.value as any)}
                                className="bg-transparent text-[8.5px] text-[#06B6D4] font-bold uppercase outline-none cursor-pointer border-none p-0.5"
                              >
                                <option value="MCA Lab 3" className="bg-neutral-950 text-neutral-300">MCA Computing Lab 3</option>
                                <option value="B.Tech DSP" className="bg-neutral-950 text-neutral-300">Aeronautics DSP Lab 1</option>
                                <option value="Mainframe Core" className="bg-neutral-950 text-neutral-300">Central Core Mainframe</option>
                              </select>
                            </div>
                          </div>

                          {/* Seating Assignment Visual Matrix */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                            <div className="sm:col-span-5 bg-black/40 border border-neutral-900 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                              <span className="text-[8px] text-neutral-500 block uppercase font-bold tracking-widest">ALLOCATED STATION</span>
                              <span className="text-xl font-black text-white mt-2">
                                {lastAllocatedSeat ? lastAllocatedSeat : "WAITING DISPATCH"}
                              </span>
                              <div className="w-2 h-2 rounded-full mt-3 bg-neutral-600 animate-pulse" />
                            </div>

                            <div className="sm:col-span-7 bg-black/50 border border-neutral-900 rounded-xl p-3 text-[9px] h-20 overflow-y-auto space-y-1">
                              {allocationLog.length === 0 ? (
                                <span className="text-neutral-600 block text-center pt-4 font-sans italic">
                                  Submit or edit an ID scan above to trigger allocation database pipelines.
                                </span>
                              ) : (
                                allocationLog.map((log, iidx) => (
                                  <div key={iidx} className="text-neutral-400 leading-relaxed">
                                    {log}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Simulation Module 3: Event Booking */}
                    {proj.id === "event-management" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-neutral-400 p-6 bg-[#0a0a0f] space-y-4 min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                          <span className="text-[9px] text-[#777] font-bold uppercase tracking-widest font-black">
                            PostgreSQL Transaction Schedules Node
                          </span>
                          <span className="text-cyan-400 text-[9px] font-bold bg-neutral-950 px-2.5 py-1 rounded border border-neutral-850">
                            ACID Transaction Map (Click to Toggle)
                          </span>
                        </div>

                        {/* Calendar visual booking slots */}
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] flex-1">
                          {eventSlots.map((isReserved, i) => {
                            const dateNum = 24 + i;

                            return (
                              <button
                                key={i}
                                onClick={() => handleToggleEventSlot(i)}
                                className={`rounded-xl border p-3 flex flex-col justify-between transition-all duration-300 transform active:scale-95 text-left cursor-pointer ${
                                  isReserved
                                    ? "bg-red-950/20 border-red-500/20 text-red-300 hover:bg-red-900/10 hover:border-red-500/30 shadow-[inset_0_1px_10px_rgba(239,68,68,0.05)]"
                                    : "bg-emerald-950/10 border-emerald-500/10 text-emerald-300 hover:bg-emerald-950/25 hover:border-emerald-500/30"
                                }`}
                              >
                                <span className="text-[8px] font-mono block opacity-60">MAY {dateNum}</span>
                                <div className="text-xs font-black leading-none py-1.5 font-sans tracking-wide">
                                  {isReserved ? "RESERVED" : "VACANT"}
                                </div>
                                <span className="text-[7.5px] opacity-40 block tracking-wider uppercase font-black">
                                  {isReserved ? "ROW LOCK" : "RESERVE"}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* Interactive transaction audit log display */}
                        <div className="p-2 px-3 rounded-lg bg-neutral-950 border border-neutral-850/80 text-[8.5px] text-zinc-400 leading-relaxed font-mono flex items-center gap-1.5 min-h-[28px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block shrink-0" />
                          <span>{eventBookingLog}</span>
                        </div>
                      </div>
                    )}

                    {/* Simulation Module 4: Music Mood AI */}
                    {proj.id === "music-recommender" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-neutral-400 p-6 bg-[#0a0a0f] space-y-4 min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                          <span className="text-[9px] text-[#777] font-bold uppercase tracking-widest block font-black">
                            Facial Contour Sentiment Recsys Module
                          </span>
                          <span className="text-white text-[9px] font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                            92.4% Neural Precision
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                          {/* Face wireframe loop */}
                          <div className="relative rounded-xl bg-black/50 border border-neutral-900 p-4 flex flex-col justify-between overflow-hidden">
                            <span className="absolute top-2 left-2 text-[8px] font-bold text-neutral-500 uppercase">FRONT_CAM NODE</span>
                            
                            {/* Scanning head shape */}
                            <div className="flex-1 flex justify-center items-center relative py-6">
                              <div className="w-16 h-16 rounded-full border border-dashed border-neutral-700 relative flex justify-center items-center">
                                <div className="absolute top-5 left-3 w-1.5 h-1.5 rounded-full bg-neutral-500" />
                                <div className="absolute top-5 right-3 w-1.5 h-1.5 rounded-full bg-neutral-500" />
                                <div className="w-8 h-4 border-b-2 border-neutral-600 rounded-b-full mt-3 animate-pulse" />
                              </div>
                              {/* Scan Beam */}
                              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-neutral-500 to-transparent animate-bounce top-2" />
                            </div>

                            <div className="flex gap-1 justify-center">
                              {["Melancholic - Calm", "Energetic - Focused", "Anxious - Relaxing Ambient"].map((md) => (
                                <button
                                  key={md}
                                  onClick={() => handleMoodSelect(md)}
                                  className={`text-[8px] py-1 px-2 rounded-full border transition-all cursor-pointer ${
                                    selectedMusicMood === md
                                      ? "bg-white text-black border-white font-bold"
                                      : "bg-white/[0.01] border-neutral-800 text-neutral-400 hover:text-white"
                                  }`}
                                >
                                  {md.split(" - ")[0]}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Music rec queue results */}
                          <div className="bg-black/60 border border-neutral-900 p-4 rounded-xl flex flex-col justify-between">
                            <div>
                              <span className="text-[8px] text-neutral-500 uppercase font-black block mb-2">NEURAL MATCHED QUEUE:</span>
                              {emotionScanning ? (
                                <div className="py-6 text-center text-[10px] text-neutral-500 animate-pulse">Querying recommender vector map...</div>
                              ) : (
                                <div className="space-y-1.5">
                                  {simulatedTracks.map((tr, tidx) => (
                                    <div key={tidx} className="flex items-center gap-2 text-[10px] text-neutral-300">
                                      <Play className="w-2.5 h-2.5 text-neutral-400" />
                                      <span className="truncate">{tr}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">
                              Synchronized with Spotify API Feed
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blueprint Detailed Diagnostic Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur clickoff */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />

            {/* Diagnostic Box panel */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c12]/95 border border-white/10 rounded-3xl overflow-y-auto shadow-2xl z-10 p-6 md:p-10 space-y-8"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full p-2.5 hover:scale-105 transition-all cursor-pointer text-xs"
              >
                &lt;Close /&gt;
              </button>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] font-bold">
                  System Architecture Diagnostic Blueprint
                </span>
                <h3 className="text-3xl font-display font-black text-white mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed font-sans">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Grid properties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.05]">
                
                {/* Specs */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#3B82F6] font-extrabold flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    SYSTEM CAPABILITIES & SPECS
                  </h4>
                  <ul className="space-y-3 font-sans text-xs text-gray-400">
                    {selectedProject.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timing dispatch step sequencer */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-extrabold flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    TIMELINE SEQUENCE WORKFLOW
                  </h4>
                  <div className="space-y-4 font-mono text-xs">
                    {selectedProject.steps.map((stp, si) => (
                      <div key={si} className="border-l border-white/10 pl-4 relative">
                        <span className="absolute -left-1 top-1.5 w-2 h-2 rounded-full bg-[#06B6D4] border border-black" />
                        <div className="flex items-center justify-between text-[#06B6D4]">
                          <span className="font-bold">{stp.title}</span>
                          <span className="text-[10px] text-gray-500">{stp.time}</span>
                        </div>
                        <p className="text-gray-400 text-[11px] leading-relaxed mt-1 font-sans">{stp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Graphic architecture block */}
              <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white font-extrabold mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#06B6D4]" />
                  {selectedProject.architectureDiagramTitle}
                </h4>
                <div className="space-y-3 text-xs text-gray-400 leading-relaxed font-sans">
                  {selectedProject.architectureDetails.map((detStr, di) => (
                    <p key={di} className="flex items-start gap-2">
                      <span className="font-mono text-[#06B6D4] font-bold">[{di+1}]</span>
                      <span>{detStr}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Core references link */}
              <div className="flex justify-between items-center pt-6 border-t border-white/[0.05]">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase font-bold"
                >
                  <Github className="w-4 h-4 animate-pulse" />
                  Source Code Hub
                </a>
                <span className="text-[10px] font-mono text-gray-600 font-black tracking-wider uppercase">
                  Verified Production Spec
                </span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
