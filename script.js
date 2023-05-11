let movieData = [];
let nameData = [];
let tvShowData = [];
let genres = [];
let genreData = [];

//  API Key
const apiKey = "7f26946c05328556f6f899a4d314a61d";

const discoverMovieURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const trendingMovieURL = `https://api.themoviedb.org/3/trending/movie/week?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

// Search End-Points
const searchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const searchPerson = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=`;
const searchTvShow = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&include_adult=false&query=`;

// Get Movie Image
const imgURL = "https://image.tmdb.org/t/p/w500";

// Get Filter variables
const searchText = document.getElementById("txtSearch");
const searchBtn = document.getElementById("searchBtn");
const searchFilter = document.getElementById("filterMovies");
const resultTitle = document.getElementById("resultTitle");
const trendingMoviesFilter = document.getElementById("filterBtn");
const trendingMovies = document.getElementById("trendingMovies");
const searchbar = document.getElementById("searchbar");

// Gömmer resultatrubrikerna, innan sökning
trendingMovies.style.display = "none";
resultTitle.style.display = "none";

trendingMoviesFilter.onclick = async function (event) {
  event.preventDefault()

  var results = await searchTrending(trendingMovieURL); 
  
  renderPopularMovies(results);
  trendingMovies.style.display = "block";
  resultTitle.style.display = "none";
}

searchText.onkeydown = async function (event) {
  if (searchText.value != "") {
    if (event.key === "Enter" || searchBtn.clicked == true) {
      event.preventDefault()

      let searchTerm = searchText.value; // Hämtar det som står i sökrutan
      console.log("Kommer söka efter", searchTerm);

      // Det här anropas funktionen för att hämta info från ett API.
      // Vi väntar på svaret med await
      var results = await search(searchTerm);
      if (searchFilter.value === "all") {
        renderUnfilteredResults(results);
      }
      else if (searchFilter.value === "movie") {
        renderMovieResults(results);
      }
      else if(searchFilter.value === "tvShows") {
        renderTVshowsResults(results);
      }
      else if(searchFilter.value === "celeb") {
        renderCelebResults(results);
      }
      
      resultTitle.style.display = "block";
      searchText.value = "";
      trendingMovies.style.display = "none";
    }
  }
}

async function searchTrending(trendingSearchUrl) {
  console.log("Den URL kommer vi att anropa: ", trendingSearchUrl)

  let response = await fetch(trendingSearchUrl)

  let json = await response.json()
  return json
} 

// Detta är en asynkron funktion som anropar ett API och returnerar svaret som ett JSON-objekt.
async function search(searchString) {
  // Använd funktionen fetch för att anropa ett API med rätt parametrar.
  var searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchString}&api_key=${apiKey}`
  if (searchFilter.value === "movie") {
    searchUrl = searchMovie + `${searchString}`;
  }
  else if (searchFilter.value === "tvShows") {
    searchUrl = searchTvShow + `${searchString}`;
  }
  else if (searchFilter.value === "celeb") {
    searchUrl = searchPerson + `${searchString}`;
  }
  
  console.log("Den URL vi kommer anropa: ", searchUrl)

  //Här används URLen för att göra anrop med den inbyggda funktionen fetch()
  let response = await fetch(searchUrl)

  // Detta gör om resultatet från APIet till ett JSON-objekt.
  let json = await response.json()
  return json
}

function renderUnfilteredResults(results) {
  let resultDiv = document.getElementById("searchresults")

  console.log("resultatet: ", results);

  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.poster_path;
    console.log(imgPath);
    console.log("loopar igenom objekten ", object);
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.original_title + "</div>"+ "</div>")
  }
}

function renderMovieResults(results) {
  let resultDiv = document.getElementById("searchresults");

  console.log("resultatet: ", results);
  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.poster_path;
    console.log(imgPath);
    console.log("loopar igenom objekten ", object);
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.original_title + "</div>"+ "</div>")
  }
}

function renderTVshowsResults(results) {
  let resultDiv = document.getElementById("searchresults");

  console.log("resultatet: ", results);
  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.poster_path;
    console.log(imgPath);
    console.log("loopar igenom objekten ", object);
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectInfoContainer'>" + "<div id='objectInfoImg'>" + "<img src=" + imgPath +"width='25%'>" + "</div>" + "<div id='objectInfoTitle'" + object.original_title + " " + object.release_date + "</div>" + "<div id='objectInfoPlot'" + object.overview + "</div>" + "</div>" + "<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.original_title + "</div>" + "</div>" );
  }
}

function renderCelebResults(results) {
  let resultDiv = document.getElementById("searchresults");

  console.log("resultatet: ", results);
  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.poster_path;
    console.log(imgPath);
    console.log("loopar igenom objekten ", object);
    // resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.name + "</div>"+ "</div>")
  }
}

function renderPopularMovies(results) {
    let resultDiv = document.getElementById("searchresults");

    console.log("resultatet: ", results);
    let allObjects = results.results;
    resultDiv.innerHTML = "";

    // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
    for (let index = 0; index < allObjects.length; index++) {
      const object = allObjects[index];
      const imgPath = imgURL + object.poster_path;
      console.log(imgPath);
      console.log("loopar igenom objekten ", object);
      resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.original_title + "</div>" + "</div>");
      resultDiv.insertAdjacentHTML("beforeend","<div id='objectInfoContainer'>" + "<div id='objectInfoImg'>" + "<img src=" + imgPath +" width:25%>" + "</div>" + "<div id='objectInfoTitle'" + object.original_title + " " + object.release_date + "</div>" + "<div id='objectInfoPlot'" + object.overview + "</div>" + "</div>");
    }
}

const objectImg = document.getElementById('objectImg');
const objectInfoContainer = document.getElementById('objectInfoContainer');

// objectImg.onclick = function (e) {
//   e.preventDefault()

//   objectInfoContainer.style.opacity = '1';
// }

/* Open */
function openBurgNav() {
  document.getElementById("myNav").style.height = "100%";
}

/* Close */
function closeBurgNav() {
  document.getElementById("myNav").style.height = "0%";
}