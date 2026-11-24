import { siteConfig as c } from '../content/site';
import { phoneLink, mapLink, socialLink } from '../lib/contact';
import { ContactAction } from './ContactAction';
import styles from './Contact.module.css';
export function Contact() {
  const phone = phoneLink(c.contact.phone), map = mapLink(c.contact.address), social = socialLink(c.contact.instagram);
  return <section id="contato" className={styles.contact}><div className={styles.grid}><div><p className="eyebrow">{c.visit.eyebrow}</p><h2>{c.visit.title}</h2><p>{c.visit.text}</p><ContactAction>{c.ui.primary}</ContactAction></div><div className={styles.details}>
    <div><h3>{c.ui.hoursLabel}</h3><p>{c.contact.hours}</p></div><div><h3>{c.ui.addressLabel}</h3><p>{c.contact.address || c.ui.addressEmpty}</p>{map && <a href={map} target="_blank" rel="noreferrer">{c.ui.map}</a>}</div>
    <div className={styles.links}>{phone && <a href={phone}>{c.ui.phone}</a>}{social && <a href={social} target="_blank" rel="noreferrer">{c.ui.instagram}</a>}{!phone && !social && <p>{c.ui.contactEmpty}</p>}</div>
  </div></div></section>;
}
