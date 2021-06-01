import ApiService from './apiService.js';
import animatedScrollTo from 'animated-scroll-to'; //pod voprosom
import cardTemplate from '../templates/search-form.hbs';

const debounce = require('lodash.debounce');

const refs = {
    cardContainer: document.querySelector(".gallery"),
    button: document.querySelector(".button"),
    input: document.querySelector("#search-form"),
    inputValue: document.querySelector("[name=query]"),
}

const apiFunction = new ApiService();

refs.input.addEventListener('submit', onSearch);
refs.button.addEventListener('click', loadMore);

function onSearch(e) {
    clearCard();
    e.preventDefault();
    if (refs.inputValue.length === 0) {
        refs.button.disabled = true;
        return;
    }
    refs.button.disabled = false;

    apiFunction.query = refs.inputValue.value;
    apiFunction.resetPage();
    loadMore();
}

async function loadMore() {
    try {
        const hits = await apiFunction.searchImages();
        markupCards(hits);
        const cardLength = refs.cardContainer.children.length;
        const getTop = cardLength - 12;
        animatedScrollTo(refs.cardContainer.children[`${getTop}`],
            {
                speed: 500,
                maxDuration: 3000,
                verticalOffset: -20,
            });
        if (hits.length === 0) {
            refs.button.disabled = true;
        }
    } catch (error) {
        console.warn(error);
    }
}

function markupCards(data) {
    const cards = cardTemplate(data);
    refs.cardContainer.insertAdjacentHTML('beforeend', cards);
}

function clearCard() {
    refs.cardContainer.innerHTML = '';
}