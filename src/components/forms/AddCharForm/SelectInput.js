import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AddFormState from '../../contexts/addFormContext/addFormContext.context';

function SelectInput(props) {
  const fieldName = props.fieldName;
  const { fieldsState, firstInvalid, blurField, changeFieldValue }  = useContext(AddFormState);
  const { value, valid, values,} = fieldsState[fieldName];
  const focusSelectField = useRef(null); 
 
  const handleInputChange = (e) => {
    changeFieldValue(e.target);
  }

  const handleInputBlur = (e) => {
    blurField(fieldName, value);
  }

  const drawValuesForSelect = () => {
    return values.map(sp => <option value={sp} key={sp}>{sp}</option>);
  }

  useEffect(() => { 
    if(focusSelectField.current.name === firstInvalid) {
      focusSelectField.current.focus();
  }}, [firstInvalid]);
  
  return (
    <select 
      className={ valid ? 'custom-select' : 'custom-select is-invalid'}
      // required={required}
      value={value}
      onChange={handleInputChange}
      onBlur={handleInputBlur}  
      id={fieldName}
      name={fieldName}
      ref={focusSelectField}  
    >
      <option value="">Open this select menu</option>
        { drawValuesForSelect() }
    </select>
  )
}

export default SelectInput;

SelectInput.propTypes = {  
  fieldName: PropTypes.string.isRequired, 
};