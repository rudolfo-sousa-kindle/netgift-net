import { MAKERETRIEVEPASS, MAKEUNRETRIEVEPASS, MAKERETRIVEPASS_ERROR } from '../actions';
export default function(state={}, action) {
  switch(action.type) {
    case MAKERETRIEVEPASS:
      return { ...state, makeretrievepass: true };
    case MAKEUNRETRIEVEPASS:
      return { ...state, makeretrievepass: false };
    case MAKERETRIVEPASS_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}
