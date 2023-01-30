import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";

import { getCharacters, searchCharacter, deleteCharacter, getTemperaments } from "./redux/actions";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import CreateBreed from "./components/CreateBreed/CreateBreed";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  const stateCharacters = useSelector((state) => state.characters);
  const stateTemperaments = useSelector((state) => state.temperaments);

  let location = useLocation();
  const dispatch = useDispatch();

  const getUniqueMinuteNumber = () => {
    return (Math.floor(Date.now() / 60000) % 10) + 1;
  };

  const URL_VIDEOS_HOME = [
    "https://q4oqhq.bn.files.1drv.com/y4mpjwkKT17_dC8CUSWLRgn98XDAwQEiZqn8bVvfZ4GC3KaV_k397VYxlD8IkRla4xS7k0ESUoQ96XnsKm-Ngb9OBMvg6BY8NP-AABGhBFCxBgV58-l2pO6mtwccoc5j4uNsmYLb2b2_cOSU7vFFaPlwkfbzEga3SFl9y2LvVJr0wxcdY4WYXyrij76BNWnWhKQjtCJ13P40ZDFrEyRF3paww?",
    "https://ohhjnw.bn.files.1drv.com/y4mqhMx12sH5k-u_GMZpI7ofUpeJJqvVBxh7BJI1IVSN1EDQKE52kOxcYjLHrhu_v0dbf-gginHatBh6xN7MkMboEZSwTRttKSrY9kCPm4I7FW07QHcAnkkBvll0uz_gLUgnai8NQ-5kARP9VKzHDfobP5yHfnVtfB6zru0DF_br6s1gWu32Gc0GG5g7utUkAx8xaefJhDNGyDAhcajvt9lGg?",
    "https://ohhc8a.bn.files.1drv.com/y4mJQhj_8VbDel-aDIvYFCEjIbYunKXOhDehhgjas0Vm9Dl2TXA7crYldy1gOWtDNkurNAMBgqvk5O-lHGlKCBoT7vE1M17lxm8j43nJqMFl0XNYDQRZ7FQoV5A5FWoP6j8Zz0En0m_0bW9z0hMHCP-6FKur5WftbQX_gwFCViPdQ-zD60HkNJQwcq9Ko1qbUzbpHlP8noV0QM1gr6U7M4e5A?",
    "https://ohfkra.bn.files.1drv.com/y4mQezrGHmOgUvt_z9-Ke-3YYkm_7kFzhP-ZpHPC6S8tykgV6_eX1CiElRYxC9d0O5ERUFx5fy0q3KxsGMLITqFvijbFhi7OoemqeOoTkVxY3aAnbfTPZYuSo0oiddvdxqHzpqMlASx_lW2SLfevxqjww5NFtmHXDx5Moc0By83R0L38Y5FN6sa8OhDwhXonjxrhHaue5fvjQUZTW-ZdAkjjw?",
    "https://ohenfa.bn.files.1drv.com/y4moYinGMNYDmCS5vkZF4Usutd1YsEQnMJKHdVUlBPrHI3KsA02vm5VXsx7fZdgZnGjXJpGMJRpgZArIJzFcNin7O9-O5zf8z3Gg4lkUoJGyTmWujY8K8qFpklw_epbqSGIuJPAamHljejXdNbuklnSD3jCLL5UNnvsos2NnOPfShqUnOa8n3-4ewZ5_KYic0GW4PDMmYhqEbOxpcEy8dRA2g?",
    "https://0pu68q.bn.files.1drv.com/y4mV2QYPBOcWM_pf8qlZfDq7Q5vu3trnT5efeGe2sJHxYWGqQH1S9E2rL6j2yLOt5x5hoRUzR9XsYGYgxVye5P0vygGKms9hLlUHxjJwnsMg1O_wlDDYj4VsXZAQyA6a8DsAs3mEv11ZqiJWjoFaL1fTzPuAk59ynL7Zuqpr7lKz8nnUIKqSdcrbRM4aoIF1ZZ_U7htK5gAjr_YIhPEK-zptA?",
    "https://0pultw.bn.files.1drv.com/y4mI5UcLLMUaMp52rKkTbEDyTNY9_itMnjlFSLWtT5PoBmzTQq3uehxVrPG-7lZJxbVRkwupV6BBoYNJb-5cEUfK3Pb3w-7tmw87LNl1-YR8eSW9i7RPBxcpzRfzHHifTYM702NfCeNkTWgC0IKAXR56_X_EWIsyVdX3m_RJM_YcY4SoFfi66MybhMF2NETjueksPbcCgpqt2z8xh8x-_Oo7Q?",
    "https://ohhjnw.bn.files.1drv.com/y4mqhMx12sH5k-u_GMZpI7ofUpeJJqvVBxh7BJI1IVSN1EDQKE52kOxcYjLHrhu_v0dbf-gginHatBh6xN7MkMboEZSwTRttKSrY9kCPm4I7FW07QHcAnkkBvll0uz_gLUgnai8NQ-5kARP9VKzHDfobP5yHfnVtfB6zru0DF_br6s1gWu32Gc0GG5g7utUkAx8xaefJhDNGyDAhcajvt9lGg?",
    "https://ohenfa.bn.files.1drv.com/y4moYinGMNYDmCS5vkZF4Usutd1YsEQnMJKHdVUlBPrHI3KsA02vm5VXsx7fZdgZnGjXJpGMJRpgZArIJzFcNin7O9-O5zf8z3Gg4lkUoJGyTmWujY8K8qFpklw_epbqSGIuJPAamHljejXdNbuklnSD3jCLL5UNnvsos2NnOPfShqUnOa8n3-4ewZ5_KYic0GW4PDMmYhqEbOxpcEy8dRA2g?",
    "https://0pu68q.bn.files.1drv.com/y4mV2QYPBOcWM_pf8qlZfDq7Q5vu3trnT5efeGe2sJHxYWGqQH1S9E2rL6j2yLOt5x5hoRUzR9XsYGYgxVye5P0vygGKms9hLlUHxjJwnsMg1O_wlDDYj4VsXZAQyA6a8DsAs3mEv11ZqiJWjoFaL1fTzPuAk59ynL7Zuqpr7lKz8nnUIKqSdcrbRM4aoIF1ZZ_U7htK5gAjr_YIhPEK-zptA?",
  ];

  const URL_VIDEOS_LANDING = [
    "https://q4ojna.bn.files.1drv.com/y4m3-Gp6b42Kwl6jE1MpiK6cUBvbrRxiO3lIvp8ioBWfi9JAWWnLA1wIc7DZYpAmCBLVaJmqJ0sJ_cvsXN1pJPYzt9V3bVonUPk5GMgtX59fc2i6sROweH8LzSDK1OZ-PexFYkuk7js-E8GmVAOBvf8c8yVqsHZfyb807BMSEXxa5ZH5B4vT34dkRGCZ4vUd-G-p_Mw25EW1oCKqSe1DM0KTg?",
    "https://q4qkqa.bn.files.1drv.com/y4m3RTvPykcx65GF6MnIHgDn269VD7CqQ4P_fS6Iz1ABoM3JZ7TElF6FT4HyNZusMoxVL_wCfrrIEExHRi1Er9htJmW9HZ9_vpebbCkeSxYXDhFFSIBcAUdIJvBqEr38Ie826DPGtkal5L60B_RUGNLcIlad4QlggVRARx4NNrk6qZYnTr-w1tEryYwJnmPBAqq0XR0x0vl_G47IF_hry_RFw?",
    "https://q4rakq.bn.files.1drv.com/y4mj_hRs2hgdFmfQAPR0kkgLtYyuQTa2BW4-nUX1zgbHN1ZiX0HvMc2idnZQS0X4ek-c8waBNvmZdPdTX9u88EHlKuBbclnRHWwtWAaDzGMZtRB5fzpqTyZybhHndcCXjL2gcqlGyTUKNYHapcLnzHZjYgSzXrN6iGHhlFzsWjjDucNArPvTacAayqzDd0OHZchFee8jSC9GPO823YYeQFCrQ?",
    "https://q4pnqw.bn.files.1drv.com/y4mDVxp9l92JrI7scZ0KiITGu-w5q7tzqg_ZWBQ1e1IL0KaJEVArUMlwViVxGSCFRJgeEsyuhKTQGYIj3Z9yVPz3Ec2FODnSXAQOqrRzHXifwlazGzQWMWRWfeKN4kIWqS7i8hg0ihknGNkqw5T_5fntfIZplyv35DX7NNZTsOsGmseXpTv2mPhJ2sclHGBjSLQEvCK2VbV3lWx7xl0bVX55Q?",
    "https://q4rohw.bn.files.1drv.com/y4m18gj80xvR9RwczFHQ6sSuEUHFXH-gQoZSIphiHNiLyRW4K37ZeSDMyEJ0nuPE84tkQG5kuEuo8A7yMkHeRexZ1E5gkA7Xwefv5yZi--lVai-3I2qZ-wmK6C7hVJ0ENVa_RMD1be_KYLIWuFvyjw2WUjdgeBNTgwRU6WZcWIIhc8viMTVYfsKAF-2tmnUxxqfCI6dJVkd0Qzu_7kt0XYJgQ?",
    "https://ohegaa.bn.files.1drv.com/y4mG1HcHPVptghwX_tQjRfoqaJKMaDp1gYpmzWKIgUxTm0Cz8fMJJmJ4unFL7UZMD8XJLFK4ZGOxC0ArlaeVfPJ5lgJUyhXPx5j6zeIRQuJbyLi76aI-Smhyl_FLxieQ8Kp3PLe5zIUnP-ICdAk_tv0xtBD3D9yAYhLjUkuO0mmlXrAc1Best5DA3hzyIxxrEWFBSb_-JuArenfPQQcnHbGWw?",
    "https://0pvw2g.bn.files.1drv.com/y4mqm4NvoADVpw2HAtkouvM0v7L0pQuxm11e1zt_lG3A1NIWvlyJBvNbKnmFYbVrNXe15Z_Hbq0vUfh7glJNMua74jl1n8GAhZysJ26yViceoZpQUhwEr6Sbg8KIl1l-nVGf3WaNWWvZsebQAb5RvJRKcv4h0vacPOSudET31YYzXfb0NsFjMu8hjYUDnb9a15guwJpaDAfuwVtHQrI6ZEDgA?",
    "https://0pxvzq.bn.files.1drv.com/y4mpFtyrwcgxU_BUbEDIK9h-PimV2wmbij_S3_si3Dkx2dZYchUt9dYWEzlKQjICF9AgQMiysq8XH5IO7L3Gn-fbVguMB71h7blYiF_fXdvTm1YPQw4p2ByrjH7nJPiYx_9MAnoRDqiEjHiUbWcfWt5-QdBAjxyczGvLdPduEQA_vGzsHvaYNeQckgQ4lqRI1NwLWXxAssy9xQoOyCy2DKu9g?",
    "https://oheuww.bn.files.1drv.com/y4mbkPaK8w3ZtkIjah4f54T18Iwo1gONS-z8xFZcUlEyVek4Hi9Yjiv8-RZU3U8vBnKdH5ABQDUm8oOag0oIU6XiaMJson543F8fT98XaHxqmYnygizjDKF-mAl__F_hHotsFPYk3TDfdQdFnlIPiktU_ttqR8ITOBQ5JrjYQs3ulARJ70VavPWjJc7HlyifMbMSTjUqCCUQ9Dh0iCXuXLOLA?",
    "https://q4qkqa.bn.files.1drv.com/y4m3RTvPykcx65GF6MnIHgDn269VD7CqQ4P_fS6Iz1ABoM3JZ7TElF6FT4HyNZusMoxVL_wCfrrIEExHRi1Er9htJmW9HZ9_vpebbCkeSxYXDhFFSIBcAUdIJvBqEr38Ie826DPGtkal5L60B_RUGNLcIlad4QlggVRARx4NNrk6qZYnTr-w1tEryYwJnmPBAqq0XR0x0vl_G47IF_hry_RFw?",
  ];

  const HTML_VIDEO = (
    <div className="video">
      <video
        src={`${
          location.pathname === "/"
            ? URL_VIDEOS_LANDING[() => getUniqueMinuteNumber()]
            : URL_VIDEOS_HOME[() => getUniqueMinuteNumber()]
        }`}
        autoplay="true"
        muted="true"
        loop="true"
        poster="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"
      ></video>
    </div>
  );

  useEffect(() => {
    if (stateCharacters.length === 0) dispatch(getCharacters());
    if (stateTemperaments.length === 0) dispatch(getTemperaments());
  }, [stateTemperaments, stateCharacters, dispatch]);

  const onSearch = (character) => {
    dispatch(searchCharacter(character));
  };
  return (
    <>
      <div className="App">
        {location.pathname !== "/" ? <NavBar /> : null}
        <div className="central">
          {HTML_VIDEO}
          <Route exact path="/" render={() => <Landing />} />
          <Route exact path="/dogs" render={() => <Home />} />
          <Route exact path="/dogs/:id" render={() => <Details />} />
          <Route exact path="/creation" render={() => <CreateBreed />} />
          <Route exact path="/about" render={() => <Details />} />
        </div>
        {location.pathname !== "/" ? <Footer /> : null}
      </div>
    </>
  );
}

export default App;
