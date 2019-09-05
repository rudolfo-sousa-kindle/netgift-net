import axios from "axios";
import { parse } from "path";

export const FETCH_USER_COUNT_BEGIN   = 'FETCH_USER_COUNT_BEGIN';
export const FETCH_USER_COUNT_SUCCESS   = 'FETCH_USER_COUNT_SUCCESS';
export const FETCH_USER_COUNT_SITES_SUCCESS = 'FETCH_USER_COUNT_SITES_SUCCESS';
export const FETCH_USER_COUNT_PASSADO_SUCCESS   = 'FETCH_USER_COUNT_PASSADO_SUCCESS';
export const FETCH_USER_COUNT_SITES_PASSADO_SUCCESS   = 'FETCH_USER_COUNT_SITES_PASSADO_SUCCESS';
export const FETCH_USER_COUNT_FAILURE = 'FETCH_USER_COUNT_FAILURE';

const URL   = "http://51.15.99.120:4700";

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export const fetchUserCountBegin = () => ({
  type: FETCH_USER_COUNT_BEGIN
});

export const fetchUserCountSuccess = user=> ({
  type: FETCH_USER_COUNT_SUCCESS,
  payload: {user}
});

export const fetchUserCountSitesSuccess = sites=> ({
  type: FETCH_USER_COUNT_SITES_SUCCESS,
  payload: {sites}
});

export const fetchUserCountPassadoSuccess = (userPassado, porcentagem) => ({
  type: FETCH_USER_COUNT_PASSADO_SUCCESS,
  payload: {userPassado},
  porcentagem: {porcentagem}
})

export const fetchUserCountSitesPassadoSuccess = (sitesPassado, porcentagem) => ({
  type: FETCH_USER_COUNT_SITES_PASSADO_SUCCESS,
  payload: {sitesPassado},
  porcentagem: {porcentagem}
})

export const fetchUserCountFailure = error => ({
  type: FETCH_USER_COUNT_FAILURE,
  payload: { error }
});

export function fetchUserCount(periodo = null) {
  console.log( periodo );
  if(periodo === 7){
    return dispatch => {

      dispatch(fetchUserCountBegin());

      return axios.get(`${URL}/count/users/1`, config)
        .then((response) => {
          var totalAtual = 0;
          var totalPassado = 0;
          var porcentagem = 0;

          let {data} = response;
          let {total} = data;
          totalAtual = total;
          dispatch(fetchUserCountSuccess(total))

          axios.get(`${URL}/count/users/7`, config)
          .then((response) => {
            let {data} = response;
            let {total} = data;
            totalPassado = total;
            var diferenca = totalAtual - totalPassado;

          if(diferenca < 0){
            diferenca = diferenca * (-1);
            porcentagem = (diferenca * 100) / totalPassado;
          }else{
            porcentagem = (diferenca * 100) / totalPassado;
          }
          console.log(totalPassado)

            dispatch(fetchUserCountPassadoSuccess(totalPassado, parseFloat(porcentagem.toFixed(2))))

          })


          })
        .catch(error => dispatch(fetchUserCountFailure(error)));
    };
  }

    if(periodo === 30){
      return dispatch => {

        dispatch(fetchUserCountBegin());
  
        return axios.get(`${URL}/count/users/30`, config)
          .then((response) => {
            var totalAtual = 0;
            var totalPassado = 0;
            var porcentagem = 0;
  
            let {data} = response;
            let {total} = data;
            totalAtual = total;
            dispatch(fetchUserCountSuccess(total))
  
            axios.get(`${URL}/count/users/60`, config)
            .then((response) => {
              let {data} = response;
              let {total} = data;
              totalPassado = total;
              var diferenca = totalAtual - totalPassado;

            if(diferenca < 0){
              diferenca = diferenca * (-1);
              porcentagem = (diferenca * 100) / totalPassado;
            }else{
              porcentagem = (diferenca * 100) / totalPassado;
            }
  
              dispatch(fetchUserCountPassadoSuccess(totalPassado, parseFloat(porcentagem.toFixed(2))))
  
            })
  
  
            })
          .catch(error => dispatch(fetchUserCountFailure(error)));
      };
    }

      return dispatch => {

      dispatch(fetchUserCountBegin());

      return axios.get(`${URL}/count/users/1`, config)
        .then((response) => {
          var totalAtual = 0;
          var totalPassado = 0;
          var porcentagem = 0;

          let {data} = response;
          let {total} = data;
          totalAtual = total;
          dispatch(fetchUserCountSuccess(total))

          axios.get(`${URL}/count/users/2`, config)
          .then((response) => {
            let {data} = response;
            let {total} = data;
            totalPassado = total;
            var diferenca = totalAtual - totalPassado;

            if(diferenca < 0){
              diferenca = diferenca * (-1);
              porcentagem = (diferenca * 100) / totalPassado;
            }else{
              porcentagem = (diferenca * 100) / totalPassado;
            }
            
            dispatch(fetchUserCountPassadoSuccess(totalPassado, parseFloat(porcentagem.toFixed(2))))

          })

          })
        .catch(error => dispatch(fetchUserCountFailure(error)));
    };

}

