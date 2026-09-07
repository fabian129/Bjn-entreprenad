"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "iconify-icon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span className="word-wrap" key={i}>
          <span className="word-inner">{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const namnRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const typRef = useRef<HTMLSelectElement>(null);
  const beskRef = useRef<HTMLTextAreaElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useGSAP(
    () => {
      const initSite = () => {
        gsap.fromTo(
          ".hero-anim-title",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
        );
        gsap.fromTo(
          ".hero-anim-sub",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.35 }
        );
        gsap.fromTo(
          ".hero-anim-btn",
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
        );
        gsap.fromTo(
          ".hero-anim-media",
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.4 }
        );
        gsap.fromTo(
          ".hero-anim-stat",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "power3.out", delay: 0.55 }
        );
        gsap.to(".hero-parallax-target", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".split-animate").forEach((el) => {
          gsap.to(el.querySelectorAll(".word-inner"), {
            y: "0%",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.015,
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
          });
        });
        ScrollTrigger.refresh();
      };

      gsap
        .timeline({ onComplete: initSite })
        .to(".loader-bar", { width: "100%", duration: 0.8, ease: "power2.inOut" })
        .to(".loader-text", { y: -30, opacity: 0, duration: 0.4 })
        .to(".loader", { yPercent: -100, duration: 0.6, ease: "power4.inOut" })
        .set(".loader", { display: "none" });
    },
    { scope: containerRef }
  );

  const sendForm = () => {
    const namn = namnRef.current?.value.trim() ?? "";
    const tel = telRef.current?.value.trim() ?? "";
    const typ = typRef.current?.value ?? "";
    const besk = beskRef.current?.value.trim() ?? "";

    if (!namn || (!tel && !besk)) {
      setErrorMessage("Vänligen fyll i ditt namn och ett telefonnummer eller projektbeskrivning.");
      setFormStatus("error");
      return;
    }

    setErrorMessage("");
    setFormStatus("sending");

    const body = `Namn: ${namn}\r\nTelefon: ${tel}\r\nTyp av projekt: ${typ}\r\n\r\nBeskrivning:\r\n${besk}`;
    const mailtoUrl = `mailto:adam@bjnmark.se?subject=${encodeURIComponent(
      "Offertförfrågan via hemsidan — " + (typ !== "Typ av projekt" ? typ : namn)
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setTimeout(() => {
      setFormStatus("sent");
    }, 600);
  };

  return (
    <div ref={containerRef}>
      {/* PRELOADER */}
      <div className="loader">
        <div className="loader-text">BJN MARK &amp; ENTREPRENAD</div>
        <div className="loader-bar"></div>
      </div>

      {/* NAV - Full-width matching SKS */}
      <nav className="fixed top-0 w-full px-6 py-5 md:px-12 flex justify-between items-center z-50 text-white backdrop-blur-md bg-black/25 border-b border-white/5">
        <div className="display font-semibold text-lg md:text-xl tight flex items-center gap-2">
          <iconify-icon icon="solar:hill-2-linear" width="22" className="text-amber-500"></iconify-icon>
          <span>BJN Mark</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
          <a href="#om" className="hover:text-white transition-colors">Om oss</a>
          <a href="#tjanster" className="hover:text-white transition-colors">Tjänster</a>
          <a href="#arbeten" className="hover:text-white transition-colors">Arbeten</a>
          <a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a>
        </div>
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center gap-1.5 border border-white/20 px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-full font-medium"
        >
          Begär offert
        </a>
      </nav>

      <div className="wrapper">
        {/* HERO - Fullscreen with SKS Font & Layout Elegance */}
        <section className="hero-section relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0D0F12] text-white pt-24 pb-10 lg:pb-12">
          {/* Fullscreen Hero Background Image with Targeted Subtle Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/hero-live-bjn.jpg"
              alt="BJN Mark bygg- och markentreprenad"
              fill
              priority
              sizes="100vw"
              className="hero-parallax-target object-cover object-[center_35%]"
            />
            {/* Targeted local overlays: only where text and metrics sit, leaving the rest of the site completely crisp */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080A]/85 via-[#07080A]/40 via-45% to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#07080A]/90 via-[#07080A]/35 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#07080A]/55 to-transparent pointer-events-none" />
          </div>

          {/* Hero Content Container */}
          <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 flex flex-col justify-between flex-grow pt-6 sm:pt-8 pb-2">
            {/* Top / Left Text Block - Original BJN text with SKS Space Grotesk font styling */}
            <div className="max-w-2xl lg:max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xs text-[11px] uppercase tracking-[0.2em] text-white/80 w-fit mb-5">
                <iconify-icon icon="solar:hill-2-linear" width="14" className="text-amber-400" />
                <span>Mark- &amp; Grundentreprenad</span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
                <span className="text-white/70 font-normal">Stockholm &amp; Mälardalen</span>
              </div>

              <h1 className="hero-anim-title display text-3xl sm:text-4xl lg:text-[3.25rem] font-normal leading-[1.12] tight text-white mb-5">
                Mark &amp; anläggning med precision från grunden.
              </h1>

              <p className="hero-anim-sub text-base sm:text-lg lg:text-xl text-white/85 font-light leading-relaxed max-w-xl mb-7">
                Markentreprenader i Stockholm och Mälardalen. Från schakt och VA till färdig finplanering med fasta lag och full kontroll.
              </p>

              {/* Pill Button with Inset Circle Arrow + Phone */}
              <div className="hero-anim-btn flex flex-wrap items-center gap-5">
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-4 bg-white text-black pl-7 pr-2.5 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-white/90 transition-all group shadow-lg shadow-black/25"
                >
                  <span>Begär offert</span>
                  <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <iconify-icon icon="solar:arrow-right-up-linear" width="18"></iconify-icon>
                  </span>
                </a>
                <a
                  href="tel:0706520743"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors py-2"
                >
                  <iconify-icon icon="solar:phone-calling-linear" width="16" className="text-white/80" />
                  <span>070-652 07 43</span>
                </a>
              </div>
            </div>

            {/* Bottom Group: Divider Line + Large 4-Metric Grid Tailored to BJN */}
            <div className="w-full mt-8 md:mt-10">
              {/* Thin Divider Line */}
              <div className="w-full h-px bg-white/15 mb-6 lg:mb-8" />

              {/* 4-Metric Grid with Large Numbers making clear sense for BJN */}
              <div className="hero-anim-media grid grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-10">
                {/* Metric 1 */}
                <div className="hero-anim-stat">
                  <div className="display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-white mb-1.5 leading-none">
                    2011
                  </div>
                  <div className="text-xs font-medium uppercase tracking-widest text-white/50 mb-1">
                    Gruppens rötter
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-snug">
                    Bygg- &amp; projektledning med mångårig erfarenhet
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="hero-anim-stat">
                  <div className="display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-white mb-1.5 leading-none">
                    2021
                  </div>
                  <div className="text-xs font-medium uppercase tracking-widest text-white/50 mb-1">
                    BJN Mark grundas
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-snug">
                    Mark- &amp; anläggningsentreprenader i egen regi
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="hero-anim-stat">
                  <div className="display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-white mb-1.5 leading-none">
                    100%
                  </div>
                  <div className="text-xs font-medium uppercase tracking-widest text-white/50 mb-1">
                    Egen maskinpark
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-snug">
                    Grävmaskiner, dumper, laserstyrning och fasta lag
                  </p>
                </div>

                {/* Metric 4 */}
                <div className="hero-anim-stat">
                  <div className="display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-white mb-1.5 leading-none">
                    1
                  </div>
                  <div className="text-xs font-medium uppercase tracking-widest text-white/50 mb-1">
                    Kontakt hela vägen
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-snug">
                    Samma ansvariga lag från schakt till finplanering
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="bg-[var(--c-surface)] py-5 border-b border-black/10 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
            <span className="flex items-center gap-2"><iconify-icon icon="solar:box-minimalistic-linear" className="text-[var(--c-slate)]"></iconify-icon> Markarbeten &amp; schakt</span>
            <span className="flex items-center gap-2"><iconify-icon icon="solar:waterdrops-linear" className="text-[var(--c-slate)]"></iconify-icon> Dränering &amp; VA</span>
            <span className="flex items-center gap-2"><iconify-icon icon="solar:layers-minimalistic-linear" className="text-[var(--c-slate)]"></iconify-icon> Grundläggning</span>
            <span className="flex items-center gap-2"><iconify-icon icon="solar:leaf-linear" className="text-[var(--c-slate)]"></iconify-icon> Finplanering</span>
            <span className="flex items-center gap-2"><iconify-icon icon="solar:map-point-linear" className="text-[var(--c-slate)]"></iconify-icon> Stockholm &amp; Mälardalen</span>
          </div>
        </section>

        {/* OM OSS */}
        <section id="om" className="py-28 md:py-32 px-6 md:px-20 grid md:grid-cols-2 gap-16 max-w-[1600px] mx-auto">
          <div className="sticky top-32 self-start">
            <h2 className="display text-4xl md:text-5xl font-medium tight leading-tight split-animate">
              <SplitWords text="Mark är vårt modersmål." /> <SplitWords className="text-neutral-400" text="Bas i Nykvarn." />
            </h2>
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-medium uppercase tracking-widest text-neutral-500">
              <div className="flex items-center gap-2"><iconify-icon icon="solar:users-group-two-rounded-linear" className="text-lg"></iconify-icon> Del av BJN-gruppen</div>
              <div className="flex items-center gap-2"><iconify-icon icon="solar:round-double-alt-arrow-right-linear" className="text-lg"></iconify-icon> Kort beslutsväg</div>
            </div>
          </div>
          <div className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">
            <p className="mb-8 split-animate"><SplitWords text="BJN Mark & Entreprenad är ett anläggningsföretag med bas i Nykvarn. Vi tar oss an allt från villatomter och dräneringar till kompletta markentreprenader åt företag och beställare i Mälardalen." /></p>
            <p className="mb-8 split-animate"><SplitWords text="Vi är små nog att bry oss om varje detalj, men rustade nog att leverera komplexa markentreprenader med full kontroll på tid, ekonomi och kvalitet." /></p>
            <div className="h-px w-full bg-black/10 my-10"></div>
            <div className="grid grid-cols-2 gap-8">
              <div><h4 className="text-sm font-medium uppercase tracking-widest text-black mb-2">Bas</h4><p className="text-sm text-neutral-500">Nykvarn &amp; Mälardalen</p></div>
              <div><h4 className="text-sm font-medium uppercase tracking-widest text-black mb-2">Fokus</h4><p className="text-sm text-neutral-500">Mark · Anläggning · Entreprenad</p></div>
            </div>
          </div>
        </section>

        {/* TJÄNSTER */}
        <section id="tjanster" className="bg-[var(--c-surface)] py-24 md:py-28 border-y border-black/10">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-[var(--c-slate)]"></span><span className="text-xs font-medium uppercase tracking-widest text-[var(--c-slate)]">Tjänster</span></div>
                <h2 className="display text-4xl md:text-5xl font-medium tight">Det vi gör</h2>
              </div>
              <p className="max-w-md text-neutral-500 leading-relaxed">Hela vägen från obearbetad mark till färdig, hållbar yta — en kontakt, ett ansvar, ett lag.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { img: "/service_schakt.jpg", label: "Markarbeten & schakt" },
                { img: "/service_finplanering.jpg", label: "Anläggning & finplanering" },
                { img: "/service_dranering_va.jpg", label: "Dränering & VA" },
                { img: "/service_grundlaggning.jpg", label: "Grundläggning" },
                { img: "/service_stenlaggning.jpg", label: "Stenläggning & murar" },
                { img: "/service_vagar_ytor.jpg", label: "Vägar & hårdgjorda ytor" },
              ].map((s) => (
                <div className="svc-card group" key={s.label}>
                  <Image src={s.img} alt={s.label} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                  <div className="svc-scrim"></div>
                  <div className="svc-glass"><span className="text-white font-medium text-lg display tight">{s.label}</span><iconify-icon icon="solar:arrow-right-up-linear" className="text-white" width="22"></iconify-icon></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAKTA */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <h2 className="display text-3xl md:text-5xl font-medium tight leading-tight max-w-3xl">Ett ungt bolag med gamla rötter i marken.</h2>
              <span className="text-sm font-medium uppercase tracking-widest text-neutral-500 pb-2 border-b border-black">Nykvarn</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/10 border-y border-black/10">
              <div className="flex flex-col gap-2 py-8 md:py-10 md:px-8 first:md:pl-0"><span className="display text-5xl md:text-7xl font-medium tight">2011</span><span className="text-xs font-medium uppercase tracking-widest mt-3">Gruppens rötter</span><span className="text-sm text-neutral-500">BJN Projekt — bygg &amp; projektledning</span></div>
              <div className="flex flex-col gap-2 py-8 md:py-10 md:px-8"><span className="display text-5xl md:text-7xl font-medium tight">2021</span><span className="text-xs font-medium uppercase tracking-widest mt-3">BJN Mark grundas</span><span className="text-sm text-neutral-500">Mark &amp; anläggning i egen regi</span></div>
              <div className="flex flex-col gap-2 py-8 md:py-10 md:px-8"><span className="display text-5xl md:text-7xl font-medium tight">1</span><span className="text-xs font-medium uppercase tracking-widest mt-3">Kontakt hela vägen</span><span className="text-sm text-neutral-500">Från schakt till finplanering</span></div>
              <div className="flex flex-col gap-2 py-8 md:py-10 md:px-8 last:md:pr-0"><span className="display text-5xl md:text-7xl font-medium tight">100<span className="text-neutral-400">%</span></span><span className="text-xs font-medium uppercase tracking-widest mt-3">Fokus på mark</span><span className="text-sm text-neutral-500">Det här är allt vi gör</span></div>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="py-28 md:py-36 bg-[var(--c-dark)] text-white border-y border-black/10">
          <div className="max-w-[1500px] mx-auto px-6 md:px-12">
            <div className="flex flex-col gap-4 mb-20 max-w-3xl">
              <span className="text-xs font-medium uppercase tracking-widest text-white/45">Vårt hantverk</span>
              <h2 className="display text-4xl md:text-6xl font-medium tight split-animate"><SplitWords text="Stabil mark är ett löfte — inte en slump." /></h2>
            </div>
            <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
              {[
                { n: "01", t: "Grundlig projektering", p: "Vi börjar i marken. Avvägning, planering och en tydlig kalkyl innan första spadtaget — så att inga överraskningar dyker upp senare." },
                { n: "02", t: "Ett fast lag", p: "Ett lag som äger hela leveransen från start till mål — inga led att skylla på, en ansvarig hela vägen." },
                { n: "03", t: "Ordning i varje beslut", p: "Masshantering och återvinning med ordning och reda. Vi lämnar marken bättre än vi fann den." },
                { n: "04", t: "Överlämning utan punktlista", p: "Vi är inte klara förrän du är det. Slutbesiktning, dokumentation och en yta som håller i decennier — inte bara till garantin gått ut." },
              ].map((item) => (
                <div className="py-10 flex flex-col md:flex-row gap-6 md:gap-24 group hover:bg-white/[0.03] transition-colors -mx-6 px-6 md:-mx-12 md:px-12" key={item.n}>
                  <span className="display text-4xl md:text-5xl font-medium tight text-white/30 group-hover:text-white transition-colors w-24">{item.n}</span>
                  <div className="flex-1 flex flex-col gap-3"><h3 className="display text-2xl md:text-3xl font-medium tight">{item.t}</h3><p className="text-base md:text-lg text-white/55 max-w-2xl font-light">{item.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARBETEN */}
        <section id="arbeten" className="py-28 md:py-32 bg-[var(--c-bg)]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
              <h2 className="display text-5xl md:text-7xl font-medium tight">Ur vardagen</h2>
              <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">Mark · Anläggning</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-x-12 items-center">
              <div className="md:col-span-7 flex flex-col gap-6 group cursor-pointer">
                <div className="relative overflow-hidden bg-neutral-200 aspect-[4/3] rounded-sm"><Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80" alt="Schakt och grundläggning" fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" /></div>
                <div className="flex justify-between items-start border-t border-black/10 pt-4"><div><h3 className="display text-2xl font-medium tight">Schakt &amp; grundläggning</h3><span className="text-sm text-neutral-500 block mt-1">Villatomter &amp; bostadsprojekt</span></div><span className="text-xs uppercase tracking-widest font-medium">Markentreprenad</span></div>
              </div>
              <div className="md:col-span-4 md:col-start-9 flex flex-col gap-6 group cursor-pointer mt-0 md:mt-40">
                <div className="relative overflow-hidden bg-neutral-200 aspect-[3/4] rounded-sm"><Image src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80" alt="VA och dränering" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" /></div>
                <div className="flex justify-between items-start border-t border-black/10 pt-4"><div><h3 className="display text-2xl font-medium tight">VA &amp; dränering</h3><span className="text-sm text-neutral-500 block mt-1">Om- &amp; nyanläggning</span></div><span className="text-xs uppercase tracking-widest font-medium">Dränering</span></div>
              </div>
              <div className="md:col-span-8 md:col-start-3 flex flex-col gap-6 group cursor-pointer mt-0 md:mt-16">
                <div className="relative overflow-hidden bg-neutral-200 aspect-video rounded-sm"><Image src="https://images.unsplash.com/photo-1517089152318-42ec560349c0?w=1400&q=80" alt="Finplanering" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" /></div>
                <div className="flex justify-between items-start border-t border-black/10 pt-4"><div><h3 className="display text-2xl font-medium tight">Finplanering</h3><span className="text-sm text-neutral-500 block mt-1">Ytor som håller</span></div><span className="text-xs uppercase tracking-widest font-medium">Anläggning</span></div>
              </div>
            </div>
            <div className="flex justify-center"><a href="#kontakt" className="border border-black/80 hover:bg-black hover:text-white transition-colors px-8 py-4 rounded-full text-sm font-medium uppercase tracking-widest">Diskutera ditt projekt</a></div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-28 bg-[var(--c-bg)] border-t border-black/10">
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4 flex flex-col gap-4"><span className="text-xs font-medium uppercase tracking-widest text-neutral-500">Du kanske undrar</span><h2 className="display text-5xl md:text-7xl font-medium tight">FAQ</h2></div>
            <div className="md:col-span-8 flex flex-col divide-y divide-black/10 border-t border-black/10">
              {[
                { q: "Vilka typer av markarbeten åtar ni er?", a: "Allt från enskilda villatomter och dräneringar till kompletta markentreprenader — schakt, VA, grundläggning och finplanering.", open: true },
                { q: "Hur snabbt kan ni starta ett projekt?", a: "Med fasta lag är vi flexibla. Efter platsbesök och offert kan vi oftast vara på plats inom ett par veckor — akuta jobb snabbare." },
                { q: "Hjälper ni till redan i planeringsstadiet?", a: "Ja. Vi kommer gärna in tidigt, gör platsbesök och hjälper dig planera markarbetet så att helheten blir rätt från början — innan första spadtaget." },
                { q: "Arbetar ni med ROT-avdrag för privatpersoner?", a: "Absolut. Vi hjälper privatkunder med ROT där det är tillämpligt och sköter all administration mot Skatteverket åt dig." },
              ].map((f) => (
                <details className="group py-6 cursor-pointer" open={f.open} key={f.q}>
                  <summary className="flex justify-between items-center font-medium text-lg md:text-xl text-neutral-700 hover:text-black transition-colors">{f.q}<span className="transition-transform duration-300 group-open:rotate-45"><iconify-icon icon="solar:add-circle-linear" width="26" className="text-neutral-400"></iconify-icon></span></summary>
                  <p className="text-base md:text-lg text-neutral-600 mt-4 pr-12 leading-relaxed font-light">{f.a}</p>
                </details>
              ))}
              <div className="pt-8 flex justify-between items-center text-neutral-500 text-sm"><span>Undrar du något annat?</span><a href="#kontakt" className="font-medium text-black flex items-center gap-2 hover:gap-3 transition-all">Ställ din fråga <iconify-icon icon="solar:arrow-right-linear"></iconify-icon></a></div>
            </div>
          </div>
        </section>

        {/* CTA + KONTAKT */}
        <section id="kontakt" className="py-28 md:py-32 bg-[var(--c-ink)] text-white relative z-10 border-b border-white/5">
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6"><span className="w-8 h-px bg-white/50"></span><span className="text-xs font-medium uppercase tracking-widest text-white/50">Kontakt</span></div>
              <h2 className="display text-4xl md:text-6xl font-medium tight leading-[1.05] mb-6">Redo att <br />bryta mark?</h2>
              <p className="text-white/60 font-light leading-relaxed max-w-md mb-10">Beskriv ditt projekt så återkommer vi med ett kostnadsfritt platsbesök och en tydlig offert — utan krångel.</p>
              <div className="space-y-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Adam Taner — Projektchef</p>
                  <a href="tel:+46733321122" className="flex items-center gap-3 text-lg hover:text-white/70 transition-colors"><iconify-icon icon="solar:phone-linear"></iconify-icon> 073-332 11 22</a>
                  <a href="mailto:adam@bjnmark.se" className="flex items-center gap-3 text-lg hover:text-white/70 transition-colors mt-2"><iconify-icon icon="solar:letter-linear"></iconify-icon> adam@bjnmark.se</a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Jonas Nylander — Produktionsansvarig</p>
                  <a href="tel:+46730706767" className="flex items-center gap-3 text-lg hover:text-white/70 transition-colors"><iconify-icon icon="solar:phone-linear"></iconify-icon> 073-070 67 67</a>
                  <a href="mailto:jonas@bjnprojekt.se" className="flex items-center gap-3 text-lg hover:text-white/70 transition-colors mt-2"><iconify-icon icon="solar:letter-linear"></iconify-icon> jonas@bjnprojekt.se</a>
                </div>
                <p className="flex items-center gap-3 text-white/60"><iconify-icon icon="solar:map-point-linear"></iconify-icon> Räfsvägen 13, 155 34 Nykvarn</p>
              </div>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid gap-4">
                <input ref={namnRef} type="text" placeholder="Namn" className="bg-transparent border border-white/15 rounded-lg px-4 py-3.5 text-sm placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors" />
                <input ref={telRef} type="tel" placeholder="Telefon" className="bg-transparent border border-white/15 rounded-lg px-4 py-3.5 text-sm placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors" />
                <select ref={typRef} defaultValue="Typ av projekt" className="bg-transparent border border-white/15 rounded-lg px-4 py-3.5 text-sm text-white/60 focus:border-white/50 focus:outline-none transition-colors">
                  {["Typ av projekt", "Markarbeten & schakt", "Dränering & VA", "Grundläggning", "Finplanering", "Annat"].map((o) => (
                    <option className="text-black" key={o}>{o}</option>
                  ))}
                </select>
                <textarea ref={beskRef} rows={4} placeholder="Beskriv ditt projekt" className="bg-transparent border border-white/15 rounded-lg px-4 py-3.5 text-sm placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors resize-none"></textarea>
                <button type="button" onClick={sendForm} className="bg-white text-black rounded-lg px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-white/85 transition-colors">Skicka förfrågan</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* /wrapper */}

      {/* FOOTER */}
      <footer className="relative z-20 bg-[var(--c-dark)] text-white border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-20 pb-12">
          {/* Top Brand & Quick Contact Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-3">
                <iconify-icon icon="solar:hill-2-linear" width="28" className="text-white/80"></iconify-icon>
                <span className="display text-2xl md:text-3xl font-medium tight tracking-tight">BJN Mark &amp; Entreprenad</span>
              </div>
              <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                Mark- och anläggningsentreprenader i Nykvarn och Mälardalen. Från schakt och grundläggning till färdig finplanering — utfört med precision och full kontroll.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-white/85 transition-colors"
              >
                Begär offert <iconify-icon icon="solar:arrow-right-up-linear" width="18"></iconify-icon>
              </a>
              <a
                href="tel:+46733321122"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium hover:border-white hover:bg-white/5 transition-colors"
              >
                <iconify-icon icon="solar:phone-linear" width="18"></iconify-icon> 073-332 11 22
              </a>
            </div>
          </div>

          {/* 4 Clear Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-14 border-b border-white/10 text-sm">
            {/* Col 1: Tjänster */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Tjänster</h4>
              <ul className="space-y-3 text-white/70 font-light text-sm">
                <li><a href="#tjanster" className="hover:text-white transition-colors">Markarbeten &amp; schakt</a></li>
                <li><a href="#tjanster" className="hover:text-white transition-colors">Anläggning &amp; finplanering</a></li>
                <li><a href="#tjanster" className="hover:text-white transition-colors">Dränering &amp; VA</a></li>
                <li><a href="#tjanster" className="hover:text-white transition-colors">Grundläggning</a></li>
                <li><a href="#tjanster" className="hover:text-white transition-colors">Stenläggning &amp; murar</a></li>
                <li><a href="#tjanster" className="hover:text-white transition-colors">Vägar &amp; hårdgjorda ytor</a></li>
              </ul>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Navigation</h4>
              <ul className="space-y-3 text-white/70 font-light text-sm">
                <li><a href="#om" className="hover:text-white transition-colors">Om BJN Mark</a></li>
                <li><a href="#tjanster" className="hover:text-white transition-colors">Våra tjänster</a></li>
                <li><a href="#arbeten" className="hover:text-white transition-colors">Ur vardagen</a></li>
                <li><a href="#kontakt" className="hover:text-white transition-colors">Vanliga frågor (FAQ)</a></li>
                <li><a href="#kontakt" className="hover:text-white transition-colors">Kostnadsfritt platsbesök</a></li>
              </ul>
            </div>

            {/* Col 3: Kontaktpersoner */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Kontaktpersoner</h4>
              <div className="space-y-5">
                <div>
                  <p className="font-medium text-white text-sm">Adam Taner</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1.5">Projektchef</p>
                  <a href="tel:+46733321122" className="block text-white/80 hover:text-white transition-colors text-sm">073-332 11 22</a>
                  <a href="mailto:adam@bjnmark.se" className="block text-white/50 hover:text-white transition-colors text-xs mt-0.5">adam@bjnmark.se</a>
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Jonas Nylander</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1.5">Produktionsansvarig</p>
                  <a href="tel:+46730706767" className="block text-white/80 hover:text-white transition-colors text-sm">073-070 67 67</a>
                  <a href="mailto:jonas@bjnprojekt.se" className="block text-white/50 hover:text-white transition-colors text-xs mt-0.5">jonas@bjnprojekt.se</a>
                </div>
              </div>
            </div>

            {/* Col 4: Företagsuppgifter */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">Företagsuppgifter</h4>
              <div className="space-y-4 text-white/70 font-light text-sm">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Kontor &amp; post</p>
                  <p className="leading-relaxed">Räfsvägen 13<br />155 34 Nykvarn</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Bolag &amp; org.nr</p>
                  <p className="font-medium text-white/90">BJN Mark &amp; Entreprenad AB</p>
                  <p className="text-xs text-white/50">Org.nr 559322-4925</p>
                </div>
                <div className="pt-1">
                  <span className="inline-block text-[11px] uppercase tracking-wider text-white/60 border border-white/15 px-2.5 py-1 rounded">
                    Godkänd för F-skatt
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom sub-footer bar */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-light">
            <div>
              © {new Date().getFullYear()} BJN Mark &amp; Entreprenad AB. Alla rättigheter förbehållna.
            </div>
            <div className="flex items-center gap-4">
              <span>Nykvarn · Mälardalen</span>
              <span>•</span>
              <span>Mark · Anläggning · Entreprenad</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
