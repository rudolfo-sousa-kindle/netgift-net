import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/pt-br'

import $ from 'jquery';

import ConfirmarPresenca from '../components/ConfirmarPresenca';
import { fetchGetEvent } from '../actions';
import { fetchThemeConfigurations } from '../actions/themeConfigurationsAction';
import { bgImage, defaultStyle } from "../components/styleFunctions";

import logo from '../assets/imgs/logo.png';
import img1 from '../assets/imgs/jogo-de-cama.png';
import img2 from '../assets/imgs/maquina-de-lavar.png';
import galeriaTemplate from "../assets/imgs/header-galeria-de-templates.png";

import '../assets/js/script';
import '../assets/js/plugins';

import '../assets/css/style-theme.css';

class HomeConvidado extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.fetchGetEvent(this.props.match.params.id);
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
        
        if(event !== undefined) {
           var textAlignTitle           = event.template.sessions[0].sub_sessions[0].features[3].value;
           var fontSizeTitle            = event.template.sessions[0].sub_sessions[0].features[5].value;
           var colorTitle               = event.template.sessions[0].sub_sessions[0].features[6].value;
           var backgroundColorTitle     = event.template.sessions[0].sub_sessions[0].features[7].value;
           var fontFamilyTitle          = event.template.sessions[0].sub_sessions[0].features[8].value;
           
           var textAlignDate            = event.template.sessions[0].sub_sessions[1].features[3].value;
           var fontSizeDate             = event.template.sessions[0].sub_sessions[1].features[5].value;
           var colorDate                = event.template.sessions[0].sub_sessions[1].features[6].value;
           var backgroundColorDate      = event.template.sessions[0].sub_sessions[1].features[7].value;
           var fontFamilyDate           = event.template.sessions[0].sub_sessions[1].features[8].value;

           var textAlignBtnHeader       = event.template.sessions[0].sub_sessions[2].features[3].value;
           var fontSizeBtnHeader        = event.template.sessions[0].sub_sessions[2].features[5].value;
           var colorBtnHeader           = event.template.sessions[0].sub_sessions[2].features[6].value;
           var backgroundColorBtnHeader = event.template.sessions[0].sub_sessions[2].features[7].value;
           var fontFamilyBtnHeader      = event.template.sessions[0].sub_sessions[2].features[8].value;
           
           var textAlignConfirmHeader       = event.template.sessions[0].sub_sessions[3].features[3].value;
           var fontSizeConfirmHeader        = event.template.sessions[0].sub_sessions[3].features[5].value;
           var colorConfirmHeader           = event.template.sessions[0].sub_sessions[3].features[6].value;
           var backgroundColorConfirmHeader = event.template.sessions[0].sub_sessions[3].features[7].value;
           var fontFamilyConfirmHeader      = event.template.sessions[0].sub_sessions[3].features[8].value;

           var textAlignDays       = event.template.sessions[0].sub_sessions[4].features[3].value;
           var fontSizeDays        = event.template.sessions[0].sub_sessions[4].features[5].value;
           var colorDays           = event.template.sessions[0].sub_sessions[4].features[6].value;
           var backgroundColorDays = event.template.sessions[0].sub_sessions[4].features[7].value;
           var fontFamilyDays      = event.template.sessions[0].sub_sessions[4].features[8].value;

           var textAlignSalutationTitle       = event.template.sessions[1].sub_sessions[0].features[3].value;
           var fontSizeSalutationTitle        = event.template.sessions[1].sub_sessions[0].features[5].value;
           var colorSalutationTitle           = event.template.sessions[1].sub_sessions[0].features[6].value;
           var backgroundColorSalutationTitle = event.template.sessions[1].sub_sessions[0].features[7].value;
           var fontFamilySalutationTitle      = event.template.sessions[1].sub_sessions[0].features[8].value;
           
           var textAlignSalutationDescription       = event.template.sessions[1].sub_sessions[1].features[3].value;
           var fontSizeSalutationDescription        = event.template.sessions[1].sub_sessions[1].features[5].value;
           var colorSalutationDescription           = event.template.sessions[1].sub_sessions[1].features[6].value;
           var backgroundColorSalutationDescription = event.template.sessions[1].sub_sessions[1].features[7].value;
           var fontFamilySalutationDescription      = event.template.sessions[1].sub_sessions[1].features[8].value;

           var textAlignTitleLocation       = event.template.sessions[2].sub_sessions[0].features[3].value;
           var fontSizeTitleLocation        = event.template.sessions[2].sub_sessions[0].features[5].value;
           var colorTitleLocation           = event.template.sessions[2].sub_sessions[0].features[6].value;
           var backgroundColorTitleLocation = event.template.sessions[2].sub_sessions[0].features[7].value;
           var fontFamilyTitleLocation      = event.template.sessions[2].sub_sessions[0].features[8].value;

           var textAlignDateLocation       = event.template.sessions[2].sub_sessions[1].features[3].value;
           var fontSizeDateLocation        = event.template.sessions[2].sub_sessions[1].features[5].value;
           var colorDateLocation           = event.template.sessions[2].sub_sessions[1].features[6].value;
           var backgroundColorDateLocation = event.template.sessions[2].sub_sessions[1].features[7].value;
           var fontFamilyDateLocation      = event.template.sessions[2].sub_sessions[1].features[8].value;

           var textAlignAddressLocation       = event.template.sessions[2].sub_sessions[2].features[3].value;
           var fontSizeAddressLocation        = event.template.sessions[2].sub_sessions[2].features[5].value;
           var colorAddressLocation           = event.template.sessions[2].sub_sessions[2].features[6].value;
           var backgroundColorAddressLocation = event.template.sessions[2].sub_sessions[2].features[7].value;
           var fontFamilyAddressLocation      = event.template.sessions[2].sub_sessions[2].features[8].value;

           var textAlignTitlePhotos       = event.template.sessions[3].sub_sessions[0].features[3].value;
           var fontSizeTitlePhotos        = event.template.sessions[3].sub_sessions[0].features[5].value;
           var colorTitlePhotos           = event.template.sessions[3].sub_sessions[0].features[6].value;
           var backgroundColorTitlePhotos = event.template.sessions[3].sub_sessions[0].features[7].value;
           var fontFamilyTitlePhotos      = event.template.sessions[3].sub_sessions[0].features[8].value;

           var textAlignTitlePhotos       = event.template.sessions[3].sub_sessions[0].features[3].value;
           var fontSizeTitlePhotos        = event.template.sessions[3].sub_sessions[0].features[5].value;
           var colorTitlePhotos           = event.template.sessions[3].sub_sessions[0].features[6].value;
           var backgroundColorTitlePhotos = event.template.sessions[3].sub_sessions[0].features[7].value;
           var fontFamilyTitlePhotos      = event.template.sessions[3].sub_sessions[0].features[8].value;

           var textAlignTitleFooter       = event.template.sessions[4].sub_sessions[0].features[4].value;
           var fontSizeTitleFooter        = event.template.sessions[4].sub_sessions[0].features[5].value;
           var colorTitleFooter           = event.template.sessions[4].sub_sessions[0].features[6].value;
           var backgroundColorTitleFooter = event.template.sessions[4].sub_sessions[0].features[7].value;
           var fontFamilyTitleFooter      = event.template.sessions[4].sub_sessions[0].features[8].value;

           var textAlignDaysFooter       = event.template.sessions[4].sub_sessions[1].features[4].value;
           var fontSizeDaysFooter        = event.template.sessions[4].sub_sessions[1].features[5].value;
           var colorDaysFooter           = event.template.sessions[4].sub_sessions[1].features[6].value;
           var backgroundColorDaysFooter = event.template.sessions[4].sub_sessions[1].features[7].value;
           var fontFamilyDaysFooter      = event.template.sessions[4].sub_sessions[1].features[8].value;

           var textAlignBtnFooter       = event.template.sessions[4].sub_sessions[2].features[4].value;
           var fontSizeBtnFooter        = event.template.sessions[4].sub_sessions[2].features[5].value;
           var colorBtnFooter           = event.template.sessions[4].sub_sessions[2].features[6].value;
           var backgroundColorBtnFooter = event.template.sessions[4].sub_sessions[2].features[7].value;
           var fontFamilyBtnFooter      = event.template.sessions[4].sub_sessions[2].features[8].value;

           var textAlignBtnFooter       = event.template.sessions[4].sub_sessions[2].features[4].value;
           var fontSizeBtnFooter        = event.template.sessions[4].sub_sessions[2].features[5].value;
           var colorBtnFooter           = event.template.sessions[4].sub_sessions[2].features[6].value;
           var backgroundColorBtnFooter = event.template.sessions[4].sub_sessions[2].features[7].value;
           var fontFamilyBtnFooter      = event.template.sessions[4].sub_sessions[2].features[8].value;

           var textAlignConfirmFooter       = event.template.sessions[4].sub_sessions[3].features[4].value;
           var fontSizeConfirmFooter        = event.template.sessions[4].sub_sessions[3].features[5].value;
           var colorConfirmFooter           = event.template.sessions[4].sub_sessions[3].features[6].value;
           var backgroundColorConfirmFooter = event.template.sessions[4].sub_sessions[3].features[7].value;
           var fontFamilyConfirmFooter      = event.template.sessions[4].sub_sessions[3].features[8].value;
           
           var date    = moment(event.EVENTO.date).format('LL');
           var street  = event.EVENTO.address.street;
           var pathImg = event.template.sessions[3].sub_sessions[1].features[1].value
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

      return (
        <div className="w100 theme-site convidado area-convidado">
            
            <ConfirmarPresenca />

            <div className="theme-site-header" style={bgImage(event !== undefined ? event.template.sessions[0].sub_sessions[5].features[1].value: '')}>
               <header className="webdoor">
                    <div className="container">
                        <div className="menu flex flex-space flex-center">
                            <nav className="flex">
                                <Link to={event_home_link} className="logo"><img src={logo} alt="NetGift" /></Link>
                                <MenuFesta tipoFesta={event !== undefined ? event.template.thematics: ''} />     
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

                <div className="container-editor">

                    <p id="titulo-header" 
                        style={defaultStyle({fontSize: fontSizeTitle, textAlign: textAlignTitle, color: colorTitle, bgColor: backgroundColorTitle, fontFamily: fontFamilyTitle})}

                        className='element'
                    >
                        {event !== undefined ? event.EVENTO.name: ''}
                    </p>
                </div>
                <div className="container-editor">
                    <p id="data-header"
                        style={defaultStyle({fontSize: fontSizeDate, textAlign: textAlignDate, color: colorDate, bgColor: backgroundColorDate, fontFamily: fontFamilyDate})}

                        className='element'
                    >
                        {event !== undefined ? date:''}
                    </p>
                </div>
                <div className="container-editor">
                    <Link id="cta-primary-header" to={event_gifts_link} style={defaultStyle({fontSize: fontSizeDate, textAlign: textAlignDate, color: colorDate, bgColor: backgroundColorDate, fontFamily: fontFamilyDate})} className='btn-cta btn-cta-primary'
                    >Presentear aniversariante</Link>
                </div>
                <div className="container-editor">
                    <p id="cta-secondary-header" className=" btn-cta btn-cta-secondary" data-modal="confirmar-presenca" style={defaultStyle({fontSize: fontSizeConfirmHeader, textAlign: textAlignConfirmHeader, color: colorConfirmHeader, bgColor: backgroundColorConfirmHeader, fontFamily: fontFamilyConfirmHeader})}>Confirmar presença</p>
                </div>
                <div className="container-editor">
                    <p id="contagem-header" className="element" style={defaultStyle({fontSize: fontSizeDays, textAlign: textAlignDays, color: colorDays, bgColor: backgroundColorDays, fontFamily: fontFamilyDays})}>Faltam 00 dias</p>
                </div>
            </div>

            <div className="theme-site-about" style={bgImage(event !== undefined ? event.template.sessions[1].sub_sessions[2].features[1].value: '')}>

                <AvatarFesta tipoFesta={event !== undefined ? event.template.thematics: ''} />

                <div className="container-editor">
                    <p id="titulo-about" className="element title-content" style={defaultStyle({fontSize: fontSizeSalutationTitle, textAlign: textAlignSalutationTitle, color: colorSalutationTitle, bgColor: backgroundColorSalutationTitle, fontFamily: fontFamilySalutationTitle})}>{event !== undefined ? event.EVENTO.salutation.title: ''}</p>
                </div>
                <div className="container-editor">
                    <p id="descricao-about" className="element" style={defaultStyle({fontSize: fontSizeSalutationDescription, textAlign: textAlignSalutationDescription, color: colorSalutationDescription, bgColor: backgroundColorSalutationDescription, fontFamily: fontFamilySalutationDescription})}>{event !== undefined ? event.EVENTO.salutation.text: ''}
                    </p>
                </div>
            </div>

            <SectionCasal tipoFesta={event !== undefined ? event.template.thematics: ''} /> 

            <SectionPadrinhos tipoFesta={event !== undefined ? event.template.thematics: ''} /> 

            <div className="theme-site-address" id="localizacao" style={bgImage(event !== undefined ? event.template.sessions[2].sub_sessions[3].features[1].value: '')}>
                <div className="container-editor">
                    <p id="titulo-address" className="element title-content" style={defaultStyle({fontSize: fontSizeTitleLocation, textAlign: textAlignTitleLocation, color: colorTitleLocation, bgColor: backgroundColorTitleLocation, fontFamily: fontFamilyTitleLocation})}
                    >Local da Festa</p>
                </div>

                <div className="container-editor">
                    <p id="descricao-address" className="element" style={defaultStyle({fontSize: fontSizeDateLocation, textAlign: textAlignDateLocation, color: colorDateLocation, bgColor: backgroundColorDateLocation, fontFamily: fontFamilyDateLocation})} >A festa vai acontecer no dia {date} às {event !== undefined ? event.EVENTO.hour:''} <br /> Quer saber onde? Confere aí!</p>
                </div>

                <div className="container-editor">
                    <p id="endereco-address" className="element" style={defaultStyle({fontSize: fontSizeAddressLocation, textAlign: textAlignAddressLocation, color: colorAddressLocation, bgColor: backgroundColorAddressLocation, fontFamily: fontFamilyAddressLocation})} ><span>Casa de Festas Casamentos Perfeitos</span><span>{event !== undefined ? event.EVENTO.address.street:''}, 259, {event !== undefined ? event.EVENTO.address.neighborhood:''}, {event !== undefined ? event.EVENTO.address.city:''} - {event !== undefined ? event.EVENTO.address.state:''}</span></p>
                </div>

                <div className="container-editor">
                    <div id="mapa-address" className="element">
                        <iframe src={"https://maps.google.com/maps?q=" + street + '&t=&z=17&ie=UTF8&iwloc=&output=embed'} width="100%" height="450" frameBorder="0" title="localização da festa" allowFullScreen style={defaultStyle({border: "none"})}></iframe>
                    </div>
                </div>
            </div>

            <div className="theme-site-album" id="fotos">
                <div className="container-editor">
                    <p id="titulo-album" className="element title-content" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Fotos de {event !== undefined ? event.EVENTO.owners.map((item) => {
                        return item.name + ' '
                    }) : ''}</p>
                </div>
                <div className="container-editor">
                    <div id="grid-album" className="element">
                        <div className="photo-album">
                            <img src={event !== undefined ? pathImg : ''} />
                        </div>
                    </div>
                </div>
            </div>
            
            <footer className="theme-site-countdown" style={bgImage(galeriaTemplate)}>
                <div className="container-editor">
                    <p id="titulo-countdown" className="element" style={defaultStyle({fontSize: fontSizeTitleFooter, textAlign: textAlignTitleFooter, color: colorTitleFooter, bgColor: backgroundColorTitleFooter, fontFamily: fontFamilyTitleFooter})} >Não se esqueça...</p>
                </div>
                <div className="container-editor">
                    <p id="descricao-countdown" className="element title-content" style={defaultStyle({fontSize: fontSizeDaysFooter, textAlign: textAlignDaysFooter, color: colorDaysFooter, bgColor: backgroundColorDaysFooter, fontFamily: fontFamilyDaysFooter})} >Faltam apenas 00 dias para a festa!</p>
                </div>
                <div className="container-editor">
                    <Link to={event_gifts_link} id="cta-primary-countdown" className="btn-cta btn-cta-primary"  style={defaultStyle({fontSize: fontSizeBtnFooter, textAlign: textAlignBtnFooter, color: colorBtnFooter, bgColor: backgroundColorBtnFooter, fontFamily: fontFamilyBtnFooter})}>Presentear aniversariante</Link>
                </div>
                <div className="container-editor">
                    <p id="cta-secondary-countdown"  className="btn-cta btn-cta-secondary" data-modal="confirmar-presenca" style={defaultStyle({fontSize: fontSizeConfirmFooter, textAlign: textAlignConfirmFooter, color: colorConfirmFooter, bgColor: backgroundColorConfirmFooter, fontFamily: fontFamilyConfirmFooter})}>Confirmar presença</p>
                </div>
            </footer>
        </div>
      )
    }
}

const mapStateToProps = state => ({
    themeConfigurations: state.themeConfigurations.items,
    event: state.getEvent.event
})
  

export default connect(mapStateToProps, {fetchGetEvent, fetchThemeConfigurations})(HomeConvidado);