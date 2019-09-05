import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchCreateEvent } from '../actions/createEventAction';

import logo from "../assets/imgs/logo-color.png";
import criar_festa_peoples from "../assets/imgs/criar-festa-peoples.png";
import party from "../assets/imgs/party.svg";
import user from "../assets/imgs/user.svg";
import note from "../assets/imgs/note.svg";
import map from "../assets/imgs/map.svg";
import trophy from "../assets/imgs/trophy.svg";


// import "../assets/css/style.css";
import "../assets/css/criar-festa.css";

import "../assets/js/criar-festa";
import $ from 'jquery';
import { NONAME } from "dns";

const styleNone = {
    "display": "none"
}

class CriarFesta extends Component {

    componentDidMount() {
        $( 'body' ).attr( 'class', 'page-criar-festa' );
    }

    createEvent() {
        if($('#endereco-festa').val() !== '') {
            let objEvent    = {};
            objEvent.address = {};
            objEvent.owners = [];
            let verifyChecked = '';
            let fields = $(".etapa-2 .linha");
            let data;
            let iframe = $('#gmap_canvas');

            if( $('[name="tipo_festa"]:checked').val() === 'Infantil' ) {
                objEvent.category_id = 1
            } else if ( $('[name="tipo_festa"]:checked').val() === 'Casamento' ) {
                objEvent.category_id = 2
            } else if ( $('[name="tipo_festa"]:checked').val() === 'Chá de bebê' ) {
                objEvent.category_id = 3
            }
    
            if( $('.switch input').prop('checked') ) {
                verifyChecked = true;
            } else {
                verifyChecked = false;
            }
            
            for(var i = 0; i < fields.length; i++){
                let item = fields[i];
                let nome = $(item).find(".nome").val();
                let nascimento = $(item).find(".nascimento").val();
                let sexo = $(item).find(".sexo").val();
    
                data = {
                    'name': nome,
                    'birthday': moment(nascimento).format().split('T')[0],
                    'sex': sexo
                }
    
                objEvent.owners[i] = data;
            }
    
            objEvent.name           = $('#nome-festa').val();
            objEvent.date           = moment($('#data-festa').val()).format().split('T')[0];
            objEvent.hour           = $('#hora-festa').val();
            objEvent.address.street = $('#endereco-festa').val();
            objEvent.google_robot   = verifyChecked;
            objEvent.name           = $('#nome-festa').val();

            this.props.fetchCreateEvent( objEvent, this.props.history );
        }
    }

    
    criarFesta() {
        console.log( this.props.match.params.type )
        if(this.props.authenticated && localStorage.getItem('user')) {
            return (
                <div className="parent first-div">
                    <header>
                        <div className="container">
                            <div className="logo"><a href="/"><img src={logo} alt="NetGift" /></a></div>
                            <div className="account">
                                <p><span>Não quer criar uma festa agora?</span> <span>Acesse sua conta</span></p>
                                <Link to="/dashboard/home" className="gradient border hover-animation"><span>Minha conta</span></Link>
                            </div>
                        </div>
                    </header>

                    <main>
                        <form className="container" name="criar_festa" id="criar-festa">
                            <div>
                                <div className="dados-crumb">
                                    <div className="dados-1"></div>
                                    <div className="dados-2"></div>
                                    <div className="dados-3"></div>
                                    <div className="dados-4"></div>
                                    <div className="dados-5"></div>
                                </div>

                                <div className="etapa etapa-1 active">
                                    <div className="header">
                                        <h2 className="title">Escolha o tipo de festa</h2>
                                        <p className="subtitle">Ou crie uma festa personalizada</p>
                                    </div>
                                    <div className="tipos-festa">
                                        <input type="radio" name="tipo_festa" id="infantil" defaultChecked={ 'infantil' === this.props.match.params.type ? true : '' } value="Infantil" />
                                        <label htmlFor="infantil" className="festa">
                                            <div className="thumb"></div>
                                            <div className="title">Infantil</div>
                                        </label>

                                        <input type="radio" name="tipo_festa" id="casamento" defaultChecked={ 'casamento' === this.props.match.params.type ? true : '' } value="Casamento" />
                                        <label htmlFor="casamento" className="festa">
                                            <div className="thumb"></div>
                                            <div className="title">Casamento</div>
                                        </label>

                                        <input type="radio" name="tipo_festa" id="adulto" defaultChecked={ 'adulto' === this.props.match.params.type ? true : '' } value="Adulto" />
                                        <label htmlFor="adulto" className="festa">
                                            <div className="thumb"></div>
                                            <div className="title">Adulto</div>
                                        </label>

                                        <input type="radio" name="tipo_festa" id="cha-bebe" defaultChecked={ 'cha-de-bebe' === this.props.match.params.type ? true : '' } value="Chá de Bebê" />
                                        <label htmlFor="cha-bebe" className="festa">
                                            <div className="thumb"></div>
                                            <div className="title">Chá de Bebê</div>
                                        </label>

                                        <input type="radio" name="tipo_festa" id="teen" defaultChecked={ 'teen' === this.props.match.params.type ? true : '' } value="Teen" />
                                        <label htmlFor="teen" className="festa">
                                            <div className="thumb"></div>
                                            <div className="title">Teen</div>
                                        </label>

                                        <input type="radio" name="tipo_festa" id="pet" defaultChecked={ 'pet' === this.props.match.params.type ? true : '' } value="Pet" />
                                        <label htmlFor="pet" className="festa">
                                            <div className="thumb"></div>
                                            <div className="title">Pet</div>
                                        </label>
                                    </div>

                                    <input type="radio" name="tipo_festa" id="personalizada" value="Personalizada" />
                                    <label htmlFor="personalizada" className="personalizada cyan">criar festa personalizada</label>

                                    <div className="continue">
                                        <button className="gradient fullcolor comecar-festa"><span>Continuar</span><i className="ng-right-arrow-extend"></i></button>
                                    </div>
                                </div>

                                <div className="etapa etapa-2">
                                    <div className="header">
                                        <h2 className="title">Cadastre o aniversariante</h2>
                                        <p className="subtitle">Você pode adicionar quantos aniversantes quiser :-)</p>
                                    </div>

                                    <div className="campos">

                                        <div className="adicionar-campo add">
                                            <i className="ng-add"></i>
                                        </div>

                                        <div className="adicionar-campo trash">
                                            <i className="ng-trash"></i>
                                        </div>

                                        <div className="inputs-area">
                                            <div className="linha linha-1"><div className="campo campo-nome"><label htmlFor="nome-1">Nome</label><input required="" type="text" id="nome-1" name="nome_1" className="nome" placeholder="Nome completo" /></div><div className="campo campo-nascimento"><label htmlFor="nascimento-1">Nascimento</label><input required="" type="text" id="nascimento-1" name="nascimento_1" className="nascimento" placeholder="00/00/0000" /></div><div className="campo campo-sexo"><label htmlFor="sexo-1">Sexo</label><select required="" id="sexo-1" name="sexo_1" className="sexo"><option value="" hidden="">Selecione</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div></div>
                                        </div>
                                    </div>
                                    <div className="continue">
                                        <button className="gradient fullcolor comecar-festa"><span>Continuar</span><i className="ng-right-arrow-extend"></i></button>
                                    </div>
                                </div>

                                <div className="etapa etapa-3">
                                    <div className="header">
                                        <h2 className="title">Registre os dados da festa</h2>
                                        <p className="subtitle">Nos conte um pouco sobre a festa...</p>
                                    </div>

                                    <div className="campos">
                                        <div className="linha">
                                            <div className="campo">
                                                <label htmlFor="nome-festa">Nome da Festa</label>
                                                <input type="text" id="nome-festa" name="nome_festa" className="nome" placeholder="Nome da Festa" required />
                                            </div>
                                            <div className="campo">
                                                <label htmlFor="data-festa">Data</label>
                                                <input type="text" id="data-festa" name="data_festa" className="data_festa" placeholder="00/00/0000" required />
                                            </div>
                                            <div className="campo">
                                                <label htmlFor="hora-festa">Hora</label>
                                                <input type="text" id="hora-festa" name="hora_festa" className="data_festa" placeholder="00:00" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="configs">
                                        <p>Privacidade</p>
                                        <div className="config-accordion">

                                            <div className="config-item">
                                                <div className="config-item-title flex flex-center flex-space">
                                                    <label className="switch">
                                                        <input type="checkbox" />
                                                        <span className="slider round"></span>
                                                    </label>
                                                    <p>Exibir nas buscas</p>
                                                    <i className="ng-down-open"></i>
                                                </div>
                                                <div className="config-item-content" style={styleNone}>
                                                    <div className="divider"></div>
                                                    <p className="gray">Seu site será visível em sites de buscas.</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="continue">
                                        <button className="gradient fullcolor comecar-festa"><span>Continuar</span><i className="ng-right-arrow-extend"></i></button>
                                    </div>
                                </div>

                                <div className="etapa etapa-4">
                                    <div className="header">
                                        <h2 className="title">Onde vai acontecer a festa?</h2>
                                        <p className="subtitle">Nos conte um pouco sobre a festa...</p>
                                    </div>

                                    <div className="campos">
                                        <div className="linha">
                                            <div className="campo">
                                                <label htmlFor="endereco-festa">Endereço</label>
                                                <input type="text" id="endereco-festa" name="endereco_festa" className="nome" placeholder="Endereço completo" required />
                                                <div className="loader"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mapa" id="mapa"></div>
                                    <div className="continue">
                                        <button className="gradient fullcolor comecar-festa" onClick={() => this.createEvent()}><span>Finalizar e criar festa</span><i className="ng-right-arrow-extend"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="peoples">
                            <img src={criar_festa_peoples} alt="Pessoas dançando" />
                        </div>
                    </main>

                    <div className="progress">
                        <div className="container">
                            <div className="progress-icon etapa-1 active">
                                <img src={party} alt="etapa 1" />
                            </div>

                            <div className="progress-icon etapa-2">
                                <img src={user} alt="etapa 2" />
                            </div>

                            <div className="progress-icon etapa-3">
                                <img src={note} alt="etapa 3" />
                            </div>

                            <div className="progress-icon etapa-4">
                                <img src={map} alt="etapa 4" />
                            </div>

                            <div className="progress-icon etapa-5">
                                <img src={trophy} alt="etapa 5" />
                            </div>
                        </div>
                        <div id="progress-bar" className="etapa-1"></div>
                    </div>
                </div>
            )
        } else {
            return;
        }
    }

    componentWillMount() {
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
    
        if(this.props.authenticated && user) { 
            this.setState({
                user: user.user
            })
        } 
    }

    render() {
        return (
            <Router>
                {this.criarFesta()}
            </Router>
        );
    }
} 

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        createEvent: state.createEvent
    };
}
  
export default connect(mapStateToProps, {fetchCreateEvent})(CriarFesta);