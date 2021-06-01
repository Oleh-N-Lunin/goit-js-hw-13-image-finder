import cardTemplate from '../templates/search-form.hbs';
import apiService from '../scripts/newApiService.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const MY_KEY = 'key=21886908-2dadc690508cf849d5de61581';

const refs = {
    cardContainer: document.querySelector(".gallery"),
    button: document.querySelector(".button"),
    input: document.querySelector("#search-form"),
    inputValue: document.querySelector("[name=query]"),
}

refs.button.style.display = 'none';

let inputValue = '';
let page = 1;

refs.input.addEventListener('submit', getImage);
function getImage(e) {
    e.preventDefault();
    refs.cardContainer.innerHTML = '';
    inputValue = e.target.elements.query.value;
    if (inputValue.length) {
        apiService(inputValue, page, MY_KEY)
            .then(img => {
                img.length
                ? (refs.button.style.display = 'block')
                : (refs.button.style.display = 'none')
                makeMarkup(img);
            })
        .catch(error => console.log(error))
    }
};

function makeMarkup(img) {
    const cardMarkup = cardTemplate(img)
    refs.cardContainer.insertAdjacentHTML('beforeend', cardMarkup);
}
