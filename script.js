'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.getElementById('section--1');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const allSections = document.querySelectorAll('.section');

// Buttons
const btnShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
// Functions
const showModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Function for link hover animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    const sibling = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('.nav__logo');

    sibling.forEach(value => {
      if (value !== clicked) value.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Event listeners for the modal button

btnShowModal.forEach(value => {
  value.addEventListener('click', showModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  e.key === 'Escape' ? closeModal() : '';
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // Normal way of scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // Modern Scrolling, only works in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#logo').addEventListener('click', function (e) {
  e.preventDefault();
  header.scrollIntoView({ behavior: 'smooth' });
});

// Smooth Scrolling Page Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Builidng the tabbed components
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;
  // Remove active classes
  tabs.forEach(value => value.classList.remove('operations__tab--active'));
  tabsContent.forEach(value =>
    value.classList.remove('operations__content--active')
  );

  // Activate tab movement
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation eVENT Listener

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
const sec1coords = section1.getBoundingClientRect();
// const sec2coords = document
//   .querySelector('#section--2')
//   .getBoundingClientRect();
// const sec3coords = document
//   .querySelector('#section--3')
//   .getBoundingClientRect();

// console.log(sec1coords.top);

//Normal sticky animation
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY >= sec1coords.top) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// });

// Using the Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
const revealSection = function (entries, observer) {
  entries.map(value => {
    if (!value.isIntersecting) return;
    value.target.classList.remove('section--hidden');
    observer.unobserve(value.target);
  });
};
const sectionObersever = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(value => {
  sectionObersever.observe(value);
  value.classList.add('section--hidden');
});

// Revealing lazy loading images for performances

const allLazyLoadingImages = document.querySelectorAll('img[data-src]');
const revealLazyImages = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
  } else return;
};

const lazyImagesObserver = new IntersectionObserver(revealLazyImages, {
  root: null,
  threshold: 0.15,
});

allLazyLoadingImages.forEach(value => {
  lazyImagesObserver.observe(value);
});
