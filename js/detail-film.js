//show cast
const url = new URL(window.location.href);
const movieId = url.searchParams.get("id");
async function getCast() {
    const dataCast = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    const listCast = document.querySelector(".cast_list");
    dataCast.cast.forEach((element) => {
        listCast.innerHTML += `<a href="detail-actor.html?id=${element.id}" class="actor">
                                <div class="thumb">
                                    <img src= ${
                                        element.profile_path ? `https://image.tmdb.org/t/p/w300${element.profile_path}` : "img/avatar.png"
                                    }  alt="" />
                                </div>
                                <div class="content-film">
                                    <h3 class="cast_name">${element.character}</h3>
                                    <p>Jeff Morales (voice)</p>                               
                                </div>
                            </a>`;
    });
    runSlide(".cast_list");
}
getCast();

//show detail
const imgDetailFilm = document.querySelector(".detailfilm_left .thumb img");
const detailFilm = document.querySelector(".detailfilm_right-frame");
const detailfilmBg = document.querySelector(".detailfilm");

async function showDetail() {
    let dataFilm = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    imgDetailFilm.src = `https://image.tmdb.org/t/p/w300${dataFilm.poster_path}`;
    detailfilmBg.style.background = `linear-gradient(to top, rgba(17, 29, 29, 0.93), rgba(17, 29, 29, 0.93)), url("https://image.tmdb.org/t/p/w300${dataFilm.backdrop_path}")`;
    detailfilmBg.style.backgroundSize = `cover`;
    detailFilm.innerHTML = ` <h3>${dataFilm.original_title ? dataFilm.original_title : dataFilm.original_name}</h3>
                <ul>
                    <li><span>${dataFilm.vote_average.toFixed(2)}%</span> User core</li>
                    <li><i class="fa-regular fa-calendar"></i>${dataFilm.release_date}</li>
                    <li><i class="fa-regular fa-clock"></i> <span>${dataFilm.runtime}</span> Min</li>
                </ul>
                <p class="slogan">${dataFilm.tagline}</p>
                <div class="genre">
                    <p class="genre_title">Genre :</p>
                    <p class="genre_text">${dataFilm.genres.map((item) => " " + item.name)}</p>
                </div>
                <div class="overview">
                    <p class="overview_title">Overview :</p>
                    <p class="overview_text">
                        ${dataFilm.overview}
                    </p>`;
}
showDetail();

//show recommend
async function showRecommend() {
    const recommendList = document.querySelector(".recommend_list");
    let dataRecommend = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`);
    console.log(dataRecommend);
    dataRecommend.results.forEach((element) => {
        recommendList.innerHTML += `<div class="frame">
                                <img src=${
                                    element.author_details.avatar_path
                                        ? `https://image.tmdb.org/t/p/w300${element.author_details.avatar_path}`
                                        : "img/avatar.png"
                                }  alt="img" />
                                <div class="recommend_list-content">
                                    <p class="name-content">${element.author}</p>
                                    <p class="text-content">
                                        ${element.content}
                                    </p>
                                    <p class="show-text" onclick="showMore(event)">Show more</p>
                                </div>
                            </div>`;
    });
}
showRecommend();

//show trailer
const trailer = document.querySelector(".trailer");
const trailerFilm = document.querySelector(".trailer_film ");
const trailerPlay = document.querySelector(".detailfilm_left-play");

trailerPlay.addEventListener("click", async function () {
    trailer.classList.add("active");
    let video = await renderTrailer();

    trailerFilm.innerHTML = `<iframe 
                            src="https://www.youtube.com/embed/${video.key}?si=-5xogG45gxi7nFUe" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>`;
});
trailer.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        trailer.classList.remove("active");
        trailerFilm.innerHTML = "";
    }
});
async function renderTrailer() {
    const API_TRAILER = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;
    let dataTrailer = await fetchData(API_TRAILER);
    let findTrailer = dataTrailer.results.find((element) => element.type === "Trailer");
    return findTrailer;
}
renderTrailer();
