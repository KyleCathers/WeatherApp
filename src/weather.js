// https://api.weatherapi.com/v1/current.json?key=d2a54b121f6748a786113745233009&q=london

// GIPHY: 2g10RmCdXHVvqH355KNluVTdiRtPu31Z
// weatherAPI: d2a54b121f6748a786113745233009
// https://api.weatherapi.com/v1/current.json
// https://developers.giphy.com/docs/api/endpoint/

let weatherKey = 'd2a54b121f6748a786113745233009';

const getCurrentWeather = async (location) => {
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${location}`);
    let data = await response.json();
    return parseCurrentWeather(data);
}

const parseCurrentWeather = dataObject => {
    let current = dataObject.current;
    let location = dataObject.location;

    let temp_c = current.temp_c;
    let temp_f = current.temp_f;
    let feelslike_c = current.feelslike_c;
    let feelslike_f = current.feelslike_f;
    let humidity = current.humidity;
    let weather = current.condition.text;
    let icon = current.condition.icon;
    let wind = current.wind_kph;
    let UV = current.uv;

    
    let country = location.country;
    let time = location.localtime; // "2023-10-01 16:39"
    let city = location.name;
    let region = location.region; // province, state ...

    let parsedData = { temp_c, temp_f, feelslike_c, feelslike_f, humidity, weather, icon, 
        wind, UV, country, time, city, region };
    
    //console.log(parsedData);

    return parsedData;
}

// 14 day forecast
const getForecast = async (location = 'Vancouver') => {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${location}&days=15`);
    let data = await response.json();

    let forecast = data.forecast.forecastday;

    // console.log(forecast);

    return parseForecast(forecast);
}

const parseForecast = forecast => {

    let parsedForecast = forecast;

    console.log(parsedForecast);

    return parsedForecast;
}

export { getCurrentWeather, getForecast };