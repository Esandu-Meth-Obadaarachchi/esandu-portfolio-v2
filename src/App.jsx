import { useEffect } from 'react';
import { startSmoothScroll } from './lib/scroll';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import RunRail from './components/RunRail';
import Hero from './components/Hero';
import Statement from './components/Statement';
import Loop from './components/Loop';
import Work from './components/Work';
import Awards from './components/Awards';
import Research from './components/Research';
import Stack from './components/Stack';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <RunRail />
      <main id="main">
        <Hero />
        <Statement />
        <Work />
        <Awards />
        <Research />
        <Stack />
        <Experience />
        <Loop />
        <Contact />
      </main>
      <Cursor />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
