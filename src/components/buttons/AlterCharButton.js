import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CharItemsContext from '../contexts/charsContext/Chars.context';
import AddFormContext from '../contexts/addFormContext/addFormContext.context';

function AlterCharButton({ buttonType, buttonText, id, name, history }) { 
  let buttonClassName = 'secondary';
  let buttonIcon = '';
  const { characters, setCurrentChar } = useContext(CharItemsContext);
  const { setEditCharacterValues } = useContext(AddFormContext);

  if (buttonType === 'aditChar') {
    buttonClassName = 'secondary';
    buttonIcon = 'fa fa-pencil';
  } else if (buttonType === 'deleteChar') {
    buttonClassName = 'danger';
    buttonIcon = 'fa fa-trash-o';
  }

  const handleAlterCharacter = async () => {
     if (buttonType === 'deleteChar') setCurrentChar({id, name});
    if (buttonType === 'aditChar') { 
      const foundCurrentCharacter = characters.find(char => char.id === id);      
      await setEditCharacterValues(foundCurrentCharacter);      
      history.push('./addChar');
    }
  }

  return (
    <button 
      type="button" 
      className={`btn btn-${buttonClassName}`}
      data-toggle={buttonType === 'deleteChar'? 'modal' : ''}
      data-target={buttonType === 'deleteChar'? '#modalOnDelete' : ''}  
      onClick={handleAlterCharacter}
    >
      <i className={buttonIcon} aria-hidden="true" /> 
      {buttonText}
    </button> 
  )
}

export default AlterCharButton;

AlterCharButton.propTypes = {  
  buttonType: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.object //eslint-disable-line 
};