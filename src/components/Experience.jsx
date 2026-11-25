import { siteConfig as c } from '../data/siteConfig';
import { ContactAction } from './ContactAction';
export function Hero() {
  return <section className="hero"><div className="container hero-meta"><span>{c.hero.eyebrow}</span><span>{c.hero.detail}</span></div><div className="container hero-stage"><div className="hero-copy"><h1>{c.hero.title}<em>{c.hero.titleAccent}</em></h1><p className="hero-description">{c.hero.text}</p><div className="actions"><a className="button" href="#cardapio">{c.ui.menu}</a><ContactAction className="text-link">{c.ui.order}</ContactAction></div></div><figure className="hero-photo"><img className="hero-pizza" {...c.hero.image} fetchPriority="high" decoding="async" width="1280" height="1280" /><figcaption>{c.hero.caption}</figcaption></figure><div className="hero-bottom"><span>{c.hero.bottomNote}</span><a href="#destaques">{c.hero.exploreLabel}<span className="scroll-line" aria-hidden="true" /></a><span>{c.hero.productLabel}</span></div></div></section>;
}
export function FlavorJourney() {
  return <section id="destaques" className="flavor-journey"><div className="flavor-pin container"><div className="flavor-heading"><p className="eyebrow">{c.journey.eyebrow}</p><h2>{c.journey.title}</h2><a className="text-link" href="#cardapio">{c.ui.menu}</a></div><div className="flavor-visual" aria-hidden="true">{c.journey.steps.map(step => <img key={step.title} {...step.image} alt="" loading="lazy" decoding="async" width="1000" height="800" />)}</div><div className="flavor-notes">{c.journey.steps.map((step, i) => <article className="flavor-note" key={step.title}><img className="flavor-mobile-photo" {...step.image} loading="lazy" decoding="async" width="1000" height="800" /><span className="flavor-label">{step.label}</span><h3>{step.title}</h3><p>{step.text}</p><div className="flavor-progress" aria-hidden="true"><span style={{ width: `${(i + 1) / c.journey.steps.length * 100}%` }} /></div></article>)}</div></div></section>;
}
export function Introduction() {
  return <section id="sobre" className="container introduction section"><p className="eyebrow">{c.presentation.eyebrow}</p><h2>{c.presentation.title}</h2><p>{c.presentation.text}</p></section>;
}
export function Story() {
  return <section id="historia" className="story"><div className="container story-grid"><img {...c.story.image} loading="lazy" width="1000" height="1000" /><div><p className="eyebrow">{c.story.eyebrow}</p><h2>{c.story.title}</h2>{c.story.paragraphs.map(p => <p key={p}>{p}</p>)}<ContactAction kind="reservation" className="button light">{c.ui.reserve}</ContactAction></div></div></section>;
}
export function Features() {
  const icons = [
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6h18M15 42h18M17 8c0 7 3 11 7 16-4 5-7 9-7 16M31 8c0 7-3 11-7 16 4 5 7 9 7 16" /><path d="M19 29h10M21 33h6" /></svg>,
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M39 8C24 8 12 12 9 24c-2 8 3 15 12 14 13-2 18-14 18-30Z" /><path d="M10 39c6-10 15-18 27-27M20 28l-1-9M27 21l9 1" /></svg>,
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 21 19-15 19 15M9 19v22h30V19M18 41V28h12v13" /><path d="M24 11v5" /></svg>,
  ];
  return <section className="container section features"><p className="eyebrow">{c.features.eyebrow}</p><h2>{c.features.title}</h2><div className="feature-grid">{c.features.items.map((item, index) => <article key={item.title}><span aria-hidden="true" className="feature-mark">{icons[index]}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>;
}
