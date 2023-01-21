import React from "react";

import Breeds from "../Breeds/Breeds";
import Pagination from "../Pagination/Pagination";

import styles from "./Home.module.css";

const videosHome = [
  "https://public.bn.files.1drv.com/y4m8Zqqu9PubWkHOnQuJXlw1_rRfPnfL3NwoeZWIzuCU3Xw35WaNYTn2oNe8IGkXuORcEqOEziw6aKS3IKLtLTvJD0Gua5C0CkecUMjPyFk_3er7KMLnW68rY8hnho5C9s7BPE70BWzHpt6_8p0UnFuPIM-5YSUMicjp91sxkIRtJ5nU4J3cOQamyBXIqikkCmBXtwE6F89u1TiIOK3I4gj46pisisRQ878cgsRt6mJ9bM?",
  "https://public.bn.files.1drv.com/y4mT2xsAy8xFG0VFpZT9twhxkGpptYAn2Lto0kqEVZ8fOXne0xzaZanR2bFnitnUQ6pcy7qDIjobxFx_8n4njuFx4l6kewSG1dMNBZZZMbmRTlGK8mk_jvOGM_RkSHfQmZWequZXVRuE3yOZobIPa-a6rYhhUglasLMJ1F7aRdawESue1MASseMPvk18GGI8NLbtUxW_K7-Z9nC8kTCauyP1EaeejrP6ejQqLlvxbfYam8?",
  "https://public.bn.files.1drv.com/y4mpuorHvIoML7KN_gcJixaY1YPms8dTvH4Tafo7KeDP6dazr3JF_a2azR_w0VQDWiiwC_jHE8kytZ6GGUD519K0YUnIR8ugVf4CY_QSGcZ5dZK67-f6-y7d2Mbcgw9eCfHdklv8hCm44gn9paZtX9fQ-k5-ekWDiIU5odx8RTYqCMyxnP1NZKwleLxSdAmAlSPc6XKk_MdHNT0b8f3SF_2l17MoQIiqmAPeK8WvTGevfo?",
  "https://public.bn.files.1drv.com/y4mwCQDf8Js9-1veYoze1P4gcXNMhck0dTujt6gQRPgxQj-zBHNprUZpnt9X2Nvv6tb4KT7q3c3P-GASgxGqfkqqizSeyLxB9wh_EtszpC6ljccQQj1f2IM71VcEfY-ixMjYFYln3GsgU9STY6uzdFOOBQaKAGsLdZsW759L2CGyHWiHtuyZQywtVNPX6a3jat9hfeWwHxGjdD-gZfWfPU1F_bUtbO_jaobh_8K661Ip3Q?",
  "https://public.bn.files.1drv.com/y4m6RT7qKsyffROitTQVqCGhL3G3ZKB_yaPEXMRxUvWYCiVlgMOJcjU14Q6U89Qc6AjzMeS4f-S88v0SK39sITarTpnAcYT-Qd2b_Z4zR4DcaI1cE8CpU1DCh_RGHfu61Q5IAXJ3N92yW3N9v2UuiD8_Z3h2A3x-0mIwlnnbX-IBz3bg22ZVBTS9iDEs55GVer0BRm9Fs1x45TQz73uizyE1cRQJ7XvLrAJuy9IGwE_knc?",
  "https://public.bn.files.1drv.com/y4mJn6QGd30vAtKGZzoMg7qwyCS4MV2lefq4OJIfH9yENGm4p1p7yXKaunYpvfePtXqnhnAntUApj7ii1LbcpxoKfJRvK0pzCX5lfGl0Wz7iCv1pGZaSnk5fbNApL4H5aArKKB4beOv-Lea3KqAYNYgwoV2WtimmmCxaKmynAK-bLF1LYibpmmZtbyABovi60vxDLOfwvmKx1bTkzrpTvp8mzA1n0nmo6MLjeRRRE0aZtY?",
  "https://public.bn.files.1drv.com/y4mFTic3QjcG_H2_1tFYfT5_dp4QHfLopzfaazv8AGCyEUpWpFFuBNydN7CzdxUnqoekTXQWlti1v8rFnMnpl8SU7Wbnyhedw2K3lRw6SKbUw-AqQ8XxIrq5R4igwxXp00-8WmFptUSlSeK1hCubQ26iR-9nr422FlwAiOrJPULXlMKJN3Qxit0VOw2o3dMHMt39qr5eGYOx_MYr83eygD67JNZgcu2lB1NGrFnn4Clni0?",
  "https://public.bn.files.1drv.com/y4mk7_fnCAUws_kMlQViPs4BPa6g_1N23J8s2vkydSNfGeGEn2J4WKvdpsp0N1_B-x-9slkobGFTKPcDO_cHeq2LJYFC1vmD2k4wElYmnppF6NIeUiFFKMRAIh92mHfNVGb4RgR1SYwt_YCzgxhVXzXdld1BLFIuOXlK11-HOTudFSWMFAcx4QY5xmHiTOfudq-dF9XvW6HgF8Pscj9UaDrJhbOC_AGPk7trnS2OFifpM4?",
  "https://public.bn.files.1drv.com/y4mQmqc57A7z_M1xIcC7qqDUR7RQ5zfh3tGxh6kuKepy5fJEXsoZCEdqUxdGa947bG2oD1Hf8Z8DahxfBM9hqu5rVguRxa8fSTZnv4Lg6MaYkjW_-ZEXxwmTymps3FuB4K0FiTRdN4gH9ipAy08Fh_RMYHMnTbdzAqBJJtn-TZ23iVAIG5b_nqAhqzBoP9k4U9KCsqO_iv6L2pYLqJCj6R0mKMCjHY3KkhuAZTrGslL73k?",
];

const Home = () => {
  return (
    <>
      <video
        src={videosHome[Math.floor(Math.random() * 9) + 1]}
        autoplay="true"
        muted="true"
        loop="true"
        poster="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
      ></video>
      <div className={styles.Pagination}>
        <Pagination />
        <div className={styles.BreedList}>
          <Breeds />
        </div>
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
