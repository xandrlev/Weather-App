export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  if (!localStorage.getItem(key)) {
    return "Minsk";
  }
  return localStorage.getItem(key);
};
