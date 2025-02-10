/* Global Variables */
const apiKey = '9d2d59c1bfd82b9a495382e8984cc45&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// When the button is clicked
document.getElementById('generate').addEventListener('click', performAction);

// Fetch weather data from the API
const getWeatherData = async (baseURL, zip, key) => {
    const response = await fetch(`${baseURL}${zip},us&appid=${key}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return response.json();
};

// Post data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Update the UI
const updateUI = async () => {
    const request = await fetch('/all');
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temp)}°F`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.feel}`;
};

// When the "Show Weather" button is clicked
async function performAction() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    let d = new Date();
    let newDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

    try {
        const weatherData = await getWeatherData(baseURL, zip, apiKey);
        await postData('/add', { date: newDate, temp: weatherData.main.temp, feel: feelings });
        updateUI();
    } catch (error) {
        console.log('Error:', error);
    }
}
