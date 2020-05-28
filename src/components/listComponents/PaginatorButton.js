import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import CharItemsContext from '../contexts/charsContext/Chars.context';

function PaginatorButton(props) {
  const { currentPageNumber, getExactPage } = useContext(CharItemsContext);  
  const activePageClass = (props.id === currentPageNumber) ? 'active' : ''; 
 
  const handleGoToPage = () => {
    getExactPage(props.id);    
  }

  return (    
    <li className={`page-item ${activePageClass}`}>
      <button className="page-link" onClick={handleGoToPage} >
       {props.id} <span className="sr-only">(current)</span>
      </button>
    </li>
  );
}

export default PaginatorButton;

PaginatorButton.propTypes = {  
  id: PropTypes.number.isRequired,  
};