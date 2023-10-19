import { toast } from "react-toastify";
import {
  API_MAIN_URL,
  AUTH_EVENT,
  AUTH_JWT_NAME,
  USER_SESSION_NAME,
} from "../../statics/core/config";
import { request } from "../../statics/core/utils";

const login = (formEvt, setLoginStatus = () => {}) => {
  formEvt.preventDefault();
  const dataObj = Object.fromEntries(new FormData(formEvt.target));
  setLoginStatus(true);

  request("POST", API_MAIN_URL + "login/", dataObj)
    .then((resp) => {
      localStorage.setItem(AUTH_JWT_NAME, resp.token);
      resp.token = undefined;
      localStorage.setItem(USER_SESSION_NAME, JSON.stringify(resp));
      window.dispatchEvent(new Event(AUTH_EVENT));
      toast.success("Login successful");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    })
    .catch((err) => {
      toast.error(err.message);
    })
    .finally(() => {
      setLoginStatus(false);
    });
};

export { login };
