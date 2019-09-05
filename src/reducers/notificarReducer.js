import{
    SET_NOTIFICACAO,
    SET_NOTIFICACAO_BEGIN,
    SET_NOTIFICACAO_SUCCESS,
}
from '../actions/notificarActions.js';

const initialState = {
    items: [],
    loading: false,
    error: null
  };

  export default function productReducer(state = initialState, action) {
    switch(action.type) {
        case SET_NOTIFICACAO:
            return {
                ...state,
                loading: false,
                items: action.payload.id
            };
        case SET_NOTIFICACAO_BEGIN: 
            return{
                ...state,
                loading: true, 
            }
        case SET_NOTIFICACAO_SUCCESS: 
            return{
                ...state,
                loading: false, 
            }    
        default:
            return state;
    }
  }