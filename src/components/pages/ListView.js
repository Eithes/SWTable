import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import SearchForm from '../forms/SearchForm';
import AddCharButton from '../buttons/AddCharButton';
import CharactersTable from '../listComponents/CharactersTable';
import CharItemsContext from '../contexts/charsContext/Chars.context';
import Paginator from '../listComponents/Paginator';

function ListView(props) {

  const { searchQuery } = useContext(CharItemsContext);

  return (
    <Fragment>
      <h1>List View</h1>
      <div className="row">
        <div className="col-sm-6">
          <SearchForm /> 
        </div> 
        <div className="col-sm-6 text-sm-right">
          <AddCharButton 
            buttonType='addChar'
            buttonText='Add New'
            history={props.history}          
          />
        </div>  
      </div>  
      <CharactersTable  history={props.history} />
      { searchQuery.length === 0  && <Paginator /> }
    </Fragment>
  );
}

export default ListView;

ListView.propTypes = {
  history: PropTypes.object //eslint-disable-line  
};
