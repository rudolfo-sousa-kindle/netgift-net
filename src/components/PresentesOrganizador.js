import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchSalutation } from '../actions/salutationAction'; 
import { fetchSalutationActive } from '../actions/salutationActiveAction'; 
import { fetchTax } from '../actions/taxAction'; 
import { fetchGetEvent } from '../actions/getEventAction'; 

import ResumeOrganizer from './ResumeOrganizer';
import ResumeOrganizerMobile from './ResumeOrganizerMobile';

import $ from 'jquery';

class PresentesOrganizador extends Component {
    componentDidMount() {
        this.props.fetchGetEvent(this.props.match.params.id);
    }

    transferTax(item) {
        let objSalutation = {};

        if($(item.target).prop('checked') == true) {
            objSalutation.on_off = 1;
            this.props.fetchTax(this.props.match.params.id, objSalutation);
        } else {
            objSalutation.on_off = 0;
            this.props.fetchTax(this.props.match.params.id, objSalutation);
        }
    }

    sendSalutation(item) {
        item.preventDefault();
        let parentItem = $(item.target).parent().parent();
        if($(parentItem).find('.textarea-mensagem').val() !== '') {
            let objSalutation = {};
            
            objSalutation.salutation = $('.textarea-mensagem').val();
            $('.flex .nb-spinner').css('display', 'inline-block');
            this.props.fetchSalutation(this.props.match.params.id, objSalutation);
        }
    }

    setSalutationActive(item) {
        let objSalutation = {};

        if($(item.target).prop('checked') == true) {
            objSalutation.on_off = 1;
            this.props.fetchSalutationActive(this.props.match.params.id, objSalutation);
            $(item.target).prop('checked', true);
        } else {
            objSalutation.on_off = 0;
            this.props.fetchSalutationActive(this.props.match.params.id, objSalutation);
            $(item.target).prop('checked', false);
        }
    }

