import axios from "axios";
import $ from "jquery";

const URL   = "http://51.15.99.120:4700";
const config = {
    headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
  }

export const FETCH_EXTRATO_BEGIN   = 'FETCH_EXTRATO_BEGIN';
export const FETCH_EXTRATO_SUCCESS = 'FETCH_EXTRATO_SUCCESS';
export const FETCH_EXTRATO_ABSTRACT_OLD_SUCCESS = 'FETCH_EXTRATO_ABSTRACT_OLD_SUCCESS';
export const FETCH_EXTRATO_FAILURE = 'FETCH_EXTRATO_FAILURE';
export const FETCH_EXTRATO_ABSTRACT_SUCCESS = 'FETCH_EXTRATO_ABSTRACT_SUCCESS';

export const fetchExtratoBegin = () => ({
    type: FETCH_EXTRATO_BEGIN
  });

  export const fetchExtratoSuccess = extrato => ({
    type: FETCH_EXTRATO_SUCCESS,
    payload: {extrato}
  });

  export const fetchExtratoAbstractSuccess = extrato => ({
    type: FETCH_EXTRATO_ABSTRACT_SUCCESS,
    payload: {extrato}
  })

  export const fetchExtratoAbstractOldSuccess = (extratoOld, porcentagem) => ({
    type: FETCH_EXTRATO_ABSTRACT_OLD_SUCCESS,
    payload: {extratoOld},
    porcentagem: porcentagem
  })

  export const fetchExtratoFailure = error => ({
    type: FETCH_EXTRATO_FAILURE,
    payload: {error}
  });

  var extratos = [];

export function fetchExtrato(name = null, inicio = null, fim = null, tipoPagamento = null, formaPagamento = null, status = null, page = 1, last_days = null){
    return async dispatch => {
        dispatch(fetchExtratoBegin())
        // console.log(name, inicio, fim, tipoPagamento, formaPagamento, status)
        var data = {}

        if(name){
          data["name"] = name
        }
        if(inicio){
          data["date_start"] = inicio
        }
        if(fim){
          data["date_end"] = fim
        }
        if(tipoPagamento){
          data["type"] = tipoPagamento
        }
        if(status){
          data["status"] = parseInt( status )
        }
        if(last_days){
          data["last_days"] = last_days
        }

        return await axios.post(`${URL}/financial/search/10/` + page, data, config)
        .then((res) => {
            var {data} = res;
            data.last_page = false;

            if($.isEmptyObject(data.financial)){
              data.financial = [];
            }

            if ( 10 > data.financial.length ) {
              data.last_page = true;
            }

            if ( page === 1 ) {
              extratos = [];
            }
            data.financial.map( (extrato) => {
              extratos.push( extrato );
            });

            data.financial = extratos
            dispatch(fetchExtratoSuccess(data));
            // console.log(res.data)
        })
    }
}

function get_financial(data, page) {
  data.last_page = false;
  if($.isEmptyObject(data.financial)){
    data.financial = [];
  }

  if ( 10 > data.financial.length ) {
    data.last_page = true;
  }

  if ( page === 1 ) {
    extratos = [];
  }
  data.financial.map( (extrato) => {
    extratos.push( extrato );
  });

  data.financial = extratos
  return data;
}

export function fetchExtratoAbstract(name = null, inicio = null, fim = null, tipoPagamento = null, formaPagamento = null, status = null, page = 1, last_days = null){
  return async dispatch => {
      dispatch(fetchExtratoBegin())
      var data = {}

      if(name){
        data["name"] = name
      }
      if(inicio){
        data["date_start"] = inicio
      }
      if(fim){
        data["date_end"] = fim
      }
      if(tipoPagamento){
        data["type"] = tipoPagamento
      }
      if(status){
        data["status"] = parseInt( status )
      }
      if(last_days){
        data["last_days"] = last_days
      }

      if(last_days == 1){
        
        await axios.post(`${URL}/financial/search/10/` + page, data, config)
        .then((res) => {
            var {data} = res;

            data = get_financial(data, page);

            dispatch(fetchExtratoAbstractSuccess(data));
        })

        data["last_days"] = 2;

        axios.post(`${URL}/financial/search/10/` + page, data, config)
        .then((res) => {
          var {data} = res;
          dispatch(fetchExtratoAbstractOldSuccess(data, 0));
        })
        
      }

      if(last_days == 7){
        
        await axios.post(`${URL}/financial/search/10/` + page, data, config)
        .then((res) => {
            var {data} = res;
            data = get_financial(data, page);
            dispatch(fetchExtratoAbstractSuccess(data));
        })

        data["last_days"] = 14;

        axios.post(`${URL}/financial/search/10/` + page, data, config)
        .then((res) => {
          var {data} = res;
          dispatch(fetchExtratoAbstractOldSuccess(data, 0));
        })
        
      }

      if(last_days == 30){

        
        await axios.post(`${URL}/financial/search/10/` + page, data, config)
        .then((res) => {
            var {data} = res;
            data = get_financial(data, page);
            dispatch(fetchExtratoAbstractSuccess(data));
        })

        data["last_days"] = 60;

        axios.post(`${URL}/financial/search/10/` + page, data, config)
        .then((res) => {
          var {data} = res;
          dispatch(fetchExtratoAbstractOldSuccess(data, 0));
        })
        
      }

  }
}