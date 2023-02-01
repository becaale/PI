import React from "react";
import { Link } from "react-router-dom";

import styles from "./Breed.module.css";

import pulgoso from "../../media/img/pulgoso.png";

export default function Breed({ id, name, weight, temperament, image }) {
  if (image === "pulgoso" || !image) image = pulgoso;
  const styleimg = `${styles.img} ${image !== pulgoso ? styles.preimg : ""}`;

  return (
    <div className={`${styles.containerCard} ${styles.card}`}>
      <div className={styles.wrapper}>
        <img className={styleimg} src={image} alt={`img of ${name}`} />
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
