import { useEffect, useState } from "react";

import { WorkerCard } from "./components/WorkerCard";

import { getWorkers } from "../services/WorkerServices";
export const WorkersView = () => {


  const [data, setData] = useState([]);

  useEffect(() => {
    getWorkers().then((res) => {
      setData(res);
    });
  }, [])

  console.log(data);

  return (
    <section className="workers-view">
      <h1>List Workers</h1>
      <br />
      <WorkerCard data={data} />
      <div className="workers-list"></div>
    </section>
  );
};
