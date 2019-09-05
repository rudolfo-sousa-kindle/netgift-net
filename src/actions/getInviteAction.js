import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_GET_INVITE_BEGIN   = 'FETCH_GET_INVITE_BEGIN';
export const FETCH_GET_INVITE_SUCCESS = 'FETCH_GET_INVITE_SUCCESS';
export const FETCH_GET_INVITE_FAILURE = 'FETCH_GET_INVITE_FAILURE';


export const fetchGetInviteBegin = () => ({
    type: FETCH_GET_INVITE_BEGIN
});

export const fetchGetInviteSuccess = getInvite => ({
    type: FETCH_GET_INVITE_SUCCESS,
    payload: { getInvite }
});

export const fetchGetInviteFailure = error => ({
    type: FETCH_GET_INVITE_FAILURE,
    payload: { error }
});

export function fetchGetInvite(id_event){
    return dispatch => {
      dispatch(fetchGetInviteBegin());
      return axios.get(`${URL}/invite/${id_event}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchGetInviteSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchGetInviteFailure(error)));
    }
}