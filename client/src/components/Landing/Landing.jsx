import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const VideosLanding = [
  "https://public.bn.files.1drv.com/y4m50qdTXE8UQ_mCNXITg1Sbam3L3HyxXeRR_WCsk1cSaBv8ZimEcOcH-hIlh_nw6ZjZ-Tmkiqj9Lr0b_3dETvq8wBeHy3ZFCLGRmAbcnLOEGUhaHUdZ6zr-ilLeg6J1uZor1Vyzf4kJiCwEX4WdsMRAQoCmBqX-H7Hzep3oghqvw3FrHUYrn7B1oA-jyg5Nl2qUkdwZOaVCgOQ8jZi4SVh83iWB03ZLzPxHiv4PFvDgLc?",
  "https://public.bn.files.1drv.com/y4mK-T6ZQy6hl1UNxXDoPBe-SjI_Rg60UCQ5wtmhrGMQKi6d3N7U0p_bAEcODX0ES37UuO-2K_OdvMEIMk0C2v5a8HhqsN8qFzNVp8ggi7SJvWO_ampccPFBovcHXtVGMn5s_Q96m7ZVbvORyycIya8fYpQE0-FFeTb47mZjh2o5lmRzFVHV5EWbc8dkB9mITXBHCc4n7aKxTEGRHPrw_TK7bmwUYmk_8UErKqk1b3eaxI?",
  "https://public.bn.files.1drv.com/y4mRHWXJam7kMbK_Ux9Y12955Xn4cQW4W8dLKQ2edxXdQPSSsM3kZDn8dpsmbGod-xwIDq7gjyojIW12hzgid4tjisFl1jEoIs1kcG5cZdQBV6AMJSFtkd6PD20SUDqYPEkvwd3TdV0NRXVGD41c6pksBz1kx2EnKix65m8ZVjFS6iWEYxvMT1BOuZGQmu1KY9NutpiHS73uZ56sldg8fs5tv93rCf5e9eqaOKy8CvDdmw?",
  "https://public.bn.files.1drv.com/y4m12amEV0-x3w_ajTyQVOv3NYCuHKSn3vwDFufWQzzvsDPrQhaB8cXtTQ9nvkXyzhlFieyatBosOgpnmpBiytf0eeW1zy3JdjG_lPWWfA72hwmZNpWRv2g3IqFaSHbCmTkAkmq5_a-ali_MolIrIrlyafUmG3rzgzqnXHCmKe6Xa84vSl2jN7chqf26J2tcplBkbv95gKD1Or7swApPz6ojFzwqC5EPTs2hMYamjbdZ4k?",
  "https://public.bn.files.1drv.com/y4mZ8h6Rb9wF8MR4CLgRVFh_co-qKvwiAoo8Eg74C5ERa3e2Kdr7onYJFscaHG0Dia947RP5emaguTgHqec4A6FmL6APoTRoMS9gx-udjYrFka7_19e5EbSUaz44cpuifLTQcSJm97kHfn2VHR64HW4baPc37eoqvEj2lLXG4OG2_DsuXYlwrV-i1Ex1yXdMqXsi2tWXVyKgC-cOJZz7e9M87YyhgqZ5iFPUTgXGU5lecs?",
  "https://public.bn.files.1drv.com/y4mi7lcI91TRiULgDy-_XQD49k-2pYnP3iid_9zSv-97s0EoLK2FCKZ1bK7zFBA68Eyz6q5PRmz_6RvlvZPpSZqfEb3WDb367x9DNCnkxsE_DE_0VzQqVmHwwOAdN3kY4Y9nmMQasYq41xkZzGLqG2IkBiD_3dSWLn_TY9-nDYrOkdD_6YfOM4c4citpBry3DOv1N7_7SoZ8TsOgcvzy8iuFh4dYjiJgjbYjEs1Cs_OPFU?",
  "https://public.bn.files.1drv.com/y4m50B9x9hDcMLoOEWn8XODYzQ3zBJYSz2YIft4my4wQEXujWAUDehglftV4OjR-NE-_kvXAeYDv9gud-dk5DqKZR2VV1BTlXp8NfM-x1rpS-HgRmavrInIQBuFZ36oFd7-ETbW0lXgTiCBj_fU-8qpaq6bv-9xRuhCfckP3SFU4eqp0HlLC0Va53fBOqGuM5WA4cRhXlqn-04r3ac4Zx9wCLEq6lsgL39JXTRqCNLYRAk?",
];

export default function Landing() {
  return (
    <div>
      <section className={styles.style0}>
        <video
          src={VideosLanding[Math.floor(Math.random() * 7) + 1]}
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
