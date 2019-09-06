import axios from "axios";
import $ from "jquery";
import Snackbar from 'node-snackbar';

export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";

export const RETRIEVEPASS      = "retrievepass_user";
export const UNRETRIEVEPASS    = "unretrievepass_user";
export const RETRIVEPASS_ERROR = "retrivepass_error";

export const REGISTER        = "register_user";
export const UNREGISTER      = "unregister_user";
export const REGISTER_ERROR  = "register_error";

export const MAKERETRIEVEPASS      = "makeretrievepass_user";
export const MAKEUNRETRIEVEPASS    = "makeunretrievepass_user";
export const MAKERETRIVEPASS_ERROR = "makeretrivepass_error";

export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_CONTACT_BEGIN   = 'FETCH_CONTACT_BEGIN';
export const FETCH_CONTACT_SUCCESS = 'FETCH_CONTACT_SUCCESS';
export const FETCH_CONTACT_FAILURE = 'FETCH_CONTACT_FAILURE';

export const FETCH_EVENTS_BEGIN   = 'FETCH_EVENTS_BEGIN';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';

export const FETCH_HOME_BEGIN   = 'FETCH_HOME_BEGIN';
export const FETCH_HOME_FAILURE = 'FETCH_HOME_FAILURE';
export const FETCH_HOME_SUCCESS = 'FETCH_HOME_SUCCESS';

export const FETCH_PAGE_BEGIN   = 'FETCH_PAGE_BEGIN';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';

export const FETCH_GIFTS_BEGIN   = 'FETCH_GIFTS_BEGIN';
export const FETCH_GIFTS_FAILURE = 'FETCH_GIFTS_FAILURE';
export const FETCH_GIFTS_SUCCESS = 'FETCH_GIFTS_SUCCESS';

export const FETCH_ADD_CART_BEGIN   = 'FETCH_ADD_CART_BEGIN';
export const FETCH_ADD_CART_FAILURE = 'FETCH_ADD_CART_FAILURE';
export const FETCH_ADD_CART_SUCCESS = 'FETCH_ADD_CART_SUCCESS';

export const FETCH_GET_CART_BEGIN   = 'FETCH_GET_CART_BEGIN';
export const FETCH_GET_CART_FAILURE = 'FETCH_GET_CART_FAILURE';
export const FETCH_GET_CART_SUCCESS = 'FETCH_GET_CART_SUCCESS';

export const FETCH_GET_EVENT_BEGIN   = 'FETCH_GET_EVENT_BEGIN';
export const FETCH_EVENTS_BEGIN_NEXT = 'FETCH_EVENTS_BEGIN_NEXT';
export const FETCH_GET_EVENT_FAILURE = 'FETCH_GET_EVENT_FAILURE';
export const FETCH_GET_EVENT_SUCCESS = 'FETCH_GET_EVENT_SUCCESS';

export const FETCH_FILTER_BY_CATEGORY_BEGIN   = 'FETCH_FILTER_BY_CATEGORY_BEGIN';
export const FETCH_FILTER_BY_CATEGORY_FAILURE = 'FETCH_FILTER_BY_CATEGORY_FAILURE';
export const FETCH_FILTER_BY_CATEGORY_SUCCESS = 'FETCH_FILTER_BY_CATEGORY_SUCCESS';


const URL   = "http://51.15.99.120:4700";
const urlWP = "https://www.localkindle.com.br/netgift_api/wp-json/ntgift/api";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export function signInAction({ email, password }, history) {
  return async dispatch => {
    try {
      const res = await axios.post(`${URL}/login`, { "email" : email, "password" : password, "facebook_id" : "" }, config);
        if ( res.status === 200 ) {
          dispatch({ type: AUTHENTICATED });
          var jsonAux = JSON.stringify(res.data.user[0]);
          var jsonAuxBanks = JSON.stringify(res.data.banks);
          var jsonAuxEvents = JSON.stringify(res.data.events);
          localStorage.setItem("user", jsonAux);
          localStorage.setItem("banks", jsonAuxBanks);
          localStorage.setItem("events", jsonAuxEvents);
          history.push("/dashboard/home");
        } else {
          dispatch({
            type: AUTHENTICATION_ERROR,
            payload: "Invalid email or password"
          });
          Snackbar.show({
            pos: 'bottom-center',
            text: 'E-mail ou senha inválidos',
            backgroundColor: '#da1e1e',
            showAction: false,
            duration: 5000
          });

          return false;
        }
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid email or password"
      });
    }
  };
}

