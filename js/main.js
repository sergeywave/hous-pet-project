"use strict";

const html = document.querySelector('.html');
const closeCross = document.querySelector('.close-cross');
const closeCrossPopup = document.querySelector('#popup-send-me .close-cross');
const burgerMenu = document.querySelector('.header__burger');
const slides = document.querySelectorAll('.reviews-slide');
let openPopup;

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







