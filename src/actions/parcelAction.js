import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_PARCEL_BEGIN   = 'FETCH_PARCEL_BEGIN';
export const FETCH_PARCEL_SUCCESS = 'FETCH_PARCEL_SUCCESS';
export const FETCH_PARCEL_FAILURE = 'FETCH_PARCEL_FAILURE';

export function addThemes(values, history){

    return async dispatch => {
      console.log(values);
    }
  
}

export const fetchParcelBegin = () => ({
    type: FETCH_PARCEL_BEGIN
});

export const fetchParcelSuccess = parcel => ({
    type: FETCH_PARCEL_SUCCESS,
    payload: { parcel }
});

export const fetchParcelFailure = error => ({
    type: FETCH_PARCEL_FAILURE,
    payload: { error }
});

export function fetchParcel(){
    return dispatch => {
      dispatch(fetchParcelBegin());
      return axios.get(`${URL}/checkout/parcel-qty`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchParcelSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchParcelFailure(error)));
    }
}