const LINK =
  "http://api.weatherstack.com/current?access_key=31ee9b09b9bf47759075bb036bad0a3c";

const root = document.getElementById("root");

let store = {
  city: "Gomel",
  temperature: 0,
  feelslike: 0,
  cloudcover: 0,
  humidity: 0,
  observationTime: "00:00 AM",
  pressure: 0,
  uvIndex: 0,
  visibility: 0,
  isDay: "yes",
  description: "",
  windSpeed: 0,
};

const fetchData = async () => {
  const result = await fetch(`${LINK}&query=${store.city}`);
  const data = await result.json();

  const {
    current: {
      temperature,
      feelslike,
      cloudcover,
      observation_time: observationTime,
      humidity,
      pressure,
      uv_index: uvIndex,
      visibility,
      is_day: isDay,
      weather_descriptions: description,
      wind_speed: windSpeed,
    },
  } = data;

  store = {
    ...store,
    temperature,
    feelslike,
    cloudcover,
    observationTime,
    humidity,
    pressure,
    uvIndex,
    visibility,
    isDay,
    description: description[0],
    windSpeed,
  };

  renderComponent();

  console.log(data);
  console.log(store);
};

const markup = () => {
  const { city, description, observationTime, temperature } = store;

  return `<div class="container ">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/" alt="" />
                <div class="description">${description}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°C</div>
              </div>
            </div>
          </div>
        <div id="properties"></div>
      </div>`;
};

const renderComponent = () => {
  root.innerHTML = markup();
};

fetchData();
