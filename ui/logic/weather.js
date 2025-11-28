const lat = 49.926502
const lon = 8.406923
const timezone = 'Europe/Berlin'
const vorhersage = 5

const daily = 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code'

const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=${daily}&timezone=${timezone}&forecast_days=${vorhersage+1}`

export function getWeatherData(baseURL) {  
  fetch(url)
  .then(res => res.json())
  .then(data => {      
    const {time, precipitation_probability_max, temperature_2m_min, temperature_2m_max, weather_code} = data.daily

    const now = new Date();
    const futureWeather = time.map((t, i) => ({
        date: new Date(t),
        dateString: new Date(t).toLocaleDateString("de-DE", {
          weekday: "short",
        }),
        tempMin: temperature_2m_min[i].toFixed(1),
        tempMax: temperature_2m_max[i].toFixed(1),
        regen: precipitation_probability_max[i].toFixed(0),
        icon: getIconForWeather(weather_code[i])
    })).filter(entry => entry.date > now);

    console.log(futureWeather);

    // --- DOM ---

    const container = document.getElementById("forecast-container");
    const template = document.getElementById("forecast-template");

    container.innerHTML = ""; // alte Einträge löschen

    futureWeather.forEach(day => {
      const element = template.content.cloneNode(true)

      element.querySelector(".date-cast").textContent = day.dateString
      element.querySelector(".icon-cast").src = `${baseURL}/assets/icons/${day.icon.icon}`
      element.querySelector(".tempMin-cast").textContent = `min. ${day.tempMin}°C`
      element.querySelector(".tempMax-cast").textContent = `max. ${day.tempMax}°C`
      element.querySelector(".regen-cast").textContent = `${day.regen}%`

      container.appendChild(element)
    });


  })
}

export function getIconForWeather(code) {
return weather_codes[code] || 'wi_not-available'; // fallback
}

const weather_codes = {
     0: {
          name: "Clear Sky",
          icon: "clear.svg"
     },
     1: {
          name: "Mainly Clear",
          icon: "clear.svg"
     },
     2: {
          name: "Partly Cloudy",
          icon: "partly-cloudy.svg"
     },
     3: {
          name: "Overcast",
          icon: "overcast.svg"
     },
     45: {
          name: "Fog",
          icon: "fog.svg"
     },
     48: {
          name: "Rime Fog",
          icon: "rime-fog.svg"
     },
     51: {
          name: "Light Drizzle",
          icon: "light-drizzle.svg"
     },
     53: {
          name: "Moderate Drizzle",
          icon: "drizzle.svg"
     },
     55: {
          name: "Heavy Drizzle",
          icon: "heavy-drizzle.svg"
     },
     56: {
          name: "Light Freezing Drizzle",
          icon: "drizzle.svg"
     },
     57: {
          name: "Dense Freezing Drizzle",
          icon: "heavy-drizzle.svg"
     },
     61: {
          name: "Slight Rain",
          icon: "slight-rain.svg"
     },
     63: {
          name: "Moderate Rain",
          icon: "rain.svg"
     },
     65: {
          name: "Heavy Rain",
          icon: "heavy-rain.svg"
     },
     66: {
          name: "Light Freezing Rain",
          icon: "rain.svg"
     },
     67: {
          name: "Heavy Freezing Rain",
          icon: "heavy-rain.svg"
     },
     71: {
          name: "Slight snowfall",
          icon: "light-snow.svg"
     },
     73: {
          name: "Moderate snowfall",
          icon: {
               day: "snow.svg",
               night: "snow.svg"
          }
     },
     75: {
          name: "Heavy snowfall",
          icon: "heavy-snow.svg"
     },
     77: {
          name: "Snow Grains",
          icon: "snow-grains.svg"
     },
     80: {
          name: "Slight Rain Showers",
          icon: "slight-rain-showers.svg"
     },
     81: {
          name: "Moderate Rain Showers",
          icon: "rain-showers.svg"
     },
     82: {
          name: "Violent Rain Showers",
          icon: "heavy-rain-showers.svg"
     },
     85: {
          name: "Light Snow Showers",
          icon: "light-snow-showers.svg"
     },
     86: {
          name: "Heavy Snow Showers",
          icon: "heavy-snow-showers.svg"
     },
     95: {
          name: "Thunderstorm",
          icon: "thunderstorm.svg"
     },
     96: {
          name: "Slight Hailstorm",
          icon: "hail.svg"
     },
     99: {
          name: "Heavy Hailstorm",
          icon: "heavy-hail.svg"
     }
};