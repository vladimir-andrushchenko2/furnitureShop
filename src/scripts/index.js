import './styles';

import noUiSlider from 'nouislider';
// import Swiper bundle with all modules installed
// import Swiper JS
import Swiper, { Pagination } from 'swiper';

import App from './components/app';

import getPageTemplate from './utils/getPageTemplate';

const root = document.getElementById('root');

const pages = {
  main: {
    constructPageElement() {
      return getPageTemplate('main-page-template');
    },
    setUpPage() {
      // eslint-disable-next-line no-unused-vars
      const swiper = new Swiper('.swiper', {
        modules: [Pagination],
        pagination: {
          el: '.swiper-pagination',
        },
      });
    },
  },
  product: {
    constructPageElement() {
      return getPageTemplate('product-page-template');
    },
    setUpPage() {
      const orderPopup = document.querySelector('.popup-wrapper_order');
      const successPopup = document.querySelector('.popup-wrapper_success');

      document.querySelector('.item__buy-btn').addEventListener('click', () => {
        orderPopup.classList.add('popup-wrapper_opened');
      });

      orderPopup
        .querySelector('.contact__form')
        .addEventListener('submit', (event) => {
          event.preventDefault();
          orderPopup.classList.remove('popup-wrapper_opened');
          successPopup.classList.add('popup-wrapper_opened');
        });
    },
  },
  catalog: {
    constructPageElement() {
      return getPageTemplate('catalog-page-template');
    },
    setUpPage() {
      const priceSlider = document.getElementById('price-slider');
      const priceFromInput = document.getElementById('price-from');
      const priceToInput = document.getElementById('price-to');
      const priceInputsArray = [priceFromInput, priceToInput];

      noUiSlider.create(priceSlider, {
        start: [20, 80],
        connect: true,
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });

      priceSlider.noUiSlider.on('update', (values, handle) => {
        priceInputsArray[handle].value = Math.floor(values[handle]);
      });

      priceFromInput.addEventListener('blur', () => {
        priceSlider.noUiSlider.set([priceFromInput.value, null]);
      });

      priceToInput.addEventListener('blur', () => {
        priceSlider.noUiSlider.set([null, priceToInput.value]);
      });
    },
  },
};

const app = new App(root, pages);

document.body.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('arrow-btn') ||
    event.target.classList.contains('catalog-link')
  ) {
    event.preventDefault();
    app.loadPage('catalog');
    return;
  }

  if (
    event.target.classList.contains('rated__link') ||
    event.target.classList.contains('offer__link')
  ) {
    event.preventDefault();
    app.loadPage('product');
    return;
  }

  if (event.target.closest('.logo')) {
    event.preventDefault();
    app.loadPage('main');
    return;
  }

  if (event.target.classList.contains('popup__close-btn')) {
    event.target
      .closest('.popup-wrapper')
      .classList.remove('popup-wrapper_opened');
  }
});

app.loadPage('main');
