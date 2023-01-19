import "./App.css";

import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useLocation, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateBreed from "./components/CreateBreed/CreateBreed";

function App() {
  let location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" ? <NavBar /> : null}
      <Route exact path="/" render={() => <Landing />} />
      <Route exact path="/dogs" render={() => <Home />} />
      <Route exact path="/dogs/:id" render={() => <Details />} />
      <Route exact path="/creation" render={() => <CreateBreed />} />
    </div>
  );
}

export default App;
