/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ProjectData {
  key: 'aura' | 'zenith' | 'nova' | 'solaris' | 'apex' | 'pulse';
  categoryKey: 'branding' | 'print' | 'social' | 'poster';
  stageBadge: string;
  catBadge: string;
  title: string;
  summary: string;
  footerLabel: string;
  client: string;
  deliverables: string;
  overview: string;
  colors: string[];
  fonts: string;
  inquireService: string;
}

const BRAND_TAGLINES = [
  'GIVE YOUR BRAND A VISUAL IDENTITY.',
  'DESIGNING IDEAS. BUILDING IDENTITIES.',
  'YOUR VISION. OUR DESIGN.',
  'CREATIVE DESIGN. STRONGER BRANDS.',
  'WE TURN IDEAS INTO VISUALS.',
  'DESIGN THAT DEFINES YOUR BRAND.',
];

const CINEMA_PAGES = [
  { id: 'page-home', navLabel: 'Home', label: 'HOME', title: 'VISUAL IDENTITY SUITE' },
  { id: 'page-services', navLabel: 'Our Services', label: 'SERVICES', title: '8 CORE DISCIPLINES' },
  { id: 'page-portfolio', navLabel: 'Portfolio', label: 'PORTFOLIO', title: 'CURATED SHOWCASES' },
  { id: 'page-contact', navLabel: 'Contact', label: 'CONTACT', title: 'START A COMMISSION' },
  { id: 'page-about', navLabel: 'About Us', label: 'ABOUT US', title: 'STUDIO PHILOSOPHY' },
];

const SERVICES_LIST = [
  {
    num: '01. BRAND IDENTITY',
    icon: '🎨',
    heading: 'Brand Identity',
    description:
      'Logos, colors, typography, brand guidelines. Build a recognizable and consistent visual identity that defines your brand character.',
    tags: ['Logos', 'Colors', 'Guidelines'],
    cta: 'Inquire Brand Identity →',
    serviceValue: 'Brand Identity',
  },
  {
    num: '02. MARKETING COLLATERAL',
    icon: '📑',
    heading: 'Marketing Collateral',
    description:
      'Brochures, flyers, business cards, company profiles. Professional business collateral designed to leave an unforgettable impression.',
    tags: ['Cards', 'Brochures', 'Profiles'],
    cta: 'Order Collateral →',
    serviceValue: 'Marketing Collateral',
  },
  {
    num: '03. ADVERTISING CREATIVES',
    icon: '📢',
    heading: 'Advertising Creatives',
    description:
      'Ad designs, promotional posters, campaigns, banners. High-converting creative assets crafted to stop the scroll and boost conversions.',
    tags: ['Ad Designs', 'Posters', 'Banners'],
    cta: 'Design Ad Creatives →',
    serviceValue: 'Advertising Creatives',
  },
  {
    num: '04. DIGITAL & SOCIAL',
    icon: '📱',
    heading: 'Digital & Social Media',
    description:
      'Instagram, Facebook, YouTube, website graphics. Engaging posts, reels covers, thumbnails, and carousel templates.',
    tags: ['Instagram Feeds', 'Thumbnails', 'Web Ads'],
    cta: 'Order Social Creatives →',
    serviceValue: 'Digital & Social Media Design',
  },
  {
    num: '05. PRINT & PACKAGING',
    icon: '📦',
    heading: 'Print & Packaging',
    description:
      'Packaging, labels, menus, stationery, print materials. Tangible print-ready packaging with custom dielines and 300 DPI CMYK color.',
    tags: ['Boxes', 'Labels', 'Menus'],
    cta: 'Order Packaging →',
    serviceValue: 'Print & Packaging Design',
  },
  {
    num: '06. UI & UX SOLUTIONS',
    icon: '💻',
    heading: 'UI & UX Design/Dev',
    description:
      'Modern website and mobile app user interfaces, interactive wireframes, seamless user journeys, and clean frontend code development.',
    tags: ['Wireframes', 'Web & Mobile', 'Frontend'],
    cta: 'Start UI/UX Project →',
    serviceValue: 'UI & UX DESIGN AND DEVELOPMENT',
  },
  {
    num: '07. WEBSITE HANDLING',
    icon: '⚙️',
    heading: 'Website Handling',
    description:
      'Comprehensive website maintenance, speed optimization, content updates, security patches, domain management, and dependable hosting.',
    tags: ['Maintenance', 'Updates', 'Hosting'],
    cta: 'Get Website Support →',
    serviceValue: 'WEBSITE HANDLING',
  },
  {
    num: '08. SEARCH OPTIMIZATION',
    icon: '🚀',
    heading: 'SEO',
    description:
      'Search Engine Optimization, on-page visual asset optimization, structured meta tags, speed improvements, and Google rankings.',
    tags: ['On-Page', 'Rankings', 'Speed'],
    cta: 'Boost Search Ranking →',
    serviceValue: 'SEO',
  },
];

