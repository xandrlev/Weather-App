import { getTime } from "./getTime.js";

export const isDay = () => {
  const hour = +getTime().slice(0, 2);
  return (hour > 0) & (hour < 12) ? "no" : "yes";
};
