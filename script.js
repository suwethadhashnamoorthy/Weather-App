const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "YOUR-API-KEY-HERE";
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
        return '<div class="details">
            <h2>${cityName} (${weatherItem.dt_txt.split(" ") [0]})</h2>
            <h6>Temperature: ${(weatherItem.main.temp - 273.15) .toFixed(2)}°C</h6>
            <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
            <h6>humidity: ${weatherItem.main.humidity}%</h6>
        </div>
        <div class="icon">
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon@4x.png" alt="weather-icon"></img>
            <h6>${weatherItem.weather[0].description}</h6>

        </div>';
    } else {
        return '<li class="card">
            <h3></h3>
        </li>'
    }
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e.key === "Enter" && getCityCoordinates());