import React, { Component } from "react";
import { connect } from "react-redux";

import Loader from "./Loader";

import { notificarUsuario } from "../actions/notificarActions";
import { fetchNotificacoesAdmin } from "../actions/notificacoesAdminActions";

import $ from 'jquery';

const noneStyle = {
    "display": "none"
  }

var values = {};

class Notificacoes extends Component{

    componentDidMount(){
        this.props.dispatch(fetchNotificacoesAdmin());
    }

    notifiedUser(){
        values["id"] = $("#notificado").val();
        values["msg"] = $("#msg").val();
        $("#cbx-notificar-4").is(':checked') ? values["suspense"] = true : values["suspense"] = false

        this.props.dispatch(notificarUsuario(values))
        .then((res) => {
            if ($(".dashboard").hasClass("aside-active")) {
                $(".dashboard").toggleClass("aside-active");
                $('.btn-ver-detalhes').removeClass('active');
                $('[data-aside]').removeClass("active");
                $(".select-filter-status").select2("close");
            }
        });

    }

    render(){
        const {items, loading} = this.props.notificar;
        const itemsAdmin = this.props.notificacaoAdmin.items;
        const notificacoes = this.props.notificacaoAdmin.notificacoes;
        const loadingAdmin = this.props.notificacaoAdmin.loading;
        if(items){
            $("#notificado").val(items);
        }
        return(
            <div>
                <div className="box-aside alerts" data-aside="notificacoes">
                    <i className="hide-desk ng-left-arrow-extend arrow-left"></i>
                    <div className="alerts-header">
                        <h2>Atividades</h2>
                        <div className="alerts-tags atividades-filtros">
                            <button className="left active">Dia (13)</button>
                            <button className="center">Semana (35)</button>
                            <button className="right">Mês (111)</button>
                        </div>
                    </div>

                    <div className="main-content-aside alerts-contents">
                        <div className="alerts-wrap">
                            <div className="paper alerts-left">
                                <div className="filters flex flex-center">
                                    <button>Administrador</button>
                                    <button>Usuários</button>
                                </div>

                                {
                                    loadingAdmin ? <Loader /> : 
                                    itemsAdmin ? itemsAdmin.map((item, i) => {
                                        return(
                                            <div key={i} className="alert-item">
                                                <div className="alert-header flex flex-center flex-space">
                                                    <div className="ball"></div>
                                                    <div className="time"><span>8 minutos</span></div>
                                                </div>
                                                <div className="alert-content">
                                                    <div className="flex flex-end flex-space">
                                                        <div>
                                                            <p className="title">Usuário</p>
                                                            <p className="user">{item.first_name} {item.last_name}</p>
                                                            <p className="note">{item.acao}</p>
                                                        </div>
                                                        <button onClick={() => window.location.href = `/festa/${item.event_slug}`} className="fullcolor gradient ver">Ver</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : ""
                                }


                            </div>
                            <div className="paper alerts-center">
                                <div className="filters flex flex-center">
                                    <button>Administrador</button>
                                    <button>Usuários</button>
                                </div>


                                <div className="alert-item">
                                    <div className="alert-header flex flex-center flex-space">
                                        <div className="ball"></div>
                                        <div className="time"><span>8 minutos</span></div>
                                    </div>
                                    <div className="alert-content">
                                        <div className="flex flex-end flex-space">
                                            <div>
                                                <p className="title">Usuário</p>
                                                <p className="user">Rafael Barreto</p>
                                                <p className="note">Criou um site infantil</p>
                                            </div>
                                            <button className="fullcolor gradient ver">Ver</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert-item">
                                    <div className="alert-header flex flex-center flex-space">
                                        <div className="ball"></div>
                                        <div className="time"><span>8 minutos</span></div>
                                    </div>
                                    <div className="alert-content">
                                        <div className="flex flex-end flex-space">
                                            <div>
                                                <p className="title">Usuário</p>
                                                <p className="user">Rafael Barreto</p>
                                                <p className="note">Criou um site infantil</p>
                                            </div>
                                            <button className="fullcolor gradient ver">Ver</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert-item">
                                    <div className="alert-header flex flex-center flex-space">
                                        <div className="ball"></div>
                                        <div className="time"><span>8 minutos</span></div>
                                    </div>
                                    <div className="alert-content">
                                        <div className="flex flex-end flex-space">
                                            <div>
                                                <p className="title">Usuário</p>
                                                <p className="user">Rafael Barreto</p>
                                                <p className="note">Criou um site infantil</p>
                                            </div>
                                            <button className="fullcolor gradient ver">Ver</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="paper alerts-right">
                                <div className="filters flex flex-center">
                                    <button>Administrador</button>
                                    <button>Usuários</button>
                                </div>


                                <div className="alert-item">
                                    <div className="alert-header flex flex-center flex-space">
                                        <div className="ball"></div>
                                        <div className="time"><span>8 minutos</span></div>
                                    </div>
                                    <div className="alert-content">
                                        <div className="flex flex-end flex-space">
                                            <div>
                                                <p className="title">Usuário</p>
                                                <p className="user">Rafael Barreto</p>
                                                <p className="note">Criou um site infantil</p>
                                            </div>
                                            <button className="fullcolor gradient ver">Ver</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert-item">
                                    <div className="alert-header flex flex-center flex-space">
                                        <div className="ball"></div>
                                        <div className="time"><span>8 minutos</span></div>
                                    </div>
                                    <div className="alert-content">
                                        <div className="flex flex-end flex-space">
                                            <div>
                                                <p className="title">Usuário</p>
                                                <p className="user">Rafael Barreto</p>
                                                <p className="note">Criou um site infantil</p>
                                            </div>
                                            <button className="fullcolor gradient ver">Ver</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert-item">
                                    <div className="alert-header flex flex-center flex-space">
                                        <div className="ball"></div>
                                        <div className="time"><span>8 minutos</span></div>
                                    </div>
                                    <div className="alert-content">
                                        <div className="flex flex-end flex-space">
                                            <div>
                                                <p className="title">Usuário</p>
                                                <p className="user">Rafael Barreto</p>
                                                <p className="note">Criou um site infantil</p>
                                            </div>
                                            <button className="fullcolor gradient ver">Ver</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="paper alerts-center">
                            <div className="point-line">
                                <div className="point-element"></div>
                                <div className="line-white"></div>
                            </div>

                            <div className="intro-main-detalhes flex flex-space">
                                <span>#965341</span>
                                <span>18/01/2019</span>
                            </div>

                            <div className="detalhes-notifications">
                                <div className="border-notifications">
                                    <p className="title-notifications">Notificado a partir de</p>

                                    <div className="box-blue-notifications">
                                        <p className="text-lighter">organizador</p>
                                        <p>Letícia Aragão</p>

                                        <p>Alterou o horário de evento</p>

                                        <p><span className="text-lighter">Anterior:</span> <span>20:35</span></p>

                                        <p><span className="text-lighter">Alterado:</span> <span>20:45</span></p>
                                    </div>
                                </div>

                                <div className="border-notifications">
                                    <p className="title-notifications">Notificado por que</p>

                                    <div className="box-notifications">
                                        <p>Lorem ipsum dolor</p>

                                        <p className="text-lighter txt-notifications">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolor</p>
                                    </div>
                                </div>

                                <div className="border-notifications">
                                    <p className="title-notifications">Complementamos que</p>

                                    <div className="box-notifications">
                                        <p>Lorem ipsum dolor</p>

                                        <p className="text-lighter txt-notifications">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur dolor</p>
                                    </div>
                                </div>

                                <input className="inp-cbx" id="cbx" type="checkbox" style={noneStyle} />
                                <label className="cbx" htmlFor="cbx">
                                    <span>
                                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </svg>
                                    </span>
                                    <span>Site retirado do ar.</span>
                                </label>

                                <button className="gradient fullcolor btn-finalizar">Finalizar e republicar site</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box-aside alerts" data-aside="detalhes">
                        <i className="hide-desk ng-left-arrow-extend arrow-left"></i>
                        <div className="alerts-header">
                            <h2>Detalhes</h2>
                            <div className="alerts-tags atividades-filtros">
                                <button className="left active">Tudo (13)</button>
                                <button className="center">Notificações (1)</button>
                            </div>
                        </div>
                        <div className="main-content-aside alerts-contents">
                            <div className="alerts-wrap">
                                <div className="paper alerts-left">
                                    <div className="filters flex flex-center">
                                        <button>Organizador</button>
                                        <button>Convidados</button>
                                    </div>
                                    <div className="point-line">
                                        <div className="point-element"></div>
                                        <div className="line-white"></div>
                                    </div>
                                    {
                                        loadingAdmin ? <Loader /> : 
                                        notificacoes ? notificacoes.map((notificacao, i) => {
                                            return(
                                                <div key={i} className="alert-item">
                                                    <div className="alert-header flex flex-center flex-space">
                                                        <div className="ball"></div>
                                                        <div className="time">
                                                            <p>{new Date( notificacao.date ).toLocaleDateString( 'pt-br' )}</p>
                                                        </div>
                                                    </div>
                                                    <div className="alert-content">
                                                        <div className="flex flex-end flex-space">
                                                            <div>
                                                                <p className="title">{notificacao.from}</p>
                                                                <p className="user">{notificacao.from}</p>
                                                                <p className="note">{notificacao.message}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : ""
                                    }
                                    
                                </div>
                                <div className="paper alerts-center">
                                    <div className="point-line">
                                        <div className="point-element"></div>
                                        <div className="line-white"></div>
                                    </div>
                                    <div className="intro-main-detalhes flex flex-space">
                                        <span>#965341</span>
                                        <span>18/01/2019</span>
                                    </div>
                                    <div className="detalhes-notifications">
                                        <div className="border-notifications">
                                            <p className="title-notifications">Notificado a partir de</p>
                                            <div className="alert-item">
                                                <div className="alert-content box-blue">
                                                    <div className="flex flex-end flex-space">
                                                        <div>
                                                            <p className="title">Organizador</p>
                                                            <p className="user">Letícia Aragão</p>
                                                            <p className="note">Alterou o horário de evento</p>
                                                            <p className="note history"><span>Anterior:</span> 20:35</p>
                                                            <p className="note history"><span>Alterado:</span> 20:45</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-notifications">
                                            <p className="title-notifications">Notificado por que</p>
                                            <div className="box-notifications">
                                                <p>Lorem ipsum dolor</p>
                                                <p className="text-lighter txt-notifications">Lorem ipsum dolor sit amet, Consectetur adipisicing elit. Pariatur dolor</p>
                                            </div>
                                        </div>
                                        <div className="border-notifications">
                                            <p className="title-notifications">Complementamos que</p>
                                            <div className="box-notifications">
                                                <p>Lorem ipsum dolor</p>
                                                <p className="text-lighter txt-notifications">Lorem ipsum dolor sit amet, Consectetur adipisicing elit. Pariatur dolor</p>
                                            </div>
                                        </div>
                                        <input className="inp-cbx" id="site-retirado" type="checkbox" style={noneStyle} defaultChecked />
                                        <label className="cbx" htmlFor="site-retirado">
                                                <span>
                                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                </svg>
                                            </span>
                                            <span>Site retirado do ar.</span>
                                        </label>
                                        <button className="gradient fullcolor btn-finalizar">Finalizar e republicar site</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box-aside alerts notificar" data-aside="notificar">
                        <i className="hide-desk ng-left-arrow-extend arrow-left"></i>
                        <div className="alerts-header">
                            <h2>Notificar</h2>
                            <input id='notificado' type="hidden" />
                        </div>
                        <div className="main-content-aside alerts-contents">
                            <div className="alerts-wrap">
                                <div className="paper flex flex-column">
                                    <div className="flex flex-column">
                                        <div className="paper-options">
                                            <h6>Notificar porque</h6>
                                            <div className="options-checkbox flex">
                                                <input className="inp-cbx" id="cbx-notificar-1" type="checkbox" style={noneStyle} />
                                                <label className="cbx" htmlFor="cbx-notificar-1">
                                                    <span>
                                                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                    </svg>
                                                </span>
                                            </label>
                                                <div className="txt-checkbox">
                                                    <p>Lorem ipsum dolor</p>
                                                    <p>Consectetur adipisicing elit. volup</p>
                                                </div>
                                            </div>
                                            <div className="options-checkbox flex">
                                                <input className="inp-cbx" id="cbx-notificar-2" type="checkbox" style={noneStyle} />
                                                <label className="cbx" htmlFor="cbx-notificar-2">
                                                <span>
                                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                </svg>
                                            </span>
                                        </label>
                                                <div className="txt-checkbox">
                                                    <p>Lorem ipsum dolor</p>
                                                    <p>Consectetur adipisicing elit. volup</p>
                                                </div>
                                            </div>
                                            <div className="options-checkbox flex">
                                                <input className="inp-cbx" id="cbx-notificar-3" type="checkbox" style={noneStyle} />
                                                <label className="cbx" htmlFor="cbx-notificar-3">
                                            <span>
                                                <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                    </label>
                                                <div className="txt-checkbox">
                                                    <p>Lorem ipsum dolor</p>
                                                    <p>Consectetur adipisicing elit. volup</p>
                                                </div>
                                            </div>
                                            <h6>Complementar que</h6>
                                        </div>
                                        <textarea name="" id="msg" rows="6" className="textarea-options"></textarea>
                                        {loading ? <Loader /> : ""}
                                        <input className="inp-cbx" id="cbx-notificar-4" type="checkbox" style={noneStyle} />
                                        <label className="cbx footer-checkbox" htmlFor="cbx-notificar-4">
                                            <span>
                                                <svg width="12px" height="10px" viewBox="0 0 12 10">
                                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                            </svg>
                                        </span>
                                        <span>Retirar site do ar <i className="ng-help-circled"></i></span>
                                    </label>
                                    </div>
                                    <div className="buttons flex flex-space">
                                        <button className="btn-cancelar">Cancelar</button>
                                        <button onClick={() => this.notifiedUser()} className="gradient fullcolor">Notificar usuário</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="box-aside alerts notificar" data-aside="notificar-partir">
                        <i className="hide-desk ng-left-arrow-extend arrow-left"></i>
                        <div className="alerts-header">
                            <i className="ng-left-arrow-extend arrow-left"></i>
                            <h2>Notificar</h2>
                        </div>
                        <div className="alerts-contents">
                            <div className="alerts-wrap">
                                <div className="paper flex flex-column">
                                    <div className="flex flex-column">
                                        <div className="paper-options">
                                            <h6 className="space-left">Notificar a partir de</h6>

                                            <div className="alert-item">
                                                <div className="alert-content box-blue box-purple">
                                                    <div className="flex flex-end flex-space">
                                                        <div>
                                                            <p className="title">Organizador</p>
                                                            <p className="user">Letícia Aragão</p>
                                                            <p className="note">Alterou o horário de evento</p>
                                                            <p className="note history"><span>Anterior:</span> 20:35</p>
                                                            <p className="note history"><span>Alterado:</span> 20:45</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <h6>Notificar porque</h6>
                                            <div className="options-checkbox flex">
                                                <input className="inp-cbx" id="cbx-notificar-5" type="checkbox" style={noneStyle} />
                                                <label className="cbx" htmlFor="cbx-notificar-5">
                                    <span>
                                        <svg width="12px" height="10px" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                            </label>
                                                <div className="txt-checkbox">
                                                    <p>Lorem ipsum dolor</p>
                                                    <p>Consectetur adipisicing elit. volup</p>
                                                </div>
                                            </div>
                                            <div className="options-checkbox flex">
                                                <input className="inp-cbx" id="cbx" type="checkbox" style={noneStyle} />
                                                <label className="cbx" htmlFor="cbx">
                                <span>
                                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </svg>
                            </span>
                        </label>
                                                <div className="txt-checkbox">
                                                    <p>Lorem ipsum dolor</p>
                                                    <p>Consectetur adipisicing elit. volup</p>
                                                </div>
                                            </div>
                                            <div className="options-checkbox flex">
                                                <input className="inp-cbx" id="cbx-notificar-6" type="checkbox" style={noneStyle} />
                                                <label className="cbx" htmlFor="cbx-notificar-6">
                            <span>
                                <svg width="12px" height="10px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </span>
                    </label>
                                                <div className="txt-checkbox">
                                                    <p>Lorem ipsum dolor</p>
                                                    <p>Consectetur adipisicing elit. volup</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="textarea-notificar-partir">
                                            <h6>Complementar que</h6>
                                            <textarea name="" id="" rows="4" className="textarea-options"></textarea>
                                        </div>
                                        <input className="inp-cbx" id="cbx-notificar-7" type="checkbox" style={noneStyle} />
                                        <label className="cbx footer-checkbox" htmlFor="cbx-notificar-7">
                <span>
                    <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
            </span>
            <span>Retirar site do ar <i className="ng-help-circled"></i></span>
        </label>
                                    </div>
                                    <div className="buttons flex flex-space">
                                        <button className="btn-cancelar">Cancelar</button>
                                        <button className="gradient fullcolor">Notificar usuário</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
            
        )
    }

} 

const mapStateToProps = state => ({
    notificar: state.notificar,
    notificacaoAdmin: state.notificacaoAdminReducer
  })

export default connect(mapStateToProps)(Notificacoes);