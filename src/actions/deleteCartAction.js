import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_DELETE_CART_BEGIN   = 'FETCH_DELETE_CART_BEGIN';
export const FETCH_DELETE_CART_FAILURE = 'FETCH_DELETE_CART_FAILURE';
export const FETCH_DELETE_CART_SUCCESS = 'FETCH_DELETE_CART_SUCCESS';

export const fetchDeleteCartBegin = () => ({
    type: FETCH_DELETE_CART_BEGIN
});
  
export const fetchDeleteCartSuccess = checkoutCart => ({
    type: FETCH_DELETE_CART_SUCCESS,
    payload: { checkoutCart }
});
  
export const fetchDeleteCartFailure = error => ({
    type: FETCH_DELETE_CART_FAILURE,
    payload: { error }
});
  
export function fetchDeleteCart({id_user, id_event, cart_gift_id}){
    return dispatch => {
        dispatch(fetchDeleteCartBegin());
        return axios.delete(`${URL}/cart/${id_event}/${id_user}/${cart_gift_id}` )
        .then((response) => {
            var {data} = response;
            dispatch(fetchDeleteCartSuccess(data));
            return data;
        })
        .catch(error => dispatch(fetchDeleteCartFailure(error)));
    }
}

export function fetchDeleteGifts({id_user, id_event, cart_gift_id}){
    var current_gift_id = 0;
    return dispatch => {
        dispatch(fetchDeleteCartBegin());
        return axios.get(`${URL}/cart/${id_event}/${id_user}`)
        .then((response) => {
            var {data} = response;
            data.cart.map((item) => {
                if ( item.id === cart_gift_id ) {
                    current_gift_id = item.cart_gift_id
                }
            })

            return axios.delete(`${URL}/cart/${id_event}/${id_user}/${current_gift_id}` )
            .then((response) => {
                var {data} = response;
                dispatch(fetchDeleteCartSuccess(data));
                return data;
            })
            .catch(error => dispatch(fetchDeleteCartFailure(error)));
        })        
    }
}