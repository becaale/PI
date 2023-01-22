import React from "react";

import Breeds from "../Breeds/Breeds";
import Pagination from "../Pagination/Pagination";

import styles from "./Home.module.css";


const Home = () => {
  return (
    <>
      <div className={styles.Pagination}>
        <Pagination />
        <div className={styles.BreedList}>
          <Breeds />
        </div>
      </div>
    </>
  );
};

export default Home;
