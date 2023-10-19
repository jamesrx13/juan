import React from "react";

import { AiOutlineUser } from "react-icons/ai";

export const WorkerCard = () => {
  return (
    <div className="worker-card">
      <div className="image">
        <AiOutlineUser fontSize={"1.5rem"} />
      </div>
      <ul>
        <li>
          <span>Name:</span> user
        </li>
        <li>
          <span>Lastname:</span> name
        </li>
        <li>
          <span>Email:</span> email@example
        </li>
        <li>
          <span>Username:</span> username
        </li>
      </ul>
    </div>
  );
};