const PROJECTS_LIST: ProjectData[] = [
  {
    key: 'aura',
    categoryKey: 'branding',
    stageBadge: 'BRAND IDENTITY',
    catBadge: 'Brand Identity · Luxury Packaging',
    title: 'Aura Botanical Skincare',
    summary:
      'Minimalist organic beauty identity, lavender calm serum bottle packaging mockup, and editorial launch post suite.',
    footerLabel: 'Complete Identity Suite',
    client: 'Aura Organics Studio',
    deliverables:
      'Monogram Logo Mark, Glass Dropper Bottle Dielines, Pastel Color Harmony, Editorial Launch Posts, Brand Book',
    overview:
      'Aura sought a tranquil, minimalist, and ultra-premium visual identity to enter luxury beauty retailers. We established an organic geometric monogram coupled with gentle lavender and violet color harmonies, bottle packaging dielines, and cohesive social launch posts.',
    colors: ['#1B1035', '#7C3AED', '#E9D5FF', '#FFFFFF'],
    fonts: 'Playfair Display & Plus Jakarta Sans',
    inquireService: 'Brand Identity',
  },
  {
    key: 'zenith',
    categoryKey: 'print',
    stageBadge: 'PRINT & STATIONERY',
    catBadge: 'Print Design · Corporate Stationery',
    title: 'Zenith Private Capital',
    summary:
      'Prestige gold-foil embossed business cards, dark purple letterheads, bespoke wax-sealed presentation suites, and corporate collateral.',
    footerLabel: 'Executive Print Collateral',
    client: 'Zenith Wealth Management',
    deliverables:
      'Gold Foil Business Cards, Executive Letterhead Suite, Wax Seal Badges, Presentation Folders, Pitch Deck',
    overview:
      'Crafted for an elite wealth advisory firm demanding supreme authority. We engineered tactile print materials utilizing soft-touch cardstock with metallic gold hot stamping, wax seal insignia, and executive presentation folders.',
    colors: ['#1B1035', '#D4AF37', '#FFFFFF', '#7C3AED'],
    fonts: 'Cinzel & Plus Jakarta Sans',
    inquireService: 'Print & Packaging Design',
  },
  {
    key: 'nova',
    categoryKey: 'social',
    stageBadge: 'SOCIAL MEDIA ADS',
    catBadge: 'Social Media Design · Ad Suite',
    title: 'Nova Stream Music App',
    summary:
      'Multi-slide promotional Instagram carousel post series, high-CTR Meta ad creatives, feature story teasers, and app launch graphics.',
    footerLabel: 'Digital Growth Kit',
    client: 'Nova Audio Labs',
    deliverables:
      'Multi-Slide Instagram Carousel Kit, High-CTR Meta Ad Creatives, Feature Release Stories, App Store Promo Visuals',
    overview:
      'Engineered to drive user installs and maintain feed cohesion. We developed reusable carousel design systems, high-converting Meta feed creatives, and promotional story sequences that boosted organic social engagement by 180%.',
    colors: ['#1B1035', '#A855F7', '#7C3AED', '#38BDF8'],
    fonts: 'Plus Jakarta Sans & Space Grotesk',
    inquireService: 'Digital & Social Media Design',
  },
  {
    key: 'solaris',
    categoryKey: 'print',
    stageBadge: 'PACKAGING & MENU',
    catBadge: 'Print & Packaging Design',
    title: 'Solaris Coffee Artisans',
    summary:
      'Handcrafted artisanal coffee pouch packaging, rustic cafe table menus, stamp marks, and cafe takeaway cup designs.',
    footerLabel: 'Retail Packaging System',
    client: 'Solaris Roastery',
    deliverables:
      'Kraft Coffee Pouches, Matte Dieline Stickers, Cafe Menus, Rubber Stamp Marks, Takeaway Cup Sleeves',
    overview:
      'A specialty micro-roastery needed rustic yet modern packaging that communicates single-origin purity and artisanal dedication on store shelves. We created custom pouch dielines, kraft paper packaging, and cafe table menus.',
    colors: ['#1B1035', '#A855F7', '#F59E0B', '#FAF5FF'],
    fonts: 'Playfair Display & Space Grotesk',
    inquireService: 'Print & Packaging Design',
  },
  {
    key: 'apex',
    categoryKey: 'branding',
    stageBadge: 'BRAND & APPAREL',
    catBadge: 'Brand Identity · Apparel & Marketing',
    title: 'Apex Athletics & Performance',
    summary:
      'Dynamic geometric falcon mark, performance hoodie silk-screen graphics, social media launch post campaigns, and brand guidelines.',
    footerLabel: 'Athletic Brand Guide',
    client: 'Apex Fitness Brand',
    deliverables:
      'Dynamic Falcon Icon, Apparel Silk-Screen Graphics, Social Media Campaign Posts, Brand Standards Manual',
    overview:
      'A bold, angular athletic brand identity symbolizing unyielding speed, endurance, and upward momentum for active lifestyle enthusiasts. Designed complete apparel graphics, vehicle wraps, and high-energy social campaign posts.',
    colors: ['#1B1035', '#7C3AED', '#C084FC', '#FFFFFF'],
    fonts: 'Space Grotesk & Plus Jakarta Sans',
    inquireService: 'Brand Identity',
  },
  {
    key: 'pulse',
    categoryKey: 'poster',
    stageBadge: 'POSTER & PROMO',
    catBadge: 'Poster & Promotional Design',
    title: 'Kinetic Pulse Sound Fest',
    summary:
      'High-octane electronic music festival key visual, typography posters, stage screen graphics, and multi-channel promo posts.',
    footerLabel: 'Festival Campaign',
    client: 'Pulse Entertainment Group',
    deliverables:
      'Event Key Visuals, Billboard Flex, Instagram Motion Covers, Festival Passes, Stage Lighting Backdrops',
    overview:
      'A high-octane electronic music festival required an unmistakable typographic aesthetic that pulsed with energy under stage lighting. We engineered key festival visuals, billboard flex designs, and animated Instagram motion covers.',
    colors: ['#1B1035', '#7C3AED', '#A855F7', '#22C55E'],
    fonts: 'Cinzel & Space Grotesk',
    inquireService: 'Advertising Creatives',
  },
];

