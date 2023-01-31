import React from "react";
import { Link } from "react-router-dom";

import styles from "./Breed.module.css";

export default function Breed({ id, name, weight, temperament, image }) {
  return (
    <div className={`${styles.containerCard} ${styles.card}`}>
      <div className={styles.wrapper}>
        <img className={styles.img} src={image} alt={`img of ${name}`} />
        <div className={styles.data}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              <Link style={{ color: "inherit", textDecoration: "inherit" }} to={`/dogs/${id}`}>
                <span className={styles.a}>{name}</span>
              </Link>
            </h1>
            <span className={styles.author}>{weight} Kg</span>
            <p className={styles.text}>{temperament}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
