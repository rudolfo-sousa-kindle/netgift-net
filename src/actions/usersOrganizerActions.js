import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_USERS_ORGANIZER_BEGIN   = 'FETCH_USERS_ORGANIZER_BEGIN';
export const FETCH_USERS_ORGANIZER_SUCCESS = 'FETCH_USERS_ORGANIZER_SUCCESS';
export const FETCH_USERS_ORGANIZER_FAILURE = 'FETCH_USERS_ORGANIZER_FAILURE';


export const fetchUsersOrganizerBegin = () => ({
    type: FETCH_USERS_ORGANIZER_BEGIN
});

export const fetchUsersOrganizerSuccess = usersOrganizer => ({
    type: FETCH_USERS_ORGANIZER_SUCCESS,
    payload: { usersOrganizer }
});

export const fetchUsersOrganizerFailure = error => ({
    type: FETCH_USERS_ORGANIZER_FAILURE,
    payload: { error }
});

export function fetchUsersOrganizer(id_event){
    return dispatch => {
      dispatch(fetchUsersOrganizerBegin());
      return axios.get(`${URL}/painel/${id_event}/users`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchUsersOrganizerSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchUsersOrganizerFailure(error)));
    }
}