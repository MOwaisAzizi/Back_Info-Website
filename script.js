'use strict';
let header = document.querySelector('.header')
const modal = document.querySelector('.Modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelector('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tabcontianer = document.querySelector('.operations__tab-container')
const tabcontent = document.querySelectorAll('.operations__content');
const tab = document.querySelectorAll('.operations__tab')
const nav = document.querySelector('nav')

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    document.querySelector(`${e.target.getAttribute('href')}`).scrollIntoView({ behavior: 'smooth' })
  }
})

btnScrollTo.addEventListener('click', function () {

  section1.scrollIntoView({ behavior: 'smooth' })
})

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
document.querySelector('.next').addEventListener('click', function () {
  alert('Yor Rejestered successfully!');
})

const tabsContainer = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function (e) {

  const clicked = e.target.closest('.operations__tab')

  if (!clicked) return

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  tabsContent.forEach(el => el.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

const NavactiveHandler = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sublings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('nav').querySelector('img')
    sublings.forEach((el) => {
      if (el !== link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity
  }
}
nav.addEventListener('mouseover', function (e) {
  NavactiveHandler(e, 0.5)
})
nav.addEventListener('mouseout', function (e) {
  NavactiveHandler(e, 1)
})

const stickyNav = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky')
  else { { nav.classList.remove('sticky') } }
}
const Navhight = nav.getBoundingClientRect().height
const headerobsever = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${Navhight}px`

})
headerobsever.observe(header)

const reavelSetion = (entries, observe) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  //dont request after all revealed
  observe.unobserve(entry.target)
}

const sections = document.querySelectorAll('.section')
const sectionobserver = new IntersectionObserver(reavelSetion, {
  root: null,
  threshold: 0.15,
})
sections.forEach(section => {
  sectionobserver.observe(section)
  section.classList.add('section--hidden')
})

const revealImages = (entries, observe) => {
  const [entry] = entries;
  entry.target.classList.remove('lazy-img')
  observe.unobserve(entry.target)
}
const images = document.querySelectorAll('img[data-src]')

const imgObserver = new IntersectionObserver(revealImages, {
  root: null,
  threshold: 0.40,
})
images.forEach(img => {
  imgObserver.observe(img)
})

//slider
const slide = function () {
  const slider = document.querySelector('.slider')
  const slides = document.querySelectorAll('.slide')
  const btnleft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotsCountainer = document.querySelector('.dots')

  const activateDots = (slide) => {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  }
  const createDots = () => {
    slides.forEach((_, i) => {
      dotsCountainer.insertAdjacentHTML('beforeend', `
      <button class="dots__dot" data-slide="${i}"></button>`)
    })
  }

  const goToSlide = (slide) => {
    slides.forEach((el, i) => el.style.transform = `translate(${100 * (i - slide)}%)`)
  }

  const inti = () => {
    createDots()
    goToSlide(0)
    activateDots(0)
  }
  inti()

  let curSlide = 0;
  let maxSlide = slides.length;

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      curSlide = 0
    } else {
      curSlide++;
    }
    goToSlide(curSlide)
    activateDots(curSlide)
  }

  const preSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide)
    activateDots(curSlide)
  }

  btnRight.addEventListener('click', nextSlide)
  btnleft.addEventListener('click', preSlide)

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide()
    if (e.key === 'ArrowLeft') preSlide()
  })
  //-100,0,100,200

  dotsCountainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {

      const slide = e.target.dataset.slide
      goToSlide(slide)
      activateDots(slide)
    }
  })
}
slide();

