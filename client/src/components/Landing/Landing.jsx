import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div>
      <section className={styles.style0}>
        <video
          src="https://vod-progressive.akamaized.net/exp=1674156735~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2106%2F22%2F560534782%2F2650792461.mp4~hmac=716159d2f0c9d7a46adf940cf466045f03de3b9f80ca0533a2caa3479eb41d23/vimeo-prod-skyfire-std-us/01/2106/22/560534782/2650792461.mp4"
          autoplay="true"
          muted="true"
          loop="true"
          poster="https://carontestudio.com/img/contacto.jpg"
        ></video>
        <div className={styles.style1}>
          <div className={styles.style2}>
            <div className={styles.style3}>
              <p className={styles.style4}>
                <span className={styles.style5}>All breeds</span>
                <br className={styles.style6} /> <span className={styles.style7}>professional info for</span>
                <br className={styles.style8} />
                daycare, grooming &amp; training
              </p>{" "}
              <Link to="/dogs">
                {" "}
                <a className={styles.style9}>join now</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
