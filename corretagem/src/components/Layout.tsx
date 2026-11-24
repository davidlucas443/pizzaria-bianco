import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { siteConfig as c } from '../content/site';
import { ContactAction } from './ContactAction';
import styles from './Layout.module.css';
export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false), toggle = useRef<HTMLButtonElement>(null);
  const visibility: Record<string, boolean> = c.sections;
  const links = c.navigation.filter(link => !link.section || visibility[link.section]);
  return <><a className={styles.skip} href="#conteudo">{c.ui.skip}</a><header className={styles.header} id="topo"><div className={styles.navInner}>
    <a href="#topo" className={styles.brand}>{c.brand.logo ? <img {...c.brand.logo} /> : c.brand.name}<span>{c.brand.subtitle}</span></a>
    <button ref={toggle} type="button" className={styles.toggle} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? c.ui.closeMenu : c.ui.openMenu}<span aria-hidden="true">{open ? '×' : '☰'}</span></button>
    <nav id="navigation" aria-label="Principal" className={open ? `${styles.nav} ${styles.open}` : styles.nav} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }}>
      {links.map(link => <a key={link.id} href={`#${link.id}`} onClick={() => setOpen(false)}>{link.label}</a>)}<ContactAction className="button compact">{c.ui.primary}</ContactAction>
    </nav></div></header><main id="conteudo" tabIndex={-1}>{children}</main>
    <footer className={styles.footer}><div className="container"><a className={styles.brand} href="#topo">{c.brand.name}<span>{c.brand.subtitle}</span></a><p>{c.demoNotice}</p><a href="#topo">{c.ui.backTop}</a></div></footer></>;
}
