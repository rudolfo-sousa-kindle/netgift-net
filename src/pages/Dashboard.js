import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

import PresentesAdmin from "../components/PresentesAdmin";
import PresentesAdminNovo from "../components/PresentesAdminNovo";
import PresentesAdminEditar from "../components/PresentesAdminEditar";
import TemasAdmin from "../components/TemasAdmin";
import Notificacoes from "../components/Notificacoes";
import TemasAdminNovo from "../components/TemasAdminNovo";
import TemaAdminEditar from "../components/TemaAdminEditar";
import HeaderDashboard from "../components/HeaderDashboard";
import MenuDash from "../components/MenuDash";
import FinanceiroAdmin from "../components/FinanceiroAdmin";
import ExtratoFinanceiroAdmin from "../components/ExtratoFinanceiroAdmin";
import UsuariosAdmin from "../components/UsuariosAdmin";
import DashboardAdminHome from "../components/DashboardAdminHome";
import DashboardOrganizadorHome from "../components/DashboardOrganizadorHome";
import PresentesOrganizador from "../components/PresentesOrganizador";
import PresentesRecebidos from "../components/PresentesRecebidos";
import SiteFesta from "../components/SiteFesta";
import AdicionarConvidado from "../components/AdicionarConvidado";
import UsuariosOrganizador from "../components/UsuariosOrganizador";
import HeaderOrganizador from "../components/HeaderOrganizador";
import EditarPresentes from "../components/EditarPresentes";
import Convidados from "../components/Convidados";
import Informacoes from "../components/Informacoes";
import FinanceiroOrganizer from "../components/FinanceiroOrganizer";
import AdcionarUsuario from "../components/AdcionarUsuario";
import EditarPerfil from "../components/EditarPerfil";
import NotificacoesOrganizador from "../components/NotificacoesOrganizador";
import ConfigurarRsvp from "../components/ConfigurarRsvp";

import "../assets/css/selectize.css";
import "../assets/css/select2.css";
import "../assets/css/administrador.css";
import "../assets/css/responsive-administrador.css";

require("../assets/js/administrador.js");

// const user = JSON.parse(localStorage.getItem('user'))

var user;

class Dashboard extends Component {

  componentWillMount(){
    user = localStorage.getItem('user');
    user = JSON.parse(user);

    if(this.props.authenticated && user) {
      this.setState({
          bank: user.bank,
          events: user.events,
          user: user.user
      })
    }
  }
  
  dashboard() {
    let id_event = this.props.match.params[0];
    id_event = window.location.pathname.split('/');
    id_event = id_event[ id_event.length - 1 ];

    id_event = '' === id_event || 'home' === id_event ? '' : id_event;

    if(this.props.authenticated && user && user.admin == 1){
      return(
        <div className="dashboard teste">
          <div className="flex">

            <MenuDash />

            <div className="menu-mobile open-menu">
              <span className="menu-icon"></span>
            </div>

            <div className="content">

              <HeaderDashboard />

              <div className="wrap flex">
                  <Switch>
                    <Route path="/dashboard/home" exact component={DashboardAdminHome} />
                    <Route path="/dashboard/presentes" exact component={PresentesAdmin} />
                    <Route path="/dashboard/presentes/novo-presente" exact component={PresentesAdminNovo} />
                    <Route path="/dashboard/presentes/editar-presente/:id" exact component={PresentesAdminEditar} />
                    <Route path="/dashboard/temas/editar-tema/:id" exact component={TemaAdminEditar} />
                    <Route path="/dashboard/temas" exact component={TemasAdmin} />
                    <Route path="/dashboard/financeiro" exact component={FinanceiroAdmin} />
                    <Route path="/dashboard/extrato-financeiro" exact component={ExtratoFinanceiroAdmin} />
                    <Route path="/dashboard/temas/novo-tema" exact component={TemasAdminNovo} />
                    <Route path="/dashboard/usuarios" exact component={UsuariosAdmin} />
                  </Switch>
                <Notificacoes />
              </div>

            </div>

          </div>
        </div>
      )
    } else {
      const {invited} = this.props;
      return(
        <div className="dashboard organizador">
          <div id="app">

            <HeaderOrganizador id={id_event} />

            <main>
              <Switch>
                <Route path="/dashboard/home/:id" exact component={DashboardOrganizadorHome} />
                <Route path="/dashboard/lista-de-presentes/:id" exact component={PresentesOrganizador} />
                <Route path="/dashboard/presentes-recebidos/:id" exact component={PresentesRecebidos} />
                <Route path="/dashboard/editar-presentes/:id" exact component={EditarPresentes} />
                <Route path="/dashboard/adicionar-convidado/:id" exact component={AdicionarConvidado} />
                <Route path="/dashboard/usuarios/:id" exact component={UsuariosOrganizador} />
                <Route path="/dashboard/site/:id" exact component={SiteFesta} />
                <Route path="/dashboard/convidados/:id" exact component={Convidados} />
                <Route path="/dashboard/informacoes/:id" exact component={Informacoes} />
                <Route path="/dashboard/financeiro/:id" exact component={FinanceiroOrganizer} />
                <Route path="/dashboard/adicionar-usuario/:id" exact component={AdcionarUsuario} />
                <Route path="/dashboard/editar-perfil/:id" exact component={EditarPerfil} />
                <Route path="/dashboard/notificacoes/:id" exact component={NotificacoesOrganizador} />
                <Route path="/dashboard/configurar-rsvp/:id" exact component={ConfigurarRsvp} />
              </Switch>
            </main>
          </div>
        </div>
      )
    }
  }


  render() {
    
    return (
        <Router>
            {this.dashboard()}
        </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(Dashboard);