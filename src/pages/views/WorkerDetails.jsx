import React from "react";
import { WorkersView } from "./Workers";
import { BiArrowBack } from "react-icons/bi";

export const WorkerDetails = ({ workerData, setView }) => {
  return (
    <div className="worker-details-view">
      <div className="head">
        <button onClick={() => setView(<WorkersView setView={setView} />)}>
          <BiArrowBack />
          Back
        </button>
      </div>
      <br />
      <section>{/* ACÁ VA TU PERRO CALENDARIO */}</section>
    </div>
  );
};
