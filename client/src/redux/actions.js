export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS";
export const SET_PAGE_CHARACTER = "SET_PAGE_CHARACTER";
export const SEARCH_CHARACTER = "SEARCH_CHARACTER";
export const DELETE_CHARACTER = "DELETE_CHARACTER";
export const CREATE_CHARACTER = "CREATE_CHARACTER";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

const URL_PATH_API = "http://localhost:3001";

export const getTemperaments = () => {
  return function (dispatch) {
    fetch(`${URL_PATH_API}/temperaments`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_TEMPERAMENTS, payload: data }));
  };
};

export const getCharacters = () => {
  return function (dispatch) {
    fetch(`${URL_PATH_API}/dogs`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_CHARACTERS, payload: formatChar(data) }));
  };
};

export const getAllCharacters = () => {
  return function (dispatch) {
    fetch(`${URL_PATH_API}/dogs`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_ALL_CHARACTERS, payload: formatChar(data) }));
  };
};

export const setPageCharacter = (start, end) => {
  return {
    type: SET_PAGE_CHARACTER,
    payload: { start, end },
  };
};

export const searchCharacter = (character) => {
  return {
    type: SEARCH_CHARACTER,
    payload: character,
  };
};

export const deleteCharacter = (id) => {
  return {
    type: DELETE_CHARACTER,
    payload: id,
  };
};

export const createCharacter = (character) => {
  return function (dispatch) {
    fetch(`${URL_PATH_API}/dogs`, {
      method: "POST",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(character),
      cache: "default",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== 200) return dispatch({ type: CREATE_CHARACTER, payload: data });
        return dispatch({ type: CREATE_CHARACTER, payload: formatChar(data) });
      })
      .catch((error) => {
        return dispatch({ type: CREATE_CHARACTER, payload: error });
      });
  };
};

export const filterCards = (status) => {
  return {
    type: FILTER,
    payload: status,
  };
};

export const orderCards = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

const formatChar = (arr) => {
  return arr.map((element) => {
    return {
      id: element.id,
      name: element.name,
      weight: element.weight.metric,
      height: element.height.metric,
      life_span: element.life_span,
      temperament: element.temperament,
      image: element.image.url,
    };
  });
};
