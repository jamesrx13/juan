import { API_MAIN_URL } from "../../statics/core/config";
import { request } from "../../statics/core/utils";

const getWorkers = async () => {
  return await request("GET", API_MAIN_URL + "profiles/");
};

export { getWorkers };
