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
  btnLoadMore: document.querySelector('.js-btn-load'),
};

let query;
let page; // чтоб запросы не повторялись
let maxPage;

refs.formEl.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);
// ============================================ Функция для снятия/установки индикатора загрузки
function showLoader() {
  refs.loader.classList.remove('is-hidden');
}
function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
// ============================================ Функция для кнопки "load more" монтаж\демонтаж из области видимости
function showLoadBtn() {
  refs.btnLoadMore.classList.remove('is-hidden');
}
function hideLoadBtn() {
  refs.btnLoadMore.classList.add('is-hidden');
}
// =========================================== Функция для скрытия кнопки load more + очиска разметки, "прикручиваем" к ошибкам
function hideLoadBtnAndMarkup() {
  refs.btnLoadMore.classList.add('is-hidden');
  refs.infoEl.innerHTML = '';
}
// ===================================================================================================================================================================================
async function onFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  page = 1;
  showLoader();
  hideLoadBtnAndMarkup();
  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query',
      position: 'center',
      transitionIn: 'fadeInLeft',
    });
    hideLoader();
    hideLoadBtn();
    // hideLoadBtnAndMarkup();
    return;
  }
  e.currentTarget.elements.query.value = ''; //очищаем поле ввода после отправки запроса
  try {
    const data = await searchImages(query, page);
    refs.infoEl.innerHTML = '';
    if (data.hits && data.hits.length > 0) {
      renderMarkup(refs, data.hits);
      hideLoader();
      maxPage = Math.ceil(data.totalHits / 15);
      // checkBtnVisibleStatus();
    } else {
      iziToast.error({
        message: 'No images found for the given query',
        position: 'center',
        transitionIn: 'fadeInLeft',
      });
    }
    checkBtnVisibleStatus();
  } catch (error) {
    console.error(error);

    hideLoadBtnAndMarkup();
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      position: 'center',
      transitionIn: 'fadeInLeft',
    });
  } finally {
    e.target.reset();
    hideLoader();
  }
}
// ================================== Функция для кнопки load more
async function onLoadMoreClick() {
  page += 1;
  showLoader();
  try {
    const data = await searchImages(query, page);
    renderMarkup(refs, data.hits); // добавляем новые изображения к уже загруженным
    hideLoader();
    checkBtnVisibleStatus();
  } catch (error) {
    console.error(error);
    // hideLoader();
    hideLoadBtnAndMarkup();
    iziToast.error({
      message: 'Failed to fetch more images. Please try again later.',
      position: 'center',
      transitionIn: 'fadeInLeft',
    });
  } finally {
    //проверяем и сообщаем, если "конец колекции"
    if (page >= maxPage) {
      iziToast.info({
        message: 'End of image collection',
        position: 'center',
        transitionIn: 'fadeInLeft',
      });
    }
    // получим высоту одной карточки
    const cardHeight =
      refs.infoEl.firstElementChild.getBoundingClientRect().height;

    window.scrollBy({
      top: 6 * cardHeight, // прокрутка на 6 высот карточки
      behavior: 'smooth', // плавная анимация прокрутки
    });
  }
}

// ================================== Функция для проверки видимости кнопки load more при достижении конца коллекции
function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
  } else {
    showLoadBtn();
  }
}
