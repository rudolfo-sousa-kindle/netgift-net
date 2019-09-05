import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import profile from '../assets/imgs/menu-mobile-user.svg';
import balloon from '../assets/imgs/menu-mobile-ballon.svg';
import users from '../assets/imgs/menu-mobile-users.svg';
import bell from '../assets/imgs/menu-mobile-bell.svg';
import arrowLogout from '../assets/imgs/menu-mobile-logout.svg';

import { fetchGetUser } from '../actions/getUserAction';
import { signOutAction } from '../actions';

import { fetchNotificationsUser } from '../actions/notificationsUserAction';
import { fetchUsersOrganizer } from '../actions/usersOrganizerActions';


import $ from 'jquery';

class MenuOrganizador extends Component {
    componentDidMount() {
        let userStorage = JSON.parse(localStorage.getItem('user'))
        
        //this.props.fetchGetUser(userStorage.id)
        this.props.fetchNotificationsUser(6);
        this.props.fetchUsersOrganizer(this.props.id);
    }

    render() {
        const { user, notificationsUser, usersOrganizer } = this.props;

        $('#logout').on("click", function(){
            signOutAction();
        });

        return(
            <div id="menu-mobile">
                <div className="top">
                    <div className="flex flex-center">
                        <div className="avatar"><span></span></div>
                        <div className="flex flex-column">
                            <div className="name">
                                {
                                    user.items.length !== 0 ? user.items.user[0].first_name + ' ' + user.items.user[0].last_name : ''
                                }
                            </div>
                            <div className="email">
                                {
                                    user.items.length !== 0 ? user.items.user[0].email : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="middle">
                    <div className="flex flex-column">
                        <nav>
                            <ul>
                                <li><a href="../convidado/lista-de-presentes.html" className="gradient border"><span>Ver meu site</span></a></li>
                                <li>
                                    <a href={"/dashboard/editar-perfil/" + this.props.id}>
                                        <div className="item">
                                            <div className="item-img"><img src={profile} alt="editar perfil" /></div><span className="item-name">Editar Perfil</span>
                                        </div>
                                        <div className="item-number"></div>
                                    </a>
                                </li>

                                <li>
                                    <a href={"/criarFesta"}>
                                        <div className="item">
                                            <div className="item-img"><img src={balloon} alt="criar festa" /></div><span className="item-name">Criar Festa</span>
                                        </div>
                                        <div className="item-number"></div>
                                    </a>
                                </li>

                                <li>
                                    <a href={"/dashboard/usuarios/" + this.props.id} >
                                        <div className="item">
                                            <div className="item-img"><img src={users} alt="usuários" /></div><span className="item-name">Usuários</span>
                                        </div>
                                        <div className="item-number">
                                            {
                                                usersOrganizer.items.length !== 0 ? usersOrganizer.items.length : ''
                                            }
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href={"/dashboard/notificacoes/" + this.props.id}>
                                        <div className="item notification">
                                            <div className="item-img bell"><img src={bell} alt="Notificações" /></div><span className="item-name">Notificações</span>
                                        </div>

                                        {
                                            notificationsUser.items.length !== 0 ? 
                                                <div className="item-number">{notificationsUser.items.length}
                                                </div>
                                            : ''
                                        }
                                        
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="bottom">
                    <div className="logout">
                        <div className="item flex flex-center">
                            <div className="item-img"><img src={arrowLogout} alt="logout" /></div><span className="item-name" id="logout">Logout</span>
                        </div>
                        <div className="item-number"></div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user,
        notificationsUser: state.notificationsUser,
        usersOrganizer: state.usersOrganizer,
    };
}

export default connect(mapStateToProps,  {fetchGetUser, fetchNotificationsUser, fetchUsersOrganizer})(MenuOrganizador);