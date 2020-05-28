import React, { useState, useContext, useCallback, useEffect } from 'react';

import CharItemsContext from '../contexts/charsContext/Chars.context';
import { urlBase } from '../library/url';
import { debounce } from '../helpers/helpers';

function SearchForm() {
  const { getSearchedCharacters, setSearchQuery } = useContext(CharItemsContext);
  const [searchInput, changeSearchInput] = useState('');
  const [value, setValue] = useState('');

  const handleChange = (e) =>  {   
    changeSearchInput(e.target.value);    
    setSearchQuery(e.target.value);
    setValue(e.target.value)
  }

  const getDebounced = useCallback(debounce(() => getSearchedCharacters(`${urlBase}/characters?q=${searchInput}`), 200), [value]);
  useEffect(() => { getDebounced();
    //eslint-disable-next-line
  }, [searchInput]);
  
  return (    
    <div className="form-group">
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <input
        type="text"
        className="form-control"
        id="searchInput"
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput}
      /> 
    </div>
  )
}

export default SearchForm;
