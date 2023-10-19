import React, { useEffect, useState } from "react";

import { WorkerCard } from "./components/WorkerCard";

import { getWorkers } from "../services/WorkerServices";
import { LoadingComponent } from "./components/Loading";

export const WorkersView = async () => {
  useEffect(() => {
    hookGetWorkers();
  });

  const hookGetWorkers = async () => {
    getWorkers();
  };

  return (
    <section className="workers-view">
      <h1>List Workers</h1>
      <br />
      <div className="workers-list"></div>
    </section>
  );
};
