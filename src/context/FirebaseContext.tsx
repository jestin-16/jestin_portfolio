import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  collection, 
  onSnapshot, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  getDocFromServer, 
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { db, auth, handleFirestoreError, OperationType } from "../firebase";
import { 
  JESTIN_BIO, 
  PROJECTS, 
  TECH_STACK, 
  EXPERIENCES, 
  BLOG_POSTS 
} from "../data";
import { Project, TechItem, ExperienceItem, BlogPost } from "../types";

interface FirebaseContextType {
  bio: typeof JESTIN_BIO;
  projects: Project[];
  techStack: TechItem[];
  experiences: ExperienceItem[];
  blogPosts: BlogPost[];
  loading: boolean;
  currentUser: User | null;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  seedDatabase: () => Promise<void>;
  updateBio: (newBio: typeof JESTIN_BIO) => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  saveTechItem: (tech: TechItem) => Promise<void>;
  deleteTechItem: (techName: string) => Promise<void>;
  saveExperience: (exp: ExperienceItem) => Promise<void>;
  deleteExperience: (expId: string) => Promise<void>;
  saveBlogPost: (blog: BlogPost) => Promise<void>;
  deleteBlogPost: (blogId: string) => Promise<void>;
  submitMessage: (name: string, email: string, subject: string, message: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used inside a FirebaseProvider");
  }
  return context;
};

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dynamic portfolio details initialized with local file fallbacks
  const [bio, setBio] = useState<typeof JESTIN_BIO>(JESTIN_BIO);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [techStack, setTechStack] = useState<TechItem[]>(TECH_STACK);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(EXPERIENCES);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);

  // Connection validation checks as mandated by the SDK instructions
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Firebase connection check: Client application appears offline. Using resilient local configurations.");
        }
      }
    }
    testConnection();
  }, []);

  // Set up Firebase Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email === "jestinshaji777@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Set up real-time sync with defensive local fallbacks for high-density components
  useEffect(() => {
    setLoading(true);

    // 1. Sync Biography Doc
    const bioDocRef = doc(db, "bio", "main");
    const unsubBio = onSnapshot(bioDocRef, (snapshot) => {
      if (snapshot.exists()) {
        setBio(snapshot.data() as typeof JESTIN_BIO);
      } else {
        setBio(JESTIN_BIO);
      }
    }, (error) => {
      console.warn("Bio document subscription failed, using local fallback:", error);
    });

    // 2. Sync Projects Collection
    const projectsColRef = collection(db, "projects");
    const unsubProjects = onSnapshot(projectsColRef, (snapshot) => {
      if (!snapshot.empty) {
        const list: Project[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as Project);
        });
        // Sort by ID or titles to ensure predictable layout sorting
        setProjects(list.sort((a, b) => a.id.localeCompare(b.id)));
      } else {
        setProjects(PROJECTS);
      }
    }, (error) => {
      console.warn("Projects collection subscription failed, using local fallback:", error);
    });

    // 3. Sync TechStack Collection
    const techStackColRef = collection(db, "techStack");
    const unsubTech = onSnapshot(techStackColRef, (snapshot) => {
      if (!snapshot.empty) {
        const list: TechItem[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as TechItem);
        });
        setTechStack(list);
      } else {
        setTechStack(TECH_STACK);
      }
    }, (error) => {
      console.warn("TechStack collection subscription failed, using local fallback:", error);
    });

    // 4. Sync Experiences Collection
    const experiencesColRef = collection(db, "experiences");
    const unsubExperiences = onSnapshot(experiencesColRef, (snapshot) => {
      if (!snapshot.empty) {
        const list: ExperienceItem[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as ExperienceItem);
        });
        setExperiences(list.sort((a, b) => a.id.localeCompare(b.id)));
      } else {
        setExperiences(EXPERIENCES);
      }
    }, (error) => {
      console.warn("Experiences collection subscription failed, using local fallback:", error);
    });

    // 5. Sync BlogPosts Collection
    const blogPostsColRef = collection(db, "blogPosts");
    const unsubBlogs = onSnapshot(blogPostsColRef, (snapshot) => {
      if (!snapshot.empty) {
        const list: BlogPost[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as BlogPost);
        });
        setBlogPosts(list.sort((a, b) => b.date.localeCompare(a.date)));
      } else {
        setBlogPosts(BLOG_POSTS);
      }
      setLoading(false);
    }, (error) => {
      console.warn("BlogPosts collection subscription failed, using local fallback:", error);
      setLoading(false);
    });

    return () => {
      unsubBio();
      unsubProjects();
      unsubTech();
      unsubExperiences();
      unsubBlogs();
    };
  }, []);

  // Sign in / authentication flows
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Auth Exception:", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("SignOut Exception:", err);
    }
  };

  // Seeding routine: Takes static values from data.ts and uploads them to the dynamic database instant
  const seedDatabase = async () => {
    if (!isAdmin) {
      throw new Error("Self-seeding is restricted solely to verified portfolio administrators.");
    }

    try {
      // Seed Bio
      await setDoc(doc(db, "bio", "main"), JESTIN_BIO);

      // Seed Projects
      for (const proj of PROJECTS) {
        await setDoc(doc(db, "projects", proj.id), proj);
      }

      // Seed TechStack items
      for (const tech of TECH_STACK) {
        // Alphanumeric keys for tech matching rules
        const cleanId = tech.name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
        await setDoc(doc(db, "techStack", cleanId), tech);
      }

      // Seed Experiences
      for (const exp of EXPERIENCES) {
        await setDoc(doc(db, "experiences", exp.id), exp);
      }

      // Seed Blog
      for (const blog of BLOG_POSTS) {
        await setDoc(doc(db, "blogPosts", blog.id), blog);
      }

      console.log("Database initialized successfully with default static entries.");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, "seeding");
    }
  };

  // Administrator portfolio modification triggers
  const updateBio = async (newBio: typeof JESTIN_BIO) => {
    const targetPath = "bio/main";
    try {
      await setDoc(doc(db, "bio", "main"), newBio);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, targetPath);
    }
  };

  const saveProject = async (project: Project) => {
    const targetPath = `projects/${project.id}`;
    try {
      await setDoc(doc(db, "projects", project.id), project);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, targetPath);
    }
  };

  const deleteProject = async (projectId: string) => {
    const targetPath = `projects/${projectId}`;
    try {
      await deleteDoc(doc(db, "projects", projectId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, targetPath);
    }
  };

  const saveTechItem = async (tech: TechItem) => {
    const cleanId = tech.name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const targetPath = `techStack/${cleanId}`;
    try {
      await setDoc(doc(db, "techStack", cleanId), tech);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, targetPath);
    }
  };

  const deleteTechItem = async (techName: string) => {
    const cleanId = techName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const targetPath = `techStack/${cleanId}`;
    try {
      await deleteDoc(doc(db, "techStack", cleanId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, targetPath);
    }
  };

  const saveExperience = async (exp: ExperienceItem) => {
    const targetPath = `experiences/${exp.id}`;
    try {
      await setDoc(doc(db, "experiences", exp.id), exp);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, targetPath);
    }
  };

  const deleteExperience = async (expId: string) => {
    const targetPath = `experiences/${expId}`;
    try {
      await deleteDoc(doc(db, "experiences", expId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, targetPath);
    }
  };

  const saveBlogPost = async (blog: BlogPost) => {
    const targetPath = `blogPosts/${blog.id}`;
    try {
      await setDoc(doc(db, "blogPosts", blog.id), blog);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, targetPath);
    }
  };

  const deleteBlogPost = async (blogId: string) => {
    const targetPath = `blogPosts/${blogId}`;
    try {
      await deleteDoc(doc(db, "blogPosts", blogId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, targetPath);
    }
  };

  const submitMessage = async (name: string, email: string, subject: string, message: string) => {
    const cleanId = `msg_${Math.random().toString(36).substring(2, 11)}`;
    const targetPath = `messages/${cleanId}`;
    try {
      await setDoc(doc(db, "messages", cleanId), {
        name,
        email,
        subject: subject || "No Subject",
        message,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, targetPath);
    }
  };

  return (
    <FirebaseContext.Provider value={{
      bio,
      projects,
      techStack,
      experiences,
      blogPosts,
      loading,
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
      deleteBlogPost,
      submitMessage
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};
