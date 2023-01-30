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
  filters: { api: "allB", temperament: "allT" },
  isLoading: false,
  errors: {
    create: {},
  },
};

const filter = (state, action) => {
  let filterBreeds = [...state.allCharacters];
  if (action.payload === "clear") {
    return {
      ...state,
      characters: filterBreeds,
      filters: { api: "allB", temperament: "allT" },
    };
  }
  if (action.payload === "allB" || action.payload === "created" || action.payload === "api") {
    if (state.filters.temperament !== "allT")
      filterBreeds = filterBreeds.filter((element) =>
        element.temperament?.toUpperCase().includes(state.filters.temperament.toUpperCase())
      );
    if (action.payload === "created") filterBreeds = filterBreeds.filter((element) => isNaN(element.id));
    if (action.payload === "api") filterBreeds = filterBreeds.filter((element) => !isNaN(element.id));
    return {
      ...state,
      characters: filterBreeds,
      filters: { ...state.filters, api: action.payload },
    };
  } else {
    if (state.filters.api === "created") filterBreeds = filterBreeds.filter((element) => isNaN(element.id));
    if (state.filters.api === "api") filterBreeds = filterBreeds.filter((element) => !isNaN(element.id));

    if (action.payload !== "allT")
      filterBreeds = filterBreeds.filter((element) =>
        element.temperament?.toUpperCase().includes(action.payload.toUpperCase())
      );
    return {
      ...state,
      characters: filterBreeds,
      filters: { ...state.filters, temperament: action.payload },
    };
  }
};

const orderBy = (arr, property, order) => {
  return [
    ...arr.sort((a, b) => {
      const a1 = a[property].split(/ - /);
      const b1 = b[property].split(/ - /);
      if (a1[a1.length - 1] > b1[b1.length - 1]) return order === "asc" ? 1 : -1;
      if (a1[a1.length - 1] < b1[b1.length - 1]) return order === "asc" ? -1 : 1;
      return 0;
    }),
  ];
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: [...action.payload.sort((a, b) => a.localeCompare(b))],
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
              : element.name.toString().toLowerCase().includes(action.payload.toString().toLowerCase())
          ),
        ],
      };
    case CREATE_CHARACTER:
      if (action.payload.status === 400)
        return {
          ...state,
          errors: {
            ...state.errors,
            create: action.payload,
          },
        };
      return {
        ...state,
        allCharacters: [...action.payload, ...state.allCharacters],
        characters: [...action.payload, ...state.characters],
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: [...state.characters.filter((char) => char.id.toString() !== action.payload.toString())],
      };
    case FILTER:
      return filter(state, action);

    case ORDER:
      return {
        ...state,
        characters: orderBy(state.characters, action.payload.slice(0, -3), action.payload.slice(-3)),
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
