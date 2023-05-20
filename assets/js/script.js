var userInput = $("#userinput");
var searchBtn = $("#searchbutton");
var recentSearches = $("#recentsearches");
var currentCity = $("#currentCity");
var currentTemp = $("#currentTemp");
var currentHumidity = $("#currentHumidity");
var currentWind = $("#currentWind");
var counter = 1;
var clickedSearch;
var inputedCity = userInput.val();
var cityLat;
var cityLon;

searchBtn.on("click", function() {
    localStorage.setItem("city" + counter, userInput.val());
    counter++;
    var storedSearch = $("<li>");
    storedSearch.addClass("history");
    storedSearch.text(userInput.val());
    currentCity.text(userInput.val());
    recentSearches.append(storedSearch);
    nameToCoordinates(userInput.val());
    $(".history").on("click", function() {
        clickedSearch = $(this).text();
        console.log(clickedSearch);
});
});

function nameToCoordinates(inputedCity) {
    var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ inputedCity + "&limit=1&appid=843b2fcaeb6b2418f5895c61c7166fcb";
    
    fetch(geocodingURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            getWeather();
            getFuture();
        })
}

function getWeather() {
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&appid=843b2fcaeb6b2418f5895c61c7166fcb";

    fetch(currentWeather)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            currentTemp.text("Temp: " + data["main"]["temp"]);
            currentHumidity.text("Humidity: " + data["main"]["humidity"]);
            currentWind.text("Wind Speed: " + data["wind"]["speed"]);
        })
}

function getFuture() {
    var futureForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=843b2fcaeb6b2418f5895c61c7166fcb";
    fetch(futureForecast)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
}