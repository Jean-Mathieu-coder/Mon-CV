import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Video,
  Music,
  Code,
  FileSpreadsheet,
  Building2,
  Send,
  MessageCircle,
  Play,
  Pause,
  Printer,
  X,
  Volume2,
  Loader2,
  AlertCircle
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const mainRef = useRef(null)
  const navRef = useRef(null)
  const audioRef = useRef(null)

  const [navScrolled, setNavScrolled] = useState(false)
  const [showCvModal, setShowCvModal] = useState(false)

  // Real Email Form submission states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Mission de Gestion Financière',
    message: ''
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formStatus, setFormStatus] = useState(null) // null | 'success' | 'error'
  const [formErrorMsg, setFormErrorMsg] = useState('')

  // Real Audio player state for "Hymne CCACJ"
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)

  const cvPdfPath = "/CV_GOMADO_Yawo_Jean_Mathieu.pdf"
  const whatsAppUrl = "https://wa.me/22896273844?text=Bonjour%20Yawo%20Jean-Mathieu,%20j'ai%20consult%C3%A9%20votre%20portfolio%20et%20souhaiterais%20%C3%A9changer%20avec%20vous."
  const emailAddress = "jeanmathieugomado3@gmail.com"

  // Floating navbar background transition based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setNavScrolled(true)
      } else {
        setNavScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Audio element event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setAudioCurrentTime(audio.currentTime)
    const updateDuration = () => setAudioDuration(audio.duration || 0)
    const onEnded = () => setIsPlayingAudio(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (isPlayingAudio) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true)
      }).catch((e) => {
        console.error("Audio playback error:", e)
      })
    }
  }

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return "00:00"
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
  }

  // GSAP Animations with context cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTl.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
      })
        .from('.hero-avatar', {
          scale: 0.8,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.5)'
        }, '-=0.5')
        .from('.hero-title-name', {
          y: 35,
          opacity: 0,
          duration: 1,
          stagger: 0.08
        }, '-=0.6')
        .from('.hero-subtitle', {
          y: 25,
          opacity: 0,
          duration: 0.8
        }, '-=0.6')
        .from('.hero-stat-item', {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12
        }, '-=0.5')
        .from('.hero-cta-group', {
          y: 20,
          opacity: 0,
          duration: 0.7
        }, '-=0.4')

      // 2. About section animation
      gsap.from('.about-reveal', {
        scrollTrigger: {
          trigger: '#a-propos',
          start: 'top 78%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // 3. Experience timeline cards animation
      const cards = gsap.utils.toArray('.experience-card-item')
      cards.forEach((card, index) => {
        const isEven = index % 2 === 0
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          x: isEven ? -40 : 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out'
        })

        gsap.from(`.timeline-dot-${index}`, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)'
        })
      })

      // 4. Skills counter & ring animations
      const skillRings = gsap.utils.toArray('.skill-ring-progress')
      skillRings.forEach((ring) => {
        const targetPercent = ring.getAttribute('data-percent')
        const circumference = 2 * Math.PI * 32
        const strokeDashoffset = circumference - (circumference * targetPercent) / 100

        gsap.to(ring, {
          scrollTrigger: {
            trigger: '#competences',
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          strokeDashoffset: strokeDashoffset,
          duration: 1.6,
          ease: 'power2.inOut'
        })
      })

      const skillCounters = gsap.utils.toArray('.skill-counter-val')
      skillCounters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10)
        const obj = { val: 0 }
        gsap.to(obj, {
          scrollTrigger: {
            trigger: '#competences',
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            counter.innerText = Math.round(obj.val) + '%'
          }
        })
      })

      // 5. Education cards animation
      gsap.from('.education-card', {
        scrollTrigger: {
          trigger: '#formation',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // 6. Contact animation
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })

    }, mainRef)

    return () => ctx.revert()
  }, [])

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormStatus(null)
    setFormErrorMsg('')

    try {
      const response = await fetch("https://formsubmit.co/ajax/jeanmathieugomado3@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Nouveau message Portfolio CV — ${formData.subject} (${formData.name})`,
          _template: 'table',
          _captcha: 'false'
        })
      })

      const data = await response.json()
      if (response.ok || data.success === "true" || data.success === true) {
        setFormStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: 'Mission de Gestion Financière',
          message: ''
        })
      } else {
        throw new Error(data.message || "Erreur de transmission")
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'email:", err)
      setFormStatus('error')
      setFormErrorMsg("La transmission automatique a rencontré une indisponibilité réseau.")
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div ref={mainRef} className="relative min-h-screen bg-neige text-graphite selection:bg-corail selection:text-white">

      {/* Hidden real audio element for Hymne CCACJ */}
      <audio ref={audioRef} src="/hymne-ccacj.mp3" preload="metadata" />

      {/* =========================================================================
          A. NAVBAR — "La Signature Flottante"
      ========================================================================== */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          ref={navRef}
          className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-6 py-3.5 rounded-full transition-all duration-500 max-w-4xl w-full ${navScrolled
              ? 'bg-[#FAFAFA]/90 backdrop-blur-xl border border-[#23262D]/10 shadow-elevated text-graphite'
              : 'bg-[#23262D]/75 backdrop-blur-md border border-white/15 shadow-subtle text-white'
            }`}
        >
          {/* Brand initiales */}
          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-sm interactive-lift group">
            <span className="w-8 h-8 rounded-full bg-corail flex items-center justify-center text-white text-xs font-mono font-bold shadow-coral-glow group-hover:scale-105 transition-transform">
              JM
            </span>
            <span className="tracking-tight font-sans hidden sm:inline-block">
              Y.J.M. GOMADO
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide uppercase">
            <a href="#a-propos" className="interactive-lift hover:text-corail transition-colors">À propos</a>
            <a href="#experiences" className="interactive-lift hover:text-corail transition-colors">Expériences</a>
            <a href="#competences" className="interactive-lift hover:text-corail transition-colors">Compétences</a>
            <a href="#formation" className="interactive-lift hover:text-corail transition-colors">Formation</a>
            <a href="#contact" className="interactive-lift hover:text-corail transition-colors">Contact</a>
          </div>

          {/* Direct PDF Download button */}
          <a
            href={cvPdfPath}
            download="CV_GOMADO_Yawo_Jean-Mathieu.pdf"
            className="btn-magnetic flex items-center gap-2 px-4 py-2 rounded-full bg-corail text-white text-xs font-semibold shadow-coral-glow hover:bg-corail-hover cursor-pointer"
            title="Télécharger mon CV au format PDF officiel"
          >
            <Download size={14} />
            <span>CV</span>
          </a>
        </nav>
      </header>

      {/* =========================================================================
          B. SECTION HERO — "La Première Impression" (Fond sombre adouci)
      ========================================================================== */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 bg-gradient-to-b from-[#2B2F38] via-[#23262D] to-[#262932] text-white overflow-hidden">

        {/* Soft textured architectural background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity scale-105 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B2F38]/80 via-[#23262D]/90 to-[#262932] pointer-events-none" />

        {/* Soft ambient warm coral light accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[380px] bg-corail/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

          {/* Status pill badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-white/90">
              Gérant de Cabinet &bull; Lomé, Togo
            </span>
          </div>

          {/* Profile Photo Placeholder with accent border */}
          <div className="hero-avatar relative mb-6 group">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-corail p-1 shadow-coral-glow bg-[#282B33] backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#353A45] to-[#202227] flex flex-col items-center justify-center text-white relative overflow-hidden">
                <span className="font-mono text-3xl font-extrabold tracking-wider text-white">
                  JM
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-corail mt-0.5 font-bold">
                  Gomado
                </span>
              </div>
            </div>
            {/* Verified badge */}
            <div className="absolute bottom-1 right-1 bg-corail text-white p-1.5 rounded-full shadow-md border-2 border-[#23262D]">
              <Sparkles size={14} />
            </div>
          </div>

          {/* Full name in bold tight sans */}
          <h1 className="hero-title-name font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4 leading-none">
            YAWO JEAN-MATHIEU <br />
            <span className="text-white/95">GOMADO</span>
          </h1>

          {/* Professional title */}
          <p className="hero-subtitle font-serif italic text-2xl sm:text-3xl md:text-4xl text-corail font-normal max-w-2xl mb-8">
            Comptable, Gérant de Cabinet en Inclusion Financière & Entrepreneur Web
          </p>

          {/* Monospace 3 stats indicator */}
          <div className="hero-stat-item flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm text-white/90 mb-10 py-3.5 px-6 rounded-2rem bg-white/10 border border-white/15 backdrop-blur-md">
            <span className="flex items-center gap-2">
              <Briefcase size={14} className="text-corail" />
              <strong className="text-white font-semibold">3+ Années</strong> d'Expérience & Études
            </span>
            <span className="text-corail/60 hidden sm:inline">|</span>
            <span className="flex items-center gap-2">
              <Building2 size={14} className="text-corail" />
              <strong className="text-white font-semibold">Gérant</strong> de Cabinet
            </span>
            <span className="text-corail/60 hidden sm:inline">|</span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-corail" />
              <strong className="text-white font-semibold">Lomé</strong>, Togo
            </span>
          </div>

          {/* Hero CTAs */}
          <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4">

            {/* Bouton Télécharger le vrai PDF */}
            <a
              href={cvPdfPath}
              download="CV_GOMADO_Yawo_Jean-Mathieu.pdf"
              className="btn-magnetic flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-corail text-white font-semibold text-sm shadow-coral-glow hover:bg-corail-hover cursor-pointer"
            >
              <Download size={18} />
              Télécharger mon CV Officiel
            </a>

            {/* Bouton WhatsApp direct */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-magnetic flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              <MessageCircle size={18} className="text-emerald-400" />
              Échanger sur WhatsApp
            </a>

          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Explorer</span>
          <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-corail rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          C. SECTION À PROPOS — "Le Manifeste Personnel"
      ========================================================================== */}
      <section id="a-propos" className="py-28 px-6 bg-neige relative">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left column: Dramatic serif italic title */}
            <div className="about-reveal lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-xs font-mono uppercase tracking-widest text-corail font-semibold block mb-3">
                01 &bull; Manifeste & Philosophie
              </span>
              <h2 className="font-serif italic text-5xl sm:text-6xl text-[#23262D] leading-tight">
                L'art de structurer la valeur et d'embrasser le digital.
              </h2>

              <div className="mt-8 pt-8 border-t border-graphite/10 flex flex-col gap-4 font-mono text-xs text-graphite/80">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-corail" />
                  <span>Bac Scientifique Série D (Juillet 2019)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-corail" />
                  <span>Licence en Comptabilité Contrôle Audit (2023) — FASEG</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-corail" />
                  <span>Gérant de Cabinet (Juin 2025 - Présent)</span>
                </div>
              </div>
            </div>

            {/* Separator vertical accent line */}
            <div className="hidden lg:block lg:col-span-1 h-full relative">
              <div className="w-[2px] h-full bg-gradient-to-b from-corail via-corail/40 to-transparent mx-auto rounded-full" />
            </div>

            {/* Right column: Detailed presentation */}
            <div className="about-reveal lg:col-span-7 flex flex-col gap-6 text-graphite/90 text-lg sm:text-xl leading-relaxed">
              <p className="font-medium text-[#23262D] text-xl sm:text-2xl leading-relaxed">
                Diplômé en sciences (Bac D) puis titulaire d'une <span className="text-corail font-semibold">Licence en Comptabilité Contrôle Audit</span> à l'Université de Lomé (FASEG), je conçois la gestion financière non pas comme de simples colonnes de chiffres, mais comme le moteur fondamental de l'autonomie et de la prospérité économique.
              </p>

              <p>
                Mon parcours s'est enrichi sur le terrain au sein de structures d'audit et d'enseignement de référence telles que le <strong className="text-[#23262D] font-semibold">Cabinet Afric Audit and Accounting (Cabinet 3A)</strong>, la <strong className="text-[#23262D] font-semibold">Société des Postes du Togo</strong>, ainsi que chez <strong className="text-[#23262D] font-semibold">LE RECORD</strong> en tant que Comptable et Formateur en logiciel comptable. Ces années de pratique m'ont forgé une rigueur absolue dans les clôtures, la fiscalité (TVA, impôts) et la conformité SYSCOHADA.
              </p>

              {/* Paragraphe exact corrigé */}
              <p className="bg-corail/5 border-l-4 border-corail p-5 rounded-r-2xl font-normal text-graphite">
                « Depuis juin 2025, je franchis un cap majeur en tant que Gérant d’un cabinet dédié à l'Inclusion Financière à Lomé. Nous accompagnons les microfinances, PME/PMI, et structures émergentes à accéder aux financements et à fiabiliser leur gouvernance financière. »
              </p>

              <div className="p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle mt-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-corail/10 text-corail shrink-0">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[#23262D] text-lg mb-2">
                      L'Alliance de la Rigueur Comptable et du Digital IA
                    </h3>
                    <p className="text-base text-graphite/80 leading-normal">
                      Formateur reconnu en bureautique, logiciels de comptabilité (Sage 100, SAARI) et en <em>Excel Avancé appliqué à la Gestion</em>, j'évolue également avec passion dans le digital : création de contenus vidéo faceless sur TikTok, production multimédia, composition musicale de A à Z avec l'IA et conception de solutions web.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          D. SECTION EXPÉRIENCE — "La Timeline Vivante"
      ========================================================================== */}
      <section id="experiences" className="py-28 px-6 bg-sand/60 relative">
        <div className="max-w-5xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-corail font-semibold block mb-3">
              02 &bull; Trajectoire & Réalisations
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-[#23262D] mb-4">
              L'expérience de terrain au service de la performance.
            </h2>
            <p className="text-graphite/70 text-base">
              Une progression continue entre gestion financière d'élite, formation pratique et direction de cabinet.
            </p>
          </div>

          {/* Timeline container */}
          <div className="relative">

            {/* Center vertical line on desktop */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-corail/30 rounded-full" />
            <div className="md:hidden absolute left-5 top-4 bottom-4 w-[2px] bg-corail/30 rounded-full" />

            <div className="space-y-12 md:space-y-16">

              {/* Expérience 1: Gérant de Cabinet - Cabinet DS Consulting */}
              <div className="experience-card-item relative flex flex-col md:flex-row items-center">
                <div className="timeline-dot-0 absolute left-5 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-corail shadow-coral-glow z-10" />

                <div className="w-full md:w-[45%] md:pr-10 pl-12 md:pl-0 md:text-right">
                  <div className="card-experience p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:border-corail/40">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-corail/10 text-corail font-mono text-xs font-semibold mb-3">
                      Juin 2025 — Aujourd'hui
                    </span>
                    <h3 className="font-sans font-bold text-2xl text-[#23262D] mb-1">
                      Gérant de Cabinet & Créateur de Contenus
                    </h3>
                    <p className="font-sans font-semibold text-corail text-sm mb-4">
                      Cabinet DS Consulting &bull; Lomé, Togo
                    </p>
                    <p className="text-graphite/80 text-sm leading-relaxed mb-4">
                      Pilotage complet du cycle de vie des missions de conseil, de la planification à la livraison. Mise en place des procédures internes, offres techniques et financières, négociation des contrats clients et tenue de la comptabilité du cabinet.
                    </p>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">Inclusion Financière</span>
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">Conseil PME/PMI</span>
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">Stratégie</span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </div>

              {/* Expérience 2: LE RECORD */}
              <div className="experience-card-item relative flex flex-col md:flex-row items-center">
                <div className="timeline-dot-1 absolute left-5 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-corail shadow-coral-glow z-10" />

                <div className="hidden md:block w-[45%]" />
                <div className="hidden md:block w-[10%]" />

                <div className="w-full md:w-[45%] md:pl-10 pl-12">
                  <div className="card-experience p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:border-corail/40">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-corail/10 text-corail font-mono text-xs font-semibold mb-3">
                      Oct. 2023 — Avr. 2025
                    </span>
                    <h3 className="font-sans font-bold text-2xl text-[#23262D] mb-1">
                      Comptable et Formateur en Logiciel Comptable
                    </h3>
                    <p className="font-sans font-semibold text-corail text-sm mb-4">
                      LE RECORD &bull; Lomé, Togo
                    </p>
                    <p className="text-graphite/80 text-sm leading-relaxed mb-4">
                      Formation des étudiants en bureautique et logiciels comptables. Élaboration des états financiers (Bilan, Compte de résultat, Flux de trésorerie), déclarations fiscales et sociales (TVA, IS), rapprochements bancaires et conformité SYSCOHADA.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">États Financiers</span>
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">SYSCOHADA</span>
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">Logiciels Comptables</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expérience 3: Cabinet 3A (Afric Audit and Accounting) */}
              <div className="experience-card-item relative flex flex-col md:flex-row items-center">
                <div className="timeline-dot-2 absolute left-5 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-corail shadow-coral-glow z-10" />

                <div className="w-full md:w-[45%] md:pr-10 pl-12 md:pl-0 md:text-right">
                  <div className="card-experience p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:border-corail/40">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-corail/10 text-corail font-mono text-xs font-semibold mb-3">
                      Janv. 2021 — Sept. 2023
                    </span>
                    <h3 className="font-sans font-bold text-2xl text-[#23262D] mb-1">
                      Assistant-Comptable (Audit Interne & Projets)
                    </h3>
                    <p className="font-sans font-semibold text-corail text-sm mb-4">
                      AFRIC AUDIT AND ACCOUNTING (Cabinet 3A) &bull; Lomé
                    </p>
                    <p className="text-graphite/80 text-sm leading-relaxed mb-4">
                      Enregistrement comptable sous Sage 100, élaboration des bulletins de paie, conformité LAB/FT (lutte anti-blanchiment), rédaction de rapports d'audit interne et conception des plans de projet avec suivi rigoureux des budgets.
                    </p>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">Sage 100</span>
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">Audit Interne</span>
                      <span className="text-[11px] font-mono bg-neige px-2.5 py-1 rounded-lg text-graphite/70">Gestion de Projet</span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </div>

              {/* Expérience 4: Stage Cabinet 3A & Poste du Togo */}
              <div className="experience-card-item relative flex flex-col md:flex-row items-center">
                <div className="timeline-dot-3 absolute left-5 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-graphite/40 shadow-sm z-10" />

                <div className="hidden md:block w-[45%]" />
                <div className="hidden md:block w-[10%]" />

                <div className="w-full md:w-[45%] md:pl-10 pl-12">
                  <div className="card-experience p-6 rounded-2rem bg-neige border border-dashed border-graphite/20 shadow-sm">
                    <span className="inline-block px-3 py-0.5 rounded-full bg-[#23262D]/5 text-graphite font-mono text-xs font-semibold mb-2">
                      Fév. 2020 — Nov. 2020
                    </span>
                    <h4 className="font-sans font-bold text-lg text-[#23262D] mb-1">
                      Stagiaire-Comptable et Audit Interne
                    </h4>
                    <p className="font-sans text-xs text-graphite/70 mb-2">
                      AFRIC AUDIT AND ACCOUNTING &bull; Lomé, Togo
                    </p>
                    <p className="text-graphite/70 text-xs leading-relaxed">
                      Saisie et imputation des pièces comptables sur Sage 100, déclarations fiscales mensuelles, centralisation de la TVA, rapprochements bancaires et assistance aux missions d'audit.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          E. SECTION COMPÉTENCES — "Le Tableau de Bord"
      ========================================================================== */}
      <section id="competences" className="py-28 px-6 bg-neige relative">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-corail font-semibold block mb-3">
              03 &bull; Arsenal & Expertises
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-[#23262D] mb-4">
              Tableau de bord des maîtrises.
            </h2>
            <p className="text-graphite/70 text-base">
              L'équilibre rare entre rigueur comptable certifiée et utilisation avancée des outils d'intelligence artificielle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Compétence 1 */}
            <div className="p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-corail/10 text-corail group-hover:scale-110 transition-transform">
                    <FileSpreadsheet size={28} />
                  </div>
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                      <circle
                        className="skill-ring-progress text-corail transition-all duration-1000"
                        cx="40" cy="40" r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32}
                        data-percent="96"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="skill-counter-val absolute font-mono font-bold text-sm text-[#23262D]" data-target="96">
                      0%
                    </span>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl text-[#23262D] mb-2">
                  Excel Avancé & Modélisation
                </h3>
                <p className="text-sm text-graphite/70 leading-relaxed mb-4">
                  Tableaux de bord dynamiques, formules matricielles complexes, modélisation de plans de trésorerie et automatisation de gestion financière.
                </p>
              </div>

              <div className="pt-4 border-t border-graphite/5 flex flex-wrap gap-1.5 font-mono text-[11px] text-corail font-medium">
                <span className="bg-corail/5 px-2 py-0.5 rounded">Dashboarding</span>
                <span className="bg-corail/5 px-2 py-0.5 rounded">Excel Gestion</span>
              </div>
            </div>

            {/* Compétence 2 */}
            <div className="p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-corail/10 text-corail group-hover:scale-110 transition-transform">
                    <TrendingUp size={28} />
                  </div>
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                      <circle
                        className="skill-ring-progress text-corail transition-all duration-1000"
                        cx="40" cy="40" r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32}
                        data-percent="92"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="skill-counter-val absolute font-mono font-bold text-sm text-[#23262D]" data-target="92">
                      0%
                    </span>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl text-[#23262D] mb-2">
                  Comptabilité & Inclusion Financière
                </h3>
                <p className="text-sm text-graphite/70 leading-relaxed mb-4">
                  Conformité SYSCOHADA, déclarations fiscales et sociales, centralisation TVA, rapprochements bancaires et structuration des microfinances & PME.
                </p>
              </div>

              <div className="pt-4 border-t border-graphite/5 flex flex-wrap gap-1.5 font-mono text-[11px] text-corail font-medium">
                <span className="bg-corail/5 px-2 py-0.5 rounded">Sage 100 / SAARI</span>
                <span className="bg-corail/5 px-2 py-0.5 rounded">SYSCOHADA</span>
              </div>
            </div>

            {/* Compétence 3 */}
            <div className="p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-corail/10 text-corail group-hover:scale-110 transition-transform">
                    <Video size={28} />
                  </div>
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                      <circle
                        className="skill-ring-progress text-corail transition-all duration-1000"
                        cx="40" cy="40" r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32}
                        data-percent="88"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="skill-counter-val absolute font-mono font-bold text-sm text-[#23262D]" data-target="88">
                      0%
                    </span>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl text-[#23262D] mb-2">
                  Montage & Vidéos IA (TikTok Faceless)
                </h3>
                <p className="text-sm text-graphite/70 leading-relaxed mb-4">
                  Stratégie de contenu sans visage sur TikTok, scripting assisté par IA, voix de synthèse professionnelles, Canva, Photoshop et montage dynamique.
                </p>
              </div>

              <div className="pt-4 border-t border-graphite/5 flex flex-wrap gap-1.5 font-mono text-[11px] text-corail font-medium">
                <span className="bg-corail/5 px-2 py-0.5 rounded">TikTok Faceless</span>
                <span className="bg-corail/5 px-2 py-0.5 rounded">Production IA</span>
              </div>
            </div>

            {/* Compétence 4 */}
            <div className="p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-corail/10 text-corail group-hover:scale-110 transition-transform">
                    <Code size={28} />
                  </div>
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                      <circle
                        className="skill-ring-progress text-corail transition-all duration-1000"
                        cx="40" cy="40" r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32}
                        data-percent="85"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="skill-counter-val absolute font-mono font-bold text-sm text-[#23262D]" data-target="85">
                      0%
                    </span>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl text-[#23262D] mb-2">
                  Conception Web & Outils d'Automatisation IA
                </h3>
                <p className="text-sm text-graphite/70 leading-relaxed mb-4">
                  Développement de sites web modernes assisté par l'IA, conception d'interfaces professionnelles et automatisation de processus métier.
                </p>
              </div>

              <div className="pt-4 border-t border-graphite/5 flex flex-wrap gap-1.5 font-mono text-[11px] text-corail font-medium">
                <span className="bg-corail/5 px-2 py-0.5 rounded">Sites Web IA</span>
                <span className="bg-corail/5 px-2 py-0.5 rounded">Productivité</span>
              </div>
            </div>

            {/* Compétence 5: Avec le vrai MP3 "Hymne CCACJ" */}
            <div className="p-8 rounded-2.5rem bg-white border border-graphite/5 shadow-subtle hover:shadow-elevated transition-all flex flex-col justify-between group md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-corail/10 text-corail group-hover:scale-110 transition-transform">
                    <Music size={28} />
                  </div>
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
                      <circle
                        className="skill-ring-progress text-corail transition-all duration-1000"
                        cx="40" cy="40" r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={2 * Math.PI * 32}
                        data-percent="85"
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="skill-counter-val absolute font-mono font-bold text-sm text-[#23262D]" data-target="85">
                      0%
                    </span>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl text-[#23262D] mb-2">
                  Composition & Arrangement Musical IA
                </h3>
                <p className="text-sm text-graphite/70 leading-relaxed mb-4">
                  Talent vocal, écriture de textes, composition et arrangement complet de morceaux musicaux de A à Z avec le concours des outils d'IA.
                </p>

                {/* Real Audio Player for Hymne CCACJ */}
                <div className="p-4 rounded-2xl bg-[#F4F3EF] border border-graphite/10 mb-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="w-10 h-10 rounded-full bg-corail text-white flex items-center justify-center shrink-0 shadow-coral-glow hover:bg-corail-hover transition-transform active:scale-95 cursor-pointer"
                      title={isPlayingAudio ? "Mettre en pause" : "Écouter Hymne CCACJ"}
                    >
                      {isPlayingAudio ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-sans font-bold text-[#23262D] truncate flex items-center gap-1.5">
                        <Volume2 size={13} className="text-corail shrink-0" />
                        <span>Hymne CCACJ</span>
                      </div>
                      <div className="text-[10px] font-mono text-graphite/70 flex items-center justify-between mt-0.5">
                        <span>{isPlayingAudio ? 'Lecture...' : 'Composition & Voix IA'}</span>
                        <span>{formatTime(audioCurrentTime)} / {formatTime(audioDuration || 190)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Equalizer Waveform Bars animés */}
                  <div className="flex items-center gap-1 h-6 px-1">
                    {[35, 75, 20, 95, 60, 30, 85, 40, 100, 50, 70, 30, 85, 65, 45, 90, 55, 30].map((h, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-full bg-corail transition-all duration-200 ${isPlayingAudio ? 'opacity-90' : 'opacity-30'
                          }`}
                        style={{
                          height: isPlayingAudio ? `${Math.max(18, (h * ((i % 4) + 1)) % 100)}%` : `${h * 0.3}%`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-graphite/5 flex flex-wrap gap-1.5 font-mono text-[11px] text-corail font-medium">
                <span className="bg-corail/5 px-2 py-0.5 rounded">Hymne CCACJ</span>
                <span className="bg-corail/5 px-2 py-0.5 rounded">Arrangement & Chant</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          F. SECTION FORMATION — "Les Fondations" (Fond adouci et textes très lisibles)
      ========================================================================== */}
      <section id="formation" className="py-28 px-6 bg-[#24272F] text-white relative">
        <div className="max-w-4xl mx-auto">

          {/* Bien centré selon la demande explicite */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-corail font-semibold block mb-3 text-center">
              04 &bull; Cursus Académique
            </span>
            <h2 className="font-serif italic text-4xl sm:text-5xl text-white mb-4 text-center">
              Les fondations du savoir.
            </h2>
            <p className="text-white/80 text-sm sm:text-base text-center max-w-xl mx-auto leading-relaxed">
              Une assise scientifique rigoureuse complétée par une spécialisation comptable et une veille technologique continue.
            </p>
          </div>

          <div className="space-y-6">

            {/* Diplôme 1: Licence en Comptabilité Contrôle Audit */}
            <div className="education-card p-8 rounded-2.5rem bg-[#2E323D] border border-white/20 hover:border-corail/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-elevated">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-2xl bg-corail/25 text-corail shrink-0 mt-1 border border-corail/30">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <span className="font-mono text-xs text-corail uppercase tracking-widest font-bold block mb-1">
                    Décembre 2023 &bull; Diplôme Universitaire
                  </span>
                  <h3 className="font-sans font-extrabold text-2xl text-white mb-1.5 tracking-tight">
                    LICENCE en Comptabilité Contrôle Audit
                  </h3>
                  <p className="font-sans text-white/95 text-sm font-semibold">
                    Université de Lomé (FASEG) &bull; Lomé, Togo
                  </p>
                  <p className="text-xs text-white/75 mt-2 max-w-lg leading-relaxed">
                    Comptabilité générale et des sociétés, contrôle de gestion, audit financier, fiscalité et conformité SYSCOHADA.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold">
                  Licence Obtenue
                </span>
              </div>
            </div>

            {/* Diplôme 2: Baccalauréat Scientifique Série D (LISIBILITÉ MAXIMISÉE) */}
            <div className="education-card p-8 rounded-2.5rem bg-[#2E323D] border border-white/20 hover:border-corail/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-elevated">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-2xl bg-corail/25 text-corail shrink-0 mt-1 border border-corail/30">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <span className="font-mono text-xs text-corail uppercase tracking-widest font-bold block mb-1">
                    Juillet 2019 &bull; Enseignement Secondaire
                  </span>
                  <h3 className="font-sans font-extrabold text-2xl text-white mb-1.5 tracking-tight">
                    BACCALAURÉAT Série D (Scientifique)
                  </h3>
                  <p className="font-sans text-white/95 text-sm font-semibold">
                    Lycée Adidogomé 1 &bull; Lomé, Togo
                  </p>
                  <p className="text-xs text-white/75 mt-2 max-w-lg leading-relaxed">
                    Mathématiques, sciences physiques et naturelles : rigueur de la méthode scientifique, analyse quantitative et esprit logique.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white font-mono text-xs font-bold">
                  Baccalauréat Obtenu
                </span>
              </div>
            </div>

            {/* Formation Continue & Spécialisations */}
            <div className="education-card p-8 rounded-2.5rem bg-[#2E323D] border border-white/20 hover:border-corail/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-elevated">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-2xl bg-corail/25 text-corail shrink-0 mt-1 border border-corail/30">
                  <Sparkles size={28} />
                </div>
                <div>
                  <span className="font-mono text-xs text-corail uppercase tracking-widest font-bold block mb-1">
                    Formation Continue &bull; Veille Permanente
                  </span>
                  <h3 className="font-sans font-extrabold text-2xl text-white mb-1.5 tracking-tight">
                    Spécialisations en Logiciels Comptables & Outils IA
                  </h3>
                  <p className="font-sans text-white/95 text-sm font-semibold">
                    Sage 100, SAARI, Excel Avancé de Gestion, Multimédia IA & Web
                  </p>
                  <p className="text-xs text-white/75 mt-2 max-w-lg leading-relaxed">
                    Perfectionnement continu des pratiques comptables d'entreprise, intégration des technologies d'intelligence artificielle et création numérique.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="px-4 py-1.5 rounded-full bg-corail/20 border border-corail/50 text-corail font-mono text-xs font-bold">
                  En Cours Continu
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          G. SECTION CONTACT — "Le Pont"
      ========================================================================== */}
      <section id="contact" className="py-28 px-6 bg-neige relative">
        <div className="max-w-5xl mx-auto">

          <div className="p-10 sm:p-14 lg:p-16 rounded-3rem bg-white border border-graphite/5 shadow-elevated relative overflow-hidden">

            {/* Soft coral background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-corail/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="contact-reveal max-w-2xl mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-corail font-semibold block mb-3">
                05 &bull; Collaborations & Opportunités
              </span>
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#23262D] mb-4">
                Travaillons ensemble.
              </h2>
              <p className="text-graphite/70 text-base sm:text-lg">
                Que ce soit pour une mission de gestion financière, une formation spécialisée ou un projet digital créatif, je suis à votre écoute.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Coordonnées directes */}
              <div className="contact-reveal lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">

                  {/* Email exact corrigé */}
                  <a
                    href={`mailto:${emailAddress}`}
                    className="flex items-center gap-4 p-4 rounded-2rem bg-neige hover:bg-corail/10 transition-colors interactive-lift group"
                  >
                    <div className="w-12 h-12 rounded-full bg-corail/15 text-corail flex items-center justify-center shrink-0 group-hover:bg-corail group-hover:text-white transition-colors">
                      <Mail size={20} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-mono text-graphite/60 block">Email direct</span>
                      <strong className="text-sm font-sans text-[#23262D] font-semibold break-all">
                        {emailAddress}
                      </strong>
                    </div>
                  </a>

                  {/* Bouton WhatsApp direct corrigé */}
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2rem bg-neige hover:bg-emerald-50 transition-colors interactive-lift group border border-emerald-500/20"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-emerald-700 font-semibold block">WhatsApp / Téléphone</span>
                      <strong className="text-sm font-sans text-[#23262D] font-semibold">
                        +228 96 27 38 44
                      </strong>
                      <span className="block text-[11px] font-mono text-emerald-600 mt-0.5">
                        &rarr; Ouvrir la discussion WhatsApp
                      </span>
                    </div>
                  </a>

                  {/* Localisation exacte */}
                  <div className="flex items-center gap-4 p-4 rounded-2rem bg-neige">
                    <div className="w-12 h-12 rounded-full bg-[#23262D]/10 text-[#23262D] flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-graphite/60 block">Adresse & Localisation</span>
                      <strong className="text-sm font-sans text-[#23262D] font-semibold">
                        Adidogomé-Wonyomé &bull; Lomé, Togo
                      </strong>
                      <span className="block text-[11px] font-mono text-graphite/60">
                        Rue face Mairie Golfe 7
                      </span>
                    </div>
                  </div>

                </div>

                {/* Social pills */}
                <div className="pt-4 border-t border-graphite/10">
                  <span className="text-xs font-mono text-graphite/60 block mb-3">Réseaux & Plateformes</span>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="#"
                      className="px-4 py-2 rounded-full bg-neige text-xs font-medium hover:bg-corail hover:text-white transition-colors flex items-center gap-1.5 interactive-lift"
                    >
                      <span>TikTok Faceless</span>
                      <ArrowUpRight size={13} />
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 rounded-full bg-neige text-xs font-medium hover:bg-corail hover:text-white transition-colors flex items-center gap-1.5 interactive-lift"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

              </div>

              {/* Formulaire de prise de contact rapide */}
              <div className="contact-reveal lg:col-span-7">
                <form onSubmit={handleContactSubmit} className="space-y-4 p-6 sm:p-8 rounded-2.5rem bg-sand/50 border border-graphite/5">
                  <h3 className="font-sans font-bold text-lg text-[#23262D] mb-1">
                    Envoyer un message direct
                  </h3>
                  <p className="text-xs text-graphite/70 mb-4">
                    Une réponse vous sera apportée sous 24h ouvrées.
                  </p>

                  <div>
                    <label className="block text-xs font-mono font-medium text-graphite/80 mb-1.5">
                      Votre Nom ou Entreprise
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Entreprise / Responsable RH"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-graphite/10 text-sm focus:outline-none focus:border-corail transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-graphite/80 mb-1.5">
                        Votre Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@domaine.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-graphite/10 text-sm focus:outline-none focus:border-corail transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-medium text-graphite/80 mb-1.5">
                        Objet
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-graphite/10 text-sm focus:outline-none focus:border-corail transition-colors"
                      >
                        <option>Mission de Gestion Financière</option>
                        <option>Formation Excel Avancé / Logiciels</option>
                        <option>Inclusion Financière & Accompagnement PME</option>
                        <option>Projet Multimédia & IA</option>
                        <option>Autre opportunité</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-graphite/80 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Décrivez votre besoin ou votre projet..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-graphite/10 text-sm focus:outline-none focus:border-corail transition-colors resize-none"
                    />
                  </div>

                  {formStatus === 'success' && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium space-y-1">
                      <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        Demande transmise avec succès !
                      </div>
                      <p className="text-emerald-800/90 leading-relaxed">
                        Votre message a été transmis directement à la boîte mail <strong>jeanmathieugomado3@gmail.com</strong>. Yawo Jean-Mathieu vous répondra dans les plus brefs délais.
                      </p>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium space-y-2">
                      <div className="flex items-center gap-2 font-bold text-rose-800">
                        <AlertCircle size={18} className="text-rose-600 shrink-0" />
                        Difficulté de transmission automatique
                      </div>
                      <p>{formErrorMsg}</p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        <a
                          href={`mailto:jeanmathieugomado3@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent("Nom: " + formData.name + "\nEmail: " + formData.email + "\n\nMessage:\n" + formData.message)}`}
                          className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white font-semibold text-[11px] hover:bg-rose-700 transition-colors"
                        >
                          Transmettre via mon client Email
                        </a>
                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700 transition-colors"
                        >
                          Transmettre sur WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="btn-magnetic w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-corail text-white font-semibold text-sm shadow-coral-glow hover:bg-corail-hover cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Transmission en cours à jeanmathieugomado3@gmail.com...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Envoyer ma demande</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          H. PIED DE PAGE — "Minimaliste & Équilibré"
      ========================================================================== */}
      <footer className="bg-[#24272F] text-white pt-16 pb-12 px-6 rounded-t-4rem relative overflow-hidden border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-12">

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-sans font-bold text-xl tracking-tight text-white mb-1">
              YAWO JEAN-MATHIEU GOMADO
            </span>
            <span className="font-serif italic text-corail text-sm">
              Comptable &bull; Gérant de Cabinet &bull; Entrepreneur Web
            </span>
          </div>

          {/* Quick nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#a-propos" className="hover:text-corail transition-colors">À propos</a>
            <a href="#experiences" className="hover:text-corail transition-colors">Expériences</a>
            <a href="#competences" className="hover:text-corail transition-colors">Compétences</a>
            <a href="#formation" className="hover:text-corail transition-colors">Formation</a>
            <a href="#contact" className="hover:text-corail transition-colors">Contact</a>
          </div>

          {/* Online badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Disponible pour missions & consultations</span>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Yawo Jean-Mathieu GOMADO. Tous droits réservés.
          </div>
          <div>
            Fait avec le <span className="text-corail">vibe coding</span> & React 19 + GSAP
          </div>
        </div>
      </footer>

    </div>
  )
}
