import axios from "axios";
import { parse } from "path";
import Snackbar from 'node-snackbar';

export const FETCH_GIFT_BEGIN   = 'FETCH_GIFT_BEGIN';
export const FETCH_GIFT_BEGIN_NEXT   = 'FETCH_GIFT_BEGIN_NEXT';
export const FETCH_GIFT_SUCCESS = 'FETCH_GIFT_SUCCESS';
export const FETCH_ONEGIFT_SUCCESS = 'FETCH_ONEGIFT_SUCCESS';
export const FETCH_GIFTCATEGORIES_SUCCESS = 'FETCH_GIFTCATEGORIES_SUCCESS';
export const FETCH_GIFT_FAILURE = 'FETCH_GIFT_FAILURE';
export const SEND_GIFT_SUCCESS = 'SEND_GIFT_SUCCESS';
export const SEND_GIFT_BEGIN = 'SEND_GIFT_BEGIN';

const URL   = "http://51.15.99.120:4700";
const urlWP = "https://www.localkindle.com.br/netgift_api/wp-json/ntgift/api";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const fetchGiftsBegin = () => ({
  type: FETCH_GIFT_BEGIN
});

export const fetchGiftsBeginNextLine = () => ({
  type: FETCH_GIFT_BEGIN_NEXT
});

export const fetchGiftsSuccess = gifts => ({
  type: FETCH_GIFT_SUCCESS,
  payload: { gifts }
});

export const fetchGiftSuccess = gift => ({
  type: FETCH_ONEGIFT_SUCCESS,
  payload: { gift }
});

export const fetchGiftsCategoriesSuccess = gifts => ({
  type: FETCH_GIFTCATEGORIES_SUCCESS,
  payload: { gifts }
});

export const fetchGiftsFailure = error => ({
  type: FETCH_GIFT_FAILURE,
  payload: { error }
});

export const sendGiftBegin = () => ({
  type: SEND_GIFT_BEGIN
})

export const sendGiftSuccess = data => ({
  type: SEND_GIFT_SUCCESS,
  payload: { data }
})

var gifts = [];

export function fetchGifts( search = null, categories = null, count = 1 ) {
  var data_send = {};

  if ( search ) {
    data_send['search'] = search;
  }

  if ( categories ) {
    data_send['category_id'] = categories;
  }

  return dispatch => {
    if(!search && count < 1){
      dispatch(fetchGiftsBegin());
    }else{
      dispatch(fetchGiftsBeginNextLine());
    }

    return axios.post(`${URL}/gift/search/10/` + count, data_send, config)
      .then((response) => {
        var {data} = response;
        var {GIFTS} = data;
        if ( count === 1 ) {
          gifts = [];
        }
        GIFTS.map( (gift) => {
          gifts.push( gift );
        });
        dispatch(fetchGiftsSuccess(gifts));
        return gifts;
        })
      .catch(error => dispatch(fetchGiftsFailure(error)));
  };
}

export function fetchGiftCategories(){
  return dispatch => {
    dispatch(fetchGiftsBegin());
    return axios.get(`${URL}/gift/categories`, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchGiftsCategoriesSuccess(data));
        return data;
        })
      .catch(error => dispatch(fetchGiftsFailure(error)));
  };
}

export function fetchGift(id){
  return dispatch => {
    dispatch(fetchGiftsBegin());
    return axios.get(`${URL}/gift/` + id, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchGiftSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchGiftsFailure(error)));
  }
}

export function sendGift({description, nome_presente, image, category_id, price}, history){
  return async dispatch => {
    dispatch(fetchGiftsBegin());
    var categoria = category_id.split( ',' );
    var priceFloat = parseFloat(price);
    var categoryFloat = parseFloat(category_id);
    axios.post(`${URL}/gift`, { "name" : nome_presente ,"description" : description, "image" : image, "price" : priceFloat, "category_id" : categoryFloat }, config)
      .then((response) => {
        var {data} = response;
        for(var i = 1; i < categoria.length; i++){
          var item = categoria[i];
          axios.post(`${URL}/gift/` + data.id + `/category/` + item)
          .then((res) => {
          })
        }
        dispatch(sendGiftSuccess(data.success));
        Snackbar.show({
          pos: 'bottom-center',
          text: 'Presente adicionado com sucesso',
          backgroundColor: '#da1e1e',
          showAction: false,
          duration: 5000
        });
        history.push("/dashboard/presentes/" + data.id);
        return data;
      })
      .catch(error => dispatch(fetchGiftsFailure(error)));
  }
}

export function editGift({description, nome_presente, image, category_id, price, old_categories}, history, id, type = "edit"){
  return async dispatch => {
    dispatch(sendGiftBegin());
    var priceFloat = parseFloat(price);
    var categoryFloat = parseFloat(category_id);
    if(type === "delete"){
      axios.delete(`${URL}/gift/${id}`, {}, config)
      .then((response) => {
        var {data} = response;
        dispatch(sendGiftSuccess(data));
        document.location.reload(true);
        return data;
      })
      .catch(error => dispatch(fetchGiftsFailure(error)));
    }
    var old_cat = old_categories.split( ',' );
    for(var i = 1; i < old_cat.length; i++){
      var item = old_cat[i];
      axios.delete(`${URL}/gift/` + id + `/category/` + item)
      .then((res) => {
      })
    }
    var categoria = category_id.split( ',' );
    axios.put(`${URL}/gift/${id}`, { "name" : nome_presente ,"description" : description, "image" : image, "price" : priceFloat }, config)
      .then((response) => {
        var {data} = response;
        for(var i = 1; i < categoria.length; i++){
          var item = categoria[i];
          axios.post(`${URL}/gift/` + id + `/category/` + item)
          .then((res) => {
          })
        }
        dispatch(sendGiftSuccess(data));
        Snackbar.show({
          pos: 'bottom-center',
          text: 'Presente editado com sucesso',
          backgroundColor: '#da1e1e',
          showAction: false,
          duration: 5000
        });
        history.push("/dashboard/presentes")
        return data;
      })
      .catch(error => dispatch(fetchGiftsFailure(error)));
  }
}
