export const getTimeAmPm = () => {
  const date = new Date();
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const getTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return date.toLocaleTimeString().slice(0, 5);
};
