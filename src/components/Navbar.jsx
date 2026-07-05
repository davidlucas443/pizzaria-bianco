import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Destaques', href: '#destaques' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Localização', href: '#localizacao' },
];

export function Navbar({ brandName, scrolled, mobileOpen, setMobileOpen }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-white/70 bg-white/85 shadow-soft backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#topo" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-sm font-extrabold text-white shadow-glow">
            {brandName.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">{brandName}</p>
            <p className="text-xs text-stone-500">Premium dining experience</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-stone-700 transition hover:text-brand-700">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#cardapio"
            className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:border-brand-200 hover:text-brand-700"
          >
            Ver Cardápio
          </a>
          <a
            href="#cta"
            className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Peça Agora
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-900 shadow-sm md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`md:hidden ${mobileOpen ? 'block' : 'hidden'} border-t border-stone-200 bg-white/95 px-5 py-4 backdrop-blur-xl`}>
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100">
              {link.label}
            </a>
          ))}
          <a href="#cta" onClick={() => setMobileOpen(false)} className="rounded-2xl bg-brand-700 px-4 py-3 text-sm font-semibold text-white text-center">
            Peça Agora
          </a>
        </div>
      </div>
    </motion.header>
  );
}