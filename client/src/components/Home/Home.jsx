import React from "react";

import Breeds from "../Breeds/Breeds";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <video
        src="https://vod-progressive.akamaized.net/exp=1674229913~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2362%2F17%2F436810802%2F1905309627.mp4~hmac=b9a0f14a435bbb5860d02f6556d2f4fc6ea97abf363b1ced368766930beced64/vimeo-prod-skyfire-std-us/01/2362/17/436810802/1905309627.mp4"
        autoplay="true"
        muted="true"
        loop="true"
        poster="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
      ></video>
      <div className={styles.BreedList}>
        <Breeds />
      </div>

      <div className={styles.footer}>
        <div className={styles.credits}>
          <ul>
            <li>
              <a className={styles.nombre} href="/about">
                Alejandro Becagigi, 2023
              </a>
            </li>
            <li>
              <ul>
                <li>•</li>
              </ul>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/becagigialejandro/">
                <img
                  width="30"
                  height="30"
                  src="https://cdn3.iconfinder.com/data/icons/social-rounded-2/72/Linkedin-512.png"
                  alt="linkedin"
                />
              </a>
            </li>
            <li>
              <ul>
                <li>•</li>
              </ul>
            </li>
            <li>
              <a href="https://github.com/becaale">
                <img
                  width="30"
                  height="30"
                  src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Github-512.png"
                  alt="github"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
