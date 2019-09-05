import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_ALL_GIFTS_BEGIN   = 'FETCH_ALL_GIFTS_BEGIN';
export const FETCH_ALL_GIFTS_SUCCESS = 'FETCH_ALL_GIFTS_SUCCESS';
export const FETCH_ALL_GIFTS_FAILURE = 'FETCH_ALL_GIFTS_FAILURE';

export const fetchAllGiftsBegin = () => ({
    type: FETCH_ALL_GIFTS_BEGIN
});

export const fetchAllGiftsSuccess = allGifts => ({
    type: FETCH_ALL_GIFTS_SUCCESS,
    payload: { allGifts }
});

export const fetchAllGiftsFailure = error => ({
    type: FETCH_ALL_GIFTS_FAILURE,
    payload: { error }
});

export function fetchAllGifts(id_event, obj){
    return dispatch => {
      dispatch(fetchAllGiftsBegin());
      return axios.get(`${URL}/gift/event/${id_event}/client`, obj)
        .then((response) => {
          var {data} = response;
          console.log(response)
          dispatch(fetchAllGiftsSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchAllGiftsFailure(error)));
    }
}