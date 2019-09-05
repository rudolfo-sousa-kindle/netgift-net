import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_CONFIRM_PRESENCE_BEGIN   = 'FETCH_CONFIRM_PRESENCE_BEGIN';
export const FETCH_CONFIRM_PRESENCE_FAILURE = 'FETCH_CONFIRM_PRESENCE_FAILURE';
export const FETCH_CONFIRM_PRESENCE_SUCCESS = 'FETCH_CONFIRM_PRESENCE_SUCCESS';

export const fetchConfirmPresenceBegin = () => ({
    type: FETCH_CONFIRM_PRESENCE_BEGIN
});
  
export const fetchConfirmPresenceSuccess = confirmPresence => ({
    type: FETCH_CONFIRM_PRESENCE_SUCCESS,
    payload: { confirmPresence }
});
  
export const fetchConfirmPresenceFailure = error => ({
    type: FETCH_CONFIRM_PRESENCE_FAILURE,
    payload: { error }
});
  
export function fetchConfirmPresence({id_event}){
    return dispatch => {
        dispatch(fetchConfirmPresenceBegin());
        return axios.post(`${URL}/invite/${id_event}` )
        .then((response) => {
            var {data} = response;
            console.log(response)
            dispatch(fetchConfirmPresenceSuccess(data));
            return data;
        })
        .catch(error => dispatch(fetchConfirmPresenceFailure(error)));
    }
}