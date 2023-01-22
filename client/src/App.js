import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";

import { getCharacters, searchCharacter, deleteCharacter, getTemperaments } from "./redux/actions";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateBreed from "./components/CreateBreed/CreateBreed";
import About from "./components/About/About";

import "./App.css";

const videosLanding = [
  "https://public.bn.files.1drv.com/y4m50qdTXE8UQ_mCNXITg1Sbam3L3HyxXeRR_WCsk1cSaBv8ZimEcOcH-hIlh_nw6ZjZ-Tmkiqj9Lr0b_3dETvq8wBeHy3ZFCLGRmAbcnLOEGUhaHUdZ6zr-ilLeg6J1uZor1Vyzf4kJiCwEX4WdsMRAQoCmBqX-H7Hzep3oghqvw3FrHUYrn7B1oA-jyg5Nl2qUkdwZOaVCgOQ8jZi4SVh83iWB03ZLzPxHiv4PFvDgLc?",
  "https://public.bn.files.1drv.com/y4mK-T6ZQy6hl1UNxXDoPBe-SjI_Rg60UCQ5wtmhrGMQKi6d3N7U0p_bAEcODX0ES37UuO-2K_OdvMEIMk0C2v5a8HhqsN8qFzNVp8ggi7SJvWO_ampccPFBovcHXtVGMn5s_Q96m7ZVbvORyycIya8fYpQE0-FFeTb47mZjh2o5lmRzFVHV5EWbc8dkB9mITXBHCc4n7aKxTEGRHPrw_TK7bmwUYmk_8UErKqk1b3eaxI?",
  "https://public.bn.files.1drv.com/y4mRHWXJam7kMbK_Ux9Y12955Xn4cQW4W8dLKQ2edxXdQPSSsM3kZDn8dpsmbGod-xwIDq7gjyojIW12hzgid4tjisFl1jEoIs1kcG5cZdQBV6AMJSFtkd6PD20SUDqYPEkvwd3TdV0NRXVGD41c6pksBz1kx2EnKix65m8ZVjFS6iWEYxvMT1BOuZGQmu1KY9NutpiHS73uZ56sldg8fs5tv93rCf5e9eqaOKy8CvDdmw?",
  "https://public.bn.files.1drv.com/y4m12amEV0-x3w_ajTyQVOv3NYCuHKSn3vwDFufWQzzvsDPrQhaB8cXtTQ9nvkXyzhlFieyatBosOgpnmpBiytf0eeW1zy3JdjG_lPWWfA72hwmZNpWRv2g3IqFaSHbCmTkAkmq5_a-ali_MolIrIrlyafUmG3rzgzqnXHCmKe6Xa84vSl2jN7chqf26J2tcplBkbv95gKD1Or7swApPz6ojFzwqC5EPTs2hMYamjbdZ4k?",
  "https://public.bn.files.1drv.com/y4mZ8h6Rb9wF8MR4CLgRVFh_co-qKvwiAoo8Eg74C5ERa3e2Kdr7onYJFscaHG0Dia947RP5emaguTgHqec4A6FmL6APoTRoMS9gx-udjYrFka7_19e5EbSUaz44cpuifLTQcSJm97kHfn2VHR64HW4baPc37eoqvEj2lLXG4OG2_DsuXYlwrV-i1Ex1yXdMqXsi2tWXVyKgC-cOJZz7e9M87YyhgqZ5iFPUTgXGU5lecs?",
  "https://public.bn.files.1drv.com/y4mi7lcI91TRiULgDy-_XQD49k-2pYnP3iid_9zSv-97s0EoLK2FCKZ1bK7zFBA68Eyz6q5PRmz_6RvlvZPpSZqfEb3WDb367x9DNCnkxsE_DE_0VzQqVmHwwOAdN3kY4Y9nmMQasYq41xkZzGLqG2IkBiD_3dSWLn_TY9-nDYrOkdD_6YfOM4c4citpBry3DOv1N7_7SoZ8TsOgcvzy8iuFh4dYjiJgjbYjEs1Cs_OPFU?",
  "https://public.bn.files.1drv.com/y4m50B9x9hDcMLoOEWn8XODYzQ3zBJYSz2YIft4my4wQEXujWAUDehglftV4OjR-NE-_kvXAeYDv9gud-dk5DqKZR2VV1BTlXp8NfM-x1rpS-HgRmavrInIQBuFZ36oFd7-ETbW0lXgTiCBj_fU-8qpaq6bv-9xRuhCfckP3SFU4eqp0HlLC0Va53fBOqGuM5WA4cRhXlqn-04r3ac4Zx9wCLEq6lsgL39JXTRqCNLYRAk?",
];

