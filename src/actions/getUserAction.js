import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_GET_USER_BEGIN   = 'FETCH_GET_USER_BEGIN';
export const FETCH_GET_USER_SUCCESS = 'FETCH_GET_USER_SUCCESS';
export const FETCH_GET_USER_FAILURE = 'FETCH_GET_USER_FAILURE';


export const fetchGetUserBegin = () => ({
    type: FETCH_GET_USER_BEGIN
});

export const fetchGetUserSuccess = user => ({
    type: FETCH_GET_USER_SUCCESS,
    payload: { user }
});

export const fetchGetUserFailure = error => ({
    type: FETCH_GET_USER_FAILURE,
    payload: { error }
});

export function fetchGetUser(id_user){
    return dispatch => {
      dispatch(fetchGetUserBegin());
      return axios.get(`${URL}/users/${id_user}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchGetUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchGetUserFailure(error)));
    }
}

export function editUserImage(id, image){
    return dispatch => {
        dispatch(fetchGetUserBegin());
    }
}