import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import FadeIn from "./animations/FadeIn";
import TypingEffect from "./animations/TypingEffect";
import { Link } from "react-router-dom";
import type { Profile } from "../hooks/usePortfolioData";

interface HeroProps {
  profile: Profile | null;
}

const Hero = ({ profile }: HeroProps) => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const name = profile?.name || "Sahil Pahat";
  const title = profile?.title || "React Native Developer";
  const bio =
    profile?.bio ||
    "With 3+ years of experience in cross-platform mobile development, I specialize in building high-performance mobile applications for Android and iOS using React Native, TypeScript, and native modules.";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#61dafb]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#818cf8]/10 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b]/50 border border-[#334155] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#61dafb] animate-pulse" />
              <span className="text-sm text-gray-300">
                Available for new opportunities
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
              Hi, I'm <span className="text-gradient">{name}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-4">
              <TypingEffect
                words={[
                  title,
                  "Mobile App Architect",
                  "Cross-Platform Specialist",
                  "Native Module Engineer",
                ]}
              />
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {bio}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => scrollToSection("#projects")}
                className="group px-8 py-4 bg-gradient-to-r from-[#61dafb] to-[#818cf8] text-[#0f172a] font-semibold rounded-full flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(97, 218, 251, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/resume"
                  className="px-8 py-4 border border-[#334155] text-white font-semibold rounded-full hover:bg-[#1e293b] transition-all"
                >
                  View Resume
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-gray-500" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
