import React from "react";

import styles from "./Details.module.css";

import { connect } from "react-redux";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import pulgoso from "../../media/img/pulgoso.png";
import pata from "../../media/img/pata.png";

function Details({ allCharacters }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [character, setCharacter] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    if (allCharacters.length && id) {
      let charActive = allCharacters.find((char) => char.id == id);
      if (!charActive.temperament || !charActive.temperament.length) {
        charActive.temperament = [];
      } else {
        charActive = {
          ...charActive,
          temperament: charActive.temperament.split(", "),
          image: charActive.image === "pulgoso" && pulgoso,
        };
      }
      setCharacter(charActive);
    } else if (!id) {
      setCharacter({
        name: "Alejandro Becagigi",
        height: "185",
        weight: "100",
        life_span: "100 - 115",
        image:
          "https://media.licdn.com/dms/image/D4D03AQFc4lToGoaPPA/profile-displayphoto-shrink_800_800/0/1673647740600?e=1680134400&v=beta&t=eh9XefhgMhcTVucVtDkQZD9ka3xfDMRKLpPoMHVhTlw",
        temperament: [
          "Detail-oriented",
          "Proactive",
          "Adaptable",
          "Collaborative",
          "Problem-solver",
          "Self-motivated",
          "Continuous-learner",
          "Communicative",
          "Innovative",
          "Quality-conscious",
        ],
      });
    }
  }, [allCharacters, id]);

  function toggleClass(event) {
    event.target.classList.toggle(styles.active);
  }

  function addClass(event) {
    toggleClass(event);
    event.target.classList.add(styles.finished);
  }

  return (
    <div className={styles.createcontainer}>
      <div className={styles.leftcontainer}>
        <img src={pata} alt="" className={styles.logo} />
        <div className={styles.img}>
          <img className={styles.imagen} src={character.image || pulgoso} />
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <header>
          <h1 className={styles.h1}>{character.name || " "}</h1>
          <div className={styles.set}>
            <div className={styles.charspecies}>
              <label className={styles.labelMed} htmlFor="height">
                Height (Cm)
              </label>
              <input
                className={`${styles.inputMed} ${styles.inputs}`}
                placeholder="Min - Max"
                id="height"
                type="text"
                value={character.height || " "}
                disabled={isLoading}
              ></input>
            </div>
            <div className={styles.charspecies}>
              <label className={styles.labelMed} htmlFor="weight">
                Weight (Kg)
              </label>
              <input
                className={`${styles.inputMed} ${styles.inputs}`}
                placeholder="Min - Max"
                id="weight"
                type="text"
                value={character.weight || " "}
                disabled={isLoading}
              ></input>
            </div>
            <div className={styles.charspecies}>
              <label className={styles.labelMed} htmlFor="years">
                Years
              </label>
              <input
                className={`${styles.inputMed} ${styles.inputs}`}
                placeholder="Min - Max"
                id="years"
                type="text"
                value={character.life_span.replace(" years", "") || " "}
                disabled={isLoading}
              ></input>
            </div>
          </div>

          <div className={styles.set}>
            <div className={styles.charspecies}>
              <label htmlFor="temperaments">Temperaments</label>
              <div className={styles.slidercontainer}>
                <div className={styles.container}>
                  <ul id="temperaments" className={styles.kscboxtags}>
                    {character.temperament !== "" &&
                      character.temperament.map((temperament) => {
                        return (
                          <li key={temperament}>
                            <input type="checkbox" id={temperament} value={temperament} disabled={isLoading} checked />
                            <label htmlFor={temperament} disabled={true}>
                              {temperament}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    allCharacters: state.allCharacters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
