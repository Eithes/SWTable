import React, {memo, useContext} from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import AddFormState from '../../contexts/addFormContext/addFormContext.context';

function FormField(props) { 
  const fieldName = props.fieldName;  
  const { fieldsState }  = useContext(AddFormState);

  const textForLabel = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }  

  const requiredStar = (fieldsState[fieldName].required) ? <span className="text-primary"> *</span> : ''; 

  const drawInputField = () => {
    switch (fieldsState[fieldName].type) {
      case 'select': return (
        <SelectInput 
        fieldName={fieldName}
        />
      )
      case 'radio': return (
        <RadioInput
          fieldName={fieldName}  
        />
      )
      default: return (
        <TextInput 
        fieldName={fieldName} 
        />
      ) 
    }  
  }
  
  return (
    <div className="row form-group col-md-6 mx-auto" >
      <label htmlFor={fieldsState[fieldName].type}>
        {textForLabel(fieldName)}{requiredStar}
      </label>
      {drawInputField()}
      <div className="invalid-feedback">
        {fieldsState[fieldName].errMessage}
      </div> 
    </div> 
  )
}

export default memo(FormField);

FormField.propTypes = {  
  fieldName: PropTypes.string.isRequired, 
};