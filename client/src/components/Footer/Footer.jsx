import React from "react";

import styles from "./Footer.module.css";

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
              <img
                className={styles.img}
                width="30"
                height="30"
                src="https://cdn3.iconfinder.com/data/icons/social-rounded-2/72/Linkedin-512.png"
                alt="linkedin"
              />
            </a>
          </li>
          <li className={styles.li}>
            <a href="https://github.com/becaale">
              <img
                className={styles.img}
                width="30"
                height="30"
                src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Github-512.png"
                alt="github"
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
