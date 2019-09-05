import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_RESUME_FINANCIAL_BEGIN   = 'FETCH_RESUME_FINANCIAL_BEGIN';
export const FETCH_RESUME_FINANCIAL_SUCCESS = 'FETCH_RESUME_FINANCIAL_SUCCESS';
export const FETCH_RESUME_FINANCIAL_FAILURE = 'FETCH_RESUME_FINANCIAL_FAILURE';


export const fetchResumeFinancialBegin = () => ({
    type: FETCH_RESUME_FINANCIAL_BEGIN
});

export const fetchResumeFinancialSuccess = resumeFinancial => ({
    type: FETCH_RESUME_FINANCIAL_SUCCESS,
    payload: { resumeFinancial }
});

export const fetchResumeFinancialFailure = error => ({
    type: FETCH_RESUME_FINANCIAL_FAILURE,
    payload: { error }
});

export function fetchResumeFinancial(id_event, item_per_page, page){
    return dispatch => {
      dispatch(fetchResumeFinancialBegin());
      return axios.get(`${URL}/financial/${id_event}/${item_per_page}/${page}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchResumeFinancialSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchResumeFinancialFailure(error)));
    }
}