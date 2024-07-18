// get movie
async function getMovie() {
    //Now Playing Movie
    const dataNowPlaying = await fetchData(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`);
    const listNowPlaying = document.querySelector("#nowplay");
    renderListmovie(dataNowPlaying.results, listNowPlaying);

    //Upcoming Movie
    const dataUpcominge = await fetchData(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`);
    const listUpcoming = document.querySelector("#upcoming");
    renderListmovie(dataUpcominge.results, listUpcoming);

    //Top Rated
    const dataToprated = await fetchData(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`);
    const listToprated = document.querySelector("#toprated");
    renderListmovie(dataToprated.results, listToprated);

    //Tv Popular
    const dataTvPopular = await fetchData(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1`);
    const listTvPopular = document.querySelector("#tvpopular");
    console.log(dataTvPopular);
    renderListmovie(dataTvPopular.results, listTvPopular);
    runSlide(".listMovie_card");
}
getMovie();

// run slide banner
const imgBackground = document.querySelector(".banner_background ");
let currentIndex = 1;
function showSlide(img, index) {
    img.src = `img/original-${index}.jpg`;
}
function nextSlide() {
    currentIndex = currentIndex + 1;
    showSlide(imgBackground, currentIndex);
    if (currentIndex == 5) {
        currentIndex = 0;
    }
}
setInterval(nextSlide, 2500);
showSlide(imgBackground, currentIndex);

// scroll down
document.querySelector(".scrolldown").addEventListener("click", function () {
    let targetDiv = document.querySelector("#targetscroll");
    targetDiv.scrollIntoView({ behavior: "smooth" });
});

// Animate On Scroll
const h3 = document.querySelectorAll(".listMovie_headline h3");
const h1 = document.querySelectorAll(".listMovie_headline h1");

h3.forEach((element) => {
    element.setAttribute("data-aos", "fade-down");
    element.setAttribute("data-aos-anchor-placement", "top-bottom");
    element.setAttribute("data-aos-duration", "1500");
});
h1.forEach((element) => {
    element.setAttribute("data-aos", "fade-up");
    element.setAttribute("data-aos-anchor-placement", "top-bottom");
    element.setAttribute("data-aos-duration", "1500");
});
