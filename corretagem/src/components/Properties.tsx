import { useState } from 'react';
import type { Property } from '../content/site';
import { siteConfig as c } from '../content/site';
import { formatPrice, propertyMessage } from '../lib/properties';
import { ContactAction } from './ContactAction';
import styles from './Properties.module.css';
function PropertyCard({ property: p }: { property: Property }) {
  const cover = p.photos[0];
  return <article className={styles.card}>{cover && <img className={styles.cover} {...cover} width="1000" height="700" loading="lazy" />}
    <div className={styles.content}><p className={styles.reference}>{p.type} · {c.ui.reference} {p.reference}</p><h3>{p.name}</h3><p className={styles.location}>{p.location}</p><p className={styles.price}>{formatPrice(p.price)}</p>
      <dl className={styles.facts}><div><dt>{c.ui.area}</dt><dd>{p.area} m²</dd></div><div><dt>{c.ui.bedrooms}</dt><dd>{p.bedrooms}</dd></div><div><dt>{c.ui.bathrooms}</dt><dd>{p.bathrooms}</dd></div><div><dt>{c.ui.parking}</dt><dd>{p.parking}</dd></div></dl>
      <p className={styles.description}>{p.description}</p><ContactAction message={propertyMessage(c.listings.interestMessage, p)}>{c.ui.interest}<span className="sr-only"> · {p.reference}</span></ContactAction>
    </div><details className={styles.details}><summary>{c.ui.details}<span className="sr-only"> · {p.name}</span></summary><div className={styles.expanded}><div><h4>{c.ui.features}</h4><ul>{p.features.map(feature => <li key={feature}>{feature}</li>)}</ul><h4>{c.ui.costs}</h4><p>{p.costs}</p><p className={styles.photoNote}>{c.ui.photosNote}</p></div><div className={styles.gallery}>{p.photos.map(photo => <img key={photo.src} {...photo} width="850" height="600" loading="lazy" />)}</div></div></details>
  </article>;
}
export function Properties() {
  const [type, setType] = useState<string | null>(null);
  const categories = [...new Set(c.listings.items.map(property => property.type))];
  const visible = c.listings.items.filter(property => !type || property.type === type);
  return <section id="imoveis" className={styles.properties}><div className="container"><div className={styles.heading}><div><p className="eyebrow">{c.listings.eyebrow}</p><h2>{c.listings.title}</h2></div><p>{c.listings.text}</p></div>
    <div className={styles.filters} role="group" aria-label={c.listings.eyebrow}><button type="button" aria-pressed={!type} onClick={() => setType(null)}>{c.ui.all}</button>{categories.map(category => <button key={category} type="button" aria-pressed={type === category} onClick={() => setType(category)}>{category}</button>)}</div>
    <p className="sr-only" role="status" aria-live="polite">{visible.length} {c.ui.all.toLowerCase()}</p><div className={styles.list}>{visible.map(property => <PropertyCard key={property.reference} property={property} />)}</div><p className={styles.notice}>{c.listings.notice}</p>
  </div></section>;
}
