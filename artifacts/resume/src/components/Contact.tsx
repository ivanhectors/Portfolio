import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Let's build something extraordinary.</h2>
            <p className="text-lg text-foreground/70 mb-10 max-w-md">
              I'm currently available for freelance projects and open to full-time opportunities.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:hello@example.com" className="flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors w-fit group">
                <div className="p-3 rounded-full glass-panel group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">hello@example.com</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors w-fit group">
                <div className="p-3 rounded-full glass-panel group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="font-medium">LinkedIn Profile</span>
              </a>
              <a href="#" className="flex items-center gap-4 text-foreground/80 hover:text-foreground transition-colors w-fit group">
                <div className="p-3 rounded-full glass-panel group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <span className="font-medium">GitHub Repo</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-8 md:p-10 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground/80 px-1">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all text-foreground placeholder:text-foreground/40"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/80 px-1">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all text-foreground placeholder:text-foreground/40"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground/80 px-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent transition-all text-foreground placeholder:text-foreground/40 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="mt-2 w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all group disabled:opacity-70 disabled:pointer-events-none border border-foreground/15 bg-foreground/8 text-foreground hover:bg-foreground hover:text-background dark:hover:bg-foreground dark:hover:text-background"
              >
                {formStatus === 'idle' && (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
                {formStatus === 'submitting' && (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                {formStatus === 'success' && (
                  <span>Message Sent Successfully</span>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
