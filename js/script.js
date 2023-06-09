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
const trendingMovies = document.getElementById("trendingMovies");
const searchbar = document.getElementById("searchbar");

// Gömmer resultatrubrikerna, innan sökning
trendingMovies.style.display = "none";
resultTitle.style.display = "none";

if ( searchFilter.value === "all" && searchText.value === "") {
    window.onload = async function (event) {
    event.preventDefault()

    var results = await searchTrending(trendingMovieURL); 
    
    renderPopularMovies(results);
    trendingMovies.style.display = "block";
    resultTitle.style.display = "none";
  }
}

searchText.onkeydown = async function (event) {
  if (searchText.value != "") {
    if (event.key === "Enter" || searchBtn.clicked == true) {
      event.preventDefault()

      let searchTerm = searchText.value; // Hämtar det som står i sökrutan

      // Det här anropas funktionen för att hämta info från ett API.
      // Vi väntar på svaret med await
      var results = await search(searchTerm);
      if (searchFilter.value === "movie") {
        renderMovieResults(results);
      }
      else if (searchFilter.value === "tvShows") {
        renderTVshowsResults(results);
      }
      else if (searchFilter.value === "celeb") {
        renderCelebResults(results);
      } else {
        renderUnfilteredMovies(results);
      }
      
      resultTitle.style.display = "block";
      searchText.value = "";
      trendingMovies.style.display = "none";
    }
  }
}

async function searchTrending(trendingSearchUrl) {

  let response = await fetch(trendingSearchUrl)

  let json = await response.json()
  return json
} 

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

  //Här används URLen för att göra anrop med den inbyggda funktionen fetch()
  let response = await fetch(searchUrl)

  // Detta gör om resultatet från APIet till ett JSON-objekt.
  let json = await response.json()
  return json
}

function renderMovieResults(results) {
  let resultDiv = document.getElementById("searchresults");

  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.poster_path;
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.original_title + "</div>"+ "</div>")
  }
}

function renderTVshowsResults(results) {
  let resultDiv = document.getElementById("searchresults");

  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.poster_path;
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.name + "</div>"+ "</div>")
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectInfoContainer'>" + "<div id='objectInfoImg'>" + "<img src=" + imgPath +"width='25%'>" + "</div>" + "<div id='objectInfoTitle'" + object.name + " " + object.release_date + "</div>" + "<div id='objectInfoPlot'" + object.overview + "</div>" + "</div>" + "<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.name + "</div>" + "</div>" );
  }
}

function renderCelebResults(results) {
  let resultDiv = document.getElementById("searchresults");

  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.profile_path;
    console.log('kommer sölka efete', object)
    console.log(imgPath);
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.name + "</div>"+ "</div>")
  }
}

function renderUnfilteredMovies(results) {
  let resultDiv = document.getElementById("searchresults");

  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index];
    const imgPath = imgURL + object.poster_path;
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.original_title + "</div>" + "</div>");
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectInfoContainer'>" + "<div id='objectInfoImg'>" + "<img src=" + imgPath +" width:25%>" + "</div>" + "<div id='objectInfoTitle'" + object.original_title + " " + object.release_date + "</div>" + "<div id='objectInfoPlot'" + object.overview + "</div>" + "</div>");
  }
}

function renderPopularMovies(results) {
    let resultDiv = document.getElementById("searchresults");

    let allObjects = results.results;
    resultDiv.innerHTML = "";

    // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
    for (let index = 0; index < allObjects.length; index++) {
      const object = allObjects[index];
      const imgPath = imgURL + object.poster_path;
      resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectName'>" + object.original_title + "</div>" + "</div>");
      resultDiv.insertAdjacentHTML("beforeend","<div id='objectInfoContainer'>" + "<div id='objectInfoImg'>" + "<img src=" + imgPath +" width:25%>" + "</div>" + "<div id='objectInfoTitle'" + object.original_title + " " + object.release_date + "</div>" + "<div id='objectInfoPlot'" + object.overview + "</div>" + "</div>");
    }
}

/* Visar burger menyn */
function openBurgNav() {
  document.getElementById("myNav").style.height = "100%";
}

/* "Stänger" burger menyn */
function closeBurgNav() {
  document.getElementById("myNav").style.height = "0%";
}

function openSecBurgNav() {
  document.getElementById("mySecNav").style.height = "100%";
}

function closeSecBurgNav() {
  document.getElementById("mySecNav").style.height = "0%";
}