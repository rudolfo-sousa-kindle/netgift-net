import axios from "axios";
import $ from "jquery";
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";

export const FETCH_SALUTATION_BEGIN   = 'FETCH_SALUTATION_BEGIN';
export const FETCH_SALUTATION_SUCCESS = 'FETCH_SALUTATION_SUCCESS';
export const FETCH_SALUTATION_FAILURE = 'FETCH_SALUTATION_FAILURE';


export const fetchSalutationBegin = () => ({
    type: FETCH_SALUTATION_BEGIN
});

export const fetchSalutationSuccess = salutation => ({
    type: FETCH_SALUTATION_SUCCESS,
    payload: { salutation }
});

export const fetchSalutationFailure = error => ({
    type: FETCH_SALUTATION_FAILURE,
    payload: { error }
});

export function fetchSalutation(event_id, obj){
    return dispatch => {
      dispatch(fetchSalutationBegin());
      return axios.post(`${URL}/gift/salutation/${event_id}/text`, obj)
        .then((response) => {
          var {data} = response;
          
          dispatch(fetchSalutationSuccess(data));
          $('.salutation .config-item-content').slideUp();
          $('.flex .nb-spinner').hide();
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'mensagem enviada com sucesso',
                backgroundColor: '#8332f5',
                showAction: false,
                duration: 5000
            });

            $('.textarea-mensagem').val('');
            $('.count-js').html(0);
          }, 1000);
          return data;
        })
        .catch(error => dispatch(fetchSalutationFailure(error)));
    }
}