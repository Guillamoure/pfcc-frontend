// create cookie storage data
export const prepareCookie = (token, data) => {
  let date = new Date();
  // 28 days
  date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 28);
  let expires = `${date.toUTCString()}`;
  let key = `characters-${token}`;
  let value = JSON.stringify(data);

  storeCookie(`${key}=true; expires=${expires};`);
  storeLocalStorage(key, value);
};
// store cookie
const storeCookie = string => {
  document.cookie = string;
};

// get cookie
const accessCookie = () => {
  return document.cookie;
};

// does cookie exist
export const doesTokenHaveCharacterCookies = key => {
  let cookie = accessCookie();
  let cookieTokenIndex = cookie.indexOf(key);
  return cookieTokenIndex !== -1;
};

// store data in localStorage
const storeLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

// access and parse json data in localStorage {
const accessJSONLocalStorage = key => {
  return JSON.parse(window.localStorage.getItem(key));
};

// if cookie exists, get localStorage data
export const getLocalStorageFromCookieToken = token => {
  let key = `characters-${token}`;
  if (doesTokenHaveCharacterCookies) {
    return accessJSONLocalStorage(key);
  }

  return null;
};

// fetch this character's data from localStorage
export const localStorageCharacterData = (token, characterId) => {
  let lsCharacters = getLocalStorageFromCookieToken(token);
  if (lsCharacters) {
    let character = lsCharacters.find(
      ch => ch.id === characterId && Object.keys(ch).length > 10
    );
    return character;
  } else {
    return null;
  }
};

// remove data in localStorage
const removeLocalStorage = key => {
  window.localStorage.removeItem(key);
};

// replace Character Data in localStorage
export const replaceCharacterDataInLocalStorage = (token, data) => {
  let key = `characters-${token}`;
  let lsCharacters = getLocalStorageFromCookieToken(token);
  if (!lsCharacters) {
    return null;
  }
  lsCharacters = lsCharacters.map(char => {
    if (char.id !== data.id) {
      return char;
    } else {
      return data;
    }
  });

  let value = JSON.stringify(lsCharacters);
  storeLocalStorage(key, value);
};

export const removeLocalStorageCharactersIfCookieIsMissing = token => {
  let key = `characters-${token}`;
  if (!doesTokenHaveCharacterCookies(key)) {
    removeLocalStorage(key);
  }
};
