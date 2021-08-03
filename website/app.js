/* Global Variables */
const API_KEY = "&appid=c4e0ac78285d56f51c87425b033faaaa";

const generateButton = document.getElementById('generate');
const zipCodeField = document.getElementById('zip');
const feelingsField = document.getElementById('feelings');

const dateHolder = document.getElementById('date');
const tempHolder = document.getElementById('temp');
const contentHolder = document.getElementById('content');

const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="; // default country is USA

const retrieveData = async (url = '') => {
    const zipCode = zipCodeField.value;
    const res = await fetch(url + zipCode + API_KEY);

    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
    }
};

const postData = async (url = '', data = {}) => {
    const userResponse = feelingsField.value;
    const temperature = data.main.temp;
    let d = new Date();
    let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

    data = {
        temperature,
        date,
        userResponse
    };

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async (data) => {
    try {
        console.log(data);
        if (data && data.length > 0) {
            const mostRecentEntry = data[data.length - 1];

            tempHolder.innerHTML = mostRecentEntry.temperature;
            dateHolder.innerHTML = mostRecentEntry.date;
            contentHolder.innerHTML = mostRecentEntry.userResponse;
        } else {
            tempHolder.innerHTML = "No data available";
        }

    } catch (error) {
        console.log("error", error);
    }
};

generateButton.addEventListener('click', () => {
        retrieveData(baseURL)
            .then((data) => postData('addData', data))
            .then((data) => updateUI(data));
    }
);

const init = async () => {
    const request = await fetch('/data');
    try {
        return await request.json();
    } catch (error) {
        console.log("error", error);
    }
};

init()
    .then((data) => updateUI(data));
