'use strict';
const userInput = document.querySelector('.js-userInput');
const searchBtn = document.querySelector('.js-btnSearch');
const animeUL = document.querySelector('.js-animeList');
const favAnimeUL = document.querySelector('.js-favAnimeList');
const sectionAnimes = document.querySelector('.js-sectionAnimes');
const resetFavBtn = document.querySelector('.js-resetFavBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const h2FavAnimes = document.querySelector('.js-titleFavAnimes');
const h2Animes = document.querySelector('.js-titleAnimes');

let animes = [];
let favAnimes = [];


function handleFavAnime(ev) {
    //almaceno el id del li que está clicando
    const liClickedId = parseInt(ev.currentTarget.id); //lo convierto a número porque me devuelve un string
    
    //busco el anime a partir del id con el método find
    const animeSelected = animes.find((oneAnime) => oneAnime.mal_id === liClickedId);
    

    //comprobamos que el animeSelected no está guarado en el array de favAnimes mediante el método findIndex, que nos devuelve su posición (sabemos que si no está en el array, nos devuelve -1)
    const indexFavAnimeSel = favAnimes.findIndex(animeClicked => animeClicked.mal_id === liClickedId);
    let listItem = ev.currentTarget;

    if (indexFavAnimeSel === -1) {
        favAnimes.push(animeSelected);
        listItem.setAttribute('class', 'js-animes selected');
        resetFavBtn.classList.remove('hidden');
        h2FavAnimes.classList.remove('hidden');
    } else {
        favAnimes.splice(indexFavAnimeSel, 1);
        listItem.setAttribute('class', 'js-animes');
        h2FavAnimes.classList.add('hidden');
        animeUL.classList.remove('searchAnimeList');
        if (favAnimes.length <= 0) {
            resetFavBtn.classList.add('hidden');
        }
    }

    //usamos la función localStorage para que el servidor guarde el array de favAnimes
    localStorage.setItem('favAnimes', JSON.stringify(favAnimes));

    renderFavAnime();
}


function listenerAnime() {
    //almaceno en una constante todos los li que hay
    const allAnimeList = document.querySelectorAll('.js-animes');
    for (const li of allAnimeList) {
        //escucho un evento sobre cada li
        li.addEventListener('click', handleFavAnime)
    }
}

function handleClickClose(ev) {
    ev.preventDefault();
    
    //almaceno el id del btn que está clicando
    const btnClickedId = parseInt(ev.currentTarget.id); 
    

    const indexFavAnimeBtn = favAnimes.findIndex(animeClicked => animeClicked.mal_id === btnClickedId);



    
    favAnimes.splice(indexFavAnimeBtn, 1);
        if (favAnimes.length <= 0) {
            resetFavBtn.classList.add('hidden');
            h2FavAnimes.classList.add('hidden');
            animeUL.classList.remove('searchAnimeList');
        }


    // localStorage.setItem('favAnimes', JSON.stringify(favAnimes));
    
    renderFavAnime();
    renderAnimeInfo();
    console.log(btnClickedId)
    console.log(favAnimes)
    console.log(indexFavAnimeBtn)
}

function listenerCloseAnime() {
    const closeBtn = document.querySelectorAll('.js-close-btn');
    for (const oneBtn of closeBtn) {
        oneBtn.addEventListener('click', handleClickClose);
    }
    
}

function renderFavAnime () {
    favAnimeUL.innerHTML = '';
    for (const anime of favAnimes) {
        let img = anime.images.jpg.image_url;
        if (img === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            img = "https://placehold.co/210x295/90EE90/FFF/?text=ANIME";
        };
        
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

        sectionAnimes.classList.add('animeSection');
        animeUL.classList.add('searchAnimeList');
        
        const li = document.createElement('li');
        favAnimeUL.appendChild(li);
        li.setAttribute('id', anime.mal_id);
        li.setAttribute('class', `js-animes`);

        const article = document.createElement('article');
        article.setAttribute('class', 'sectionFavAnimes_article')
        

        const image = document.createElement('img');
        image.src = img;
        image.setAttribute('class', 'imgFavAnime')

        const h3 = document.createElement('h3');
        const titleh3 = document.createTextNode(title);
        h3.setAttribute('class', 'sectionFavAnimes_article-title')
        h3.appendChild(titleh3);

        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('class',`js-close-btn`);
        closeBtn.setAttribute('id', anime.mal_id);

        const i = document.createElement('i');
        i.setAttribute('class', 'fa-solid fa-xmark')
        closeBtn.appendChild(i);

        
        article.append(image, h3);
        li.append(article, closeBtn);
    
    }
    listenerCloseAnime();
}

//pintar lista con parámetro de entrada (cada vez podré llamar a una lista distinta si lo necesito)
function renderAnimeInfo() {
    animeUL.innerHTML = '';
    for (const anime of animes) {
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
        }
        

        const li = document.createElement('li');
        animeUL.appendChild(li);
        li.setAttribute('id', anime.mal_id);
        li.setAttribute('class', `js-animes ${css}`);

        const article = document.createElement('article');
        article.setAttribute('class', 'sectionSearchAnimes_article')
        li.appendChild(article);

        const image = document.createElement('img');
        image.src = img;
        image.setAttribute('class', 'imgSrchAnime')

        const h3 = document.createElement('h3');
        const titleh3 = document.createTextNode(title);
        h3.setAttribute('class', 'sectionSearchAnimes_article-title')
        h3.appendChild(titleh3);
        
        article.append(image, h3);
        
        

        // UL.innerHTML += `<li id=${anime.mal_id} class="js-animes">
        //   <article class="${css}">
        //     <img src="${img}" alt="">
        //     <h3>${title}</h3>
        //   </article>
        //   <button class="js_close-btn ${display}">
        //       <i class="fa-solid fa-xmark"></i>
        //   </button>
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
        renderAnimeInfo();
    })
}

