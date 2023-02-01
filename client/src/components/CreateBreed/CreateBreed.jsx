import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./CreateBreed.module.css";

import { getTemperaments, createCharacter } from "../../redux/actions";

import pulgoso from "../../media/img/pulgoso.png";
import pata from "../../media/img/pata.png";
import sync from "../../media/img/sync.png";
import ok from "../../media/img/ok.png";

const CreateBreed = ({ temperaments, getTemperaments, createCharacter, allCharacters, errors }) => {
  let allCharsNames = {};
  const requiredData = { name: true, height: true, weight: true, life_span: false, image: false, temperaments: false };

  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState({
    name: false,
    height: false,
    weight: false,
    life_span: false,
    image: false,
    temperaments: false,
    all: false,
  });
  const [stateTemperaments, setStateTemperaments] = useState([]);
  const [characterData, setCharacterData] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "pulgoso",
    temperaments: [],
  });
  const [errorData, setErrorData] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: "",
  });

  useEffect(() => {
    if (!temperaments.length) getTemperaments();
    stateTemperaments.length !== temperaments.length && setStateTemperaments(temperaments);
    if (!allCharsNames.length && allCharacters.length)
      allCharacters.forEach((char) => {
        if (!allCharsNames[char.name]) {
          allCharsNames[char.name] = true;
        }
      });
    if (errorCount < 0) setErrorCount(0);
  }, [errors, errorCount, allCharacters, characterData, stateTemperaments, temperaments]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "name":
        setCharacterData({
          ...characterData,
          name: event.target.value.replace(/\b\w/g, (letter) => letter.toUpperCase()),
        });
        break;
      default:
        setCharacterData({
          ...characterData,
          [event.target.id]: formatValue(event.target.value, event.target.id),
        });
        break;
    }
    validate(event.target.value, event.target.id);
  };

  const formatValue = (value) => {
    let valueReturn = "";

    if (value.length <= 2) {
      valueReturn = value;
    } else if (value.length === 3) {
      valueReturn = value.slice(0, 2) + " - " + value.slice(2);
    } else if (value.length <= 5) {
      valueReturn = value.slice(0, 2);
    } else if (value.length > 7) {
      valueReturn = value.slice(0, 7);
    } else if (value.length === 7 && (value.indexOf(" - ") === -1 || value.indexOf("  ") !== -1)) {
      valueReturn = value.slice(0, 2);
    } else if (value.length === 7 && value.indexOf(" - ") !== 2) {
      valueReturn = value.slice(0, 2) + " - " + value.slice(2, 3) + value.slice(6);
    } else if (value.length > 4) {
      valueReturn = value;
    }

    return valueReturn;
  };

  const validate = (value, id) => {
    let patternN = /^[0-9]{2} - [0-9]{2}$/;
    let patternT = /^(?=.{0,35}$)[a-zA-Z\s.]*$/;
    let error = "";
    switch (id) {
      case "name":
        if (allCharsNames[value]) error = "This name already exist";
        if (!patternT.test(value)) error = "Only letters, max 35 chars";
        if (value === "") error = "Required data";
        break;
      case "temperaments":
        if (!value.length) error = "Required data";
        break;
      default:
        if (value.length === 7 && !patternN.test(value)) error = "Only numbers";
        if (value.length === 7 && Number(value.slice(0, 2)) > Number(value.slice(5))) error = "Max less than Min";
        if (value.length < 7) error = "Incomplete data";
        if (value === "") error = "Required data";
        break;
    }
    if (errorData[id] === "" && error !== "") setErrorCount(errorCount + 1);
    if (errorData[id] !== "" && error === "") setErrorCount(errorCount - 1);
    if (value === "" && requiredData[id] === true) setIsCompleted({ ...isCompleted, [id]: false });
    if (value !== "" && requiredData[id] === true && error === "") setIsCompleted({ ...isCompleted, [id]: true });
    let completed = true;
    for (const key in requiredData) {
      if (isCompleted[key] !== requiredData[key]) completed = false;
    }
    if (isCompleted.all !== completed) setIsCompleted({ ...isCompleted, all: completed });

    setErrorData({ ...errorData, [id]: error });
  };

  const validateAll = (objCharData, bool) => {
    let result = true;
    for (const key in objCharData) {
      if (typeof objCharData[key] === "object" && objCharData[key].length) {
        if (!validateAll(objCharData[key])) result = false;
      }
      if (Array.isArray(objCharData[key]) && !objCharData[key].length) result = false;
      if ((objCharData[key] === "") === bool) {
        if (bool)
          setErrorData((error) => {
            return { ...error, [key]: "It cant be empty" };
          });
        result = false;
      }
    }
    return result;
  };

  const onTemperament = (event) => {
    let arrTmp = [];
    characterData.temperaments.includes(event.target.id)
      ? (arrTmp = [...characterData.temperaments.filter((element) => element !== event.target.id)])
      : (arrTmp = [...characterData.temperaments, event.target.id]);

    setCharacterData({
      ...characterData,
      temperaments: [...arrTmp],
    });
    // validate(arrTmp, "temperaments");
  };

  const preventSubmit = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    if (validateAll(errorData, false) && validateAll(characterData, true)) {
      setIsLoading(true);
      toggleClass(event);
      await createCharacter(characterData);
    } else {
    }
  };

  const toggleClass = (event) => {
    event.target.classList.toggle(styles.active);
  };

  const transitionEnd = (event) => {
    toggleClass(event);
    event.target.classList.add(styles.finished);
    setTimeout(() => clearCreate(event), 2000);
  };

  const clearCreate = (event) => {
    event.target.className = styles.button;
    setStateTemperaments([]);
    setCharacterData({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: pulgoso,
      temperaments: [],
    });
    setErrorData({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      image: "",
      temperaments: "",
    });
    setIsLoading(false);
  };

  return (
    <form onSubmit={preventSubmit}>
      <div className={styles.createcontainer}>
        <div className={styles.leftcontainer}>
          <img src={pata} alt="" className={styles.imagen} />
          <div className={styles.img}>
            <img className={styles.imagen} src={pulgoso} />
          </div>
        </div>
        <div className={styles.rightcontainer}>
          <header>
            <h1 className={styles.h1}>Let's create our own breed!</h1>
            <div className={styles.set}>
              <div className={styles.charname}>
                <label htmlFor="name">Name</label>
                <input
                  className={`${styles.inputName} ${styles.inputs}`}
                  id="name"
                  type="text"
                  value={characterData.name || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                ></input>
                <label className={styles.error} htmlFor="name">
                  {errorData.name || " "}
                </label>
              </div>
              <div className={styles.charphoto}>
                <button id="upload" disabled={isLoading}></button>
                <label htmlFor="upload">Select a photo</label>
              </div>
            </div>
            <div className={styles.set}>
              <div className={styles.charspecies}>
                <label className={styles.labelMed} htmlFor="height">
                  Height range
                </label>
                <input
                  className={`${styles.inputMed} ${styles.inputs}`}
                  placeholder="Min - Max"
                  id="height"
                  type="text"
                  value={characterData.height || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                ></input>
                <label className={styles.error} htmlFor="height">
                  {errorData.height || " "}
                </label>
              </div>
              <div className={styles.charspecies}>
                <label className={styles.labelMed} htmlFor="weight">
                  Weight range
                </label>
                <input
                  className={`${styles.inputMed} ${styles.inputs}`}
                  placeholder="Min - Max"
                  id="weight"
                  type="text"
                  value={characterData.weight || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                ></input>
                <label className={styles.error} htmlFor="weight">
                  {errorData.weight || " "}
                </label>
              </div>
              <div className={styles.charspecies}>
                <label className={styles.labelMed} htmlFor="life_span">
                  Years range
                </label>
                <input
                  className={`${styles.inputMed} ${styles.inputs}`}
                  placeholder="Min - Max"
                  id="life_span"
                  type="text"
                  value={characterData.life_span || ""}
                  onChange={handleChange}
                  disabled={isLoading}
                ></input>
                <label className={styles.error} htmlFor="life_span">
                  {errorData.life_span || " "}
                </label>
              </div>
            </div>

            <div className={styles.set}>
              <div className={styles.charspecies}>
                <label htmlFor="temperaments">Temperaments</label>
                <div className={styles.slidercontainer}>
                  <div className={styles.container}>
                    <ul id="temperaments" className={styles.kscboxtags}>
                      {stateTemperaments.length !== 0 &&
                        stateTemperaments.map((temperament) => {
                          return (
                            <li key={temperament}>
                              <input
                                type="checkbox"
                                id={temperament}
                                value={temperament}
                                onClick={onTemperament}
                                disabled={isLoading}
                              />
                              <label htmlFor={temperament} disabled={isLoading}>
                                {temperament}
                              </label>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <label className={styles.error} htmlFor="temperaments">
                  {errorData.temperaments || " "}
                </label>
              </div>
            </div>
          </header>
          <footer>
            <div className={styles.set}>
              {/*              <button id="back" className={styles.back} disabled={isLoading}>
                Back
              </button>
              <button id="Save" type="submit" className={styles.next} >
                Save
              </button> */}
              <button
                className={`${styles.button} ${errorCount !== 0 ? styles.errorBtn : null}`}
                id="Save"
                type="submit"
                onClick={handleSubmit}
                onTransitionEnd={transitionEnd}
                disabled={isLoading || !isCompleted.all}
              >
                <span className={styles.submit}>Save</span>
                <span className={styles.active}>
                  <img className={styles.i} src={sync} alt="" />
                </span>
                <span className={styles.check}>
                  <img className={styles.i} src={ok} alt="" />
                </span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    temperaments: state.temperaments,
    errors: state.errors,
    allCharacters: state.allCharacters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTemperaments: () => {
      dispatch(getTemperaments());
    },
    createCharacter: (data) => {
      dispatch(createCharacter(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBreed);
