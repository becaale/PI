import React from "react";

import { connect } from "react-redux";

import { filterCards, orderCards } from "../../redux/actions";

import Breed from "../Breed/Breed";

function Breeds({ characters, onClose, orderCards, filterCards }) {
  return (
    <>
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <Breed
              id={character.id}
              name={character.name}
              species={character.species}
              gender={character.gender}
              image={character.image}
              onClose={onClose}
            />
          </div>
        );
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    characters: state.allCharacters,
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
