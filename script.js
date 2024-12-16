'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.getElementById('section--1');
const header = document.querySelector('.header');

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

// Smooth Scrolling Page Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
