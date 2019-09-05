import axios from "axios";
import Snackbar from 'node-snackbar';
import $ from "jquery";

const URL   = "http://51.15.99.120:4700";

export const FETCH_PROFILE_USER_BEGIN   = 'FETCH_PROFILE_USER_BEGIN';
export const FETCH_PROFILE_USER_SUCCESS = 'FETCH_PROFILE_USER_SUCCESS';
export const FETCH_PROFILE_USER_FAILURE = 'FETCH_PROFILE_USER_FAILURE';


export const fetchEditProfileUserBegin = () => ({
    type: FETCH_PROFILE_USER_BEGIN
});

export const fetchEditProfileUserSuccess = editProfileUser => ({
    type: FETCH_PROFILE_USER_SUCCESS,
    payload: { editProfileUser }
});

export const fetchEditProfileUserFailure = error => ({
    type: FETCH_PROFILE_USER_FAILURE,
    payload: { error }
});

export function fetchEditProfileUser(id_user, obj){
    return dispatch => {
      dispatch(fetchEditProfileUserBegin());
      
      return axios.put(`${URL}/users/${id_user}`, obj)
        .then((response) => {
          var {data} = response;
          dispatch(fetchEditProfileUserSuccess(data));
          $('.flex .nb-spinner').hide();
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Dados salvos',
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
                    text: 'Não foi possível salvar as informações',
                    backgroundColor: '#da1e1e',
                    showAction: false,
                    duration: 5000
                });
            }, 1000);

            dispatch(fetchEditProfileUserFailure(error))
        });
    }
}