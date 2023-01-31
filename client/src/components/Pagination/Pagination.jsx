import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { setPageCharacter } from "../../redux/actions";

import styles from "./Pagination.module.css";

const Pagination = ({ characters, setPageCharacter }) => {
  const [chars, SetChars] = useState(characters);
  const [charsPerPage, SetCharsPerPage] = useState(8);
  const [currentPage, SetCurrentPage] = useState(1);

  const onPageChangeEvent = (start, end) => {
    if (!isNaN(start) && !isNaN(end)) {
      setPageCharacter(start, end);
    }
  };

  const OnPerCharsChangeEvent = (e) => {
    SetCharsPerPage(e.target.value);
    SetCurrentPage(1);
  };

  let numOfPages = Math.ceil(chars.length / charsPerPage);

  const numOfButtons = [];
  for (let i = 1; i <= numOfPages; i++) {
    numOfButtons.push(i);
  }

  const prevPageClick = () => {
    if (currentPage === 1) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (currentPage === numOfButtons.length) {
      SetCurrentPage(currentPage);
    } else {
      SetCurrentPage(currentPage + 1);
    }
  };

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    if (chars.length !== characters.length) SetChars(characters);
    let tempNumberOfButtons = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numOfButtons.length < 6) {
      tempNumberOfButtons = numOfButtons;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfButtons = [1, 2, 3, 4, 5, dotsInitial, numOfButtons.length];
    } else if (currentPage === 4) {
      const sliced = numOfButtons.slice(0, 5);
      tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
    } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
      const sliced1 = numOfButtons.slice(currentPage - 2, currentPage);
      const sliced2 = numOfButtons.slice(currentPage, currentPage + 1);
      tempNumberOfButtons = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numOfButtons.length];
    } else if (currentPage > numOfButtons.length - 3) {
      const sliced = numOfButtons.slice(numOfButtons.length - 4);
      tempNumberOfButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      SetCurrentPage(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      SetCurrentPage(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfButtons);
    const value = currentPage * charsPerPage;
    onPageChangeEvent(value - charsPerPage, value);
  }, [characters, currentPage, charsPerPage, numOfPages]);

  return (
    <>
      <div className={styles.tablefilterinfo}>
        <div className={styles.dtpagination}>
          <ul className={styles.dtpaginationul}>
            <li className={`${styles.dtitem} ${currentPage === 1 ? "disabled" : ""}`}>
              <a className={styles.dtlink} onClick={prevPageClick}>
                Prev
              </a>
            </li>
            {arrOfCurrButtons.map((data, index) => {
              return (
                <li key={index} className={`${styles.dtitem}`}>
                  <a
                    className={`${currentPage === data ? styles.active : styles.dtlink}`}
                    onClick={() => SetCurrentPage(data)}
                  >
                    {data}
                  </a>
                </li>
              );
            })}
            <li className={`${styles.dtitem} ${currentPage === numOfButtons.length ? "disabled" : ""}`}>
              <a className={styles.dtlink} onClick={nextPageClick}>
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    allCharacters: state.allCharacters,
    pageChars: state.pageChars,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPageCharacter: (start, end) => {
      dispatch(setPageCharacter(start, end));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
