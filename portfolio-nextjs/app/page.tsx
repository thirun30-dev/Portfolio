'use client';
import { useState, useCallback } from 'react';
import IntroLoader from '@/components/sections/IntroLoader';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Achievements from '@/components/sections/Achievements';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import DockNav from '@/components/ui/DockNav';
import AIChatbot from '@/components/ui/AIChatbot';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroDone = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {/* Intro loader overlay */}
      <IntroLoader onDone={handleIntroDone} />

      {/* Main content — fade in after intro */}
      <main style={{
        opacity: introComplete ? 1 : 0,
        transition: 'opacity 0.5s ease',
        paddingBottom: '5rem', // space for dock
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Achievements />
          <Education />
          <Certifications />
          <Contact />
        </div>
        <Footer />
      </main>

      {/* Bottom Dock Navigation */}
      {introComplete && <DockNav />}

      {/* AI Chatbot */}
      {introComplete && <AIChatbot />}
    </>
  );
}
