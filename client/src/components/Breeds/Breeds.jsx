import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { filterCards, orderCards } from "../../redux/actions";

import Breed from "../Breed/Breed";

function Breeds({ pageChars }) {
  const [characters, setCharacters] = useState(pageChars);

  useEffect(() => {
    setCharacters(pageChars);
  }, [pageChars, characters, setCharacters]);

  return (
    <>
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <Breed
              id={character.id}
              name={character.name}
              weight={character.weight}
              temperament={character.temperament}
              image={character.image}
            />
          </div>
        );
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    pageChars: state.pageChars,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterCards: (status) => {
      dispatch(filterCards(status));
    },
    orderCards: (order) => {
      dispatch(orderCards(order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
