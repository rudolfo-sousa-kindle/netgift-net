import axios from "axios";

export const FETCH_EVENT_BEGIN   = 'FETCH_EVENT_BEGIN';
export const FETCH_EVENTS_BEGIN_NEXT   = 'FETCH_EVENTS_BEGIN_NEXT';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_ONEEVENT_SUCCESS = 'FETCH_ONEEVENT_SUCCESS';
export const FETCH_EVENTCATEGORIES_SUCCESS = 'FETCH_EVENTCATEGORIES_SUCCESS';
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';
export const SEND_EVENT_SUCCESS = 'SEND_EVENT_SUCCESS';
export const FETCH_FINANCIAL_BEGIN   = 'FETCH_FINANCIAL_BEGIN';
export const FETCH_FINANCIAL_SUCCESS = 'FETCH_FINANCIAL_SUCCESS';
export const FETCH_FINANCIAL_FAILURE = 'FETCH_FINANCIAL_FAILURE';

const URL   = "http://51.15.99.120:4700";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const fetchEventsBegin = () => ({
  type: FETCH_EVENT_BEGIN
});

export const fetchEventsBeginNextLine = () => ({
  type: FETCH_EVENTS_BEGIN_NEXT
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENT_SUCCESS,
  payload: { events }
});

export const fetchEventSuccess = event => ({
  type: FETCH_ONEEVENT_SUCCESS,
  payload: { event }
});


export const fetchEventsFailure = error => ({
  type: FETCH_EVENT_FAILURE,
  payload: { error }
});

export const sendEventSuccess = data => ({
  type: SEND_EVENT_SUCCESS,
  payload: { data }
})

var count = 0;
var events = [];

export function fetchEvents(reset_page = false, published = false, suspended = true, notified = true, finished = true ) {
  count = reset_page ? 0 : count;

  return dispatch => {
    if( count < 1){
      dispatch(fetchEventsBegin());
    }else{
      dispatch(fetchEventsBeginNextLine());
    }

    var filters = {
      'published' : published,
      'suspended' : suspended,
      'notified'  : notified,
      'finished'  : finished
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

export const fetchFinancialBegin = () => ({
  type: FETCH_FINANCIAL_BEGIN
});
export const fetchFinancialSuccess = financial => ({
  type: FETCH_FINANCIAL_SUCCESS,
  payload: { financial }
});
export const fetchFinancialFailure = error => ({
  type: FETCH_FINANCIAL_FAILURE,
  payload: { error }
});

export function fetchFinancial(id) {

  return dispatch => {
    return axios.get(`${URL}/financial/${id}/10/1`, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchFinancialSuccess(data));

        return data;
        })
      .catch(error => dispatch(fetchFinancialFailure(error)));
  };
}

// export function fetchGiftCategories(){
//   return dispatch => {
//     dispatch(fetchGiftsBegin());
//     return axios.get(`${URL}/gift/categories`, config)
//       .then((response) => {
//         var {data} = response;
//         dispatch(fetchGiftsCategoriesSuccess(data));
//         return data;
//         })
//       .catch(error => dispatch(fetchGiftsFailure(error)));
//   };
// }

// export function fetchGift(id){
//   return dispatch => {
//     dispatch(fetchGiftsBegin());
//     return axios.get(`${URL}/gift/` + id, config)
//       .then((response) => {
//         var {data} = response;
//         dispatch(fetchGiftSuccess(data));
//         return data;
//       })
//       .catch(error => dispatch(fetchGiftsFailure(error)));
//   }
// }

// export function sendGift({description, nome_presente, image, category_id, price}, history){
//   return async dispatch => {
//     dispatch(fetchGiftsBegin());
//     var categoria = 1;
//     categoria = category_id.split(",");
//     var priceFloat = parseFloat(price);
//     var categoryFloat = parseFloat(category_id);
//     axios.post(`${URL}/gift`, { "name" : nome_presente ,"description" : description, "image" : image, "price" : priceFloat, "category_id" : categoryFloat }, config)
//       .then((response) => {
//         var {data} = response;
//         for(var i = 1; i < categoria.length; i++){
//           var item = categoria[i];
//           axios.post(`${URL}/gift/` + data.id + `/category/` + item)
//           .then((res) => {
//             console.log(res)
//           })
//         }
//         dispatch(sendGiftSuccess(data.success));
//         return data;
//       })
//       .catch(error => dispatch(fetchGiftsFailure(error)));
//   }
// }

// export function editGift({description, nome_presente, image, category_id, price}, history, id){
//   return async dispatch => {
//     dispatch(fetchGiftsBegin());
//     var priceFloat = parseFloat(price);
//     var categoryFloat = parseFloat(category_id);
//     axios.put(`${URL}/gift/${id}`, { "name" : nome_presente ,"description" : description, "image" : image, "price" : priceFloat }, config)
//       .then((response) => {
//         var {data} = response;
//         return data;
//       })
//       .catch(error => dispatch(fetchGiftsFailure(error)));
//   }
// }
