function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHours = now.getHours();
  let currentMin = now.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  let formattedDate = `${currentDay} ${currentHours}:${currentMin}`;
  return formattedDate;
}

let changeDate = document.querySelector("#date");
changeDate.innerHTML = formatDate();

function search(event) {
  event.preventDefault();
  let showCity = document.querySelector("#city-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = showCity.value;
  searchCity(showCity.value);
}
let searchFor = document.querySelector("#search-form");
searchFor.addEventListener("submit", search);

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function showCurrentTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let showCurrentPosition = document.querySelector("#current-location-button");
showCurrentPosition.addEventListener("click", getCurrentLocation);
