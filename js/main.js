"use strict";







"use strict";


// ======================
// INIT
// ======================

const body = document.body
const preloader = document.querySelector('.preloader')
const preloaderText = document.querySelector('.preloader__text')
const html = document.querySelector('.html');
const closeCross = document.querySelector('.close-cross');
const closeCrossPopup = document.querySelector('#popup-send-me .close-cross');
const burgerMenu = document.querySelector('.header__burger');
const slides = document.querySelectorAll('.reviews-slide');
let openPopup;

// ======================
// UI 
// ======================

// Alert line show/hide

closeCross.onclick = function () {
  html.classList.toggle("alert-line-switch");
};

// Mobile menu show/hide

burgerMenu.onclick = function () {
  html.classList.toggle("mobile-menu-opened");
};

// Popups

const popupSendMe = document.getElementById("popup-send-me");
let lastFocus;

openPopup = function () {
  lastFocus = document.activeElement;
  html.classList.remove("popup-closed");
  html.classList.add("popup-opened");
  html.classList.add("no-scroll");
  popupSendMe.focus();

  closeCrossPopup.onclick = function () {
    html.classList.add("popup-closed");
    html.classList.remove("popup-opened");
    html.classList.remove("no-scroll");
    lastFocus.focus();
  };

};



// ======================
// PRELOADER
// ======================

body.classList.add('no-scroll')

let progress = 0

const fakeLoader = setInterval(() => {
  progress += Math.random() * 10

  if (progress >= 90) {
    progress = 90
    clearInterval(fakeLoader)
  }

  if (preloaderText) {
    preloaderText.textContent = Math.floor(progress) + '%'
  }

}, 100)


// ======================
// LOAD
// ======================

window.addEventListener('load', () => {

  clearInterval(fakeLoader)

  const start = progress
  const duration = 500
  const startTime = performance.now()

  const animateTo100 = (time) => {
    const elapsed = time - startTime
    const ratio = Math.min(elapsed / duration, 1)

    progress = start + (100 - start) * ratio

    if (preloaderText) {
      preloaderText.textContent = Math.floor(progress) + '%'
    }

    if (ratio < 1) {
      requestAnimationFrame(animateTo100)
    } else {
      finishPreloader()
    }
  }

  requestAnimationFrame(animateTo100)

})


// ======================
// FINISH PRELOADER
// ======================

function finishPreloader() {
  preloader.classList.add('preloader--hide')
  body.classList.remove('no-scroll')

  initApp()
}


// ======================
// APP (после загрузки)
// ======================

function initApp() {

  const lenis = initLenis()
  initAnimations()

}


// ======================
// LENIS
// ======================

function initLenis() {

  const lenis = window.Lenis ? new window.Lenis({
    duration: 1.5,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    wheelMultiplier: 0.99,
    smoothTouch: false
  }) : null

  if (lenis) {
    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update)
    }
  }

  const closeMobileMenu = () => {
    html.classList.remove('no-scroll')
    html.classList.remove('mobile-menu-opened')
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]')

    if (!link) return

    const href = link.getAttribute('href')

    if (!href) return

    if (href.startsWith('#') && href !== '#!') {
      const targetId = decodeURIComponent(href.slice(1))
      const target = targetId ? document.getElementById(targetId) : null

      if (target) {
        event.preventDefault()

        if (lenis) {
          lenis.scrollTo(target, {
            duration: 1.6
          })
        } else {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }

        history.pushState(null, '', href)
        closeMobileMenu()
      }

      return
    }

    if (link.closest('.header__nav')) {
      closeMobileMenu()
    }
  })

  return lenis
}




// ======================
// GSAP
// ======================

function initAnimations() {

  if (!window.gsap) return

  // gsap.registerPlugin(SplitText, ScrollTrigger)

  // document.querySelectorAll('.anim-section').forEach((section) => {

  //   const header = section.querySelector('.anim-header')
  //   if (!header) return

  //   const split = SplitText.create(header, { type: "chars" })

  //   gsap.from(split.chars, {
  //     y: 150,
  //     opacity: 0,
  //     ease: "power4",
  //     stagger: 0.005,
  //     scrollTrigger: {
  //       trigger: section,
  //       start: "top 60%",
  //       end: "top 30%",
  //       scrub: 3,
  //     }
  //   })

  // })

  const reviews = document.querySelector('#reviews');

  if (reviews) {

    gsap.fromTo(reviews, 
      {
        y: '100%',
        opacity: 0
      },
      {
      y: '0', 
      opacity: 1,
      stagger: .2,
      scrollTrigger: {
        trigger: '.reviews',
        start: 'top 90%',
        end: 'bottom 70%',
        scrub: 1,
        markers: true
      }
    });

  };



}

