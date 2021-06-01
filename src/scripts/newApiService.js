const MY_KEY = 'key=21886908-2dadc690508cf849d5de61581';
const BASE_URL = 'https://pixabay.com/api/?'

export default function apiService(query, page, MY_KEY) {
    const url = `${BASE_URL}image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${MY_KEY}`;

    return fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(data => {
            return data.hits;
        });
};