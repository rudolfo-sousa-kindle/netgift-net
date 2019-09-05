import axios from "axios";

export const FETCH_CATEGORIES_BEGIN   = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_SET_CATEGORIES_SUCCESS = 'FETCH_SET_CATEGORIES_SUCCESS';


const URL   = "http://51.15.99.120:4700";
const urlWP = "https://www.localkindle.com.br/netgift_api/wp-json/ntgift/api";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const fetchCategoriesBegin = () => ({
    type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = ( data, type ) => {
  var categories = 'categories' === type ? data : [];
  var thematics  = 'thematics' === type ? data : [];

  return ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: { categories, thematics }
  })
};

export const fetchSetCategoriesSuccess = ( data, type ) => {
  var new_categories = 'categories' === type ? data : [];
  var new_thematics  = 'thematics' === type ? data : [];

  return ({
    type: FETCH_SET_CATEGORIES_SUCCESS,
    payload: { new_categories, new_thematics }
  })
};

export const fetchCategoriesFailure = error => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: { error }
});

export function fetchCategories(type, endpoint = 'theme'){
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return axios.get(`${URL}/${endpoint}/${type}`, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchCategoriesSuccess(data, type));
        return data;
      })
      .catch(error => dispatch(fetchCategoriesFailure(error)));
  }
}

export function fetchSetCategories(type, cat_name, endpoint = 'theme'){
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return axios.post(`${URL}/${endpoint}/${type}`, { "name" : cat_name }, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchSetCategoriesSuccess(data, type));
        return data;
      })
      .catch(error => dispatch(fetchCategoriesFailure(error)));
  }
}
