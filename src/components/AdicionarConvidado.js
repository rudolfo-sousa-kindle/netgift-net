import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

import { fetchInvited } from '../actions/invitedAction';
import { fetchSendInvited } from '../actions/sendInviteAction';
import { fetchListGroups } from '../actions/listGroupsAction';
import ResumeOrganizerMobile from './ResumeOrganizerMobile';

import  $ from 'jquery';
import setMask from '../assets/js/mask'

import setTooltipster, { setMessages, setValidate } from '../assets/js/plugins';
import setSelect2 from "../assets/js/setSelect2";

class AdicionarConvidado extends Component {
    componentDidMount(){
        this.props.fetchInvited(this.props.match.params.id);
        this.props.dispatch(fetchListGroups());
        
        setTooltipster();
        setValidate();
        setSelect2();
        setMask();
    }

    sendInvite(element) {
        let inputs = document.querySelectorAll('form[name="dado-convidado"] .column-form input');
        inputs = Array.from(inputs);
        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            $(element.target).find('.nb-spinner').show();
            let objSendInvite           = {};
            let telephone               = $('[name="telefone_convidado"]').val().replace('-', '').replace('(', '').replace(')', '');

            objSendInvite.name          = $('[name="nome_convidado"]').val();
            objSendInvite.email         = $('[name="email_convidado"]').val();
            objSendInvite.telephone     = telephone.split(' ')[1];
            objSendInvite.telephone_ddd = telephone.split(' ')[0];
            objSendInvite.escort_adult  = $('[name="adultos_convidado"]').val() !== '' ? parseInt($('[name="adultos_convidado"]').val()) : 0;
            objSendInvite.escort_child  = $('[name="criancas_convidado"]').val() !== '' ? parseInt($('[name="criancas_convidado"]').val()) : 0;
            objSendInvite.group_id      = parseInt($('[name="grupo_convidado"]').val());

            if(element.target.className === 'gradient border bgwhite') {
                objSendInvite.send_email = false;
            } else if(element.target.className === 'gradient fullcolor' || element.target.className === 'fullcolor gradient w100 flex') {
                objSendInvite.send_email = true;
            }

            console.log($(element.target).find('.nb-spinner'))

            this.props.fetchSendInvited( this.props.match.params.id, objSendInvite );
        }
    }


    render() {
        const { invited, listGroups } = this.props;
        
        return (
            <div className="convidados-2">
                <div className="container">
                    <div className="summary">
                        <div className="left">
                            <h2 className="title">Convidados</h2>
                            {/* <div className="buttons">
                                <button data-href="/logged/convidados-2.html" className="gradient fullcolor">Importar convidados</button>
                            </div> */}
                        </div>
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

                    <div className="card-default shadow-77 my50 mT20">
                        <div className="modal-title">
                            <div className="flex flex-space flex-center">
                                <p>Adicionar Contato</p>
                                <div className="exit-modal"><i className="ng-cancel"></i></div>
                            </div>
                        </div>

                        <form name="dado-convidado">
                            <p className="title hide-mobile">Dados do(a) convidado(a)</p>

                            <div className="flex flex-space column-2 column-form">
                                <div className="flex flex-column">
                                    <label className="hide-mobile" htmlFor="nome-convidado">Qual o nome do convidado?</label>
                                    <label className="hide-desk" htmlFor="nome-convidado">Nome</label>
                                    <Field
                                        name="nome_convidado"
                                        id="nome-convidado"
                                        component="input"
                                        type="text"
                                        required={true}
                                    />
                                </div>

                                <div className="flex flex-column">
                                    <label className="hide-mobile" htmlFor="email-convidado">Para qual email você deseja enviar o convite?</label>
                                    <label className="hide-desk" htmlFor="email-convidado">Email</label>
                                    <Field
                                        name="email_convidado"
                                        id="email-convidado"
                                        component="input"
                                        type="email"
                                        required={true}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-space column-2 column-form">
                                <div className="flex flex-column">
                                    <label className="hide-mobile" htmlFor="telefone-convidado">Quer adicionar um telefone ao contato?</label>
                                    <label className="hide-desk" htmlFor="telefone-convidado">Telefone</label>
                                    <Field
                                        name="telefone_convidado"
                                        id="telefone-convidado"
                                        component="input"
                                        type="tel"
                                        required={true}
                                    />
                                </div>

                                <div className="flex flex-column w100">
                                    <label className="hide-mobile" htmlFor="grupo-convidado">A qual grupo ele(a) pertence?</label>
                                    <label className="hide-desk" htmlFor="grupo-convidado">Grupo</label>
                                    <div className="flex flex-space">
                                        <select className="custom-select uppercase bg-white flat" name="grupo_convidado" id="grupo-convidado">
                                            {
                                                listGroups.items.length !== 0 ? listGroups.items.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                    )
                                                })
                                                : ''
                                            }
                                        </select>
                                        {/* <button className="gradient border bgwhite icon-add-person hide-mobile">
                                            <i className="ng-user-more"></i>
                                        </button> */}
                                    </div>
                                </div>
                            </div>

                            <p className="title my50 bdT">Acompanhantes</p>
                            
                            <div className="flex flex-space flex-end">
                                <div className="flex flex-space column-2 w100">
                                    <div className="flex flex-column">
                                        <label htmlFor="adultos-convidado">Adultos</label>
                                        <Field
                                            name="adultos_convidado"
                                            id="adultos-convidado"
                                            component="input"
                                            type="number"
                                            min="0"
                                        />
                                    </div>

                                    <div className="flex flex-column">
                                        <label htmlFor="criancas-convidado">Crianças</label>
                                        <Field
                                            name="criancas_convidado"
                                            id="criancas-convidado"
                                            component="input"
                                            type="number"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-space hide-mobile">
                                    <div className="buttons flex">
                                        <button className="gradient border bgwhite flex" onClick={(element) => this.sendInvite(element)}>Salvar <span className="nb-spinner"></span></button>

                                        <button className="gradient fullcolor flex" onClick={(element) => this.sendInvite(element)}>Salvar e enviar convite <span className="nb-spinner"></span></button>
                                    </div>
                                </div>
                            </div>

                            <div className="save-modal">
                                <button className="fullcolor gradient w100 flex" onClick={(element) => this.sendInvite(element)}>Convidar <span className="nb-spinner"></span></button>
                            </div>
                        </form>
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
    invited: state.invited,
    sendInvite: state.sendInvite,
    listGroups: state.listGroups
})
  
const reduxSendInvite = reduxForm({form: 'sendInvite'})(AdicionarConvidado);

export default connect(mapStateToProps, {fetchInvited, fetchSendInvited, fetchListGroups})(reduxSendInvite);