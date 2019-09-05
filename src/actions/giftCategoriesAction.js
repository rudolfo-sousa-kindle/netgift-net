import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_GIFT_CATEGORIES_BEGIN   = 'FETCH_GIFT_CATEGORIES_BEGIN';
export const FETCH_GIFT_CATEGORIES_SUCCESS = 'FETCH_GIFT_CATEGORIES_SUCCESS';
export const FETCH_GIFT_CATEGORIES_FAILURE = 'FETCH_GIFT_CATEGORIES_FAILURE';


export const fetchGiftCategoriesBegin = () => ({
    type: FETCH_GIFT_CATEGORIES_BEGIN
});

export const fetchGiftCategoriesSuccess = giftCategories => ({
    type: FETCH_GIFT_CATEGORIES_SUCCESS,
    payload: { giftCategories }
});

export const fetchGiftCategoriesFailure = error => ({
    type: FETCH_GIFT_CATEGORIES_FAILURE,
    payload: { error }
});

export function fetchGiftCategories(){
    return dispatch => {
      dispatch(fetchGiftCategoriesBegin());
      return axios.get(`${URL}/gift/categories`)
        .then((response) => {
          var {data} = response;

          dispatch(fetchGiftCategoriesSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchGiftCategoriesFailure(error)));
    }
}