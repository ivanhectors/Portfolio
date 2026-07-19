import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <>
      {/* Background Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />
      <main className="flex-1 w-full relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
