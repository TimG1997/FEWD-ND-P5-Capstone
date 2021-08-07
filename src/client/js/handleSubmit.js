const BASE_URL = 'http://localhost:8082';
const API_ENDPOINTS = {
    LOCATION: '/location',
    WEATHER: '/weather',
    IMAGE: '/image'
};
const fromElement = document.getElementById('from');
const toElement = document.getElementById('to');
const departElement = document.getElementById('depart');
const returnElement = document.getElementById('return');


export const handleSubmit = async (event) => {
    event.preventDefault();

    let userData = {
        to: fromElement.value,
        from: toElement.value,
        startDate: departElement.value,
        endDate: returnElement.value
    };
    await Client.validateInput(userData);

    let projectData = Client.calculateTripDates(userData.startDate, userData.endDate);

    const coordinates = await Client.fetchData(BASE_URL + API_ENDPOINTS.LOCATION, { location: userData.to})

    console.log(coordinates);

    const weather = await Client.fetchData(BASE_URL + API_ENDPOINTS.WEATHER, { lat: coordinates.lat, long: coordinates.long });

    console.log(weather);

    let forecastDay = 0;
    if(projectData.isSoon) {
        forecastDay = projectData.daysToDeparture;
    }

    console.log("Forecast day: " + forecastDay);

    const weatherData = {
        city: weather.city_name,
        high_temp: weather.data[forecastDay].high_temp,
        low_temp: weather.data[forecastDay].low_temp,
        forecast: weather.data[forecastDay].weather.description
    }

    const image = await Client.fetchData(BASE_URL + API_ENDPOINTS.IMAGE, { city: userData.to });
    projectData.image_url = image.hits[0].largeImageURL;

    Object.assign(projectData, weatherData);

    Client.updateUI(projectData);

};

const travelForm = document.getElementById('travel-form');
travelForm.addEventListener('submit', (e) => Client.handleSubmit(e));
