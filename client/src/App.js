import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";

import { getAllCharacters, searchCharacter, deleteCharacter } from "./redux/actions";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateBreed from "./components/CreateBreed/CreateBreed";
import About from "./components/About/About";

import "./App.css";

function App() {
  let location = useLocation();

  const dispatch = useDispatch();

  const stateCharacters = useSelector((state) => state.allCharacters);

  useEffect(() => {
    if (stateCharacters.length === 0) dispatch(getAllCharacters());
  }, [stateCharacters, dispatch]);


  const onSearch = (character) => {
    dispatch(searchCharacter(character));
  };

  return (
    <div className="App">
      {location.pathname !== "/" ? <NavBar onSearch={onSearch} /> : null}
      <Route exact path="/" render={() => <Landing />} />
      <Route exact path="/dogs" render={() => <Home />} />
      <Route exact path="/dogs/:id" render={() => <Details />} />
      <Route exact path="/creation" render={() => <CreateBreed />} />
      <Route exact path="/about" element={<About />} />
    </div>
  );
}

export default App;
