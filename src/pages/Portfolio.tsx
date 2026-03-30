import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import {
  useProfile,
  useExperience,
  useProjects,
  useSkills,
  useSocial,
  useContact,
} from "../hooks/usePortfolioData";

const LoadingScreen = () => (
  <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
    <div className="text-center">
      <Loader2 size={48} className="text-[#61dafb] animate-spin mx-auto mb-4" />
      <p className="text-gray-400">Loading portfolio...</p>
    </div>
  </div>
);

const Portfolio = () => {
  const { profile, loading: profileLoading } = useProfile();
  const { experiences, loading: expLoading } = useExperience();
  const { projects, loading: projectsLoading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const { socials, loading: socialLoading } = useSocial();
  const { contact, loading: contactLoading } = useContact();

  const isLoading =
    profileLoading ||
    expLoading ||
    projectsLoading ||
    skillsLoading ||
    socialLoading ||
    contactLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />
      <Hero profile={profile} />
      <About profile={profile} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <Contact contact={contact} socials={socials} />
      <Footer socials={socials} />
    </div>
  );
};

export default Portfolio;
