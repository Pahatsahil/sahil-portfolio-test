import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Briefcase,
  Code2,
  GraduationCap,
  Award,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import {
  useProfile,
  useExperience,
  useProjects,
  useSkills,
  useSocial,
  useContact,
  useEducation,
  useCertifications,
} from "../hooks/usePortfolioData";

/* ─────────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────────── */

const Tag = ({ label }: { label: string }) => (
  <span className="resume-tag">{label}</span>
);

const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="resume-section-title">
    <span className="resume-section-icon">
      <Icon size={16} />
    </span>
    <h2>{title}</h2>
  </div>
);

/* ─────────────────────────────────────────────
   LOADING
───────────────────────────────────────────── */

const LoadingScreen = () => (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
    }}
  >
    <Loader2 size={40} className="text-[#61dafb] animate-spin" />
    <p className="text-gray-400 font-['Inter']">Fetching resume data…</p>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN RESUME PAGE
───────────────────────────────────────────── */

const Resume = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const { profile, loading: pl } = useProfile();
  const { experiences, loading: el } = useExperience();
  const { projects, loading: jl } = useProjects();
  const { skills, loading: sl } = useSkills();
  const { socials, loading: sol } = useSocial();
  const { contact, loading: cl } = useContact();
  const { education, loading: edl } = useEducation();
  const { certifications, loading: ctl } = useCertifications();

  const isLoading = pl || el || jl || sl || sol || cl || edl || ctl;

  if (isLoading) return <LoadingScreen />;

  const name = profile?.name || "Sahil Pahat";
  const title = profile?.title || "React Native Developer";
  const bio =
    profile?.bio ||
    "3+ years building high-performance cross-platform mobile apps with React Native, TypeScript, and native modules (Kotlin / Swift). Passionate about offline-first architectures, smooth animations, and shipping apps that users love.";

  const linkedin = socials.find((s) => s.platform.toLowerCase() === "linkedin");
  const github = socials.find((s) => s.platform.toLowerCase() === "github");
  const email = contact?.showEmail ? contact.email : null;
  const phone = contact?.showPhone ? contact.phone : null;

  const skillGroups = skills.reduce<Record<string, string[]>>((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill.name);
    return acc;
  }, {});

  return (
    <>
      {/* ── Print / Screen CSS ────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');

        .resume-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #1a0a2e 100%);
          font-family: 'Inter', sans-serif;
          padding: 0 0 4rem 0;
        }

        /* ── Toolbar ── */
        .resume-toolbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(15,23,42,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(97,218,251,0.12);
          padding: 0.85rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .toolbar-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          font-size: 0.8rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .toolbar-back:hover { color: #61dafb; }

        .toolbar-badge {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #61dafb;
          background: rgba(97,218,251,0.08);
          border: 1px solid rgba(97,218,251,0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
        }

        .toolbar-live {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: #64748b;
        }

        .toolbar-live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }

        .btn-download {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.5rem;
          background: linear-gradient(135deg, #61dafb, #818cf8);
          color: #0f172a;
          font-weight: 600;
          font-size: 0.82rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          letter-spacing: 0.02em;
        }
        .btn-download:hover { opacity: 0.9; transform: scale(1.03); }

        /* ── Resume Card ── */
        .resume-page-wrap {
          max-width: 860px;
          margin: 2.5rem auto 0;
          padding: 0 1rem;
        }

        .resume-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(97,218,251,0.15),
            0 40px 80px rgba(0,0,0,0.5),
            0 0 100px rgba(97,218,251,0.05);
        }

        /* ── Header band ── */
        .resume-header {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
          padding: 2.8rem 3rem 2.2rem;
          position: relative;
          overflow: hidden;
        }

        .resume-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 50%, rgba(97,218,251,0.12) 0%, transparent 60%),
            radial-gradient(circle at 80% 30%, rgba(129,140,248,0.10) 0%, transparent 60%);
        }

        .header-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: start;
        }

        .resume-name {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.4rem;
          background: linear-gradient(135deg, #ffffff 30%, #61dafb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .resume-title-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #61dafb;
          background: rgba(97,218,251,0.1);
          border: 1px solid rgba(97,218,251,0.25);
          padding: 0.3rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.2rem;
        }

        .resume-contact-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem 1.2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-item:hover { color: #61dafb; }

        .header-qr-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.6rem;
        }

        .header-availability {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: #22c55e;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
        }

        .header-availability-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
        }

        /* ── Body ── */
        .resume-body {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
        }

        /* ── Sidebar ── */
        .resume-sidebar {
          background: #f8fafc;
          padding: 2rem 1.6rem;
          border-right: 1px solid #e2e8f0;
        }

        /* ── Main column ── */
        .resume-main {
          padding: 2rem 2.2rem;
        }

        /* ── Section titles ── */
        .resume-section-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid transparent;
          border-image: linear-gradient(90deg, #61dafb, #818cf8) 1;
        }

        .resume-section-title h2 {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #475569;
          margin: 0;
        }

        .resume-section-icon {
          color: #61dafb;
          display: flex;
        }

        /* ── Skill groups (sidebar) ── */
        .sidebar-section { margin-bottom: 1.8rem; }

        .skill-group { margin-bottom: 1rem; }

        .skill-category {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 0.4rem;
        }

        .skill-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }

        .resume-tag {
          font-size: 0.68rem;
          background: #e2e8f0;
          color: #334155;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          font-weight: 500;
        }

        /* ── Education / Certs (sidebar) ── */
        .sidebar-item { margin-bottom: 1rem; }

        .sidebar-item-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.3;
          margin-bottom: 0.15rem;
        }

        .sidebar-item-sub {
          font-size: 0.7rem;
          color: #64748b;
          margin-bottom: 0.1rem;
        }

        .sidebar-item-year {
          font-size: 0.65rem;
          color: #94a3b8;
        }

        /* ── Experience / Projects (main) ── */
        .resume-section { margin-bottom: 2rem; }

        .exp-item { margin-bottom: 1.5rem; }
        .exp-item:last-child { margin-bottom: 0; }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.15rem;
        }

        .exp-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
        }

        .exp-period {
          font-size: 0.7rem;
          color: #94a3b8;
          white-space: nowrap;
          background: #f1f5f9;
          padding: 0.15rem 0.6rem;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .exp-company {
          font-size: 0.75rem;
          color: #6366f1;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .exp-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .exp-bullets li {
          font-size: 0.77rem;
          line-height: 1.65;
          color: #475569;
          padding-left: 1rem;
          position: relative;
          margin-bottom: 0.2rem;
        }

        .exp-bullets li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #61dafb;
          font-size: 0.65rem;
          top: 0.12rem;
        }

        /* Projects */
        .project-item { margin-bottom: 1.2rem; }

        .project-header {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 0.15rem;
        }

        .project-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1e293b;
        }

        .project-link {
          font-size: 0.68rem;
          color: #818cf8;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }

        .project-tech {
          font-size: 0.7rem;
          color: #6366f1;
          margin-bottom: 0.3rem;
        }

        .project-desc {
          font-size: 0.75rem;
          color: #475569;
          line-height: 1.6;
        }

        /* ── Bio section ── */
        .resume-bio {
          font-size: 0.78rem;
          color: #475569;
          line-height: 1.75;
          margin-bottom: 1.5rem;
          padding: 0.8rem 1rem;
          background: linear-gradient(135deg, rgba(97,218,251,0.05), rgba(129,140,248,0.05));
          border-left: 3px solid #61dafb;
          border-radius: 0 8px 8px 0;
        }

        /* ─── PRINT OVERRIDES ─── */
        @media print {
          .resume-wrapper { background: white; padding: 0; }
          .resume-toolbar { display: none !important; }
          .resume-page-wrap { max-width: 100%; margin: 0; padding: 0; }
          .resume-card {
            box-shadow: none;
            border-radius: 0;
            border: none;
          }
          .resume-header {
            background: #1e293b !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .resume-sidebar { background: #f8fafc !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          @page { margin: 0.4cm; size: A4; }
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .resume-body { grid-template-columns: 1fr; }
          .resume-sidebar { border-right: none; border-bottom: 1px solid #e2e8f0; }
          .header-grid { grid-template-columns: 1fr; }
          .header-qr-stack { align-items: flex-start; }
          .resume-header { padding: 2rem 1.5rem; }
          .resume-toolbar { padding: 0.75rem 1rem; }
        }
      `}</style>

      <div className="resume-wrapper">
        {/* ── Toolbar ── */}
        <div className="resume-toolbar">
          <div className="toolbar-left">
            <a href="/" className="toolbar-back">
              <ArrowLeft size={14} /> Portfolio
            </a>
            <span className="toolbar-badge">Resume</span>
            <div className="toolbar-live">
              <div className="toolbar-live-dot" />
              Live from Firebase
            </div>
          </div>
          <button className="btn-download" onClick={() => window.print()}>
            <Download size={14} />
            Download PDF
          </button>
        </div>

        {/* ── Resume Card ── */}
        <div className="resume-page-wrap">
          <motion.div
            className="resume-card"
            ref={resumeRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* ────── HEADER ────── */}
            <div className="resume-header">
              <div className="header-grid">
                <div>
                  <div className="resume-title-badge">
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#61dafb",
                        display: "inline-block",
                      }}
                    />
                    {title}
                  </div>
                  <div className="resume-name">{name}</div>
                  <div className="resume-contact-row">
                    {email && (
                      <a href={`mailto:${email}`} className="contact-item">
                        <Mail size={12} /> {email}
                      </a>
                    )}
                    {phone && (
                      <a href={`tel:${phone}`} className="contact-item">
                        <Phone size={12} /> {phone}
                      </a>
                    )}
                    {/* {profile?.location && (
                      <span className="contact-item">
                        <MapPin size={12} /> {profile.location}
                      </span>
                    )} */}
                    {linkedin && (
                      <a
                        href={linkedin.url}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-item"
                      >
                        <Linkedin size={12} /> LinkedIn
                      </a>
                    )}
                    {github && (
                      <a
                        href={github.url}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-item"
                      >
                        <Github size={12} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
                <div className="header-qr-stack">
                  <div className="header-availability">
                    <div className="header-availability-dot" />
                    Open to work
                  </div>
                </div>
              </div>
            </div>

            {/* ────── BODY (sidebar + main) ────── */}
            <div className="resume-body">
              {/* ── SIDEBAR ── */}
              <div className="resume-sidebar">
                {/* Skills */}
                {Object.keys(skillGroups).length > 0 && (
                  <div className="sidebar-section">
                    <SectionTitle icon={Code2} title="Skills" />
                    {Object.entries(skillGroups).map(([cat, items]) => (
                      <div key={cat} className="skill-group">
                        <div className="skill-category">{cat}</div>
                        <div className="skill-tags">
                          {items.map((item) => (
                            <Tag key={item} label={item} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <div className="sidebar-section">
                    <SectionTitle icon={GraduationCap} title="Education" />
                    {education.map((edu) => (
                      <div key={edu.id} className="sidebar-item">
                        <div className="sidebar-item-title">{edu.degree}</div>
                        <div className="sidebar-item-sub">
                          {edu.institution}
                        </div>
                        {edu.grade && (
                          <div className="sidebar-item-sub">
                            Grade: {edu.grade}
                          </div>
                        )}
                        <div className="sidebar-item-year">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                  <div className="sidebar-section">
                    <SectionTitle icon={Award} title="Certifications" />
                    {certifications.map((cert) => (
                      <div key={cert.id} className="sidebar-item">
                        <div className="sidebar-item-title">
                          {cert.url ? (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              {cert.name}{" "}
                              <ExternalLink
                                size={10}
                                style={{
                                  display: "inline",
                                  verticalAlign: "middle",
                                }}
                              />
                            </a>
                          ) : (
                            cert.name
                          )}
                        </div>
                        <div className="sidebar-item-sub">{cert.issuer}</div>
                        <div className="sidebar-item-year">{cert.year}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── MAIN COLUMN ── */}
              <div className="resume-main">
                {/* Summary */}
                <div className="resume-bio">{bio}</div>

                {/* Experience */}
                {experiences.length > 0 && (
                  <div className="resume-section">
                    <SectionTitle icon={Briefcase} title="Experience" />
                    {experiences.map((exp) => (
                      <div key={exp.id} className="exp-item">
                        <div className="exp-header">
                          <div className="exp-title">{exp.title}</div>
                          <div className="exp-period">{exp.period}</div>
                        </div>
                        <div className="exp-company">{exp.company}</div>
                        <ul className="exp-bullets">
                          {exp.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                  <div className="resume-section">
                    <SectionTitle icon={Code2} title="Projects" />
                    {projects.map((p) => (
                      <div key={p.id} className="project-item">
                        <div className="project-header">
                          <span className="project-name">{p.title}</span>
                          {p.githubUrl && (
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="project-link"
                            >
                              <Github size={10} /> Code
                            </a>
                          )}
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="project-link"
                            >
                              <ExternalLink size={10} /> Demo
                            </a>
                          )}
                        </div>
                        <div className="project-tech">{p.tech.join(" · ")}</div>
                        <div className="project-desc">{p.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Resume;
