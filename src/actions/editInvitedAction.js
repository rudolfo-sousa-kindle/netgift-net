import axios from "axios";
import $ from "jquery";
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";

export const FETCH_EDIT_INVITED_BEGIN   = 'FETCH_EDIT_INVITED_BEGIN';
export const FETCH_EDIT_INVITED_SUCCESS = 'FETCH_EDIT_INVITED_SUCCESS';
export const FETCH_EDIT_INVITED_FAILURE = 'FETCH_EDIT_INVITED_FAILURE';


export const fetchEditInvitedBegin = () => ({
    type: FETCH_EDIT_INVITED_BEGIN
});

export const fetchEditInvitedSuccess = editInvited => ({
    type: FETCH_EDIT_INVITED_SUCCESS,
    payload: { editInvited }
});

export const fetchEditInvitedFailure = error => ({
    type: FETCH_EDIT_INVITED_FAILURE,
    payload: { error }
});

export function fetchEditInvited(id_event, id_user, obj){
    return dispatch => {
      dispatch(fetchEditInvitedBegin());
      return axios.put(`${URL}/invite/${id_event}/user/${id_user}/send`, obj)
        .then((response) => {
          var {data} = response;
          dispatch(fetchEditInvitedSuccess(data));
          $('.nb-spinner').hide();
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Dados do usuário alterados com sucesso',
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
                    text: 'Não foi possível alterar os dados de usuário. Tente novamente mais tarde',
                    backgroundColor: '#da1e1e',
                    showAction: false,
                    duration: 5000
                });
            }, 1000);
            dispatch(fetchEditInvitedFailure(error))
        });
    }
}