const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humadity');
const wind = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkweather(city)
{
    const api_key = "e7e0e13fc5dd6e204791a69e5324ad87";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`)
    {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }
    else{
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
    }

    temprature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML= `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main)
    {
        case 'clouds':
            weather_img.src="/zeel/cloudy.png";
            break;
        case 'clear':
            weather_img.src="/zeel/clean.png";
            break;
        case 'rain':
            weather_img.src="/zeel/rainy.png";
            break;
        case 'mist':
            weather_img.src="/zeel/mist.png";
            break;
        case 'snow':
            weather_img.src="/zeel/snow.png";
            break;
    }
}

searchBtn.addEventListener('click',()=>{
    checkweather(inputBox.value);
});

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkweather(inputBox.value);
    }
});
