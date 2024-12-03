'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// Buttons
const btnShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

// Functions
const showModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.toggle('hidden');
};

// Event listeners for the modal button

for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener('click', showModal);
}
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  console.log(e.key);
  e.key === 'Escape' ? closeModal() : '';
});