const videosHome = [
  "https://public.bn.files.1drv.com/y4m8Zqqu9PubWkHOnQuJXlw1_rRfPnfL3NwoeZWIzuCU3Xw35WaNYTn2oNe8IGkXuORcEqOEziw6aKS3IKLtLTvJD0Gua5C0CkecUMjPyFk_3er7KMLnW68rY8hnho5C9s7BPE70BWzHpt6_8p0UnFuPIM-5YSUMicjp91sxkIRtJ5nU4J3cOQamyBXIqikkCmBXtwE6F89u1TiIOK3I4gj46pisisRQ878cgsRt6mJ9bM?",
  "https://public.bn.files.1drv.com/y4mT2xsAy8xFG0VFpZT9twhxkGpptYAn2Lto0kqEVZ8fOXne0xzaZanR2bFnitnUQ6pcy7qDIjobxFx_8n4njuFx4l6kewSG1dMNBZZZMbmRTlGK8mk_jvOGM_RkSHfQmZWequZXVRuE3yOZobIPa-a6rYhhUglasLMJ1F7aRdawESue1MASseMPvk18GGI8NLbtUxW_K7-Z9nC8kTCauyP1EaeejrP6ejQqLlvxbfYam8?",
  "https://public.bn.files.1drv.com/y4mpuorHvIoML7KN_gcJixaY1YPms8dTvH4Tafo7KeDP6dazr3JF_a2azR_w0VQDWiiwC_jHE8kytZ6GGUD519K0YUnIR8ugVf4CY_QSGcZ5dZK67-f6-y7d2Mbcgw9eCfHdklv8hCm44gn9paZtX9fQ-k5-ekWDiIU5odx8RTYqCMyxnP1NZKwleLxSdAmAlSPc6XKk_MdHNT0b8f3SF_2l17MoQIiqmAPeK8WvTGevfo?",
  "https://public.bn.files.1drv.com/y4mwCQDf8Js9-1veYoze1P4gcXNMhck0dTujt6gQRPgxQj-zBHNprUZpnt9X2Nvv6tb4KT7q3c3P-GASgxGqfkqqizSeyLxB9wh_EtszpC6ljccQQj1f2IM71VcEfY-ixMjYFYln3GsgU9STY6uzdFOOBQaKAGsLdZsW759L2CGyHWiHtuyZQywtVNPX6a3jat9hfeWwHxGjdD-gZfWfPU1F_bUtbO_jaobh_8K661Ip3Q?",
  "https://public.bn.files.1drv.com/y4mwCQDf8Js9-1veYoze1P4gcXNMhck0dTujt6gQRPgxQj-zBHNprUZpnt9X2Nvv6tb4KT7q3c3P-GASgxGqfkqqizSeyLxB9wh_EtszpC6ljccQQj1f2IM71VcEfY-ixMjYFYln3GsgU9STY6uzdFOOBQaKAGsLdZsW759L2CGyHWiHtuyZQywtVNPX6a3jat9hfeWwHxGjdD-gZfWfPU1F_bUtbO_jaobh_8K661Ip3Q?",
  "https://public.bn.files.1drv.com/y4m6RT7qKsyffROitTQVqCGhL3G3ZKB_yaPEXMRxUvWYCiVlgMOJcjU14Q6U89Qc6AjzMeS4f-S88v0SK39sITarTpnAcYT-Qd2b_Z4zR4DcaI1cE8CpU1DCh_RGHfu61Q5IAXJ3N92yW3N9v2UuiD8_Z3h2A3x-0mIwlnnbX-IBz3bg22ZVBTS9iDEs55GVer0BRm9Fs1x45TQz73uizyE1cRQJ7XvLrAJuy9IGwE_knc?",
  "https://public.bn.files.1drv.com/y4mJn6QGd30vAtKGZzoMg7qwyCS4MV2lefq4OJIfH9yENGm4p1p7yXKaunYpvfePtXqnhnAntUApj7ii1LbcpxoKfJRvK0pzCX5lfGl0Wz7iCv1pGZaSnk5fbNApL4H5aArKKB4beOv-Lea3KqAYNYgwoV2WtimmmCxaKmynAK-bLF1LYibpmmZtbyABovi60vxDLOfwvmKx1bTkzrpTvp8mzA1n0nmo6MLjeRRRE0aZtY?",
  "https://public.bn.files.1drv.com/y4mFTic3QjcG_H2_1tFYfT5_dp4QHfLopzfaazv8AGCyEUpWpFFuBNydN7CzdxUnqoekTXQWlti1v8rFnMnpl8SU7Wbnyhedw2K3lRw6SKbUw-AqQ8XxIrq5R4igwxXp00-8WmFptUSlSeK1hCubQ26iR-9nr422FlwAiOrJPULXlMKJN3Qxit0VOw2o3dMHMt39qr5eGYOx_MYr83eygD67JNZgcu2lB1NGrFnn4Clni0?",
  "https://public.bn.files.1drv.com/y4mk7_fnCAUws_kMlQViPs4BPa6g_1N23J8s2vkydSNfGeGEn2J4WKvdpsp0N1_B-x-9slkobGFTKPcDO_cHeq2LJYFC1vmD2k4wElYmnppF6NIeUiFFKMRAIh92mHfNVGb4RgR1SYwt_YCzgxhVXzXdld1BLFIuOXlK11-HOTudFSWMFAcx4QY5xmHiTOfudq-dF9XvW6HgF8Pscj9UaDrJhbOC_AGPk7trnS2OFifpM4?",
  "https://public.bn.files.1drv.com/y4mQmqc57A7z_M1xIcC7qqDUR7RQ5zfh3tGxh6kuKepy5fJEXsoZCEdqUxdGa947bG2oD1Hf8Z8DahxfBM9hqu5rVguRxa8fSTZnv4Lg6MaYkjW_-ZEXxwmTymps3FuB4K0FiTRdN4gH9ipAy08Fh_RMYHMnTbdzAqBJJtn-TZ23iVAIG5b_nqAhqzBoP9k4U9KCsqO_iv6L2pYLqJCj6R0mKMCjHY3KkhuAZTrGslL73k?",
];

