let movieData = [];
let nameData = [];
let tvShowData = [];
let genres = [];
let genreData = [];

//  API Key
const apiKey = "7f26946c05328556f6f899a4d314a61d";

const discoverMovieURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const trendingMovieURL = `https://api.themoviedb.org/3/trending/movie/week?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

// Get Genres
const GenreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

// Search End-Points
const searchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const searchPerson = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=`;
const searchTvShow = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&include_adult=false&query=`;
const searchGenre = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=`;

// Get Movie Image
const imgURL = "https://image.tmdb.org/t/p/w500";

// Get Filter variables
const searchText = document.getElementById("txtSearch");
const searchFilter = document.getElementById("filterMovies");
const resultTitle = document.getElementById("resultTitle");
const trendingMoviesFilter = document.getElementById("filterBtn");
const currentCategory = document.getElementById("currentCategory");


currentCategory.style.display = "none";
resultTitle.style.display = "none";


trendingMoviesFilter.onclick = async function (event) {
  event.preventDefault()

  var results = await searchTrending(trendingMovieURL); 
  
  renderPopularResults(results);
  currentCategory.style.display = "block";
}

searchText.onkeydown = async function (event) {
  if (searchText.value != "") {
      if (event.key === "Enter") {
          event.preventDefault()

          let searchTerm = searchText.value // Hämtar det som står i sökrutan
          console.log("Kommer söka efter", searchTerm);

          // Det här anropas funktionen för att hämta info från ett API.
          // Vi väntar på svaret med await
          var results = await search(searchTerm);

          renderResults(results);
          
          resultTitle.style.display = "block";
          searchText.value = "";
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
    searchUrl = searchMovie;
  }
  else if (searchFilter.value === "tvShows") {
    searchUrl = searchTvShow;
  }
  else if (searchFilter.value === "genres") {
    searchUrl = searchGenre;
  }
  else if (searchFilter.value === "celeb") {
    searchUrl = searchPerson;
  }
  else {
    searchUrl = searchUrl
  }
  console.log("Den URL vi kommer anropa: ", searchUrl)

  //Här används URLen för att göra anrop med den inbyggda funktionen fetch()
  let response = await fetch(searchUrl)

  // Detta gör om resultatet från APIet till ett JSON-objekt.
  let json = await response.json()
  return json
}

/*
  Den här funktionen går igenom sökresultatet som är parametern "results"
  och skriver ut det i en lista i DOMen.
*/
function renderResults(results) {
  let resultDiv = document.getElementById("searchresults")

  console.log("resultatet: ", results);

  let allObjects = results.results;
  resultDiv.innerHTML = "";

  // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
  for (let index = 0; index < allObjects.length; index++) {
    const object = allObjects[index]
    const imgPath = imgURL + object.poster_path
    console.log(imgPath);
    console.log("loopar igenom objekten ", object);
    resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectInfo'>" + object.original_title + "</div>"+ "</div>")
  }
}

function renderPopularResults(results) {
    let resultDiv = document.getElementById("searchresults");

    console.log("resultatet: ", results);
    let allObjects = results.results;

    // Den här loopen används för att lägga in något i DOMen för varje objekt (film) i resultatet.
    for (let index = 0; index < allObjects.length; index++) {
      const object = allObjects[index];
      const imgPath = imgURL + object.poster_path;
      console.log(imgPath);
      console.log("loopar igenom objekten ", object);
      resultDiv.insertAdjacentHTML("beforeend","<div id='objectContainer'>" + "<div id='objectImg'>" +"<img src=" + imgPath +" width:25%;>" +"</div>" + "<div id='objectInfo'>" + object.original_title + "</div>"+ "</div>")
    }
}

$("#inpt_search").on('focus', function () {
	$(this).parent('label').addClass('active');
});

$("#inpt_search").on('blur', function () {
	if($(this).val().length == 0)
		$(this).parent('label').removeClass('active');
});