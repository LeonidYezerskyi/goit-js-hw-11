const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31049389-607cc0a43899480929969a464';
export const perPage = 40;

function fetchImages(imageName, page = 1) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${imageName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  });
}
export { fetchImages };
