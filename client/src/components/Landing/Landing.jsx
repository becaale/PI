import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div>
      <section className={styles.style0}>
        <div className={styles.style1}>
          <div className={styles.style2}>
            <div className={styles.style3}>
              <p className={styles.style4}>
                <span className={styles.style5}>All breeds</span>
                <br className={styles.style6} /> <span className={styles.style7}>professional info for</span>
                <br className={styles.style8} />
                daycare, grooming &amp; training
              </p>
              <Link to="/dogs">
                <a className={styles.style9}>join now</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
