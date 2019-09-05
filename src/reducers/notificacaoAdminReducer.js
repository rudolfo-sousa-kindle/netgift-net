import{
    FETCH_NOTIFICACAO_BEGIN,
    FETCH_NOTIFICACAO_SUCCESS,
    FETCH_NOTIFICACAO_FAILURE,
    FETCH_NOTIFICACAO_PER_USER_SUCCESS
}
from '../actions/notificacoesAdminActions.js';

const initialState = {
    items: [],
    loading: true,
    error: null
  };

  export default function productReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_NOTIFICACAO_BEGIN:
            return {
                ...state,
                loading: true,
                items: []
            };
        case FETCH_NOTIFICACAO_SUCCESS: 
            return{
                ...state,
                loading: false, 
                items: action.payload.data
            }
        case FETCH_NOTIFICACAO_PER_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                notificacoes: action.payload.data
            }
        case FETCH_NOTIFICACAO_FAILURE: 
            return{
                ...state,
                loading: false,
                error: action.payload.error 
            }    
        default:
            return state;
    }
  }