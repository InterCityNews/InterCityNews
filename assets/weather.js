const updateWeatherFrame = (city) => {
  if (!city) {
    console.error("No city provided for weather update.");
    return;
  }

  // Validate the input city to prevent security vulnerabilities
  if (!isValidCity(city)) {
    console.error("Invalid city provided for weather update.");
    return;
  }

  const config = require('config');
  const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${config.get('weatherApiKey')}&q=${city}&aqi=yes`;

  axios.get(weatherApiUrl)
    .then((response) => {
      const currentCondition = response.data.current.condition.text;
      let backgroundImage = "url('./assets/img/default.jpg')";
      let conditionFound = false;
      for (const entry of conditionToImageMapping) {
        if (entry.conditions.includes(currentCondition)) {
          backgroundImage = `url('./assets/img/${entry.image}')`;
          conditionFound = true;
          break;
        }
      }

      if (!conditionFound) {
        // Provide a default image or fallback
        backgroundImage = "url('./assets/img/fallback.jpg')";
      }

      const weatherFrame = document.getElementById("weatherframe");
      if (weatherFrame) {
        weatherFrame.style.backgroundImage = backgroundImage;
      }
    })
    .catch((error) => {
      logger.error("Error fetching weather data:", error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  updateWeatherFrame("New York"); // Example city for initial update
  setInterval(() => updateWeatherFrame("New York"), 300000); // Update every 5 minutes
});
