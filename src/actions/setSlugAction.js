import axios from "axios";
import Snackbar from 'node-snackbar';
import $ from "jquery";

const URL   = "http://51.15.99.120:4700";

export const FETCH_SET_SLUG_BEGIN   = 'FETCH_SET_SLUG_BEGIN';
export const FETCH_SET_SLUG_SUCCESS = 'FETCH_SET_SLUG_SUCCESS';
export const FETCH_SET_SLUG_FAILURE = 'FETCH_SET_SLUG_FAILURE';


export const fetchSetSlugBegin = () => ({
    type: FETCH_SET_SLUG_BEGIN
});

export const fetchSetSlugSuccess = setSlug => ({
    type: FETCH_SET_SLUG_SUCCESS,
    payload: { setSlug }
});

export const fetchSetSlugFailure = error => ({
    type: FETCH_SET_SLUG_FAILURE,
    payload: { error }
});

export function fetchSetSlug(event_id, obj){
    return dispatch => {
      dispatch(fetchSetSlugBegin());
      return axios.post(`${URL}/painel/${event_id}/slug`, obj)
        .then((response) => {
          var {data} = response;
          dispatch(fetchSetSlugSuccess(data));
          $('.flex .nb-spinner').hide();
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Endereço do site alterado com succeso',
                backgroundColor: '#8332f5',
                showAction: false,
                duration: 5000
            });
          }, 1000);
          return data;
        })
        .catch(error => {
            $('.flex .nb-spinner').hide();
            setTimeout(() => {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Não foi possível alterar o endereço do site',
                    backgroundColor: '#da1e1e',
                    showAction: false,
                    duration: 5000
                });
            }, 1000);

            dispatch(fetchSetSlugFailure(error))
        });
    }
}