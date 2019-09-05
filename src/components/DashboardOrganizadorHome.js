import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Field, reduxForm} from 'redux-form';


import setSelect2 from "../assets/js/setSelect2";
import {setMasonry} from "../assets/js/setMasonry";

import { fetchInvited } from '../actions/invitedAction';
import { fetchGetEvent } from '../actions';
import { fetchDeleteInvited } from '../actions/deleteInvitedAction';
import { fetchSetSlug } from '../actions/setSlugAction';
import { fetchEventsByUser } from '../actions/eventsByUserAction';

import ResumeOrganizer from './ResumeOrganizer';
import EditInvited from './EditInvited';
import Inviteds from './Inviteds';

import anel from "../assets/imgs/anel.png";
import { get } from "http";
import $ from 'jquery';

class DashboardOrganizadorHome extends Component {

    componentDidMount() {
        this.props.fetchInvited(this.props.match.params.id);
        this.props.fetchGetEvent(this.props.match.params.id);
        this.props.fetchEventsByUser(localStorage.getItem('id_user'));
        setSelect2();
        setMasonry();

        var user = localStorage.getItem('user');
        if(user) { 
            this.setState({
                user: user
            })
        }
    }
    
    deleteInvited(item) {
        var event_id = this.props.match.params.id;
        var invited_id = item.id;
        this.props.fetchDeleteInvited({event_id, invited_id});
    }

    setSlug() {
        let objSlug = {}
        let slug = document.querySelector('#endereco-site').value;
        objSlug.slug = slug;
        $('.copy-link .nb-spinner').show();
        this.props.fetchSetSlug(this.props.match.params.id, objSlug);
    }

    filter() {
        setTimeout(() => {
            this.setState({
                current_filter: $( '.badges-filter.active' ).attr( 'data-filter' )
            });
            setMasonry();
        }, 500);
    }

    state = {
        current_filter: 'todos'
    }

    editInvited(item) {
        $('.modal-invited').attr('id', item.id);
        $('.modal-invited [name="email"]').val(item.email);
        $('.modal-invited [name="first_name"]').val(item.first_name);
        $('.modal-invited [name="last_name"]').val(item.last_name);
        $('.modal-invited [name="ddd"]').val(item.ddd);
        $('.modal-invited [name="telephone"]').val(item.telephone);
        $('.modal-invited [name="description"]').val(item.description);
    }
    
    render() {
        const { invited, getEvent } = this.props;
        var owners_names            = '';
        var date_to_event           = '';

        if(getEvent.item !== undefined) {
            var slug = getEvent.item.EVENTO.slug;
            if ( 0 < getEvent.item.EVENTO.owners ) {
                getEvent.item.EVENTO.owners.map(( item, index ) => {
                    owners_names += 0 < index ? ' e ' + item.name : item.name;
                });
            }

            date_to_event = Date.parse( getEvent.item.EVENTO.date );
        }

        date_to_event = Math.round( ( date_to_event - Date.now() ) / ( 1000 * 3600 * 24 ) );


        return (
            <div>
                <EditInvited />
                
                <div className="container">
                    <div className="summary flex-end">
                        <div className="left">
                            <div className="flex flex-column">
                                <div className="welcome">
                                    <div className="flex flex-center">
                                        <img className="anel-welcome" src={anel} alt="" />
                                        <div className="welcome-info flex flex-column">
                                            <p>Olá, { owners_names }</p>
                                            <small>
                                            {
                                                0 < date_to_event ? 'Faltam ' + date_to_event + ' dias para o grande dia, aproveite cada momento.' : ''
                                            }
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-mobile info-saque-mobile">
                                    <p className="info-saque">Informações de Saque e Presentes</p>
                                    <div className="buttons">
                                        <Link to={"/dashboard/lista-de-presentes/" + this.props.match.params.id}>
                                            <button className="gradient fullcolor">Gerenciar lista</button>
                                        </Link>
                                        
                                        <Link to={"/dashboard/financeiro/" + this.props.match.params.id}>
                                            <button className="gradient border"><span>Acessar relatório</span></button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="copy-link">
                                    <div className="flex flex-column">
                                        <label htmlFor="endereco-site">Endereço do seu site</label>
                                        <form className="flex flex-space">
                                            <input type="text" id="endereco-site" name="endereco_site" placeholder="seusite" defaultValue={slug !== undefined ? slug : ''} />
                                            <label className="prefixo" htmlFor="endereco-site">www.netgift.com.br/</label>
                                            <button className="gradient fullcolor flex flex-space" onClick={() => this.setSlug()}>Salvar <span className="nb-spinner"></span> </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <ResumeOrganizer id_event={this.props.match.params.id} />
                    </div>
                
                    <div className="info-mobile info-convidados">
                        <p className="info-mobile info-convidados">Informações de convidados</p>
                        <div className="buttons">
                            <Link to={"/dashboard/convidados/" + this.props.match.params.id}>
                                <button className="gradient fullcolor">Gerenciar lista</button>
                            </Link>
                            
                            <Link to={"/dashboard/adicionar-convidado/" + this.props.match.params.id}>
                                <button className="gradient border">convidar</button>
                            </Link>
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
                                                <span>{invited.items.length !== 0 ? invited.items.Todos : 0}</span>
                                                <p>Pessoas convidadas</p>
                                                <p className="txt-card-mobile">Convidados</p>

                                                <Link to={"/dashboard/convidados/" + this.props.match.params.id}>
                                                    <button className="gradient fullcolor">Gerenciar convidados</button>
                                                </Link>
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
                                                <span>{invited.items.length !== 0 ? invited.items.Confirmado : 0}</span>
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
                                                <span>{invited.items.length !== 0 ? invited.items.Naovai : 0}</span>
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
                                    <button className="badges-filter active" onClick={() => {this.filter()}} data-filter="todos">Todos</button>
                                    <button className="badges-filter" onClick={() => {this.filter()}} data-filter="confirmados">Confirmados</button>
                                    <button className="badges-filter" onClick={() => {this.filter()}} data-filter="nao-comparecera">Não comparecerá</button>
                                    <button className="badges-filter" onClick={() => {this.filter()}} data-filter="respondeu">Não respondeu</button>
                                </div>

                                <div className="flex flex-center">
                                    <Link to={"/dashboard/adicionar-convidado/" + this.props.match.params.id} className="gradient fullcolor">Adicionar convidado</Link>
                                    <Link to={"/dashboard/convidados/" + this.props.match.params.id}>
                                        <button className="gradient border">
                                            <span>ver todos</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="line"></div>

                            <Inviteds 
                                id_event={this.props.match.params.id}
                                filter={this.state.current_filter}
                                order_by={'created_at'}
                                order={'ASC'}
                            />
                        </div>
                    </div>

                    <div className="my50"></div>
                    <div className="footer-logged">
                        <p>&copy; 2018-2019 NETGIFT - CNPJ 99.304.41/0001-00</p>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    deleteInvited: state.deleteInvited,
    invited: state.invited,
    setSlug: state.setSlug,
    eventsByUser: state.eventsByUser,
    getEvent: state.getEvent
})
  
const reduxInvited = reduxForm({form: 'editInvited'})(DashboardOrganizadorHome);

export default connect(mapStateToProps, {fetchInvited, fetchDeleteInvited, fetchSetSlug, fetchEventsByUser, fetchGetEvent})(reduxInvited);