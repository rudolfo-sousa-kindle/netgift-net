import axios from "axios";
import $ from "jquery";
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";
export const FETCH_SEND_INVITED_BEGIN   = 'FETCH_SEND_INVITED_BEGIN';
export const FETCH_SEND_INVITED_SUCCESS = 'FETCH_SEND_INVITED_SUCCESS';
export const FETCH_SEND_INVITED_FAILURE = 'FETCH_SEND_INVITED_FAILURE';

const config = {
    headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}  

export const fetchSendInvitedBegin = () => ({
    type: FETCH_SEND_INVITED_BEGIN
});

export const fetchSendInvitedSuccess = sendInvited => ({
    type: FETCH_SEND_INVITED_SUCCESS,
    payload: { sendInvited }
});

export const fetchSendInvitedFailure = error => ({
    type: FETCH_SEND_INVITED_FAILURE,
    payload: { error }
});

export function fetchSendInvited(event_id, obj, send_to_all = false){
    return dispatch => {
      dispatch(fetchSendInvitedBegin());
      if ( send_to_all ) {
        return axios.post(`${URL}/invites/${event_id}/send`, config)
          .then((response) => {
            var {data} = response;
            console.log(response)
            dispatch(fetchSendInvitedSuccess(data));
            $('.flex .nb-spinner').hide();
            setTimeout(() => {
              Snackbar.show({
                  pos: 'bottom-center',
                  text: 'Convites enviados',
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
                  text: 'Não foi possível enviar os convites',
                  backgroundColor: '#da1e1e',
                  showAction: false,
                  duration: 5000
              });
            }, 1000);

            dispatch(fetchSendInvitedFailure(error))
          });
      } else {
        return axios.post(`${URL}/invite/${event_id}/send`, obj, config)
          .then((response) => {
            var {data} = response;
            console.log(response)
            dispatch(fetchSendInvitedSuccess(data));
            $('.flex .nb-spinner').hide();
            setTimeout(() => {
              Snackbar.show({
                  pos: 'bottom-center',
                  text: 'Convite enviado',
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
                  text: 'Não foi possível enviar o convite',
                  backgroundColor: '#da1e1e',
                  showAction: false,
                  duration: 5000
              });
            }, 1000);

            dispatch(fetchSendInvitedFailure(error))
          });
      }
    }
}