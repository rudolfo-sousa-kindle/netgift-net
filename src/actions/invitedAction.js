import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_INVITED_BEGIN   = 'FETCH_INVITED_BEGIN';
export const FETCH_INVITED_SUCCESS = 'FETCH_INVITED_SUCCESS';
export const FETCH_INVITED_FAILURE = 'FETCH_INVITED_FAILURE';


export const fetchInvitedBegin = () => ({
    type: FETCH_INVITED_BEGIN
});

export const fetchInvitedSuccess = invited => ({
    type: FETCH_INVITED_SUCCESS,
    payload: { invited }
});

export const fetchInvitedFailure = error => ({
    type: FETCH_INVITED_FAILURE,
    payload: { error }
});

export function fetchInvited(event_id, order_by = 'created_at', order = 'ASC'){
    return dispatch => {
      dispatch(fetchInvitedBegin());
      return axios.post(`${URL}/invite/${event_id}/inviteds`, { 'order_by': order_by, 'order_type': order })
        .then((response) => {
          var {data} = response;
          dispatch(fetchInvitedSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchInvitedFailure(error)));
    }
}