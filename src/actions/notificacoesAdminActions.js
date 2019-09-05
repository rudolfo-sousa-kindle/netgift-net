import axios from "axios";
const URL   = "http://51.15.99.120:4700";
const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const FETCH_NOTIFICACAO_BEGIN = 'SET_NOTIFICACAO_BEGIN';
export const FETCH_NOTIFICACAO_SUCCESS = 'SET_NOTIFICACAO_SUCCESS';
export const FETCH_NOTIFICACAO_PER_USER_SUCCESS = 'SET_NOTIFICACAO_PER_USER_SUCCESS';
export const FETCH_NOTIFICACAO_FAILURE = 'SET_NOTIFICACAO_FAILURE';

export const fetchNotificacaoBegin = () => ({
    type: FETCH_NOTIFICACAO_BEGIN
})

export const fetchNotificacaoSuccess = (data) => ({
    type: FETCH_NOTIFICACAO_SUCCESS,
    payload: {data}
})

export const fetchNotificacaoPerUserSuccess = (data) => ({
    type: FETCH_NOTIFICACAO_PER_USER_SUCCESS,
    payload: {data}
})

export const fetchNotificacaoFailure = (error) => ({
    type: FETCH_NOTIFICACAO_FAILURE,
    payload: {error}
})


export function fetchNotificacoesAdmin(){
    return async dispatch => {
        dispatch(fetchNotificacaoBegin());
        await axios.get(`${URL}/painel/notifications/10/1`, config)
        .then((res) => {
            // console.log(res.data)
            var {data} = res;
            dispatch(fetchNotificacaoSuccess(data));
        })
        dispatch(fetchNotificacaoFailure());
    }
}

export function fetchNotificacoesAdminPerUser(id){
    return async dispatch => {
        console.log(id)
        dispatch(fetchNotificacaoBegin());
        await axios.get(`${URL}/painel/` + id + `/notifications`, config)
        .then((res) => {
            var {data} = res;
            dispatch(fetchNotificacaoPerUserSuccess(data));
        })
        .catch((err) => {
            dispatch(fetchNotificacaoFailure(err));
        })
    }
}