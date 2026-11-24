import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
gsap.registerPlugin(ScrollTrigger);

export function useMotion(root) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    const header = root.current.querySelector('header');
    const updateHeader = () => {
      const dark = [...root.current.querySelectorAll('.flavor-journey, .page-footer')].some(node => { const rect = node.getBoundingClientRect(); return rect.top <= 42 && rect.bottom > 42; });
      header.classList.toggle('on-dark', dark);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader); updateHeader();
    // Prepare nearby images ahead of the viewport, without holding up the entrance.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { target.loading = 'eager'; target.decode().catch(() => {}); observer.unobserve(target); }
      });
    }, { rootMargin: '900px 0px' });
    root.current.querySelectorAll('img[loading="lazy"]').forEach(img => observer.observe(img));
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ autoRaf: false, lerp: .09, smoothWheel: true, syncTouch: false, prevent: node => node.tagName === 'DIALOG' });
      const tick = time => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(tick);
      const onClick = event => {
        const link = event.target.closest('a[href^="#"]');
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        const target = document.getElementById(link.hash.slice(1));
        if (!target) return;
        event.preventDefault();
        history.pushState(null, '', link.hash);
        const offset = -(document.querySelector('header').offsetHeight + 20);
        const destination = target.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(destination, { offset, lerp: 0, duration: 1.1, onComplete: () => {
          const hadTabindex = target.hasAttribute('tabindex');
          if (!hadTabindex) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
          if (!hadTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        } });
      };
      document.addEventListener('click', onClick);
      gsap.from('.hero-copy > *, .hero-meta, .hero-bottom', { y: 22, opacity: 0, duration: .85, stagger: .1, ease: 'power2.out', delay: .15 });
      gsap.from('.hero-photo', { opacity: 0, scale: .94, rotation: -5, duration: 1.15, ease: 'power2.out' });
      gsap.utils.toArray('.section-top, .story-grid > div, .introduction, .feature-grid article, .visit-grid').forEach(node => {
        gsap.from(node, { y: 28, opacity: 0, duration: .7, ease: 'power2.out', scrollTrigger: { trigger: node, start: 'top 92%', once: true } });
      });
      return () => { document.removeEventListener('click', onClick); gsap.ticker.remove(tick); lenis.destroy(); };
    }, root);
    media.add('(min-width: 901px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      const section = root.current.querySelector('.flavor-journey');
      if (!section) return;
      const notes = section.querySelectorAll('.flavor-note');
      const photos = section.querySelectorAll('.flavor-visual img');
      section.classList.add('is-pinned');
      gsap.set(notes, { autoAlpha: 0, y: 18 }); gsap.set(notes[0], { autoAlpha: 1, y: 0 });
      gsap.set(photos, { autoAlpha: 0 }); gsap.set(photos[0], { autoAlpha: 1 });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, pin: '.flavor-pin', pinSpacing: true, start: 'top top', end: () => '+=' + innerHeight * 1.8, scrub: .7, invalidateOnRefresh: true, anticipatePin: 1 } });
      timeline.to({}, { duration: .8 })
        .to(photos[0], { autoAlpha: 0, duration: .45 }, .8)
        .to(photos[1], { autoAlpha: 1, duration: .45 }, .8)
        .to(notes[0], { autoAlpha: 0, y: -15, duration: .2 }, .8)
        .to(notes[1], { autoAlpha: 1, y: 0, duration: .25 }, 1)
        .to(photos[1], { autoAlpha: 0, duration: .45 }, 2)
        .to(photos[2], { autoAlpha: 1, duration: .45 }, 2)
        .to(notes[1], { autoAlpha: 0, y: -15, duration: .2 }, 2)
        .to(notes[2], { autoAlpha: 1, y: 0, duration: .25 }, 2.2)
        .to({}, { duration: .5 });
      return () => section.classList.remove('is-pinned');
    }, root);
    const refresh = () => {
      if (disposed) return;
      ScrollTrigger.refresh();
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - (document.querySelector('header').offsetHeight + 20), behavior: 'instant' });
      }
    };
    document.fonts.ready.then(refresh);
    return () => { disposed = true; observer.disconnect(); media.revert(); window.removeEventListener('scroll', updateHeader); window.removeEventListener('resize', updateHeader); };
  }, [root]);
}
