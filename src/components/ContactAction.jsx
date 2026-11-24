import { useId, useRef } from 'react';
import { siteConfig as c } from '../data/siteConfig';
import { whatsappLink } from '../lib/contact';
export function ContactAction({ kind = 'order', children, className = 'button' }) {
  const dialog = useRef(null);
  const id = useId();
  const href = whatsappLink(c.contact.whatsapp, c.contact.messages[kind]);
  if (href) return <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>;
  return <><button className={className} type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>{children}</button>
    <dialog ref={dialog} className="contact-dialog" aria-labelledby={id} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}>
      <h2 id={id}>{c.ui.unavailableTitle}</h2><p>{c.ui.unavailableText}</p><form method="dialog"><button className="button" autoFocus>{c.ui.close}</button></form>
    </dialog></>;
}
