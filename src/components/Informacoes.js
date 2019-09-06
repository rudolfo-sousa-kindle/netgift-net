import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import moment from 'moment';
import $ from 'jquery';
import validate from 'jquery-validation'
import tooltipster from 'tooltipster';

import setTooltipster, { setMessages, setValidate } from '../assets/js/plugins';

import setSelect2 from '../assets/js/setSelect2';
import { fetchGetEvent } from '../actions/getEventAction';
import { fetchGetUser } from '../actions/getUserAction';
import { fetchEditEvent } from '../actions/editEventAction';

class Informacoes extends Component {
    componentDidMount() {
        let objUser = JSON.parse(localStorage.getItem('user'));
        this.props.fetchGetEvent(this.props.match.params.id);
        this.props.fetchGetUser(objUser.id);
        $( '#link-informacoes' ).addClass( 'active' );
        setTooltipster();
        setValidate();
    }

    editEvent(item) {
        let objUser  = JSON.parse(localStorage.getItem('user'));
        let form     = document.querySelectorAll('.informacoes form');
        let inputs   = document.querySelectorAll('.informacoes input');
        let data;
        let objEvent = {};
        let id_event = this.props.match.params.id;
        
        inputs = Array.from(inputs);
        let arrayInputs = inputs.every((element) => {
            return $(element).val() !== '';
        });
        
        if(arrayInputs) {
            var hour   = $('#hora-festa').val().split(':')[0];
            var minute = $('#hora-festa').val().split(':')[1];
            let fields = $(".form-1 .flex.display-block");
            $(item.target).parent().find('.nb-spinner').show();

            let id_user      = objUser.id;
            objEvent.owners  = [];
            objEvent.address = {};
            objEvent.theme_id       = this.props.eventOrganizer.items.EVENTO.theme_id;
            objEvent.category_id    = this.props.eventOrganizer.items.EVENTO.category_id;
            objEvent.google_robot   = this.props.eventOrganizer.items.EVENTO.google_robot;
            objEvent.name           = $('#nome-festa').val();
            objEvent.hour           = hour + ":" + minute;
            objEvent.date           = moment($('#data-festa').val()).format().split('T')[0];
            objEvent.address.street = $('#endereco-festa').val();

            for(var i = 0; i < fields.length; i++){
                let item = fields[i];
                let date = $(item).find(".custom-date").val().split( '/' );
                let nome = $(item).find(".nome_pessoa").val();
                let nascimento = date[2] + '-' + date[1] + '-' + date[0];
                let sexo = $(item).find(".custom-select").val();
                data = {
                    'name': nome,
                    'birthday': nascimento,
                    'sex': sexo
                }
    
                objEvent.owners[i] = data;
            }

            this.props.fetchEditEvent(id_event, objEvent);
        }
    }
    
