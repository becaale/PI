import React from "react";

import styles from "./Footer.module.css";

import linkedin from "../../media/img/linkedin.png";
import github from "../../media/img/github.png";

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a className={styles.nombre} href="/about">
              Alejandro Becagigi, BECAALE®, 2023
            </a>
          </li>
          <li className={styles.li}>
            <a href="https://www.linkedin.com/in/becagigialejandro/">
              <img className={styles.img} width="30" height="30" src={linkedin} alt="linkedin" />
            </a>
          </li>
          <li className={styles.li}>
            <a href="https://github.com/becaale">
              <img className={styles.img} width="30" height="30" src={github} alt="github" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
