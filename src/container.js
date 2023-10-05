import { format } from 'date-fns';

import { getCurrentWeather, getForecast } from './weather';

let state = 'Today';
let tempState = 'C';
let currentLocation = 'Vancouver'

let currentWeatherObj = await getCurrentWeather(currentLocation);
console.log(currentWeatherObj)

let pageInit = () => {

    // main container
    const container = document.createElement('div');
    container.setAttribute('id', 'container');

    // top: title, location, time, degree setting
    const topSection = document.createElement('div');
    topSection.setAttribute('id', 'top-section');

    const leftSection = document.createElement('div');
    leftSection.setAttribute('id', 'left-section');

    const citySection = document.createElement('div');
    citySection.setAttribute('id', 'city-section');

    const regionSection = document.createElement('div');
    regionSection.setAttribute('id', 'region-section');

    const countrySection = document.createElement('div');
    countrySection.setAttribute('id', 'country-section');

    leftSection.appendChild(citySection);
    leftSection.appendChild(regionSection);
    leftSection.appendChild(countrySection);

    const rightSection = document.createElement('div');
    rightSection.setAttribute('id', 'right-section');

    const dateSection = document.createElement('div');
    dateSection.setAttribute('id', 'date-section');

    const timeSection = document.createElement('div');
    timeSection.setAttribute('id', 'time-section');

    const degreeSection = document.createElement('div');
    degreeSection.setAttribute('id', 'degree-section');

    const degreeText = document.createElement('div');
    degreeText.setAttribute('id', 'degree-text');
    degreeText.innerText = '°C/°F'

    const degreeButton = document.createElement('label');
    degreeButton.setAttribute('id', 'degree-button');
    degreeButton.setAttribute('class', 'switch');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');

    const slider = document.createElement('span');
    slider.setAttribute('class', 'slider round');

    degreeButton.appendChild(checkBox);
    degreeButton.appendChild(slider);

    degreeSection.appendChild(degreeText);
    degreeSection.appendChild(degreeButton);

    const refreshSection = document.createElement('div');
    refreshSection.setAttribute('id', 'refresh-section');

    rightSection.appendChild(dateSection);
    rightSection.appendChild(timeSection);
    rightSection.appendChild(degreeSection);
    rightSection.appendChild(refreshSection);

    topSection.appendChild(leftSection);
    topSection.appendChild(rightSection);

    const middleSection = document.createElement('div');
    middleSection.setAttribute('id', 'middle-section');

    middleSection.appendChild(todayContent()); // default to todays content

    // Time selection, search bar
    const bottomSection = document.createElement('div');
    bottomSection.setAttribute('id', 'bottom-section');

    const selectSection = document.createElement('div');
    selectSection.setAttribute('id', 'select-section');

    const todaySelect = document.createElement('div');
    todaySelect.setAttribute('id', 'today');
    todaySelect.setAttribute('class', 'select');
    todaySelect.innerText = 'Today';

    const hourlySelect = document.createElement('div');
    hourlySelect.setAttribute('id', 'hourly');
    hourlySelect.setAttribute('class', 'select');
    hourlySelect.innerText = 'Hourly';

    const forecastSelect = document.createElement('div');
    forecastSelect.setAttribute('id', 'forecast');
    forecastSelect.setAttribute('class', 'select');
    forecastSelect.innerText = 'Forecast';

    selectSection.appendChild(todaySelect);
    selectSection.appendChild(hourlySelect);
    selectSection.appendChild(forecastSelect);

    const searchBar = document.createElement('form');
    searchBar.setAttribute('id', 'search-bar');

    const searchInput = document.createElement('input');
    searchInput.setAttribute('placeholder', 'Search...');
    searchInput.setAttribute('id', 'search-input');

    const searchButton = document.createElement('button');
    searchButton.setAttribute('type', 'search');
    searchButton.setAttribute('id', 'search-button');

    searchBar.appendChild(searchInput);
    searchBar.appendChild(searchButton);

    bottomSection.appendChild(selectSection);
    bottomSection.appendChild(searchBar);

    container.appendChild(topSection);
    container.appendChild(middleSection);
    container.appendChild(bottomSection);

    todaySelect.addEventListener('click', () => {
        state = 'Today';
        middleSection.innerHTML = ""; // kill all children
        middleSection.appendChild(todayContent());
        setTodayData();
    });

    hourlySelect.addEventListener('click', () => {
        state = 'Hourly';
        middleSection.innerHTML = ""; // kill all children
        middleSection.appendChild(hourlyContent());
        setHourlyData();
    });

    forecastSelect.addEventListener('click', () => {
        state = 'Forecast';
        middleSection.innerHTML = ""; // kill all children
        middleSection.appendChild(forecastContent());
        setForecastData();
    });

    refreshSection.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            currentWeatherObj = await getCurrentWeather(currentLocation);
            console.log(currentWeatherObj)
        } catch (error) {
            alert(`Invalid location`);
            searchInput.value = "";
            return;
        }

        setData();
    });

    checkBox.addEventListener('click', () => {
        if(checkBox.checked) {
            tempState = 'F';
        } else {
            tempState = 'C';
        }

        if (state === 'Today') {
            setTodayData();
        } else if (state === 'Hourly') {
            setHourlyData();
        } else {
            setForecastData();
        }

    })

    searchBar.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(searchInput.value.trim() !== "") { // pause on empty inputs
            currentLocation = searchInput.value;

            try {
                currentWeatherObj = await getCurrentWeather(currentLocation);
            } catch (error) {
                alert(`Invalid location`);
                searchInput.value = "";
                return;
            }

            setData();

            searchInput.value = "";
        }
    })

    return container;
}

