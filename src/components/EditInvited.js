import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Field, reduxForm} from 'redux-form';

import { fetchEditInvited } from '../actions/editInvitedAction';

import $ from 'jquery';

class EditInvited extends Component {
    saveInvited() {
        let inputs     = document.querySelectorAll('.modal-invited input');
        let id_event   = window.location.pathname.split('/')[3];
        let id_user    = $('.modal-invited').attr('id');
        let objEditInvited = {};

        objEditInvited.email =         $('.modal-invited [name="email"]').val();
        objEditInvited.name =          $('.modal-invited [name="first_name"]').val() + ' ' + $('.modal-invited [name="last_name"]').val();
        objEditInvited.telephone_ddd = $('.modal-invited [name="ddd"]').val();
        objEditInvited.telephone =     $('.modal-invited [name="telephone"]').val();
        objEditInvited.description =   $('.modal-invited [name="description"]').val();

        this.props.fetchEditInvited(id_event, id_user, objEditInvited); 
        console.log(objEditInvited)
        $('.modal-invited').removeClass('active');

        if(id_user == $('.card-convidados[data-id='+ id_user +']').attr('data-id')) {   
            if($('.modal-invited [name="email"]').val() !== '') {
                $('.card-convidados[data-id='+ id_user +']').find('.text-email').html(objEditInvited.email);
                $('.card-convidados[data-id='+ id_user +']').find('.content-email').show();
            } else {
                $('.card-convidados[data-id='+ id_user +']').find('.content-email').hide();
                $('.card-convidados[data-id='+ id_user +']').find('.content-email').val('');
            }

            if($('.modal-invited [name="telephone"]').val() !== '') {
                $('.card-convidados[data-id='+ id_user +']').find('.text-telephone').html(objEditInvited.telephone_ddd + ' ' + objEditInvited.telephone);
                $('.card-convidados[data-id='+ id_user +']').find('.content-telephone').show();
            } else {
                $('.card-convidados[data-id='+ id_user +']').find('.content-telephone').hide();
                $('.card-convidados[data-id='+ id_user +']').find('.content-telephone').val('');
            }

            $('.card-convidados[data-id='+ id_user +'] .card-convidados-name p').html(objEditInvited.name);
        }
    }

    render() {
        return(
            <div className="modal modal-white modal-invited" data-open="convidados">
                <div className="modal-content">
                    <div className="modal-close">
                        <i className="ng-cancel"></i>
                    </div>

                    <div className="usuarios-row">
                        <div className="add-usuario-content">
                        <div className="main-modal novo-usuario">
                            <div className="flex flex-space flex-column">
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
                                                    <button className="gradient fullcolor" onClick={(item) => this.saveInvited(item)}>Salvar alterações</button>
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

const mapStateToProps = state => ({
    editInvited: state.editInvited
})

const reduxInvited = reduxForm({form: 'editInvited'})(EditInvited);

export default connect(mapStateToProps, {fetchEditInvited})(reduxInvited);