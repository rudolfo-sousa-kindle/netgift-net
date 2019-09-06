import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

import ModalUsuarios from "../components/ModalUsuarios";
import EditInvited from '../components/EditInvited';
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


import banco from '../assets/imgs/nova-conta.svg';
import bancoDoBrasil from '../assets/imgs/banco-do-brasil.png';
import bradesco from '../assets/imgs/bradesco.png';
import santander from '../assets/imgs/santander.png';
import itau from '../assets/imgs/itau.png';
import caixa from '../assets/imgs/caixa.png';

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
        <div className="dashboard teste admin">
          <div className="flex">

            <MenuDash />

            <div className="menu-mobile open-menu">
              <span className="menu-icon"></span>
            </div>

            <div className="content">

              <HeaderDashboard />

              <div className="wrap flex">
                  <Switch>
                    <Route path="/dashboard/home" component={DashboardAdminHome} />
                    <Route path="/dashboard/presentes/novo-presente" component={PresentesAdminNovo} />
                    <Route path="/dashboard/presentes/editar-presente/:id" component={PresentesAdminEditar} />
                    <Route path="/dashboard/presentes" component={PresentesAdmin} />
                    <Route path="/dashboard/temas/novo-tema" component={TemasAdminNovo} />
                    <Route path="/dashboard/temas/editar-tema/:id" component={TemaAdminEditar} />
                    <Route path="/dashboard/temas" component={TemasAdmin} />
                    <Route path="/dashboard/financeiro" component={FinanceiroAdmin} />
                    <Route path="/dashboard/extrato-financeiro" component={ExtratoFinanceiroAdmin} />
                    <Route path="/dashboard/usuarios" component={UsuariosAdmin} />
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
          <ModalUsuarios />
          <EditInvited />
          <div className="editar-perfil">
            <div className="modal modal-white" data-open="nova-conta">
                    <div className="modal-content">
                        <div className="modal-close">
                            <i className="ng-cancel"></i>
                        </div>
                        <div className="header-modal flex flex-column flex-center">
                            <img src={banco} alt="conta"/>

                            <h4 className="title-modal">Nova conta</h4>

                            <p className="subtitle-modal">Adicione uma nova conta e comece a <br/> receber seus pagamentos</p>
                        </div>

                        <div className="line"></div>
                        <div className="main-modal">
                            <form name="nova-conta">
                                <p className="title-main-modal">Selecione o banco</p>

                                <div className="bancos-grid grid">
                                    <label className="banco" htmlFor="Banco do Brasil">
                                        <img src={bancoDoBrasil} alt="Banco do Brasil" />
                                        <input type="radio" id="Banco do Brasil" numero="001"/>
                                    </label>

                                    <label className="banco" htmlFor="Bradesco">
                                        <img src={bradesco} alt="Bradesco" />
                                        <input type="radio" id="Bradesco" numero="237"/>
                                    </label>

                                    <label className="banco" htmlFor="Itau">
                                        <img src={itau} alt="Itaú" />
                                        <input type="radio" id="Itau" numero="341"/>
                                    </label>

                                    <label className="banco" htmlFor="Santander">
                                        <img src={santander} alt="santander" />
                                        <input type="radio" id="Santander" numero="033"/>
                                    </label>

                                    <label className="banco" htmlFor="Caixa">
                                        <img src={caixa} alt="Caixa" />
                                        <input type="radio" id="Caixa" numero="104"/>
                                    </label>
                                </div>

                                <select id="select-bank" className="custom-select bg-white">
                                    <option>Selecionar outros bancos</option>
                                    <option value="246">246 – Banco ABC Brasil S.A.</option>
                                    <option value="025">025 – Banco Alfa S.A.</option>
                                    <option value="641">641 – Banco Alvorada S.A.</option>
                                    <option value="029">029 – Banco Banerj S.A.</option>
                                    <option value="038">038 – Banco Banestado S.A.</option>
                                    <option value="000">000 – Banco Bankpar S.A.</option>
                                    <option value="740">740 – Banco Barclays S.A.</option>
                                    <option value="107">107 – Banco BBM S.A.</option>
                                    <option value="031">031 – Banco Beg S.A.</option>
                                    <option value="096">096 – Banco BM&F de Serviços de Liquidação e Custódia S.A</option>
                                    <option value="318">318 – Banco BMG S.A.</option>
                                    <option value="752">752 – Banco BNP Paribas Brasil S.A.</option>
                                    <option value="248">248 – Banco Boavista Interatlântico S.A.</option>
                                    <option value="036">036 – Banco Bradesco BBI S.A.</option>
                                    <option value="204">204 – Banco Bradesco Cartões S.A.</option>
                                    <option value="225">225 – Banco Brascan S.A.</option>
                                    <option value="044">044 – Banco BVA S.A.</option>
                                    <option value="263">263 – Banco Cacique S.A.</option>
                                    <option value="473">473 – Banco Caixa Geral – Brasil S.A.</option>
                                    <option value="222">222 – Banco Calyon Brasil S.A.</option>
                                    <option value="040">040 – Banco Cargill S.A.</option>
                                    <option value="M08">M08 – Banco Citicard S.A.</option>
                                    <option value="M19">M19 – Banco CNH Capital S.A.</option>
                                    <option value="215">215 – Banco Comercial e de Investimento Sudameris S.A.</option>
                                    <option value="756">756 – Banco Cooperativo do Brasil S.A. – BANCOOB</option>
                                    <option value="748">748 – Banco Cooperativo Sicredi S.A.</option>
                                    <option value="505">505 – Banco Credit Suisse (Brasil) S.A.</option>
                                    <option value="229">229 – Banco Cruzeiro do Sul S.A.</option>
                                    <option value="003">003 – Banco da Amazônia S.A.</option>
                                    <option value="083-3">083-3 – Banco da China Brasil S.A.</option>
                                    <option value="707">707 – Banco Daycoval S.A.</option>
                                    <option value="M06">M06 – Banco de Lage Landen Brasil S.A.</option>
                                    <option value="024">024 – Banco de Pernambuco S.A. – BANDEPE</option>
                                    <option value="456">456 – Banco de Tokyo-Mitsubishi UFJ Brasil S.A.</option>
                                    <option value="214">214 – Banco Dibens S.A.</option>
                                    <option value="047">047 – Banco do Estado de Sergipe S.A.</option>
                                    <option value="037">037 – Banco do Estado do Pará S.A.</option>
                                    <option value="041">041 – Banco do Estado do Rio Grande do Sul S.A.</option>
                                    <option value="004">004 – Banco do Nordeste do Brasil S.A.</option>
                                    <option value="265">265 – Banco Fator S.A.</option>
                                    <option value="M03">M03 – Banco Fiat S.A.</option>
                                    <option value="224">224 – Banco Fibra S.A.</option>
                                    <option value="626">626 – Banco Ficsa S.A.</option>
                                    <option value="394">394 – Banco Finasa BMC S.A.</option>
                                    <option value="M18">M18 – Banco Ford S.A.</option>
                                    <option value="223">233 – Banco GE Capital S.A.</option>
                                    <option value="734">734 – Banco Gerdau S.A.</option>
                                    <option value="M07">M07 – Banco GMAC S.A.</option>
                                    <option value="612">612 – Banco Guanabara S.A.</option>
                                    <option value="M22">M22 – Banco Honda S.A.</option>
                                    <option value="063">063 – Banco Ibi S.A. Banco Múltiplo</option>
                                    <option value="M11">M11 – Banco IBM S.A.</option>
                                    <option value="604">604 – Banco Industrial do Brasil S.A.</option>
                                    <option value="320">320 – Banco Industrial e Comercial S.A.</option>
                                    <option value="653">653 – Banco Indusval S.A.</option>
                                    <option value="630">630 – Banco Intercap S.A.</option>
                                    <option value="249">249 – Banco Investcred Unibanco S.A.</option>
                                    <option value="184">184 – Banco Itaú BBA S.A.</option>
                                    <option value="479">479 – Banco ItaúBank S.A</option>
                                    <option value="M09">M09 – Banco Itaucred Financiamentos S.A.</option>
                                    <option value="376">376 – Banco J. P. Morgan S.A.</option>
                                    <option value="074">074 – Banco J. Safra S.A.</option>
                                    <option value="217">217 – Banco John Deere S.A.</option>
                                    <option value="065">065 – Banco Lemon S.A.</option>
                                    <option value="600">600 – Banco Luso Brasileiro S.A.</option>
                                    <option value="755">755 – Banco Merrill Lynch de Investimentos S.A.</option>
                                    <option value="746">746 – Banco Modal S.A.</option>
                                    <option value="151">151 – Banco Nossa Caixa S.A.</option>
                                    <option value="045">045 – Banco Opportunity S.A.</option>
                                    <option value="623">623 – Banco Panamericano S.A.</option>
                                    <option value="611">611 – Banco Paulista S.A.</option>
                                    <option value="643">643 – Banco Pine S.A.</option>
                                    <option value="638">638 – Banco Prosper S.A.</option>
                                    <option value="747">747 – Banco Rabobank International Brasil S.A.</option>
                                    <option value="M16">M16 – Banco Rodobens S.A.</option>
                                    <option value="072">072 – Banco Rural Mais S.A.</option>
                                    <option value="250">250 – Banco Schahin S.A.</option>
                                    <option value="749">749 – Banco Simples S.A.</option>
                                    <option value="366">366 – Banco Société Générale Brasil S.A.</option>
                                    <option value="637">637 – Banco Sofisa S.A.</option>
                                    <option value="464">464 – Banco Sumitomo Mitsui Brasileiro S.A.</option>
                                    <option value="082-5">082-5 – Banco Topázio S.A.</option>
                                    <option value="M20">M20 – Banco Toyota do Brasil S.A.</option>
                                    <option value="634">634 – Banco Triângulo S.A.</option>
                                    <option value="208">208 – Banco UBS Pactual S.A.</option>
                                    <option value="M14">M14 – Banco Volkswagen S.A.</option>
                                    <option value="655">655 – Banco Votorantim S.A.</option>
                                    <option value="610">610 – Banco VR S.A.</option>
                                    <option value="370">370 – Banco WestLB do Brasil S.A.</option>
                                    <option value="021">021 – BANESTES S.A. Banco do Estado do Espírito Santo</option>
                                    <option value="719">719 – Banif-Banco Internacional do Funchal (Brasil)S.A.</option>
                                    <option value="073">073 – BB Banco Popular do Brasil S.A.</option>
                                    <option value="078">078 – BES Investimento do Brasil S.A.-Banco de Investimento</option>
                                    <option value="069">069 – BPN Brasil Banco Múltiplo S.A.</option>
                                    <option value="070">070 – BRB – Banco de Brasília S.A.</option>
                                    <option value="477">477 – Citibank N.A.</option>
                                    <option value="081-7">081-7 – Concórdia Banco S.A.</option>
                                    <option value="487">487 – Deutsche Bank S.A. – Banco Alemão</option>
                                    <option value="751">751 – Dresdner Bank Brasil S.A. – Banco Múltiplo</option>
                                    <option value="062">062 – Hipercard Banco Múltiplo S.A.</option>
                                    <option value="492">492 – ING Bank N.V.</option>
                                    <option value="488">488 – JPMorgan Chase Bank</option>
                                    <option value="409">409 – UNIBANCO – União de Bancos Brasileiros S.A.</option>
                                    <option value="230">230 – Unicard Banco Múltiplo S.A.</option>
                                </select>

                                <div className="box-cpf margin-bottom-modal">
                                    <p>O CPF do titular da conta bancária deve ser o mesmo CPF cadastrado em sua conta NETGIFT®</p>
                                </div>

                                <p className="title-main-modal">Tipo de Conta</p>

                                <select id="select-count" className="custom-select bg-white">
                                    <option>Selecione</option>
                                    <option value="Conta corrente">Conta corrente</option>
                                    <option value="Conta poupança">Conta poupança</option>
                                </select>

                                <div className="form-modal grid">
                                    <div>
                                        <label htmlFor="num_agencia" className="title-main-modal display-none">Número da agência</label>

                                        <label
                                            htmlFor="num_agencia"
                                            className="title-main-modal title-main-modal-mobile">N° Agência</label>
                                        <input
                                            type="text"
                                            className="input-modal"
                                            id="num_agencia"
                                            name="num_agencia"
                                            required/>
                                    </div>

                                    <div>
                                        <label htmlFor="num_conta" className="title-main-modal">Número da conta</label>
                                        <input type="text" className="input-modal" id="num_conta" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="digito" className="title-main-modal">Díg.</label>
                                        <input type="text" id="digito" name="digito" className="input-modal digito-conta"/>
                                    </div>
                                </div>

                                <div className="footer-modal flex flex-space w100">
                                    <button className="text-gradient grey cancelar">Cancelar</button>
                                    <button className="gradient fullcolor" onClick={() => this.addBank()}>Cadastrar nova conta</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal modal-white" data-open="editar-conta">
                    <div className="modal-content">
                        <div className="modal-close">
                            <i className="ng-cancel"></i>
                        </div>

                        <div className="header-modal">
                            <h4 className="title-modal">Editar conta</h4>

                            <div className="line"></div>
                        </div>

                        <div className="main-modal">
                            
                            <div className="box-cpf margin-bottom-modal">
                                <p>O CPF do titular da conta bancária deve ser o mesmo CPF cadastrado em sua conta NETGIFT®</p>
                            </div>

                            <form name="editar-conta">
                                <p className="title-main-modal">Tipo de conta</p>
                                <select className="custom-select bg-white">
                                    <option hidden>Selecione</option>
                                    <option value="Conta corrente">Conta corrente</option>
                                    <option value="Conta poupança">Conta poupança</option>
                                </select>

                                <div className="form-modal grid">
                                    <div>
                                        <label htmlFor="num_agencia" className="title-main-modal display-none">Número da agência</label>
                                        <label
                                            htmlFor="num_agencia"
                                            className="title-main-modal title-main-modal-mobile">N° agência</label>
                                        <input type="tel" className="input-modal" id="num_agencia" name="num_agencia"/>
                                    </div>

                                    <div>
                                        <label htmlFor="num_conta" className="title-main-modal">Número da conta</label>
                                        <input type="tel" className="input-modal" id="num_conta" name="num_conta"/>
                                    </div>

                                    <div>
                                        <label htmlFor="digito" className="title-main-modal">Díg.</label>
                                        <input
                                            type="text"
                                            className="input-modal digito-conta"
                                            id="digito"
                                            name="digito"/>
                                    </div>
                                </div>

                                <div className="footer-modal flex flex-space w100">
                                    <button className="btn-exclude" onClick={(element) => this.deleteBank(element)}>Excluir conta</button>

                                    <div>
                                        <button className="text-gradient grey cancelar">Cancelar</button>
                                        <button className="gradient fullcolor">Salvar alterações</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal modal-white" data-open="prazos-tarifas">
                    <div className="modal-content">
                        <div className="modal-close">
                            <i className="ng-cancel"></i>
                        </div>

                        <div class="header-modal">
                            <h4 class="title-modal">Prazos e tarifas</h4>
                            <div class="line"></div>
                        </div>

                        <div className="main-modal">
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"</p>

                            <p>aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                            <p>Officia culpa pariatur officia culpa. Aliqua et minim culpa excepteur quis sit cupidatat culpa dolore excepteur. Incididunt irure ut id ex nisi ut aute anim anim officia ipsum cupidatat qui. Culpa nisi irure cupidatat aute tempor voluptate Lorem tempor commodo est. Fugiat sit sit aliqua veniam ad laboris quis velit incididunt non occaecat.</p>

                            <p>Pariatur dolore ea pariatur amet sit consectetur dolor eiusmod quis ullamco nisi cillum occaecat pariatur. Minim proident eu excepteur fugiat ut exercitation consectetur voluptate. Enim qui cupidatat ut sint excepteur aliquip eu excepteur adipisicing do dolore aute minim exercitation</p>
                        </div>
                    </div>
                </div>
                </div>
          <div id="app">
            <HeaderOrganizador id={id_event} />

            <main>
              <Switch>
                <Route path="/dashboard/home/:id" component={DashboardOrganizadorHome} />
                <Route path="/dashboard/lista-de-presentes/:id" component={PresentesOrganizador} />
                <Route path="/dashboard/presentes-recebidos/:id" component={PresentesRecebidos} />
                <Route path="/dashboard/editar-presentes/:id" component={EditarPresentes} />
                <Route path="/dashboard/adicionar-convidado/:id" component={AdicionarConvidado} />
                <Route path="/dashboard/usuarios/:id" component={UsuariosOrganizador} />
                <Route path="/dashboard/site/:id" component={SiteFesta} />
                <Route path="/dashboard/convidados/:id" component={Convidados} />
                <Route path="/dashboard/informacoes/:id" component={Informacoes} />
                <Route path="/dashboard/financeiro/:id" component={FinanceiroOrganizer} />
                <Route path="/dashboard/adicionar-usuario/:id" component={AdcionarUsuario} />
                <Route path="/dashboard/editar-perfil/:id" component={EditarPerfil} />
                <Route path="/dashboard/notificacoes/:id" component={NotificacoesOrganizador} />
                <Route path="/dashboard/configurar-rsvp/:id" component={ConfigurarRsvp} />
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
