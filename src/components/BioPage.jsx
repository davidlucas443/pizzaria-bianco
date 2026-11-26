import { useEffect } from 'react';
import { siteConfig as c } from '../data/siteConfig';
import { BrandMark } from './Brand';
import { mapLink, phoneLink, whatsappLink } from '../lib/contact';

function BioArrow({ diagonal = false }) {
  return <svg className="bio-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
  </svg>;
}

export function BioPage() {
  const orderUrl = whatsappLink(c.contact.whatsapp, c.contact.messages.order);
  const mapsUrl = mapLink(c.contact.address);
  const telephoneUrl = phoneLink(c.contact.phone);

  useEffect(() => {
    document.title = 'Links | Pizzaria Bianco';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Acesse o cardápio, faça seu pedido e encontre a Pizzaria Bianco.');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fcf9f2');
  }, []);

  return <main className="bio-page">
    <div className="bio-content">
      <header className="bio-heading">
        <BrandMark className="bio-mark" />
        <p className="bio-kicker">{c.brand.subtitle}</p>
        <h1>Pizzaria Bianco</h1>
        <p className="bio-subtitle">Feita à mão. Sem pressa.</p>
      </header>
      <nav className="bio-links" aria-label="Links rápidos da Bianco">
        {orderUrl && <a className="bio-action bio-primary" href={orderUrl} target="_blank" rel="noreferrer">
          <span className="bio-label">Pedir pelo WhatsApp</span>
          <BioArrow diagonal />
          <small>Uma mensagem e a gente cuida do resto.</small>
        </a>}
        <a className="bio-action" href="/#cardapio">
          <span>Ver cardápio</span>
          <BioArrow diagonal />
        </a>
        {mapsUrl && <a className="bio-action" href={mapsUrl} target="_blank" rel="noreferrer">
          <span>Como chegar</span>
          <BioArrow diagonal />
        </a>}
        {telephoneUrl && <a className="bio-action" href={telephoneUrl}>
          <span>Ligar para a pizzaria</span>
          <BioArrow />
        </a>}
        <a className="bio-action bio-home" href="/">
          <span>Conhecer o site da Bianco</span>
          <BioArrow />
        </a>
      </nav>
      <footer className="bio-footer">
        {c.hero.detail}
      </footer>
    </div>
  </main>;
}
