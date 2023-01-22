import {
  CREATE_CHARACTER,
  DELETE_CHARACTER,
  GET_CHARACTERS,
  GET_TEMPERAMENTS,
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
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: [...action.payload],
      };
    case GET_CHARACTERS:
      return {
        ...state,
        allCharacters: [...action.payload],
        characters: [...action.payload],
      };
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        allCharacters: [...action.payload],
      };
    case SET_PAGE_CHARACTER:
      return {
        ...state,
        pageChars: [...state.characters.slice(action.payload.start, action.payload.end)],
      };
    case SEARCH_CHARACTER:
      return {
        ...state,
        characters: [
          ...state.allCharacters.filter((element) =>
            action.payload === "ALL"
              ? true
              : element.name.toString().toLowerCase().indexOf(action.payload.toString().toLowerCase()) >= 0
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
      if (action.payload === "all") {
        return {
          ...state,
          characters: [...state.allCharacters],
        };
      } else if (action.payload === "created") {
        return {
          ...state,
          characters: [...state.allCharacters.filter((element) => isNaN(element.id))],
        };
      } else if (action.payload === "api") {
        return {
          ...state,
          characters: [...state.allCharacters.filter((element) => !isNaN(element.id))],
        };
      } else {
        return {
          ...state,
          characters: [
            ...state.allCharacters.filter((element) =>
              element.temperament?.toUpperCase().includes(action.payload.toUpperCase())
            ),
          ],
        };
      }
    case ORDER:
      return {
        ...state,
        characters: [
          ...state.characters.sort((a, b) => {
            if (action.payload === "weightasc" || action.payload === "weightdes") {
              if (a.weight.metric.slice(5) > b.weight.metric.slice(5)) {
                return action.payload === "weightasc" ? 1 : -1;
              }
              if (a.weight.metric.slice(5) < b.weight.metric.slice(5)) {
                return action.payload === "weightasc" ? -1 : 1;
              }
              return 0;
            } else if (action.payload === "nameasc" || action.payload === "namedes") {
              if (a.name > b.name) {
                return action.payload === "nameasc" ? 1 : -1;
              }
              if (a.name < b.name) {
                return action.payload === "nameasc" ? -1 : 1;
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
