import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import PerspectiveText from '@/components/PerspectiveText';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <div className="min-h-screen bg-background dark">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <PerspectiveText text="Crafting Digital Experiences With Passion" className="my-10" />
          <About />
          <Skills />
          <Projects />
          <PerspectiveText text="Building The Future One Project At A Time" className="my-10" />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
