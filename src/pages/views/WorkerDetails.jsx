import { useState } from "react";

import { WorkersView } from "./Workers";
import { BiArrowBack } from "react-icons/bi";
import Calendar from "./components/Calendar";
import Switch from "@mui/material/Switch";
import { UpdateWorkers } from "../services/WorkerServices";

export const WorkerDetails = ({ workerData, setView }) => {
  const [checked, setChecked] = useState(
    workerData.status === 1 ? true : false
  );

  const handleChange = async (formEvt) => {
    setChecked(formEvt.target.checked);

    const data = {
      _id: workerData._id,
      status: formEvt.target.checked ? 1 : 0,
    }

    const response = await UpdateWorkers(data);
    console.log(response);
  };

  console.log(checked);

  console.log(workerData);
  return (
    <div className="worker-details-view">
      <div className="head">
        <button onClick={() => setView(<WorkersView setView={setView} />)}>
          <BiArrowBack />
          Back
        </button>
        <h1>
          {workerData.name?.toUpperCase() +
            " " +
            workerData.lastname?.toUpperCase()}{" "}
        </h1>
        <Switch
          checked={checked}
          onClick={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          name="status"
        />
      </div>
      <br />
      <section>{<Calendar />}</section>
    </div>
  );
};
