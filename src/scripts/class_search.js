import animateScrollTo from 'animated-scroll-to';
import templatesCard from '../templates/search_form.hbs';
import ApiService from './apiService';
const containerCard = document.querySelector('.gallery');
const btnEl = document.querySelector('[data-action=load]');

const inputEl = document.querySelector('#search-form');
const req = document.querySelector('[name=query]');

inputEl.addEventListener('submit', onInputSearchImages);
btnEl.addEventListener('click', fetchCreateMarcupLoadMore);

const apiService = new ApiService();

function onInputSearchImages(e) {
  clearList();
  if (req.value.length === 0) {
    btnEl.disabled = true;

    return;
  }
  e.preventDefault();

  btnEl.disabled = false;

  apiService.query = req.value;
  apiService.resetPage();
  fetchCreateMarcupLoadMore();
}

async function fetchCreateMarcupLoadMore() {
  try {
    const hits = await apiService.searchImages();
    markup(hits);
    const standartL = containerCard.children.length;
    const getTop = standartL - 12;
    animateScrollTo(containerCard.children[`${getTop}`], {
      speed: 500,
      maxDuration: 3000,
      verticalOffset: -20,
    });
    if (hits.length === 0) {
      btnEl.disabled = true;
    }
  } catch (error) {
    console.warn(error);
  }
}

function markup(data) {
  const cards = templatesCard(data);
  containerCard.insertAdjacentHTML('beforeend', cards);
}
function clearList() {
  containerCard.innerHTML = '';
}
