import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_GET_BANK_BEGIN   = 'FETCH_GET_BANK_BEGIN';
export const FETCH_GET_BANK_SUCCESS = 'FETCH_GET_BANK_SUCCESS';
export const FETCH_GET_BANK_FAILURE = 'FETCH_GET_BANK_FAILURE';

const config = {
    headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"}
}

export const fetchGetBankUserBegin = () => ({
    type: FETCH_GET_BANK_BEGIN
});

export const fetchGetBankUserSuccess = getBankUser => ({
    type: FETCH_GET_BANK_SUCCESS,
    payload: { getBankUser }
});

export const fetchGetBankUserFailure = error => ({
    type: FETCH_GET_BANK_FAILURE,
    payload: { error }
});

export function fetchGetBankUser(id_event){
    return dispatch => {
      dispatch(fetchGetBankUserBegin());
      return axios.get(`${URL}/financial/bank/${id_event}`, config)
        .then((response) => {
          var {data} = response;
          dispatch(fetchGetBankUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchGetBankUserFailure(error)));
    }
}