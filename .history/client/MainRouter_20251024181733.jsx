import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";

import Home from "./core/Home";
const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
export default MainRouter;
