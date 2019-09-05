import axios from "axios";

export const FETCH_FILTER_BEGIN   = 'FETCH_FILTER_BEGIN';
export const FETCH_FILTER_FAILURE = 'FETCH_FILTER_FAILURE';
export const FETCH_FILTER_SUCCESS = 'FETCH_FILTER_SUCCESS';


const URL   = "http://51.15.99.120:4700";
const urlWP = "https://www.localkindle.com.br/netgift_api/wp-json/ntgift/api";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const fetchFilterBegin = () => ({
    type: FETCH_FILTER_BEGIN
});

export const fetchFilterSuccess = ( data, type ) => {
  var categories = 'categories' === type ? data : [];
  var thematics  = 'thematics' === type ? data : [];

  return ({
    type: FETCH_FILTER_SUCCESS,
    payload: { categories, thematics }
  })
};


export const fetchFilterFailure = error => ({
    type: FETCH_FILTER_FAILURE,
    payload: { error }
});

export function fetchFilter(type){
  return dispatch => {
    dispatch(fetchFilterBegin());
    return axios.get(`${URL}/theme/${type}`, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchFilterSuccess(data, type));
        return data;
      })
      .catch(error => dispatch(fetchFilterFailure(error)));
  }
}

