import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_PICTURE_USER_BEGIN   = 'FETCH_PICTURE_USER_BEGIN';
export const FETCH_PICTURE_USER_SUCCESS = 'FETCH_PICTURE_USER_SUCCESS';
export const FETCH_PICTURE_USER_FAILURE = 'FETCH_PICTURE_USER_FAILURE';


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

export function fetchPictureUser(id_user){
    return dispatch => {
      dispatch(fetchPictureUserBegin());
      return axios.put(`${URL}/users/${id_user}/picture`)
        .then((response) => {
          var {data} = response;
          console.log(response)
          dispatch(fetchPictureUserSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchPictureUserFailure(error)));
    }
}