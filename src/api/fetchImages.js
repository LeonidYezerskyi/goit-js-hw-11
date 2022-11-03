import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31049389-607cc0a43899480929969a464';
export const perPage = 40;

async function fetchImages(imageName, page = 1) {
  const { data } = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${imageName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return data;
}

export { fetchImages };
