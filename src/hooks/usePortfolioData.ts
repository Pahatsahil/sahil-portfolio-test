import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { firebaseConfig, COLLECTIONS } from "../lib/firebase";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase (only once)
let db: ReturnType<typeof getFirestore> | null = null;

const getDb = () => {
  if (!db) {
    try {
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
      db = getFirestore(app);
    } catch (error) {
      console.error("Firebase initialization error:", error);
      return null;
    }
  }
  return db;
};

// Types
export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  resumeUrl: string;
  avatar?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  platform: string;
  color: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface Social {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactConfig {
  email: string;
  phone: string;
  showPhone: boolean;
  showEmail: boolean;
}

// Hook to fetch profile
export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const firestore = getDb();
        if (!firestore) {
          // Use default profile if Firebase is not configured
          setProfile({
            name: "Sahil Pahat",
            title: "React Native Developer",
            subtitle: "Cross-Platform Mobile App Specialist",
            bio: "With 4 years of experience in cross-platform mobile development, I specialize in building high-performance mobile applications for Android and iOS using React Native, TypeScript, and native modules.",
            resumeUrl: "/Sahil_Pahat_Resume.pdf",
          });
          setLoading(false);
          return;
        }

        const docRef = doc(firestore, COLLECTIONS.PROFILE, "main");
        const docSnap = await getDoc(docRef);
        console.log("Doc data:", docSnap.data());
        if (docSnap.exists()) {
          setProfile(docSnap.data() as Profile);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

// Hook to fetch experience
export const useExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const firestore = getDb();
        if (!firestore) {
          // Default experience data
          setExperiences([
            {
              id: "1",
              title: "Solution Developer (React Native)",
              company: "iTechMission Private Limited",
              period: "Mar 2025 – Present",
              highlights: [
                "Engineered native Android (Kotlin) and iOS (Swift) microphone listener services for real-time, low-latency audio analysis",
                "Architected an offline-first mobile application optimized for low-end hardware using SQLite",
                "Developed a high-performance social media app using TypeScript, reducing production runtime errors by 50%",
                "Optimized performance of a charting module using custom eCharts for online and offline mode",
              ],
            },
            {
              id: "2",
              title: "React Native Developer",
              company: "Cyber Vision Infotech Pvt. Ltd",
              period: "Apr 2023 – Mar 2025",
              highlights: [
                "Increased subscription purchases by 30% through effective call-to-action notifications and App linking",
                "Created a custom native audio player in Kotlin and Swift using sophisticated React Native bridging",
                "Developed seamless animations for a high-traffic Fitness App using the Reanimated Library",
                "Integrated REST APIs using Axios and optimized React Hooks to improve rendering performance",
              ],
            },
            {
              id: "3",
              title: "React Native Developer",
              company: "Syscorp Inc.",
              period: "Nov 2022 – Feb 2023",
              highlights: [
                "Enhanced warehouse management by boosting app performance by 20% with live QR scanning",
                "Developed various high-utility applications including a cashback app similar to CashKaro",
              ],
            },
          ]);
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(
          collection(firestore, COLLECTIONS.EXPERIENCE),
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Experience[];
        setExperiences(data);
      } catch (err) {
        console.error("Error fetching experience:", err);
        setError("Failed to load experience");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experiences, loading, error };
};

// Hook to fetch projects
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const firestore = getDb();
        if (!firestore) {
          // Default projects data
          setProjects([
            {
              id: "1",
              title: "Fitme App",
              subtitle: "Home Workout Platform",
              description:
                "Built a high-performance workout engine using Reanimated for fluid animations. Natively bridged audio players to sync sets and rest timers with video on demand.",
              tech: [
                "React Native",
                "TypeScript",
                "Reanimated",
                "Kotlin",
                "Swift",
              ],
              platform: "Android & iOS",
              color: "from-emerald-500 to-teal-600",
            },
            {
              id: "2",
              title: "Poshan Tracker",
              subtitle: "Anganwadi Health Tracking",
              description:
                "Developed a 3-day offline sync engine for automated data uploads and a secure Aadhaar verification module for health tracking.",
              tech: ["React Native", "SQLite", "Firebase", "Android"],
              platform: "Android",
              color: "from-orange-500 to-red-600",
            },
            {
              id: "3",
              title: "Vakmangids",
              subtitle: "Service Marketplace",
              description:
                "Scaled a cross-platform Subscription and Wallet system targeting the Belgium market with multi-language support.",
              tech: ["React Native", "TypeScript", "Redux", "REST APIs"],
              platform: "Android & iOS",
              color: "from-blue-500 to-indigo-600",
            },
            {
              id: "4",
              title: "MauStats",
              subtitle: "Survey Creation & Analytics",
              description:
                "Created a survey engine supporting n*n grids and complex inputs, capable of handling data for 1K+ companies offline with custom eCharts integration.",
              tech: ["React Native", "eCharts", "SQLite", "TypeScript"],
              platform: "Android & iOS",
              color: "from-purple-500 to-pink-600",
            },
            {
              id: "5",
              title: "Cash Plus",
              subtitle: "Beneficiary Tracking for UNICEF",
              description:
                "Built an offline beneficiary tracking system to manage payment statuses with secure data encryption.",
              tech: ["React Native", "SQLite", "Firebase", "Kotlin"],
              platform: "Android & iOS",
              color: "from-cyan-500 to-blue-600",
            },
          ]);
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(
          collection(firestore, COLLECTIONS.PROJECTS),
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// Hook to fetch skills
export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const firestore = getDb();
        if (!firestore) {
          // Default skills data
          setSkills([
            { id: "1", name: "React Native", category: "Mobile" },
            { id: "2", name: "TypeScript", category: "Languages" },
            { id: "3", name: "Android (Kotlin)", category: "Mobile" },
            { id: "4", name: "iOS (Swift)", category: "Mobile" },
            { id: "5", name: "SQLite", category: "Database" },
            { id: "6", name: "Redux", category: "State" },
            { id: "7", name: "Firebase", category: "Backend" },
            { id: "8", name: "REST APIs", category: "Backend" },
            { id: "9", name: "Reanimated", category: "Animation" },
            { id: "10", name: "eCharts", category: "Visualization" },
            { id: "11", name: "Native Modules", category: "Mobile" },
            { id: "12", name: "Git", category: "Tools" },
          ]);
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(
          collection(firestore, COLLECTIONS.SKILLS),
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Skill[];
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};

// Hook to fetch social links
export const useSocial = () => {
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const firestore = getDb();
        if (!firestore) {
          // Default social data
          setSocials([
            {
              id: "1",
              platform: "LinkedIn",
              url: "https://linkedin.com/in/sahilpahat101019",
              icon: "linkedin",
            },
            {
              id: "2",
              platform: "GitHub",
              url: "https://github.com/Pahatsahil",
              icon: "github",
            },
            {
              id: "3",
              platform: "Email",
              url: "mailto:sahilpahat12@gmail.com",
              icon: "mail",
            },
          ]);
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(
          collection(firestore, COLLECTIONS.SOCIAL),
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Social[];
        setSocials(data);
      } catch (err) {
        console.error("Error fetching social:", err);
        setError("Failed to load social links");
      } finally {
        setLoading(false);
      }
    };

    fetchSocial();
  }, []);

  return { socials, loading, error };
};

// Hook to fetch contact config
export const useContact = () => {
  const [contact, setContact] = useState<ContactConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const firestore = getDb();
        if (!firestore) {
          // Default contact data
          setContact({
            email: "sahilpahat12@gmail.com",
            phone: "+919873371012",
            showPhone: false,
            showEmail: false,
          });
          setLoading(false);
          return;
        }

        const docRef = doc(firestore, COLLECTIONS.CONTACT, "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContact(docSnap.data() as ContactConfig);
        }
      } catch (err) {
        console.error("Error fetching contact:", err);
        setError("Failed to load contact info");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return { contact, loading, error };
};
