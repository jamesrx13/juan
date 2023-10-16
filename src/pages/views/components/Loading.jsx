import React from "react";
import { BallTriangle } from "react-loader-spinner";
import "../../../statics/css/pages/components/loader.css";

export const LoadingComponent = ({ fullScreen }) => {
  return (
    <div className="loading-container">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};
