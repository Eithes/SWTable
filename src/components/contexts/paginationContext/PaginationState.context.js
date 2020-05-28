import React, { useReducer } from 'react';

import { getPaginationData } from '../../helpers/helpers';
import PaginationContext from './Pagination.context';
import PaginationReducer from './PaginationReducer.context';
import {  
  SET_PAGINATION_LINKS,
} from '../../library/actionTypes';


const PaginationState = props => {  
 
  const initialState = {   
    paginationData: {
      first: 0,
      prev: 0,
      next: 0,
      last: 0,
    }
  }

  const [state, dispatch] = useReducer(PaginationReducer, initialState);

  const  getPaginationDataFromHttp = (linksFromResponse) => {      
    const pagesForPagination = getPaginationData(linksFromResponse);
    const newPaginationData = {
      first: +pagesForPagination.first || 1,
      prev: +pagesForPagination.prev || 1,
      next: +pagesForPagination.next || 1,
      last: +pagesForPagination.last || 1,
    } 
    dispatch({ type: SET_PAGINATION_LINKS, data: { links: newPaginationData, }});
  }  
  
  return <PaginationContext.Provider 
    value={{
      paginationData: state.paginationData,  
      getPaginationDataFromHttp,
    }}
  >
    {props.children}
  </PaginationContext.Provider>
}

export default PaginationState;