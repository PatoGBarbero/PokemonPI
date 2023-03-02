const initialState = {
  pokemons: [],
  pokemonstypes: [],
  pokemonsbackup: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        pokemonsbackup: action.payload,
      };
    case "GET_NAME_POKEMONS":
      console.log(action.payload);
      return {
        ...state,
        pokemons: action.payload,
      };
    case "FILTER_BY_TYPES":
      const allPokemons = state.pokemonsbackup;
      const typesFiltered =
        action.payload === "ALL"
          ? allPokemons
          : allPokemons.filter((el) => {
              return (
                el.types?.includes(action.payload) ||
                el.tipos?.includes(action.payload)
              );
            });

      return {
        ...state,
        pokemons: typesFiltered,
      };
    case "GET_TYPES":
      return {
        ...state,
        pokemonstypes: action.payload,
      };
    case "GET_ID_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "ORDER_BY_NAME":
      console.log(state.pokemonsbackup);
      let sortedArr =
        action.payload === "az"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "za"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
            })
          : action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
            });

      return {
        ...state,
        pokemons: action.payload === "all" ? state.pokemonsbackup : sortedArr,
      };

    case "FILTER_CREATED":
      const allPokemon = state.pokemonsbackup;
      const createdFilter =
        action.payload === "created"
          ? allPokemon.filter((el) => el.createdInDb)
          : allPokemon.filter((el) => {
              if (el.createdInDb) {
              } else {
                return el;
              }
            });

      return {
        ...state,
        pokemons: action.payload === "All" ? allPokemon : createdFilter,
      };

    default:
      return state;
  }
}

export default rootReducer;
