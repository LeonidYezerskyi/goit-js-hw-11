import { fetchImages } from './api/fetchImages';
import Notiflix from 'notiflix';
// import axios from 'axios';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');

searchForm.addEventListener('submit', searchImage);

function markupImageCard(images) {
  console.log(images);
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
  galleryList.innerHTML = markup;
}

function searchImage(event) {
  event.preventDefault();

  let imageName = searchForm.searchQuery.value.trim();
  if (imageName === '') return;
  clearInput();

  fetchImages(imageName)
    .then(({ hits }) => {
      if (hits) {
        markupImageCard(hits);
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
