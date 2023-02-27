import './styles';
import App from './app';

const root = document.getElementById('root');

function getPageTemplate(idOfTemplate) {
  return document
    .getElementById(idOfTemplate)
    .content.querySelector('.main')
    .cloneNode(true);
}

const pages = {
  main: getPageTemplate('main-page-template'),
  product: getPageTemplate('product-page-template'),
  catalog: getPageTemplate('catalog-page-template'),
};

const app = new App(root, pages);

app.loadPage('main');

const linksToCatalog = [
  document.querySelector('.catalog-link'),
  ...document.querySelectorAll('.arrow-btn'),
];

linksToCatalog.forEach((linkElement) => {
  linkElement.addEventListener('click', (event) => {
    event.preventDefault();
    app.loadPage('catalog');
  });
});

const linkToProductPage = [
  ...document.querySelectorAll('.rated__link'),
  ...document.querySelectorAll('.offer__link'),
];

linkToProductPage.forEach((linkElement) => {
  linkElement.addEventListener('click', (event) => {
    event.preventDefault();
    app.loadPage('product');
  });
});
