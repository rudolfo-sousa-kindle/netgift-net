import React, { Component } from "react";
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import { fetchUsersOrganizer } from '../actions/usersOrganizerActions';
import { fetchDeleteUsers } from '../actions/deleteUsersAction';
import { fetchAddUser } from '../actions/addUserAction';
import { fetchEditUser } from '../actions/editUserAction';
import { fetchUserActive } from '../actions/userActiveAction';
import $ from 'jquery';

class ModalUsuarios extends Component {
    deleteUser(item) {
        let id_event = window.location.pathname.split('/')[3];
        let id_user  = item.id;
        this.props.fetchDeleteUsers(id_event, id_user);
    }

    configUser(item) {
        let inputs   = document.querySelectorAll('[data-open="usuarios"] .informacoes-gerais input');
        let id_event = window.location.pathname.split('/')[3];
        let objAddUser = {};

        inputs = Array.from(inputs);
        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            $('.nb-spinner').show();
            objAddUser.email =         $('[name="email"]').val();
            objAddUser.first_name =    $('[name="first_name"]').val();
            objAddUser.last_name =     $('[name="last_name"]').val();
            objAddUser.telephone_ddd = $('[name="ddd"]').val();
            objAddUser.telephone =     $('[name="telephone"]').val();
            objAddUser.description =   $('[name="description"]').val();
            
            let id_user = localStorage.getItem('id_user');
            if(item.target.innerHTML == 'Adicionar usuário') {
                this.props.fetchAddUser(id_event, id_user, objAddUser);
            } else {
                this.props.fetchEditUser(id_event, id_user, objAddUser); 
            }
        }
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

    userActive(props, id) {
        let objAddUser = {};
        let id_event   = window.location.pathname.split('/')[3];
        let id_user    = $( 'input[type=checkbox][name=user-active' + id + ']' ).parent().find('input').attr('data-key');
        if($( 'input[type=checkbox][name=user-active' + id + ']' ).prop('checked') == true) {
            objAddUser.on_off = 1
            $( 'input[type=checkbox][name=user-active' + id + ']' ).attr('checked', true );
        } else {
            objAddUser.on_off = 0
            $( 'input[type=checkbox][name=user-active' + id + ']' ).attr('checked', false );
        }

        props.fetchUserActive(id_event, id_user, objAddUser);
    }
    
