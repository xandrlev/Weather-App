import { getTimeAmPm } from "./getTime.js";
import { isDay } from "./isDay.js";

export let store = {
  city: "Gomel",
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
