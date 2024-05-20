// File: ../assets/js/weather.js

const weatherApiUrl =
  "https://api.weatherapi.com/v1/current.json?key=f6d2e809e7164ef1939141155240703&q=London&aqi=yes";

const conditionToImageMapping = [
  {
    image: "url('../img/Sunny.jpg')",
    conditions: ["Sunny", "Clear"],
  },
  {
    image: "url('../img/Partly_Cloudy.jpg')",
    conditions: ["Partly cloudy"],
  },
  {
    image: "url('../img/Cloudy.jpg')",
    conditions: ["Cloudy", "Overcast"],
  },
  {
    image: "url('../img/Fog.jpg')",
    conditions: ["Mist", "Fog", "Freezing fog"],
  },
  {
    image: "url('../img/Rainy.jpg')",
    conditions: [
      "Light rain",
      "Light drizzle",
      "Rain",
      "Moderate rain",
      "Heavy rain",
    ],
  },
  {
    image: "url('../img/Light_Rain.jpg')",
    conditions: [
      "Drizzle",
      "Patchy light drizzle",
      "Light drizzle",
      "Freezing drizzle",
      "Heavy freezing drizzle",
    ],
  },
  {
    image: "url('../img/Stormy.jpg')",
    conditions: [
      "Thundery outbreaks possible",
      "Moderate or heavy rain with thunder",
      "Moderate or heavy snow with thunder",
    ],
  },
  {
    image: "url('../img/Snowy.jpg')",
    conditions: [
      "Light snow",
      "Moderate snow",
      "Heavy snow",
      "Patchy snow possible",
    ],
  },
];

function updateWeatherFrame() {
  fetch(weatherApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      const currentConditionText = data.current.condition.text;

      // Default image
      let backgroundImage = "url('../img/default.jpg')";

      // Find the appropriate image for the given weather condition
      const matchingMapping = conditionToImageMapping.find((entry) =>
        entry.conditions.includes(currentConditionText)
      );

      if (matchingMapping) {
        backgroundImage = matchingMapping.image;
      }

      const weatherFrame = document.getElementById("weatherframe");
      if (weatherFrame) {
        weatherFrame.style.backgroundImage = backgroundImage;
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      const weatherFrame = document.getElementById("weatherframe");
      if (weatherFrame) {
        weatherFrame.style.backgroundImage = "url('../img/default.jpg')";
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // Initial update
  updateWeatherFrame();

  // Set the refresh rate to 5 minutes (300 seconds)
  setInterval(updateWeatherFrame, 300000); // 300,000 milliseconds = 300 seconds
});
