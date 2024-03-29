function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

let dateTime = document.querySelector(".weather_day_time");
let currentTime = new Date();
dateTime.innerHTML = formatDate(currentTime);

function showLocation(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#weather_search");
  console.log(cityInput.value);
  let city = document.querySelector(".weather_city");
  city.innerHTML = `${cityInput.value}`;
}
let form = document.querySelector(".search_form");
form.addEventListener("submit", showLocation);

function changeToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = 60;
}
function changeToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = 17;
}
let fahrenheit = document.querySelector("#fahrenheit_link");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector("#celsius_link");
celsius.addEventListener("click", changeToCelsius);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<li class="weather_forecast_day"><br />
        ${formatDay(forecastDay.dt)}
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"><br />
        
        <span class="weather_forecast_temperature_max">${Math.round(
          forecastDay.temp.max
        )}°/</span>
        <span class="weather_forecast_temperature_min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </li>
  
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector(".weather_city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector(".weather_description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector(".weather_image");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function getCurrentTemp(city) {
  let apiKey = "d6c19fbec4ecf72cd2eb049393d9e359";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#weather_search").value;
  getCurrentTemp(city);
}

function getPosition(position) {
  let apiKey = "d6c19fbec4ecf72cd2eb049393d9e359";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celsiusLink.classList.remove(".active");
  fahrenheitlink.classList.add(".active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celsiusLink.classList.add(".active");
  fahrenheitlink.classList.remove(".active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let searchForm = document.querySelector(".search_form");
searchForm.addEventListener("submit", search);

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

let fahrenheitlink = document.querySelector("#fahrenheit_link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius_link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

getCurrentTemp("Dallas");
