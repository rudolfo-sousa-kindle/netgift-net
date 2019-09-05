import {
    FETCH_THEMES_BEGIN,
    FETCH_THEMES_FAILURE,
    FETCH_THEMES_SUCCESS,
    FETCH_THEME_SUCCESS,
    SEND_THEME_SUCCESS,
    FETCH_THEME_BEGIN_NEXT
} from '../actions/themesActions';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case SEND_THEME_SUCCESS:
        return{
          ...state,
          loading: false,
          messagem: "Tema adicionado com sucesso!"
        };
      case FETCH_THEMES_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };

        case FETCH_THEME_BEGIN_NEXT:
          return {
            ...state,
            loading: false,
            loadingNext: true,
            error: null
          }
  
      case FETCH_THEMES_FAILURE:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: []
          };
  
      case FETCH_THEMES_SUCCESS:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have items to display anymore, so set `items` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the items around!
        // Do whatever seems right for your use case.
        return {
            ...state,
            loading: false,
            loadingNext: false,
            items: action.payload.themes
          };

          case FETCH_THEME_SUCCESS:
            // The request failed. It's done. So set loading to "false".
            // Save the error, so we can display it somewhere.
            // Since it failed, we don't have items to display anymore, so set `items` empty.
            //
            // This is all up to you and your app though:
            // maybe you want to keep the items around!
            // Do whatever seems right for your use case.
            return {
                ...state,
                loading: false,
                item: action.payload.theme
              };
        
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }