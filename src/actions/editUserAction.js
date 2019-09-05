import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_EDIT_USER_BEGIN   = 'FETCH_EDIT_USER_BEGIN';
export const FETCH_EDIT_USER_SUCCESS = 'FETCH_EDIT_USER_SUCCESS';
export const FETCH_EDIT_USER_FAILURE = 'FETCH_EDIT_USER_FAILURE';


export const fetchEditUserBegin = () => ({
    type: FETCH_EDIT_USER_BEGIN
});

export const fetchEditUserSuccess = editUser => ({
    type: FETCH_EDIT_USER_SUCCESS,
    payload: { editUser }
});

export const fetchEditUserFailure = error => ({
    type: FETCH_EDIT_USER_FAILURE,
    payload: { error }
});

export function fetchEditUser(id_event, id_user, obj){
    return dispatch => {
      dispatch(fetchEditUserBegin());
      return axios.put(`${URL}/painel/${id_event}/users/${id_user}`, obj)
        .then((response) => {
          var {data} = response;
          dispatch(fetchEditUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchEditUserFailure(error)));
    }
}