    render() {
        const { eventOrganizer } = this.props;

        return(
            <div>                
                <div className="lista-presentes-1">
                    <div className="container">
                        <div className="summary">
                            <div className="left">
                                <h2 className="title">Lista de presentes</h2>
                                <p className="subtitle"></p>
                                <div className="buttons">
                                    <a href={"/dashboard/presentes-recebidos/" + this.props.match.params.id}>
                                        <button className="gradient border">
                                            <span>Presentes recebidos</span>
                                        </button>
                                    </a>
                                </div>
                            </div>

                            <ResumeOrganizerMobile id_event={this.props.match.params.id} />

                            <ResumeOrganizer id_event={this.props.match.params.id} />
                        </div>

                        <div className="brief-card list-card">
                            <div className="brief-content flex-column">
                                <div className="letter-user">
                                    <div className="avatar-user"></div>
                                </div>
                                <small>{undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.category.name : ''}</small>
                                <p className="user-list">{undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.name : ''}</p>
                                <p></p>
                                <Link to={"/dashboard/editar-presentes/" + this.props.match.params.id}>
                                    <button className="gradient fullcolor">
                                        Editar lista
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="configs my50">
                            <p>Configurações</p>
                            <div className="config-accordion">

                                <div className="config-item">
                                    <div className="config-item-title flex flex-center flex-space">
                                        {
                                            undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ?
                                            <label className="switch">
                                                <input type="checkbox" 
                                                    id="checkbox-tax" 
                                                    onChange={(item) => this.transferTax(item)}
                                                    defaultChecked={eventOrganizer.items.EVENTO.tax_to_guest}
                                                    defaultValue={eventOrganizer.items.EVENTO.tax_to_guest}
                                                    
                                                />
                                                <span className="slider round"></span>
                                            </label> : ''

                                        }
                                        <p>Transferir taxas para o convidado</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <div className="config-item-content taxa">
                                        <div className="divider"></div>
                                        <p className="gray">A <strong>NETGIFT&reg;</strong> cobra uma taxa de 5% sobre cada presente adquirido da sua lista. Ativando esta opção, a taxa é acrescida ao valor final de cada produto e você não é descontado em nada.</p>
                                    </div>
                                </div>

                                <div className="config-item salutation">
                                    <div className="config-item-title flex flex-center flex-space">
                                        {
                                            undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ?
                                            <label className="switch">
                                                <input type="checkbox" 
                                                    id="checkbox-salutation"
                                                    onChange={(item) => this.setSalutationActive(item)}
                                                    defaultChecked={eventOrganizer.items.EVENTO.gift_salutation_send}
                                                    defaultValue={eventOrganizer.items.EVENTO.gift_salutation_send}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                            : ''
                                        }
                                        <p>Mensagem de agradecimento</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <form className="config-item-content agradecimento">
                                        <div className="divider"></div>
                                        <p className="blue-small">Texto</p>
                                        
                                        {
                                            undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ? 
                                            <textarea name="" cols="20" rows="5" className="bd-black textarea-mensagem" maxLength="150" required>
                                            {eventOrganizer.items.EVENTO.gift_salutation}
                                            </textarea> : ''
                                        }
                                        
                                        <small><span className="count-js">0</span> de 150 caracteres</small>
                                        <button className="fullcolor gradient w100 flex" onClick={(item) => this.sendSalutation(item)}>
                                            Enviar
                                            <span className="nb-spinner"></span>
                                        </button>
                                    </form>
                                </div>

                                <div className="config-content">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="config-mobile">
                        <div className="config-taxa blue disable">
                            <p className="title-config-mobile disable">Transferir taxas para o convidado</p>

                            {
                                undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ?
                                <label className="switch">
                                    <input type="checkbox" 
                                        data-checked="blue" 
                                        onChange={(item) => this.transferTax(item)} 
                                        defaultChecked={eventOrganizer.items.EVENTO.tax_to_guest}
                                        defaultValue={eventOrganizer.items.EVENTO.tax_to_guest}
                                    />
                                    <span className="slider round"></span>
                                </label> : ''
                            }

                            <p className="txt-config-mobile disable">A <strong>NETGIFT&reg;</strong> cobra uma taxa de 5% sobre cada presente adquirido da sua lista. Ativando esta opção, a taxa é acrescida ao valor final de cada produto e você não é descontado em nada.</p>
                        </div>

                        <form className="config-taxa green disable">
                            <p className="title-config-mobile disable">Mensagem de agradecimento</p>

                            {
                                undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ? 
                                <label className="switch">
                                    <input type="checkbox" 
                                        data-checked="green" 
                                        onChange={(item) => this.setSalutationActive(item)}
                                        defaultChecked={eventOrganizer.items.EVENTO.gift_salutation_send}
                                        defaultValue={eventOrganizer.items.EVENTO.gift_salutation_send}
                                    />
                                    <span className="slider round"></span>
                                </label> : ''
                            }

                            <p className="txt-config-mobile disable">Você pode configurar uma mensagem para ser enviada após um convidado comprar um presente da sua lista.</p>

                            <div className="flex flex-center flex-space options">
                                <button className="btn-taxa btn-editar-mensagem">Editar mensagem</button>

                                <buttton className="btn-taxa btn-salvar" onClick={(item) => this.sendSalutation(item)}>Salvar <span className="nb-spinner"></span></buttton>
                            </div>

                            {
                                undefined !== eventOrganizer.items && eventOrganizer.items.length !== 0 ? 
                                <textarea name="" cols="20" rows="5" className="textarea-mensagem" maxLength="150" required>
                                {eventOrganizer.items.EVENTO.gift_salutation}
                                </textarea> : ''
                            }
                            <small><span className="count-js">0</span> de 150 caracteres</small>
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
    salutation: state.salutation,
    salutationActive: state.salutationActive,
    tax: state.tax,
    eventOrganizer: state.eventOrganizer
})
  

export default connect(mapStateToProps, {fetchSalutation, fetchSalutationActive, fetchTax, fetchGetEvent})(PresentesOrganizador);