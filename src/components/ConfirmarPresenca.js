
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import { connect } from "react-redux";

import { fetchConfirmPresence } from '../actions/confirmPresenceAction';
import { fetchGetEvent } from '../actions';

import $ from 'jquery';
import  setTooltipster, { setValidate } from '../assets/js/plugins';

import '../assets/css/style.css';

class ConfirmarPresenca extends Component {
    componentDidMount() {
        // let id_user = localStorage.getItem('id_user');
        // let id_event = localStorage.getItem('id_event');

        // this.props.dispatch(fetchConfirmPresence( { id_user, id_event } ));
        setTooltipster();
        setValidate();
    }

    
    confirmPresence() {
        let inputs = document.querySelectorAll('form[name="confirmar-presenca"] .input-validate');
        inputs = Array.from(inputs);

        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        $('form[name="confirmar-presenca"] .nb-spinner').show();
        $('form[name="confirmar-presenca"] .ng-right-arrow-extend').hide();

        if(arrayInputs) {
            let objConfirmPresence = {};
            objConfirmPresence.telephone_ddd = $('#ddd').val();
            objConfirmPresence.telephone     = $('#tel').val();
            objConfirmPresence.email         = $('#email').val();
            objConfirmPresence.rsvp          = false;
            // let id_user = localStorage.getItem('id_user');
            // let id_event = localStorage.getItem('id_event');
            this.props.fetchConfirmPresence(this.props.id, objConfirmPresence);
        }
    }

    render() {
      return (
        <div className="modal confirmar-presenca">
            <div className="modal-content">
                <span className="icon-close">
                    <i className="ng-cancel"></i>
                </span>

                <div className="ticket">
                    <div className="ticket-title">
                        <div className="ticket-content">
                            <p>CONFIRMAR PRESENÇA</p>
                            <p className="festa-title">{this.props.name}</p>
                            {/* <p>Aenean non malesuada nunc. Nullam ante odio, porttitor non venenatis id.</p> */}
                        </div>
                    </div>

                    <div className="ticket-form">
                        <div className="ticket-content">
                            <form name="confirmar-presenca">
                                <div className="campo">
                                    <label htmlFor="name">Nome</label>
                                    <Field
                                        className="input-validate"
                                        name="name"
                                        id="name"
                                        component="input"
                                        type="text"
                                        required={true}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        className="input-validate"
                                        name="email"
                                        id="email"
                                        component="input"
                                        type="email"
                                        required={true}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="ddd">DDD</label>
                                    <label htmlFor="tel">Telefone</label>
                                    <div className="telefone-ddd">
                                        <div className="ddd">
                                            <Field
                                                className="input-validate"
                                                name="ddd"
                                                id="ddd"
                                                component="input"
                                                type="tel"
                                                required={true}
                                            />
                                        </div>

                                        <div className="telefone">
                                            <Field
                                                className="input-validate"
                                                name="tel"
                                                id="tel"
                                                component="input"
                                                type="tel"
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="campo">
                                    <label htmlFor="resposta">Resposta</label>
                                    <select name="" id="resposta" className="bg-white">
                                        <option defaultValue disabled="disabled" hidden>Você vai a festa?</option>
                                        <option value="Sim">Sim</option>
                                        <option value="Nao">Não</option>
                                    </select>
                                </div>

                                <div className="divider"></div>
                                <div className="title">Acompanhantes</div>

                                <div className="columns-2">
                                    <div className="campo">
                                        <label htmlFor="adulto">Adultos</label>
                                        <Field
                                            name="adulto"
                                            id="adulto"
                                            component="input"
                                            type="number"
                                            min="0"
                                        />
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="crianca">Crianças</label>
                                        <Field
                                            name="crianca"
                                            id="crianca"
                                            component="input"
                                            type="number"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <button className="w100 gradient fullcolor flex flex-center flex-space"  onClick={() => this.confirmPresence()}>
                                    <span>Salvar e confirmar</span>
                                    <span className="nb-spinner"></span>
                                    <i className="ng-right-arrow-extend"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
    }
}

const mapStateToProps = state => ({
    confirmPresence: state.confirmPresence
})
  
const reduxFormConfirPresence = reduxForm({form: 'confirmPresence'})(ConfirmarPresenca);

export default connect(mapStateToProps, {fetchConfirmPresence})(reduxFormConfirPresence);