const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiKey = "d4003013f695a100a2ee33796c3cba4e";
let key = '';

const temp = document.querySelector('#celsius');
const place = document.querySelector('#place');
const loader = document.querySelector(".loading");
const windSpeed =  document.querySelector("#wind-speed");
const humidity =  document.querySelector("#humidity-percentage");
const weatherIcon = document.querySelector(".weather-img");
const weatherURL = "https://openweathermap.org/img/wn/11d@2x.png"
const template = document.querySelector(".template");

async function weatherCheck(key) {
  if(!searchBar.value) {
    template.style.height = '80px';
    document.querySelector(".cover-template").style.display = 'block';
  } else {
    template.style.height = '70%';
    document.querySelector(".cover-template").style.display = 'none';
  }
  const response = await fetch(apiURL + `&appid=${apiKey}` + `&q=${key}`);

  let data = await response.json();
  console.log(data)
  if (data.cod !== '404') {
    loader.style.display = 'none';
    temp.innerText = await data.main.temp;
    place.innerText = await data.name;
    windSpeed.innerText = await data.wind.speed;
    humidity.innerText = await data.main.humidity;
    weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data['weather']['0']['icon']}@2x.png)`;
  } else {
    loader.style.display = 'block';
  }
  
}

const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector("#country-search");
let clicked = false;

searchBtn.addEventListener('click', function() {
  if (clicked) {
    if (searchBar.value) return;
    clicked = false;
    searchBtn.classList.remove("active");
    searchBar.classList.remove("active");
  } else {
    clicked = true;
    searchBtn.classList.add("active");
    searchBar.classList.add("active");
  }
})

searchBar.addEventListener('keyup', function() {
  weatherCheck(searchBar.value)
  console.log(searchBar.value)
})

weatherCheck();

