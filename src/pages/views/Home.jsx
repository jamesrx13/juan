import React, { useState } from "react";
import { LoadingComponent } from "./components/Loading";

export const HomeView = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      Home view 👌
      <br />
      <LoadingComponent />
    </div>
  );
};
