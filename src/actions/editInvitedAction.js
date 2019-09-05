import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_EDIT_INVITED_BEGIN   = 'FETCH_EDIT_INVITED_BEGIN';
export const FETCH_EDIT_INVITED_SUCCESS = 'FETCH_EDIT_INVITED_SUCCESS';
export const FETCH_EDIT_INVITED_FAILURE = 'FETCH_EDIT_INVITED_FAILURE';


export const fetchEditInvitedBegin = () => ({
    type: FETCH_EDIT_INVITED_BEGIN
});

export const fetchEditInvitedSuccess = editInvited => ({
    type: FETCH_EDIT_INVITED_SUCCESS,
    payload: { editInvited }
});

export const fetchEditInvitedFailure = error => ({
    type: FETCH_EDIT_INVITED_FAILURE,
    payload: { error }
});

export function fetchEditInvited(id_event, id_user, obj){
    return dispatch => {
      dispatch(fetchEditInvitedBegin());
      return axios.put(`${URL}/invite/${id_event}/user/${id_user}/send`, obj)
        .then((response) => {
          var {data} = response;
          console.log(response);
          dispatch(fetchEditInvitedSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchEditInvitedFailure(error)));
    }
}