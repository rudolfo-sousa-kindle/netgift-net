import axios from "axios";

export const FETCH_GIFTS_CART_BEGIN   = 'FETCH_GIFTS_CART_BEGIN';
export const FETCH_GIFTS_CART_SUCCESS = 'FETCH_GIFTS_CART_SUCCESS';
export const FETCH_GIFTS_CART_FAILURE = 'FETCH_GIFTS_CART_FAILURE';
export const SEND_GIFTS_CART_SUCCESS = 'SEND_GIFTS_CART_SUCCESS';

const URL   = "http://51.15.99.120:4700";

const config = {
  headers: {"Access-Control-Allow-Origin": "*"},
}

export const fetchGiftsCartBegin = () => ({
  type: FETCH_GIFTS_CART_BEGIN
});

export const fetchGiftsCartSuccess = giftsOnCart => ({
  type: FETCH_GIFTS_CART_SUCCESS,
  payload: { giftsOnCart }
});

export const fetchGiftsCartFailure = error => ({
  type: FETCH_GIFTS_CART_FAILURE,
  payload: { error }
});


var itens = [];

export function addGiftCart(values) {
    itens.push(values);
    return (dispatch) => {
        dispatch(fetchGiftsCartSuccess(itens));
        var gift = localStorage.getItem('gifts');
        if(gift) {
            localStorage.clear();
            var jsonAux = JSON.stringify(itens);
            localStorage.setItem("gifts", jsonAux);
        } else {
            var jsonAux = JSON.stringify(itens);
            localStorage.setItem("gifts", jsonAux);
        }
    }
        
}