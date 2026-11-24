import { siteConfig as c } from '../data/siteConfig';
const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
export function FeaturedDishes() {
  return <section id="sabores" className="section featured"><div className="container"><div className="section-top"><div><p className="eyebrow">{c.featured.eyebrow}</p><h2>{c.featured.title}</h2></div><p>{c.featured.text}</p></div><div className="dish-grid">{c.featured.items.map(d => <article key={d.name}><img {...d.image} loading="lazy" decoding="async" width="700" height="560" /><div className="dish-title"><h3>{d.name}</h3><span>{money(d.price)}</span></div><p>{d.description}</p></article>)}</div></div></section>;
}
export function Menu() {
  return <section id="cardapio" className="container section menu-section"><div className="section-top"><div><p className="eyebrow">{c.menu.eyebrow}</p><h2>{c.menu.title}</h2></div><p>{c.menu.text}</p></div><div className="menu-grid">{c.menu.categories.map(category => <section key={category.name}><h3>{category.name}</h3><dl>{category.items.map(item => <div key={item.name}><dt><strong>{item.name}</strong><span>{money(item.price)}</span></dt><dd>{item.description}</dd></div>)}</dl></section>)}</div><p className="menu-note">{c.menu.note}</p></section>;
}
