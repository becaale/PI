import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { filterCards, orderCards, searchCharacter } from "../../redux/actions";
import Breed from "../Breed/Breed";

import styles from "./NavBar.module.css";

function NavBar({ filterCards, orderCards, temperaments, searchCharacter }) {
  const [filteredTemperaments, setFilteredTemperaments] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  let location = useLocation();

  useEffect(() => {
    filtrar();
    if (search) searchCharacter(search);
  }, [search, setSearch, filter, setFilter, temperaments]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "inputTemperament":
        setFilter(event.target.value);
        break;
      case "inputSearch":
        setSearch(event.target.value);
        if (!event.target.value) searchCharacter("ALL");
        break;
      default:
        break;
    }
  };

  const filtrar = () => {
    if (filter === "") {
      setFilteredTemperaments(temperaments);
    } else {
      setFilteredTemperaments(temperaments.filter((element) => element.toUpperCase().includes(filter.toUpperCase())));
    }
  };

  const onFilter = (event) => {
    filterCards(event.target.id);
  };

  const onSort = (event) => {
    orderCards(event.target.id);
  };

  return (
    <>
      <div className={styles.bar}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={location.pathname === "/dogs" ? "/" : "/dogs"}
            >
              <a className={styles.a}>{location.pathname === "/dogs" ? "Landing" : "Home"}</a>
            </Link>
          </li>
          {location.pathname === "/dogs" && (
            <>
              <li className={styles.li}>
                <a className={styles.a}>Sort breed by</a>
                <div className={styles.about}>
                  <ul className={styles.ul}>
                    <li className={styles.li}>
                      <a className={styles.a} id="nameasc" onClick={onSort}>
                        Name ▲
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a className={styles.a} id="namedes" onClick={onSort}>
                        Name ▼
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a className={styles.a} id="weightasc" onClick={onSort}>
                        Weight ▲
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a className={styles.a} id="weightdes" onClick={onSort}>
                        Weight ▼
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={styles.li}>
                <a className={styles.a}>Filter by</a>
                <div className={styles.things}>
                  <ul className={styles.ul}>
                    <li className={styles.li}>
                      <a className={styles.a} id="clear" onClick={onFilter}>
                        Clear ✖
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a className={styles.a} id="allB" onClick={onFilter}>
                        All breeds ▶
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a className={styles.a} id="created" onClick={onFilter}>
                        Created breeds ▶
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a className={styles.a} id="api" onClick={onFilter}>
                        API breeds ▶
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a className={styles.a}>Temperament ▼</a>
                      <div className={styles.temperaments}>
                        <ul className={styles.ul}>
                          <input
                            className={styles.input}
                            type="text"
                            placeholder="Search.."
                            value={filter || ""}
                            id="inputTemperament"
                            autoComplete="off"
                            onChange={handleChange}
                          />
                          <li key="allT" className={styles.li}>
                            <a className={styles.a} id="allT" onClick={onFilter}>
                              All
                            </a>
                          </li>
                          {filteredTemperaments
                            .map((temperament) => {
                              return (
                                <li key={temperament} className={styles.li}>
                                  <a className={styles.a} id={temperament} onClick={onFilter}>
                                    {temperament}
                                  </a>
                                </li>
                              );
                            })
                            .slice(0, 5)}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          )}
          <li className={styles.li}>
            <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/creation">
              <a className={styles.a}>Create Breed</a>
            </Link>
          </li>
          <li className={styles.li}>
            <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/about">
              <a className={styles.a}>About</a>
            </Link>
          </li>
          {location.pathname === "/dogs" && (
            <input
              className={styles.inputSearch}
              type="text"
              placeholder="Search.."
              value={search || ""}
              id="inputSearch"
              autoComplete="off"
              onChange={handleChange}
            />
          )}
        </ul>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    temperaments: state.temperaments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterCards: (status) => {
      dispatch(filterCards(status));
    },
    orderCards: (order) => {
      dispatch(orderCards(order));
    },
    searchCharacter: (breed) => {
      dispatch(searchCharacter(breed));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
