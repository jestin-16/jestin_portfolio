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
        setJenkinsLogs(prev => [
          ...prev,
          "[DOCKER] Packing target payload into alpine-java-jre image layer",
          "[DOCKER] Syncing artifacts -> Docker Hub Registry [jestinshaji/spring-node]",
          "[K8S] Dynamic rolling upgrade command dispatched to Minikube."
        ]);
      }, 2000);
      const t3 = setTimeout(() => {
        setJenkinsLogs(prev => [
          ...prev,
          "[SUCCESS] Rolling deployment complete! 0-downtime transition secured under 1.2s."
        ]);
        setJenkinsStatus("success");
      }, 3200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [jenkinsStatus]);

  const handleRunPipeline = () => {
    setJenkinsStatus("building");
  };

  const handleBarcodeScan = () => {
    if (!barcodeInput) return;
    const labMachines = ["Node-9B_WS", "Node-12A_WS", "Node-3C_WS", "Node-7F_WS"];
    const randomMachine = labMachines[Math.floor(Math.random() * labMachines.length)];
    setLastAllocatedSeat(randomMachine);
    setAllocationLog([
      `[AUTH] Barcode decrypted: "${barcodeInput}" verified.`,
      `[NODEALLOC] Auditing laboratory occupancy... Workstation list synchronized.`,
      `[RESERVED] Seat ${randomMachine} initialized for ${barcodeInput}.`
    ]);
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
    <section id="projects" className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#04040d] via-[#020205] to-[#030308] relative overflow-hidden select-none">
      
      {/* Background atmospheres */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.055)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.045)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Chapter Header */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono tracking-widest bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-black uppercase">
              // CASE STUDIES
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-300 mb-3">
            Featured Systems
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans mt-3">
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
                        className="text-neutral-300 bg-[#0c0c16]/50 border border-neutral-900/60 hover:border-cyan-500/30 hover:text-cyan-300 px-3.5 py-1 rounded-full text-[10px] font-mono transition-all cursor-default shadow-sm"
                      >
                        #{tg}
                      </motion.span>
                    ))}
                  </div>

                  {/* Performance Indicators */}
                  <div className="grid grid-cols-3 gap-4 border-t border-neutral-900/60 pt-6 font-mono text-xs">
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
                      className="px-6 py-3 rounded-full border border-cyan-500/20 bg-cyan-950/20 hover:bg-cyan-900/30 text-cyan-300 hover:text-white text-[11px] font-mono font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer uppercase shadow-[0_0_15px_rgba(6,182,212,0.04)] hover:border-cyan-550/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.18)]"
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
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleRunPipeline}
                            disabled={jenkinsStatus === "building"}
                            className="bg-white/5 text-white border border-neutral-800 hover:bg-white/10 px-4 py-2 rounded-lg text-[9px] font-bold tracking-widest transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            <Play className="w-3 h-3" />
                            {jenkinsStatus === "building" ? "EXECUTING HOOK SEQUENCE..." : "TRIGGER PIPELINE RELEASE"}
                          </button>
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
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex items-center gap-2">
                              <label className="text-[9px] text-neutral-500 uppercase font-black tracking-widest">
                                RFID BADGE NO:
                              </label>
                              <input
                                type="text"
                                value={barcodeInput}
                                onChange={(e) => setBarcodeInput(e.target.value)}
                                className="bg-black/50 border border-neutral-800 px-3 py-1.5 rounded-lg text-xs text-white max-w-[150px] font-mono focus:border-neutral-700 outline-none"
                              />
                            </div>
                            <button
                              onClick={handleBarcodeScan}
                              className="px-4 py-2 bg-white/5 text-neutral-200 border border-neutral-800 hover:bg-white/10 rounded-lg text-[9px] font-bold tracking-widest cursor-pointer uppercase"
                            >
                              Scan Student ID
                            </button>
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
                          <span className="text-white text-[9px] font-bold bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                            ACID Transaction Map
                          </span>
                        </div>

                        {/* Calendar visual booking slots */}
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] flex-1">
                          {[...Array(8)].map((_, i) => {
                            const dateNum = 24 + i;
                            const isReserved = i % 3 === 0;

                            return (
                              <div
                                key={i}
                                className={`rounded-xl border p-3 flex flex-col justify-between transition-colors ${
                                  isReserved
                                    ? "bg-neutral-950/40 border-neutral-900 text-neutral-600"
                                    : "bg-white/[0.02] border-neutral-800 text-neutral-200"
                                }`}
                              >
                                <span className="text-[8px] font-mono block text-neutral-500">MAY {dateNum}</span>
                                <div className="text-xs font-bold leading-none py-2 font-display">
                                  {isReserved ? "RESERVED" : "VACANT"}
                                </div>
                                <span className="text-[8px] opacity-60 block tracking-widest font-bold">
                                  {isReserved ? "NODE LOCK" : "STABLE ID"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="text-[9px] text-neutral-500 flex items-center justify-between pt-2 border-t border-neutral-900">
                          <span>System audit log: "Simultaneous check-ins balanced via isolation level database routines."</span>
                          <span>60 FPS</span>
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
