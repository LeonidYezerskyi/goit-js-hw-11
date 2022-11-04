import { fetchImages, perPage } from './api/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getScroll } from './scroll';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const simpleLightbox = new SimpleLightbox('.gallery a');

let page = 1;
let imageName = '';

searchForm.addEventListener('submit', searchImage);
loadMoreBtn.addEventListener('click', loadMore);

function markupImageCard(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href = "${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
        <div class="info">
          <p class="info-item"><b>Likes</b>${likes}</p>
          <p class="info-item"><b>Views</b>${views}</p>
          <p class="info-item"><b>Comments</b>${comments}</p>
          <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
      </div>`;
      }
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
  simpleLightbox.refresh();
}

async function searchImage(event) {
  event.preventDefault();
  imageName = searchForm.searchQuery.value.trim();
  clearInput();
  loadMoreBtn.classList.add('is-hidden');
  if (imageName === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  try {
    const { hits, totalHits } = await fetchImages(imageName);
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      markupImageCard(hits);
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
      if (totalHits > 40) {
        loadMoreBtn.classList.remove('is-hidden');
      }
      getScroll();
    }
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function clearInput() {
  galleryList.innerHTML = '';
}

async function loadMore(event) {
  page += 1;
  const { hits, totalHits } = await fetchImages(imageName, page);
  markupImageCard(hits);
  getScroll();
  if (page * perPage >= totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
