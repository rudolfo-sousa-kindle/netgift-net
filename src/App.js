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
        <Router basename={process.env.PUBLIC_URL}>
          <Route render={({location}) => {
            return (
              <TransitionGroup>
                <Switch location={location}>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/sobre" component={noRequireAuth(Sobre)} />
                  <Route path="/login" component={noRequireAuth(Login)} />
                  <Route path="/templates" component={noRequireAuth(GaleriaTemplates)} />
                  <Route path="/contato" component={noRequireAuth(Contato)} />
                  <Route path="/buscar-festa" component={noRequireAuth(BuscarFesta)} />
                  <Route path="/cadastro" component={noRequireAuth(Cadastro)} />
                  <Route path="/recuperar-senha" component={noRequireAuth(RecuperarSenha)} />
                  <Route path="/cadastro-concluido" component={noRequireAuth(CadastroConcluido)} />
                  <Route path="/tipo-cadastro" component={noRequireAuth(TipoCadastro)} />
                  <Route path="/recuperar-senha/nova-senha" component={noRequireAuth(RecuperarSenhaNova)} />
                  <Route path="/dashboard" component={requireAuth(Dashboard)} />
                  <Route path="/dashboard/*" component={requireAuth(Dashboard)} />
                  <Route path="/criarFesta" component={requireAuth(CriarFesta)} />
                  <Route path="/festa/:id" component={HomeConvidado} />
                  <Route path="/festa/:id/lista-de-presentes" component={noRequireAuth(ListaPresentes)} />
                  <Route path="/festa/:id/carrinho" component={noRequireAuth(Carrinho)} />
                  <Route path="/festa/:id/pagamento" component={noRequireAuth(Pagamento)} />
                  <Route path="/festa/:id/confirmacao" component={noRequireAuth(Checkout)} />
                  <Route path="/organizador/:id/painel" component={noRequireAuth(PainelControle)} />
                </Switch>
              </TransitionGroup>
            )
          }} />
        </Router>
      </div>
    );
  }
}
