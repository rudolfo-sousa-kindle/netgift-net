import axios from "axios";
import $ from "jquery";
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";

export const FETCH_ADD_USER_BEGIN   = 'FETCH_ADD_USER_BEGIN';
export const FETCH_ADD_USER_SUCCESS = 'FETCH_ADD_USER_SUCCESS';
export const FETCH_ADD_USER_FAILURE = 'FETCH_ADD_USER_FAILURE';

export const FETCH_PICTURE_USER_BEGIN   = 'FETCH_PICTURE_USER_BEGIN';
export const FETCH_PICTURE_USER_SUCCESS = 'FETCH_PICTURE_USER_SUCCESS';
export const FETCH_PICTURE_USER_FAILURE = 'FETCH_PICTURE_USER_FAILURE';

export const fetchAddUserBegin = () => ({
    type: FETCH_ADD_USER_BEGIN
});

export const fetchAddUserSuccess = addUser => ({
    type: FETCH_ADD_USER_SUCCESS,
    payload: { addUser }
});

export const fetchAddUserFailure = error => ({
    type: FETCH_ADD_USER_FAILURE,
    payload: { error }
});

export const fetchPictureUserBegin = () => ({
  type: FETCH_PICTURE_USER_BEGIN
});

export const fetchPictureUserSuccess = pictureUser => ({
  type: FETCH_PICTURE_USER_SUCCESS,
  payload: { pictureUser }
});

export const fetchPictureUserFailure = error => ({
  type: FETCH_PICTURE_USER_FAILURE,
  payload: { error }
});

export function fetchAddUser(id_event, id_user, obj){
    return dispatch => {
      dispatch(fetchAddUserBegin());
      return axios.post(`${URL}/painel/${id_event}/users`, obj)
        .then((response) => {
          var {data} = response;
          dispatch(fetchAddUserSuccess(data));
          $('.nb-spinner').hide();
          setTimeout(() => {
            $('.modal-white').removeClass('active');
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Usuário adicionado com sucesso',
                backgroundColor: '#8332f5',
                showAction: false,
                duration: 5000
            });
          }, 1000);
          
          // return axios.put(`${URL}/users/${id_user}/picture`)
          // .then((response) => {
          //   var {data} = response;
          //   dispatch(fetchPictureUserSuccess(data));
          //   return data;
          // })
          // .catch(error => dispatch(fetchPictureUserFailure(error)));
        })
        .catch(error => {
          $('.nb-spinner').hide();
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Não foi possível adicionar o usuário',
                backgroundColor: '#da1e1e',
                showAction: false,
                duration: 5000
            });
          }, 1000);

          dispatch(fetchAddUserFailure(error))
        });
    }
}