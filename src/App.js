import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { AUTHENTICATED } from './actions';
import store from './store';

import noRequireAuth from './components/no_require_auth';
import requireAuth from './components/require_auth';

import "./assets/css/style.scss";
import "./assets/css/responsive.scss";
import "./assets/css/responsive-deslog.scss";

import HomePage from "./pages/HomePage";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RecuperarSenha from "./pages/RecuperarSenha";
import RecuperarSenhaNova from "./pages/RecuperarSenhaNova";
import Sobre from './pages/Sobre';
import GaleriaTemplates from './pages/GaleriaTemplates';
import Contato from './pages/Contato';
import CriarFesta from './pages/CriarFesta';
import BuscarFesta from './pages/BuscarFesta';
import CadastroConcluido from "./pages/CadastroConcluido";
import TipoCadastro from "./pages/TipoCadastro";
import HomeConvidado from "./pages/HomeConvidado";
import ListaPresentes from "./pages/ListaPresentes";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Checkout from "./pages/Checkout";
import PainelControle from "./pages/PainelControle";



var user = localStorage.getItem('user');
user = JSON.parse(user);

if(user) {
  store.dispatch({ type: AUTHENTICATED });
}

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route render={({location}) => {
            return (
              <TransitionGroup>
              
                <Switch location={location}>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/sobre" exact component={noRequireAuth(Sobre)} />
                  <Route path="/login" exact component={noRequireAuth(Login)} />
                  <Route path="/templates" exact component={noRequireAuth(GaleriaTemplates)} />
                  <Route path="/contato" exact component={noRequireAuth(Contato)} />
                  <Route path="/buscar-festa" exact component={noRequireAuth(BuscarFesta)} />
                  <Route path="/cadastro" exact component={noRequireAuth(Cadastro)} />
                  <Route path="/recuperar-senha" exact component={noRequireAuth(RecuperarSenha)} />
                  <Route path="/cadastro-concluido" exact component={noRequireAuth(CadastroConcluido)} />
                  <Route path="/tipo-cadastro" exact component={noRequireAuth(TipoCadastro)} />
                  <Route path="/recuperar-senha/nova-senha" exact component={noRequireAuth(RecuperarSenhaNova)} />
                  <Route path="/dashboard" exact component={requireAuth(Dashboard)} />
                  <Route path="/dashboard/*" exact component={requireAuth(Dashboard)} />
                  <Route path="/criarFesta" exact component={requireAuth(CriarFesta)} />
                  <Route path="/festa/:id" exact component={HomeConvidado} />
                  <Route path="/festa/:id/lista-de-presentes" exact component={noRequireAuth(ListaPresentes)} />
                  <Route path="/festa/:id/carrinho" exact component={noRequireAuth(Carrinho)} />
                  <Route path="/festa/:id/pagamento" exact component={noRequireAuth(Pagamento)} />
                  <Route path="/festa/:id/confirmacao" exact component={noRequireAuth(Checkout)} />
                  <Route path="/organizador/:id/painel" exact component={noRequireAuth(PainelControle)} />
                </Switch>
              </TransitionGroup>
            )
          }} />
        </Router>
      </div>
    );
  }
}
