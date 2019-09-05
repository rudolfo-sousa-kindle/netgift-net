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
          //history.push(`/dashboard/home/${data.event.id}`);
          window.location.href = `/dashboard/home/${data.event.id}`;

          return data;
        })
        .catch(error => dispatch(fetchCreateEventFailure(error)));
    }
}