import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_ADD_BANK_BEGIN   = 'FETCH_ADD_BANK_BEGIN';
export const FETCH_ADD_BANK_SUCCESS = 'FETCH_ADD_BANK_SUCCESS';
export const FETCH_ADD_BANK_FAILURE = 'FETCH_ADD_BANK_FAILURE';

const config = {
    headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}
}

export const fetchAddBankUserBegin = () => ({
    type: FETCH_ADD_BANK_BEGIN
});

export const fetchAddBankUserSuccess = addBankUser => ({
    type: FETCH_ADD_BANK_SUCCESS,
    payload: { addBankUser }
});

export const fetchAddBankUserFailure = error => ({
    type: FETCH_ADD_BANK_FAILURE,
    payload: { error }
});

export function fetchAddBankUser(id_event, obj){
    return dispatch => {
      dispatch(fetchAddBankUserBegin());
      return axios.post(`${URL}/financial/bank/${id_event}`, obj, config)
        .then((response) => {
          var {data} = response;
          dispatch(fetchAddBankUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchAddBankUserFailure(error)));
    }
}