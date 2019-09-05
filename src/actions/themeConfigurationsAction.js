import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_THEME_CONFIGURATIONS_BEGIN   = 'FETCH_THEME_CONFIGURATIONS_BEGIN';
export const FETCH_THEME_CONFIGURATIONS_SUCCESS = 'FETCH_THEME_CONFIGURATIONS_SUCCESS';
export const FETCH_THEME_CONFIGURATIONS_FAILURE = 'FETCH_THEME_CONFIGURATIONS_FAILURE';

export function addThemes(values, history){

    return async dispatch => {
      console.log(values);
    }
  
}

export const fetchThemeConfigurationsBegin = () => ({
    type: FETCH_THEME_CONFIGURATIONS_BEGIN
});

export const fetchThemeConfigurationsSuccess = themeConfigurations => ({
    type: FETCH_THEME_CONFIGURATIONS_SUCCESS,
    payload: { themeConfigurations }
});

export const fetchThemeConfigurationsFailure = error => ({
    type: FETCH_THEME_CONFIGURATIONS_FAILURE,
    payload: { error }
});

export function fetchThemeConfigurations(id){
    return dispatch => {
      dispatch(fetchThemeConfigurationsBegin());
      return axios.get(`${URL}/theme/${id}/config`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchThemeConfigurationsSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchThemeConfigurationsFailure(error)));
    }
}