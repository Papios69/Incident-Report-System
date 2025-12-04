import React from "react";
import { Route, Routes } from "react-router-dom";
import Incidents from "./incident/Incidents.jsx";
import IncidentDetails from "./incident/IncidentDetails.jsx";
import IncidentForm from "./incident/IncidentForm.jsx";


import Home from "./core/Home";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from './lib/Signin.jsx'
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";

import Menu from "./core/Menu";
function MainRouter() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/edit/:userId"element={<PrivateRoute><EditProfile /></PrivateRoute>}/>
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/incidents"element={<PrivateRoute><Incidents /></PrivateRoute>}/>
        <Route path="/incidents/new"element={<PrivateRoute><IncidentForm /></PrivateRoute>}/>
        <Route path="/incidents/edit/:incidentId" element={<PrivateRoute><IncidentForm /></PrivateRoute>}/>
        <Route path="/incidents/:incidentId" element={<PrivateRoute><IncidentDetails /></PrivateRoute>}/>

      </Routes>
    </div>
  );
}

export default MainRouter;
