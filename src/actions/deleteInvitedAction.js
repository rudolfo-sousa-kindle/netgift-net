import axios from "axios";
import $ from "jquery";
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";

export const FETCH_DELETE_INVITED_BEGIN   = 'FETCH_DELETE_INVITED_BEGIN';
export const FETCH_DELETE_INVITED_SUCCESS = 'FETCH_DELETE_INVITED_SUCCESS';
export const FETCH_DELETE_INVITED_FAILURE = 'FETCH_DELETE_INVITED_FAILURE';


export const fetchDeleteInvitedBegin = () => ({
    type: FETCH_DELETE_INVITED_BEGIN
});

export const fetchDeleteInvitedSuccess = deleteInvited => ({
    type: FETCH_DELETE_INVITED_SUCCESS,
    payload: { deleteInvited }
});

export const fetchDeleteInvitedFailure = error => ({
    type: FETCH_DELETE_INVITED_FAILURE,
    payload: { error }
});

export function fetchDeleteInvited({event_id, invited_id}){
    return dispatch => {
      dispatch(fetchDeleteInvitedBegin());
      return axios.delete(`${URL}/invite/${event_id}/invited/${invited_id}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchDeleteInvitedSuccess(data));
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'convidado excluído com sucesso',
                backgroundColor: '#8332f5',
                showAction: false,
                duration: 5000
            });    
          }, 1000);
          return data;
        })
        .catch(error => {
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Não foi possível excluir o convidado',
                backgroundColor: '#da1e1e',
                showAction: false,
                duration: 5000
            });
          }, 1000);

          dispatch(fetchDeleteInvitedFailure(error))
        });
    }
}