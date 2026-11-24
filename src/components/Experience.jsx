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
  return <section className="container section features"><p className="eyebrow">{c.features.eyebrow}</p><h2>{c.features.title}</h2><div className="feature-grid">{c.features.items.map(item => <article key={item.title}><span aria-hidden="true" className="feature-mark">✳</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>;
}
