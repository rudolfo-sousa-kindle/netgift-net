import axios from "axios";

const URL   = "http://51.15.99.120:4700";

export const FETCH_LIST_GIFTS_BEGIN   = 'FETCH_LIST_GIFTS_BEGIN';
export const FETCH_LIST_GIFTS_SUCCESS = 'FETCH_LIST_GIFTS_SUCCESS';
export const FETCH_LIST_GIFTS_FAILURE = 'FETCH_LIST_GIFTS_FAILURE';


export const fetchListGiftsBegin = () => ({
    type: FETCH_LIST_GIFTS_BEGIN
});

export const fetchListGiftsSuccess = listGifts => ({
    type: FETCH_LIST_GIFTS_SUCCESS,
    payload: { listGifts }
});

export const fetchListGiftsFailure = error => ({
    type: FETCH_LIST_GIFTS_FAILURE,
    payload: { error }
});

export function fetchListGifts(event_id){
    return dispatch => {
      dispatch(fetchListGiftsBegin());
      return axios.get(`${URL}/gift/event/${event_id}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchListGiftsSuccess(data));
          
          return data;
        })
        .catch(error => dispatch(fetchListGiftsFailure(error)));
    }
}