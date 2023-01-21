import React from "react";

import styles from "./Breed.module.css";

export default function Breed({ id, name, species, gender, image }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={`img of ${name}`} />
      <div className={styles.cont}></div>
      <div className={styles.data}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <div className={styles.especs}>
          <p className={styles.cardDescription}>{species}</p>
          <p className={styles.cardDescription}>{gender}</p>
        </div>
      </div>
    </div>
  );
}
