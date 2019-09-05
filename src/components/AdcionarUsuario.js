import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchAddUser } from '../actions/addUserAction';
import { fetchPictureUser } from '../actions/pictureUserAction';
import $ from 'jquery';

class AdcionarUsuario extends Component {
    addUser() {
        let inputs   = document.querySelectorAll('.form-add-user input');
        let id_event = this.props.match.params.id;
        let objAddUser = {};
        inputs = Array.from(inputs);
        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            objAddUser.email =         $('.form-add-user [name="email"]').val();
            objAddUser.first_name =    $('.form-add-user [name="first_name"]').val();
            objAddUser.last_name =     $('.form-add-user [name="last_name"]').val();
            objAddUser.telephone_ddd = $('.form-add-user [name="ddd"]').val();
            objAddUser.telephone =     $('.form-add-user [name="telephone"]').val();
            objAddUser.description =   $('.form-add-user [name="description"]').val();
            
            this.props.fetchAddUser(id_event, objAddUser);
        }
    }

    render() {
        return (
            <div className="editar-perfil novo-usuario">
                <div className="container">
                    <div className="summary without-divider">
                        <div className="left">
                            <h2 className="title">Adicionar novo usuário</h2>
                            <p className="subtitle">Edite seu nome, seu email ou adicione seus dados bancários</p>
                        </div>
                    </div>

                    <div className="flex flex-space flex-column my50">
                        <div className="card-default shadow-77 p30 w100 add-foto">
                            <div className="edit-photo">
                                <div className="flex flex-start flex-center">
                                    <div className="avatar">
                                        <div id="upload-photo-preview"></div>
                                    </div>
                                    <div className="buttons flex">
                                        <label htmlFor="upload-photo" className="upload fileup-btn">Adicionar foto</label>
                                        <button className="disabled excluir">Excluir foto</button>
                                    </div>
                                    <input id="upload-photo" type="file" hidden />
                                </div>
                            </div>
                        </div>

                        <div className="card-default mT20 shadow-77 p30 w100">
                            <div className="flex form-info">
                                <form className="informacoes-gerais">
                                    <div className="form-add-user">
                                        <div className="flex flex-center">
                                            <p className="title">Informações gerais</p>
                                        </div>

                                        <div className="flex flex-space form-1">
                                            <div className="flex flex-column">
                                                <label htmlFor="nome-pessoa-1">Nome</label>
                                                <input type="text" id="nome-pessoa-1" name="first_name" required />
                                            </div>
                                            <div className="flex flex-column">
                                                <label htmlFor="sobrenome-pessoa-1">Sobrenome</label>
                                                <input type="text" id="sobrenome-pessoa-1" name="last_name" required />
                                            </div>
                                        </div>

                                        <div className="flex flex-space form-2">
                                            <div className="flex flex-column">
                                                <label htmlFor="ddd">Telefone</label>
                                                <div className="columns-2">
                                                    <input type="text" className="ddd" id="ddd" name="ddd" maxLength="2" required />
                                                    <input type="text" className="telefone" id="telefone" name="telephone" required />
                                                </div>
                                            </div>

                                            <div className="flex flex-column">
                                                <label htmlFor="email-pessoa-1">Email</label>
                                                <input type="email" className="email" id="email-pessoa-1" name="email" required />
                                            </div>
                                        </div>

                                        <div className="flex flex-space w100">
                                            <div className="flex flex-column w100">
                                                <label htmlFor="descricao">Descrição</label>
                                                <input type="text" id="descricao" name="description" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="buttons-action flex jc-end flex-end">
                                        <div className="buttons">
                                            <button className="text-gradient">Cancelar</button>
                                            <button className="gradient fullcolor" onClick={() => {this.addUser()}} >Adicionar usuário</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>


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
        addUser: state.addUser,
        pictureUser: state.pictureUser
    };
}

export default connect(mapStateToProps, {fetchAddUser, fetchPictureUser})(AdcionarUsuario);