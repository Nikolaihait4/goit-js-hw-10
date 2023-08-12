import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_4MuXXvfWSGK2qNc7r2Qx38v1LkY3nYUbYW6BhNzl1z7qmVvGRaWlZTfPuvcGApYe';

// Функция для получения списка пород
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

// Функция для получения информации о коте по породе
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
