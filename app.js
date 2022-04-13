
//DOM Structure
const container = document.querySelector('#container');
const appContainer = document.createElement('div');
appContainer.classList.add('app-container');

const searchBar = document.createElement('input');
searchBar.placeholder = 'place';
searchBar.classList.add('search-bar');


const searchBtn = document.createElement('button');
searchBtn.innerHTML = 'search';
searchBtn.classList.add('search-btn');

const searchAreaDiv = document.createElement('div');
searchAreaDiv.classList.add('search-area-div');

const displayDiv = document.createElement('div');
displayDiv.classList.add('display-div');


searchAreaDiv.appendChild(searchBar);

searchAreaDiv.appendChild(searchBtn);

appContainer.appendChild(searchAreaDiv);
appContainer.appendChild(displayDiv);
container.appendChild(appContainer);

//App Logic

searchBtn.addEventListener('click', getData);

searchBtn.addEventListener('click', function(){
    populateInfo(getData());
});


async function getData(place) {
    try {
        if(searchBar.value === '' || searchBar.value === ' ') return false; 

        let searchTerm = searchBar.value;

        //Get all of the city's atmospheric data
        //For Kelvin units, delete '&units=metric'
        let cityResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=5476438a2af68421de84b1b40b773273`); 
        let cityData = await cityResponse.json();

        searchBar.value = '';

        return {
            name: cityData.name,
            country: cityData.sys.country,
            temp: cityData.main.temp,
            temp_min: cityData.main.temp_min,
            temp_max: cityData.main.temp_max,
            weather: cityData.weather[0]['main'],
            weather_detail: cityData.weather[0]['description']
        }

    }   catch(err)   { console.log(err) }
}




//UI functionality

let placeName = document.createElement('p');
let currentStatus = document.createElement('p');
let tempMax = document.createElement('p');
let tempMin = document.createElement('p');
let happyFace = document.createElement('p');
let weatherIcon = document.createElement('img');
happyFace.id = 'happy-face';

//put sticker and city name in one bar
let stickerDiv = document.createElement('div');
stickerDiv.classList.add('sticker-div');
stickerDiv.appendChild(weatherIcon);
stickerDiv.appendChild(placeName);

//put city name in its own bar so the text can wrap center
let cityNameDiv = document.createElement('div');
cityNameDiv.classList.add('city-name-div');
cityNameDiv.appendChild(placeName);

//put current status in its own div so it doesn't overflow
let currentStatusDiv = document.createElement('div');
currentStatusDiv.classList.add('current-status-div');
currentStatusDiv.appendChild(currentStatus);


//stick min--max temps to either side
let tempsDiv = document.createElement('div');
tempsDiv.classList.add('temps-div');
tempsDiv.appendChild(tempMin);
tempsDiv.appendChild(tempMax);

stickerDiv.appendChild(cityNameDiv);
displayDiv.appendChild(stickerDiv);
displayDiv.appendChild(currentStatusDiv);
displayDiv.appendChild(tempsDiv);
displayDiv.appendChild(happyFace);

//make an object to hold the json values

class City {
    constructor(place){
        this.name = place.name,
        this.country = place.country,
        this.temp = place.temp,
        this.temp_max = place.temp_max,
        this.temp_min = place.temp_min,
        this.weather = place.weather,
        this.weather_detail = place.weather_detail
    }
}

//make a function to retrieve object data

async function populateInfo(myData){
    try {


    let placeData = await myData;
    if(placeData.name === undefined) return false;
    placeName.innerHTML = (placeData.name);
    let lowerCasePlaceName = (placeName.innerHTML).toLowerCase();
    let countryName = (placeData.country);
    let lowerCaseCountryName = countryName.toLowerCase();
    placeName.innerHTML = `${(((lowerCasePlaceName).normalize('NFD').replace(/\p{Diacritic}/gu, '')))} ${(lowerCaseCountryName)}`;
    currentStatus.innerHTML = `${placeData.temp}° C, ${placeData.weather_detail}`;
    tempMax.innerHTML = `max: ${placeData.temp_max}°`;
    tempMin.innerHTML = `min: ${placeData.temp_min}°`;
    happyFace.innerHTML = '*';

    //Give icon an image depending on the weather
    switch (placeData.weather) {
        case 'Clouds':
            weatherIcon.src = './img/cloud.png';
            break;

        case 'Rain':
            weatherIcon.src = './img/rainy.png';
            break;
    
        case 'Snow':
            weatherIcon.src = './img/snow.png';
            break;

        default:
            break;
    }

    //for edge cases, such as overcast clouds instead of slightly cloudy:

    switch(placeData.weather_detail) {
        case 'overcast clouds':
            weatherIcon.src = './img/cloudy.png'
            break;

        case'clear sky':
            weatherIcon.src = './img/sunny.png'
            break;

        case 'broken clouds':
            weatherIcon.src = './img/cloudy.png';
            break;

        case 'few clouds':
            weatherIcon.src = './img/partly-cloudy.png'
            break;
            
        default:
            break;
    }

    return new City(placeData)
}   catch(err)   {
    console.log(err);
}

}

happyFace.addEventListener('click', function(){
    location.reload();
})