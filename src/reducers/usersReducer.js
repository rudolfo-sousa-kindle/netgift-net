import {
    FETCH_USER_COUNT_BEGIN,
    FETCH_USER_COUNT_SUCCESS,
    FETCH_USER_COUNT_SITES_SUCCESS,
    FETCH_USER_COUNT_PASSADO_SUCCESS,
    FETCH_USER_COUNT_SITES_PASSADO_SUCCESS,
    FETCH_USER_COUNT_FAILURE
} from '../actions/usersActions';
  
  const initialState = {
    total: [],
    totalPassado: [],
    loading: true,
    error: null
  };

  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_USER_COUNT_BEGIN:
        return{
          ...state,
          loading: true
        };
  
      case FETCH_USER_COUNT_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            total: []
          };

      case FETCH_USER_COUNT_PASSADO_SUCCESS:
        return{
          ...state,
          loading: false,
          error: null,
          totalPassado: action.payload.userPassado,
          porcentagem: action.porcentagem.porcentagem,
        }

        case FETCH_USER_COUNT_SITES_PASSADO_SUCCESS:
        return{
          ...state,
          loading: false,
          error: null,
          totalSitePassado: action.payload.sitesPassado,
          porcentagemSites: action.porcentagem.porcentagem,
        }
  
      case FETCH_USER_COUNT_SUCCESS:
        return {
            ...state,
            loading: true,
            total: action.payload.user
          };

      case FETCH_USER_COUNT_SITES_SUCCESS:
        return {
          ...state,
          loading: true,
          totalSites: action.payload.sites
        }    
        
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }