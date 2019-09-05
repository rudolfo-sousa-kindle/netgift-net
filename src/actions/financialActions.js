import axios from "axios";

export const FETCH_FINANCIAL_BEGIN   = 'FETCH_FINANCIAL_BEGIN';
export const FETCH_FINANCIAL_FAILURE = 'FETCH_FINANCIAL_FAILURE';
export const FETCH_FINANCIAL_SUCCESS = 'FETCH_FINANCIAL_SUCCESS';


const URL   = "http://51.15.99.120:4700";
const urlWP = "https://www.localkindle.com.br/netgift_api/wp-json/ntgift/api";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const fetchFinancialBegin = () => ({
    type: FETCH_FINANCIAL_BEGIN
});

export const fetchFinancialSuccess = ( data ) => {

  return ({
    type: FETCH_FINANCIAL_SUCCESS,
    payload: { data }
  })
};


export const fetchFinancialFailure = error => ({
    type: FETCH_FINANCIAL_FAILURE,
    payload: { error }
});

export function fetchFinancial(page = 1){
  return dispatch => {
    dispatch(fetchFinancialBegin());
    return axios.post(`${URL}/financial/search/4/${page}`, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchFinancialSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchFinancialFailure(error)));
  }
}

