import React from "react";

import { WorkerCard } from "./components/WorkerCard";

export const WorkersView = () => {
  return (
    <section className="workers-view">
      <h1>List Workers</h1>
      <br />
      <div className="workers-list">
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
        <WorkerCard />
      </div>
    </section>
  );
};
