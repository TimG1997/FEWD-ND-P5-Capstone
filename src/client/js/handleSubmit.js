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

    // validate the user input
    let userData = {
        to: fromElement.value,
        from: toElement.value,
        startDate: departElement.value,
        endDate: returnElement.value
    };
    await Client.validateInput(userData);

    // fetch the coordinates for a specified location
    let tripData = Client.calculateTripDates(userData.startDate, userData.endDate);
    const coordinates = await Client.fetchData(BASE_URL + API_ENDPOINTS.LOCATION, { location: userData.to})

    // fetch the current weather or weather forecast (when the trip is in the future)
    const weather = await Client.fetchData(BASE_URL + API_ENDPOINTS.WEATHER, { lat: coordinates.lat, long: coordinates.long });
    let forecastDay = 0;
    if(tripData.isSoon) {
        forecastDay = tripData.daysToDeparture;
    }

    const weatherData = {
        city: weather.city_name,
        high_temp: weather.data[forecastDay].high_temp,
        low_temp: weather.data[forecastDay].low_temp,
        forecast: weather.data[forecastDay].weather.description
    }

    // fetch an image of the destination
    const image = await Client.fetchData(BASE_URL + API_ENDPOINTS.IMAGE, { city: userData.to });
    tripData.image_url = image.hits[0].largeImageURL;

    Object.assign(tripData, weatherData);
    Client.updateUI(tripData);

};

const travelForm = document.getElementById('travel-form');
travelForm.addEventListener('submit', (e) => Client.handleSubmit(e));
