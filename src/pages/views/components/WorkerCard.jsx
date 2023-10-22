import {} from "react";

import { AiOutlineUser } from "react-icons/ai";
import { WorkerDetails } from "../WorkerDetails";

export const WorkerCard = ({ worker, setView }) => {
  return (
    <div
      onClick={() =>
        setView(<WorkerDetails workerData={worker} setView={setView} />)
      }
      className="worker-card"
    >
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
        <li>
          <span>Staus:</span> {worker.placeStatus}
        </li>
      </ul>
    </div>
  );
};
