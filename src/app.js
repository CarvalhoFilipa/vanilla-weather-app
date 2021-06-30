function formatDate(timestamp) {
  let date= new Date(timestamp)
    let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  
  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-discrition").innerHTML =
    response.data.weather[0].main;
document.querySelector(".current-date").innerHTML = formatDate(response.data.dt*1000)
document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description)
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=678a41d70f66a016981039bfa327c42a&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let apiKey = "678a41d70f66a016981039bfa327c42a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
//Date (day, 00:00)
//let now = new Date();
//let currentDate = document.querySelector(".current-date");
//currentDate.innerHTML = formatDate(now);

//Show city name
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Current location
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Porto");

