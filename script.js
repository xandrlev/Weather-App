import { getTimeAmPm } from "./components/getTime.js";
import { isDay } from "./components/isDay.js";
import { classToggle } from "./components/popupToggle.js";
import { setLocalStorage, getLocalStorage } from "./components/localStorage.js";

export let store = {
  city: `${getLocalStorage("city")}`,
  temperature: 0,
  feelslike: 0,
  observationTime: `${getTimeAmPm()}`,
  isDay: isDay(),
  description: "",
  weatherIcon: null,
  properties: {
    cloudCover: {},
    humidity: {},
    windSpeed: {},
    pressure: {},
    uvIndex: {},
    visibility: {},
  },
};

const root = document.getElementById("root");
const close = document.getElementById("close");
const textInput = document.getElementById("text-input");
const submitForm = document.getElementById("form");
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

const fetchData = async () => {
  try {
    const result = await fetch(
      `${BASE_URL}${store.city}&lang=en&appid=deb0113f55ed5067948b2876a0353cb3&units=metric`
    );
    const data = await result.json();

    console.log(data);

    const {
      main: { temp: temperature, feels_like: feelslike, humidity, pressure },
      clouds: { all: cloudCover },
      wind: { speed: windSpeed },
      weather,
      visibility,
    } = data;

    store = {
      ...store,
      temperature,
      feelslike,
      description: weather[0]["main"],
      // weatherIcon: weather[0]["icon"],
      properties: {
        cloudCover: {
          title: "Cloud cover",
          value: `${cloudCover}%`,
          icon: "cloud.png",
        },
        humidity: {
          title: "Humidity",
          value: `${humidity}%`,
          icon: "humidity.png",
        },
        windSpeed: {
          title: "Wind speed",
          value: `${windSpeed} km/h`,
          icon: "wind.png",
        },
        pressure: {
          title: "Pressure",
          value: `${pressure} atm`,
          icon: "gauge.png",
        },
        visibility: {
          title: "Visibility",
          value: `${visibility} m`,
          icon: "visibility.png",
        },
      },
    };

    renderComponent();
  } catch (error) {
    console.log(error);
    root.innerHTML = `DATA IS UPDATING`;
  }
  
};

const renderProperties = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      return `<div class="property">
            <div class="property-icon">
              <img src="./img/icons/${icon}" alt="${icon}">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`;
    })
    .join("");
};

const markup = () => {
  const { city, description, observationTime, temperature, isDay, properties } =
    store;
  const containerClassIsDay = isDay === "yes" ? "is-day" : "";

  return `<div class="container ">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather today in</div>
                  <div class="city-title" id="city">
                  <span>${city.toUpperCase()}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${description.toLowerCase()}.png" alt="" />
                <div className="icon"></div>
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${Math.ceil(temperature)}°C</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperties(properties)}</div>
      </div>`;
};

const renderComponent = () => {
  root.innerHTML = markup();
  city.addEventListener("click", classToggle);
  close.addEventListener("click", classToggle);
};

textInput.addEventListener("input", (e) => {
  store = {
    ...store,
    city: e.target.value,
  };
  setLocalStorage("city", e.target.value);
});

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData();
  classToggle();
});

fetchData();
