import {  
  SET_PAGINATION_LINKS,
} from '../../library/actionTypes';

export default (state, action) => {
  switch (action.type) {
    case SET_PAGINATION_LINKS:
      return {
        ...state,
        paginationData: action.data.links,        
      }  
    default:
    return state;
  }  
}