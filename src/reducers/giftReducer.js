import {
    FETCH_GIFT_BEGIN,
    FETCH_GIFT_SUCCESS,
    FETCH_ONEGIFT_SUCCESS,
    FETCH_GIFTCATEGORIES_SUCCESS,
    FETCH_GIFT_FAILURE,
    SEND_GIFT_SUCCESS,
    FETCH_GIFT_BEGIN_NEXT,
    SEND_GIFT_BEGIN
  } from '../actions/giftActions.js';

  const initialState = {
    items: [],
    item: [],
    loading: true,
    error: null,
    loadingNext: true,
    loadingSend: true,
    loadingOne: true
  };

  export default function productReducer(state = initialState, action) {
    switch(action.type) {

      case SEND_GIFT_BEGIN:
      return{
        ...state,
        loadingSend: true
      }

      case FETCH_GIFT_BEGIN_NEXT:
        return {
          ...state,
          loading: false,
          loadingNext: true,
          loadingSend: false
        }
      case FETCH_GIFT_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          loadingOne: true,
          loadingNext: false,
          loadingSend: false,
          error: null
        };

      case FETCH_GIFT_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        return {
          ...state,
          loading: false,
          loadingOne: true,
          items: action.payload.gifts,
          loadingNext: false,
          loadingSend: false
        };

        case FETCH_ONEGIFT_SUCCESS:
          return{
            ...state,
            loading: false,
            loadingOne: false,
            loadingSend: false,
            item: action.payload.gift
          }

        case FETCH_GIFTCATEGORIES_SUCCESS: 
        return {
          ...state,
          loading: false,
          loadingSend: false,
          giftsCategories: action.payload.gifts
        }

      case FETCH_GIFT_FAILURE:
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
          loadingSend: false,
          error: action.payload.error,
          items: []
        };

        case SEND_GIFT_SUCCESS:
        return {
          ...state,
          success: action.payload.data,
          loading: false,
          loadingSend: false
        }

      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
