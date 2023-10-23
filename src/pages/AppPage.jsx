import { useRef, useState } from "react";
import "../statics/css/pages/app.css";
import { AiOutlineUser, AiOutlineBarChart, AiOutlineSetting } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { BiHomeAlt2 } from "react-icons/bi";
import { LiaUsersSolid } from "react-icons/lia";
import { AnimatedModal, ModalAnimation } from "@dorbus/react-animated-modal";
import { HomeView } from "./views/Home";
import { WorkersView } from "./views/Workers";
import { ReportsView } from "./views/Reports";
import { getSessionUserData, isAdmin, logout } from "../statics/core/utils";
import { useNavigate } from "react-router-dom";
import Config from "./views/Config";


export const AppPage = () => {
  const [view, setView] = useState(HomeView);

  const navigate = useNavigate();

  const ref = useRef();

  const { username, placerole } = getSessionUserData();

  return (
    <main className="app">
      <section className="menu">
        <div className="head">
          <div className="image-content">
            <AiOutlineUser />
          </div>
          <div className="info">
            <span>{username}</span>
            <small>{placerole}</small>
          </div>
        </div>
        <div className="options">
          {isAdmin() ? (
            <>
              <div onClick={() => setView(<HomeView />)} className="item">
                <BiHomeAlt2 />
                <span>Home</span>
              </div>
              <div
                onClick={() => setView(<WorkersView setView={setView} />)}
                className="item"
              >
                <LiaUsersSolid />
                <span>Workers</span>
              </div>
              <div onClick={() => setView(<ReportsView />)} className="item">
                <AiOutlineBarChart />
                <span>Reports</span>
              </div>
              <div onClick={() => setView(<Config />)} className="item">
                <AiOutlineSetting />
                <span>Config</span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          className="logout"
          onClick={() => ref.current?.OpenModal(ModalAnimation.Sketch)}
        >
          <RxExit />
          <span>Logout</span>
        </div>
      </section>
      <section className="app-content">{view}</section>
      <AnimatedModal ref={ref}>
        <div className="logout-modal">
          <h3>Are you sure you want to logout?</h3>
          <br />
          <br />
          <button
            className="yes"
            onClick={() => (logout(), navigate("/login"))}
          >
            Yes
          </button>
          <button
            onClick={() =>
              document.getElementById("animated-modal-background").click()
            }
          >
            No
          </button>
        </div>
      </AnimatedModal>
    </main>
  );
};
