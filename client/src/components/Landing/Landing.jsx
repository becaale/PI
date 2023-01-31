import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

import landing1 from "../../media/landing1.mp4";
import landing2 from "../../media/landing2.mp4";
import landing3 from "../../media/landing3.mp4";
import landing4 from "../../media/landing4.mp4";
import landing5 from "../../media/landing5.mp4";
import landing6 from "../../media/landing6.mp4";
import landing7 from "../../media/landing7.mp4";
import landing8 from "../../media/landing8.mp4";
import landing9 from "../../media/landing9.mp4";

import imglanding1 from "../../media/img/landing1.jpeg";

const URL_VIDEOS_LANDING = [
  landing1,
  landing2,
  landing3,
  landing4,
  landing5,
  landing6,
  landing7,
  landing8,
  landing9,
  landing2,
];
const getUniqueMinuteNumber = () => {
  return Number((Math.floor(Date.now() / 60000) % 10) + 1);
};

const HTML_VIDEO = (
  <div className="video">
    <video autoPlay={true} muted={true} loop={true} poster={imglanding1}>
      <source src={`${URL_VIDEOS_LANDING[getUniqueMinuteNumber()]}`} type="video/mp4" />
    </video>
  </div>
);

export default function Landing() {
  return (
    <div>
      {HTML_VIDEO}
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
                <span className={styles.style9}>join now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
