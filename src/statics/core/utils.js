import { AUTH_EVENT, AUTH_JWT_NAME, USER_SESSION_NAME } from "./config";

const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    })
      .then((resp) => {
        if (resp.status == 200) {
          resolve(resp.json());
        } else {
          resp.json().then((respJson) => {
            reject(respJson);
          });
        }
      })
      .catch(reject);
  });
};

const isAuth = () => {
  const token = localStorage.getItem(AUTH_JWT_NAME);
  const dataSession = localStorage.getItem(USER_SESSION_NAME);

  if (token && dataSession) {
    return true;
  } else {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem(AUTH_JWT_NAME);
  localStorage.removeItem(USER_SESSION_NAME);
  window.dispatchEvent(new Event(AUTH_EVENT));
};

const isAdmin = () => {
  var dataSession = localStorage.getItem(USER_SESSION_NAME);
  if (dataSession) {
    return JSON.parse(dataSession).role === 1;
  } else {
    return false;
  }
};

const getSessionUserData = () => {
  var dataSession = localStorage.getItem(USER_SESSION_NAME);
  if (dataSession) {
    return JSON.parse(dataSession);
  } else {
    return false;
  }
};

export { request, isAuth, logout, isAdmin, getSessionUserData };