export function retrievePassAction({ email }, history) {
  return async dispatch => {
    try {
      const res = await axios.post(`${URL}/users/password`, { "email" : email }, config);
      dispatch({ type: RETRIEVEPASS });
      var jsonAux = JSON.stringify(res.data);
    } catch (error) {
      dispatch({
        type: RETRIVEPASS_ERROR,
        payload: "Invalid email"
      });
    }
  };
}

export function makeRetrievePassAction({ user_id, password }, history) {
  return async dispatch => {
    try {
      const res = await axios.put(`${URL}/users/password/` + user_id, { "password" : password }, config);
      dispatch({ type: RETRIEVEPASS });
      var jsonAux = JSON.stringify(res.data);
    } catch (error) {
      dispatch({
        type: RETRIVEPASS_ERROR,
        payload: "Invalid email"
      });
    }
  };
}

export function signInActionRegister({ email, first_name, last_name, password, cpf }, history) {
  return async dispatch => {
    try {
      const res = await axios.post(`${URL}/users`, { 
        "email" : email,
        "first_name" : first_name, 
        "last_name" : last_name, 
        "facebook_id" : "", 
        "telephone_ddd": "21", 
        "telephone": "999999999",
        "cpf": cpf, 
        "admin": 0,
        "password" : password }, config);

      dispatch({ type: REGISTER });
      var jsonAux = JSON.stringify(res.data.user[0]);
      var jsonAuxBanks = JSON.stringify(res.data.banks);
      var jsonAuxEvents = JSON.stringify(res.data.events);
      localStorage.setItem("user", jsonAux);
      localStorage.setItem("banks", jsonAuxBanks);
      localStorage.setItem("events", jsonAuxEvents);
      history.push("/cadastro-concluido");
    } catch (error) {
      var message = '';

      if ( 409 === error.response.status ) {
        message = "E-mail já cadastrado."
      } else {
        message = "Ocorreu um erro no cadastro, tente novamente mais tarde."
      }
      dispatch({
        type: REGISTER_ERROR,
        payload: message
      });


      setTimeout(() => {
        Snackbar.show({
            pos: 'bottom-center',
            text: message,
            backgroundColor: '#da1e1e',
            showAction: false,
            duration: 5000
        });    
      }, 1000);

      return error.response;
    }
  };
}

export const POSTEDTHEME = "postedtheme";
export const UNPOSTEDTHEME = "unpostedtheme";
export const POSTEDTHEMEERROR = "postederror";

export function addThemes(values, history){

  return async dispatch => {
  }

}

export function signOutAction(history) {
  localStorage.clear();
  console.log("s")
  window.location = "/login";
  return {
    type: UNAUTHENTICATED
  };
}

export const fetchEventsBegin = () => ({
    type: FETCH_EVENTS_BEGIN
});

export const fetchEventsBeginNextLine = () => ({
  type: FETCH_EVENTS_BEGIN_NEXT
});

export const fetchEventsSuccess = events => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: { events }
});

export const fetchEventsFailure = error => ({
    type: FETCH_EVENTS_FAILURE,
    payload: { error }
});

var count = 0;
var events = [];

export function fetchEvents( reset_page = false, quem = null, data = null, tipo = null, estado = null, cidade = null ) {
  count = reset_page ? 0 : count;

  return dispatch => {
    if( count < 1){
      dispatch(fetchEventsBegin());
    }else{
      dispatch(fetchEventsBeginNextLine());
    }

    var filters = {};

    if ( quem ) {
      filters.owner = quem;
    }

    if ( data ) {
      filters.date = data;
    }

    if ( tipo ) {
      filters.category_id = parseInt( tipo );
    }

    if ( estado ) {
      filters.state = estado;
    }

    if ( cidade ) {
      filters.city = cidade;
    }

    count++;
    return axios.post(`${URL}/events/search/10/` + count, filters, config)
      .then((response) => {
        var {data} = response;
        // console.log(data)
        events.push(data);
        // if(search){
          dispatch(fetchEventsSuccess(data));
        // }else{
        //   dispatch(fetchEventsSuccess(events));
        // }
        return events;
        })
      .catch(error => dispatch(fetchEventsFailure(error)));
  };
}

export const fetchGiftsBegin = () => ({
    type: FETCH_GIFTS_BEGIN
});

export const fetchGiftsSuccess = gifts => ({
    type: FETCH_GIFTS_SUCCESS,
    payload: { gifts }
});

export const fetchGiftsFailure = error => ({
    type: FETCH_GIFTS_FAILURE,
    payload: { error }
});

