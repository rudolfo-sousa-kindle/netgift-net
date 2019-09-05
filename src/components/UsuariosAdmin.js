import React, { Component } from "react";
import {Link } from "react-router-dom";
import { connect } from "react-redux";
import setSelect2 from "../assets/js/setSelect2";
import {setMasonry, reloadUsuariosCard} from "../assets/js/setMasonry";
import {Field, reduxForm} from 'redux-form';
import Loader from "./Loader";
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import $ from "jquery";

import { fetchEvents, fetchFinancial } from "../actions/eventsActions";
import { fetchInvited } from "../actions/invitedAction";
import { setIdNotified } from "../actions/notificarActions";
import { fetchNotificacoesAdminPerUser } from "../actions/notificacoesAdminActions";

import "select2";

import fotoUser from "../assets/imgs/foto-user.png";
import checked from "../assets/imgs/checked.svg";

class UsuariosAdmin extends Component {

  componentDidMount(){
    setSelect2();

    var user_admin = this;

    $( document ).on( 'select2:select', function( event ) {
        var data = event.params.data;
        $( '#status_filter_' + data.id ).val( data.selected );
        user_admin.filter();
    });

    $( document ).on( 'select2:unselect', function( event ) {
        var data = event.params.data;
        $( '#status_filter_' + data.id ).val( data.selected );
        user_admin.filter();
    });

    this.props.dispatch(fetchEvents()).then((res) => {
        // console.log(res)
        setMasonry();
        res.map( ( item ) => {
            item.map( ( event, index ) => {
                if(event.notified){
                    // console.log(event)
                    // Get notifieds per user_id TODO
                }
                this.props.dispatch(fetchFinancial(event.id)).then( ( response ) => {
                    this.setState(( state ) => {
                        var event_id = event.id;
                        state.financials[event_id] = response;
                        return state
                    });
                });
                this.props.dispatch(fetchInvited(event.id)).then( ( response ) => {
                    this.setState(( state ) => {
                        var event_id = event.id;
                        state.inviteds[event_id] = response;
                        return state
                    });
                });
            });
        });
        this.state.page = 2;
    })
  }

  paginate() {
    this.props.dispatch(fetchEvents()).then((res) => {
        // console.log(res)
        res.map( ( item ) => {
            item.map( ( event, index ) => {
                if(event.notified){
                    // console.log(event)
                    // Get notifieds per user_id TODO
                }
                this.props.dispatch(fetchFinancial(event.id)).then( ( response ) => {
                    this.setState(( state ) => {
                        var event_id = event.id;
                        state.financials[event_id] = response;
                        return state
                    });
                });
                this.props.dispatch(fetchInvited(event.id)).then( ( response ) => {
                    this.setState(( state ) => {
                        var event_id = event.id;
                        state.inviteds[event_id] = response;
                        return state
                    });
                });
            });
        });
        this.state.page++;
        setTimeout( function() {
            reloadUsuariosCard();
        }, 1000 );
    })
  }

  filter() {
    var publicado   = '' !== $( '#status_filter_publicado' ).val() ? $( '#status_filter_publicado' ).val() : 'false';
    var suspenso    = '' !== $( '#status_filter_suspenso' ).val() ? $( '#status_filter_suspenso' ).val() : 'false';
    var finalizado  = '' !== $( '#status_filter_finalizado' ).val() ? $( '#status_filter_finalizado' ).val() : 'false';
    var notificados = '' !== $( '#status_filter_notificados' ).val() ? $( '#status_filter_notificados' ).val() : 'false';

    publicado   = 'true' === publicado ? true : null;
    suspenso    = 'true' === suspenso ? true : null;
    finalizado  = 'true' === finalizado ? true : null;
    notificados = 'true' === notificados ? true : null;


    this.props.dispatch(fetchEvents(true, publicado, suspenso, finalizado, notificados)).then((res) => {
        // console.log(res)
        res.map( ( item ) => {
            item.map( ( event, index ) => {
                if(event.notified){
                    // console.log(event)
                    // Get notifieds per user_id TODO
                }
                this.props.dispatch(fetchFinancial(event.id)).then( ( response ) => {
                    this.setState(( state ) => {
                        var event_id = event.id;
                        state.financials[event_id] = response;
                        return state
                    });
                });
                this.props.dispatch(fetchInvited(event.id)).then( ( response ) => {
                    this.setState(( state ) => {
                        var event_id = event.id;
                        state.inviteds[event_id] = response;
                        return state
                    });
                });
            });
        });
        this.state.page     = 2;
        this.state.page_old = 0;
        this.state.events   = [];
        setTimeout( function() {
            reloadUsuariosCard();
        }, 1000 );
    })
  }

  notifiedUser(id){
    this.props.dispatch(setIdNotified(id))
  }

  getDetails(id){
    this.props.dispatch(fetchNotificacoesAdminPerUser(id))
  }

