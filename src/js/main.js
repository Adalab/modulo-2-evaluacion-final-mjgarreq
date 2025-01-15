'use strict';
const userInput = document.querySelector('.js-userInput');
const searchBtn = document.querySelector('.js-btnSearch');
const animeUL = document.querySelector('.js-animeList');
const favAnimeUL = document.querySelector('.js-favAnimeList');
const sectionAnimes = document.querySelector('.js-sectionAnimes');

let animes = [];
let favAnimes = [];

/*
 <li>
          <article>
            <img src="https://placehold.co/600x400?text=Hello+World" alt="">
            <h3>naruto</h3>
          </article>
 </li>
*/

function handleFavAnime(ev) {
    //almaceno el id del li que está clicando
    const liClickedId = parseInt(ev.currentTarget.id); //lo convierto a número porque me devuelve un string
    
    //busco el anime a paritr del id con el método find
    const animeSelected = animes.find((oneAnime) => oneAnime.mal_id === liClickedId);
    

    //comprobamos que el animeSelected no está guarado en el array de favAnimes mediante el método findIndex, que nos devuelve su posición (sabemos que si no está en el array, nos devuelve -1)
    const indexFavAnimeSel = favAnimes.findIndex(animeClicked => animeClicked.mal_id === liClickedId);
    if (indexFavAnimeSel === -1) {
        favAnimes.push(animeSelected);
    }

    //usamos la función localStorage para que el servidor guarde el array de favAnimes
    localStorage.setItem('favAnimes', JSON.stringify(favAnimes));

    renderAnimeInfo(favAnimes, favAnimeUL);
}


function listenerAnime() {
    //almaceno en una constante todos los li que hay
    const allAnimeList = document.querySelectorAll('.js-animes');
    for (const li of allAnimeList) {
        //escucho un evento sobre cada li
        li.addEventListener('click', handleFavAnime)
    }
}

//pintar lista con parámetro de entrada (cada vez podré llamar a una lista distinta si lo necesito)
function renderAnimeInfo(arrList, UL) {
    UL.innerHTML = '';
    for (const anime of arrList) {
        //almaceno en una variable el valor de la imagen
        let img = anime.images.jpg.image_url;
        if (img === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            img = "https://placehold.co/210x295/90EE90/FFF/?text=ANIME";
        };
        //almaceno en una variable el array de titles (hay otras propiedades que almacenan el título y no son array, pero he visto en la documentación de la API que el uso está deprecado)
        let titles = anime.titles;
        //itero sobre el array de titles y asigno a la variable title el elemento con tipo Default 
        let title = "";
        const titleSpanish = titles.find(title => title.type === "Spanish");
        if (titleSpanish) {
            title = titleSpanish.title;
        } else {
            const titleDefault = titles.find(title => title.type === "Default");
            title = titleDefault.title;
        }
        
        //verificamos si el anime está en el array de fav mediante el método find
        const findAnimeFav = favAnimes.find(animeFav => animeFav.mal_id === anime.mal_id);
        let css = '';

        if (findAnimeFav) {
            css = 'selected';
            sectionAnimes.classList.add('animeSection')
        } else {
            css = '';
        }

        const li = document.createElement('li');
        UL.appendChild(li);
        li.setAttribute('id', anime.mal_id);
        li.setAttribute('class', `js-animes`);

        const article = document.createElement('article');
        article.setAttribute('class', `${css}`);
        li.appendChild(article);

        const image = document.createElement('img');
        image.src = img;

        const h3 = document.createElement('h3');
        const titleh3 = document.createTextNode(title);
        h3.appendChild(titleh3);

        article.append(image, h3);


        // UL.innerHTML += `<li id=${anime.mal_id} class="js-animes">
        //   <article class="${css}">
        //     <img src="${img}" alt="">
        //     <h3>${title}</h3>
        //   </article>
        // </li>`;
    }
    listenerAnime();
}

//peticion al servidor con parámetro de entrada que es el input de la usuaria
function getDataApi(serieName) {
    fetch(`https://api.jikan.moe/v4/anime?q=${serieName}`)
    .then(resp => resp.json())
    .then(info => {
        animes = info.data;
        console.log(animes)
        renderAnimeInfo(animes, animeUL);
    })
}

function handleClick(ev) {
    ev.preventDefault();
    //almacenar lo que escribe la usuaria
    const userSearch = userInput.value;
    getDataApi(userSearch);
}

searchBtn.addEventListener('click', handleClick);

//obtengo los datos de LS para saber si tengo almacenado algo, y si hay algo, lo pinto en el html
const favAnimesLS = localStorage.getItem('favAnimes');
if (favAnimesLS) {
    favAnimes = JSON.parse(favAnimesLS);
    renderAnimeInfo(favAnimes, favAnimeUL);
}