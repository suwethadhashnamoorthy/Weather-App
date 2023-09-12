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
            <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon"></img>
            <h6>Temp: ${(weatherItem.main.temp -273.15).toFixed(2)}°C</h6>
            <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
            <h6>Humidity: ${weatherItem.main.humidity}%</h6>
        </li>'
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = 'http://api.openweathemap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}';
    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        //Filter the forecasts to get only one forcast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt.txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weaherItem, index);
            if (index === 0) {
                currentWeatherDiv.innerAdjacentHTML("beforeend", html);
            
            } else {
                weatherCardsDiv.innerAdjacentHTML("beforeend", html);
            }
        });
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}



locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e.key === "Enter" && getCityCoordinates());