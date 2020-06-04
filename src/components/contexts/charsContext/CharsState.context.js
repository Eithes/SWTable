import React, { useReducer, useEffect, useContext } from 'react';

import HTTPRequest from '../../library/httpRequests';
import CharsContext from './Chars.context';
import CharsReducer from './CharsReducer.context';
import PaginationContext from  '../paginationContext/Pagination.context';
import {  
  SET_CHARS_DATA,
  SET_CURRENT_PAGE,
  DISABLE_BUTTON,
  SET_SEARCH_QUERY,
  SET_SEARCHED_CHARS,
  SET_CURRENT_CHAR
} from '../../library/actionTypes';
import { urlGetCharsPage, charsUrl, getSortedCharsUrl } from '../../library/url';

const CharsState = props => {

  const initialState = {
    characters: [],
    currentPageNumber: 1,
    addButtonDisabled: false,
    speciesList: [],
    searchedCharacters: [],
    searchQuery: '',   
    currentAddFormState: 'add',
    charsAreSortedBy: 'id',
    currentChar: null,
  }

  const [state, dispatch] = useReducer(CharsReducer, initialState);
  const { getPaginationDataFromHttp } = useContext(PaginationContext);
  
  const getCharactersAndPages = async (url, sortedBy = state.charsAreSortedBy) => {
    try {     
      const { headerLinks, resData } = await HTTPRequest.get(url);          
      getPaginationDataFromHttp(headerLinks);
      dispatch({ type: SET_CHARS_DATA, data: { chars: resData, addButtonDisabled: false, sorted: sortedBy }});      
    } catch(err) {
      //TODO
      console.log(err.message);
    }
  }

  const getExactPage = (page, sortedBy = state.charsAreSortedBy) => {    
    const urlForExactPage = getExactPageURL(page, sortedBy);
    getCharactersAndPages(urlForExactPage, sortedBy);
    setCurrentPageNumber(page);
  }

  const getExactPageURL = (page = state.currentPageNumber, sortedBy = state.charsAreSortedBy ) => {    
      return state.charsAreSortedBy ?
        getSortedCharsUrl(sortedBy, page)
        : `${urlGetCharsPage}${page}`; 
    }

  const setCurrentPageNumber = (page) => {
    dispatch({ type: SET_CURRENT_PAGE, data: { page: page, }});
  }

  const toggleAddButton = () => {
    dispatch({ type: DISABLE_BUTTON, data: { isDisabled: !state.addButtonDisabled }}); 
  }

  const addNewCharFromForm = async (newChar, url) => {   
    toggleAddButton();
    try {     
      await HTTPRequest.postCharacter(newChar, url);
      const urlForExactPage = getExactPageURL(state.currentPageNumber, state.charsAreSortedBy);
      getCharactersAndPages(urlForExactPage, state.charsAreSortedBy);     
    } catch(err) {
      console.log(err);
    }
  }

  const deleteCharacter = async (id) => {    
    try {
    await HTTPRequest.deleteChar(`${charsUrl}/${id}`);
    const urlForExactPage = getExactPageURL(state.currentPageNumber, state.charsAreSortedBy);
    getCharactersAndPages(urlForExactPage, state.charsAreSortedBy);
    } catch(err) {
      console.log(err);          
    }
  }

  const editCharFromForm = async (newChar, url) => {  
    toggleAddButton();
    try {     
      await HTTPRequest.putCharacter(newChar, url);
      const urlForExactPage = getExactPageURL(state.currentPageNumber, state.charsAreSortedBy);  
      getCharactersAndPages(urlForExactPage, state.charsAreSortedBy);     
    } catch(err) {
      console.log(err);
    }
  }

  const getSearchedCharacters = async (url) => {
    try {
      const resData = await HTTPRequest.getSearched(url);  
      dispatch({ type: SET_SEARCHED_CHARS, data: { chars: resData }});      
    } catch(err) {
      console.log(err);          
    } 
  }

  const setSearchQuery = (newSearchQuery) => {
    dispatch({ type: SET_SEARCH_QUERY, data: { searchQuery: newSearchQuery }});   
  }

  const setCurrentChar = (char) => {
    dispatch({ type: SET_CURRENT_CHAR, data: {id: char.id, name: char.name} });   
  }

   useEffect(() => {
    const urlForExactPage = getExactPageURL(state.currentPageNumber);
    getCharactersAndPages(`${urlForExactPage}`, state.charsAreSortedBy);
    //eslint-disable-next-line
  }, []);
    
  return <CharsContext.Provider 
    value={{
      characters: state.characters,
      currentPageNumber: state.currentPageNumber,
      currentChar: state.currentChar,
      setCurrentPageNumber,  
      getExactPage,
      addButtonDisabled: state.addButtonDisabled,
      speciesList: state.speciesList,
      addNewCharFromForm,
      searchedCharacters: state.searchedCharacters,
      getSearchedCharacters,
      setSearchQuery,
      searchQuery: state.searchQuery,
      deleteCharacter,
      currentAddFormState: state.currentAddFormState,
      editCharFromForm,
      charsAreSortedBy: state.charsAreSortedBy,
      setCurrentChar,
    }}
  >
    {props.children}
  </CharsContext.Provider>
}

export default CharsState;