    render() {
        setSelect2();
        const { eventOrganizer, user } = this.props;

        let objUser = JSON.parse(localStorage.getItem('user'));

        return (
            <div className="info-1">
                <div className="container">
                    <div className="summary without-buttons">
                        <div className="left">
                            <h2 className="title">Informações</h2>
                            <p className="subtitle"></p>
                        </div>
                    </div>

                    <div className="card-default my50 informacoes">
                        <form className="form-1">

                            <div className="flex flex-center title-with-button">
                                <p className="title">Quem está comemorando?</p>
                                <button id="edit-1" className="gradient border bgwhite" ><span>Editar Informações</span></button>
                                <button id="save-1" className="gradient fullcolor bgwhite" onClick={(item) => this.editEvent(item)}><span>Salvar</span> <span className="nb-spinner"></span></button>
                            </div>
                            {
                                undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 && undefined !== eventOrganizer.items.EVENTO && 0 !== Object.keys( eventOrganizer.items.EVENTO.owners ).length ?
                                    eventOrganizer.items.EVENTO.owners.map( ( item, index ) => {
                                        return(
                                        <div className="flex flex-space display-block">
                                            <div className="flex flex-column">
                                                <label htmlFor={"nome-pessoa-" + ( index + 1 )}>Nome Completo</label>
                                                <input type="text" id={"nome-pessoa-" + ( index + 1 )} name={"nome_pessoa_" + ( index + 1 )} className="nome_pessoa" defaultValue={item.name} required readOnly />
                                            </div>

                                            <div className="flex flex-column">
                                                <label htmlFor={"nascimento-pessoa-" + ( index + 1 )}>Data de nascimento</label>
                                                <input type="text" className="custom-date small" id={"nascimento-pessoa-" + ( index + 1 )} name={"nascimento_pessoa_" + ( index + 1 )} defaultValue={moment(item.birthday).format('L')} required readOnly />
                                            </div>

                                            <div className="flex flex-column">
                                                <label htmlFor="sexo-pessoa-1">Sexo</label>
                                                <select className="custom-select small uppercase bg-white flat" id="sexo-pessoa-1" name="sexo_pessoa_1" required readOnly>
                                                    <option value="Masculino" defaultChecked={item.sex === 'Masculino' ? true : false}>Masculino</option>
                                                    <option value="Feminino" defaultChecked={item.sex === 'Feminino' ? true : false}>Feminino</option>
                                                </select>
                                            </div>
                                        </div>
                                        )
                                    })
                                : 
                                <div className="flex flex-space display-block">
                                    <div className="flex flex-column">
                                        <label htmlFor="nome-pessoa-1">Nome Completo</label>
                                        <input type="text" id="nome-pessoa-1" name="nome_pessoa_1" required readOnly />
                                    </div>

                                    <div className="flex flex-column">
                                        <label htmlFor="nascimento-pessoa-1">Data de nascimento</label>
                                        <input type="text" className="custom-date small" id="nascimento-pessoa-1" name="nascimento_pessoa_1" required readOnly />
                                    </div>

                                    <div className="flex flex-column">
                                        <label htmlFor="sexo-pessoa-1">Sexo</label>
                                        <select className="custom-select small uppercase bg-white flat" id="sexo-pessoa-1" name="sexo_pessoa_1" required readOnly>
                                            <option value="m">Masculino</option>
                                            <option value="f">Feminino</option>
                                        </select>
                                    </div>
                                </div>
                            }
                        </form>
                        <form className="form-2">

                            <div className="flex flex-center title-with-button bordertop">
                                <p className="title">Conte-nos sobre a festa</p>
                                <button id="edit-2" className="gradient border bgwhite"><span>Editar Informações</span></button>
                                <button id="save-2" className="gradient fullcolor bgwhite" onClick={(item) => this.editEvent(item)}><span>Salvar</span> <span className="nb-spinner"></span> </button>
                            </div>

                            <div className="flex flex-space display-block">
                                <div className="flex flex-column">
                                    <label htmlFor="nome-festa">Nome da festa</label>
                                    
                                    <input type="text" id="nome-festa" name="nome_festa" defaultValue={eventOrganizer.items !== undefined && eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.name : ''} required readOnly />
                                </div>

                                <div className="flex flex-column">
                                    <label htmlFor="data-festa">Data da festa</label>
                                    <input type="text" className="custom-date small" id="data-festa" name="data_festa" defaultValue={eventOrganizer.items !== undefined && eventOrganizer.items.length !== 0 ? moment(eventOrganizer.items.EVENTO.date).format('L') : ''} required readOnly />
                                </div>

                                <div className="flex flex-column">
                                    <label htmlFor="hora-festa">Hora da festa</label>
                                    <input type="text" className="small flat" id="hora-festa" name="hora_festa" defaultValue={eventOrganizer.items !== undefined && eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.hour : ''} required readOnly />
                                </div>

                            </div>
                            <div className="flex flex-space">
                                <div className="flex flex-column w100">
                                    <label htmlFor="endereco-festa">Endereço da festa <a href="" target="_blank" id="mostrar-mapa" className="text-gradient text-underline">(Mostrar mapa)</a></label>
                                    <input type="text" id="endereco-festa" className="w100" name="endereco_festa" defaultValue={eventOrganizer.items !== undefined && eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.address.street : ''} required readOnly/>
                                </div>
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
    eventOrganizer: state.eventOrganizer,
    user: state.user,
    editEvent: state.editEvent
})

const reduxUser = reduxForm({form: 'editUser'})(Informacoes);

export default connect(mapStateToProps, {fetchGetEvent, fetchGetUser, fetchEditEvent})(reduxUser);