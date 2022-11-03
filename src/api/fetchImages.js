const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31049389-607cc0a43899480929969a464';

function fetchImages(imageName) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${imageName}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  });
}
export { fetchImages };
