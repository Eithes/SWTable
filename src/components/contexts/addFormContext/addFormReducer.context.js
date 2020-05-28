import {  
  SET_FORMSTATE,
  SET_CURR_CHAR_VALUES,
  SET_VALUE_ON_CHANGE,
  SET_FIRST_INVALID,
  CLEAR_FORM_STATE,
} from '../../library/actionTypes';

export default (state, action) => {
  switch (action.type) {
      case SET_FORMSTATE:
      return {
        ...state,        
        fieldsState: action.payload,
      }
      case SET_CURR_CHAR_VALUES:
      return {
        ...state,
        currentCharValues: action.data,
        currentAddFormState: 'edit',
      }    
      case SET_VALUE_ON_CHANGE:
        return {
          ...state,
          fieldsState: action.data,
        }
      case SET_FIRST_INVALID:
        return {
          ...state,
          firstInvalid: action.payload,
      }
      case CLEAR_FORM_STATE:
        return {
        ...state,
        fieldsState: action.data.charFields,
        currentCharValues: action.data.current,
      }
    default:
    return state;
  }  
}