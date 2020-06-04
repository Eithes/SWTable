import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import CharacterTableItem from './CharacterTableItem';
import CharItemsContext from '../contexts/charsContext/Chars.context';

function CharactersTable(props) {

  const { characters, searchedCharacters, searchQuery, getExactPage } = useContext(CharItemsContext);

  const handleSorting = (e) => {     
    getExactPage(1, e.target.id);
  }

  let charactersToShow = (searchQuery.length > 0 ) ? searchedCharacters : characters;

  const shownCharacters = charactersToShow.map(char => (
    <CharacterTableItem
      id={char.id}
      key={char.id}
      name={char.name}
      species={char.species}
      gender={char.gender}
      homeworld={char.homeworld}
      history={props.history}
    />   
  )); 

  if(searchedCharacters.length === 0 && searchQuery.length > 0) {
     return (
      <div className="alert alert-primary" role="alert">
        No Results Found
      </div>
    )
  } else {
    return (  
    <table className="table table-bordered table-hover">
    <thead className="thead-light">
      <tr>
        <th scope="col" style={{cursor: 'pointer'}} id="id" onClick={handleSorting}>Id</th>
        <th scope="col" style={{cursor: 'pointer'}} id="name" onClick={handleSorting}>Name</th>
        <th scope="col" style={{cursor: 'pointer'}} id="species" onClick={handleSorting}>Species</th>
        <th scope="col" style={{cursor: 'pointer'}} id="gender" onClick={handleSorting}>Gender</th>
        <th scope="col" style={{cursor: 'pointer'}} id="homeworld" onClick={handleSorting}>Homeworld</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {shownCharacters}     
    </tbody>
    </table>
  );
  }  
}

export default CharactersTable;

CharactersTable.propTypes = {
  history: PropTypes.object //eslint-disable-line  
};