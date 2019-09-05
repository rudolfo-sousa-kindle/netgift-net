import axios from "axios";
import Snackbar from 'node-snackbar';
const URL   = "http://51.15.99.120:4700";

export const FETCH_DELETE_BANK_BEGIN   = 'FETCH_DELETE_BANK_BEGIN';
export const FETCH_DELETE_BANK_SUCCESS = 'FETCH_DELETE_BANK_SUCCESS';
export const FETCH_DELETE_BANK_FAILURE = 'FETCH_DELETE_BANK_FAILURE';

export const fetchDeleteBankUserBegin = () => ({
    type: FETCH_DELETE_BANK_BEGIN
});

export const fetchDeleteBankUserSuccess = deleteBankUser => ({
    type: FETCH_DELETE_BANK_SUCCESS,
    payload: { deleteBankUser }
});

export const fetchDeleteBankUserFailure = error => ({
    type: FETCH_DELETE_BANK_FAILURE,
    payload: { error }
});

export function fetchDeleteBankUser(id_event, id_count){
    return dispatch => {
      dispatch(fetchDeleteBankUserBegin());
      return axios.delete(`${URL}/financial/bank/${id_event}/${id_count}`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchDeleteBankUserSuccess(data));
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Conta excluída',
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
                    text: 'Não foi possível excluir a conta',
                    backgroundColor: '#da1e1e',
                    showAction: false,
                    duration: 5000
                });
            }, 1000);

            dispatch(fetchDeleteBankUserFailure(error))
        });
    }
}