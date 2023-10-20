import { useEffect, useState } from "react";

import { WorkerCard } from "./components/WorkerCard";

import { getWorkers } from "../services/WorkerServices";
import { LoadingComponent } from "./components/Loading";
import { WorkerDetails } from "./WorkerDetails";
export const WorkersView = ({ setView }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getWorkers().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <section className="workers-view">
      <h1>List Workers</h1>
      <br />
      <div className="workers-list">
        {data.length === 0 ? (
          <LoadingComponent />
        ) : (
          data.map((worker, index) => (
            <WorkerCard key={index} worker={worker} setView={setView} />
          ))
        )}
      </div>
    </section>
  );
};
