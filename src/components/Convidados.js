import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Inviteds from './Inviteds';
import EditInvited from './EditInvited';
import ResumeOrganizer from './ResumeOrganizer';
import ResumeOrganizerMobile from './ResumeOrganizerMobile';
import Select from 'react-select';
import { CSVLink, CSVDownload } from "react-csv";

// import setSelect2 from '../assets/js/setSelect2';
import {setMasonry} from "../assets/js/setMasonry";
import $ from 'jquery';

import { fetchInvited } from '../actions/invitedAction';
import { fetchSendInvited } from '../actions/sendInviteAction';

class Convidados extends Component {
    componentDidMount() {
        this.props.fetchInvited(this.props.match.params.id);
        setMasonry();
        $( '#link-convidado' ).addClass( 'active' );
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
        current_filter: 'todos',
        order_by: 'created_at',
        order: 'ASC'
    }

    sendInvites(element) {
        var event_id = this.props.match.params.id;
        $(element.target).find('.nb-spinner').show();
        
        this.props.fetchSendInvited( event_id, null, true ).then( ( res ) => {
        });
    }

    ordenation() {
        var new_order_by = 'created_at';
        var new_order    = 'ASC';
        setTimeout(() => {
            let ordenation = $( '#ordenation input[name=ordenation]' ).val();
            switch ( ordenation ) {
                case '1':
                    new_order_by = 'name';
                    new_order    = 'ASC'
                    break;
                case '2':
                    new_order_by = 'name';
                    new_order    = 'DESC'
                    break;
                case '3':
                    new_order_by = 'created_at';
                    new_order    = 'ASC'
                    break;
                case '4':
                    new_order_by = 'created_at';
                    new_order    = 'DESC'
                    break;
            }
            this.setState({
                current_filter: $( '.badges-filter.active' ).attr( 'data-filter' ),
                order_by: new_order_by,
                order: new_order
            });
            this.props.fetchInvited(this.props.match.params.id, new_order_by, new_order);
            setMasonry();
        }, 500);
    }
    
    render() {
        const { invited } = this.props;
        const { items }   = invited;
        const { invites } = items;

        setMasonry();
        return(
            <div className="convidados-1">
                <EditInvited />

                <div className="container">
                    <div className="summary">
                        <div className="left">
                            <h2 className="title">Convidados</h2>
                            <p className="subtitle"></p>
                            <div className="buttons">
                                <Link to={"/dashboard/adicionar-convidado/" + this.props.match.params.id}>
                                    <button className="gradient fullcolor">Convidar</button>
                                </Link>

                                <a href={"/dashboard/configurar-rsvp/" + this.props.match.params.id}>
                                    <button className="gradient border" ><span>Configurar RSVP</span></button>
                                </a>
                            </div>
                        </div>

                        <ResumeOrganizerMobile id_event={this.props.match.params.id} />

                        <div className="brief flex flex-end">
                            <div className="brief content">
                                <p>Resumo</p>
                                <div className="brief-card icon">
                                    <div className="brief-content">
                                        <div className="flex">
                                            <div className="brief-icon">
                                                <i className="ng-gift c-yellow"></i>
                                            </div>
                                            <div className="flex-column">
                                                <span>{invited.items.length !== 0 ? invited.items.Todos : ''}</span>
                                                <p>Pessoas convidadas</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="brief content">
                                <p></p>
                                <div className="brief-card icon">
                                    <div className="brief-content">
                                        <div className="flex">
                                            <div className="brief-icon">
                                                <i className="ng-bars c-yellow"></i>
                                            </div>
                                            <div className="flex-column">
                                                <span>{invited.items.length !== 0 ? invited.items.Confirmado : ''}</span>
                                                <p>Pessoas confirmadas</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="brief content">
                                <p></p>
                                <div className="brief-card icon two">
                                    <div className="brief-content flex flex-center">
                                        <div className="flex">
                                            <div className="brief-icon">
                                                <i className="ng-bag c-yellow"></i>
                                            </div>
                                            <div className="flex-column">
                                                <span>{invited.items.length !== 0 ? invited.items.adultos : ''}</span>
                                                <p>Adultos</p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="brief-icon">
                                                <i className="ng-ballon c-yellow"></i>
                                            </div>
                                            <div className="flex-column">
                                                <span>{invited.items.length !== 0 ? invited.items.criancas : ''}</span>
                                                <p>Crianças</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-space flex-center display-none select-order">
                        <h3>Lista de convidados</h3>
                        <Select
                            onChange={ () => { this.ordenation() } }
                            options={[
                                {value: 1, label: 'A-Z'},
                                {value: 2, label: 'Z-A'},
                                {value: 3, label: 'Mais Novos'},
                                {value: 4, label: 'Mais Antigos'},
                            ]}
                            isSearchable={false}
                            id="ordenation"
                            className="ordenation"
                            name="ordenation"
                            closeMenuOnSelect={true}
                            placeholder="Ordenar por"
                        />
                    </div>

                    <div className="card-default my50 w100 carregar-mais">
                        {/* <form>
                            <input type="text" placeholder="BUSCAR CONVIDADO" className="w100 buscar-convidado" />
                        </form> */}

                        <div className="flex flex-space">
                            <div className="status-filter flex flex-center">
                                <button className="badges-filter active" onClick={() => {this.filter()}} data-filter="todos">Todos</button>
                                <button className="badges-filter" onClick={() => {this.filter()}} data-filter="confirmados">Confirmados</button>
                                <button className="badges-filter" onClick={() => {this.filter()}} data-filter="nao-comparecera">Não comparecerá</button>
                                <button className="badges-filter" onClick={() => {this.filter()}} data-filter="respondeu">Não respondeu</button>
                            </div>
                            <div className="buttons flex flex-center">
                                <button onClick={(element) => {this.sendInvites(element)}} className="gradient fullcolor flex">
                                    Enviar convites
                                    <span className="nb-spinner"></span>
                                </button>
                                {
                                    undefined !== invites ?
                                        <CSVLink data={invites} className="gradient border bgwhite download-csv"><span>Download da lista</span></CSVLink> : ''
                                }
                            </div>
                        </div>

                        <div className="line"></div>

                        <Inviteds 
                            id_event={this.props.match.params.id}
                            filter={this.state.current_filter}
                            order_by={this.state.order_by}
                            order={this.state.order}
                        />
                    </div>

                    <div className="baixar-lista">
                        {
                            undefined !== invites ?
                                <CSVLink data={invites} className="text-gradient underline">BAIXAR LISTA</CSVLink> : ''
                        }
                    </div>

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
    invited: state.invited
})

export default connect(mapStateToProps, {fetchInvited, fetchSendInvited})(Convidados);