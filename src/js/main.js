'use strict';
const userInput = document.querySelector('.js-userInput');
const searchBtn = document.querySelector('.js-btnSearch');
const animeUL = document.querySelector('.js-animeList');
const favAnimeUL = document.querySelector('.js-favAnimeList');

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
    const listClicked = ev.currentTarget.id;
    
}

function listenerAnime() {
    const allAnimeList = document.querySelectorAll('.js-animes');
    for (const li of allAnimeList) {
        li.addEventListener('click', handleFavAnime)
    }
}

function renderAnimeInfo(arrList) {
    animeUL.innerHTML = '';
    for (const anime of arrList) {
        let img = anime.images.jpg.image_url;
        console.log(img)
        if (img === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            img = "https://placehold.co/210x295/90EE90/FFF/?text=ANIME";
        };
        let titles = anime.titles;
        let title = "";
        for (const oneTitle of titles) {
            if (oneTitle.type === "Default") {
                title = oneTitle.title;
            };
        }
        animeUL.innerHTML += `<li id=${anime.mal_id} class="js-animes">
          <article>
            <img src="${img}" alt="">
            <h3>${title}</h3>
          </article>
        </li>`;
    }
    listenerAnime();
}

function getDataApi(serieName) {
    fetch(`https://api.jikan.moe/v4/anime?q=${serieName}`)
    .then(resp => resp.json())
    .then(info => {
        animes = info.data;
        console.log(animes)
        renderAnimeInfo(animes);
    })
}

function handleClick(ev) {
    ev.preventDefault();
    const userSearch = userInput.value;
    getDataApi(userSearch);
}

searchBtn.addEventListener('click', handleClick);
