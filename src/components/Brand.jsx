import { siteConfig as c } from '../data/siteConfig';
export function BrandMark(props) {
  return <svg viewBox="0 0 64 72" fill="none" aria-hidden="true" {...props}><path fill="currentColor" fillRule="evenodd" d="M10 5h24c15 0 23 7 23 17 0 8-5 13-12 16 10 3 15 9 15 17 0 8-4 12-8 12H10v-5h5V10h-5V5Zm17 6v23h6c9 0 13-4 13-12s-5-11-13-11h-6Zm0 30v21h5V54a10 10 0 0 1 20 0v8h1c2-2 3-5 3-8 0-9-7-13-18-13H27Z"/><path d="M39 27c-5-5 5-7 1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}
export function Brand() {
  return <span className="brand-lockup">{c.brand.logo ? <img {...c.brand.logo} /> : <><BrandMark /><span className="brand-word">{c.brand.name}<small>{c.brand.subtitle}</small></span></>}</span>;
}
