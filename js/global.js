// Fetch data
const API_KEY = "e9e9d8da18ae29fc430845952232787c";
async function fetchData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        alert(err);
    }
}

// side show
function runSlide(list) {
    $(list).slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    });
}

//render header
function renderHeader() {
    let frameHear = document.querySelector(".header");
    frameHear.innerHTML = `<div class="container">
                <a href="index.html" class="header_logo"> <img src="img/moifilm-logo.png" /> </a>
                <div class="header_menu">
                    <ul>
                        <li><a href="index.html">HOME</a></li>
                        <li><a href="movie.html?type=movie">MOVIES</a></li>
                        <li><a href="movie.html?type=tv">TV SHOWS</a></li>
                        <li><a href="people.html">PEOPLE</a></li>
                        <li class="genre">
                            <a  href="javascript:;">GENRE</a>
                            <ul class="header_menu-sub"></ul>
                        </li>
                    </ul>
                </div>
                
                <div class="header_search">
                    <input type="text" placeholder="Search for a movie" />
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <div class="header_bars">
                    <i class="fa-solid fa-bars"></i>
                </div>
                </div>
                    <div class="preloader">
                    <div class="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>`;
}
renderHeader();

//render footer
function renderFoot() {
    let frameFoot = document.querySelector(".footer");
    frameFoot.innerHTML = ` <div class="footer_top">
                <div class="container">
                    <div class="left">
                        <p class="trail">TRIAL START FIRST 30 DAYS.</p>
                        <p class="email">Enter your email to create or restart your membership.</p>
                    </div>
                    <div class="right">
                        <input type="text" placeholder="Enter your email" />
                        <a href="">Get Stared</a>
                    </div>
                </div>
            </div>
            <div class="footer_bottom">
                <div class="container">
                    <img src="img/moifilm-logo.png" alt="logo" />
                    <ul class="footer_bottom-menu">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="movie.html?type=movie">TV Shows</a></li>
                        <li><a href="movie.html?type=tv">Movies</a></li>
                        <li><a href="people.html">People</a></li>
                    </ul>
                    <ul class="footer_bottom-icon">
                        <li>
                            <a href="https://www.facebook.com/hvthinh27" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fa-brands fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fa-brands fa-pinterest-p"></i></a>
                        </li>
                        <li>
                            <a href=""><i class="fa-brands fa-twitter"></i></a>
                        </li>
                    </ul>
                    <p class="coder">© 2024 <span>MoiFilm</span>. All Rights Reserved by <span>ThinhEm</span></p>
                </div>`;
}
renderFoot();

// render list movie
function renderListmovie(dataResult, listMoviecard) {
    dataResult.forEach((element) => {
        listMoviecard.innerHTML += `<a href="detail-film.html?id=${element.id}&type=${
            element.title ? "movie" : "tv"
        }" class="cardMovie" data-aos="zoom-in-down" data-aos-duration="1500">
            <div class="thumb">
                <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="" />
            </div>
            <div class="content-film">
            <h3>${element.title ? element.title : element.name}</h3>
            <div class="time">
                <p class="day">${element.release_date ? element.release_date : element.first_air_date}</p>
                <p class="rate">
                    <i class="fa-solid fa-star"></i>
                    ${element.vote_average.toFixed(1)}
                </p>
            </div>
            </div>
        </a> `;
    });
}

// scroll header
window.addEventListener("scroll", function () {
    let header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// get genre
async function getGenre() {
    const data = await fetchData(` https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const headerSubmenu = document.querySelector(".header_menu-sub");
    data.genres.forEach((element) => {
        headerSubmenu.innerHTML += `<li><a href="movie.html?type=${element.name}&id=${element.id}">${element.name}</a></li>`;
    });
}
getGenre();

//
const bars = document.querySelector(".header_bars");
const menu = document.querySelector(".header_menu");
const header = document.querySelector(".header");

// click bars show menu
bars.addEventListener("click", function () {
    menu.classList.add("active");
    header.classList.add("active");
});

// click remove show menu
header.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        menu.classList.remove("active");
        header.classList.remove("active");
    }
});

// click show genre
document.querySelector(".genre").addEventListener("click", function () {
    let subMenu = document.querySelector(".header_menu-sub");
    subMenu.classList.toggle("active");
});

//show more text
function showMore(event) {
    let parent = event.target.parentElement;
    parent.querySelector(".text-content").classList.toggle("active");
    event.target.innerHTML = event.target.innerHTML == "Show more" ? "Show less" : "Show more";
}

// đếm số dòng ẩn show more
function countLines(element) {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    const height = parseFloat(style.height);
    return Math.ceil(height / lineHeight);
}

function hideShow(textContainer) {
    const showText = document.querySelector(".show-text");
    const numberOfLines = countLines(textContainer);
    console.log(numberOfLines);
    if (numberOfLines < 8) {
        showText.classList.add("active");
    } else {
        showText.classList.remove("active");
    }
}

// loading
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    preloader.classList.add("unactive");
});

// search
const inputSearch = document.querySelector(".header_search input");
const iconSearch = document.querySelector(".header_search i");

iconSearch.addEventListener("click", function () {
    window.location.href = `movie.html?query=${inputSearch.value}`;
});
inputSearch.addEventListener("keydown", function (e) {
    if (e.keyCode == "13") {
        window.location.href = `movie.html?query=${inputSearch.value}`;
    }
});
