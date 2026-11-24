import { siteConfig as c } from '../content/site';
import styles from './Practice.module.css';
export function Practice() {
  return <section id="atuacao" className={styles.practice}><div className="container"><div className={styles.heading}><div><p className="eyebrow">{c.practice.eyebrow}</p><h2>{c.practice.title}</h2></div><p>{c.practice.text}</p></div><div className={styles.areas}>{c.practice.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>;
}
export function Process() {
  return <section id="atendimento" className={styles.process}><div className="container"><p className="eyebrow">{c.process.eyebrow}</p><h2>{c.process.title}</h2><p className={styles.description}>{c.process.text}</p><ol>{c.process.items.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol></div></section>;
}
export function FAQ() {
  return <section id="duvidas" className={styles.faq}><div className="container"><div><p className="eyebrow">{c.faq.eyebrow}</p><h2>{c.faq.title}</h2><p>{c.faq.text}</p></div><div>{c.faq.items.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>;
}
