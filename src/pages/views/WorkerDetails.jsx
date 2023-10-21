import { useState } from "react";

import { WorkersView } from "./Workers";
import { BiArrowBack } from "react-icons/bi";
import Calendar from "./components/Calendar";
import Switch from '@mui/material/Switch';

export const WorkerDetails = ({ workerData, setView }) => {
  const [checked, setChecked] = useState(workerData.status === 1 ? true : false);


  const handleChange = (event) => {
    setChecked(event.target.checked);
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
        <h1>{workerData.name?.toUpperCase() + " " + workerData.lastname?.toUpperCase()}  </h1>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <br />
      <section>{<Calendar />}</section>
    </div>
  );
};
