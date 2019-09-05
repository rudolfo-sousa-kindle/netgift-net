import axios from "axios";
import Snackbar from 'node-snackbar';
import $ from 'jquery';

const URL   = "http://51.15.99.120:4700";

export const FETCH_SET_RSVP_BEGIN   = 'FETCH_SET_RSVP_BEGIN';
export const FETCH_SET_RSVP_SUCCESS = 'FETCH_SET_RSVP_SUCCESS';
export const FETCH_SET_RSVP_FAILURE = 'FETCH_SET_RSVP_FAILURE';

export const fetchSetRsvpBegin = () => ({
    type: FETCH_SET_RSVP_BEGIN
});

export const fetchSetRsvpSuccess = setRsvp => ({
    type: FETCH_SET_RSVP_SUCCESS,
    payload: { setRsvp }
});

export const fetchSetRsvpFailure = error => ({
    type: FETCH_SET_RSVP_FAILURE,
    payload: { error }
});

export function fetchSetRsvp(id_event, obj){
    return dispatch => {
      dispatch(fetchSetRsvpBegin());
      return axios.post(`${URL}/invite/${id_event}`, obj)
      .then((response) => {
          var {data} = response;
          dispatch(fetchSetRsvpSuccess(data));
          $('.nb-spinner').hide();

          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Seu RSVP foi configurado com successo.',
                backgroundColor: '#8332f5',
                showAction: false,
                duration: 5000
            });
          }, 1000);
          return data;
        })
        .catch(error => {
            $('.nb-spinner').hide();

            setTimeout(() => {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Não foi possível configurar o RSVP. verifique se todos os campos foram preenchidos e tente novamente.',
                    backgroundColor: '#da1e1e',
                    showAction: false,
                    duration: 5000
                });
            }, 1000);

            dispatch(fetchSetRsvpFailure(error))
        });
    }
}