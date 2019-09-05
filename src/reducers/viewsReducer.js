import {
    FETCH_VIEW_COUNT_BEGIN,
    FETCH_VIEW_COUNT_SUCCESS,
    FETCH_VIEW_COUNT_FAILURE
} from '../actions/viewsActions';
  
  const initialState = {
    total: [],
    totalPassado: [],
    loading: true,
    error: null
  };

  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_VIEW_COUNT_BEGIN:
        return{
          ...state,
          loading: true
        };
  
      case FETCH_VIEW_COUNT_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            total: []
          };
  
      case FETCH_VIEW_COUNT_SUCCESS:
        return {
            ...state,
            loading: true,
            total: action.payload.view
          };  
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }