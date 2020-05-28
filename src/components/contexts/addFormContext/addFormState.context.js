import React, { useReducer } from 'react';
import AddFormContext from './addFormContext.context';
import AddFormReducer from './addFormReducer.context';
import HTTPRequest from '../../library/httpRequests';
import { urlBase, speciesUrl } from '../../library/url';
import { validateField, validateForm } from '../../forms/Validator';
import inputFields from '../../library/inputFields';
import { 
  SET_FORMSTATE,
  SET_CURR_CHAR_VALUES,
  SET_VALUE_ON_CHANGE,
  SET_FIRST_INVALID,
  CLEAR_FORM_STATE,
} from '../../library/actionTypes';

const AddFormState = props => {

    const initialState = {       
    firstInvalid: null,  
    fieldsState: {
      name: {
      value: '',
      valid: true,
      type: 'text',
      required: true,
      errMessage:'',
      },
      species: {
        value: '',
        valid: true,
        type: 'select',
        required: true,
        values: [],
        errMessage:'',
      },
      gender: {
        value: '',
        valid: true,
        type: 'radio',
        required: true,
        values: ['male', 'female', 'n/a'],
        errMessage:'',
      },
      homeworld: {
        value: '',
        valid: true,
        type: 'text',
        required: false,
        errMessage:'',
      },
    },
    currentCharValues: {
      name: '',
      species: '',
      gender: '',
      homeworld: '',
      id: '',
    },
    currentAddFormState: 'add', 
  }; 

  const [state, dispatch] = useReducer(AddFormReducer, initialState); 
  
  const setNewValuesToForm = async (foundChar = state.currentCharValues) => { 
    const speciesList = await getSpeciesForForm();
    const newStateOfCharFields = {};
    inputFields.forEach(field => {
      if(speciesList && field === 'species') {
        newStateOfCharFields[field] = { ...state.fieldsState[field], value: foundChar[field], values: speciesList }   
      } else {
        newStateOfCharFields[field] = { ...state.fieldsState[field], value: foundChar[field] } 
      }
    });
    dispatch({type: SET_FORMSTATE, payload: newStateOfCharFields });  
  }

  const getSpeciesForForm = async () => {
    return await HTTPRequest.getSpecies(`${urlBase}${speciesUrl}`);   
  }

  const emptyCharFields = () => {
    const emptyFields = {
      name: '',
      species: '',
      gender: '',
      homeworld:'',
      id: '',
    }    
    dispatch({type: CLEAR_FORM_STATE, data: { charFields: {...initialState.fieldsState}, current: emptyFields }});
  }  

  const setEditCharacterValues = (foundChar) => {    
    const newCurrentCharValues = {
      name: foundChar.name,
      species: foundChar.species,
      gender: foundChar.gender,
      homeworld: foundChar.homeworld,
      id: foundChar.id,
    }    
    dispatch({ type: SET_CURR_CHAR_VALUES, data: { ...newCurrentCharValues} });    
  }

  const changeFieldValue = (target) => {
    const fieldName = target.name.toLowerCase();   
    const fieldValue = target.value;    
    const stateField = {...state.fieldsState[fieldName], value: fieldValue };
    const newCharFields = {...state.fieldsState, [fieldName]: {...stateField}}
    dispatch({ type: SET_VALUE_ON_CHANGE, data: newCharFields}); 
  }
  
  const blurField = (fieldName) => {    
    const field = { ...state.fieldsState[fieldName] };
    const newCharFields = {...state.fieldsState, [fieldName]: validateField(field)}
    dispatch({ type: SET_VALUE_ON_CHANGE, data: newCharFields});    
  }
    
  const validateFormOnSubmit = () => {
    const { validatedFields, formHasInvalid } = validateForm(inputFields, state.fieldsState);
    dispatch({type: SET_FORMSTATE, payload: validatedFields });

    if (formHasInvalid) {
      findFirstInvalid(validatedFields);
      return false;
    }
    return true;
  }

  const findFirstInvalid = (validatedFields) => {
    let firstInvalidFound = inputFields.find(field => {      
      if(!validatedFields[field].valid) return field;
      return null;
    }); 
    dispatch({type: SET_FIRST_INVALID, payload: firstInvalidFound });   
  }

  
  return <AddFormContext.Provider 
    value={{
      fieldsState: state.fieldsState,
      currentAddFormState: state.currentAddFormState,
      currentCharValues: state.currentCharValues,
      firstInvalid: state.firstInvalid,
      setNewValuesToForm,
      changeFieldValue,
      setEditCharacterValues,
      blurField,
      emptyCharFields,
      validateFormOnSubmit,
    }}
  >
    {props.children}
  </AddFormContext.Provider>
}

export default AddFormState;