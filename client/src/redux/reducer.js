import {
  CREATE_CHARACTER,
  DELETE_CHARACTER,
  GET_CHARACTERS,
  GET_ALL_CHARACTERS,
  SEARCH_CHARACTER,
  SET_PAGE_CHARACTER,
  FILTER,
  ORDER,
} from "./actions";

const initialState = {
  pageChars: [],
  characters: [],
  allCharacters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        allCharacters: [
          ...state.allCharacters,
          ...action.payload.filter((element) => !state.allCharacters.includes(element)),
        ],
        characters: [...state.characters, ...action.payload.filter((element) => !state.characters.includes(element))],
      };
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        allCharacters: [
          ...state.allCharacters,
          ...action.payload.filter((element) => !state.allCharacters.includes(element)),
        ],
      };
    case SET_PAGE_CHARACTER:
      return {
        ...state,
        pageChars: [
          ...state.allCharacters.filter((element, index) => {
            if (index >= action.payload.start && index <= action.payload.end - 1) {
              return true;
            }
          }),
        ],
      };
    case SEARCH_CHARACTER:
      return {
        ...state,
        characters: [
          ...state.allCharacters.filter(
            (element) =>
              element.name.toString().toLowerCase().indexOf(action.payload.name.toString().toLowerCase()) >= 0
          ),
        ],
      };
    case CREATE_CHARACTER:
      return {
        ...state,
        allCharacters: [action.payload, ...state.allCharacters],
        characters: [action.payload, ...state.characters],
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: [...state.characters.filter((char) => char.id.toString() !== action.payload.toString())],
      };
    case FILTER:
      if (action.payload === "ALL") {
        return {
          ...state,
          characters: [...state.allCharacters],
        };
      }
      return {
        ...state,
        characters: [...state.allCharacters.filter((element) => element.gender.toUpperCase() === action.payload)],
      };
    case ORDER:
      return {
        ...state,
        characters: [
          ...state.characters.sort((a, b) => {
            if (action.payload === "ASCENDENTEID" || action.payload === "DESCENDENTEID") {
              if (a.id > b.id) {
                return action.payload === "ASCENDENTEID" ? 1 : -1;
              }
              if (a.id < b.id) {
                return action.payload === "ASCENDENTEID" ? -1 : 1;
              }
              return 0;
            } else if (action.payload === "ASCENDENTEN" || action.payload === "DESCENDENTEN") {
              if (a.name > b.name) {
                return action.payload === "ASCENDENTEN" ? 1 : -1;
              }
              if (a.name < b.name) {
                return action.payload === "ASCENDENTEN" ? -1 : 1;
              }
              return 0;
            }
            return 0;
          }),
        ],
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
