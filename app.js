
//DOM Structure
const container = document.querySelector('#container');
const appContainer = document.createElement('div');
appContainer.classList.add('app-container');

const searchBar = document.createElement('input');
searchBar.placeholder = '...';
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

async function getData(place) {
    try {
        if(searchBar.value === '' || searchBar.value === ' ') return false; 

        let searchTerm = searchBar.value;
        console.log(`searched for: ${searchTerm}`);

        //Get all of the city's atmospheric data
        //For Kelvin units, delete '&units=metric'
        let cityResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=5476438a2af68421de84b1b40b773273`); 
        let cityData = await cityResponse.json();

        // function justToHideTheseLinesBeforeDeleting(){


        // let currentData = cityData; <-- trying w/o this line

        // let currentTemperature = cityData.main.temp;
        // let minTemperature = cityData.main.temp_min;
        // let maxTemperature = cityData.main.temp_max;
 
        // console.log(cityData);
        // console.log(`current temp is ${currentTemperature}`);
        // console.log(`min temp is ${minTemperature}`);
        // console.log(`max temp is ${maxTemperature}`);

        // let weatherStatus = cityData.weather[0]['main'];
        // console.log(weatherStatus);

        //let's try returning cityData, and then,
        //outside of this, in another function,
        //say: function x() { let data = getData.then(do something with cityData) }

        // }

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

searchBtn.addEventListener('click', function(){
    // getCityWeather(getData())
    // getDataReturned(getData());



    populateInfo(getData());
});


// async function getWeatherStatus(){
//     getData.then((myCityData) => {
//         console.log(myCityData);
//     })
// }


async function getCityWeather(city){
    let readyCity = await city;
    console.log(`From inside getCityWeather: \nthe weather status is: ${readyCity.weather_detail}`);
}

async function getDataReturned(funk){
    let funkReady = await funk;
    console.log(funkReady);
}

//Front-end & UI functionality

let placeName = document.createElement('p');
let currentStatus = document.createElement('p');
let tempMax = document.createElement('p');
let tempMin = document.createElement('p');
let happyFace = document.createElement('p');
happyFace.id = 'happy-face';
// let placeWeather = document.createElement('p'); 
let weatherIcon = document.createElement('img');

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

//scribble a doodle at the bottom

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

async function populateInfo(myData){
    try {


    let placeData = await myData;
    if(placeData.name === undefined) return false;
    // console.log(`from inside the populateInfo function, \n we're returning a new class: ${new City(placeData)}`);
    placeName.innerHTML = (placeData.name);
    let lowerCasePlaceName = (placeName.innerHTML).toLowerCase();
    let countryName = (placeData.country);
    let lowerCaseCountryName = countryName.toLowerCase();
    placeName.innerHTML = `${(((lowerCasePlaceName).normalize('NFD').replace(/\p{Diacritic}/gu, '')))} ${(lowerCaseCountryName)}`;
    // if(placeData.name == 'Minatitlán') placeName.innerHTML = 'minatitlan';
    currentStatus.innerHTML = `${placeData.temp}° C, ${placeData.weather_detail}`;
    tempMax.innerHTML = `max: ${placeData.temp_max}°`;
    tempMin.innerHTML = `min: ${placeData.temp_min}°`;
    happyFace.innerHTML = '*';

    //Give icon an image depending on the weather
    switch (placeData.weather) {
        case 'Clouds':
            console.log('Cloud icon should be visible');
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

    console.log(new City(placeData))


    return new City(placeData)
}   catch(err)   {
    console.log(err);
}

}


async function createSlider(data) {
    let myData = await data;

    let slider = document.createElement('input');
    slider.classList.add('slider');
    let currentValue = myData.temp;
    let minValue = myData.temp_min;
    let maxValue = myData.temp_max //or try: querySelector('#tempMax');
    slider.type = 'range';
    slider.value = currentValue;
    slider.min = minValue;
    slider.max = maxValue;

    displayDiv.appendChild(slider);
}

//happyFace reloads the website

happyFace.addEventListener('click', function(){
    location.reload();
})