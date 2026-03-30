import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Phone, Send, Loader2 } from "lucide-react";
import FadeIn from "./animations/FadeIn";
import { sendEmail } from "../lib/emailjs";
import { useProtectedContact } from "../hooks/useProtectedContact";
import type { ContactConfig, Social } from "../hooks/usePortfolioData";

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

interface ContactProps {
  contact: ContactConfig | null;
  socials: Social[];
}

const Contact = ({ contact: _contact, socials }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { openEmail, openWhatsApp } = useProtectedContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await sendEmail(formData);
    if (success) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#61dafb] to-[#818cf8] mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Have a project in mind? Let's discuss how we can work together
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeIn>
            <div className="space-y-8">
              <div className="p-8 bg-[#1e293b]/50 rounded-2xl border border-[#334155]">
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>

                <div className="space-y-4">
                  <button
                    onClick={openEmail}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a]/50 hover:bg-[#0f172a] transition-colors group w-full text-left"
                  >
                    <div className="p-3 rounded-xl bg-[#61dafb]/10 group-hover:bg-[#61dafb]/20 transition-colors">
                      <Mail size={24} className="text-[#61dafb]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium group-hover:text-[#61dafb] transition-colors">
                        Click to send email
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={openWhatsApp}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a]/50 hover:bg-[#0f172a] transition-colors group w-full text-left"
                  >
                    <div className="p-3 rounded-xl bg-[#818cf8]/10 group-hover:bg-[#818cf8]/20 transition-colors">
                      <Phone size={24} className="text-[#818cf8]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">WhatsApp</p>
                      <p className="text-white font-medium group-hover:text-[#818cf8] transition-colors">
                        Click to message
                      </p>
                    </div>
                  </button>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-[#334155]">
                  <p className="text-gray-400 mb-4">Find me on</p>
                  <div className="flex gap-4">
                    {socials.map((social) => {
                      const IconComponent = getSocialIcon(social.platform);
                      return (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] transition-colors group"
                          title={social.platform}
                        >
                          <IconComponent
                            size={20}
                            className="text-gray-400 group-hover:text-[#61dafb] transition-colors"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-[#1e293b]/50 rounded-2xl border border-[#334155]"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white focus:border-[#61dafb] focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white focus:border-[#61dafb] focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white focus:border-[#61dafb] focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] rounded-xl text-white focus:border-[#61dafb] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#61dafb] to-[#818cf8] text-[#0f172a] font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : submitStatus === "success" ? (
                    <span>Message Sent! ✓</span>
                  ) : submitStatus === "error" ? (
                    <span>Failed to send. Try again.</span>
                  ) : (
                    <><span>Send Message</span><Send size={18} /></>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-emerald-400 text-sm"
                  >
                    Thanks for reaching out! I'll get back to you soon.
                  </motion.p>
                )}
                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-red-400 text-sm"
                  >
                    Failed to send message. Please try again or email directly.
                  </motion.p>
                )}
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;
