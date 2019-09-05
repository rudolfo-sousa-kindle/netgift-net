import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import '../assets/js/script';
import '../assets/css/responsive.css';

import $ from 'jquery';

import HeaderOrganizador from '../components/HeaderOrganizador';
import ModalUsuarios from '../components/ModalUsuarios';

import { fetchInvited } from '../actions/invitedAction';
import { fetchDeleteInvited } from '../actions/deleteInvitedAction';

class PainelControle extends Component {
    componentDidMount() {
        this.props.dispatch(fetchInvited(this.props.match.params.id));
    }

    deleteInvited(item) {
        var event_id = this.props.match.params.id;
        var invited_id = item.id;
        this.props.fetchDeleteInvited({event_id, invited_id})
    }

    render() {
        const { invited } = this.props;
        
        return(
            <div className="dashboard">
                <ModalUsuarios />

                <div id="app">
                    <HeaderOrganizador />

                    <main>
                        <div className="container">
                            <div className="summary flex-end">
                                <div className="left">
                                    <div className="flex flex-column">
                                        <div className="welcome">
                                            <div className="flex flex-center">
                                                <img className="anel-welcome" src="../assets/imgs/anel.png" alt="" />
                                                <div className="welcome-info flex flex-column">
                                                    <p>Olá, <span>Davi</span> e <span>Letícia</span></p>
                                                    <small>Faltam <span>35</span> dias para o grande dia, aproveitem cada momento.</small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-mobile info-saque-mobile">
                                            <p className="info-saque">Informações de Saque e Presentes</p>
                                            <div className="buttons">
                                                <button className="gradient fullcolor">
                                                    Gerenciar lista
                                                </button>

                                                <button className="gradient border"><span>Acessar relatório</span></button>
                                            </div>
                                        </div>

                                        <div className="copy-link">
                                            <div className="flex flex-column">
                                                <label htmlFor="endereco-site">Endereço do seu site</label>
                                                <div className="flex flex-space">
                                                    <input type="text" id="endereco-site" name="endereco_site" placeholder="seusite" value="casamentodavieleticia2018" />
                                                    <label className="prefixo" htmlFor="endereco-site">www.netgift.com.br/</label>
                                                    <button className="gradient fullcolor">Salvar</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="brief flex flex-end">
                                    <div className="brief">
                                        <p>Lista de presentes</p>
                                        <div className="brief-card icon">
                                            <div className="brief-content">
                                                <div className="flex">
                                                    <div className="brief-icon">
                                                        <i className="ng-gift c-yellow"></i>
                                                    </div>
                                                    <div className="flex-column">
                                                        <span>R$13.500,00</span>
                                                        <p>Em presentes comprados</p>
                                                        
                                                        <a href="resumo-financeiro.html">
                                                            <button className="gradient fullcolor">
                                                                Acessar relatório
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="brief">
                                        <div className="brief-card icon">
                                            <div className="brief-content">
                                                <div className="flex">
                                                    <div className="brief-icon">
                                                        <i className="ng-bars c-yellow"></i>
                                                    </div>
                                                    <div className="flex-column">
                                                        <span>60</span>
                                                        <p>Pessoas já presentearam</p>
                                                        <a href="lista-de-presentes-2.html">
                                                            <button className="gradient fullcolor">
                                                                Gerenciar lista
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="brief">
                                        <p>Financeiro</p>
                                        <div className="brief-card icon">
                                            <div className="brief-content">
                                                <div className="flex">
                                                    <div className="brief-icon">
                                                        <i className="ng-money-circled c-yellow"></i>
                                                    </div>
                                                    <div className="flex-column">
                                                        <span>R$1.670,00</span>
                                                        <p>A receber nos próximos 3 dias</p>
                                                        <button className="gradient fullcolor">
                                                            Acessar relatório
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-mobile info-convidados">
                                <p className="info-mobile info-convidados">Informações de convidados</p>
                                <div className="buttons">
                                    <a href="convidados-1.html">
                                        <button className="gradient fullcolor">
                                            Gerenciar lista
                                        </button>
                                    </a>
                                    
                                    <a href="convidados-2.html">
                                        <button className="gradient border"><span>convidar</span></button>
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-space section-convidados">
                                <div className="flex flex-column brief brief-colors">
                                    <div className="brief">
                                        <p>Convidados</p>
                                        <div className="brief-card icon blue">
                                            <div className="brief-content">
                                                <div className="flex">
                                                    <div className="brief-icon">
                                                        <i className="ng-user-filled"></i>
                                                    </div>
                                                    <div className="flex-column">
                                                        <span>{invited.items.length !== 0 ? invited.items.Todos : ''}</span>
                                                        <p>Pessoas convidadas</p>
                                                        <p className="txt-card-mobile">Convidados</p>
                                                        
                                                        <a href="convidados-1.html">
                                                            <button className="gradient fullcolor">
                                                                Gerenciar convidados
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="brief">
                                        <div className="brief-card icon green">
                                            <div className="brief-content">
                                                <div className="flex">
                                                    <div className="brief-icon">
                                                        <i className="ng-hearth"></i>
                                                    </div>
                                                    <div className="flex-column">
                                                        <span>{invited.items.length !== 0 ? invited.items.Confirmado : ''}</span>
                                                        <p>Pessoas confirmadas</p>
                                                        <p className="txt-card-mobile">Confirmados</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="brief">
                                        <div className="brief-card icon yellow">
                                            <div className="brief-content">
                                                <div className="flex">
                                                    <div className="brief-icon">
                                                        <i className="ng-arrow-down"></i>
                                                    </div>
                                                    <div className="flex-column">
                                                        <span>{invited.items.length !== 0 ? invited.items.Naovai : ''}</span>
                                                        <p>Não comparecerão</p>
                                                        <p className="txt-card-mobile">Não vão</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card-default dashboard-home">
                                    <div className="flex flex-space">
                                        <div className="status-filter flex flex-center">
                                            <p className="txt-filter">filtrar por status</p>
                                            <button className="badges-filter active" data-filter="todos">Todos</button>
                                            <button className="badges-filter" data-filter="confirmado">Confirmados</button>
                                            <button className="badges-filter" data-filter="comparecerá">Não comparecerá</button>
                                            <button className="badges-filter" data-filter="respondeu">Não respondeu</button>
                                        </div>
                                        
                                        <div>
                                            <a href="convidados-2.html">
                                                <button className="gradient fullcolor">Adicionar convidado</button>
                                            </a>
                                            
                                            <a href="convidados-1.html">
                                                <button className="gradient border">
                                                    <span>ver todos</span>
                                                </button>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="line"></div>

                                    <div className="list-cards">
                                        <div className="card-convidados-sizer"></div>
                                        <div className="card card-convidados">
                                            <div className="card-convidados-user">
                                                <div className="flex flex-center flex-space">
                                                    <div className="card-convidados-name">
                                                        <p>Rafael Barreto</p>
                                                        <span>Colegas do Trabalho</span>
                                                    </div>
                                                    <div className="dots">
                                                        <i className="ng-more"></i>
                                                        <div className="context-menu">
                                                            <button className="item"><i className="ng-compose-alt"></i>Editar</button>
                                                            <button className="item excluir"><i className="ng-trash"></i>Excluir</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-convidados-infos">
                                                <p><span>2 adultos</span>, <span>0 crianças</span></p>
                                            </div>
                                            <div className="card-convidados-infos tags flex flex-center tag-green">
                                                <p>Confirmado</p>
                                            </div>
                                        </div>
                                        <div className="card card-convidados">
                                            <div className="card-convidados-user">
                                                <div className="flex flex-center flex-space">
                                                    <div className="card-convidados-name">
                                                        <p>Tamiris de Barros</p>
                                                        <span>Conhecidos</span>
                                                    </div>
                                                    <div className="dots">
                                                        <i className="ng-more"></i>
                                                        <div className="context-menu">
                                                            <button className="item"><i className="ng-compose-alt"></i>Editar</button>
                                                            <button className="item"><i className="ng-trash"></i>Excluir</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-convidados-infos display-none">
                                                <p>(21) 98553 0373</p>
                                            </div>
                                            <div className="card-convidados-infos">
                                                <div className="flex flex-center flex-space display-none">
                                                    <p>tams@gmail.com</p>
                                                    <i className="ng-email display-none"></i>
                                                </div>
                                            </div>
                                            <div className="card-convidados-infos">
                                                <p><span>2 adultos</span>, <span>0 crianças</span></p>
                                            </div>
                                            <div className="card-convidados-infos tags flex flex-center tag-red">
                                                <p>Não comparecerá</p>
                                            </div>
                                        </div>
   
                                        <div className="card card-convidados">
                                            <div className="card-convidados-user">
                                                <div className="flex flex-center flex-space">
                                                    <div className="card-convidados-name">
                                                        <p>Ralph Andrade</p>
                                                        <span>Amigos da Família</span>
                                                    </div>
                                                    <div className="dots">
                                                        <i className="ng-more"></i>
                                                        <div className="context-menu">
                                                            <button className="item"><i className="ng-compose-alt"></i>Editar</button>
                                                            <button className="item"><i className="ng-trash"></i>Excluir</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-convidados-infos">
                                                <div className="flex flex-center flex-space display-none">
                                                    <p>ralphandrade@gmail.com</p>
                                                    <i className="ng-email"></i>
                                                </div>
                                            </div>
                                            <div className="card-convidados-infos">
                                                <p><span>2 adultos</span>, <span>0 crianças</span></p>
                                            </div>
                                            <div className="card-convidados-infos tags flex flex-center tag-yellow">
                                                <p>Não respondeu</p>
                                            </div>
                                        </div>

                                        {
                                            invited.items.length !== 0 ? invited.items.invites.map((item) => {
                                                return(
                                                    <div className={item.confirmed + " card card-convidados"} >
                                                        <div className="card-convidados-user">
                                                            <div className="flex flex-center flex-space">
                                                                <div className="card-convidados-name">
                                                                    <p>{item.first_name}</p>
                                                                    <span>Conhecidos</span>
                                                                </div>
                                                                <div className="dots">
                                                                    <i className="ng-more"></i>
                                                                    <div className="context-menu">
                                                                        <button className="item"><i className="ng-compose-alt"></i>Editar</button>
                                                                        <button className="item excluir" onClick={() => this.deleteInvited(item)}><i className="ng-trash"></i>Excluir</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            item.telephone !== undefined ? 
                                                                <div className="card-convidados-infos display-none">
                                                                    <p>({item.telephone_ddd}) {item.telephone}</p>
                                                                </div>
                                                            :''
                                                        }

                                                        {
                                                            item.email !== undefined ? 
                                                            <div className="card-convidados-infos">
                                                                <div className="flex flex-center flex-space display-none">
                                                                    <p>{item.email}</p>
                                                                    <i className="ng-email display-none"></i>
                                                                </div>
                                                            </div>
                                                            :''
                                                        }
                                                        
                                                        <div className="card-convidados-infos">
                                                            <p><span>2 adultos</span>, <span>0 crianças</span></p>
                                                        </div>
                                                        <div className="card-convidados-infos tags flex flex-center tag-red">
                                                            <p>{item.confirmed}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            : 'Não há convidados'
                                        }
                                    </div>

                                    <button className="btn-large" id="btn-load-more">Carregar mais...</button>
                                </div>
                            </div>


                            <div className="my50"></div>
                            <div className="footer-logged">
                                <p>&copy; 2018-2019 NETGIFT - CNPJ 99.304.41/0001-00</p>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    invited: state.invited,
    deleteInvited: state.deleteInvited
})
  

export default connect(mapStateToProps, {fetchInvited, fetchDeleteInvited})(PainelControle);