let page = 1;
async function renderPeople() {
    const dataPeople = await fetchData(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}`);
    const listPeople = document.querySelector(".list");
    dataPeople.results.forEach((element) => {
        listPeople.innerHTML += `<a href="detail-actor.html?id=${element.id}" class="cardMovie" data-aos="flip-left">
        <div class="thumb" >
                <img src="${element.profile_path ? `https://image.tmdb.org/t/p/w300${element.profile_path}` : "img/screen.jpg"}" alt="img" />
        </div>
        <div class="content-film">
            <h3>${element.name}</h3>
        </div>
    </a>`;
    });
}

renderPeople();

// show more list movie
const moreButton = document.querySelector(".showmore");
moreButton.addEventListener("click", async function () {
    page++;
    await renderPeople();
});
