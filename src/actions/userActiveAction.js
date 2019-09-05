import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_USER_ACTIVE_BEGIN   = 'FETCH_USER_ACTIVE_BEGIN';
export const FETCH_USER_ACTIVE_SUCCESS = 'FETCH_USER_ACTIVE_SUCCESS';
export const FETCH_USER_ACTIVE_FAILURE = 'FETCH_USER_ACTIVE_FAILURE';


export const fetchUserActiveBegin = () => ({
    type: FETCH_USER_ACTIVE_BEGIN
});

export const fetchUserActiveSuccess = UserActive => ({
    type: FETCH_USER_ACTIVE_SUCCESS,
    payload: { UserActive }
});

export const fetchUserActiveFailure = error => ({
    type: FETCH_USER_ACTIVE_FAILURE,
    payload: { error }
});

export function fetchUserActive(id_event, id_user, obj){
    return dispatch => {
      dispatch(fetchUserActiveBegin());
      return axios.post(`${URL}/painel/${id_event}/users/${id_user}/active`, obj)
        .then((response) => {
          var {data} = response;
          console.log(response);
          dispatch(fetchUserActiveSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchUserActiveFailure(error)));
    }
}