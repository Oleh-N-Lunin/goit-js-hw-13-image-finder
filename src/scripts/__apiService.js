// const MY_KEY = 'key=21886908-2dadc690508cf849d5de61581';
// const BASE_URL = 'https://pixabay.com/api/?'

// export default class ApiService{
//     constructor() {
//         this.search = "";
//         this.page = 1;
//         this.per_page = 12;
//     }

//     async searchImages() {
//         const url = `${BASE_URL}${MY_KEY}&q=${this.search}&orientation=horizontal&per_page=6&page=${this.page}`;

//         this.incrementPage();

//         return (await (await fetch(url)).json()).hits;
//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.search;
//     }

//     set query(newQuery) {
//         this.search = newQuery;
//     }
// }