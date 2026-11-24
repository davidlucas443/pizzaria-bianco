import { useEffect, useRef, useState } from 'react';
import { Brand } from './Brand';
import { siteConfig as c } from '../data/siteConfig';
import { ContactAction } from './ContactAction';
export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    if (!open) return;
    const key = e => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const outside = e => { if (!header.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', key); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  const links = c.navigation.filter(link => !link.section || c.sections[link.section]);
  return <header ref={header} className="site-header"><div className="container nav-inner">
    <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? c.ui.closeMenu : c.ui.openMenu} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}><span className={open ? 'menu-lines active' : 'menu-lines'} aria-hidden="true" />{open ? 'Fechar' : 'Menu'}</button>
    <a href="#topo" className="brand" aria-label="Bianco — início" onClick={() => setOpen(false)}><Brand /></a>
    <div className="header-order"><ContactAction className="button small">{c.ui.headerOrder}</ContactAction></div>
    <nav id="navigation" aria-label="Principal" className={open ? 'navigation is-open' : 'navigation'} data-lenis-prevent>
      {links.map(link => <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>{link.label}</a>)}
    </nav></div></header>;
}
