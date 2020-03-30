'use strict';

// Открытие/закрытие мобильного меню
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// Табы
var jsTriggers = document.querySelectorAll('.js-tab-trigger');

jsTriggers.forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    var id = this.getAttribute('data-tab');
    var content = document.querySelector('.js-tab-content[data-tab="' + id + '"]');
    var activeTrigger = document.querySelector('.js-tab-trigger.active');
    var activeContent = document.querySelector('.js-tab-content.active');

    activeTrigger.classList.remove('active');
    trigger.classList.add('active');

    activeContent.classList.remove('active');
    content.classList.add('active');
  });
});

// Скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// Открытие/закрытие модального окна
var modalButtons = document.querySelectorAll('[data-modal-button]');
var phoneModal = document.querySelector('[name=phone-modal]');
var body = document.querySelector('body');

modalButtons.forEach(modalHandler);

function modalHandler(item) {
  item.addEventListener('click', openModal);
}

function openModal() {
  var modalId = this.dataset.modalButton;
  var modal = document.getElementById(modalId);
  modal.classList.add('modal-overlay--visible');
  phoneModal.focus();
  body.classList.add('overflow');

  var btnClose = modal.querySelector('[data-modal-close]');

  btnClose.addEventListener('click', function () {
    modal.classList.remove('modal-overlay--visible');
    body.classList.remove('overflow');
  });

  modal.addEventListener('click', function () {
    modal.classList.remove('modal-overlay--visible');
    body.classList.remove('overflow');
  });

  modal.querySelector('.modal-window').addEventListener('click', function (e) {
    e.stopPropagation();
  });

  modal.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (modal.classList.contains('modal-overlay--visible')) {
        modal.classList.remove('modal-overlay--visible');
        body.classList.remove('overflow');
      }
    }
  });
}

// Валидация для телефона
IMask(document.querySelector('#phone'), {
  mask: '+{7}(000)000-00-00'
});
IMask(document.querySelector('#phone-modal'), {
  mask: '+{7}(000)000-00-00'
});
