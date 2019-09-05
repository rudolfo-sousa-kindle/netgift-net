import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';

class EditInvitedOrganizer extends Component {
    render() {
        return(
            <div className="modal modal-white" data-open="usuarios">
                <div className="modal-content">
                    <div className="modal-close">
                        <i className="ng-cancel"></i>
                    </div>

                    <div className="add-usuario-content">
                        <div className="header-modal flex flex-column flex-center">

                            <div className="img-usuarios"><img src="../assets/imgs/modal-user-add.svg" alt="" /></div>

                            <h4 className="title-modal">Adicionar novo usário</h4>
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
                                                    <button className="gradient fullcolor" onClick={(item) => this.configUser(item)}>Adicionar usuário</button>
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
        )
    }
}