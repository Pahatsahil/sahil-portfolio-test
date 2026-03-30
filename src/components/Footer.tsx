import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import type { Social } from "../hooks/usePortfolioData";

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return Linkedin;
    case "github":
      return Github;
    case "email":
    case "mail":
      return Mail;
    default:
      return ExternalLink;
  }
};

interface FooterProps {
  socials: Social[];
}

const Footer = ({ socials }: FooterProps) => {
  return (
    <footer className="py-12 border-t border-[#334155]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-['Space_Grotesk']">
              <span className="text-gradient">SP</span>
              <span className="text-white">.dev</span>
            </span>
          </div>

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sahil Pahat. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const IconComponent = getSocialIcon(social.platform);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-[#1e293b] transition-colors"
                  title={social.platform}
                >
                  <IconComponent
                    size={18}
                    className="text-gray-400 hover:text-[#61dafb] transition-colors"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
