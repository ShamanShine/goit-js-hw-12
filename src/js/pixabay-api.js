const API_KEY = '42476870-3a5632db826cc102513b658b4';
const BASE_URL = 'https://pixabay.com';
const END_POINT = '/api/';

export function searchImages(search) {
  const PARAMS = `?key=${API_KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true`;
  const url = `${BASE_URL}${END_POINT}${PARAMS}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits && data.hits.length > 0) {
        return data;
      } else {
        throw new Error('No images found');
      }
    })
    .catch(error => {
      throw new Error(
        `Failed to fetch images from Pixabay API: ${error.message}`
      );
    });
}
