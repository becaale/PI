export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_ALL_CHARACTERS = "GET_ALL_CHARACTERS";
export const SEARCH_CHARACTER = "SEARCH_CHARACTER";
export const DELETE_CHARACTER = "DELETE_CHARACTER";
export const CREATE_CHARACTER = "CREATE_CHARACTER";
export const FILTER = "FILTER";
export const ORDER = "ORDER";

const URL_PATH = "http://localhost:3001/dogs";

export const getCharacters = () => {
  return function (dispatch) {
    fetch(URL_PATH)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_CHARACTERS, payload: data }));
  };
};

export const getAllCharacters = () => {
  return function (dispatch) {
    fetch(URL_PATH)
      .then((response) => response.json())
      .then((data) => {
        return dispatch({
          type: GET_ALL_CHARACTERS,
          payload: formatChar(data),
        });
      });
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
  return {
    type: CREATE_CHARACTER,
    payload: character,
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
      weight: element.weight,
      height: element.height,
      life_span: element.life_span,
      temperament: element.temperament,
      image: element.image.url,
    };
  });
};
