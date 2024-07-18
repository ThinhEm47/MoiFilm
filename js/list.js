// show list movie
const url = new URL(window.location.href);
const type = url.searchParams.get("type");
const GENRE_ID = url.searchParams.get("id");
const query = url.searchParams.get("query");

const title = document.querySelector(".banner-02 .banner_content h1");
let page = 1;

if (GENRE_ID) {
    title.innerHTML = type;
} else {
    title.innerHTML = type == "movie" ? "Movies" : "TV Show";
}

async function renderMovie() {
    const listMovie = document.querySelector(".list");
    if (query) {
        let dataSearch = await fetchData(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
        title.innerHTML = "Search";
        renderListmovie(dataSearch.results, listMovie);
    } else {
        if (GENRE_ID) {
            const dataGenre = await fetchData(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_ID}&page=${page}`);
            renderListmovie(dataGenre.results, listMovie);
        } else {
            const dataMoive = await fetchData(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&page=${page}`);
            renderListmovie(dataMoive.results, listMovie);
        }
    }
}
renderMovie();

// show more list movie
const moreButton = document.querySelector(".showmore");
moreButton.addEventListener("click", async function () {
    page++;
    await renderMovie();
});
