import { RETRIEVEPASS, UNRETRIEVEPASS, RETRIVEPASS_ERROR } from '../actions';
export default function(state={}, action) {
  switch(action.type) {
    case RETRIEVEPASS:
      return { ...state, retrievepass: true };
    case UNRETRIEVEPASS:
      return { ...state, retrievepass: false };
    case RETRIVEPASS_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}
