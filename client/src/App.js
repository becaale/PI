import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";

import { getCharacters, searchCharacter, deleteCharacter, getTemperaments } from "./redux/actions";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateBreed from "./components/CreateBreed/CreateBreed";
import Footer from "./components/Footer/Footer";

import "./App.css";

import home1 from "./media/home1.mp4";
import home2 from "./media/home2.mp4";
import home3 from "./media/home3.mp4";
import home4 from "./media/home4.mp4";
import home5 from "./media/home5.mp4";
import home6 from "./media/home6.mp4";
import home7 from "./media/home7.mp4";

function App() {
  const stateCharacters = useSelector((state) => state.characters);
  const stateTemperaments = useSelector((state) => state.temperaments);

  let location = useLocation();
  const dispatch = useDispatch();

  const getUniqueMinuteNumber = () => {
    return Number((Math.floor(Date.now() / 60000) % 10) + 1);
  };

  const URL_VIDEOS_HOME = [home1, home2, home3, home4, home5, home6, home4, home7, home3, home1];

  const HTML_VIDEO = (
    <div className="video">
      <video autoPlay={true} muted={true} loop={true}>
        <source src={URL_VIDEOS_HOME[getUniqueMinuteNumber()]} type="video/mp4" />
      </video>
    </div>
  );

  useEffect(() => {
    if (stateCharacters.length === 0) dispatch(getCharacters());
    if (stateTemperaments.length === 0) dispatch(getTemperaments());
  }, [stateTemperaments, stateCharacters, dispatch]);

  return (
    <>
      <div className="App">
        {location.pathname !== "/" ? <NavBar /> : null}
        <div className="central">
          {location.pathname !== "/" && HTML_VIDEO}
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/dogs" render={() => <Home />} />
          <Route exact path="/dogs/:id" render={() => <Details />} />
          <Route exact path="/creation" render={() => <CreateBreed />} />
          <Route exact path="/about" render={() => <Details />} />
        </div>
        {location.pathname !== "/" ? <Footer /> : null}
      </div>
    </>
  );
}

export default App;
