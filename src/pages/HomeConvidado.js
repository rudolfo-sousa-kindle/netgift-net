import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/pt-br'

import $ from 'jquery';

import ConfirmarPresenca from '../components/ConfirmarPresenca';
import { fetchGetEvent } from '../actions';
import { fetchThemeConfigurations } from '../actions/themeConfigurationsAction';
import { bgImage, defaultStyle, bgColor } from "../components/styleFunctions";

import logo from '../assets/imgs/logo.png';
import img1 from '../assets/imgs/jogo-de-cama.png';
import img2 from '../assets/imgs/maquina-de-lavar.png';
import galeriaTemplate from "../assets/imgs/header-galeria-de-templates.png";

import '../assets/js/script';
import '../assets/js/plugins';

import '../assets/css/style-theme.css';

class HomeConvidado extends Component {
    componentDidMount() {

        this.props.fetchGetEvent(this.props.match.params.id).then( (res) => {
          this.setState({
            event: res
          });
        } );

    }

    state = {
      event: []
    }

    render() {

        const { id } = this.props.match.params;
        const event_home_link = "/festa/" + id;
        const event_history_link = "/festa/" + id + "/#nossa-historia";
        const event_godparents_link = "/festa/" + id + "/#padrinhos";
        const event_location_link = "#localizacao";
        const event_pictures_link = "/festa/" + id + "/#fotos";
        const event_gifts_link = "/festa/" + id + "/lista-de-presentes";
        const event_cart_link = "/festa/" + id + "/carrinho";
        const { error, loading, fetchThemeConfigurations, event } = this.props;

        moment.locale('pt-br');

        if(this.state.event.length !== 0) {
            var id_event   = this.state.event.EVENTO.id;
            var name_event = this.state.event.EVENTO.name;
        }


        var sessions = {};

        sessions['header'] = {};
        sessions['header']["titulo"] = {};
        sessions['header']["data"] = {};
        sessions['header']["cta_presentear"] = {};
        sessions['header']["cta_confirmar_presenca"] = {};
        sessions['header']["faltam_n_dias"] = {};
        sessions['header']["background"] = {};

        sessions['saudacao'] = {};
        sessions['saudacao']["titulo"] = {};
        sessions['saudacao']["descricao"] = {};
        sessions['saudacao']["background"] = {};

        sessions['localizacao'] = {};
        sessions['localizacao']["titulo"] = {};
        sessions['localizacao']["data"] = {};
        sessions['localizacao']["endereco"] = {};
        sessions['localizacao']["background"] = {};

        sessions['fotos'] = {}
        sessions['fotos']["titulo"] = {};
        sessions['fotos']["background"] = {};

        sessions['rodape'] = {};
        sessions['rodape']["titulo"] = {};
        sessions['rodape']["cta_presentear"] = {};
        sessions['rodape']["cta_confirmar_presenca"] = {};
        sessions['rodape']["faltam_n_dias"] = {};
        sessions['rodape']["background"] = {};

        sessions['casamento-welcome'] = {};
        sessions['casamento-welcome']["casament-welcome-titulo"] = {};
        sessions['casamento-welcome']["casament-welcome-description"] = {};
        sessions['casamento-welcome']["casamento-welcome-background"] = {};

        sessions['casamento-about'] = {};
        sessions['casamento-about']["casamento-about-titulo"] = {};
        sessions['casamento-about']["casamento-about-description"] = {};
        sessions['casamento-about']["casamento-about-background"] = {};

        sessions['casamento-padrinhos'] = {};
        sessions['casamento-padrinhos']["casamento-padrinhos-title"] = {};
        sessions['casamento-padrinhos']["casamento-padrinhos-description"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho-titulo"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho-description"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho1-titulo"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho1-descricao"] = {};
        sessions['casamento-padrinhos']["casamento-padrinhos-background"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho2-titulo"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho2-descricao"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho3-titulo"] = {};
        sessions['casamento-padrinhos']["casamento-padrinho3-descricao"] = {};
        
        if(this.state.event.template !== undefined) {
          this.state.event.template.sessions.map((sess) => {

              sess.sub_sessions.map((subSess) => {
                  subSess.features.map( ( feature ) => {
                      sessions[sess.session][subSess.sub_session][feature.name] = feature.value;
                  });
              })
          })
           var textAlignTitle           = this.state.event.template.sessions[0].sub_sessions[0].features[3].value;
           var fontSizeTitle            = this.state.event.template.sessions[0].sub_sessions[0].features[5].value;
           var colorTitle               = this.state.event.template.sessions[0].sub_sessions[0].features[6].value;
           var backgroundColorTitle     = this.state.event.template.sessions[0].sub_sessions[0].features[7].value;
           var fontFamilyTitle          = this.state.event.template.sessions[0].sub_sessions[0].features[8].value;
           
           var textAlignDate            = this.state.event.template.sessions[0].sub_sessions[1].features[3].value;
           var fontSizeDate             = this.state.event.template.sessions[0].sub_sessions[1].features[5].value;
           var colorDate                = this.state.event.template.sessions[0].sub_sessions[1].features[6].value;
           var backgroundColorDate      = this.state.event.template.sessions[0].sub_sessions[1].features[7].value;
           var fontFamilyDate           = this.state.event.template.sessions[0].sub_sessions[1].features[8].value;

           var textAlignBtnHeader       = this.state.event.template.sessions[0].sub_sessions[2].features[3].value;
           var fontSizeBtnHeader        = this.state.event.template.sessions[0].sub_sessions[2].features[5].value;
           var colorBtnHeader           = this.state.event.template.sessions[0].sub_sessions[2].features[6].value;
           var backgroundColorBtnHeader = this.state.event.template.sessions[0].sub_sessions[2].features[7].value;
           var fontFamilyBtnHeader      = this.state.event.template.sessions[0].sub_sessions[2].features[8].value;
           
           var textAlignConfirmHeader       = this.state.event.template.sessions[0].sub_sessions[3].features[3].value;
           var fontSizeConfirmHeader        = this.state.event.template.sessions[0].sub_sessions[3].features[5].value;
           var colorConfirmHeader           = this.state.event.template.sessions[0].sub_sessions[3].features[6].value;
           var backgroundColorConfirmHeader = this.state.event.template.sessions[0].sub_sessions[3].features[7].value;
           var fontFamilyConfirmHeader      = this.state.event.template.sessions[0].sub_sessions[3].features[8].value;

           var textAlignDays       = this.state.event.template.sessions[0].sub_sessions[4].features[3].value;
           var fontSizeDays        = this.state.event.template.sessions[0].sub_sessions[4].features[5].value;
           var colorDays           = this.state.event.template.sessions[0].sub_sessions[4].features[6].value;
           var backgroundColorDays = this.state.event.template.sessions[0].sub_sessions[4].features[7].value;
           var fontFamilyDays      = this.state.event.template.sessions[0].sub_sessions[4].features[8].value;

           var textAlignSalutationTitle       = this.state.event.template.sessions[1].sub_sessions[0].features[3].value;
           var fontSizeSalutationTitle        = this.state.event.template.sessions[1].sub_sessions[0].features[5].value;
           var colorSalutationTitle           = this.state.event.template.sessions[1].sub_sessions[0].features[6].value;
           var backgroundColorSalutationTitle = this.state.event.template.sessions[1].sub_sessions[0].features[7].value;
           var fontFamilySalutationTitle      = this.state.event.template.sessions[1].sub_sessions[0].features[8].value;
           
           var textAlignSalutationDescription       = this.state.event.template.sessions[1].sub_sessions[1].features[3].value;
           var fontSizeSalutationDescription        = this.state.event.template.sessions[1].sub_sessions[1].features[5].value;
           var colorSalutationDescription           = this.state.event.template.sessions[1].sub_sessions[1].features[6].value;
           var backgroundColorSalutationDescription = this.state.event.template.sessions[1].sub_sessions[1].features[7].value;
           var fontFamilySalutationDescription      = this.state.event.template.sessions[1].sub_sessions[1].features[8].value;

           var textAlignTitleLocation       = this.state.event.template.sessions[2].sub_sessions[0].features[3].value;
           var fontSizeTitleLocation        = this.state.event.template.sessions[2].sub_sessions[0].features[5].value;
           var colorTitleLocation           = this.state.event.template.sessions[2].sub_sessions[0].features[6].value;
           var backgroundColorTitleLocation = this.state.event.template.sessions[2].sub_sessions[0].features[7].value;
           var fontFamilyTitleLocation      = this.state.event.template.sessions[2].sub_sessions[0].features[8].value;

           var textAlignDateLocation       = this.state.event.template.sessions[2].sub_sessions[1].features[3].value;
           var fontSizeDateLocation        = this.state.event.template.sessions[2].sub_sessions[1].features[5].value;
           var colorDateLocation           = this.state.event.template.sessions[2].sub_sessions[1].features[6].value;
           var backgroundColorDateLocation = this.state.event.template.sessions[2].sub_sessions[1].features[7].value;
           var fontFamilyDateLocation      = this.state.event.template.sessions[2].sub_sessions[1].features[8].value;

           var textAlignAddressLocation       = this.state.event.template.sessions[2].sub_sessions[2].features[3].value;
           var fontSizeAddressLocation        = this.state.event.template.sessions[2].sub_sessions[2].features[5].value;
           var colorAddressLocation           = this.state.event.template.sessions[2].sub_sessions[2].features[6].value;
           var backgroundColorAddressLocation = this.state.event.template.sessions[2].sub_sessions[2].features[7].value;
           var fontFamilyAddressLocation      = this.state.event.template.sessions[2].sub_sessions[2].features[8].value;

           var textAlignTitlePhotos       = this.state.event.template.sessions[3].sub_sessions[0].features[3].value;
           var fontSizeTitlePhotos        = this.state.event.template.sessions[3].sub_sessions[0].features[5].value;
           var colorTitlePhotos           = this.state.event.template.sessions[3].sub_sessions[0].features[6].value;
           var backgroundColorTitlePhotos = this.state.event.template.sessions[3].sub_sessions[0].features[7].value;
           var fontFamilyTitlePhotos      = this.state.event.template.sessions[3].sub_sessions[0].features[8].value;

           var textAlignTitlePhotos       = this.state.event.template.sessions[3].sub_sessions[0].features[3].value;
           var fontSizeTitlePhotos        = this.state.event.template.sessions[3].sub_sessions[0].features[5].value;
           var colorTitlePhotos           = this.state.event.template.sessions[3].sub_sessions[0].features[6].value;
           var backgroundColorTitlePhotos = this.state.event.template.sessions[3].sub_sessions[0].features[7].value;
           var fontFamilyTitlePhotos      = this.state.event.template.sessions[3].sub_sessions[0].features[8].value;

           var textAlignTitleFooter       = this.state.event.template.sessions[4].sub_sessions[0].features[4].value;
           var fontSizeTitleFooter        = this.state.event.template.sessions[4].sub_sessions[0].features[5].value;
           var colorTitleFooter           = this.state.event.template.sessions[4].sub_sessions[0].features[6].value;
           var backgroundColorTitleFooter = this.state.event.template.sessions[4].sub_sessions[0].features[7].value;
           var fontFamilyTitleFooter      = this.state.event.template.sessions[4].sub_sessions[0].features[8].value;

           var textAlignDaysFooter       = this.state.event.template.sessions[4].sub_sessions[1].features[4].value;
           var fontSizeDaysFooter        = this.state.event.template.sessions[4].sub_sessions[1].features[5].value;
           var colorDaysFooter           = this.state.event.template.sessions[4].sub_sessions[1].features[6].value;
           var backgroundColorDaysFooter = this.state.event.template.sessions[4].sub_sessions[1].features[7].value;
           var fontFamilyDaysFooter      = this.state.event.template.sessions[4].sub_sessions[1].features[8].value;

           var textAlignBtnFooter       = this.state.event.template.sessions[4].sub_sessions[2].features[4].value;
           var fontSizeBtnFooter        = this.state.event.template.sessions[4].sub_sessions[2].features[5].value;
           var colorBtnFooter           = this.state.event.template.sessions[4].sub_sessions[2].features[6].value;
           var backgroundColorBtnFooter = this.state.event.template.sessions[4].sub_sessions[2].features[7].value;
           var fontFamilyBtnFooter      = this.state.event.template.sessions[4].sub_sessions[2].features[8].value;

           var textAlignBtnFooter       = this.state.event.template.sessions[4].sub_sessions[2].features[4].value;
           var fontSizeBtnFooter        = this.state.event.template.sessions[4].sub_sessions[2].features[5].value;
           var colorBtnFooter           = this.state.event.template.sessions[4].sub_sessions[2].features[6].value;
           var backgroundColorBtnFooter = this.state.event.template.sessions[4].sub_sessions[2].features[7].value;
           var fontFamilyBtnFooter      = this.state.event.template.sessions[4].sub_sessions[2].features[8].value;

           var textAlignConfirmFooter       = this.state.event.template.sessions[4].sub_sessions[3].features[4].value;
           var fontSizeConfirmFooter        = this.state.event.template.sessions[4].sub_sessions[3].features[5].value;
           var colorConfirmFooter           = this.state.event.template.sessions[4].sub_sessions[3].features[6].value;
           var backgroundColorConfirmFooter = this.state.event.template.sessions[4].sub_sessions[3].features[7].value;
           var fontFamilyConfirmFooter      = this.state.event.template.sessions[4].sub_sessions[3].features[8].value;
           
           var date    = moment(this.state.event.EVENTO.date).format('LL');
           var street  = this.state.event.EVENTO.address.street;
           var pathImg = this.state.event.template.sessions[3].sub_sessions[1].features[1].value
        }

        
        function MenuFesta(props) {
            if(event !== undefined) {
                var tipoFesta = props.tipoFesta[0].thematic_id;
            }
            
            if (tipoFesta === 5) {
              return <ul className="flex">
                        <li><a href="#nossa-historia" className="white-underline link-menu scroll-link">Nossa História</a></li>

                        <li><a href="#padrinhos" className="white-underline link-menu scroll-link">Padrinhos</a></li>
                        
                        <li><a href='#localizacao' className="white-underline link-menu scroll-link">Local da Festa</a></li>

                        <li><a href='#fotos' className="white-underline link-menu scroll-link">Nossas fotos</a></li>

                        <li className="logo-list">
                            <Link to={event_home_link}>
                                <img src={logo} alt="NetGift" />
                            </Link>
                        </li>
                    </ul>;
            }
            return <ul className="flex">
                        <li><Link to={event_home_link} className="white-underline link-menu">Início</Link></li>

                        <li><a href='#localizacao' className="white-underline link-menu scroll-link">Local da Festa</a></li>

                        <li><a href='#fotos' className="white-underline link-menu scroll-link">Nossas fotos</a></li>

                        <li className="logo-list">
                            <Link to={event_home_link}>
                                <img src={logo} alt="NetGift" />
                            </Link>
                        </li>
                    </ul>;
        }

        function AvatarFesta(props) {
            if(event !== undefined) {
                var tipoFesta = props.tipoFesta[0].thematic_id;
            }
            
            if (tipoFesta !== 5) {
                return <div className="container-editor">
                            <div id="avatar-about" className="element avatar" style={defaultStyle({bgColor: event !== undefined ? event.EVENTO.salutation.img : ''})}></div>
                        </div>
            }

            return false;
        }

        function SectionCasal(props) {
            if(event !== undefined) {
                var tipoFesta = props.tipoFesta[0].thematic_id;
            }

            if (tipoFesta === 5) {
                return <div className="content-couple flex-column flex" id="nossa-historia">
                            <div className="photo-couple flex">
                                <img src={img1} alt="img 1" />
                                <img src={img2} alt="img 2" />
                            </div>

                            <p id="titulo-about" className="element title-content">Nossa história</p>

                            <p className="text-couple">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                        </div>

            }

            return false;
        }

        function SectionPadrinhos(props) {
            if(event !== undefined) {
                var tipoFesta = props.tipoFesta[0].thematic_id;
            }

            if (tipoFesta === 5) {
                    return  <div className="theme-site-godparents" id="padrinhos">
                                <div className="content-godparents flex flex-column">
                                    <div className="text-main-godparents">
                                        <h3 id="titulo-about" className="element title-content">Nossa padrinhos</h3>

                                        <p className="text-couple">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
                                    </div>

                                    <div className="godparents flex">
                                        <div className="godparent flex flex-column flex-center">
                                            <div className="photo-godparents">
                                                <img src={img1} alt="img 1" />
                                                <img src={img2} alt="img 2" />
                                            </div>
                                            
                                            <div className="text-godparents">
                                                <h3>Victor e Luiza</h3>
                                                
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
                                            </div>
                                        </div>

                                        <div className="godparent flex flex-column flex-center">
                                            <div className="photo-godparents">
                                                <img src={img1} alt="img 1" />
                                                <img src={img2} alt="img 2" />
                                            </div>
                                            
                                            <div className="text-godparents">
                                                <h3>Victor e Luiza</h3>
                                                
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
                                            </div>
                                        </div>

                                        <div className="godparent flex flex-column flex-center">
                                            <div className="photo-godparents">
                                                <img src={img1} alt="img 1" />
                                                <img src={img2} alt="img 2" />
                                            </div>

                                            <div className="text-godparents">
                                                <h3>Victor e Luiza</h3>
                                                
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut </p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
            }

            return false;
        }

      if ( this.state.event.EVENTO !== undefined ) {

        return (
          <div className="w100 theme-site convidado area-convidado">
              
              <ConfirmarPresenca id={id_event} name={name_event} />

              <div className="theme-site-header" style={defaultStyle({backgroundImage:sessions.header.background.imagem, backgroundColor: sessions.header.background.fundo_cor})}>
                 <header className="webdoor">
                      <div className="container">
                          <div className="menu flex flex-space flex-center">
                              <nav className="flex">
                                  <Link to={event_home_link} className="logo"><img src={logo} alt="NetGift" /></Link>
                                  <MenuFesta tipoFesta={this.state.event.EVENTO !== undefined ? this.state.event.template.thematics: ''} />     
                              </nav>

                              <div className="nav-right flex flex-center">
                                  <button className="btn toggle-modal-confirmar-presenca" data-modal="confirmar-presenca"><span className="link-menu">Confirmar presença</span></button>
                                  <Link to={event_gifts_link} className="btn gradient border hover-animation"><span>Lista de presentes</span></Link>

                                  <Link to={event_cart_link} >
                                      <button className="btn-carrinho gradient fullcolor">
                                          <i className="ng-shopping-cart-alt"></i>
                                      </button>
                                  </Link>
                                  
                                  <div className="menu-mobile open-menu">
                                      <span className="menu-icon"></span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </header>

                  <div className="container-editor" style={defaultStyle({textAlign: sessions.header.titulo.alinhamento})}>

                      <p id="titulo-header" 
                          style={defaultStyle({fontSize: sessions.header.titulo.texto_fonte_tamanho, textAlign: sessions.header.titulo.alinhamento, color: sessions.header.titulo.texto_fonte_cor, backgroundColor: sessions.header.titulo.texto_fundo_cor, fontFamily: sessions.header.titulo.estilo, fontWeight: sessions.header.titulo.negrito})}

                          className='element'
                      >
                          {this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.name: ''}
                      </p>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.header.data.alinhamento})}>
                      <p id="data-header"
                          style={defaultStyle({fontSize: sessions.header.data.texto_fonte_tamanho, textAlign: sessions.header.data.alinhamento, color: sessions.header.data.texto_fonte_cor, backgroundColor: sessions.header.data.texto_fundo_cor, fontFamily: sessions.header.data.estilo, fontWeight: sessions.header.data.negrito})}

                          className='element'
                      >
                          {this.state.event.EVENTO !== undefined ? date:''}
                      </p>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.header.cta_presentear.alinhamento})}>
                      <Link id="cta-primary-header" to={event_gifts_link} style={defaultStyle({fontSize: sessions.header.cta_presentear.texto_fonte_tamanho, textAlign: sessions.header.cta_presentear.alinhamento, color: sessions.header.cta_presentear.texto_fonte_cor, backgroundColor: sessions.header.cta_presentear.texto_fundo_cor, fontFamily: sessions.header.cta_presentear.estilo, fontWeight: sessions.header.cta_presentear.negrito})} className='btn-cta btn-cta-primary'
                      >Presentear aniversariante</Link>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.header.cta_confirmar_presenca.alinhamento})}>
                      <p id="cta-secondary-header" className=" btn-cta btn-cta-secondary" data-modal="confirmar-presenca" style={defaultStyle({fontSize: sessions.header.cta_confirmar_presenca.texto_fonte_tamanho, textAlign: sessions.header.cta_confirmar_presenca.alinhamento, color: sessions.header.cta_confirmar_presenca.texto_fonte_cor, backgroundColor: sessions.header.cta_confirmar_presenca.texto_fundo_cor, fontFamily: sessions.header.cta_confirmar_presenca.estilo, fontWeight: sessions.header.cta_confirmar_presenca.negrito})}>Confirmar presença</p>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.header.faltam_n_dias.alinhamento})}>
                      <p id="contagem-header" className="element" style={defaultStyle({fontSize: sessions.header.faltam_n_dias.texto_fonte_tamanho, textAlign: sessions.header.faltam_n_dias.alinhamento, color: sessions.header.faltam_n_dias.texto_fonte_cor, backgroundColor: sessions.header.faltam_n_dias.texto_fundo_cor, fontFamily: sessions.header.faltam_n_dias.estilo, fontWeight: sessions.header.faltam_n_dias.negrito})}>Faltam 00 dias</p>
                  </div>
              </div>

              <div className="theme-site-about" style={defaultStyle({backgroundImage:sessions.saudacao.background.imagem, backgroundColor: sessions.saudacao.background.fundo_cor})}>

                  <AvatarFesta tipoFesta={this.state.event.EVENTO !== undefined ? this.state.event.template.thematics: ''} />

                  <div className="container-editor" style={defaultStyle({textAlign: sessions.saudacao.titulo.alinhamento})}>
                      <p id="titulo-about" className="element title-content" style={defaultStyle({fontSize: sessions.saudacao.titulo.texto_fonte_tamanho, textAlign: sessions.saudacao.titulo.alinhamento, color: sessions.saudacao.titulo.texto_fonte_cor, backgroundColor: sessions.saudacao.titulo.texto_fundo_cor, fontFamily: sessions.saudacao.titulo.estilo, fontWeight: sessions.saudacao.titulo.negrito})}>{this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.salutation.title: ''}</p>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.saudacao.descricao.alinhamento})}>
                      <p id="descricao-about" className="element" style={defaultStyle({fontSize: sessions.saudacao.descricao.texto_fonte_tamanho, textAlign: sessions.saudacao.descricao.alinhamento, color: sessions.saudacao.descricao.texto_fonte_cor, backgroundColor: sessions.saudacao.descricao.texto_fundo_cor, fontFamily: sessions.saudacao.descricao.estilo, fontWeight: sessions.saudacao.descricao.negrito})}>{this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.salutation.text: ''}
                      </p>
                  </div>
              </div>

              <SectionCasal tipoFesta={this.state.event.EVENTO !== undefined ? this.state.event.template.thematics: ''} /> 

              <SectionPadrinhos tipoFesta={this.state.event.EVENTO !== undefined ? this.state.event.template.thematics: ''} /> 

              <div className="theme-site-address" id="localizacao" style={defaultStyle({backgroundImage:sessions.localizacao.background.imagem, backgroundColor: sessions.localizacao.background.fundo_cor})}>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.localizacao.titulo.alinhamento})}>
                      <p id="titulo-address" className="element title-content" style={defaultStyle({fontSize: sessions.localizacao.titulo.texto_fonte_tamanho, textAlign: sessions.localizacao.titulo.alinhamento, color: sessions.localizacao.titulo.texto_fonte_cor, backgroundColor: sessions.localizacao.titulo.texto_fundo_cor, fontFamily: sessions.localizacao.titulo.estilo, fontWeight: sessions.localizacao.titulo.negrito})}
                      >Local da Festa</p>
                  </div>

                  <div className="container-editor" style={defaultStyle({textAlign: sessions.localizacao.endereco.alinhamento})}>
                      <p id="descricao-address" className="element" style={defaultStyle({fontSize: sessions.localizacao.endereco.texto_fonte_tamanho, textAlign: sessions.localizacao.endereco.alinhamento, color: sessions.localizacao.endereco.texto_fonte_cor, backgroundColor: sessions.localizacao.endereco.texto_fundo_cor, fontFamily: sessions.localizacao.endereco.estilo, fontWeight: sessions.localizacao.endereco.negrito})} >A festa vai acontecer no dia {date} às {this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.hour:''} <br /> Quer saber onde? Confere aí!</p>
                  </div>

                  <div className="container-editor" style={defaultStyle({textAlign: sessions.localizacao.data.alinhamento})}>
                      <p id="endereco-address" className="element" style={defaultStyle({fontSize: sessions.localizacao.data.texto_fonte_tamanho, textAlign: sessions.localizacao.data.alinhamento, color: sessions.localizacao.data.texto_fonte_cor, backgroundColor: sessions.localizacao.data.texto_fundo_cor, fontFamily: sessions.localizacao.data.estilo, fontWeight: sessions.localizacao.data.negrito})} ><span>Casa de Festas Casamentos Perfeitos</span><span>{this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.address.street:''}, {this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.address.neighborhood:''}, {this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.address.city:''} - {this.state.event.EVENTO !== undefined ? this.state.event.EVENTO.address.state:''}</span></p>
                  </div>

                  <div className="container-editor">
                      <div id="mapa-address" className="element">
                          <iframe src={"https://maps.google.com/maps?q=" + street + '&t=&z=17&ie=UTF8&iwloc=&output=embed'} width="100%" height="450" frameBorder="0" title="localização da festa" allowFullScreen style={defaultStyle({border: "none"})}></iframe>
                      </div>
                  </div>
              </div>

              <div className="theme-site-album" id="fotos" style={defaultStyle({backgroundImage:sessions.fotos.background.imagem, backgroundColor: sessions.fotos.background.fundo_cor})}>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.fotos.titulo.alinhamento})}>
                      <p id="titulo-album" className="element title-content" style={defaultStyle({fontSize: sessions.fotos.titulo.texto_fonte_tamanho, textAlign: sessions.fotos.titulo.alinhamento, color: sessions.fotos.titulo.texto_fonte_cor, backgroundColor: sessions.fotos.titulo.texto_fundo_cor, fontFamily: sessions.fotos.titulo.estilo, fontWeight: sessions.fotos.titulo.negrito})}>Fotos de {Object.entries( this.state.event.EVENTO.owners ).length !== 0 ? this.state.event.EVENTO.owners.map((item) => {
                          return item.name + ' '
                      }) : ''}</p>
                  </div>
                  <div className="container-editor">
                      <div id="grid-album" className="element">
                          <div className="photo-album">
                              <img src={this.state.event.EVENTO !== undefined ? pathImg : ''} />
                          </div>
                      </div>
                  </div>
              </div>
              
              <footer className="theme-site-countdown" style={defaultStyle({backgroundImage:sessions.rodape.background.imagem, backgroundColor: sessions.rodape.background.fundo_cor})}>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.rodape.titulo.alinhamento})}>
                      <p id="titulo-countdown" className="element" style={defaultStyle({fontSize: sessions.rodape.titulo.texto_fonte_tamanho, textAlign: sessions.rodape.titulo.alinhamento, color: sessions.rodape.titulo.texto_fonte_cor, backgroundColor: sessions.rodape.titulo.texto_fundo_cor, fontFamily: sessions.rodape.titulo.estilo, fontWeight: sessions.rodape.titulo.negrito})} >Não se esqueça...</p>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.rodape.faltam_n_dias.alinhamento})}>
                      <p id="descricao-countdown" className="element title-content" style={defaultStyle({fontSize: sessions.rodape.faltam_n_dias.texto_fonte_tamanho, textAlign: sessions.rodape.faltam_n_dias.alinhamento, color: sessions.rodape.faltam_n_dias.texto_fonte_cor, backgroundColor: sessions.rodape.faltam_n_dias.texto_fundo_cor, fontFamily: sessions.rodape.faltam_n_dias.estilo, fontWeight: sessions.rodape.faltam_n_dias.negrito})} >Faltam apenas 00 dias para a festa!</p>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.rodape.cta_presentear.alinhamento})}>
                      <Link to={event_gifts_link} id="cta-primary-countdown" className="btn-cta btn-cta-primary"  style={defaultStyle({fontSize: sessions.rodape.cta_presentear.texto_fonte_tamanho, textAlign: sessions.rodape.cta_presentear.alinhamento, color: sessions.rodape.cta_presentear.texto_fonte_cor, backgroundColor: sessions.rodape.cta_presentear.texto_fundo_cor, fontFamily: sessions.rodape.cta_presentear.estilo, fontWeight: sessions.rodape.cta_presentear.negrito})}>Presentear aniversariante</Link>
                  </div>
                  <div className="container-editor" style={defaultStyle({textAlign: sessions.rodape.cta_confirmar_presenca.alinhamento})}>
                      <p id="cta-secondary-countdown"  className="btn-cta btn-cta-secondary" data-modal="confirmar-presenca" style={defaultStyle({fontSize: sessions.rodape.cta_confirmar_presenca.texto_fonte_tamanho, textAlign: sessions.rodape.cta_confirmar_presenca.alinhamento, color: sessions.rodape.cta_confirmar_presenca.texto_fonte_cor, backgroundColor: sessions.rodape.cta_confirmar_presenca.texto_fundo_cor, fontFamily: sessions.rodape.cta_confirmar_presenca.estilo, fontWeight: sessions.rodape.cta_confirmar_presenca.negrito})}>Confirmar presença</p>
                  </div>
              </footer>
          </div>
        )
      } else {
        return(
          <div></div>
        )
      }
      
    }
}

const mapStateToProps = state => ({
    themeConfigurations: state.themeConfigurations.items,
    event: state.getEvent.event
})
  

export default connect(mapStateToProps, {fetchGetEvent, fetchThemeConfigurations})(HomeConvidado);