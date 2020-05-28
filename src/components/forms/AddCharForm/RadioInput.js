import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AddFormState from '../../contexts/addFormContext/addFormContext.context';

function RadioInput(props) { 
  const fieldName = props.fieldName;  
  const { fieldsState, firstInvalid, changeFieldValue, blurField, currentCharValues}  = useContext(AddFormState);
  const { type, valid, values, value } = fieldsState[fieldName];
  const startValue = currentCharValues[fieldName];
  const [currentGender, changeGender ] = useState(value || '');
  const focusRadioField = useRef(null);

  const handleOptionChange =(e) =>{   
    changeGender(e.target.value);
    changeFieldValue(e.target);
  }

  const handleInputBlur = (e) => {
    blurField(fieldName, value);
  }

  useEffect(() => { 
    if(focusRadioField.current.name === firstInvalid) {
      focusRadioField.current.focus();
  }}, [firstInvalid]);
  
  return (
    values.map(option => (
      <div className={valid ? 'custom-control custom-radio ml-3' : 'custom-control custom-radio ml-3 is-invalid'} key={option} >
        <input 
          className="custom-control-input" 
          type={type}
          name={fieldName}
          id={option}
          value={option}
          checked={option === startValue || currentGender === option}
          onChange={handleOptionChange}
          ref={focusRadioField}
          onBlur={handleInputBlur}
          // required={required}
        />
        <label className="custom-control-label" htmlFor={option}>
          {option}
        </label>
      </div>
    ))
  )
}

export default RadioInput;

RadioInput.propTypes = {  
  fieldName: PropTypes.string.isRequired, 
};