  state = {
    financials: {},
    inviteds: {},
    events: [],
    page: 2,
    page_old: 0,
  };

  render() {

    $('#filter-status').on('select2:select', function (e) {
        var data = e.params.data;
        change(data);
    });

    function change(data){

    }

    const {items, loading, error} = this.props.events;

    if ( this.state.page !== this.state.page_old && 0 !== items.length ) {
        this.state.events = this.state.events.concat( items );
        this.state.page_old = this.state.page;
    }

    var financials;
    var inviteds;

    financials = this.state.financials;
    inviteds   = this.state.inviteds;

    return (
      <div className="wrap-content usuarios">

            <div className="content-title">
                <div className="flex flex-baseline flex-space">
                    <div>
                        <h1>Controle de festas</h1>
                        <h2>Controle o conteúdo das featas publicadas e as notificações de cada usuário</h2>
                    </div>
                    <div className="filter-admin filter-status">
                        <input type="hidden" id="status_filter_publicado" />
                        <input type="hidden" id="status_filter_suspenso" />
                        <input type="hidden" id="status_filter_finalizado" />
                        <input type="hidden" id="status_filter_notificados" />
                        <select name="filter_admin" onChange={() => this.filter()} id="filter-status" className="select-filter-admin select-filter-status" multiple>
                            <option value="publicado">Publicado</option>
                            <option value="suspenso">Suspenso</option>
                            <option value="finalizado">Finalizado</option>
                            <option value="notificados">Notificados</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="content-festas">
                <div className="grid-festas">
                    <div className="box-festas-sizer"></div>
                    {
                        loading ? <Loader /> :
                        this.state.events.map((item, i) => {
                            var user_img = item.created_by.picture_path ? item.created_by.picture_path : fotoUser;
                            return(
                                <div key={i} className="box-festas">
                                    <div className={item.suspended ? "header-festas suspenso" : "header-festas"}>
                                        <p className="event">{item.category.name}</p>
                                        <div className="flex flex-space flex-center">
                                            <h2 className="title-festas">{ item.name }</h2>
                                            {item.notified ? <div className="notification">notificado</div> : "" }
                                        </div>
                                        <p className="date">{`${item.date}`.replace("-", "/")}, {item.hour}</p>
                                        <div className="buttons-festas">
                                            <Link to={'/festa/' + item.id} target="_blank"><button className="gradient fullcolor">Ver site</button></Link>
                                            <button onClick={() => this.notifiedUser(item.id)} className="btn-notificar hover-shadow toggle-aside" data-open="notificar">Notificar usuário</button>
                                        </div>
                                    </div>
                                    <div className="main-festas">
                                        <div className="info-festas">
                                            <div className="dados-festas">
                                                <small className="text-purple">Criado em</small>
                                                <p>{new Date( item.created_at ).toLocaleDateString( 'pt-br' )}</p>
                                            </div>
                                            <div className="dados-festas">
                                                <small className="text-purple">Status</small>
                                                <p><span className={item.suspended ? "icon-status icon-red" : "icon-status icon-green"}></span> {item.suspended ? "Suspenso" : "Publicado"}</p>
                                            </div>
                                        </div>
                                        <div className="info-festas">
                                            <div className="dados-festas">
                                                <small className="text-purple">Convidados</small>
                                                <p>{ undefined !== inviteds[item.id] && '' !== inviteds[item.id] ? inviteds[item.id].Todos : '0' }</p>
                                            </div>
                                            <div className="dados-festas">
                                                <small className="text-purple">Arrecadado</small>
                                                <p>{ undefined !== financials[item.id] ? financials[item.id].dashboard.recebido.toLocaleString( 'pt-br', { style: 'currency', currency: 'BRL' } ) : "" }</p>
                                            </div>
                                        </div>
                                        <div className="perfil-user dados-festas flex">
                                            <img src={user_img} alt="" className="foto-user" />
                                            <div>
                                                <p className="name-user">{item.created_by.first_name} {item.created_by.last_name}</p>
                                                <p className="email-user">{item.created_by.email}</p>
                                                <a href="#" className="text-purple ver-perfil">Ver perfil</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="footer-festas">
                                        <button onClick={() => this.getDetails(item.id)} className="btn-ver-detalhes toggle-aside" data-open="detalhes">ver detalhes (<span>9</span>)</button>
                                    </div>
                                </div>
                            )
                        })
                        
                    }

                    
                </div>
                <button className="btn-large" onClick={() => this.paginate()}>Ver Mais</button>
            </div>

        </div>
    );
  }
}


const mapStateToProps = state => ({
    events: state.eventsAdmin,
    financial: state.financial
  })

const reduxFormFilters = reduxForm({form: 'filters'})(UsuariosAdmin);

export default connect(mapStateToProps, {fetchEvents})(reduxFormFilters);