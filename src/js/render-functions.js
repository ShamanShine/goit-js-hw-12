import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const lightbox = new SimpleLightbox('.img-container a', {
  overlay: true,
  overlayOpacity: 0.9,
  animationSpeed: 1000,
  scrollZoomFactor: 0.1,
  navText: ['←', '→'],
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderMarkup(refs, pics, limit = 2000) {
  refs.infoEl.innerHTML = '';

  if (!pics || pics.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'center',
      transitionIn: 'fadeInLeft',
    });
  } else {
    pics.slice(0, limit).forEach(pic => {
      const markup = createMarkup(pic);
      refs.infoEl.insertAdjacentHTML('beforeend', markup);
    });

    lightbox.refresh();
  }
}

function createMarkup(pic) {
  return `<div class="image-box">
          <div class="general-frame">

            <div class="image-container">
              <a href="${pic.largeImageURL}" data-lightbox="gallery">
              <img src="${pic.webformatURL}" alt="${pic.tags}" class="my-image">
              </a>
            </div>
             
            <div class="image-body">
                <ul class="ul-item">
                 <li class="image-li">Likes <span style="font-weight: normal;">${pic.likes}</span></li>
                 <li class="image-li">Views <span style="font-weight: normal;">${pic.views}</span></li>
                 <li class="image-li">Comments <span style="font-weight: normal;">${pic.comments}</span></li>
                 <li class="image-li">Downloads <span style="font-weight: normal;">${pic.downloads}</span></li>
                </ul>
              </div>
          </div>
    </div>`;
}
