import axios from "axios";

const URL   = "http://51.15.99.120:4700";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}



export const SET_NOTIFICACAO = 'SET_NOTIFICACAO';
export const SET_NOTIFICACAO_BEGIN = 'SET_NOTIFICACAO_BEGIN';
export const SET_NOTIFICACAO_SUCCESS = 'SET_NOTIFICACAO_SUCCESS';

export const setNotificacao = id => ({
    type: SET_NOTIFICACAO,
    payload: { id }
  });

export const setNotificacaoBegin = () => ({
    type: SET_NOTIFICACAO_BEGIN
})

export const setNotificacaoSuccess = () => ({
    type: SET_NOTIFICACAO_SUCCESS
})

export function setIdNotified(id){
    return dispatch => {
        dispatch(setNotificacao(id));
    } 
}

export function notificarUsuario({id: id, msg: msg, suspense: suspense}){
    return async dispatch => {
        dispatch(setNotificacaoBegin());
        if(suspense){
            await axios.post(`${URL}/events/suspended/` + id, {"msg": msg}, config)
            .then((res) => {
                axios.post(`${URL}/events/notify/` + id, {"msg": msg}, config)
                .then((res) => {
                    dispatch(setNotificacaoSuccess())
                })
            })
        }else{
            await axios.post(`${URL}/events/notify/` + id, {"msg": msg}, config)
            .then((res) => {
                dispatch(setNotificacaoSuccess())
            })
        }
    }
}