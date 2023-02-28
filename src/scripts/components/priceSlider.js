import noUiSlider from 'nouislider';

// const priceSlider = document.getElementById('price-slider');

// const priceFromInput = document.getElementById('price-from');
// const priceToInput = document.getElementById('price-to');

function initSlider({ priceSlider, priceFromInput, priceToInput }) {
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
}

export default initSlider;
