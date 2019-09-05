import axios from "axios";
import Snackbar from 'node-snackbar';
const URL   = "http://51.15.99.120:4700";

export const FETCH_ADD_GIFT_BEGIN   = 'FETCH_ADD_GIFT_BEGIN';
export const FETCH_ADD_GIFT_SUCCESS = 'FETCH_ADD_GIFT_SUCCESS';
export const FETCH_ADD_GIFT_FAILURE = 'FETCH_ADD_GIFT_FAILURE';
export const FETCH_REMOVE_GIFT_BEGIN   = 'FETCH_REMOVE_GIFT_BEGIN';
export const FETCH_REMOVE_GIFT_SUCCESS = 'FETCH_REMOVE_GIFT_SUCCESS';
export const FETCH_REMOVE_GIFT_FAILURE = 'FETCH_REMOVE_GIFT_FAILURE';

export const fetchAddGiftBegin = () => ({
    type: FETCH_ADD_GIFT_BEGIN
});

export const fetchAddGiftSuccess = addGift => ({
    type: FETCH_ADD_GIFT_SUCCESS,
    payload: { addGift }
});

export const fetchAddGiftFailure = error => ({
    type: FETCH_ADD_GIFT_FAILURE,
    payload: { error }
});

export function fetchAddGift(obj){
    return dispatch => {
      dispatch(fetchAddGiftBegin());
      return axios.post(`${URL}/gift/event`, obj)
        .then((response) => {
          var {data} = response;
          dispatch(fetchAddGiftSuccess(data));
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Presente adicionado com sucesso.',
                backgroundColor: '#8332f5',
                showAction: false,
                duration: 5000
            });    
          }, 1000);
          return data;
        })
        .catch(error => dispatch(fetchAddGiftFailure(error)));
    }
}

export const fetchRemoveGiftBegin = () => ({
    type: FETCH_REMOVE_GIFT_BEGIN
});

export const fetchRemoveGiftSuccess = RemoveGift => ({
    type: FETCH_REMOVE_GIFT_SUCCESS,
    payload: { RemoveGift }
});

export const fetchRemoveGiftFailure = error => ({
    type: FETCH_REMOVE_GIFT_FAILURE,
    payload: { error }
});

export function fetchRemoveGift(obj){
    return dispatch => {
      dispatch(fetchRemoveGiftBegin());
      return axios.delete(`${URL}/gift/event`, {data: obj})
        .then((response) => {
          var {data} = response;
          dispatch(fetchRemoveGiftSuccess(data));
          setTimeout(() => {
            Snackbar.show({
                pos: 'bottom-center',
                text: 'Presente removido com sucesso.',
                backgroundColor: '#8332f5', //#da1e1e
                showAction: false,
                duration: 5000
            });    
          }, 1000);
          return data;
        })
        .catch(error => dispatch(fetchRemoveGiftFailure(error)));
    }
}