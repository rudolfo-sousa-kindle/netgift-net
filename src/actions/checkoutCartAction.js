import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_CHECKOUT_CART_BEGIN   = 'FETCH_CHECKOUT_CART_BEGIN';
export const FETCH_CHECKOUT_CART_FAILURE = 'FETCH_CHECKOUT_CART_FAILURE';
export const FETCH_CHECKOUT_CART_SUCCESS = 'FETCH_CHECKOUT_CART_SUCCESS';

export const fetchCheckoutCartBegin = () => ({
    type: FETCH_CHECKOUT_CART_BEGIN
});
  
export const fetchCheckoutCartSuccess = checkoutCart => ({
    type: FETCH_CHECKOUT_CART_SUCCESS,
    payload: { checkoutCart }
});
  
export const fetchCheckoutCartFailure = error => ({
    type: FETCH_CHECKOUT_CART_FAILURE,
    payload: { error }
});
  
export function fetchCheckoutCart({id_user, id_event}, obj, history ){
    return dispatch => {
        dispatch(fetchCheckoutCartBegin());
        return axios.post(`${URL}/checkout/${id_event}/${id_user}/credito`, obj )
        .then((response) => {
            var {data} = response;
            dispatch(fetchCheckoutCartSuccess(data));
            history.push("/festa/"+ id_event +"/confirmacao");
            return data;
        })
        .catch(error => dispatch(fetchCheckoutCartFailure(error)));
    }
}