function App() {
  let location = useLocation();

  const dispatch = useDispatch();

  const stateCharacters = useSelector((state) => state.characters);
  const stateTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    if (stateCharacters.length === 0) dispatch(getCharacters());
    if (stateTemperaments.length === 0) dispatch(getTemperaments());
  }, [stateTemperaments, stateCharacters, dispatch]);

  const onSearch = (character) => {
    dispatch(searchCharacter(character));
  };
  const getUniqueMinuteNumber = () => {
    return (Math.floor(Date.now() / 60000) % 10) + 1;
  };
  return (
    <div className="App">
      {location.pathname !== "/" ? <NavBar onSearch={onSearch} /> : null}
      <Route exact path="/" render={() => <Landing />} />
      <Route exact path="/dogs" render={() => <Home />} />
      <Route exact path="/dogs/:id" render={() => <Details />} />
      <Route exact path="/creation" render={() => <CreateBreed />} />
      <Route exact path="/about" element={<About />} />

      {location.pathname !== "/" ? (
        <>
          <video
            src={videosHome[getUniqueMinuteNumber()]}
            autoplay="true"
            muted="true"
            loop="true"
            poster="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
          ></video>
        </>
      ) : (
        <>
          <video
            src={videosLanding[getUniqueMinuteNumber()]}
            autoplay="true"
            muted="true"
            loop="true"
            poster="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
          ></video>
        </>
      )}
      
    </div>
  );
}

export default App;
