import { siteConfig as c } from '../content/site';
import { ContactAction } from './ContactAction';
import styles from './Experience.module.css';
export function Hero() {
  return <section className={styles.hero}><div className="container"><div className={styles.heroTop}><div><p className="eyebrow">{c.hero.eyebrow}</p><h1>{c.hero.title}</h1></div><div className={styles.heroIntro}><p>{c.hero.text}</p><a href="#imoveis" className="button">{c.ui.secondary}</a></div></div><figure><img {...c.hero.image} width="1500" height="800" fetchPriority="high" /><figcaption><span>{c.hero.caption}</span><span>{c.hero.location}</span></figcaption></figure></div></section>;
}
export function Benefits() {
  return <section id="atendimento" className={styles.benefits}><div className="container"><div className={styles.sectionHeading}><div><p className="eyebrow">{c.benefits.eyebrow}</p><h2>{c.benefits.title}</h2></div><p>{c.benefits.text}</p></div><div className={styles.benefitGrid}>{c.benefits.items.map(item => <article key={item.title}><span className={styles.mark} aria-hidden="true">✳</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>;
}
export function About() {
  return <section id="sobre" className={styles.about}><div className="container"><img {...c.about.image} width="1000" height="1100" loading="lazy" /><div><p className="eyebrow">{c.about.eyebrow}</p><h2>{c.about.title}</h2><p className={styles.aboutLead}>{c.about.text}</p>{c.about.paragraphs.map(p => <p key={p}>{p}</p>)}{c.about.registration && <p>{c.about.registration}</p>}<ContactAction>{c.ui.primary}</ContactAction></div></div></section>;
}
export function Process() {
  return <section className={styles.process}><div className="container"><p className="eyebrow">{c.process.eyebrow}</p><h2>{c.process.title}</h2><p className={styles.processIntro}>{c.process.text}</p><ol>{c.process.items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></div></section>;
}
