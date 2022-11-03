import { fetchImages, perPage } from './api/fetchImages';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let imageName = '';

searchForm.addEventListener('submit', searchImage);
loadMoreBtn.addEventListener('click', loadMore);
loadMoreBtn.hidden = true;
loadMoreBtn.classList.remove('load-more');

function markupImageCard(images) {
  const markup = images
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        <div class="info">
          <p class="info-item"><b>Likes</b>${likes}</p>
          <p class="info-item"><b>Views</b>${views}</p>
          <p class="info-item"><b>Comments</b>${comments}</p>
          <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
      </div>`;
    })
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
}

function searchImage(event) {
  event.preventDefault();
  imageName = searchForm.searchQuery.value.trim();
  if (imageName === '') return;
  clearInput();

  fetchImages(imageName)
    .then(({ hits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        markupImageCard(hits);
        loadMoreBtn.hidden = false;
        loadMoreBtn.classList.add('load-more');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function clearInput() {
  galleryList.innerHTML = '';
}

function loadMore(event) {
  page += 1;
  fetchImages(imageName, page).then(({ hits, totalHits }) => {
    markupImageCard(hits);
    if ((page + 1) * perPage > totalHits) {
      loadMoreBtn.hidden = true;
      loadMoreBtn.classList.remove('load-more');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}
