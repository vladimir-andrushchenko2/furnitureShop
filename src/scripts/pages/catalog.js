// import initSlider from '../components/priceSlider';
import noUiSlider from 'nouislider';

import getPageTemplate from '../utils/getPageTemplate';

class CatalogPage {
  constructor() {
    this.catalog = getPageTemplate('catalog-page-template');
    this.priceSlider = this.catalog.querySelector('#price-slider');

    this.priceFromInput = this.catalog.querySelector('#price-from');
    this.priceToInput = this.catalog.querySelector('#price-to');
  }

  init() {
    this.priceInputsArray = [this.priceFromInput, this.priceToInput];

    const slideCreator = noUiSlider.create.bind(this);

    slideCreator(this.priceSlider, {
      start: [20, 80],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });

    this.priceSlider.noUiSlider.on('update', (values, handle) => {
      this.priceInputsArray[handle].value = Math.floor(values[handle]);
    });

    this.priceFromInput.addEventListener('blur', () => {
      this.priceSlider.noUiSlider.set([this.priceFromInput.value, null]);
    });

    this.priceToInput.addEventListener('blur', () => {
      this.priceSlider.noUiSlider.set([null, this.priceToInput.value]);
    });
  }

  getPage() {
    return this.catalog;
  }
}

export default CatalogPage;
