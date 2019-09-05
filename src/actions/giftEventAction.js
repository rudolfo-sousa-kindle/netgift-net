import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_GIFT_EVENT_BEGIN   = 'FETCH_GIFT_EVENT_BEGIN';
export const FETCH_GIFT_EVENT_SUCCESS = 'FETCH_GIFT_EVENT_SUCCESS';
export const FETCH_GIFT_EVENT_FAILURE = 'FETCH_GIFT_EVENT_FAILURE';


export const fetchGiftEventBegin = () => ({
    type: FETCH_GIFT_EVENT_BEGIN
});

export const fetchGiftEventSuccess = giftEvent => ({
    type: FETCH_GIFT_EVENT_SUCCESS,
    payload: { giftEvent }
});

export const fetchGiftEventFailure = error => ({
    type: FETCH_GIFT_EVENT_FAILURE,
    payload: { error }
});

export function fetchGiftEvent(id_event){
    return dispatch => {
      dispatch(fetchGiftEventBegin());
      return axios.get(`${URL}/gift/event/${id_event}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchGiftEventSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchGiftEventFailure(error)));
    }
}