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
    storedSearch.attr("style", "border: black 2px solid");
    storedSearch.text(userInput.val());
    currentCity.text(userInput.val() + " (" + dayjs().format("MMM D, YYYY") + ")");
    recentSearches.append(storedSearch);
    nameToCoordinates(userInput.val());
    $(".history").on("click", function() {
        clickedSearch = $(this).text();
        currentCity.text(clickedSearch);
        nameToCoordinates(clickedSearch);
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
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=843b2fcaeb6b2418f5895c61c7166fcb";

    fetch(currentWeather)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            currentTemp.text("Temperature: " + data["main"]["temp"] + "°F");
            currentHumidity.text("Humidity: " + data["main"]["humidity"] + "%");
            currentWind.text("Wind Speed: " + data["wind"]["speed"] + " MPH");
            var condition = data.weather[0]["main"];
            if (condition === "Clouds") {
                $("#iconmain").text("☁️");
            } else if (condition === "Clear") {
                $("#iconmain").text("☀️");
            } else if (condition === "Rain") {
                $("#iconmain").text("🌧️");
            } else if (condition === "Snow") {
                $("#iconmain").text("❄️");
            }
        })
}

function getFuture() {
    var futureForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=843b2fcaeb6b2418f5895c61c7166fcb";
    fetch(futureForecast)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            $("#day1date").text("Date: " + data.list[1]["dt_txt"]);
            $("#day2date").text("Date: " + data.list[2]["dt_txt"]);
            $("#day3date").text("Date: " + data.list[3]["dt_txt"]);
            $("#day4date").text("Date: " + data.list[4]["dt_txt"]);
            $("#day5date").text("Date: " + data.list[5]["dt_txt"]);
            console.log(data);
            var condition = data.list[0]["weather"][0]["main"];
            if (condition === "Clouds") {
                $("#icon1").text("☁️");
            } else if (condition === "Clear") {
                $("#icon1").text("☀️");
            } else if (condition === "Rain") {
                $("#icon1").text("🌧️");
            } else if (condition === "Snow") {
                $("#icon1").text("❄️");
            }
            var condition = data.list[1]["weather"][0]["main"];
            if (condition === "Clouds") {
                $("#icon2").text("☁️");
            } else if (condition === "Clear") {
                $("#icon2").text("☀️");
            } else if (condition === "Rain") {
                $("#icon2").text("🌧️");
            } else if (condition === "Snow") {
                $("#icon2").text("❄️");
            }
            var condition = data.list[2]["weather"][0]["main"];
            if (condition === "Clouds") {
                $("#icon3").text("☁️");
            } else if (condition === "Clear") {
                $("#icon3").text("☀️");
            } else if (condition === "Rain") {
                $("#icon3").text("🌧️");
            } else if (condition === "Snow") {
                $("#icon3").text("❄️");
            }
            var condition = data.list[3]["weather"][0]["main"];
            if (condition === "Clouds") {
                $("#icon4").text("☁️");
            } else if (condition === "Clear") {
                $("#icon4").text("☀️");
            } else if (condition === "Rain") {
                $("#icon4").text("🌧️");
            } else if (condition === "Snow") {
                $("#icon4").text("❄️");
            }
            var condition = data.list[4]["weather"][0]["main"];
            if (condition === "Clouds") {
                $("#icon5").text("☁️");
            } else if (condition === "Clear") {
                $("#icon5").text("☀️");
            } else if (condition === "Rain") {
                $("#icon5").text("🌧️");
            } else if (condition === "Snow") {
                $("#icon5").text("❄️");
            }
            $("#day1temp").text("Temp: " + data.list[1]["main"]["temp"] + "°F");
            $("#day2temp").text("Temp: " + data.list[2]["main"]["temp"] + "°F");
            $("#day3temp").text("Temp: " + data.list[3]["main"]["temp"] + "°F");
            $("#day4temp").text("Temp: " + data.list[4]["main"]["temp"] + "°F");
            $("#day5temp").text("Temp: " + data.list[5]["main"]["temp"] + "°F");
            $("#day1humidity").text("Humidity: " + data.list[1]["main"]["humidity"] + "%");
            $("#day2humidity").text("Humidity: " + data.list[2]["main"]["humidity"] + "%");
            $("#day3humidity").text("Humidity: " + data.list[3]["main"]["humidity"] + "%");
            $("#day4humidity").text("Humidity: " + data.list[4]["main"]["humidity"] + "%");
            $("#day5humidity").text("Humidity: " + data.list[5]["main"]["humidity"] + "%");
            $("#day1wind").text("Wind speed: " + data.list[1]["wind"]["speed"] + " MPH");
            $("#day2wind").text("Wind speed: " + data.list[2]["wind"]["speed"] + " MPH");
            $("#day3wind").text("Wind speed: " + data.list[3]["wind"]["speed"] + " MPH");
            $("#day4wind").text("Wind speed: " + data.list[4]["wind"]["speed"] + " MPH");
            $("#day5wind").text("Wind speed: " + data.list[5]["wind"]["speed"] + " MPH");
        })
}