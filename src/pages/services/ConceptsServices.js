import { toast } from "react-toastify";
import { API_MAIN_URL } from "../../statics/core/config";
import { request } from "../../statics/core/utils";


const getConcepts = async () => {
    return await request("GET", API_MAIN_URL + "concepts/");
};


const updateConcepts = async (formEvt) => {
    console.log(formEvt);
    const dataObj = Object.fromEntries(new FormData(formEvt.target));
    const data = Object.keys(dataObj).length === 0 ? formEvt : dataObj
    console.log(data);
    const response = await request("PUT", API_MAIN_URL + `concepts/${data._id}`, data).then((resp) => {
        toast.success("Status updated");
        return resp;
    }).catch((err) => {
        toast.error(err.message);
        return err;
    });

    return response
}



export { getConcepts, updateConcepts };