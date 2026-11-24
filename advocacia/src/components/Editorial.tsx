import { siteConfig as c } from '../content/site';
import { ContactAction } from './ContactAction';
import styles from './Editorial.module.css';
export function Hero() {
  return <section className={styles.hero}><div className={styles.heroInner}><div className={styles.copy}><p className="eyebrow">{c.hero.eyebrow}</p><h1>{c.hero.title}</h1><p className={styles.lead}>{c.hero.text}</p><div className={styles.actions}><ContactAction>{c.ui.primary}</ContactAction><a href="#atuacao">{c.ui.secondary}</a></div><p className={styles.note}>{c.hero.note}</p></div><figure><img {...c.hero.image} width="850" height="1100" fetchPriority="high" /><figcaption>{c.hero.caption}</figcaption></figure></div></section>;
}
export function Office() {
  return <section id="escritorio" className={styles.office}><div className="container"><div><p className="eyebrow">{c.office.eyebrow}</p><h2>{c.office.title}</h2><p className={styles.statement}>{c.office.text}</p></div><div className={styles.officeText}>{c.office.paragraphs.map(p => <p key={p}>{p}</p>)}<blockquote>{c.office.principle}</blockquote></div></div></section>;
}
export function People() {
  return <section id="profissionais" className={styles.people}><div className="container"><div><p className="eyebrow">{c.people.eyebrow}</p><h2>{c.people.title}</h2></div><div><p>{c.people.text}</p>{c.people.items.length === 0 ? <p className={styles.empty}>{c.people.empty}</p> : <div className={styles.team}>{c.people.items.map(person => <article key={person.name}>{person.image && <img {...person.image} width="600" height="720" loading="lazy" />}<h3>{person.name}</h3><p>{person.role}</p>{person.registration && <p>{person.registration}</p>}<p>{person.bio}</p></article>)}</div>}</div></div></section>;
}
