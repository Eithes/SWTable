
const validateTextField = (textFromInput) => {
  const errorMessage = 'Please, enter a valid string - only letters and numbers';  
  const isValid = /^[A-Za-z\d\s]*$/.test(textFromInput);   
  return {
    errorMessage: isValid ? false : errorMessage,
    isValid,
  }
}
const validateRequired = (textFromInput) => {  
  textFromInput = textFromInput.trim();
  let errorMessage = 'This field is required';
  let isValid = true;  
  if (textFromInput.length <= 0) isValid = false; 
  return {
    errorMessage,
    isValid,
  }
}

const validateValues = (formInputValue, values) => {
  let errorMessage = 'Please, enter an existing value ';
  let isValid = true;
  isValid = values.indexOf(formInputValue) >= 0; 
  return {
    errorMessage,
    isValid,
  }
}

export const validateField = (fieldToValidate) => {
  let allValidations = [];
  let errMessages = [];
  let oneValidation;

  if (fieldToValidate.type === 'text') {    
    oneValidation = validateTextField(fieldToValidate.value);
    allValidations.push(oneValidation.isValid);
    if (!oneValidation.isValid) {
      errMessages.push(oneValidation.errorMessage);
    }
  }  
  
  if (fieldToValidate.required) {
    oneValidation = validateRequired(fieldToValidate.value);   
    allValidations.push(oneValidation.isValid);
    if (!oneValidation.isValid) {
      errMessages.push(oneValidation.errorMessage);
    }
  }

  if (fieldToValidate.values && fieldToValidate.values.length !== 0) {
    oneValidation = validateValues(fieldToValidate.value, fieldToValidate.values);
    allValidations.push(oneValidation.isValid);
    if (!oneValidation.isValid) {
      errMessages.push(oneValidation.errorMessage);
    }
  }
 
  if (allValidations.some(val => val === false)) {
    return { ...fieldToValidate, valid: false, errMessage: errMessages.join('. ') }
  };
  return { ...fieldToValidate, valid: true, errMessage:'' };
}

export const validateForm = (inputFields, fieldsState) => {
  const validatedFields = {};
  let formHasInvalid = false; 
  inputFields.forEach(field => {
    const validatedField = validateField({ ...fieldsState[field] });
    validatedFields[field] = validatedField; 
    formHasInvalid = formHasInvalid || !validatedField.valid;  
  });  
  return {
    validatedFields,
    formHasInvalid,
  }
}