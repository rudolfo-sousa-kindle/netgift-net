import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_EVENTS_BY_USER_BEGIN   = 'FETCH_EVENTS_BY_USER_BEGIN';
export const FETCH_EVENTS_BY_USER_SUCCESS = 'FETCH_EVENTS_BY_USER_SUCCESS';
export const FETCH_EVENTS_BY_USER_FAILURE = 'FETCH_EVENTS_BY_USER_FAILURE';


export const fetchEventsByUserBegin = () => ({
    type: FETCH_EVENTS_BY_USER_BEGIN
});

export const fetchEventsByUserSuccess = eventsByUser => ({
    type: FETCH_EVENTS_BY_USER_SUCCESS,
    payload: { eventsByUser }
});

export const fetchEventsByUserFailure = error => ({
    type: FETCH_EVENTS_BY_USER_FAILURE,
    payload: { error }
});

export function fetchEventsByUser(id_user){
    return dispatch => {
      dispatch(fetchEventsByUserBegin());
      return axios.get(`${URL}/events/user/${id_user}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchEventsByUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchEventsByUserFailure(error)));
    }
}