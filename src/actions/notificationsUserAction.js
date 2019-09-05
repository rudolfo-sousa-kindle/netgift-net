import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_NOTIFICATIONS_USER_BEGIN   = 'FETCH_NOTIFICATIONS_USER_BEGIN';
export const FETCH_NOTIFICATIONS_USER_SUCCESS = 'FETCH_NOTIFICATIONS_USER_SUCCESS';
export const FETCH_NOTIFICATIONS_USER_FAILURE = 'FETCH_NOTIFICATIONS_USER_FAILURE';


export const fetchNotificationsUserBegin = () => ({
    type: FETCH_NOTIFICATIONS_USER_BEGIN
});

export const fetchNotificationsUserSuccess = notificationsUser => ({
    type: FETCH_NOTIFICATIONS_USER_SUCCESS,
    payload: { notificationsUser }
});

export const fetchNotificationsUserFailure = error => ({
    type: FETCH_NOTIFICATIONS_USER_FAILURE,
    payload: { error }
});

export function fetchNotificationsUser(id_user){
    return dispatch => {
      dispatch(fetchNotificationsUserBegin());
      return axios.get(`${URL}/painel/${id_user}/notifications`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchNotificationsUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchNotificationsUserFailure(error)));
    }
}