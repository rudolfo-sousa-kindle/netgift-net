import {
    FETCH_CHECKOUT_CART_BEGIN,
    FETCH_CHECKOUT_CART_FAILURE,
    FETCH_CHECKOUT_CART_SUCCESS
} from '../actions/checkoutCartAction';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  export default function productReducer(state = initialState, action) {

    switch(action.type) {
      case FETCH_CHECKOUT_CART_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_CHECKOUT_CART_FAILURE:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            items: []
          };
  
      case FETCH_CHECKOUT_CART_SUCCESS:
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
            items: action.payload.checkoutCart
          };
        
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }