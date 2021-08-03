/* Global Variables */
const API_KEY = "&appid=c4e0ac78285d56f51c87425b033faaaa";

const generateButton = document.getElementById('generate');
const zipCodeField = document.getElementById('zip');
const feelingsField = document.getElementById('feelings');

const dateHolder = document.getElementById('date');
const tempHolder = document.getElementById('temp');
const contentHolder = document.getElementById('content');

const baseURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip="; // default country is USA

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
    let date = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

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

const updateUI = async () => {
    try {
        const response = await fetch('/data');
        const data = await response.json();

        tempHolder.innerHTML = data.temperature;
        dateHolder.innerHTML = data.date;
        contentHolder.innerHTML = data.userResponse;

    } catch (error) {
        console.log("error", error);
    }
};

generateButton.addEventListener('click', () => {
        retrieveData(baseURL)
            .then((data) => postData('addData', data))
            .then(updateUI);
    }
);
