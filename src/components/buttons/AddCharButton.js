import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import CharItemsContext from '../contexts/charsContext/Chars.context';

function AddCharButton({ buttonType, buttonText, history }) {   
  const { addButtonDisabled } = useContext(CharItemsContext);
  return (
    buttonType === 'addChar' &&
      <button
        onClick={() => history.push('/addChar')}
        type="button" 
        className="btn btn-primary mb-3"
        disabled={addButtonDisabled}
      >
        {buttonText}
      </button>
  )  
}

export default AddCharButton;

AddCharButton.propTypes = {  
  buttonType: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  history: PropTypes.object //eslint-disable-line
};