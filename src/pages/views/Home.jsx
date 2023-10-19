import React from "react";
import { getSessionUserData, isAdmin } from "../../statics/core/utils";

export const HomeView = () => {
  const userData = getSessionUserData();
  return (
    <section className="home-view">
      {isAdmin() ? (
        <h1>User Role "Admin"</h1>
      ) : (
        <article className="user-content">
          <div className="info-card">
            <ul>
              <li>
                <span>Name: </span> {userData.name}
              </li>
              <li>
                <span>Lastname: </span> {userData.lastname}
              </li>
              <li>
                <span>Email: </span> {userData.email}
              </li>
              <li>
                <span>Role: </span> {userData.placerole}
              </li>
              <li>
                <span>Username: </span> {userData.username}
              </li>
            </ul>
            <div className="price">Salary: ${userData.salary}</div>
          </div>
        </article>
      )}
    </section>
  );
};