function handleClick(ev) {
    ev.preventDefault();
    //almacenar lo que escribe la usuaria
    const userSearch = userInput.value;
    h2Animes.classList.remove('hidden');
    getDataApi(userSearch);
}

searchBtn.addEventListener('click', handleClick);

//Escuchamos evento sobre el botón resetFav y creamos función para que lleve el array a 0, se guarde en LS, llame a las dos funciones render y quite las clases que no queremos
function handleResetFav (ev) {
    ev.preventDefault();
    favAnimes = [];
    sectionAnimes.classList.remove('animeSection');
    renderFavAnime();
    renderAnimeInfo();
    resetFavBtn.classList.add('hidden');
    h2FavAnimes.classList.add('hidden');
    localStorage.setItem('favAnimes', JSON.stringify(favAnimes));
}

resetFavBtn.addEventListener('click', handleResetFav);

//Escuchamos evento sobre el botón Reset para que lleve todos los valores de la página a inicio
function handleResetAll(ev) {
    ev.preventDefault();
    favAnimes = [];
    animes = [];
    renderAnimeInfo();
    renderFavAnime();
    userInput.value = '';
    resetFavBtn.classList.add('hidden');
    sectionAnimes.classList.remove('animeSection');
    h2Animes.classList.add('hidden');
    h2FavAnimes.classList.add('hidden');
    animeUL.classList.remove('searchAnimeList');
    localStorage.setItem('favAnimes', JSON.stringify(favAnimes));
}

resetBtn.addEventListener('click', handleResetAll);

//obtengo los datos de LS para saber si tengo almacenado algo, y si hay algo, lo pinto en el html
const favAnimesLS = localStorage.getItem('favAnimes');
if (favAnimesLS) {
    favAnimes = JSON.parse(favAnimesLS);
    resetFavBtn.classList.remove('hidden');
    h2FavAnimes.classList.remove('hidden');
    if (favAnimes.length <= 0){
        resetFavBtn.classList.add('hidden');
        h2FavAnimes.classList.add('hidden');
    }
    
    renderFavAnime();
    animeUL.classList.remove('searchAnimeList');
}