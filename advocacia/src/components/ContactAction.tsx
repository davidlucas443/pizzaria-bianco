import { useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { siteConfig as c } from '../content/site';
import { whatsappLink } from '../lib/contact';
import styles from './Layout.module.css';
export function ContactAction({ children, message = c.contact.message, className = 'button' }: { children: ReactNode; message?: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null), id = useId();
  const href = whatsappLink(c.contact.whatsapp, message);
  if (href) return <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>;
  return <><button type="button" className={className} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>{children}</button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={id} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <h2 id={id}>{c.ui.unavailableTitle}</h2><p>{c.ui.unavailableText}</p><form method="dialog"><button className="button" autoFocus>{c.ui.close}</button></form>
    </dialog></>;
}