function ProjectMockup({ projectKey, isModal = false }: { projectKey: ProjectData['key']; isModal?: boolean }) {
  switch (projectKey) {
    case 'aura':
      return (
        <div className="stage-mockup mockup-aura">
          <div className="aura-bg-orb" />
          <div className="aura-bottle-wrap">
            <div className="aura-dropper-bulb" />
            <div className="aura-dropper-collar" />
            <div className="aura-bottle-body">
              <div className="aura-bottle-label">
                <span className="aura-label-monogram">✦</span>
                <span className="aura-label-brand">AURA</span>
                <span className="aura-label-sub">BOTANICALS</span>
              </div>
            </div>
          </div>
          <div className="aura-swatches">
            <div className="swatch-chip">
              <span className="swatch-color" style={{ background: '#1B1035' }} />
              <span>PANTONE 268 C</span>
            </div>
            <div className="swatch-chip">
              <span className="swatch-color" style={{ background: '#7C3AED' }} />
              <span>VIOLET VIBE</span>
            </div>
            {isModal && (
              <div className="swatch-chip">
                <span className="swatch-color" style={{ background: '#E9D5FF' }} />
                <span>LAVENDER MIST</span>
              </div>
            )}
          </div>
          <div
            className="mockup-corner-tag"
            style={{
              background: 'rgba(255,255,255,0.85)',
              color: '#1B1035',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
          >
            {isModal ? 'STUDIO IDENTITY SUITE' : 'STUDIO IDENTITY'}
          </div>
        </div>
      );
    case 'zenith':
      return (
        <div className="stage-mockup mockup-zenith">
          <div className="zenith-bg-pattern" />
          <div className="zenith-card">
            <div className="zenith-card-sheen" />
            <div className="zenith-crest-wrap">
              <svg viewBox="0 0 60 60" fill="none" style={{ width: '100%', height: '100%' }}>
                <circle cx="30" cy="30" r="28" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="2 2" />
                <path
                  d="M22 20H38L22 40H38"
                  stroke="#D4AF37"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="zenith-title">ZENITH PRIVATE CAPITAL</div>
            <div className="zenith-subtitle">WEALTH MANAGEMENT &amp; ADVISORY</div>
            <div className="zenith-cities">GENEVA · LONDON · ZÜRICH</div>
          </div>
          <div
            className="mockup-corner-tag"
            style={{
              background: 'rgba(27,16,53,0.85)',
              color: '#D4AF37',
              border: '1px solid rgba(212,175,55,0.4)',
            }}
          >
            HOT FOIL STAMP · 600 GSM
          </div>
        </div>
      );
    case 'nova':
      return (
        <div className="stage-mockup mockup-nova">
          <div className="nova-ambient-glow" />
          <div className="nova-player-card">
            <div className="nova-player-header">
              <span className="nova-live-dot" />
              <span className="nova-live-text">SPATIAL AUDIO NOW PLAYING</span>
              <span className="nova-hq-pill">96kHz HQ</span>
            </div>
            <div className="nova-player-body">
              <div className="nova-vinyl-disc">
                <div className="nova-vinyl-core" />
              </div>
              <div>
                <div className="nova-track-title">Midnight Echoes</div>
                <div className="nova-track-artist">
                  {isModal ? 'Nova Audio Labs · Electronic' : 'Nova Audio Labs'}
                </div>
                <div className="nova-eq-visualizer">
                  <span className="eq-bar bar-1" />
                  <span className="eq-bar bar-2" />
                  <span className="eq-bar bar-3" />
                  <span className="eq-bar bar-4" />
                  <span className="eq-bar bar-5" />
                  <span className="eq-bar bar-6" />
                  <span className="eq-bar bar-7" />
                  <span className="eq-bar bar-8" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="mockup-corner-tag"
            style={{
              background: 'rgba(27,16,53,0.85)',
              color: '#38BDF8',
              border: '1px solid rgba(56,189,248,0.4)',
            }}
          >
            {isModal ? 'LIVE AUDIO MOTION · ADS' : 'LIVE AUDIO MOTION'}
          </div>
        </div>
      );
    case 'solaris':
      return (
        <div className="stage-mockup mockup-solaris">
          <div className="solaris-bg-kraft" />
          <div className="solaris-pouch">
            <div className="solaris-pouch-top" />
            <div className="solaris-pouch-label">
              <div className="solaris-sun-mark">
                <svg viewBox="0 0 44 44" fill="none" style={{ width: '100%', height: '100%' }}>
                  <circle
                    cx="22"
                    cy="22"
                    r="10"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    fill="rgba(245, 158, 11, 0.1)"
                  />
                  <path
                    d="M22 2V8M22 36V42M2 22H8M36 22H42"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="solaris-brand-title">SOLARIS</div>
              <div className="solaris-brand-sub">COFFEE ARTISANS</div>
              <div className="solaris-origin">ETHIOPIA YIRGACHEFFE</div>
            </div>
          </div>
          <div
            className="mockup-corner-tag"
            style={{
              background: 'rgba(255,255,255,0.85)',
              color: '#F59E0B',
              border: '1px solid rgba(245,158,11,0.3)',
            }}
          >
            ARTISANAL POUCH
          </div>
        </div>
      );
    case 'apex':
      return (
        <div className="stage-mockup mockup-apex">
          <div className="apex-carbon-grid" />
          <div className="apex-emblem-wrap">
            <svg className="apex-falcon-svg" viewBox="0 0 80 80" fill="none">
              <polygon
                points="40,8 68,26 58,68 40,78 22,68 12,26"
                stroke="#7C3AED"
                strokeWidth="2"
                fill="rgba(124, 58, 237, 0.15)"
              />
              <path d="M40 18L56 34L40 60L24 34Z" fill="#A855F7" stroke="#C084FC" strokeWidth="1.8" />
            </svg>
            <div className="apex-brand-name">APEX ATHLETICS</div>
            <div className="apex-tagline">AERODYNAMIC PERFORMANCE APPAREL</div>
          </div>
          <div
            className="mockup-corner-tag"
            style={{
              background: 'rgba(27,16,53,0.85)',
              color: '#C084FC',
              border: '1px solid rgba(192,132,252,0.4)',
            }}
          >
            {isModal ? 'TECHNICAL APPAREL SUITE' : 'TECHNICAL APPAREL'}
          </div>
        </div>
      );
    case 'pulse':
      return (
        <div className="stage-mockup mockup-pulse">
          <div className="pulse-laser-beams" />
          <div className="pulse-poster-content">
            <div className="pulse-top-meta">
              <span>TOKYO · BERLIN · LONDON</span>
              <span className="pulse-bpm-pill">140–175 BPM</span>
            </div>
            <div className="pulse-fest-title">KINETIC PULSE</div>
            <div className="pulse-fest-sub">SOUND &amp; LIGHT FESTIVAL · 2026</div>
            <div className="pulse-waveform-container">
              <svg className="pulse-wave-svg" viewBox="0 0 300 60" preserveAspectRatio="none">
                <path
                  className="pulse-wave-path wave-back"
                  d="M0,30 Q35,5 70,30 T140,30 T210,30 T280,30 T350,30"
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.45)"
                  strokeWidth="2"
                />
                <path
                  className="pulse-wave-path wave-front"
                  d="M0,30 Q35,55 70,30 T140,30 T210,30 T280,30 T350,30"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="pulse-bottom-lineup">
              <span>48 HEADLINERS · 3 STAGES · 72H AUDIO</span>
            </div>
          </div>
          <div
            className="mockup-corner-tag"
            style={{
              background: 'rgba(8,3,20,0.85)',
              color: '#22C55E',
              border: '1px solid rgba(34,197,94,0.4)',
            }}
          >
            SWISS GRID POSTER
          </div>
        </div>
      );
  }
}

export default function App() {
  // Navigation & Cinema Page State
  const [currentCinemaIndex, setCurrentCinemaIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<{ index: number; dir: 'left' | 'right' } | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Rotating Tagline State
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(true);

  // Animated Stat Counter
  const [identitiesCount, setIdentitiesCount] = useState(150);

  // Portfolio Filter & Lightbox Modal State
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'branding' | 'social' | 'poster' | 'print'>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectData | null>(null);

  // Contact & Estimator Form State
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientWebsite, setClientWebsite] = useState('');
  const [serviceSelect, setServiceSelect] = useState('Brand Identity');
  const [clientTimeline, setClientTimeline] = useState('Standard (1–2 Weeks)');
  const [scopeBrand, setScopeBrand] = useState(true);
  const [scopeCollateral, setScopeCollateral] = useState(true);
  const [scopeAds, setScopeAds] = useState(false);
  const [scopeSocial, setScopeSocial] = useState(false);
  const [clientBudget, setClientBudget] = useState('₹15,000 – ₹35,000');
  const [clientSlot, setClientSlot] = useState('Anytime today');
  const [projectBrief, setProjectBrief] = useState('');
  const [submittedEnquiryUrl, setSubmittedEnquiryUrl] = useState<string | null>(null);
  const [submittedEnquiryText, setSubmittedEnquiryText] = useState<string>('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  // Logo Image Fallback
  const [logoError, setLogoError] = useState(false);

  // Page Refs for Scroll Boundary Detection
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const wheelCooldownRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Draggable WhatsApp Widget State
  const waBtnRef = useRef<HTMLAnchorElement | null>(null);
  const [waPos, setWaPos] = useState<{ left: number; top: number } | null>(null);
  const [isDraggingWa, setIsDraggingWa] = useState(false);
  const dragInfoRef = useRef({
    active: false,
    hasMoved: false,
    startX: 0,
    startY: 0,
    initLeft: 0,
    initTop: 0,
  });

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  }, []);

  // Rotate Hero Tagline
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTaglineVisible(false);
      window.setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % BRAND_TAGLINES.length);
        setTaglineVisible(true);
      }, 250);
    }, 3800);
    return () => window.clearInterval(interval);
  }, []);

  // Animate Home Stat Counter when entering Home page
  const triggerCounterAnimation = useCallback(() => {
    const duration = 1100;
    const target = 150;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setIdentitiesCount(Math.floor(ease * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIdentitiesCount(target);
      }
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    triggerCounterAnimation();
  }, [triggerCounterAnimation]);

  // Navigate between Cinema Pages
  const goToCinemaPage = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= CINEMA_PAGES.length) return;
      if (targetIndex === currentCinemaIndex) return;
      if (isTransitioning) return;

      setIsTransitioning(true);
      const isNext = targetIndex > currentCinemaIndex;
      setExitDirection({ index: currentCinemaIndex, dir: isNext ? 'left' : 'right' });

      const targetEl = pageRefs.current[targetIndex];
      if (targetEl) {
        targetEl.scrollTop = 0;
      }

      setCurrentCinemaIndex(targetIndex);
      setMobileMenuOpen(false);

      if (targetIndex === 0) {
        triggerCounterAnimation();
      }

      window.setTimeout(() => {
        setExitDirection(null);
        setIsTransitioning(false);
      }, 480);
    },
    [currentCinemaIndex, isTransitioning, triggerCounterAnimation]
  );

  const prevCinemaPage = useCallback(() => {
    if (currentCinemaIndex > 0) {
      goToCinemaPage(currentCinemaIndex - 1);
    }
  }, [currentCinemaIndex, goToCinemaPage]);

  const nextCinemaPage = useCallback(() => {
    if (currentCinemaIndex < CINEMA_PAGES.length - 1) {
      goToCinemaPage(currentCinemaIndex + 1);
    }
  }, [currentCinemaIndex, goToCinemaPage]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeProjectModal && e.key === 'Escape') {
        setActiveProjectModal(null);
        return;
      }
      const activeTag = document.activeElement?.tagName;
      if (activeTag && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;
      if (activeProjectModal) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        nextCinemaPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevCinemaPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectModal, nextCinemaPage, prevCinemaPage]);

  // Wheel Navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, select')) return;
      if (activeProjectModal) return;
      if (isTransitioning || wheelCooldownRef.current) return;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (Math.max(absX, absY) < 18) return;

      const activePage = pageRefs.current[currentCinemaIndex];

      if (absX > absY) {
        wheelCooldownRef.current = true;
        window.setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 480);
        if (e.deltaX > 0) nextCinemaPage();
        else prevCinemaPage();
        return;
      }

      if (activePage) {
        const hasOverflow = activePage.scrollHeight - activePage.clientHeight > 60;
        if (hasOverflow) {
          const atTop = activePage.scrollTop <= 20;
          const atBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 20;
          if (e.deltaY > 0 && !atBottom) return;
          if (e.deltaY < 0 && !atTop) return;
        }
      }

      wheelCooldownRef.current = true;
      window.setTimeout(() => {
        wheelCooldownRef.current = false;
      }, 480);
      if (e.deltaY > 0) nextCinemaPage();
      else prevCinemaPage();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeProjectModal, currentCinemaIndex, isTransitioning, nextCinemaPage, prevCinemaPage]);

  // Touch Swipe Navigation
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('#floatingWhatsApp, input, textarea, select')) return;
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('#floatingWhatsApp, input, textarea, select')) return;
      if (activeProjectModal || isTransitioning) return;

      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      if (Math.max(absDx, absDy) < 45) return;

      const activePage = pageRefs.current[currentCinemaIndex];
      if (absDx >= absDy) {
        if (dx < 0) nextCinemaPage();
        else prevCinemaPage();
      } else {
        if (activePage) {
          const hasOverflow = activePage.scrollHeight - activePage.clientHeight > 60;
          if (hasOverflow) {
            const atTop = activePage.scrollTop <= 20;
            const atBottom = activePage.scrollTop + activePage.clientHeight >= activePage.scrollHeight - 20;
            if (dy < 0 && !atBottom) return;
            if (dy > 0 && !atTop) return;
          }
        }
        if (dy < 0) nextCinemaPage();
        else prevCinemaPage();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeProjectModal, currentCinemaIndex, isTransitioning, nextCinemaPage, prevCinemaPage]);

  // Draggable WhatsApp Button Pointer Handlers
  const handleWaPointerDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.button !== 0) return;
    const btn = waBtnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    dragInfoRef.current = {
      active: true,
      hasMoved: false,
      startX: e.clientX,
      startY: e.clientY,
      initLeft: rect.left,
      initTop: rect.top,
    };
    setWaPos({ left: rect.left, top: rect.top });
    setIsDraggingWa(true);
    try {
      btn.setPointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture errors
    }
  };

  const handleWaPointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!dragInfoRef.current.active) return;
    const dx = e.clientX - dragInfoRef.current.startX;
    const dy = e.clientY - dragInfoRef.current.startY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragInfoRef.current.hasMoved = true;
    }

    if (dragInfoRef.current.hasMoved) {
      const btn = waBtnRef.current;
      const btnW = btn?.offsetWidth || 56;
      const btnH = btn?.offsetHeight || 56;
      const maxLeft = window.innerWidth - btnW - 8;
      const maxTop = window.innerHeight - btnH - 8;

      const newLeft = Math.max(8, Math.min(dragInfoRef.current.initLeft + dx, maxLeft));
      const newTop = Math.max(8, Math.min(dragInfoRef.current.initTop + dy, maxTop));
      setWaPos({ left: newLeft, top: newTop });
    }
  };

  const handleWaPointerUp = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!dragInfoRef.current.active) return;
    dragInfoRef.current.active = false;
    setIsDraggingWa(false);
    try {
      waBtnRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore release errors
    }
  };

  const handleWaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragInfoRef.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      dragInfoRef.current.hasMoved = false;
    }
  };

  // Preselect Service and Jump to Contact Page
  const preselectServiceAndGo = (serviceName: string) => {
    setServiceSelect(serviceName);
    goToCinemaPage(3);
  };

  // Scope Badge Computation
  const checkedScopeCount = [scopeBrand, scopeCollateral, scopeAds, scopeSocial].filter(Boolean).length;
  const scopeBadgeInfo =
    checkedScopeCount <= 1
      ? { text: 'Essential Scope (1–3 Days)', bg: '#7C3AED' }
      : checkedScopeCount <= 3
      ? { text: 'Standard Scope (3–5 Days)', bg: '#A855F7' }
      : { text: 'Master Suite (5–8 Days)', bg: '#1B1035' };

  // Build Formatted WhatsApp Enquiry Text & URL
  const buildWhatsAppEnquiry = () => {
    const checkedScopes: string[] = [];
    if (scopeBrand) checkedScopes.push('Brand Identity');
    if (scopeCollateral) checkedScopes.push('Marketing Collateral');
    if (scopeAds) checkedScopes.push('Advertising Creatives');
    if (scopeSocial) checkedScopes.push('Digital & Social Media');

    const services = checkedScopes.length > 0 ? checkedScopes.join(', ') : serviceSelect;

    const text = `🔔 *New Mobile Enquiry – ${clientName.trim() || 'SLR GRAPHICS'}*
━━━━━━━━━━━━━━━━━━
👤 *Name:* ${clientName.trim()}
🏢 *Company:* ${clientCompany.trim()}
📧 *Email:* ${clientEmail.trim()}
🌐 *Website:* ${clientWebsite.trim()}
━━━━━━━━━━━━━━━━━━
🎨 *Services:* ${services}
⏱ *Timeline:* ${clientTimeline}
💰 *Budget:* ${clientBudget}
━━━━━━━━━━━━━━━━━━
📝 *Brief:*
${projectBrief.trim()}

━━━━━━━━━━━━━━━━━━
📅 *Preferred Slot:* ${clientSlot.trim() || 'Anytime today'}`;

    const url = `https://wa.me/917004953962?text=${encodeURIComponent(text)}`;
    return { text, url };
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { text, url } = buildWhatsAppEnquiry();
    setSubmittedEnquiryText(text);
    setSubmittedEnquiryUrl(url);
    showToast('Enquiry formatted! Click Open WhatsApp Now below.');
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        showToast(`${label} copied: ${value}`);
      })
      .catch(() => {
        showToast(`${label}: ${value}`);
      });
  };

  const filteredProjects = PROJECTS_LIST.filter(
    (p) => portfolioFilter === 'all' || p.categoryKey === portfolioFilter
  );

  const progressPct = `${((currentCinemaIndex + 1) / CINEMA_PAGES.length) * 100}%`;

  return (
    <>
      {/* Clean Ambient Background Mesh & Grid */}
      <div className="ambient-bg" />
      <div className="grid-lines" />

      {/* Top Real-time Progress Bar */}
      <div className="cinema-top-progress" style={{ width: progressPct }} />

      {/* Toast Notification */}
      <div id="toast-notification" className={toastMessage ? 'show' : ''}>
        {toastMessage || 'Email copied to clipboard!'}
      </div>

      {/* Main Non-Scrolling Cinema Application Container */}
      <div className="cinema-app-container">
        {/* 1. Header (3-Zone Top Bar Contract: Brand Logo, 5 Nav Links, 1 Primary Action) */}
        <header className="cinema-header">
          <div className="cinema-header-inner">
            {/* Zone 1: Brand Wordmark / Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                goToCinemaPage(0);
              }}
              className="brand-logo-link"
              aria-label="SLR GRAPHICS Home"
            >
              {!logoError ? (
                <img
                  src="/assets/logo-purple.png"
                  alt="SLR GRAPHICS"
                  className="header-logo-image"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-cinzel), serif',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                  }}
                >
                  SLR GRAPHICS
                </span>
              )}
            </a>

            {/* Zone 2: Desktop Navigation Tabs */}
            <nav aria-label="Main Navigation">
              <ul className="cinema-nav-menu">
                {CINEMA_PAGES.map((page, idx) => (
                  <li key={page.id}>
                    <button
                      type="button"
                      onClick={() => goToCinemaPage(idx)}
                      className={`cinema-nav-link ${currentCinemaIndex === idx ? 'active' : ''}`}
                    >
                      {page.navLabel}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Zone 3: Primary Action + Mobile Menu Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => goToCinemaPage(3)}
                className="btn btn-primary desktop-cta-btn"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem' }}
              >
                Start a Project
              </button>

              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Dropdown Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {CINEMA_PAGES.map((page, idx) => (
              <li key={page.id}>
                <button type="button" onClick={() => goToCinemaPage(idx)}>
                  {page.navLabel}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Cinema Viewport Stage (5 Full-Screen Views) */}
        <main className="cinema-stage" id="cinemaStage">
          {/* ======================================================================
               PAGE 01: HOME
               ====================================================================== */}
          <section
            ref={(el) => {
              pageRefs.current[0] = el;
            }}
            className={`cinema-page ${currentCinemaIndex === 0 ? 'active' : ''} ${
              exitDirection?.index === 0
                ? exitDirection.dir === 'left'
                  ? 'slide-left-exit'
                  : 'slide-right-exit'
                : ''
            }`}
            id="page-home"
          >
            <div className="slr-container" style={{ textAlign: 'center' }}>
              {/* Live Tagline Rotator */}
              <div className="hero-tagline-rotator stagger-el">
                <span className="tagline-dot" />
                <span
                  style={{
                    opacity: taglineVisible ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                  }}
                >
                  {BRAND_TAGLINES[taglineIndex]}
                </span>
              </div>

              <h1 className="hero-h1 stagger-el">
                <span className="gradient-text">DESIGN THAT MAKES YOUR BRAND STAND OUT.</span>
              </h1>

              <p className="hero-statement stagger-el">
                We create modern, purposeful, and impactful visuals that turn ideas into memorable brand experiences.
              </p>

              <p className="hero-subtext stagger-el">
                <strong>SLR GRAPHICS</strong> is a creative graphic design studio focused on building strong,
                professional, and memorable visual identities. We create designs that help businesses, brands,
                creators, and individuals communicate their ideas with clarity and style.
              </p>

              {/* Primary CTA */}
              <div className="hero-cta-group stagger-el">
                <button type="button" onClick={() => goToCinemaPage(3)} className="btn btn-primary">
                  <span>START A PROJECT</span>
                  <span>→</span>
                </button>
              </div>

              {/* Scrolling Brand Marquee Ticker */}
              <div className="hero-marquee-wrap stagger-el">
                <div className="hero-marquee-track">
                  {[
                    'Brand Identity',
                    'Marketing Collateral',
                    'Social Media Design',
                    'Print & Packaging',
                    'Advertising Creatives',
                    'UI / UX Design',
                    'Website Handling',
                    'SEO Optimization',
                    'Brand Identity',
                    'Marketing Collateral',
                    'Social Media Design',
                    'Print & Packaging',
                    'Advertising Creatives',
                    'UI / UX Design',
                    'Website Handling',
                    'SEO Optimization',
                  ].map((item, idx) => (
                    <span key={idx} className="hero-marquee-item">
                      {item}
                      <span className="marquee-dot" />
                    </span>
                  ))}
                </div>
              </div>

              {/* Editorial Feature Cards */}
              <div className="hero-feature-cards stagger-el">
                <div className="hero-feat-card">
                  <div className="feat-card-eyebrow">
                    Studio Record
                    <span className="feat-card-eyebrow-line" />
                  </div>
                  <div className="feat-card-big-number">{identitiesCount}+</div>
                  <div className="feat-card-label">Projects Delivered</div>
                  <div className="feat-card-desc">
                    Visual identities, campaigns &amp; collateral crafted for brands globally.
                  </div>
                  <div className="feat-card-badge">✦ Est. 2020</div>
                </div>

                <div className="hero-feat-card">
                  <div className="feat-card-eyebrow">
                    Speed Guarantee
                    <span className="feat-card-eyebrow-line" />
                  </div>
                  <div className="feat-card-big-number">48h</div>
                  <div className="feat-card-label">First Concepts Ready</div>
                  <div className="feat-card-desc">
                    Fast, focused delivery — your first design concepts in under 48 hours.
                  </div>
                  <div className="feat-card-badge">⚡ 100% Custom</div>
                </div>

                <div className="hero-feat-card">
                  <div className="feat-card-eyebrow">
                    Client Rating
                    <span className="feat-card-eyebrow-line" />
                  </div>
                  <div className="feat-card-big-number">5.0</div>
                  <div className="feat-card-label">Top Rated Studio</div>
                  <div className="feat-card-desc">
                    Consistently rated 5 stars for quality, clarity &amp; communication.
                  </div>
                  <div className="feat-card-badge">★ Zero Templates</div>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================================
               PAGE 02: OUR SERVICES (8 CORE DISCIPLINES)
               ====================================================================== */}
          <section
            ref={(el) => {
              pageRefs.current[1] = el;
            }}
            className={`cinema-page ${currentCinemaIndex === 1 ? 'active' : ''} ${
              exitDirection?.index === 1
                ? exitDirection.dir === 'left'
                  ? 'slide-left-exit'
                  : 'slide-right-exit'
                : ''
            }`}
            id="page-services"
          >
            <div className="slr-container">
              <div className="page-header stagger-el">
                <div className="section-eyebrow">DISCIPLINES &amp; SOLUTIONS</div>
                <h2 className="section-title">WHAT WE DO</h2>
                <p className="section-desc">
                  Complete creative design and digital development solutions crafted to establish, elevate, and scale
                  your brand across every touchpoint.
                </p>
              </div>

              <div className="services-grid-8 stagger-el">
                {SERVICES_LIST.map((srv) => (
                  <div key={srv.heading} className="service-card-8">
                    <div>
                      <div className="service-num">{srv.num}</div>
                      <div className="service-icon-box" aria-hidden="true">
                        {srv.icon}
                      </div>
                      <h3 className="service-heading">{srv.heading}</h3>
                      <p className="service-description">{srv.description}</p>
                    </div>
                    <div>
                      <div className="service-tags">
                        {srv.tags.map((tag, idx) => (
                          <React.Fragment key={tag}>
                            <span>{tag}</span>
                            {idx < srv.tags.length - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => preselectServiceAndGo(srv.serviceValue)}
                        className="service-action-link"
                      >
                        {srv.cta}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ======================================================================
               PAGE 03: PORTFOLIO (6 PROJECTS)
               ====================================================================== */}
          <section
            ref={(el) => {
              pageRefs.current[2] = el;
            }}
            className={`cinema-page ${currentCinemaIndex === 2 ? 'active' : ''} ${
              exitDirection?.index === 2
                ? exitDirection.dir === 'left'
                  ? 'slide-left-exit'
                  : 'slide-right-exit'
                : ''
            }`}
            id="page-portfolio"
          >
            <div className="slr-container">
              <div className="page-header stagger-el">
                <div className="section-eyebrow">SELECTED WORKS</div>
                <h2 className="section-title">DESIGN THAT SPEAKS FOR ITSELF.</h2>
                <p className="section-desc">
                  Explore our 6 selected studio projects across branding, social media, packaging, apparel, and
                  promotional design.
                </p>
              </div>

              {/* Category filter tabs */}
              <div className="portfolio-tabs stagger-el">
                {[
                  { key: 'all', label: 'All Work' },
                  { key: 'branding', label: 'Brand Identity' },
                  { key: 'social', label: 'Social Media' },
                  { key: 'poster', label: 'Posters & Ads' },
                  { key: 'print', label: 'Print Design' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    className={`tab-pill ${portfolioFilter === tab.key ? 'active' : ''}`}
                    onClick={() => setPortfolioFilter(tab.key as typeof portfolioFilter)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Portfolio 6 Projects Grid */}
              <div className="portfolio-grid stagger-el">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.key}
                    className="portfolio-card"
                    onClick={() => setActiveProjectModal(proj)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveProjectModal(proj);
                      }
                    }}
                  >
                    <div className="project-stage">
                      <span className="stage-badge">{proj.stageBadge}</span>
                      <ProjectMockup projectKey={proj.key} />
                    </div>
                    <div className="project-details">
                      <div>
                        <div className="project-cat-badge">{proj.catBadge}</div>
                        <h3 className="project-name">{proj.title}</h3>
                        <p className="project-summary">{proj.summary}</p>
                      </div>
                      <div className="project-foot">
                        <span>{proj.footerLabel}</span>
                        <span className="view-case-link">View Case Study →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ======================================================================
               PAGE 04: CONTACT & ESTIMATOR
               ====================================================================== */}
          <section
            ref={(el) => {
              pageRefs.current[3] = el;
            }}
            className={`cinema-page ${currentCinemaIndex === 3 ? 'active' : ''} ${
              exitDirection?.index === 3
                ? exitDirection.dir === 'left'
                  ? 'slide-left-exit'
                  : 'slide-right-exit'
                : ''
            }`}
            id="page-contact"
          >
            <div className="slr-container">
              <div className="page-header stagger-el">
                <div className="section-eyebrow">GET IN TOUCH</div>
                <h2 className="section-title">HAVE A PROJECT IN MIND?</h2>
                <p className="section-desc">
                  Let&apos;s discuss your idea and create visuals that represent your brand professionally. Reach out
                  directly or send an instant project enquiry.
                </p>
              </div>

              <div className="contact-container-grid stagger-el">
                {/* TOP: Project Enquiry Form (Start a Project) */}
                <div className="contact-form-card">
                  <div className="form-header-title">START A PROJECT</div>
                  <div className="form-header-sub">
                    Fill out your details below to generate your formatted WhatsApp enquiry.
                  </div>

                  <form onSubmit={handleInquirySubmit}>
                    <div className="form-group-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="clientName">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="clientName"
                          placeholder="e.g. Rahul Sharma"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="clientCompany">
                          Company / Brand Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="clientCompany"
                          placeholder="e.g. Apex Brands"
                          value={clientCompany}
                          onChange={(e) => setClientCompany(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="clientEmail">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="clientEmail"
                          placeholder="e.g. contact@yourbrand.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="clientWebsite">
                          Website / Social URL
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="clientWebsite"
                          placeholder="e.g. https://yourbrand.com"
                          value={clientWebsite}
                          onChange={(e) => setClientWebsite(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="serviceSelect">
                          Service Needed *
                        </label>
                        <select
                          className="form-control"
                          id="serviceSelect"
                          value={serviceSelect}
                          onChange={(e) => setServiceSelect(e.target.value)}
                          required
                        >
                          <option value="Brand Identity">Brand Identity</option>
                          <option value="Marketing Collateral">Marketing Collateral</option>
                          <option value="Advertising Creatives">Advertising Creatives</option>
                          <option value="Digital & Social Media Design">Digital &amp; Social Media Design</option>
                          <option value="Print & Packaging Design">Print &amp; Packaging Design</option>
                          <option value="UI & UX DESIGN AND DEVELOPMENT">UI &amp; UX Design/Dev</option>
                          <option value="WEBSITE HANDLING">Website Handling</option>
                          <option value="SEO">SEO Optimization</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="clientTimeline">
                          Timeline
                        </label>
                        <select
                          className="form-control"
                          id="clientTimeline"
                          value={clientTimeline}
                          onChange={(e) => setClientTimeline(e.target.value)}
                        >
                          <option value="Urgent (1–3 Days)">Urgent (1–3 Days)</option>
                          <option value="Standard (1–2 Weeks)">Standard (1–2 Weeks)</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    {/* Scope Box */}
                    <div className="estimator-box">
                      <div className="estimator-title">
                        <span>✦ SELECT SCOPE</span>
                        <span
                          style={{
                            background: scopeBadgeInfo.bg,
                            color: '#FFF',
                            padding: '0.12rem 0.45rem',
                            borderRadius: '4px',
                            fontSize: '0.65rem',
                          }}
                        >
                          {scopeBadgeInfo.text}
                        </span>
                      </div>
                      <div className="estimate-services-grid">
                        <label className="estimate-checkbox-label">
                          <input
                            type="checkbox"
                            checked={scopeBrand}
                            onChange={(e) => setScopeBrand(e.target.checked)}
                          />
                          Brand Identity
                        </label>
                        <label className="estimate-checkbox-label">
                          <input
                            type="checkbox"
                            checked={scopeCollateral}
                            onChange={(e) => setScopeCollateral(e.target.checked)}
                          />
                          Marketing Collateral
                        </label>
                        <label className="estimate-checkbox-label">
                          <input
                            type="checkbox"
                            checked={scopeAds}
                            onChange={(e) => setScopeAds(e.target.checked)}
                          />
                          Ad Creatives
                        </label>
                        <label className="estimate-checkbox-label">
                          <input
                            type="checkbox"
                            checked={scopeSocial}
                            onChange={(e) => setScopeSocial(e.target.checked)}
                          />
                          Social Media
                        </label>
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="clientBudget">
                          Budget Range
                        </label>
                        <select
                          className="form-control"
                          id="clientBudget"
                          value={clientBudget}
                          onChange={(e) => setClientBudget(e.target.value)}
                        >
                          <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                          <option value="₹15,000 – ₹35,000">₹15,000 – ₹35,000</option>
                          <option value="₹35,000 – ₹75,000+">₹35,000 – ₹75,000+</option>
                          <option value="Flexible / To be discussed">Flexible / To be discussed</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="clientSlot">
                          Preferred Slot
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="clientSlot"
                          placeholder="e.g. Today 4:00 PM"
                          value={clientSlot}
                          onChange={(e) => setClientSlot(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-field" style={{ marginBottom: '0.75rem' }}>
                      <label className="form-label" htmlFor="projectBrief">
                        Project Brief *
                      </label>
                      <textarea
                        className="form-control"
                        id="projectBrief"
                        rows={2}
                        placeholder="Briefly describe what visuals or branding you need..."
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      <span>SEND ENQUIRY VIA WHATSAPP</span>
                      <span>→</span>
                    </button>

                    {submittedEnquiryUrl && (
                      <div
                        style={{
                          marginTop: '0.85rem',
                          background: 'rgba(124,58,237,0.08)',
                          border: '1px solid #7C3AED',
                          borderRadius: '8px',
                          padding: '0.85rem',
                          fontSize: '0.84rem',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '0.25rem', color: '#1B1035' }}>
                          ✨ Thank you, {clientName.trim() || 'Client'}!
                        </div>
                        <p style={{ marginBottom: '0.65rem', color: 'var(--text-body)', fontSize: '0.82rem' }}>
                          Your inquiry for <strong>{serviceSelect}</strong> has been generated and is ready for
                          WhatsApp.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <a
                            href={submittedEnquiryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                              background: 'linear-gradient(135deg, #25D366, #128C7E)',
                              border: 'none',
                              padding: '0.55rem 1.25rem',
                              fontSize: '0.82rem',
                            }}
                          >
                            <span>💬 Open WhatsApp Now</span>
                          </a>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                            onClick={() => copyToClipboard(submittedEnquiryText, 'Formatted Enquiry')}
                          >
                            Copy Formatted Enquiry
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {/* BOTTOM: Direct Contact Information */}
                <div className="contact-info-panel">
                  <div className="section-eyebrow">DIRECT CONTACT</div>
                  <h3>LET&apos;S BUILD YOUR IDENTITY.</h3>
                  <p>
                    Reach out directly via email, phone, WhatsApp, or through our project inquiry form. We typically
                    reply within 24–48 hours.
                  </p>

                  <div className="contact-channels">
                    {/* Email */}
                    <div className="channel-box">
                      <div className="channel-left">
                        <span className="channel-icon" aria-hidden="true">
                          ✉️
                        </span>
                        <div>
                          <div className="channel-label">EMAIL</div>
                          <a href="mailto:slrgraphics.contact@email.com" className="channel-link">
                            slrgraphics.contact@email.com
                          </a>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="copy-pill-btn"
                        onClick={() => copyToClipboard('slrgraphics.contact@email.com', 'Email')}
                      >
                        Copy
                      </button>
                    </div>

                    {/* Phone */}
                    <div className="channel-box">
                      <div className="channel-left">
                        <span className="channel-icon" aria-hidden="true">
                          📞
                        </span>
                        <div>
                          <div className="channel-label">PHONE &amp; WHATSAPP</div>
                          <a href="tel:+917004953962" className="channel-link">
                            +91 7004953962
                          </a>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/917004953962"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="copy-pill-btn"
                        style={{ textDecoration: 'none' }}
                      >
                        WhatsApp
                      </a>
                    </div>

                    {/* Instagram Handle */}
                    <div className="channel-box">
                      <div className="channel-left">
                        <span className="channel-icon" aria-hidden="true">
                          📸
                        </span>
                        <div>
                          <div className="channel-label">OFFICIAL HANDLE</div>
                          <a
                            href="https://instagram.com/slr_graphics"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="channel-link"
                          >
                            @slr_graphics
                          </a>
                        </div>
                      </div>
                      <a
                        href="https://instagram.com/slr_graphics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="copy-pill-btn"
                        style={{ textDecoration: 'none' }}
                      >
                        Follow
                      </a>
                    </div>
                  </div>

                  {/* Direct WhatsApp Pill */}
                  <div>
                    <a
                      href="https://wa.me/917004953962"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="direct-contact-wa-pill"
                    >
                      <span aria-hidden="true">💬</span>
                      <span>WhatsApp Direct (+91 7004953962)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================================
               PAGE 05: ABOUT US SECTION
               ====================================================================== */}
          <section
            ref={(el) => {
              pageRefs.current[4] = el;
            }}
            className={`cinema-page ${currentCinemaIndex === 4 ? 'active' : ''} ${
              exitDirection?.index === 4
                ? exitDirection.dir === 'left'
                  ? 'slide-left-exit'
                  : 'slide-right-exit'
                : ''
            }`}
            id="page-about"
          >
            <div className="slr-container">
              <div className="about-layout stagger-el">
                <div className="about-text">
                  <div className="section-eyebrow">STUDIO PHILOSOPHY</div>
                  <h2 className="section-title">CREATIVE IDEAS. STRONG VISUALS.</h2>
                  <p className="about-lead">
                    At SLR GRAPHICS, we believe great design is more than just good-looking visuals. It&apos;s about
                    creating a consistent identity that people recognize and remember.
                  </p>
                  <p className="about-desc">
                    From brand identity and social media graphics to promotional designs, UI/UX, website handling, and
                    print materials, we provide creative solutions tailored to your brand. Whether you&apos;re launching
                    a new venture, refreshing an existing brand, or need everyday design support, we craft visuals that
                    communicate your ideas with clarity, authority, and style.
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => goToCinemaPage(3)} className="btn btn-primary">
                      Start a Project →
                    </button>
                  </div>
                </div>

                {/* Approach Card: UNDERSTAND → CREATE → REFINE → DELIVER */}
                <div className="approach-card">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cinzel), var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--accent-violet)',
                        letterSpacing: '0.14em',
                      }}
                    >
                      OUR APPROACH
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      HOW WE WORK
                    </span>
                  </div>

                  <div className="approach-formula">
                    <span>UNDERSTAND</span> <span>→</span>
                    <span>CREATE</span> <span>→</span>
                    <span>REFINE</span> <span>→</span>
                    <span>DELIVER</span>
                  </div>

                  <div className="approach-step-item">
                    <div className="step-icon-wrap" aria-hidden="true">
                      🔍
                    </div>
                    <div className="step-text">
                      <h4>01. Understand Your Goals</h4>
                      <p>We understand your goals, audience, and objectives to develop a strategic visual foundation.</p>
                    </div>
                  </div>

                  <div className="approach-step-item">
                    <div className="step-icon-wrap" aria-hidden="true">
                      💡
                    </div>
                    <div className="step-text">
                      <h4>02. Develop Creative Concepts</h4>
                      <p>We transform your ideas into distinctive, memorable, and polished design concepts.</p>
                    </div>
                  </div>

                  <div className="approach-step-item">
                    <div className="step-icon-wrap" aria-hidden="true">
                      ✨
                    </div>
                    <div className="step-text">
                      <h4>03. Refine Every Detail</h4>
                      <p>We refine every detail with precision—from spacing to typography balance.</p>
                    </div>
                  </div>

                  <div className="approach-step-item" style={{ marginBottom: 0 }}>
                    <div className="step-icon-wrap" aria-hidden="true">
                      🚀
                    </div>
                    <div className="step-text">
                      <h4>04. Deliver Ready-to-Use Files</h4>
                      <p>You receive high-resolution vector and print-ready master files ready for immediate use.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Core Pillars: Why SLR Graphics */}
              <div className="pillars-strip stagger-el">
                <div className="pillar-item">
                  <div style={{ fontSize: '1.35rem' }} aria-hidden="true">
                    💡
                  </div>
                  <h5>CREATIVE THINKING</h5>
                  <p>We turn ideas into visually meaningful designs.</p>
                </div>
                <div className="pillar-item">
                  <div style={{ fontSize: '1.35rem' }} aria-hidden="true">
                    💎
                  </div>
                  <h5>PROFESSIONAL QUALITY</h5>
                  <p>Every design is created with attention to detail.</p>
                </div>
                <div className="pillar-item">
                  <div style={{ fontSize: '1.35rem' }} aria-hidden="true">
                    🎯
                  </div>
                  <h5>CUSTOM SOLUTIONS</h5>
                  <p>We create designs based on your brand goals.</p>
                </div>
                <div className="pillar-item">
                  <div style={{ fontSize: '1.35rem' }} aria-hidden="true">
                    🛡️
                  </div>
                  <h5>CONSISTENT VISUALS</h5>
                  <p>We help maintain a strong identity across platforms.</p>
                </div>
                <div className="pillar-item">
                  <div style={{ fontSize: '1.35rem' }} aria-hidden="true">
                    🤝
                  </div>
                  <h5>CLIENT-FOCUSED</h5>
                  <p>Your requirements remain at the center of every step.</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* 3. Bottom Cinema Control Bar */}
        <footer className="cinema-bottom-bar">
          <div className="cinema-page-meta">
            <span className="cinema-page-counter">{CINEMA_PAGES[currentCinemaIndex].label}</span>
            <span className="cinema-page-title">{CINEMA_PAGES[currentCinemaIndex].title}</span>
          </div>

          <div className="cinema-progress-track">
            <div className="cinema-progress-fill" style={{ width: progressPct }} />
          </div>

          <div className="cinema-nav-buttons">
            <button
              type="button"
              className="cinema-nav-btn"
              onClick={prevCinemaPage}
              disabled={currentCinemaIndex === 0}
              aria-label="Previous Page"
            >
              ‹ PREV
            </button>
            <button
              type="button"
              className="cinema-nav-btn"
              onClick={nextCinemaPage}
              disabled={currentCinemaIndex === CINEMA_PAGES.length - 1}
              aria-label="Next Page"
            >
              NEXT ›
            </button>
          </div>
        </footer>
      </div>

      {/* Floating WhatsApp (+91 7004953962) - Movable / Draggable */}
      <a
        ref={waBtnRef}
        href="https://wa.me/917004953962?text=Hello%20SLR%20GRAPHICS,%20I'd%20like%20to%20discuss%20a%20design%20project!"
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-whatsapp ${isDraggingWa ? 'is-dragging' : ''}`}
        id="floatingWhatsApp"
        title="Drag to move anywhere"
        aria-label="Direct WhatsApp Message"
        style={
          waPos
            ? {
                bottom: 'auto',
                right: 'auto',
                left: `${waPos.left}px`,
                top: `${waPos.top}px`,
              }
            : undefined
        }
        onPointerDown={handleWaPointerDown}
        onPointerMove={handleWaPointerMove}
        onPointerUp={handleWaPointerUp}
        onPointerCancel={handleWaPointerUp}
        onClick={handleWaClick}
      >
        <svg style={{ width: '18px', height: '18px', fill: '#FFFFFF' }} viewBox="0 0 24 24">
          <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.768.459 3.492 1.332 5.006L2 22l5.127-1.346a10.007 10.007 0 004.904 1.282h.004c5.534 0 10.029-4.494 10.029-10.029C22.064 6.494 17.568 2 12.031 2zm5.864 14.214c-.244.686-1.42 1.259-1.956 1.341-.518.078-1.196.111-1.929-.124-.442-.142-1.011-.334-1.742-.65-3.08-1.336-5.086-4.444-5.24-4.65-.154-.205-1.25-1.666-1.25-3.178 0-1.512.793-2.257 1.074-2.563.282-.307.615-.384.82-.384.205 0 .41.002.589.011.189.01.442-.072.692.528.256.615.871 2.127.948 2.28.077.154.128.334.025.539-.102.205-.154.333-.307.512-.154.18-.323.4-.462.538-.154.154-.315.323-.135.632.18.307.8 1.319 1.716 2.135 1.178 1.049 2.17 1.374 2.477 1.528.307.154.487.128.666-.077.18-.205.769-.897.974-1.205.205-.307.41-.256.692-.154.282.102 1.794.846 2.101 1.001.307.154.512.23.589.359.077.128.077.743-.167 1.429z" />
        </svg>
        <span>Chat with SLR</span>
      </a>

      {/* Portfolio Lightbox Modal */}
      {activeProjectModal && (
        <div
          className="lightbox-modal active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProjectModal(null);
          }}
        >
          <div className="lightbox-body">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveProjectModal(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div>
              <div
                style={{
                  marginBottom: '1.25rem',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(124,58,237,0.22)',
                  height: '240px',
                  boxShadow: '0 6px 25px rgba(27,16,53,0.1)',
                  position: 'relative',
                }}
              >
                <ProjectMockup projectKey={activeProjectModal.key} isModal />
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: 'var(--accent-violet)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '0.35rem',
                  fontWeight: 700,
                }}
              >
                {activeProjectModal.catBadge}
              </div>

              <h2
                style={{
                  fontSize: '1.6rem',
                  color: 'var(--text-dark)',
                  marginBottom: '0.5rem',
                  fontWeight: 900,
                }}
              >
                {activeProjectModal.title}
              </h2>

              <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Client: <strong style={{ color: 'var(--text-dark)' }}>{activeProjectModal.client}</strong>
              </div>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                }}
              >
                {activeProjectModal.overview}
              </p>

              <div
                style={{
                  background: '#FAF8FF',
                  border: '1px solid rgba(124,58,237,0.18)',
                  borderRadius: '0.85rem',
                  padding: '1.15rem',
                  marginBottom: '1.25rem',
                }}
              >
                <h4 style={{ fontSize: '0.86rem', color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
                  Key Deliverables:
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', marginBottom: '0.85rem' }}>
                  {activeProjectModal.deliverables}
                </p>

                <h4 style={{ fontSize: '0.86rem', color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
                  Color Palette (Click to Copy):
                </h4>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  {activeProjectModal.colors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => copyToClipboard(col, 'Hex Color')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        background: '#FFFFFF',
                        border: '1px solid rgba(124,58,237,0.18)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '5px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-dark)',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '2px',
                          background: col,
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <span>{col}</span>
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Typography Spec:{' '}
                  <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>{activeProjectModal.fonts}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    const service = activeProjectModal.inquireService;
                    setActiveProjectModal(null);
                    preselectServiceAndGo(service);
                  }}
                >
                  Request Similar Design →
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setActiveProjectModal(null)}>
                  Back to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

