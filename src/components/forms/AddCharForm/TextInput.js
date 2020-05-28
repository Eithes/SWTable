import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AddFormState from '../../contexts/addFormContext/addFormContext.context';

function TextInput(props) {  
  const fieldName = props.fieldName;
  const { fieldsState, firstInvalid, blurField, changeFieldValue }  = useContext(AddFormState);
  const { type, value, valid, } = fieldsState[fieldName]; 
  const focusTextField = useRef(null);
 
  const handleInputChange = (e) => {
    changeFieldValue(e.target);
  }  
  
  const handleInputBlur = (e) => {
    blurField(fieldName, value);
  }
  
  useEffect(() => { 
    if(focusTextField.current.name === firstInvalid) {
      focusTextField.current.focus();
    }}, [firstInvalid] );

  return (
    <input 
      type={type}
      className={ valid ? 'form-control' : 'form-control is-invalid'}
      id={fieldName}
      name={fieldName}      
      // required={required}
      value={value}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      ref={focusTextField}    
    />     
  )
}

export default TextInput;

TextInput.propTypes = {  
  fieldName: PropTypes.string.isRequired, 
};