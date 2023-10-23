import { } from "react";
import { isAdmin } from "../../statics/core/utils";
import Users from "./Users";
import Admin from "./Admin";

export const HomeView = () => {





  return (
    <section className="home-view">
      {isAdmin() ? (
        <Admin />
      ) : (
        <Users />
      )}
    </section>
  );
};
