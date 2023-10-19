import { toast } from "react-toastify";
import {
  API_MAIN_URL,
  AUTH_EVENT,
  AUTH_JWT_NAME,
  USER_SESSION_NAME,
} from "../../statics/core/config";
import { request } from "../../statics/core/utils";

const login = (formEvt) => {
  formEvt.preventDefault();
  const dataObj = Object.fromEntries(new FormData(formEvt.target));

  request("POST", API_MAIN_URL + "login/", dataObj)
    .then((resp) => {
      console.log(resp);
      return;
      localStorage.setItem(AUTH_JWT_NAME, resp.token);
      resp.token = undefined;
      localStorage.setItem(USER_SESSION_NAME, JSON.stringify(resp));
      window.dispatchEvent(new Event(AUTH_EVENT));
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export { login };
