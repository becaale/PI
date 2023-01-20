import React from "react";

import Breeds from "../Breeds/Breeds";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <video
        src="https://vod-progressive.akamaized.net/exp=1674169391~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2148%2F8%2F210743842%2F722740798.mp4~hmac=ac39a9f9c4ee6638b3d10c657818022052a50809407f6ae7d8c0813045db70a2/vimeo-prod-skyfire-std-us/01/2148/8/210743842/722740798.mp4"
        autoplay="true"
        muted="true"
        loop="true"
        poster="https://carontestudio.com/img/contacto.jpg"
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
                <img width="30" height="30" src='https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Github-512.png' alt="github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
