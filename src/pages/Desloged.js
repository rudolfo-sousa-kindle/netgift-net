import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/responsive-deslog.css";
import "../assets/css/swiper.min.css";


import Login from "./Login";
import HomePage from "./HomePage";
import Sobre from './Sobre';
import GaleriaTemplates from './GaleriaTemplates';
import Contato from './Contato';
import BuscarFesta from './BuscarFesta';
import Cadastro from "./Cadastro";
import CadastroConcluido from "./CadastroConcluido";
import RecuperarSenha from "./RecuperarSenha";
import RecuperarSenhaNova from "./RecuperarSenhaNova";
import TipoCadastro from "./TipoCadastro";


export default class Desloged extends Component {

  render() {
    return (
      <div>
        <Router>
            <Route path="/" exact component={HomePage} />
            <Route path="/sobre" exact component={Sobre} />
            <Route path="/login" exact component={Login} />
            <Route path="/templates" exact component={GaleriaTemplates} />
            <Route path="/contato" exact component={Contato} />
            <Route path="/buscar-festa" exact component={BuscarFesta} />
            <Route path="/cadastro" exact component={Cadastro} />
            <Route path="/cadastro-concluido" exact component={CadastroConcluido} />
            <Route path="/tipo-cadastro" exact component={TipoCadastro} />
            <Route path="/recuperar-senha" exact component={RecuperarSenha} />
            <Route path="/recuperar-senha/nova-senha" exact component={RecuperarSenhaNova} />
        </Router>
      </div>
    );
  }
}
