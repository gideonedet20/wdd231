// ---------------------------------------------------------
// Local weather widget (OpenWeatherMap)
// ---------------------------------------------------------
// Get a free API key at https://openweathermap.org/api and paste it below.
// The key does not need to be secret for a class project, but avoid
// committing a paid/production key to a public repo.

const OWM_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const CITY_QUERY = "Port Harcourt,NG";

const weatherCard = document.getElementById("weatherCard");
const forecastList = document.getElementById("forecastList");

function weatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function renderCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  weatherCard.innerHTML = `
    <img src="${weatherIconUrl(icon)}" alt="${description}" class="weather-icon" width="60" height="60">
    <div class="weather-main">
      <p class="weather-temp">${temp}&deg;C</p>
      <p class="weather-desc">${description}</p>
      <p class="weather-feels">Feels like ${feelsLike}&deg;C &middot; Humidity ${data.main.humidity}%</p>
    </div>
  `;
}

function renderForecast(list) {
  // The 5-day/3-hour endpoint returns 8 entries per day.
  // Grab one entry per day (close to midday) for the next 3 days.
  const daily = list.filter((entry) => entry.dt_txt.includes("12:00:00")).slice(0, 3);

  forecastList.innerHTML = daily
    .map((entry) => {
      const date = new Date(entry.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(entry.main.temp);
      const icon = entry.weather[0].icon;
      return `
        <li class="forecast-item">
          <span class="forecast-day">${day}</span>
          <img src="${weatherIconUrl(icon)}" alt="${entry.weather[0].description}" width="36" height="36">
          <span class="forecast-temp">${temp}&deg;C</span>
        </li>
      `;
    })
    .join("");
}

async function loadWeather() {
  if (!OWM_API_KEY || OWM_API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
    weatherCard.innerHTML = `<p class="loading-msg">Add your OpenWeatherMap API key in js/weather.js to show live conditions.</p>`;
    return;
  }

  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CITY_QUERY)}&units=metric&appid=${OWM_API_KEY}`
    );
    if (!currentRes.ok) throw new Error(`Current weather request failed: ${currentRes.status}`);
    const currentData = await currentRes.json();
    renderCurrentWeather(currentData);

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(CITY_QUERY)}&units=metric&appid=${OWM_API_KEY}`
    );
    if (!forecastRes.ok) throw new Error(`Forecast request failed: ${forecastRes.status}`);
    const forecastData = await forecastRes.json();
    renderForecast(forecastData.list);
  } catch (error) {
    weatherCard.innerHTML = `<p class="loading-msg">Weather is unavailable right now.</p>`;
    console.error("Error loading weather:", error);
  }
}

loadWeather();
