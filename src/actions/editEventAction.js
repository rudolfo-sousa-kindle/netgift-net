import axios from "axios";
import $ from 'jquery';
import Snackbar from 'node-snackbar';

const URL   = "http://51.15.99.120:4700";

export const FETCH_EDIT_EVENT_BEGIN   = 'FETCH_EDIT_EVENT_BEGIN';
export const FETCH_EDIT_EVENT_SUCCESS = 'FETCH_EDIT_EVENT_SUCCESS';
export const FETCH_EDIT_EVENT_FAILURE = 'FETCH_EDIT_EVENT_FAILURE';


export const fetchEditEventBegin = () => ({
    type: FETCH_EDIT_EVENT_BEGIN
});

export const fetchEditEventSuccess = editEvent => ({
    type: FETCH_EDIT_EVENT_SUCCESS,
    payload: { editEvent }
});

export const fetchEditEventFailure = error => ({
    type: FETCH_EDIT_EVENT_FAILURE,
    payload: { error }
});

export function fetchEditEvent(id_event, obj){
    return dispatch => {
      dispatch(fetchEditEventBegin());
      return axios.put(`${URL}/event/${id_event}`, obj)
      .then((response) => {
          var {data} = response;
          console.log(response);
          dispatch(fetchEditEventSuccess(data));
          $('.nb-spinner').hide();
            setTimeout(() => {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Informações alteradas com sucesso',
                    backgroundColor: '#8332f5',
                    showAction: false,
                    duration: 5000
                });
            }, 1000)
            return data;
        })
        .catch(error => {
            $('.nb-spinner').hide();
            setTimeout(() => {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Não foi possível alterar as informações. Tente novamente mais tarde',
                    backgroundColor: '#da1e1e',
                    showAction: false,
                    duration: 5000
                });
            }, 1000);

            dispatch(fetchEditEventFailure(error))
        });
    }
}