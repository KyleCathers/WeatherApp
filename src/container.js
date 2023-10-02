import searchLogo from './images/searchLogo.png';

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
    citySection.innerText = 'Vancouver';

    const regionSection = document.createElement('div');
    regionSection.setAttribute('id', 'region-section');
    regionSection.innerText = 'British Colombia,';

    const countrySection = document.createElement('div');
    countrySection.setAttribute('id', 'country-section');
    countrySection.innerText = 'Canada';

    leftSection.appendChild(citySection);
    leftSection.appendChild(regionSection);
    leftSection.appendChild(countrySection);

    const rightSection = document.createElement('div');
    rightSection.setAttribute('id', 'right-section');

    const dateSection = document.createElement('div');
    dateSection.setAttribute('id', 'date-section');
    dateSection.innerText = 'Sunday, Oct 21';

    const timeSection = document.createElement('div');
    timeSection.setAttribute('id', 'time-section');
    timeSection.innerText = '5:56PM';

    const degreeSection = document.createElement('div');
    degreeSection.setAttribute('id', 'degree-section');

    const degreeButton = document.createElement('label');
    degreeButton.setAttribute('id', 'degree-button');
    degreeButton.setAttribute('class', 'switch');
    degreeButton.innerHTML =    `<input type="checkbox" checked>
                                 <span class="slider round"></span>`;

    const degreeText = document.createElement('div');
    degreeText.setAttribute('id', 'degree-text');
    degreeText.innerText = '°C/°F'

    degreeSection.appendChild(degreeButton);
    degreeSection.appendChild(degreeText);

    rightSection.appendChild(dateSection);
    rightSection.appendChild(timeSection);
    rightSection.appendChild(degreeSection);




    topSection.appendChild(leftSection);
    topSection.appendChild(rightSection);

    // Time title (today, hourly, forecast)
    // Weather, icon, temperature, feels like, humidiy, wind, UV
    const middleSection = document.createElement('div');
    middleSection.setAttribute('id', 'middle-section');

    // if middleSection = today -> append today
    // if middleSection = hourly -> append hourly
    // if middleSection = forecast -> append forecast (14 days)

    middleSection.appendChild(todayContent());



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

    const weatherLogo = document.createElement('div');
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

}

let forecastContent = () => {

}


export { pageInit };