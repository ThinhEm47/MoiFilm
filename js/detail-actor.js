const url = new URL(window.location.href);
const ID_ACTOR = url.searchParams.get("id");

// show detail actor
let imgActor = document.querySelector(".detailactor_left img");
let showTitle = document.querySelector(" .text-biography");

// show title actor--->

async function showDetailActor() {
    let rightActor = document.querySelector(".detailactor_right");
    let dataActor = await fetchData(`https://api.themoviedb.org/3/person/${ID_ACTOR}?api_key=${API_KEY} `);
    console.log(dataActor);
    imgActor.src = `https://image.tmdb.org/t/p/w300${dataActor.profile_path}`;
    rightActor.innerHTML = ` <h3>${dataActor.name}</h3>
    <div class="detailactor_right-info">
        <div class="info">
            <div class="sub-info">
                <p class="info-title">Know for :</p>
                <p class="text">${dataActor.name}</p>
            </div>
            <div class="sub-info">
                <p class="info-title">Popularity :</p>
                <p class="text">${dataActor.popularity}</p>
            </div>
        </div>
        <div class="info">
            <div class="sub-info">
                <p class="info-title">Birthday :</p>
                <p class="text">${dataActor.birthday}</p>
            </div>
            <div class="sub-info">
                <p class="info-title">Place of Birth :</p>
                <p class="text">${dataActor.place_of_birth}</p>
            </div>
        </div>
    </div>
    <div class="know">
        <p class="title">Also Know As :</p>
        <p class="text-know">
        ${dataActor.also_known_as}
        </p>
    </div>
    <div class="biography">
        <p class="title">Biography :</p>
        <p class="text-content">
        ${dataActor.biography}
        </p>
    </div>
    <p class="show-text" onclick="showMore(event)">Show more</p>
</div>`;
    const textContainer = document.querySelector(".text-content");
    console.log(textContainer);
    hideShow(textContainer);
}
showDetailActor();
//show movie cast
async function getMovieCast() {
    const dataMoiveCast = await fetchData(`https://api.themoviedb.org/3/person/${ID_ACTOR}/movie_credits?api_key=${API_KEY}`);
    console.log(dataMoiveCast);
    const listMoive = document.querySelector(".moviecast_list");

    renderListmovie(dataMoiveCast.cast, listMoive);
    runSlide(".moviecast_list");
}
getMovieCast();
