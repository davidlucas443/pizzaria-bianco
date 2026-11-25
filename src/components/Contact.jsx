import { siteConfig as c } from '../data/siteConfig';
import { ContactAction } from './ContactAction';
import { phoneLink, mapLink, socialLink } from '../lib/contact';
export function Contact() {
  const phone = phoneLink(c.contact.phone), map = mapLink(c.contact.address), instagram = socialLink(c.contact.instagram);
  return <section id="contato" className="visit"><div className="container visit-grid"><div><p className="eyebrow">{c.visit.eyebrow}</p><h2>{c.visit.title}</h2><p>{c.visit.text}</p><div className="actions"><ContactAction>{c.ui.order}</ContactAction></div></div><div className="visit-details"><div><h3>{c.visit.hoursLabel}</h3><p>{c.contact.hours}</p></div><div><h3>{c.visit.addressLabel}</h3><p>{c.contact.address || c.ui.addressEmpty}</p>{map && <a className="text-link" href={map} target="_blank" rel="noreferrer">{c.ui.map}</a>}</div><div className="contact-links">{phone && <a href={phone}>{c.ui.phone}</a>}{instagram && <a href={instagram} target="_blank" rel="noreferrer">{c.ui.instagram}</a>}{!phone && !instagram && <p className="muted">{c.ui.contactEmpty}</p>}</div></div></div></section>;
}
