import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {defaultStyle} from "./styleFunctions";
import moment from 'moment';
import $ from "jquery";


import ModalUsuarios from "../components/ModalUsuarios";
import MenuOrganizador from "../components/MenuOrganizador";

import { signOutAction } from '../actions';
import { fetchInvited } from '../actions/invitedAction';
import { fetchEventsByUser } from '../actions/eventsByUserAction';
import { fetchNotificationsUser } from '../actions/notificationsUserAction';
import { fetchUsersOrganizer } from '../actions/usersOrganizerActions';
import { fetchGetEvent } from '../actions/getEventAction'; 

import avatar from "../assets/imgs/avatar_d.svg";

import logo from '../assets/imgs/logo.png';


class HeaderOrganizador extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bank: [],
          events: [],
          user: [],
          events_list: {
            items: []
          }
        }
    }
    
    componentDidMount(){
        let userStorage = JSON.parse(localStorage.getItem('user'));
        if(userStorage){
            this.props.fetchEventsByUser(userStorage.id).then( (res) => {
                if ( ( undefined === this.props.id || '' === this.props.id ) && 0 < Object.getOwnPropertyNames( res ).length ) {
                    window.location.href = '/dashboard/home/' + res[0].event_id;
                }
            });
        }
        
        this.props.fetchNotificationsUser(6);
        this.props.fetchGetEvent(this.props.id);
        this.props.fetchUsersOrganizer(this.props.id);

        var user = localStorage.getItem('user');
        var banks = localStorage.getItem('banks');
        var events = localStorage.getItem('events');
        user = JSON.parse(user);
    
        if(user) { 
            this.setState({
                bank: banks,
                events: events,
                user: user
            })
        }
    }
    
    render() {
        const { eventsByUser, notificationsUser, eventOrganizer } = this.props;
        $('#logout').on("click", function(){
            signOutAction();
        });


        if ( undefined !== eventsByUser && 0 < eventsByUser.items.length ) {
            this.state.events_list = eventsByUser;
        }

        if ( undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 && undefined === eventOrganizer.items.ERROR ) {
            var slug  = eventOrganizer.items.EVENTO.slug;
        }

        return(
            <div>
                <ModalUsuarios />

                <MenuOrganizador id={this.props.id} />

                <header className="roxo">
                    <div className="container">
                        <div className="header-top">
                            <div className="logo">
                                <Link to={'/dashboard/home/' + this.props.id}>
                                    <img src={logo} alt="NetGift" />
                                </Link>
                            </div>
                            <div className="options">
                                <Link to={"/festa/" + slug} className="gradient border"><span>Ver meu site</span></Link>
                                <div className="notification"><span><i className="ng-notification"></i></span>
                                    <div className="notifications">
                                        <div className="flex flex-space flex-end notifications-header">
                                            <div>
                                                <div className="title">Notificações</div>
                                                <div className="subtitle">Confira os últimos acontecimentos da sua festa!</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-column notifications-content">
                                            <div className="day">Hoje</div>
                                            {
                                                notificationsUser.items !== 0 ? 
                                                notificationsUser.items.map((item) => {
                                                    return (
                                                        <div className="card-notification" key={item.id}>
                                                            <div className="thumb green"><img src="../assets/imgs/notification-icon-green.svg" alt="" /></div>
                                                            <div className="desc"><strong>{item.from}</strong> <br />{item.message}</div>
                                                        </div>
                                                    )
                                                })
                                                : ''
                                            }
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="user-info">
                                    <div className="user-avatar"><span style={defaultStyle({backgroundImage: avatar})}></span></div>
                                    <div className="user-name">{this.state.user.first_name + " " + this.state.user.last_name}</div>
                                    <div className="user-infos">
                                        <div className="flex flex-space flex-end user-infos-header">
                                            <div>
                                                <div className="title">{this.state.user.first_name + " " + this.state.user.last_name}</div>
                                                <div className="email">{this.state.user.email}</div>
                                            </div>
                                            <Link to={"/dashboard/editar-perfil/" + this.props.id}>
                                                <button className="gradient border bgwhite">Editar perfil</button>
                                            </Link>
                                        </div>
                                        <div className="flex flex-column">
                                            <a href="/criarFesta" className="user-infos-options">Criar festa</a>
                                            <Link to={"/dashboard/usuarios/" + this.props.id} className="user-infos-options">Usuários</Link>
                                            <button className="user-infos-options logout" id="logout">Logout</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="open-menu">
                                    <span className="menu-icon"></span>
                                </div>
                            </div>
                        </div>
                        <div className="header-bottom">
                            <div>
                                <div className="troca-festa">
                                    <ul>
                                        {
                                            Object.keys(this.state.events_list.items).length !== 0 ? 
                                                this.state.events_list.items.length !== 0 ? this.state.events_list.items.map((item) => {
                                                    
                                                    return (
                                                        <li key={item.event_id}>
                                                            <a href={'/dashboard/home/' + item.event_id} >
                                                                <span className="title">{item.event.name}</span> <span className="date">({moment(item.event.date).format('L')})</span>
                                                            </a>
                                                        </li>
                                                    )
                                                }) 
                                                : ''
                                            : '' 
                                        }
                                    </ul>
                                </div>
                                <h1 className="white toggle-troca-festa">
                                    {
                                        Object.keys(this.state.events_list.items).length !== 0 ? 
                                            this.state.events_list.items.length !== 0 ?
                                            this.state.events_list.items.map((item) => {
                                                return(
                                                    item.event_id == parseInt(this.props.id) ?
                                                    item.event.name : ''
                                                )
                                            })
                                            : ''
                                        : ''
                                    }
                                </h1>
                                <nav>
                                    <ul>
                                        <li className="active"><Link to={"/dashboard/home/" + this.props.id}>Painel de Controle</Link></li>
                                        <li><Link to={"/dashboard/lista-de-presentes/" + this.props.id}>Lista de Presentes</Link></li>
                                        <li><Link to={"/dashboard/site/" + this.props.id}>Site da Festa</Link></li>
                                        <li><Link to={"/dashboard/convidados/" + this.props.id}>Convidados</Link></li>
                                        <li><Link to={"/dashboard/informacoes/" + this.props.id}>Informações</Link></li>
                                        <li><Link to={"/dashboard/financeiro/" + this.props.id}>Financeiro</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <div className="card card-blue card-user">
                                    <div className="flex flex-space flex-center">
                                        <p>Usuários <span>({this.props.usersOrganizer.items.length})</span></p>
                                        <div className="dots open-modal" data-modal="usuarios">
                                            <i className="ng-more"></i>
                                        </div>
                                    </div>
                                    <div className="card-inner">
                                        <div className="cards-group">
                                            <div className="user-card open-modal" data-modal="usuarios">
                                                <div className="flex flex-center">
                                                    <div className="avatar-user" style={defaultStyle({backgroundImage: avatar})}></div>
                                                    <div className="user-name">
                                                        <p>{this.state.user.first_name + " " + this.state.user.last_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-indicator"></div>
                </header>
            </div>    
        )
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error, 
        invited: state.invited,
        eventsByUser: state.eventsByUser,
        notificationsUser: state.notificationsUser,
        usersOrganizer: state.usersOrganizer,
        eventOrganizer: state.eventOrganizer
    };
}

export default connect(mapStateToProps,  {fetchInvited, fetchEventsByUser, fetchNotificationsUser, fetchUsersOrganizer, fetchGetEvent})(HeaderOrganizador);
