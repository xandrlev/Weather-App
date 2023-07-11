export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, item);
};

export const getLocalStorage = (key) => {
  if (!localStorage.getItem(key)) {
    return "Gomel";
  }
  return localStorage.getItem(key);
};
