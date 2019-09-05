import axios from "axios";
const URL   = "http://51.15.99.120:4700";

export const FETCH_LIST_GROUPS_BEGIN   = 'FETCH_LIST_GROUPS_BEGIN';
export const FETCH_LIST_GROUPS_SUCCESS = 'FETCH_LIST_GROUPS_SUCCESS';
export const FETCH_LIST_GROUPS_FAILURE = 'FETCH_LIST_GROUPS_FAILURE';


export const fetchListGroupsBegin = () => ({
    type: FETCH_LIST_GROUPS_BEGIN
});

export const fetchListGroupsSuccess = listGroups => ({
    type: FETCH_LIST_GROUPS_SUCCESS,
    payload: { listGroups }
});

export const fetchListGroupsFailure = error => ({
    type: FETCH_LIST_GROUPS_FAILURE,
    payload: { error }
});

export function fetchListGroups(){
    return dispatch => {
      dispatch(fetchListGroupsBegin());
      return axios.get(`${URL}/invite/groups`)
        .then((response) => {
          var {data} = response;
          dispatch(fetchListGroupsSuccess(data));
          return data;
        })
        .catch(error => dispatch(fetchListGroupsFailure(error)));
    }
}