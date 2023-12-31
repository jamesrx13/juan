import { API_MAIN_URL } from "../../statics/core/config";
import { request } from "../../statics/core/utils";
import { toast } from "react-toastify";

const getWorkers = async () => {
  return await request("GET", API_MAIN_URL + "profiles/");
};

const CreateWorkers = (formEvt) => {
  formEvt.preventDefault();
  const dataObj = Object.fromEntries(new FormData(formEvt.target));
  console.log(dataObj);
  const response = request("POST", API_MAIN_URL + "register/", dataObj)
    .then((resp) => {
      toast.success("Worker created");
      return resp;
    })
    .catch((err) => {
      toast.error(err.message);
      return err;
    });

  return response;
};

const UpdateWorkers = (formEvt) => {
  const dataObj = Object.fromEntries(new FormData(formEvt.target));
  const data = Object.keys(dataObj).length === 0 ? formEvt : dataObj;

  console.log(data);
  const response = request("PUT", API_MAIN_URL + `update/${data._id}`, data)
    .then((resp) => {
      toast.success("Status updated");
      return resp;
    })
    .catch((err) => {
      toast.error(err.message);
      return err;
    });

  return response;
};

const deleteWorker = async (id) => {
  const response = request("DELETE", API_MAIN_URL + `delete/${id}`)
    .then((resp) => {
      toast.success("Worker deleted");
      return true;
    })
    .catch((err) => {
      toast.error(err.message);
      return false;
    });

  return response;
}



export { getWorkers, CreateWorkers, UpdateWorkers, deleteWorker };
