import './style.css'

/* -------------------------------------------------------
   1. En-tête : état "compact" au défilement
   ------------------------------------------------------- */
const header = document.querySelector('[data-header]')
const onScroll = () => {
  if (!header) return
  header.classList.toggle('is-scrolled', window.scrollY > 24)
}
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

/* -------------------------------------------------------
   1b. Progression de lecture + profondeur du hero
   ------------------------------------------------------- */
const progressBar = document.querySelector('[data-scroll-progress]')
const parallaxOrbs = document.querySelectorAll('[data-parallax]')
const updateMotion = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
  progressBar?.style.setProperty('--scroll-progress', `${progress}%`)
  parallaxOrbs.forEach((orb) => {
    const speed = Number(orb.dataset.parallax || 0)
    orb.style.setProperty('--parallax-y', `${window.scrollY * speed}px`)
  })
}
window.addEventListener('scroll', updateMotion, { passive: true })
updateMotion()

/* -------------------------------------------------------
   2. Menu mobile
   ------------------------------------------------------- */
const menuBtn = document.querySelector('[data-menu-btn]')
const mobileMenu = document.querySelector('[data-mobile-menu]')
const toggleMenu = (force) => {
  if (!mobileMenu || !menuBtn) return
  const open = force ?? mobileMenu.classList.contains('hidden')
  mobileMenu.classList.toggle('hidden', !open)
  menuBtn.setAttribute('aria-expanded', String(open))
  document.body.classList.toggle('overflow-hidden', open)
}
menuBtn?.addEventListener('click', () => toggleMenu())
mobileMenu?.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => toggleMenu(false)),
)

/* -------------------------------------------------------
   2b. Micro-interaction de profondeur sur les cartes
   ------------------------------------------------------- */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('article.glass-card, [data-faq]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(900px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) translateY(-4px)`
    })
    card.addEventListener('pointerleave', () => {
      card.style.transform = ''
    })
  })
}

/* -------------------------------------------------------
   3. Révélation au scroll
   ------------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal')
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0
          entry.target.style.transitionDelay = `${delay}ms`
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  )
  revealEls.forEach((el) => io.observe(el))
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'))
}

/* -------------------------------------------------------
   4. Compteurs animés
   ------------------------------------------------------- */
const counters = document.querySelectorAll('[data-count]')
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count)
  const suffix = el.dataset.suffix || ''
  const decimals = (el.dataset.count.split('.')[1] || '').length
  const duration = 1800
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    const value = target * eased
    el.textContent = value.toFixed(decimals).replace('.', ',') + suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
if ('IntersectionObserver' in window && counters.length) {
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target)
          cio.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.6 },
  )
  counters.forEach((c) => cio.observe(c))
}

/* -------------------------------------------------------
   5. FAQ (accordéon)
   ------------------------------------------------------- */
document.querySelectorAll('[data-faq]').forEach((item) => {
  const btn = item.querySelector('[data-faq-btn]')
  const panel = item.querySelector('[data-faq-panel]')
  btn?.addEventListener('click', () => {
    const isOpen = item.classList.toggle('is-open')
    btn.setAttribute('aria-expanded', String(isOpen))
    if (panel) panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : '0px'
  })
})

/* -------------------------------------------------------
   6. Lien de navigation actif (scroll spy)
   ------------------------------------------------------- */
const navLinks = document.querySelectorAll('[data-nav-link]')
const sections = [...navLinks]
  .map((l) => document.querySelector(l.getAttribute('href')))
  .filter(Boolean)
if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => {
            l.classList.toggle(
              'text-white',
              l.getAttribute('href') === `#${entry.target.id}`,
            )
          })
        }
      })
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  sections.forEach((s) => spy.observe(s))
}

/* -------------------------------------------------------
   7. Année courante (pied de page)
   ------------------------------------------------------- */
const yearEl = document.querySelector('[data-year]')
if (yearEl) yearEl.textContent = new Date().getFullYear()
