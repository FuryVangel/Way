/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
'use strict';

window.addEventListener('DOMContentLoaded', function () {
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');
  var jsTriggers = document.querySelectorAll('.js-tab-trigger');
  var visitedButtons = document.querySelectorAll('.visited-button');
  var modalButtons = document.querySelectorAll('[data-modal-button]');
  var phoneModal = document.querySelector('[name=phone-modal]');
  var body = document.querySelector('body');
  var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
  var animationTime = 400;
  var framesCount = 20;

  // Открытие/закрытие мобильного меню
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


  // Переход на карточку, выбранной страны
  visitedButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var id = this.getAttribute('data-tab');
      var content = document.querySelector('.js-tab-content[data-tab="' + id + '"]');
      var trigger = document.querySelector('.js-tab-trigger[data-tab="' + id + '"]');
      var activeTrigger = document.querySelector('.js-tab-trigger.active');
      var activeContent = document.querySelector('.js-tab-content.active');

      activeTrigger.classList.remove('active');
      trigger.classList.add('active');

      activeContent.classList.remove('active');
      content.classList.add('active');
    });
  });

  // Скролл
  var anchorTrigger = function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      var coordY = document.querySelector(anchor.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

      var scroller = setInterval(function () {
        var scrollBy = coordY / framesCount;

        if (window.pageYOffset < coordY) {
          window.scrollBy(0, scrollBy);
        } else {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }
      }, animationTime / framesCount);
    });
  };

  for (var j = 0; j < anchors.length; j++) {
    anchorTrigger(anchors[j]);
  }

  // Открытие/закрытие модального окна
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
});
