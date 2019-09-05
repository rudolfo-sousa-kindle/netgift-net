import axios from "axios";
import { parse } from "path";

export const FETCH_VIEW_COUNT_BEGIN   = 'FETCH_VIEW_COUNT_BEGIN';
export const FETCH_VIEW_COUNT_SUCCESS   = 'FETCH_VIEW_COUNT_SUCCESS';
export const FETCH_VIEW_COUNT_FAILURE = 'FETCH_VIEW_COUNT_FAILURE';

const URL   = "http://51.15.99.120:4700";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const fetchViewCountBegin = () => ({
  type: FETCH_VIEW_COUNT_BEGIN
});

export const fetchViewCountSuccess = view=> ({
  type: FETCH_VIEW_COUNT_SUCCESS,
  payload: {view}
});

export const fetchViewCountFailure = error => ({
  type: FETCH_VIEW_COUNT_FAILURE,
  payload: { error }
});

export function fetchViewCount() {
    return dispatch => {

      dispatch(fetchViewCountBegin());

      return axios.get(`${URL}/count/visits`, config)
        .then((response) => {
          var totalAtual = 0;
          var totalPassado = 0;
          var porcentagem = 0;

          let {data} = response;
          let {total} = data;
          dispatch(fetchViewCountSuccess(total))
          return total;
        }).catch(error => dispatch(fetchViewCountFailure(error)));
    };
}
