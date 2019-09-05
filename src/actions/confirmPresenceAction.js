import axios from "axios";
import Snackbar from 'node-snackbar';
import $ from "jquery";

const URL   = "http://51.15.99.120:4700";

export const FETCH_CONFIRM_PRESENCE_BEGIN   = 'FETCH_CONFIRM_PRESENCE_BEGIN';
export const FETCH_CONFIRM_PRESENCE_FAILURE = 'FETCH_CONFIRM_PRESENCE_FAILURE';
export const FETCH_CONFIRM_PRESENCE_SUCCESS = 'FETCH_CONFIRM_PRESENCE_SUCCESS';

export const fetchConfirmPresenceBegin = () => ({
    type: FETCH_CONFIRM_PRESENCE_BEGIN
});
  
export const fetchConfirmPresenceSuccess = confirmPresence => ({
    type: FETCH_CONFIRM_PRESENCE_SUCCESS,
    payload: { confirmPresence }
});
  
export const fetchConfirmPresenceFailure = error => ({
    type: FETCH_CONFIRM_PRESENCE_FAILURE,
    payload: { error }
});
  
export function fetchConfirmPresence(id_event, obj){
    return dispatch => {
        dispatch(fetchConfirmPresenceBegin());
        return axios.post(`${URL}/invite/${id_event}/event`, obj)
        .then((response) => {
            var {data} = response;
            console.log(obj);
            console.log(response);
            dispatch(fetchConfirmPresenceSuccess(data));

            $('form[name="confirmar-presenca"] .nb-spinner').hide();
            $('form[name="confirmar-presenca"] .ng-right-arrow-extend').show();
            setTimeout(() => {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Presença confirmada.',
                    backgroundColor: '#8332f5',
                    showAction: false,
                    duration: 5000
                });
              }, 1000);
            return data;
        })
        .catch(error => {
            dispatch(fetchConfirmPresenceFailure(error))

            $('form[name="confirmar-presenca"] .nb-spinner').hide();
            $('form[name="confirmar-presenca"] .ng-right-arrow-extend').show();
            setTimeout(() => {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Não foi possível confirmar presença.',
                    backgroundColor: '#da1e1e',
                    showAction: false,
                    duration: 5000
                });
              }, 1000);
        });
    }
}