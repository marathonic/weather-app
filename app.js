// API Key: 5476438a2af68421de84b1b40b773273
//DOM 
const container = document.querySelector('#container');
const appContainer = document.createElement('div');
appContainer.classList.add('app-container');

const searchBar = document.createElement('input');
searchBar.classList.add('search-bar');

const searchBtn = document.createElement('button');
searchBtn.innerHTML = 'search';
searchBtn.classList.add('search-btn');

const testBtn = document.createElement('button');
testBtn.innerHTML = 'TEST';
testBtn.classList.add('test-btn');

const searchAreaDiv = document.createElement('div');
searchAreaDiv.classList.add('search-area-div');

const displayDiv = document.createElement('div');
displayDiv.classList.add('display-div');


searchAreaDiv.appendChild(searchBar);
searchAreaDiv.appendChild(searchBtn);

searchAreaDiv.appendChild(testBtn);

appContainer.appendChild(searchAreaDiv);
appContainer.appendChild(displayDiv);
container.appendChild(appContainer);

//Functionality

searchBtn.addEventListener('click', getData);

async function getData(place) {
    try {

        let searchTerm = searchBar.value; 
        console.log(`searched for: ${searchTerm}`);

        //Get all of the city's atmospheric data
        //For Kelvin units, delete '&units=metric'
        let cityResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=5476438a2af68421de84b1b40b773273`); 
        let cityData = await cityResponse.json();

        // let currentData = cityData; <-- trying w/o this line

        let currentTemperature = cityData.main.temp;
        let minTemperature = cityData.main.temp_min;
        let maxTemperature = cityData.main.temp_max;

        console.log(cityData);
        console.log(`current temp is ${currentTemperature}`);
        console.log(`min temp is ${minTemperature}`);
        console.log(`max temp is ${maxTemperature}`);

        let weatherStatus = cityData.weather[0]['main'];
        console.log(weatherStatus);

        //let's try returning cityData, and then,
        //outside of this, in another function,
        //say: function x() { let data = getData.then(do something with cityData) }

        return cityData;

    }   catch(err)   { console.log(err) }
}

testBtn.addEventListener('click', function(){
    getCityWeather(getData())
});


// async function getWeatherStatus(){
//     getData.then((myCityData) => {
//         console.log(myCityData);
//     })
// }


async function getCityWeather(city){
    let readyCity = await city;
    console.log(`From inside getCityWeather: \nthe weather status is: ${readyCity.weather[0]['main']}`);
}

