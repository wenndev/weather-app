// Variáveis e seleção de elementos
const apiKey = "b330d9302ab84bb967edf214174b4e1f";
const apiCountryURL = "https://countryflagsapi.com/svg/";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang-pt_br`;

    const rest = await fetch(apiWeatherURL);
    const data = await rest.json();

    return data;
};
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `
        http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};
// Eventos

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const city = cityInput.value;
    showWeatherData(city);

    cityInput.value = "";
});

cityInput.addEventListener("keyup",(e)=>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
        cityInput.value = "";
    }
    
});