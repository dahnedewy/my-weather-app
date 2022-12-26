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
  temp.innerHTML = 66;
}
function changeToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = 19;
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", changeToCelsius);

function displayWeather(response) {
  document.querySelector(".weather_city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".weather_description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#precipitation").innerHTML =
    response.data.precipitation.inches;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let searchForm = document.querySelector(".search_form");
searchForm.addEventListener("submit", search);

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);

getCurrentTemp("Harare");
