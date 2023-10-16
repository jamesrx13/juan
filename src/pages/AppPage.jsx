import React, { useState } from "react";

import "../statics/css/pages/app.css";

import { AiOutlineUser, AiOutlineBarChart } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { BiHomeAlt2 } from "react-icons/bi";
import { LiaUsersSolid } from "react-icons/lia";

import { HomeView } from "./views/Home";
import { WorkersView } from "./views/Workers";
import { ReportsView } from "./views/Reports";

export const AppPage = () => {
  const [view, setView] = useState(HomeView);

  return (
    <main className="app">
      <section className="menu">
        <div className="head">
          <div className="image-content">
            <AiOutlineUser />
          </div>
          <span>Juan Esteban Bueno Murillo</span>
        </div>
        <div className="options">
          <div onClick={() => setView(HomeView)} className="item">
            <BiHomeAlt2 />
            <span>Home</span>
          </div>
          <div onClick={() => setView(WorkersView)} className="item">
            <LiaUsersSolid />
            <span>Workers</span>
          </div>
          <div onClick={() => setView(ReportsView)} className="item">
            <AiOutlineBarChart />
            <span>Reports</span>
          </div>
        </div>
        <div className="logout">
          <RxExit />
          <span>Logout</span>
        </div>
      </section>
      <section className="app-content">{view}</section>
    </main>
  );
};
