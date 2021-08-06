export const updateUI = (data) => {
    let weatherText = data.isSoon ? "The current weather is" : "The weather forecast is:";
    let daysToDepartureText = data.daysToDeparture === 0 ? "today" : "in " + data.daysToDeparture + " days";

    const travelInfoElement = document.getElementById('travel-info');

    travelInfoElement.innerHTML = `
        <div class="results-wrapper">
            
            <div class="travel-image">
                <img src="${data.image_url}" alt="${data.city}">
            </div>
            
            <div class="travel-result">
                
                <h3>You're going to <strong>${data.city}</strong>!</h3>
                <h3>You'll leave on ${data.depart}</h3>
                
                <p class="days-to-departure">Your trip will start ${daysToDepartureText}.</p> 
                <p>You'll stay in ${data.city} for ${data.duration} days.</p>
                
                <div class="weather">
                    <h3 class="weather-header">${weatherText}</h3><br>
                    <p>Highest temperature: ${data.high_temp}&deg;C</p> 
                    <p>Lowest temperature: ${data.low_temp}&deg;C</p>
                    <p>Forecast: ${data.forecast}</p>
                </div>
            </div>
        </div>
    `
}
