import {  
  SET_CHARS_DATA,
  SET_CURRENT_PAGE,
  DISABLE_BUTTON,
  SET_SEARCH_QUERY,
  SET_SEARCHED_CHARS,
  SET_CURR_CHAR_VALUES,
  SET_CURR_CHAR_VALUES_EMPTY,
} from '../../library/actionTypes';

export default (state, action) => {
  switch (action.type) {
    case SET_CHARS_DATA:
      return {
        ...state,
        characters: action.data.chars,
        addButtonDisabled:  action.data.addButtonDisabled,
        charsAreSortedBy: action.data.sorted,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPageNumber: action.data.page,
      }
    case DISABLE_BUTTON:
      return {
        ...state,
        addButtonDisabled: action.data.isDisabled,
      }
    case SET_SEARCH_QUERY: 
      return {
        ...state,
        searchQuery: action.data.searchQuery,
      }
    case SET_SEARCHED_CHARS:
      return {
        ...state,
        searchedCharacters: action.data.chars,
      }
    case SET_CURR_CHAR_VALUES:
      return {
        ...state,
        currentCharValues: action.data.char,
        currentAddFormState: 'edit',
      }
      case SET_CURR_CHAR_VALUES_EMPTY:
      return {
        ...state,
        currentCharValues: action.data.char,
        currentAddFormState: 'add',
      }
    default:
    return state;
  }  
}