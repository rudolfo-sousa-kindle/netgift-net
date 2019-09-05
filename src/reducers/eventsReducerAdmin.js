import {
    FETCH_EVENT_BEGIN,
    FETCH_EVENTS_BEGIN_NEXT,
    FETCH_EVENT_SUCCESS,
    FETCH_ONEEVENT_SUCCESS,
    FETCH_EVENTCATEGORIES_SUCCESS,
    FETCH_EVENT_FAILURE,
    SEND_EVENT_SUCCESS,
} from '../actions/eventsActions';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case SEND_EVENT_SUCCESS:
        return{
          ...state,
          loading: false,
          messagem: "Tema adicionado com sucesso!"
        };
      case FETCH_EVENT_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };

        case FETCH_EVENTS_BEGIN_NEXT:
          return {
            ...state,
            loading: false,
            loadingNext: true,
            error: null
          }
  
      case FETCH_EVENT_FAILURE:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: []
          };
  
      case FETCH_EVENT_SUCCESS:
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
            items: action.payload.events
          };        
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }