import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFirebase } from "../context/FirebaseContext";
import { Timestamp } from "firebase/firestore";
import { 
  Lock, 
  Unlock, 
  Settings, 
  Terminal, 
  User, 
  FileCode, 
  Cpu, 
  BookOpen, 
  MessageSquare, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Save, 
  LogOut,
  Calendar,
  ShieldCheck,
  X
} from "lucide-react";
import { Project, TechItem, ExperienceItem, BlogPost } from "../types";

export default function AdminDashboard() {
  const { 
    bio, 
    projects, 
    techStack, 
    experiences, 
    blogPosts, 
    currentUser, 
    isAdmin, 
    loginWithGoogle, 
    logout, 
    seedDatabase, 
    updateBio, 
    saveProject, 
    deleteProject, 
    saveTechItem, 
    deleteTechItem, 
    saveExperience, 
    deleteExperience, 
    saveBlogPost, 
    deleteBlogPost 
  } = useFirebase();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bio" | "projects" | "skills" | "experiences" | "blogs">("bio");
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Temp form states
  const [bioForm, setBioForm] = useState(bio);
  
  // Project editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Tech item edit state
  const [newTech, setNewTech] = useState<TechItem>({ name: "", category: "backend", proficiency: "Expert", glowingColor: "blue" });

  // Experience edit state
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [isNewExp, setIsNewExp] = useState(false);

  // Blog post edit state
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  // Track the contact messages list dynamically (read-only for tech telemetry)
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [telemetryOpen, setTelemetryOpen] = useState(false);

  // Sync edit forms on open
  const handleOpenDeck = () => {
    setBioForm(bio);
    setIsOpen(true);
  };

  const handleSeed = async () => {
    if (confirm("Are you sure you want to seed the database? This will overwrite or initialize entries with default values.")) {
      setIsSaving(true);
      try {
        await seedDatabase();
        setSuccessMsg("Database successfully seeded with static entries!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } catch (err) {
        alert("Seeding error production level: See console logs.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSaveBio = async () => {
    setIsSaving(true);
    setSuccessMsg("");
    try {
      await updateBio(bioForm);
      setSuccessMsg("Biography specs successfully updated in Firestore!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert("Error saving bio specifications.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSaving(true);
    try {
      await saveProject(editingProject);
      setSuccessMsg(`Project blueprint '${editingProject.title}' committed successfully.`);
      setEditingProject(null);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert("Error saving project blueprint shape.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTech.name) return;
    setIsSaving(true);
    try {
      await saveTechItem(newTech);
      setNewTech({ name: "", category: "backend", proficiency: "Expert", glowingColor: "blue" });
      setSuccessMsg("New Skill token added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert("Failed to commit tech item.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveExpForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    setIsSaving(true);
    try {
      await saveExperience(editingExp);
      setSuccessMsg("Experience timeline block updated.");
      setEditingExp(null);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert("Failed to update experience.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveBlogForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    setIsSaving(true);
    try {
      await saveBlogPost(editingBlog);
      setSuccessMsg("Technical blog writeup registered under dynamic cloud collections.");
      setEditingBlog(null);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert("Failed to save blog post.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper inside dashboard backends
  const handleFetchMessages = async () => {
    // Dynamic read messages on demand
    const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
    const { db } = await import("../firebase");
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list: any[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setMessagesList(list);
      setTelemetryOpen(true);
    } catch (error) {
      alert("Admin authorization error: Only verified administrator accounts can pull telemetry signals.");
    }
  };

  return (
    <>
      {/* Mini lock button in page footer or margin */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={handleOpenDeck}
          title="Open Admin Settings Dashboard"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e0e14] border border-neutral-800 hover:border-neutral-500 text-neutral-400 hover:text-white text-[10px] font-mono tracking-widest uppercase cursor-pointer transition-all duration-300 shadow-xl"
        >
          {isAdmin ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-neutral-500" />}
          <span>Control Panel</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />

            {/* Admin interface container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#09090d]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col font-sans"
            >
              {/* Header bar visual */}
              <div className="flex justify-between items-center bg-[#0d0d14]/80 px-6 py-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-[#3B82F6]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06B6D4]">
                    Cloud Architecture control Deck
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <button
                      onClick={handleSeed}
                      className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-md text-[10px] font-mono hover:bg-yellow-500/20 cursor-pointer"
                    >
                      Seed DB
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-500 hover:text-white transition-all cursor-pointer text-xs"
                  >
                    &lt;Exit /&gt;
                  </button>
                </div>
              </div>

              {/* Security authentication gate status */}
              {!currentUser ? (
                <div className="p-12 text-center space-y-6 flex-1 flex flex-col justify-center items-center">
                  <Lock className="w-12 h-12 text-neutral-600 animate-pulse" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display">
                    Secure Admin Handshake Required
                  </h3>
                  <p className="text-gray-400 text-xs font-mono max-w-sm">
                    Access restricted solely to the system owner. Authenticate credentials via Google Portal.
                  </p>
                  <button
                    onClick={loginWithGoogle}
                    className="px-6 py-3 bg-white text-black font-semibold text-xs uppercase font-mono tracking-widest rounded-lg hover:bg-gray-200 cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    Authenticate Access
                  </button>
                </div>
              ) : !isAdmin ? (
                <div className="p-12 text-center space-y-6 flex-1 flex flex-col justify-center items-center">
                  <ShieldCheck className="w-12 h-12 text-red-500" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    ACCESS DENIED
                  </h3>
                  <p className="text-gray-400 text-xs font-mono max-w-sm">
                    Authenticated session under <span className="text-red-400 font-bold">{currentUser.email}</span> lacks absolute administrator scopes.
                  </p>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-xs uppercase font-mono tracking-widest rounded-lg hover:bg-red-500/20 cursor-pointer"
                  >
                    De-Authorize and Disconnect
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
                  
                  {/* Vertical left tab list */}
                  <div className="w-full md:w-56 bg-[#040407]/40 border-r border-white/[0.05] p-4 flex flex-col gap-2 shrink-0 overflow-y-auto">
                    <span className="text-[9px] font-mono text-neutral-500 font-black uppercase tracking-wider mb-2 ml-2">// CONFIG SEGMENTS</span>
                    
                    <button
                      onClick={() => setActiveTab("bio")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs uppercase font-bold tracking-wider transition-all select-none cursor-pointer ${
                        activeTab === "bio" ? "bg-white text-black font-mono font-black" : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      Biography
                    </button>

                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs uppercase font-bold tracking-wider transition-all select-none cursor-pointer ${
                        activeTab === "projects" ? "bg-white text-black font-mono font-black" : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <FileCode className="w-4 h-4" />
                      Projects
                    </button>

                    <button
                      onClick={() => setActiveTab("skills")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs uppercase font-bold tracking-wider transition-all select-none cursor-pointer ${
                        activeTab === "skills" ? "bg-white text-black font-mono font-black" : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <Cpu className="w-4 h-4" />
                      Skills Stack
                    </button>

                    <button
                      onClick={() => setActiveTab("experiences")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs uppercase font-bold tracking-wider transition-all select-none cursor-pointer ${
                        activeTab === "experiences" ? "bg-white text-black font-mono font-black" : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <Terminal className="w-4 h-4" />
                      Experiences
                    </button>

                    <button
                      onClick={() => setActiveTab("blogs")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs uppercase font-bold tracking-wider transition-all select-none cursor-pointer ${
                        activeTab === "blogs" ? "bg-white text-black font-mono font-black" : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Archives
                    </button>

                    <div className="h-px bg-white/[0.05] my-4" />

                    <button
                      onClick={handleFetchMessages}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-left text-xs text-[#06B6D4] hover:bg-[#06B6D4]/10 uppercase font-black tracking-widest transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Inbox Telemetry
                    </button>

                    <button
                      onClick={logout}
                      className="mt-auto flex items-center gap-2.5 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl text-left text-xs uppercase font-black tracking-widest transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Disconnect
                    </button>
                  </div>

                  {/* Main editing canvas frame */}
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
                    {successMsg && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{successMsg}</span>
                      </div>
                    )}

                    {/* TAB CONTENT: BIOGRAPHY */}
                    {activeTab === "bio" && (
                      <div className="space-y-6">
                        <h4 className="text-sm font-mono tracking-wider font-extrabold text-[#06B6D4] uppercase">Bio-Specs Registry Mapping</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">Developer Name</label>
                            <input 
                              type="text" 
                              value={bioForm.name} 
                              onChange={(e) => setBioForm({...bioForm, name: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">Role Title</label>
                            <input 
                              type="text" 
                              value={bioForm.title} 
                              onChange={(e) => setBioForm({...bioForm, title: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">Framework Focus Subtitle</label>
                            <input 
                              type="text" 
                              value={bioForm.subtitle} 
                              onChange={(e) => setBioForm({...bioForm, subtitle: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">Tagline Narrative</label>
                            <input 
                              type="text" 
                              value={bioForm.tagline} 
                              onChange={(e) => setBioForm({...bioForm, tagline: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">Email Address</label>
                            <input 
                              type="text" 
                              value={bioForm.email} 
                              onChange={(e) => setBioForm({...bioForm, email: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">Telephony Endpoint</label>
                            <input 
                              type="text" 
                              value={bioForm.phone} 
                              onChange={(e) => setBioForm({...bioForm, phone: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">GitHub Link</label>
                            <input 
                              type="text" 
                              value={bioForm.socials?.github || ""} 
                              onChange={(e) => setBioForm({...bioForm, socials: { ...bioForm.socials, github: e.target.value }})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">LinkedIn Link</label>
                            <input 
                              type="text" 
                              value={bioForm.socials?.linkedin || ""} 
                              onChange={(e) => setBioForm({...bioForm, socials: { ...bioForm.socials, linkedin: e.target.value }})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#3B82F6]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-gray-400 font-bold uppercase">Biography Narrative (Markdown or linebreaks supported)</label>
                          <textarea 
                            rows={5}
                            value={bioForm.aboutFull} 
                            onChange={(e) => setBioForm({...bioForm, aboutFull: e.target.value})}
                            className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-3.5 text-xs text-white resize-none outline-none focus:border-[#3B82F6]"
                          />
                        </div>

                        <button
                          onClick={handleSaveBio}
                          disabled={isSaving}
                          className="w-full bg-white hover:bg-neutral-200 text-black py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Commit Bio Specs</span>
                        </button>
                      </div>
                    )}

                    {/* TAB CONTENT: PROJECTS */}
                    {activeTab === "projects" && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="font-extrabold uppercase tracking-wider text-[#06B6D4]">Project Instances Core</span>
                          <button
                            onClick={() => {
                              setIsNewProject(true);
                              setEditingProject({
                                id: "new-instance",
                                title: "New Project",
                                subtitle: "Backend API Scope",
                                description: "Description details...",
                                longDescription: "",
                                category: "backend" as any,
                                tags: ["java", "springboot"],
                                metrics: [],
                                features: [],
                                architectureDiagramTitle: "System Blueprint Diagrams",
                                architectureDetails: [],
                                steps: [],
                                githubUrl: ""
                              });
                            }}
                            className="px-3.5 py-1.5 bg-white text-black font-bold uppercase rounded-lg flex items-center gap-1.5 cursor-pointer text-[10px]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Project</span>
                          </button>
                        </div>

                        {/* List Projects */}
                        {!editingProject && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projects.map((proj) => (
                              <div key={proj.id} className="bg-[#0e0e14]/60 border border-neutral-900 rounded-2xl p-4 flex justify-between items-center hover:border-neutral-800 transition-colors">
                                <div>
                                  <h5 className="font-bold text-xs text-white">{proj.title}</h5>
                                  <span className="text-[10px] font-mono text-neutral-500 block uppercase pt-0.5">{proj.category}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingProject(proj);
                                      setIsNewProject(false);
                                    }}
                                    className="px-2.5 py-1.5 bg-neutral-800 text-white rounded-lg text-[10px] font-mono hover:bg-neutral-700 cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Delete project blueprint: "${proj.title}"?`)) {
                                        await deleteProject(proj.id);
                                        setSuccessMsg("Project deleted successfully.");
                                        setTimeout(() => setSuccessMsg(""), 3000);
                                      }
                                    }}
                                    className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {editingProject && (
                          <form onSubmit={handleSaveProjectForm} className="space-y-4 bg-[#0a0a0f] border border-white/5 rounded-2xl p-5 md:p-6">
                            <h5 className="text-xs font-mono font-bold text-white uppercase mb-4 border-b border-white/[0.05] pb-2">
                              {isNewProject ? "Deploying New Instance Config" : `Updating Blueprint ID: ${editingProject.id}`}
                            </h5>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Project Unique ID (Alphanumeric)</label>
                                <input 
                                  type="text" 
                                  disabled={!isNewProject}
                                  value={editingProject.id} 
                                  onChange={(e) => setEditingProject({...editingProject, id: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Project Display Title</label>
                                <input 
                                  type="text" 
                                  value={editingProject.title} 
                                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Subtitle</label>
                                <input 
                                  type="text" 
                                  value={editingProject.subtitle} 
                                  onChange={(e) => setEditingProject({...editingProject, subtitle: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Category Scope</label>
                                <select 
                                  value={editingProject.category} 
                                  onChange={(e) => setEditingProject({...editingProject, category: e.target.value as any})}
                                  className="w-full bg-[#121217] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                >
                                  <option value="devops">DevOps</option>
                                  <option value="automation">Automation</option>
                                  <option value="fullstack">Frontend/Fullstack Integration</option>
                                  <option value="ai_ml">AI & ML RecSys</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Short Summary</label>
                              <input 
                                type="text" 
                                value={editingProject.description} 
                                onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Long Spec Details</label>
                              <textarea 
                                rows={3}
                                value={editingProject.longDescription} 
                                onChange={(e) => setEditingProject({...editingProject, longDescription: e.target.value})}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-3 text-xs text-white"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">GitHub Source Code link</label>
                                <input 
                                  type="text" 
                                  value={editingProject.githubUrl} 
                                  onChange={(e) => setEditingProject({...editingProject, githubUrl: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Architecture Diagram title</label>
                                <input 
                                  type="text" 
                                  value={editingProject.architectureDiagramTitle} 
                                  onChange={(e) => setEditingProject({...editingProject, architectureDiagramTitle: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end pt-4">
                              <button
                                type="button"
                                onClick={() => setEditingProject(null)}
                                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2 bg-white text-black font-semibold rounded-lg text-xs font-mono uppercase cursor-pointer"
                              >
                                Save Blueprint
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    )}

                    {/* TAB CONTENT: SKILLS STACK */}
                    {activeTab === "skills" && (
                      <div className="space-y-6">
                        <h4 className="text-sm font-mono tracking-wider font-extrabold text-[#06B6D4] uppercase">Manage Skills tokens</h4>
                        
                        {/* Add Skill */}
                        <form onSubmit={handleAddTech} className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-[#0a0a0f] border border-white/5 rounded-2xl p-4 items-end">
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[9px] font-mono text-gray-500 uppercase font-bold">Skill Name</label>
                            <input 
                              type="text" 
                              required
                              placeholder="e.g. Kotlin"
                              value={newTech.name} 
                              onChange={(e) => setNewTech({...newTech, name: e.target.value})}
                              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono text-gray-500 uppercase font-bold">Category</label>
                            <select 
                              value={newTech.category} 
                              onChange={(e) => setNewTech({...newTech, category: e.target.value as any})}
                              className="w-full bg-[#121217] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white"
                            >
                              <option value="backend">Backend</option>
                              <option value="frontend">Frontend</option>
                              <option value="database">Database</option>
                              <option value="devops">DevOps</option>
                              <option value="programming">Languages</option>
                              <option value="ai_ml">AI/ML</option>
                              <option value="tools">Tools</option>
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-white text-black font-bold uppercase py-2.5 px-4 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer hover:bg-neutral-200"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add token</span>
                          </button>
                        </form>

                        {/* Direct display listed skills */}
                        <div className="max-h-72 overflow-y-auto space-y-2 pr-2">
                          {techStack.map((tech) => (
                            <div key={tech.name} className="flex justify-between items-center px-4 py-2.5 bg-[#0e0e14]/50 border border-neutral-900 rounded-xl hover:border-neutral-800 transition-colors">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white font-semibold font-sans">{tech.name}</span>
                                <span className="text-[9px] font-mono text-neutral-500 uppercase py-0.5 px-2 bg-neutral-900 rounded border border-neutral-800">{tech.category}</span>
                              </div>
                              <button
                                onClick={async () => {
                                  if (confirm(`Delete skill ${tech.name}?`)) {
                                    await deleteTechItem(tech.name);
                                    setSuccessMsg("Skill token destroyed.");
                                    setTimeout(() => setSuccessMsg(""), 3000);
                                  }
                                }}
                                className="p-1.5 text-red-400 hover:bg-red-400/5 hover:text-red-500 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: EXPERIENCES */}
                    {activeTab === "experiences" && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="font-extrabold uppercase tracking-wider text-[#06B6D4]">Developer Chronicles</span>
                          <button
                            onClick={() => {
                              setIsNewExp(true);
                              setEditingExp({
                                id: "new-exp",
                                period: "2024 - Present",
                                role: "Backend Developer",
                                institution: "Federation MCA",
                                location: "Kerala, India",
                                description: "Description details...",
                                achievements: [],
                                category: "academic" as any
                              });
                            }}
                            className="px-3.5 py-1.5 bg-white text-black font-bold uppercase rounded-lg flex items-center gap-1.5 cursor-pointer text-[10px]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Chronicles Link</span>
                          </button>
                        </div>

                        {!editingExp && (
                          <div className="space-y-3">
                            {experiences.map((exp) => (
                              <div key={exp.id} className="bg-[#0e0e14]/60 border border-neutral-900 rounded-2xl p-4 flex justify-between items-center hover:border-neutral-800 transition-colors">
                                <div>
                                  <h5 className="font-bold text-xs text-white">{exp.role}</h5>
                                  <span className="text-[10px] font-mono text-neutral-500 block uppercase pt-0.5">{exp.institution} | {exp.period}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingExp(exp);
                                      setIsNewExp(false);
                                    }}
                                    className="px-2.5 py-1.5 bg-neutral-800 text-white rounded-lg text-[10px] font-mono hover:bg-neutral-700 cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Remove Chronicles node '${exp.role}'?`)) {
                                        await deleteExperience(exp.id);
                                        setSuccessMsg("Chronicle deleted.");
                                        setTimeout(() => setSuccessMsg(""), 3000);
                                      }
                                    }}
                                    className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {editingExp && (
                          <form onSubmit={handleSaveExpForm} className="space-y-4 bg-[#0a0a0f] border border-white/5 rounded-2xl p-5 md:p-6">
                            <h5 className="text-xs font-mono font-bold text-white uppercase mb-4 border-b border-white/[0.05] pb-2">Edit Chronicle Milestone</h5>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Unique ID (Alphanumeric)</label>
                                <input 
                                  type="text" 
                                  disabled={!isNewExp}
                                  value={editingExp.id} 
                                  onChange={(e) => setEditingExp({...editingExp, id: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Role Title</label>
                                <input 
                                  type="text" 
                                  value={editingExp.role} 
                                  onChange={(e) => setEditingExp({...editingExp, role: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Institution / Company</label>
                                <input 
                                  type="text" 
                                  value={editingExp.institution} 
                                  onChange={(e) => setEditingExp({...editingExp, institution: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Milestone Period</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. 2024 - PRESENT"
                                  value={editingExp.period} 
                                  onChange={(e) => setEditingExp({...editingExp, period: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Location Coordinate</label>
                                <input 
                                  type="text" 
                                  value={editingExp.location} 
                                  onChange={(e) => setEditingExp({...editingExp, location: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Milestone Category</label>
                                <select 
                                  value={editingExp.category} 
                                  onChange={(e) => setEditingExp({...editingExp, category: e.target.value as any})}
                                  className="w-full bg-[#121217] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                >
                                  <option value="academic">Academic Profile</option>
                                  <option value="development">Industrial Development</option>
                                  <option value="certification">Professional Certification</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Narrative Description</label>
                              <textarea 
                                rows={2}
                                value={editingExp.description} 
                                onChange={(e) => setEditingExp({...editingExp, description: e.target.value})}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-3 text-xs text-white resize-none"
                              />
                            </div>

                            <div className="flex gap-2 justify-end pt-4">
                              <button
                                type="button"
                                onClick={() => setEditingExp(null)}
                                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2 bg-white text-black font-semibold rounded-lg text-xs font-mono uppercase cursor-pointer"
                              >
                                Save Chronicle Node
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    )}

                    {/* TAB CONTENT: BLOG ARCHIVES */}
                    {activeTab === "blogs" && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="font-extrabold uppercase tracking-wider text-[#06B6D4]">Technical Insights Registry</span>
                          <button
                            onClick={() => {
                              setIsNewBlog(true);
                              setEditingBlog({
                                id: "new-article",
                                title: "Title Heading",
                                category: "springboot",
                                summary: "Overview summarized...",
                                date: "May 27, 2026",
                                readTime: "5 Min Read",
                                content: "# Article Content in Markdown..."
                              });
                            }}
                            className="px-3.5 py-1.5 bg-white text-black font-bold uppercase rounded-lg flex items-center gap-1.5 cursor-pointer text-[10px]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Article</span>
                          </button>
                        </div>

                        {!editingBlog && (
                          <div className="space-y-3">
                            {blogPosts.map((post) => (
                              <div key={post.id} className="bg-[#0e0e14]/60 border border-neutral-900 rounded-2xl p-4 flex justify-between items-center hover:border-neutral-800 transition-colors">
                                <div>
                                  <h5 className="font-bold text-xs text-white">{post.title}</h5>
                                  <span className="text-[10px] font-mono text-neutral-500 block uppercase pt-0.5">{post.category} | {post.date}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingBlog(post);
                                      setIsNewBlog(false);
                                    }}
                                    className="px-2.5 py-1.5 bg-neutral-800 text-white rounded-lg text-[10px] font-mono hover:bg-neutral-700 cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Remove article '${post.title}' permanently?`)) {
                                        await deleteBlogPost(post.id);
                                        setSuccessMsg("Archive entry cleared.");
                                        setTimeout(() => setSuccessMsg(""), 3000);
                                      }
                                    }}
                                    className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {editingBlog && (
                          <form onSubmit={handleSaveBlogForm} className="space-y-4 bg-[#0a0a0f] border border-white/5 rounded-2xl p-5 md:p-6">
                            <h5 className="text-xs font-mono font-bold text-white uppercase mb-4 border-b border-white/[0.05] pb-2">Deploy Archive Update</h5>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Unique ID (Alphanumeric)</label>
                                <input 
                                  type="text" 
                                  disabled={!isNewBlog}
                                  value={editingBlog.id} 
                                  onChange={(e) => setEditingBlog({...editingBlog, id: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Article Title</label>
                                <input 
                                  type="text" 
                                  value={editingBlog.title} 
                                  onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Category Core</label>
                                <select 
                                  value={editingBlog.category} 
                                  onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value as any})}
                                  className="w-full bg-[#121217] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                >
                                  <option value="microservices">Microservices</option>
                                  <option value="springboot">Spring Boot</option>
                                  <option value="docker">Docker</option>
                                  <option value="kubernetes">Kubernetes</option>
                                  <option value="ai">AI Engineering</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Reading Time Duration Label</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. 7 Min Read"
                                  value={editingBlog.readTime} 
                                  onChange={(e) => setEditingBlog({...editingBlog, readTime: e.target.value})}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Summary Hook</label>
                              <input 
                                type="text" 
                                value={editingBlog.summary} 
                                onChange={(e) => setEditingBlog({...editingBlog, summary: e.target.value})}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-gray-400 uppercase font-bold">Article MD Content</label>
                              <textarea 
                                rows={8}
                                value={editingBlog.content} 
                                onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-lg p-3 text-xs text-white outline-none focus:border-[#3B82F6]"
                              />
                            </div>

                            <div className="flex gap-2 justify-end pt-4">
                              <button
                                type="button"
                                onClick={() => setEditingBlog(null)}
                                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-6 py-2 bg-white text-black font-semibold rounded-lg text-xs font-mono uppercase cursor-pointer"
                              >
                                Deploy Article Archive
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Received contact messages terminal overlay */}
      <AnimatePresence>
        {telemetryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTelemetryOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur"
            />
            
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[80vh] bg-[#050508] border border-[#06B6D4]/30 rounded-2xl flex flex-col overflow-hidden z-10 shadow-2xl p-6 font-mono text-xs text-neutral-400"
            >
              <div className="flex items-center justify-between border-b border-[#06B6D4]/20 pb-4 mb-4 text-[#06B6D4]">
                <span className="font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  DYNAMIC PROTOCOL LISTENER: /messages
                </span>
                <button
                  onClick={() => setTelemetryOpen(false)}
                  className="hover:text-white cursor-pointer"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-none">
                {messagesList.length === 0 ? (
                  <div className="text-center text-neutral-600 py-12">No communication queues logged in registry.</div>
                ) : (
                  messagesList.map((msg, index) => {
                    const formattedDate = msg.createdAt instanceof Timestamp 
                      ? msg.createdAt.toDate().toLocaleString() 
                      : msg.createdAt?.seconds 
                      ? new Date(msg.createdAt.seconds * 1000).toLocaleString()
                      : String(msg.createdAt || "Timestamp Unavailable");

                    return (
                      <div key={msg.id} className="p-4 bg-black/60 rounded-xl border border-neutral-900 space-y-2 relative group hover:border-neutral-800 transition-colors">
                        <span className="absolute top-2 right-4 text-[9px] text-neutral-600">[{index + 1}] {formattedDate}</span>
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase block font-bold">Sender Name</span>
                          <span className="text-white font-bold text-sm">{msg.name}</span>
                          <span className="text-[10px] text-[#3B82F6] font-semibold block">{msg.email}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-500 uppercase block font-bold">Subject Header</span>
                          <span className="text-neutral-200 font-bold">{msg.subject}</span>
                        </div>
                        <div className="pt-2 border-t border-neutral-900/50 mt-1">
                          <span className="text-[10px] text-neutral-500 uppercase block font-bold">Transmission Body</span>
                          <p className="text-neutral-400 whitespace-pre-line leading-relaxed font-sans text-xs">{msg.message}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
