import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import $ from 'jquery';

import { fetchUsersOrganizer } from '../actions/usersOrganizerActions';
import { fetchUserActive } from '../actions/userActiveAction';
import { fetchDeleteUsers } from '../actions/deleteUsersAction';

class UsuariosOrganizador extends Component {    
    userActive(item, props) {
        let objAddUser = {};
        let id_event   = window.location.pathname.split('/')[3];
        let id_user    = $(item.target).parent().find('input').attr('data-key');

        if($(item.target).prop('checked') == true) {
            objAddUser.on_off = 1
            $( item.target ).attr('checked', true );
        } else {
            objAddUser.on_off = 0
            $( item.target ).attr('checked', false );
        }

        props.fetchUserActive(id_event, id_user, objAddUser);
    }

    deleteUser(item) {
        let id_event = window.location.pathname.split('/')[3];
        let id_user  = item.id;
        this.props.fetchDeleteUsers(id_event, id_user);
    }

    editUser(item) {
        let id_user    = item.id;
        localStorage.setItem('id_user', id_user);

        $('#email').val(item.email);
        $('#first_name').val(item.first_name);
        $('#last_name').val(item.last_name);
        $('#ddd').val(item.telephone_ddd);
        $('#telephone').val(item.telephone);
        $('#description').val(item.description);
    }

    render() {
        const { usersOrganizer } = this.props;
        return (
            <div className="usuarios">
                <div className="container">
                    <div className="summary without-divider">
                        <div className="left">
                            <h2 className="title">Usuários</h2>
                            <p className="subtitle">Adicione pessoas de confiança para dividir as responsabilidades da festa com você.</p>

                            <Link to={"/dashboard/adicionar-usuario/" + this.props.match.params.id} className="gradient fullcolor">Adicionar usuário</Link>
                        </div>
                    </div>

                    { 
                        usersOrganizer.items.length !== 0 ? 
                        usersOrganizer.items.map((item) => {
                            return (
                                <div className="card-user-modal flex-column" key={item.id}>
                                    <div className="avatar-user"></div>
                                    <div className="name-role flex flex-column">
                                        <div className="name">{item.first_name} {item.last_name}</div>
                                        <div className="role">{item.description}</div>
                                    </div>
                                    <div className="user-active flex flex-center flex-column">
                                        <span>Usuário Ativo?</span>
                                        <label className="switch">
                                        <input name={"user-active" + item.id}
                                            type="checkbox"
                                            defaultChecked={item.active}
                                            value={item.active}
                                            onChange={(item) => this.userActive(item, this.props, item.id)}
                                            data-key={item.id} 
                                        />
                                        <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="dots">
                                        <i className="ng-more"></i>
                                        <div className="context-menu">
                                            <button className="item editar" onClick={() => this.editUser(item)}><i className="ng-compose-alt"></i>Editar</button>
                                            <button className="item excluir" onClick={() => this.deleteUser(item)}><i className="ng-trash"></i>Excluir</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ''
                    }

                    <div className="footer-logged">
                        <p>&copy; 2018-2019 NETGIFT - CNPJ 99.304.41/0001-00</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        usersOrganizer: state.usersOrganizer,
        deleteUsers: state.deleteUsers,
        userActive: state.userActive
    };
}

export default connect(mapStateToProps, {fetchUsersOrganizer, fetchUserActive, fetchDeleteUsers})(UsuariosOrganizador);