export function fetchGifts(id, search){
  var data_send = {};
  data_send['busca'] = search;
  
  return dispatch => {
    dispatch(fetchGiftsBegin());
    return axios.get(`${URL}/gift/event/${id}`, search)
      .then((response) => {
        var {data} = response;
        dispatch(fetchGiftsSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchGiftsFailure(error)));
  }
}



const fetchPageBegin = type_fetch => ({
  type: type_fetch
});

const fetchPageSuccess = (type_fetch, page) => ({
  type: type_fetch,
  payload: { page }
});

const fetchPageFailure = (type_fetch, type_playload) => ({
  type: type_fetch,
  payload: { type_playload }
});

export function fetchPage(post_id, post_types){
  return dispatch => {
    dispatch(fetchPageBegin(FETCH_PAGE_BEGIN));
    return axios.get(`${urlWP}/get_page_content?post_id=${post_id}&post_types_listed=${post_types}`)
      .then((response) => {
        var {data} = response;
        dispatch(fetchPageSuccess(FETCH_PAGE_SUCCESS, data));
        return data;
      })
      .catch(error => dispatch(fetchPageFailure(FETCH_PAGE_FAILURE, error)));
  }
}


export const fetchHomeBegin = () => ({
  type: FETCH_HOME_BEGIN
});

export const fetchHomeSuccess = home => ({
    type: FETCH_HOME_SUCCESS,
    payload: { home }
});

export const fetchHomeFailure = error => ({
    type: FETCH_HOME_FAILURE,
    payload: { error }
});

export function fetchHome(){
  return dispatch => {
    dispatch(fetchHomeBegin());
    return axios.get(`${urlWP}/get_home_content/`)
      .then((response) => {
        var {data} = response;

        dispatch(fetchHomeSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchHomeFailure(error)));
  }
}

export const fetchFilterByCategoryBegin = () => ({
  type: FETCH_FILTER_BY_CATEGORY_BEGIN
});

export const fetchFilterByCategorySuccess = category => ({
  type: FETCH_FILTER_BY_CATEGORY_SUCCESS,
  payload: { category }
});

export const fetchFilterByCategoryFailure = error => ({
  type: FETCH_FILTER_BY_CATEGORY_FAILURE,
  payload: { error }
});

export function fetchFilterByCategory(){
  return dispatch => {
    dispatch(fetchFilterByCategoryBegin());
    return axios.get(`${URL}/gift/categories`)
      .then((response) => {
        var {data} = response;
        dispatch(fetchFilterByCategorySuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchFilterByCategoryFailure(error)));
  }
}

export const fetchAddCartBegin = () => ({
  type: FETCH_ADD_CART_BEGIN
});

export const fetchAddCartSuccess = cart => ({
  type: FETCH_ADD_CART_SUCCESS,
  payload: { cart }
});

export const fetchAddCartFailure = error => ({
  type: FETCH_ADD_CART_FAILURE,
  payload: { error }
});

export function fetchAddCart({id_user, id_event}, obj){
  return dispatch => {
    dispatch(fetchAddCartBegin());
    return axios.post(`${URL}/cart/${id_event}/${id_user}`, obj)
      .then((response) => {
        var {data} = response;
        dispatch(fetchAddCartSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchAddCartFailure(error)));
  }
}


export const fetchGetCartBegin = () => ({
  type: FETCH_GET_CART_BEGIN
});

export const fetchGetCartSuccess = getCart => ({
  type: FETCH_GET_CART_SUCCESS,
  payload: { getCart }
});

export const fetchGetCartFailure = error => ({
  type: FETCH_GET_CART_FAILURE,
  payload: { error }
});

export function fetchGetCart({id_user, id_event}){
  return dispatch => {
    dispatch(fetchGetCartBegin());
    return axios.get(`${URL}/cart/${id_event}/${id_user}`)
      .then((response) => {
        var {data} = response;
        dispatch(fetchGetCartSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchGetCartFailure(error)));
  }
}

export const fetchGetEventBegin = () => ({
  type: FETCH_GET_EVENT_BEGIN
});

export const fetchGetEventSuccess = event => ({
  type: FETCH_GET_EVENT_SUCCESS,
  payload: { event }
});

export const fetchGetEventFailure = error => ({
  type: FETCH_GET_EVENT_FAILURE,
  payload: { error }
});

export function fetchGetEvent(id){
  return dispatch => {
    dispatch(fetchGetEventBegin());
    return axios.get(`${URL}/event/${id}`)
      .then((response) => {
        var {data} = response;
        return axios.get(`${URL}/theme/${data.EVENTO.theme_id}/config`)
        .then((response) => {
          data.template = response.data;
          dispatch(fetchGetEventSuccess(data));
          return data;
        })
        
      })
      .catch(error => dispatch(fetchGetEventFailure(error)));
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