let todayContent = () => {
    const middleContainer = document.createElement('div');
    middleContainer.setAttribute('id', 'middle-container-today');

    const title = document.createElement('div');
    title.innerText = 'Today';
    title.setAttribute('id', 'title');

    const weatherText = document.createElement('div');
    weatherText.setAttribute('id', 'weather-text');

    const weatherLogo = new Image();
    weatherLogo.setAttribute('id', 'weather-logo');

    const currentTemp = document.createElement('div');
    currentTemp.setAttribute('id', 'current-temp');

    const feelsLike = document.createElement('div');
    feelsLike.setAttribute('id', 'feels-like');

    const humidity = document.createElement('div');
    humidity.setAttribute('id', 'humidity');

    const wind = document.createElement('div');
    wind.setAttribute('id', 'wind');

    const UV = document.createElement('div');
    UV.setAttribute('id', 'UV');

    middleContainer.appendChild(title);
    middleContainer.appendChild(weatherText);
    middleContainer.appendChild(weatherLogo);
    middleContainer.appendChild(currentTemp);
    middleContainer.appendChild(feelsLike);
    middleContainer.appendChild(humidity);
    middleContainer.appendChild(wind);
    middleContainer.appendChild(UV);

    return middleContainer;
}

let hourlyContent = () => {
    const middleContainer = document.createElement('div');
    middleContainer.setAttribute('id', 'middle-container-hourly');

    const title = document.createElement('div');
    title.innerText = 'Hourly';
    title.setAttribute('id', 'title');

    middleContainer.appendChild(title);

    return middleContainer;
}

let forecastContent = () => {
    const middleContainer = document.createElement('div');
    middleContainer.setAttribute('id', 'middle-container-forecast');

    const title = document.createElement('div');
    title.innerText = 'Forecast';
    title.setAttribute('id', 'title');

    middleContainer.appendChild(title);

    return middleContainer;
}

let setTodayData = () => {
    const weatherText = document.querySelector('#weather-text');
    const weatherLogo = document.querySelector('#weather-logo');
    const currentTemp = document.querySelector('#current-temp');
    const feelsLike = document.querySelector('#feels-like');
    const humidity = document.querySelector('#humidity');
    const wind = document.querySelector('#wind');
    const UV = document.querySelector('#UV');


    weatherText.innerText = currentWeatherObj.weather;
    weatherLogo.src = currentWeatherObj.icon;
    humidity.innerText = `${currentWeatherObj.humidity}% Humidity`;
    wind.innerText = `Wind Speed: ${currentWeatherObj.wind} km/h`;
    UV.innerText = `UV: ${currentWeatherObj.UV}`;

    if(tempState === 'C') {
        currentTemp.innerText = `Temp: ${currentWeatherObj.temp_c}°C`;
        feelsLike.innerText = `Feels Like: ${currentWeatherObj.feelslike_c}°C`;
    } else {
        currentTemp.innerText = `Temp: ${currentWeatherObj.temp_f}°C`;
        feelsLike.innerText = `Feels Like: ${currentWeatherObj.feelslike_f}°F`;
    }

}

let setHourlyData = () => {

}

let setForecastData = () => {

}

let setLocationData = () => {
    const citySection = document.querySelector('#city-section');
    const regionSection = document.querySelector('#region-section');
    const countrySection = document.querySelector('#country-section');

    citySection.innerText = currentWeatherObj.city;
    regionSection.innerText = currentWeatherObj.region;

    if(currentWeatherObj.country === "United States of America") {
        countrySection.innerText = "USA";
    } else {
        countrySection.innerText = currentWeatherObj.country;
    }
}

let setTimeData = () => {
    const dateSection = document.querySelector('#date-section');
    const timeSection = document.querySelector('#time-section');

    let timeStamp = currentWeatherObj.time;      // e.g. 2023-10-05 11:31

    let year = Number(timeStamp.slice(0, 4));    // e.g. 2023
    let month = Number(timeStamp.slice(5,7));    // e.g. 10
    let day = Number(timeStamp.slice(8, 10));    // e.g. 5

    let dayName = format(new Date(year, month - 1, day), 'EEEE');
    let monthName = format(new Date(year, month - 1, day), 'LLL');

    let time = timeStamp.slice(11);
    let hour = time.split(':')[0];
    let minute = time.split(':')[1];
    let AMPM = (hour < 12) ? 'AM' : 'PM';
    
    if(hour > 12) hour -= 12;

    dateSection.innerText = `${dayName}, ${monthName} ${day}`;
    timeSection.innerText = `${hour}:${minute}${AMPM}`;
}

let setData = () => {
    setLocationData();
    setTimeData();

    if (state === 'Today') {
        setTodayData();
    } else if (state === 'Hourly') {
        setHourlyData();
    } else {
        setForecastData();
    }
}

export { pageInit, setData };