import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, MapPin, Phone, Play, Sparkles, Star, Truck, Waves, Wifi, UtensilsCrossed } from 'lucide-react';
import { siteConfig } from './data/siteConfig';
import { Navbar } from './components/Navbar';
import { Reveal } from './components/Reveal';
import { SectionHeading } from './components/SectionHeading';

function RatingStars({ value }) {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={`Avaliação de ${value} estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={16} fill={index < value ? 'currentColor' : 'none'} />
      ))}
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mapSrc = useMemo(
    () => `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`,
    [],
  );

  return (
    <div id="topo" className="relative overflow-hidden">
      <Navbar brandName={siteConfig.brandName} scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="pt-24 md:pt-28">
        <section className="relative isolate overflow-hidden bg-hero-radial">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(123,15,18,0.96)_0%,rgba(123,15,18,0.94)_100%)]" />
          <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24)_0,transparent_15%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12)_0,transparent_14%)]" />

          <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-16 px-5 py-14 text-white md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <Reveal className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/85">
                <Sparkles size={14} />
                Modelo comercial premium para restaurantes
              </div>

              <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-tight text-balance md:text-7xl">
                Uma landing page que vende antes mesmo do primeiro clique.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
                {siteConfig.slogan}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#cta" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-brand-800 transition hover:-translate-y-0.5 hover:bg-stone-100">
                  {siteConfig.ctaPrimary}
                  <ArrowRight size={18} />
                </a>
                <a href="#cardapio" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                  <Play size={18} />
                  {siteConfig.ctaSecondary}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <RatingStars value={5} />
                  <span className="text-sm font-semibold text-white/85">{siteConfig.rating}/5 · {siteConfig.reviewCount} avaliações</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Clock3 size={16} />
                  {siteConfig.hours}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin size={16} />
                  {siteConfig.location}
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {siteConfig.quickFacts.map((fact) => (
                  <div key={fact.label} className="rounded-3xl border border-white/12 bg-white/8 p-4 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">{fact.label}</p>
                    <p className="mt-2 text-lg font-bold text-white">{fact.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="relative mx-auto w-full max-w-xl" delay={0.1}>
              <div className="absolute -left-8 top-10 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -right-12 bottom-8 h-44 w-44 rounded-full bg-amber-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <div className="rounded-[1.6rem] bg-white p-5 text-stone-950 shadow-inner">
                  <div className="rounded-[1.4rem] bg-gradient-to-b from-stone-950 to-stone-800 p-4">
                    <div className="mx-auto mb-4 h-1.5 w-24 rounded-full bg-white/40" />
                    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                      <div className="rounded-[1.8rem] bg-stone-950 p-5 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">Delivery premium</p>
                        <h3 className="mt-3 font-display text-3xl leading-none">É só pedir que a gente entrega.</h3>
                        <div className="mt-5 space-y-2 text-sm text-white/75">
                          <p className="flex items-center gap-2"><Truck size={16} /> {siteConfig.deliveryTime}</p>
                          <p className="flex items-center gap-2"><MapPin size={16} /> {siteConfig.location}</p>
                          <p className="flex items-center gap-2"><Clock3 size={16} /> {siteConfig.hours}</p>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-[1.8rem] bg-brand-700 p-5 text-white">
                        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                          <span>Pedido em destaque</span>
                          <span>4.9/5</span>
                        </div>
                        <img
                          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                          alt="Pizza artesanal em destaque"
                          loading="lazy"
                          className="mt-4 h-72 w-full rounded-[1.4rem] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="sobre" className="section-gradient px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Sobre o restaurante"
                title={siteConfig.about.headline}
                description="A estrutura foi pensada para vender confiança, sofisticação e desejo com uma leitura imediata e moderna."
              />
            </Reveal>

            <div className="grid gap-5 md:grid-cols-3">
              {siteConfig.highlights.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <article className="h-full rounded-[1.8rem] border border-stone-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                      <UtensilsCrossed size={20} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-stone-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="destaques" className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Pratos em destaque"
                title="Cards premium, imagens grandes e leitura instantânea."
                description="Uma vitrine com apelo visual forte para abrir o apetite e reduzir fricção na decisão do cliente."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {siteConfig.featuredDishes.map((dish, index) => (
                <Reveal key={dish.name} delay={index * 0.08}>
                  <article className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                    <div className="relative overflow-hidden">
                      <img src={dish.image} alt={dish.name} loading="lazy" className="h-80 w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-display font-semibold text-stone-950">{dish.name}</h3>
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-800">{dish.price}</span>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{dish.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="cardapio" className="section-gradient px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Cardápio"
                title="Categorias bem organizadas para leitura rápida no mobile e no desktop."
                description="Estrutura flexível para adaptar o conteúdo sem mexer na lógica principal do projeto."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 xl:grid-cols-3">
              {siteConfig.menuCategories.map((category, index) => (
                <Reveal key={category.name} delay={index * 0.08}>
                  <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-700">{category.name}</p>
                    <div className="mt-5 space-y-4">
                      {category.items.map((item) => (
                        <div key={item.name} className="rounded-2xl bg-stone-50 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-stone-950">{item.name}</h3>
                              <p className="mt-1 text-sm leading-6 text-stone-600">{item.description}</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-brand-800 shadow-sm">{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Diferenciais"
                title="O que faz a marca parecer mais valiosa desde o primeiro contato."
                description="Cada bloco foi desenhado para reforçar conveniência, qualidade e percepção premium."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {siteConfig.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Waves size={18} />
                    </div>
                    <span className="font-semibold text-stone-900">{feature}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="grid gap-4 sm:grid-cols-2" delay={0.1}>
              <div className="rounded-[2rem] bg-stone-950 p-6 text-white shadow-soft sm:row-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">Atendimento e operação</p>
                <h3 className="mt-4 font-display text-3xl leading-tight">Detalhes que transformam curiosidade em pedido.</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">A experiência do site foi pensada como um funil de conversão visual, com CTA claro, prova social e acesso fácil às informações críticas.</p>
              </div>
              <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
                <Clock3 className="text-brand-700" />
                <h3 className="mt-4 font-semibold text-stone-950">Ritmo rápido</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">Fluxo ágil para pedido, reserva e contato.</p>
              </div>
              <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
                <Wifi className="text-brand-700" />
                <h3 className="mt-4 font-semibold text-stone-950">Conforto premium</h3>
                <p className="mt-2 text-sm leading-7 text-stone-600">Ambiente e comunicação alinhados ao posicionamento da marca.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="galeria" className="section-gradient px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Galeria"
                title="Uma vitrine visual com estética limpa e foco total no produto."
                description="Grid moderno com hover elegante para reforçar qualidade e variedade sem poluir a interface."
              />
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {siteConfig.galleryImages.map((image, index) => (
                <Reveal key={image} delay={index * 0.04}>
                  <div className="group overflow-hidden rounded-[1.8rem] bg-white shadow-soft">
                    <img src={image} alt={`Imagem da galeria ${index + 1}`} loading="lazy" className="h-72 w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                eyebrow="Depoimentos"
                title="Prova social com aparência refinada e leitura rápida."
                description="Avaliações reais ajudam a reduzir objeções e aumentam a confiança antes do clique no CTA."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {siteConfig.testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 0.08}>
                  <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-soft">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-lg font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-950">{testimonial.name}</h3>
                        <p className="text-sm text-stone-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <RatingStars value={testimonial.rating} />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-stone-600">{testimonial.quote}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="localizacao" className="section-gradient px-5 py-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-soft">
                <SectionHeading
                  eyebrow="Localização"
                  title="Informações essenciais ao lado do mapa, sem esforço para o cliente."
                  description="Layout ideal para apoiar conversão em pedidos, reservas e visitas presenciais."
                />

                <div className="mt-8 space-y-4 text-stone-700">
                  <p className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-brand-700" size={18} />{siteConfig.address}</p>
                  <p className="flex items-center gap-3"><Clock3 className="text-brand-700" size={18} />{siteConfig.hours}</p>
                  <p className="flex items-center gap-3"><Phone className="text-brand-700" size={18} />{siteConfig.phone}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-soft">
                <iframe
                  title="Mapa do restaurante"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[430px] w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="cta" className="px-5 pb-24 pt-10 md:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-stone-950 px-6 py-14 text-white shadow-[0_40px_140px_rgba(0,0,0,0.24)] md:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,60,49,0.28),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.18),transparent_24%)]" />
                <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">CTA final</p>
                    <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-6xl text-balance">Pronto para transformar visitantes em pedidos e reservas?</h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 md:text-lg">Esse modelo foi construído para ser comercial, escalável e rápido de personalizar para novos restaurantes com identidade própria.</p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                      <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-brand-800 transition hover:-translate-y-0.5">
                        <Phone size={18} />
                        {siteConfig.ctaWhatsApp}
                      </a>
                      <a href="#localizacao" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/12">
                        <MapPin size={18} />
                        {siteConfig.ctaReserve}
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.8rem] border border-white/12 bg-white/8 p-5 backdrop-blur-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">Contato rápido</p>
                      <p className="mt-3 text-2xl font-bold">{siteConfig.phone}</p>
                      <p className="mt-2 text-sm text-white/70">Atendimento pronto para pedidos e reservas.</p>
                    </div>
                    <div className="rounded-[1.8rem] border border-white/12 bg-white/8 p-5 backdrop-blur-md">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/55">Horário</p>
                      <p className="mt-3 text-2xl font-bold">{siteConfig.hours}</p>
                      <p className="mt-2 text-sm text-white/70">Operação alinhada ao fluxo de conversão.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-stone-950">{siteConfig.brandName}</p>
            <p className="text-sm text-stone-500">Modelo de landing page premium para restaurantes.</p>
          </div>
          <div className="flex flex-col gap-1 text-sm text-stone-500 md:items-end">
            <p>{siteConfig.address}</p>
            <p>{siteConfig.phone}</p>
            <p>© {new Date().getFullYear()} {siteConfig.brandName}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;