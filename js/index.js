const API_ENDPOINT = 'https://newsapi.org/v2/everything';
const API_KEY = '3ee9bd6bf88b41f086037f48a3013a04';

const API_CONFIG = {
    method: 'GET',
    headers: {
        Authorization: API_KEY
    }
};

const form = document.querySelector('.formularioNoticias');
const result = document.querySelector('.resultados');

function getNews(event) {
    event.preventDefault();

    const topic = document.querySelector('#topico').value;
    const size = document.querySelector('#numeroResultados').value;

    if (topic.length === 0 || size.length === 0) {
        alert('Tópico y Número de resultados son obligatorios');
    } else {

        const API_PARAMS = `?q=${topic}&pageSize=${size}`;

        fetch(API_ENDPOINT + API_PARAMS, API_CONFIG)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((responseJSON) => {
                const articles = responseJSON.articles;
                result.innerHTML = ''
                articles.forEach((article) => {
                    result.innerHTML += `<div>
                    <h2>${article.title}</h2>
                    <div>
                        <img src="${article.urlToImage || 'https://www.freeiconspng.com/img/23483'}" alt="${article.source.name}" width="300" height="300"/>
                    </div>
                    <h5>${article.author || 'Unknown'}</h5>
                    <p>${article.description || ''}</p>
                </div>`
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

form.addEventListener("submit", getNews);
