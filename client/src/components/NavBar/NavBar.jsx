import React from "react";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <>
    <div className={styles.bar}>
      <ul className={styles.ul} >
        <li className={styles.li} >
          <a className={styles.a} >Home</a>
        </li>
        <li className={styles.li} >
          <a className={styles.a} >About</a>
          <div className={styles.about}>
            <ul className={styles.ul} >
              <li className={styles.li} >
                <a className={styles.a} >Our team</a>
              </li>
              <li className={styles.li} >
                <a className={styles.a} >Camp sites</a>
              </li>
              <li className={styles.li} >
                <a className={styles.a} >Mission & Vision</a>
              </li>
              <li className={styles.li} >
                <a className={styles.a} >Resources</a>
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.li} >
          <a className={styles.a} >Things to do</a>
          <div className={styles.things}>
            <ul className={styles.ul} >
              <li className={styles.li} >
                <a className={styles.a} >Activites</a>
              </li>
              <li className={styles.li} >
                <a className={styles.a} >Parks</a>
              </li>
              <li className={styles.li} >
                <a className={styles.a} >Shops</a>
              </li>
              <li className={styles.li} >
                <a className={styles.a} >Events</a>
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.li} >
          <a className={styles.a} >Contact</a>
        </li>
        <li className={styles.li} >
          <a className={styles.a} >News</a>
        </li>
      </ul>
    </div>
    </>
  );
}
