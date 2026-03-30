import { motion } from "framer-motion";
import FadeIn from "./animations/FadeIn";
import type { Experience } from "../hooks/usePortfolioData";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
              Work <span className="text-gradient">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#61dafb] to-[#818cf8] mx-auto rounded-full" />
          </div>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#61dafb] via-[#818cf8] to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 0.1}>
                <div
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#61dafb] transform -translate-x-1/2 mt-2">
                    <div className="absolute inset-0 rounded-full bg-[#61dafb] animate-ping opacity-30" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <motion.div
                      className="p-6 bg-[#1e293b]/50 rounded-2xl border border-[#334155] hover:border-[#61dafb]/30 transition-all"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-[#61dafb] font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-[#0f172a] rounded-full text-sm text-gray-400 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-400 text-sm"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8] mt-1.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