    render() {
        const { usersOrganizer } = this.props;

        return(
            <div className="modal modal-white" data-open="usuarios">
                <div className="modal-content">
                    <div className="modal-close">
                        <i className="ng-cancel"></i>
                    </div>

                    <div className="usuarios-row">

                        <div className="usuarios-content">
                            <div className="header-modal flex flex-column flex-center">

                                <div className="img-usuarios"><img src="../assets/imgs/modal-user.svg" alt="" /></div>

                                <h4 className="title-modal">Usuários</h4>
                                <p className="subtitle-modal">Adicione pessoas de confiança para dividir as responsabilidades da festa com você.</p>

                                <div className="line"></div>
                            </div>

                            <div className="main-modal">
                                <p className="title-main-modal">Usuários</p>

                                <form className="list-card-user-modal">
                                    { 
                                        usersOrganizer.items.length !== 0 ? 
                                        usersOrganizer.items.map((item) => {
                                            return(
                                                <div className="card-user-modal" key={item.id}>
                                                    <div className="avatar-user"></div>
                                                    <div className="name-role flex flex-column">
                                                        <div className="name">{item.first_name} {item.last_name}</div>
                                                        <div className="role">{item.description}</div>
                                                    </div>
                                                    <div className="user-active flex flex-center">
                                                        <span>Usuário Ativo?</span>
                                                        <label className="switch">
                                                            <input name={"user-active" + item.id}
                                                                type="checkbox"
                                                                defaultChecked={item.active}
                                                                value={item.active}
                                                                onChange={() => this.userActive(this.props, item.id)}
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
                                        })
                                        : ''
                                    }
                                </form>


                            </div>

                            <div className="line"></div>

                            <div className="footer-modal flex-column flex flex-center jc-center">

                                <div className="text">
                                    <p className="title">Não encontrou quem você procurava?</p>
                                    <p className="subtitle">Adicione um novo usuário e faça-o parte dessa comemoração também!</p>
                                </div>

                                <button className="mT30 gradient fullcolor open-user-add">Adicionar novo usuário</button>
                            </div>
                        </div>

                        <div className="add-usuario-content">
                            <div className="header-modal flex flex-column flex-center">

                                <div className="img-usuarios"><img src="../assets/imgs/modal-user-add.svg" alt="" /></div>

                                <h4 className="title-modal">Adicionar novo usuário</h4>
                                <p className="subtitle-modal">Adicionar um novo usuário faz com que ele tenha acesso ao site e possa ajudá-lo a organizar a melhor festa.</p>

                                <div className="line"></div>
                            </div>

                            <div className="main-modal novo-usuario">
                                <div className="flex flex-space flex-column">
                                    <div className="card-user-modal w100 add-foto">
                                        <div className="edit-photo">
                                            <div className="flex flex-start flex-center">
                                                <div className="avatar"></div>
                                                <div className="buttons">
                                                    <label htmlFor="avatar-up" className="upload">Adicionar foto</label>
                                                    <button className="disabled excluir">Excluir</button>
                                                </div>

                                                <Field
                                                    name="avatar"
                                                    id="avatar-up"
                                                    component="input"
                                                    type="file"
                                                    hidden={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-default card-user-modal w100">
                                        <div className="flex form-info">
                                            <form className="informacoes-gerais">

                                                <div className="flex flex-center">
                                                    <p className="title">Informações gerais</p>
                                                </div>

                                                <div className="flex flex-column w100">
                                                    <label htmlFor="email-pessoa-1">Email</label>

                                                    <Field
                                                        id="email"
                                                        className="email w100"
                                                        name="email"
                                                        component="input"
                                                        type="email"
                                                        required={true}
                                                    />
                                                </div>

                                                <div className="flex flex-space form-1">
                                                    <div className="flex flex-column">
                                                        <label htmlFor="first_name">Nome</label>
                                                        
                                                        <Field
                                                            id="first_name"
                                                            name="first_name"
                                                            component="input"
                                                            type="text"
                                                            required={true}
                                                        />
                                                    </div>
                                                    <div className="flex flex-column">
                                                        <label htmlFor="last_name">Sobrenome</label>

                                                        <Field
                                                            id="last_name"
                                                            name="last_name"
                                                            component="input"
                                                            type="text"
                                                            required={true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-space form-2">
                                                    <div className="flex flex-column">
                                                        <label htmlFor="ddd">Telefone</label>
                                                        <div className="columns-2">
                                                            <Field
                                                                id="ddd"
                                                                name="ddd"
                                                                component="input"
                                                                type="tel"
                                                                className="ddd"
                                                                required={true}
                                                            />

                                                            <Field
                                                                id="telephone"
                                                                name="telephone"
                                                                component="input"
                                                                type="tel"
                                                                className="telefone"
                                                                required={true}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-column w100">
                                                        <label htmlFor="description">Descrição</label>

                                                        <Field
                                                            id="description"
                                                            name="description"
                                                            component="input"
                                                            type="text"
                                                            required={true}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex mT20 footer-modal">
                                                    <div className="buttons flex flex-space w100">
                                                        <button className="text-gradient border grey open-users">Voltar</button>
                                                        <button className="gradient fullcolor flex" onClick={(item) => this.configUser(item)}> <span className="text-btn-modal">Adicionar usuário</span> <span className="nb-spinner"></span></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
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
        addUser: state.addUser,
        editUser: state.editUser,
        userActive: state.userActive
    };
}

const reduxUser = reduxForm({form: 'addUser'})(ModalUsuarios);

export default connect(mapStateToProps, {fetchUsersOrganizer, fetchDeleteUsers, fetchAddUser, fetchEditUser, fetchUserActive})(reduxUser);