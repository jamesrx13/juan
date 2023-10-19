import React from "react";

export const WorkersView = ({ workersInformation }) => {
  console.log(workersInformation);
  return (
    <section className="workers-view">
      <h1>List Workers</h1>
      <br />
      <div className="workers-list"></div>
    </section>
  );
};
