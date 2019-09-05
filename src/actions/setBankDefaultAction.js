import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_BANK_DEFAULT_BEGIN   = 'FETCH_BANK_DEFAULT_BEGIN';
export const FETCH_BANK_DEFAULT_SUCCESS = 'FETCH_BANK_DEFAULT_SUCCESS';
export const FETCH_BANK_DEFAULT_FAILURE = 'FETCH_BANK_DEFAULT_FAILURE';


export const fetchBankDefaultBegin = () => ({
    type: FETCH_BANK_DEFAULT_BEGIN
});

export const fetchBankDefaultSuccess = bankDefault => ({
    type: FETCH_BANK_DEFAULT_SUCCESS,
    payload: { bankDefault }
});

export const fetchBankDefaultFailure = error => ({
    type: FETCH_BANK_DEFAULT_FAILURE,
    payload: { error }
});

export function fetchBankDefault(id_event, id_count){
    return dispatch => {
      dispatch(fetchBankDefaultBegin());
      return axios.post(`${URL}/financial/bank/${id_event}/${id_count}/default`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchBankDefaultSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchBankDefaultFailure(error)));
    }
}