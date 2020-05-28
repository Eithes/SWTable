import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import FormField from './FormField';
import CharItemsContext from '../../contexts/charsContext/Chars.context';
import AddFormState from '../../contexts/addFormContext/addFormContext.context';
import { urlGetCharsPage, charsUrl } from '../../library/url';
import inputFields from '../../library/inputFields';

function AddForm(props) {

  const { fieldsState,
    setNewValuesToForm,   
    emptyCharFields,    
    validateFormOnSubmit,
    currentAddFormState,
    currentCharValues,
  } = useContext(AddFormState);

  const { addNewCharFromForm, editCharFromForm } = useContext(CharItemsContext); 
  
  const capitalizeFields = (fieldinput) => {
    const firstLetter = fieldinput.slice(0, 1).toUpperCase();
    fieldinput = firstLetter + fieldinput.slice(1);
    return fieldinput;
  }
   
  const submitFormIfValid = (e) => {
    e.preventDefault();
    const newChar = {
      name: capitalizeFields(fieldsState.name.value),
      species: fieldsState.species.value,
      gender: fieldsState.gender.value,
      homeworld:capitalizeFields(fieldsState.homeworld.value),
    }    

    const formIsValidated = validateFormOnSubmit();
    if(!formIsValidated) return;

    if(currentAddFormState === 'add') {      
    addNewCharFromForm(newChar, urlGetCharsPage);
    props.history.push('/');     
    } else if(currentAddFormState === 'edit') {
    newChar.id = currentCharValues.id;
    editCharFromForm(newChar, `${charsUrl}/${newChar.id}`)
   }
    props.history.push('/');  
  }

  
 const formFields = inputFields.map((field) => (      
      <FormField
        fieldName={field}
        key={field}   
      />
    ));

    useEffect( () => {
      setNewValuesToForm();
      return () => {  
        emptyCharFields();
      };
      //eslint-disable-next-line
    }, []);


    return (    
    <form
      className='justify-content-md-center pt-4 mx-auto'
       onSubmit={submitFormIfValid}
    >
      {formFields}
      <div className="row form-group col-md-6 mx-auto" >
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      
    </form>
  )   
}

export default AddForm;

AddForm.propTypes = {  
  history: PropTypes.object //eslint-disable-line  
};
