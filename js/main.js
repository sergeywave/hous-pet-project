"use strict";

const html = document.querySelector('.html');
const closeCross = document.querySelector('.close-cross');
const closeCrossPopup = document.querySelector('#popup-send-me .close-cross');
const burgerMenu = document.querySelector('.header__burger');
const slides = document.querySelectorAll('.reviews-slide');
let openPopup;

closeCross.onclick = function() {
  html.classList.toggle("alert-line-switch");
};

// Mobile menu opened

burgerMenu.onclick = function() {
  html.classList.toggle("mobile-menu-opened");
};

// Popup's

closeCrossPopup.onclick = function() {
  html.classList.add("popup-closed");
  html.classList.remove("popup-opened");
};

// Popup Open

openPopup = function() {
  html.classList.remove("popup-closed");
  html.classList.add("popup-opened");
};

// Remove aria-hidden attribute from sliders

// for (let slide of slides) {
// slide.removeAttribute('aria-hidden');
// };





