import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_GET_EVENT_BEGIN   = 'FETCH_GET_EVENT_BEGIN';
export const FETCH_GET_EVENT_SUCCESS = 'FETCH_GET_EVENT_SUCCESS';
export const FETCH_GET_EVENT_FAILURE = 'FETCH_GET_EVENT_FAILURE';


export const fetchGetEventBegin = () => ({
    type: FETCH_GET_EVENT_BEGIN
});

export const fetchGetEventSuccess = eventOrganizer => ({
    type: FETCH_GET_EVENT_SUCCESS,
    payload: { eventOrganizer }
});

export const fetchGetEventFailure = error => ({
    type: FETCH_GET_EVENT_FAILURE,
    payload: { error }
});

export function fetchGetEvent(id_event){
    return dispatch => {
      dispatch(fetchGetEventBegin());
      return axios.get(`${URL}/event/${id_event}`)
        .then((response) => {
          var {data} = response;
         
          dispatch(fetchGetEventSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchGetEventFailure(error)));
    }
};

export function setThemeEvent(id_event, theme = null){
    return dispatch => {
        dispatch(fetchGetEventBegin());
        return axios.put(`${URL}/event/${id_event}`, {"theme_id" : `${theme}`})
        .then((res) => {
            var {data} = res;
            dispatch(fetchGetEventSuccess(data));
            return data;
        })
        .catch(error => dispatch(fetchGetEventFailure(error)));
    }
}

export function setSaulitationEvent(id_event, title = null, text = null, image = "null"){
    return dispatch => {
        dispatch(fetchGetEventBegin());
        // console.log(image)
        return axios.post(`${URL}/event/${id_event}/salutation`, {"title": title, "text": text, "image": image})
        .then((res) => {
            var {data} = res;
            dispatch(fetchGetEventSuccess(data));
            window.location.reload();
            return data;
        })
        .catch(error => dispatch(fetchGetEventFailure(error)));
    }
}

export function setLocalEvent(id_event, local = null){
    return dispatch => {
        console.log(local)
        var street = local[0];
        var city = local[2];
        var state = local[3];
        var number = local[1];
        var data = {
            "street" : street,
            "city" : city,
            "state" : state,
            "number" : number
        }
        dispatch(fetchGetEventBegin());
        return axios.post(`${URL}/event/${id_event}/address`, data)
        .then((res) => {
            console.log(res);
        })
    }
}