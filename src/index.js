import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');
const errorP = document.querySelector('.error');

// Функция для заполнения select с породами
async function populateBreedsSelect() {
  try {
    const breeds = await fetchBreeds();

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // После успешной загрузки данных, скрываем элемент loader
    hideElement(loader);
  } catch (error) {
    displayError();
  }
}

// Функция для обработки изменения выбранной породы
async function handleBreedSelectChange(event) {
  const selectedBreedId = event.target.value;

  try {
    showElement(loader);
    const catData = await fetchCatByBreed(selectedBreedId);
    displayCatInfo(catData[0]);
  } catch (error) {
    displayError();
  } finally {
    hideElement(loader);
  }
}

// Функция для отображения информации о коте
function displayCatInfo(catData) {
  catInfoDiv.innerHTML = `
    <img src="${catData.url}" alt="Cat">
    <h2>${catData.breeds[0].name}</h2>
    <p>${catData.breeds[0].description}</p>
    <p>Temperament: ${catData.breeds[0].temperament}</p>
  `;
  showElement(catInfoDiv);
}

// Функция для отображения элемента
function showElement(element) {
  element.style.display = 'block';
}

// Функция для скрытия элемента
function hideElement(element) {
  element.style.display = 'none';
}

// Функция для отображения ошибки
function displayError() {
  showElement(errorP);
  Notiflix.Notify.Failure('Oops! Something went wrong. Please try again.');
}

// Начальная инициализация
document.addEventListener('DOMContentLoaded', () => {
  populateBreedsSelect();
  breedSelect.addEventListener('change', handleBreedSelectChange);
  hideElement(errorP); // Скрываем элемент с ошибкой при начальной загрузке страницы
  hideElement(loader); // Скрываем элемент loader при начальной загрузке страницы
});
