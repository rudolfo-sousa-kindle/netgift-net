import axios from "axios";
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";

export const FETCH_DELETE_USERS_BEGIN   = 'FETCH_DELETE_USERS_BEGIN';
export const FETCH_DELETE_USERS_SUCCESS = 'FETCH_DELETE_USERS_SUCCESS';
export const FETCH_DELETE_USERS_FAILURE = 'FETCH_DELETE_USERS_FAILURE';


export const fetchDeleteUsersBegin = () => ({
    type: FETCH_DELETE_USERS_BEGIN
});

export const fetchDeleteUsersSuccess = deleteUsers => ({
    type: FETCH_DELETE_USERS_SUCCESS,
    payload: { deleteUsers }
});

export const fetchDeleteUsersFailure = error => ({
    type: FETCH_DELETE_USERS_FAILURE,
    payload: { error }
});

export function fetchDeleteUsers(id_event, id_user){
    return dispatch => {
      dispatch(fetchDeleteUsersBegin());
      return axios.delete(`${URL}/painel/${id_event}/users/${id_user}`)
        .then((response) => {
          var {data} = response;
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Usuário excluído com sucesso',
                backgroundColor: '#8332f5',
                showAction: false,
                duration: 5000
            });
          }, 1000);
          dispatch(fetchDeleteUsersSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchDeleteUsersFailure(error)));
    }
}