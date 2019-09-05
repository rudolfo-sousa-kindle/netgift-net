import axios from "axios";
import $ from "jquery";
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";

export const FETCH_SALUTATION_BEGIN   = 'FETCH_SALUTATION_BEGIN';
export const FETCH_SALUTATION_SUCCESS = 'FETCH_SALUTATION_SUCCESS';
export const FETCH_SALUTATION_FAILURE = 'FETCH_SALUTATION_FAILURE';


export const fetchSalutationActiveBegin = () => ({
    type: FETCH_SALUTATION_BEGIN
});

export const fetchSalutationActiveSuccess = salutation => ({
    type: FETCH_SALUTATION_SUCCESS,
    payload: { salutation }
});

export const fetchSalutationActiveFailure = error => ({
    type: FETCH_SALUTATION_FAILURE,
    payload: { error }
});

export function fetchSalutationActive(event_id, obj){
    return dispatch => {
      dispatch(fetchSalutationActiveBegin());
      return axios.post(`${URL}/gift/salutation/${event_id}`, obj)
        .then((response) => {
          var {data} = response;
          console.log(response)
          dispatch(fetchSalutationActiveSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchSalutationActiveFailure(error)));
    }
}