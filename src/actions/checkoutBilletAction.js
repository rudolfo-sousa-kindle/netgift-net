import axios from "axios";

export const FETCH_CHECKOUT_BILLET_BEGIN   = 'FETCH_CHECKOUT_BILLET_BEGIN';
export const FETCH_CHECKOUT_BILLET_FAILURE = 'FETCH_CHECKOUT_BILLET_FAILURE';
export const FETCH_CHECKOUT_BILLET_SUCCESS = 'FETCH_CHECKOUT_BILLET_SUCCESS';

const URL   = "http://51.15.99.120:4700";
const config = {
    headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}  

export const fetchCheckoutBilletBegin = () => ({
    type: FETCH_CHECKOUT_BILLET_BEGIN
});
  
export const fetchCheckoutBilletSuccess = checkoutBillet => ({
    type: FETCH_CHECKOUT_BILLET_SUCCESS,
    payload: { checkoutBillet }
});
  
export const fetchCheckoutBilletFailure = error => ({
    type: FETCH_CHECKOUT_BILLET_FAILURE,
    payload: { error }
});
  
export function fetchCheckoutBillet({id_user, id_event}, obj, history ){
    return dispatch => {
        dispatch(fetchCheckoutBilletBegin());
        return axios.post(`${URL}/checkout/${id_event}/${id_user}/boleto`, obj, config )
        .then((response) => {
            var {data} = response;
            dispatch(fetchCheckoutBilletSuccess(data));
            history.push("/festa/"+ id_event +"/confirmacao");
            return data;
        })
        .catch(error => dispatch(fetchCheckoutBilletFailure(error)));
    }
}