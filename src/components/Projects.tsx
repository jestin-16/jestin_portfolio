import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project, ProjectStep } from "../types";
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
  Grid,
  Sparkles,
  Smartphone,
  Eye,
  Activity,
  Calendar,
  Layers,
  FileCheck
} from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"architecture" | "logs">("architecture");

  // Custom Simulations states
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
    // Jenkins Logs flow
    if (jenkinsStatus === "building") {
      setJenkinsLogs(["[INFO] Initializing dynamic pipeline hook...", "[INFO] Fetching main branch update..."]);
      const t1 = setTimeout(() => {
        setJenkinsLogs(prev => [
          ...prev,
          "[INFO] Pulled code successfully from Remote.",
          "[MAVEN] Clean package: Running test framework suite...",
          "[MAVEN] Active Unit Tests: 14/14 tests passed successfully."
        ]);
      }, 1200);
      const t2 = setTimeout(() => {
        setJenkinsLogs(prev => [
          ...prev,
          "[DOCKER] Packing target payload into alpine-java-jre image layer",
          "[DOCKER] Syncing artifacts -> Docker Hub Registry [jestinshaji/spring-node]",
          "[K8S] Dynamic rolling upgrade command dispatched to Minikube."
        ]);
      }, 2400);
      const t3 = setTimeout(() => {
        setJenkinsLogs(prev => [
          ...prev,
          "[SUCCESS] Rolling deployment complete! 0-downtime transition secured under 1.4s."
        ]);
        setJenkinsStatus("success");
      }, 3600);

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
    }, 1000);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* Lights background */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 radial-glow rounded-full opacity-10 pointer-events-none" />
      <div className="absolute top-2/3 left-10 w-96 h-96 radial-glow-cyan rounded-full opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[2px] w-8 bg-gradient-to-r from-[#3B82F6] to-purple-500" />
            <span className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-bold">
              03 / Selected Deliveries
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-2">
            Engineering Projects.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl">
            Interactive visual systems and sandbox simulations engineered to demonstrate production-grade readiness.
          </p>
        </div>

        {/* Master Alternating list layout */}
        <div className="space-y-32">
          {PROJECTS.map((proj, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Left col: Narrative / Information */}
                <div className={`lg:col-span-6 space-y-6 ${isLeft ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#06B6D4] font-bold">
                      {proj.subtitle}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-[10px] font-mono uppercase bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded text-gray-400">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white">
                    {proj.title}
                  </h3>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Highlights/Badges Tag array */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tg) => (
                      <span
                        key={tg}
                        className="text-white bg-white/[0.02] border border-white/[0.05] hover:border-white/10 px-3 py-1 rounded-full text-xs font-mono transition-colors"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>

                  {/* Key Performance Metric indicators */}
                  <div className="grid grid-cols-3 gap-4 border-t border-white/[0.05] pt-6">
                    {proj.metrics.map((met) => (
                      <div key={met.label}>
                        <span className="block text-white font-extrabold text-base sm:text-lg">
                          {met.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-mono text-gray-400">
                          {met.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-white hover:bg-white/5 text-xs font-mono font-medium transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
                      View Blueprint
                    </button>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-lg border border-transparent text-gray-400 hover:text-white hover:bg-white/[0.02] text-xs font-mono transition-all flex items-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub Repo
                    </a>
                  </div>
                </div>

                {/* Right col: Unique Simulation Blueprint */}
                <div className={`lg:col-span-6 relative ${isLeft ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-video rounded-2xl glass-panel overflow-hidden border border-white/10 group p-1 bg-[#0b0b11]">
                    {/* Shadow overlay highlights */}
                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#050505]/60 to-transparent pointer-events-none z-10" />

                    {/* Simulation contents depending on ID */}
                    {proj.id === "microservices-cicd" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-gray-400 p-4 bg-[#0a0a0f] select-none h-[280px]">
                        {/* Header bar */}
                        <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500" />
                            <span className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-gray-500 text-[10px] ml-2 font-bold uppercase tracking-wider">
                              Jenkinsfile executor sandbox
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#3B82F6] font-semibold bg-[#3B82F6]/5 px-2 py-0.5 rounded border border-[#3B82F6]/10">
                              v2.414 LTS
                            </span>
                          </div>
                        </div>

                        {/* Interactive triggers */}
                        <div className="flex items-center gap-3 mb-3">
                          <button
                            onClick={handleRunPipeline}
                            disabled={jenkinsStatus === "building"}
                            className="bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 hover:bg-[#3B82F6]/20 px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Play className="w-3 h-3" />
                            {jenkinsStatus === "building" ? "RUNNING PIPELINE BUILD..." : "RUN INTERACTIVE PIPELINE"}
                          </button>
                        </div>

                        {/* Logs screen */}
                        <div className="flex-1 bg-black/40 rounded border border-white/[0.03] p-3 overflow-y-auto space-y-1.5 text-[10px] scrollbar-none font-sans">
                          {jenkinsStatus === "idle" && (
                            <div className="h-full flex flex-col justify-center items-center text-center text-gray-600">
                              <Terminal className="w-8 h-8 opacity-20 mb-2" />
                              <span>Click "Run Interactive Pipeline" to simulate active docker triggers and deployment step sequences.</span>
                            </div>
                          )}

                          {jenkinsLogs.map((log, lidx) => (
                            <div
                              key={lidx}
                              className={`leading-relaxed font-mono ${
                                log.includes("[SUCCESS]")
                                  ? "text-emerald-400 font-bold"
                                  : log.includes("[DOCKER]")
                                  ? "text-[#06B6D4]"
                                  : log.includes("[INFO]")
                                  ? "text-[#3B82F6]"
                                  : "text-gray-400"
                              }`}
                            >
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {proj.id === "lab-automation" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-gray-400 p-4 bg-[#0a0a0f] select-none h-[280px]">
                        {/* Header tracking */}
                        <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-3">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            Active scan seat distributor
                          </span>
                          <span className="text-[10px] text-[#06B6D4] font-semibold">
                            Node System Online
                          </span>
                        </div>

                        {/* Inputs mockup */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                              RFID Barcode:
                            </label>
                            <input
                              type="text"
                              value={barcodeInput}
                              onChange={(e) => setBarcodeInput(e.target.value)}
                              className="bg-black/40 border border-white/10 px-2 py-1.5 rounded text-xs text-white max-w-[180px] font-mono focus:border-[#06B6D4] outline-none"
                            />
                            <button
                              onClick={handleBarcodeScan}
                              className="px-3 py-1.5 bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20 hover:bg-[#06B6D4]/20 rounded text-[10px] font-bold transition-all cursor-pointer"
                            >
                              Scan ID Check-in
                            </button>
                          </div>

                          {/* Allocation result panel */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mt-2">
                            {/* Live seat mapping */}
                            <div className="md:col-span-4 bg-black/40 border border-white/[0.03] rounded p-3 flex flex-col justify-center items-center text-center">
                              <span className="text-[9px] text-gray-600 block uppercase tracking-widest font-bold">Allocated Node</span>
                              <span className="text-lg font-black text-white mt-1">
                                {lastAllocatedSeat ? lastAllocatedSeat : "WAITING SCAN"}
                              </span>
                              <div className="w-2.5 h-2.5 rounded-full mt-2 animate-pulse bg-emerald-400" />
                            </div>

                            {/* Verification logs output stream */}
                            <div className="md:col-span-8 bg-black/50 border border-white/[0.05] rounded p-2 text-[9px] h-20 overflow-y-auto space-y-1">
                              {allocationLog.length === 0 ? (
                                <span className="text-gray-600 italic block mt-4 text-center select-none">
                                  Submit a barcode above to trigger system records.
                                </span>
                              ) : (
                                allocationLog.map((log, iidx) => (
                                  <div key={iidx} className="text-[#06B6D4] leading-relaxed">
                                    {log}
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {proj.id === "event-management" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-gray-400 p-4 bg-[#0a0a0f] h-[280px]">
                        <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-3">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            SaaS Booking Scheduler
                          </span>
                          <span className="text-[#A855F7] text-[10px] font-bold bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/15">
                            ACID Sync (PostgreSQL)
                          </span>
                        </div>

                        {/* Booking calendar mockup layout grid */}
                        <div className="flex-1 grid grid-cols-4 gap-2 text-center text-[10px]">
                          {[...Array(8)].map((_, i) => {
                            const dateNum = 24 + i;
                            const isReserved = i % 3 === 0;

                            return (
                              <div
                                key={i}
                                className={`rounded-lg border p-2 flex flex-col justify-between transition-colors ${
                                  isReserved
                                    ? "bg-red-500/5 border-red-500/10 text-red-400"
                                    : "bg-[#A855F7]/5 border-[#A855F7]/10 text-[#A855F7]"
                                }`}
                              >
                                <span className="text-[9px] font-mono block mb-1">MAY {dateNum}</span>
                                <div className="text-xs font-bold leading-none py-1.5 font-sans">
                                  {isReserved ? "RESERVED" : "AVAILABLE"}
                                </div>
                                <span className="text-[8px] opacity-70 block tracking-widest">
                                  {isReserved ? "Node-Lock" : "24/24 Free"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-3 text-[9px] text-gray-500 flex items-center justify-between">
                          <span>Admin audit log: "Simultaneous check-ins balanced via safe transaction routines."</span>
                          <span className="text-white/40">60 FPS refresh</span>
                        </div>
                      </div>
                    )}

                    {proj.id === "music-recommender" && (
                      <div className="w-full h-full flex flex-col font-mono text-xs text-gray-400 p-4 bg-[#0a0a0f] h-[280px]">
                        <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-2">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            Realtime Face Classifier (Recsys)
                          </span>
                          <span className="text-emerald-400 text-[10px] font-bold">
                            92.4% Neural Confidence
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          {/* Face mesh simulation */}
                          <div className="relative rounded bg-black/40 border border-white/[0.04] p-3 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-2 left-2 text-[8px] font-bold tracking-widest text-[#3B82F6]/60">
                              FRONT_CAM NODE_LIVE
                            </div>
                            {/* Face wireframe design graphic placeholder */}
                            <div className="flex-1 flex justify-center items-center relative py-6">
                              <div className="w-16 h-16 rounded-full border border-dashed border-[#06B6D4] relative animate-pulse flex justify-center items-center">
                                <div className="w-8 h-4 border-b-2 border-[#06B6D4] rounded-b-full mt-3" />
                                <div className="absolute top-4 left-3 w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                                <div className="absolute top-4 right-3 w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                              </div>
                              {/* Scan beam */}
                              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent animate-bounce top-2" />
                            </div>

                            <div className="flex gap-1.5 justify-center">
                              {["Melancholic - Calm", "Energetic - Focused", "Anxious - Relaxing Ambient"].map((md) => (
                                <button
                                  key={md}
                                  onClick={() => handleMoodSelect(md)}
                                  className={`text-[8px] py-1 px-2 rounded-full border transition-all cursor-pointer ${
                                    selectedMusicMood === md
                                      ? "bg-[#06B6D4] text-black border-[#06B6D4]"
                                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-white"
                                  }`}
                                >
                                  {md.split(" - ")[0]}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Suggested Tracks output */}
                          <div className="bg-black/60 border border-white/[0.04] p-3 rounded flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-2 font-bold">Mood Rec Engine Queue</span>
                              {emotionScanning ? (
                                <div className="py-6 text-center text-[10px] text-gray-600 animate-pulse">Running vector prediction model...</div>
                              ) : (
                                <div className="space-y-1.5">
                                  {simulatedTracks.map((tr, tidx) => (
                                    <div key={tidx} className="flex items-center gap-1.5 text-[10px] text-gray-300">
                                      <Play className="w-2.5 h-2.5 text-[#06B6D4]" />
                                      <span className="truncate">{tr}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-[8px] font-mono text-[#06B6D4]">
                              Synced with Spotify API Feed
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blueprint Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
            />

            {/* Content Card layout */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 1 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950 border border-white/10 rounded-2xl overflow-y-auto shadow-2xl z-10 p-6 md:p-8"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full p-2 cursor-pointer transition-colors"
              >
                &lt;Close /&gt;
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#06B6D4]">
                    Architecture Blueprint View
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Sub features list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.05]">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#3B82F6] mb-3 font-extrabold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      SYSTEM CAPABILITIES
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      {selectedProject.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-3 font-extrabold flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5" />
                      SEQUENCE FLOWS
                    </h4>
                    <div className="space-y-3 font-mono text-[11px] text-gray-500">
                      <span className="block italic text-[10px] text-gray-600 mb-1">
                        * Step timeline triggers sequence execution path
                      </span>
                      {selectedProject.steps.map((stp, si) => (
                        <div key={si} className="border-l-2 border-[#06B6D4]/30 pl-3 relative">
                          <span className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-[#06B6D4]/90 border border-black" />
                          <div className="flex items-center justify-between text-[#06B6D4]">
                            <span className="font-bold">{stp.title}</span>
                            <span>{stp.time}</span>
                          </div>
                          <p className="text-gray-400 text-[10px] leading-relaxed mt-0.5">{stp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Architecture details list */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-3 font-extrabold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
                    {selectedProject.architectureDiagramTitle}
                  </h4>
                  <div className="space-y-2 text-xs text-gray-400 font-sans leading-relaxed">
                    {selectedProject.architectureDetails.map((detStr, di) => (
                      <p key={di} className="flex items-start gap-2">
                        <span className="font-mono text-[#06B6D4] font-semibold">[{di + 1}]</span>
                        <span>{detStr}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer links */}
                <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Repositories
                  </a>

                  <span className="text-[10px] font-mono text-gray-600">
                    Approved System Architecture
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
