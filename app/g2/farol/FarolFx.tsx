"use client";

import { useEffect } from "react";

/**
 * Efeitos client-side da variante g2/farol: reveals on-scroll e visibilidade
 * do widget flutuante. Vive num useEffect — que por definição roda DEPOIS da
 * hidratação — para nunca mutar classes/styles de nós server-rendered antes
 * de o React reconhecê-los (o script inline anterior corria contra a
 * hidratação e causava mismatch no console). Renderiza null.
 */
export default function FarolFx() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observers: IntersectionObserver[] = [];

    // --- Widget flutuante: aparece depois que o hero sai do viewport e
    // some quando o CTA final ou o footer global entram.
    const widget = document.getElementById("g2-float");
    const hero = document.getElementById("g2-hero");
    const finalCta = document.getElementById("g2-final");
    const footer = document.querySelector("footer");

    if (widget && hero) {
      let heroOut = false;
      let endIn = false;
      let footIn = false;
      const sync = () =>
        widget.classList.toggle(
          "g2-float-visible",
          heroOut && !endIn && !footIn
        );

      const heroObs = new IntersectionObserver(
        (entries) => {
          heroOut = !entries[0].isIntersecting;
          sync();
        },
        { threshold: 0 }
      );
      heroObs.observe(hero);
      observers.push(heroObs);

      if (finalCta) {
        const endObs = new IntersectionObserver(
          (entries) => {
            endIn = entries[0].isIntersecting;
            sync();
          },
          { threshold: 0.15 }
        );
        endObs.observe(finalCta);
        observers.push(endObs);
      }

      if (footer) {
        const footObs = new IntersectionObserver(
          (entries) => {
            footIn = entries[0].isIntersecting;
            sync();
          },
          { threshold: 0.05 }
        );
        footObs.observe(footer);
        observers.push(footObs);
      }
    }

    // --- Reveals on-scroll com stagger de 80ms entre irmãos; uma vez só.
    // Reduced-motion desliga tudo (a classe .g2-reveal nem é aplicada).
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced) {
      const items: HTMLElement[] = [];
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => items.push(el));
      document
        .querySelectorAll<HTMLElement>("[data-reveal-children]")
        .forEach((parent) => {
          Array.from(parent.children).forEach((child, index) => {
            const el = child as HTMLElement;
            el.style.animationDelay = `${index * 80}ms`;
            items.push(el);
          });
        });

      items.forEach((el) => el.classList.add("g2-reveal"));

      const revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("g2-revealed");
              revealObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      items.forEach((el) => revealObs.observe(el));
      observers.push(revealObs);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return null;
}
