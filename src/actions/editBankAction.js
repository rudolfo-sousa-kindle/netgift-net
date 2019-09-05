import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_EDIT_BANK_BEGIN   = 'FETCH_EDIT_BANK_BEGIN';
export const FETCH_EDIT_BANK_SUCCESS = 'FETCH_EDIT_BANK_SUCCESS';
export const FETCH_EDIT_BANK_FAILURE = 'FETCH_EDIT_BANK_FAILURE';

export const fetchEditBankUserBegin = () => ({
    type: FETCH_EDIT_BANK_BEGIN
});

export const fetchEditBankUserSuccess = editBankUser => ({
    type: FETCH_EDIT_BANK_SUCCESS,
    payload: { editBankUser }
});

export const fetchEditBankUserFailure = error => ({
    type: FETCH_EDIT_BANK_FAILURE,
    payload: { error }
});

export function fetchEditBankUser(id_event, id_count, obj){
    return dispatch => {
      dispatch(fetchEditBankUserBegin());
      return axios.put(`${URL}/financial/bank/${id_event}/${id_count}`, obj)
        .then((response) => {
          var {data} = response;
          console.log(response)
          dispatch(fetchEditBankUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchEditBankUserFailure(error)));
    }
}