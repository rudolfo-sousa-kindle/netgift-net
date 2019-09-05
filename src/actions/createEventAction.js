import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_CREATE_EVENT_BEGIN   = 'FETCH_CREATE_EVENT_BEGIN';
export const FETCH_CREATE_EVENT_SUCCESS = 'FETCH_CREATE_EVENT_SUCCESS';
export const FETCH_CREATE_EVENT_FAILURE = 'FETCH_CREATE_EVENT_FAILURE';


export const fetchCreateEventBegin = () => ({
    type: FETCH_CREATE_EVENT_BEGIN
});

export const fetchCreateEventSuccess = createEvent => ({
    type: FETCH_CREATE_EVENT_SUCCESS,
    payload: { createEvent }
});

export const fetchCreateEventFailure = error => ({
    type: FETCH_CREATE_EVENT_FAILURE,
    payload: { error }
});

export function fetchCreateEvent(obj, history){
    return dispatch => {
      dispatch(fetchCreateEventBegin());
      return axios.post(`${URL}/event`, obj)
        .then((response) => {
          var {data} = response;
          dispatch(fetchCreateEventSuccess(data));
            var user = localStorage.getItem('user');
            user = JSON.parse(user);
            var user_id = user.id;
            //history.push(`/dashboard/home/${data.event.id}`);
            var EVENT    = data;
            var EVENT_ID = data.event.id;
              console.log( EVENT )
            return axios.post(`${URL}/event/${data.event.id}/user/${user_id}`)
            .then((response) => {
              var {data} = response;
              dispatch(fetchCreateEventSuccess(EVENT));
              //history.push(`/dashboard/home/${data.event.id}`);
              window.location.href = `/dashboard/home/${EVENT_ID}`;

              return EVENT;
            })

          return EVENT;
        })
        .catch(error => dispatch(fetchCreateEventFailure(error)));
    }
}