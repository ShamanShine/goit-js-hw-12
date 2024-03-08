import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchImages } from './js/pixabay-api.js';
import { renderMarkup } from './js/render-functions.js';

const refs = {
  formEl: document.querySelector('.search-form'),
  infoEl: document.querySelector('.img-container'),
  loader: document.querySelector('.loader'),
};

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();

  refs.infoEl.innerHTML = '';
  refs.loader.classList.remove('is-hidden'); // Показать индикатор загрузки

  const query = event.currentTarget.elements.query.value.trim();

  event.currentTarget.elements.query.value = ''; //очищаем поле ввода после отправки запроса

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query',
      position: 'center',
      transitionIn: 'fadeInLeft',
    });
    return;
  }

  searchImages(query)
    .then(data => {
      if (data.hits && data.hits.length > 0) {
        renderMarkup(refs, data.hits, 18); // количество изображений для отображения. Надо 18
      } else {
        iziToast.error({
          message: 'No images found for the given query',
          position: 'center',
          transitionIn: 'fadeInLeft',
        });
      }
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        message: 'Failed to fetch images. Please try again later.',
        position: 'center',
        transitionIn: 'fadeInLeft',
      });
    })
    .finally(() => {
      refs.loader.classList.add('is-hidden');
    });
});

const lightbox = new SimpleLightbox('.img-container', {
  overlay: true,
  overlayOpacity: 0.9,
  animationSpeed: 1000,
  scrollZoomFactor: 0.1,
  navText: ['←', '→'],
  captionsData: 'alt',
  captionDelay: 250,
});
