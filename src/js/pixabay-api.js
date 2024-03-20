import axios from 'axios';

const API_KEY = '42476870-3a5632db826cc102513b658b4';
const BASE_URL = 'https://pixabay.com';
const END_POINT = '/api/';

export async function searchImages(search, page) {
  const PARAMS = `?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;
  const url = `${BASE_URL}${END_POINT}${PARAMS}`;

  try {
    //рефакторинг кода на axios
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    if (response.data.hits && response.data.hits.length > 0) {
      return response.data;
    } else {
      throw new Error('No images found');
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch images from Pixabay API: ${error.message}`
    );
  }
}
