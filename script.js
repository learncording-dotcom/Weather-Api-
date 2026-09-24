const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");


// Search button event
searchBtn.addEventListener("click", getWeather);


// Allow Enter key
cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});


async function getWeather() {

    const city = cityInput.value.trim();

    // Check if input is empty
    if (city === "") {

        showError("Please enter a city name.");

        return;
    }


    // Reset previous results
    weatherResult.classList.add("hidden");
    error.classList.add("hidden");

    // Show loading message
    loading.classList.remove("hidden");


    try {

        // Step 1: Find the city coordinates
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );


        if (!geoResponse.ok) {
            throw new Error("Unable to connect to the server.");
        }


        const geoData = await geoResponse.json();


        // Check whether city exists
        if (!geoData.results || geoData.results.length === 0) {

            throw new Error(
                "City not found. Please check the city name."
            );
        }


        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;


        // Step 2: Request weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`
        );


        if (!weatherResponse.ok) {
            throw new Error(
                "Unable to retrieve weather information."
            );
        }


        const weatherData = await weatherResponse.json();


        // Step 3: Display data
        displayWeather(
            location,
            weatherData
        );


    } catch (err) {

        showError(err.message);

    } finally {

        // Hide loading message
        loading.classList.add("hidden");

    }
}


function displayWeather(location, data) {

    const current = data.current;


    cityName.textContent =
        `${location.name}, ${location.country}`;


    temperature.textContent =
        current.temperature_2m;


    feelsLike.textContent =
        current.apparent_temperature;


    humidity.textContent =
        current.relative_humidity_2m;


    windSpeed.textContent =
        current.wind_speed_10m;


    description.textContent =
        "Current weather conditions";


    weatherResult.classList.remove("hidden");
}


function showError(message) {

    loading.classList.add("hidden");

    weatherResult.classList.add("hidden");

    error.textContent = message;

    error.classList.remove("hidden");
}