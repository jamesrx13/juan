import { } from "react";

import { AiOutlineUser } from "react-icons/ai";
import { LoadingComponent } from "./Loading";

export const WorkerCard = ({ data }) => {
  // console.log(data.length);

  return (
    <>
      {data.length === 0 ? (
        <LoadingComponent />
      ) :
        (
          data.map((worker, index) => (
            <div key={index} className="worker-card">
              <div className="image">
                <AiOutlineUser fontSize={"1.5rem"} />
              </div>
              <ul>
                <li>
                  <span>Name:</span> {worker.name}
                </li>
                <li>
                  <span>Lastname:</span> {worker.lastname}
                </li>
                <li>
                  <span>Email:</span> {worker.email}
                </li>
                <li>
                  <span>Username:</span> {worker.username}
                </li>
              </ul>
            </div>
          )))}

    </>
  );
};
