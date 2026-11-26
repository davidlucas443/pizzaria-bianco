import { Navbar } from './components/Navbar';
import { Hero, FlavorJourney, Introduction, Story, Features } from './components/Experience';
import { useRef } from 'react';
import { useMotion } from './lib/useMotion';
import { LoadingScreen } from './components/LoadingScreen';
import { Brand } from './components/Brand';
import { FeaturedDishes, Menu } from './components/Menu';
import { Contact } from './components/Contact';
import { siteConfig as c } from './data/siteConfig';
import { BioPage } from './components/BioPage';
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/bio' ? <BioPage /> : <LandingPage />;
}
function LandingPage() {
  const root = useRef(null);
  useMotion(root);
  return <div ref={root} id="topo"><a className="skip-link" href="#conteudo">{c.ui.skip}</a><Navbar /><LoadingScreen />
    <main id="conteudo" tabIndex={-1}><Hero />
      {c.sections.featured && <><FlavorJourney /><FeaturedDishes /></>}
      <Menu />{c.sections.presentation && <Introduction />}{c.sections.story && <Story />}{c.sections.features && <Features />}<Contact />
    </main><footer className="page-footer"><div className="container footer-inner"><a className="brand" href="#topo"><Brand /></a><p>{c.demoNotice}</p><a href="#topo">{c.ui.backTop}</a></div></footer></div>;
}
