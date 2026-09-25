# Weather App

This project is a simple web app that shows the current weather for a city.

## How it works

1. Open `index.html` in a browser.
2. Type a city name into the input box and click **Search**.
3. The app uses the Open-Meteo Geocoding API to find the city coordinates.
4. Then it calls the Open-Meteo Weather API to get the current weather data.
5. The page displays:
   - city name
   - temperature
   - feels-like temperature
   - humidity
   - wind speed

## Files

- `index.html` — page layout and weather card UI
- `style.css` — styling for the app
- `script.js` — fetches weather data and updates the page

## Run locally

Because this is a front-end app, you can simply open `index.html` in your browser.

If you prefer a local server, run:

```bash
python -m http.server 8000
```

Then open:

```bash
http://localhost:8000
```

## Notes

This app depends on live APIs from Open-Meteo, so it needs internet access to fetch weather information.