export function fetchUserSites(periodo = null) {

  if(periodo === 1){
    return dispatch => {

      dispatch(fetchUserCountBegin());
  
      return axios.get(`${URL}/count/sites/1`, config)
        .then((response) => {
          var totalAtual = 0;
          var totalPassado = 0;
          var porcentagem = 0;
  
          let {data} = response;
          let {total} = data;
          totalAtual = total;
          dispatch(fetchUserCountSitesSuccess(total))
  
          axios.get(`${URL}/count/sites/2`, config)
          .then((response) => {
            let {data} = response;
            let {total} = data;
            totalPassado = total;
  
            var diferenca = totalAtual - totalPassado;

            if(diferenca < 0){
              diferenca = diferenca * (-1);
              porcentagem = (diferenca * 100) / totalPassado;
            }else{
              porcentagem = (diferenca * 100) / totalPassado;
            }
  
            dispatch(fetchUserCountSitesPassadoSuccess(totalPassado, parseFloat(porcentagem.toFixed(2))))
  
  
          })
  
  
          })
        .catch(error => dispatch(fetchUserCountFailure(error)));
    };
  }

  if(periodo === 30){
    return dispatch => {

      dispatch(fetchUserCountBegin());
  
      return axios.get(`${URL}/count/sites/30`, config)
        .then((response) => {
          var totalAtual = 0;
          var totalPassado = 0;
          var porcentagem = 0;
  
          let {data} = response;
          let {total} = data;
          totalAtual = total;
          dispatch(fetchUserCountSitesSuccess(total))
  
          axios.get(`${URL}/count/sites/60`, config)
          .then((response) => {
            let {data} = response;
            let {total} = data;
            totalPassado = total;
  
            var diferenca = totalAtual - totalPassado;

            if(diferenca < 0){
              diferenca = diferenca * (-1);
              porcentagem = (diferenca * 100) / totalPassado;
            }else{
              porcentagem = (diferenca * 100) / totalPassado;
            }
  
            dispatch(fetchUserCountSitesPassadoSuccess(totalPassado, parseFloat(porcentagem.toFixed(2))))
  
  
          })
  
  
          })
        .catch(error => dispatch(fetchUserCountFailure(error)));
    };
  }

    return dispatch => {

    dispatch(fetchUserCountBegin());

    return axios.get(`${URL}/count/sites/1`, config)
      .then((response) => {
        var totalAtual = 0;
        var totalPassado = 0;
        var porcentagem = 0;

        let {data} = response;
        let {total} = data;
        totalAtual = total;
        dispatch(fetchUserCountSitesSuccess(total))

        axios.get(`${URL}/count/sites/7`, config)
        .then((response) => {
          let {data} = response;
          let {total} = data;
          totalPassado = total;

          var diferenca = totalAtual - totalPassado;

            if(diferenca < 0){
              diferenca = diferenca * (-1);
              porcentagem = (diferenca * 100) / totalPassado;
            }else{
              porcentagem = (diferenca * 100) / totalPassado;
            }

          dispatch(fetchUserCountSitesPassadoSuccess(totalPassado, parseFloat(porcentagem.toFixed(2))))


        })


        })
      .catch(error => dispatch(fetchUserCountFailure(error)));
  };
}
