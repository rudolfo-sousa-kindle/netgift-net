import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_TAX_BEGIN   = 'FETCH_TAX_BEGIN';
export const FETCH_TAX_SUCCESS = 'FETCH_TAX_SUCCESS';
export const FETCH_TAX_FAILURE = 'FETCH_TAX_FAILURE';


export const fetchTaxBegin = () => ({
    type: FETCH_TAX_BEGIN
});

export const fetchTaxSuccess = tax => ({
    type: FETCH_TAX_SUCCESS,
    payload: { tax }
});

export const fetchTaxFailure = error => ({
    type: FETCH_TAX_FAILURE,
    payload: { error }
});

export function fetchTax(id_event, obj){
    return dispatch => {
      dispatch(fetchTaxBegin());
      return axios.post(`${URL}/gift/tax/${id_event}`, obj)
        .then((response) => {
          var {data} = response;
          console.log(response)
          dispatch(fetchTaxSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchTaxFailure(error)));
    }
}