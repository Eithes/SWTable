import React, { useContext, } from 'react';

import PaginationContext from '../contexts/paginationContext/Pagination.context';
import CharItemsContext from '../contexts/charsContext/Chars.context';
import PaginatorButton from './PaginatorButton';

function Paginator() {
  const { paginationData } = useContext(PaginationContext);
  const { first, last, } = paginationData;
  const { currentPageNumber, getExactPage } =  useContext(CharItemsContext);

  const classNamePrev = (currentPageNumber === first) ? 'disabled' : '';
  const classNameNext = (currentPageNumber === last) ? 'disabled' : '';

  const goToPrevNextPage = (e) => {
    getExactPage(paginationData[e.target.name]);  
  }  

  const getButtons = () => {
    let paginationButtonsArray = [];
    for(let i = 1; i <= last; i++) {
      paginationButtonsArray.push(<PaginatorButton id={i} key={i} />) 
    }   
    return paginationButtonsArray;
  }
 
  return (    
      <nav aria-label="Data grid navigation">
        <ul className="pagination justify-content-end">
          <li className={`page-item ${classNamePrev}`}>
            <button type="button" className="page-link" tabIndex="-1" name='prev' onClick={goToPrevNextPage}>
              Previous
            </button>
          </li>
          {getButtons()}
          <li className={`page-item ${classNameNext}`}>
            <button type="button" className="page-link" name='next' onClick={goToPrevNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>    
  );
}

export default Paginator;