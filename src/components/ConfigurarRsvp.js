import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from 'moment';

import $ from 'jquery';
import 'tooltipster';

import { fetchGetEvent } from '../actions/getEventAction'; 
import { fetchSetRsvp } from '../actions/setRsvpAction'; 
import { fetchGetInvite } from '../actions/getInviteAction';

import logo from '../assets/imgs/logo-color.png';
import verSite from '../assets/imgs/ver-site.png';
import dobraCalendario from '../assets/imgs/dobra-calendario.png';
import calendarioIcon from '../assets/imgs/calendario-icon.png';
import sinoIcon from '../assets/imgs/sino-icon.png';
import blueStyle from '../assets/imgs/blue-style-type.png';
import confirmarPresenca from '../assets/imgs/confirmar-presenca.png';
import headerImg from '../assets/imgs/img-header-rsvp.png';
import mktPreview from '../assets/imgs/mkt-preview.png';

class ConfigurarRsvp extends Component {
    componentDidMount() {
        this.props.fetchGetEvent(this.props.match.params.id);
        this.props.fetchGetInvite(this.props.match.params.id);

        $.extend($.validator.messages, {
            equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente",
            minlength: $
                .validator
                .format("Por favor, forne&ccedil;a ao menos {0} caracteres")
        });

        setTimeout(function() {
            $('.config-accordion input[type="password"]').tooltipster({
                animation: 'fade',
                updateAnimation: 'null',
                trigger: 'custom',
                position: 'bottom'
            });
        }, 1000)

        setTimeout(function() {
            $('.config-accordion textarea').tooltipster({
                animation: 'fade',
                updateAnimation: 'null',
                trigger: 'custom',
                position: 'bottom'
            });
        }, 1000)

        $('.config-accordion').validate({
            rules: {
                textarea_salutation: {
                    required: true
                },
                textarea_thanks: {
                    required: true
                },
                password: {
                    required: true
                },
                repeat_password : {
                    equalTo : "#password"
                }
            },
            errorPlacement: function (error, element) {
                element.addClass("formError");
                var ele = element,
                    err = error.text();
                if (err != null && err !== '') {
                    ele.tooltipster('content', err);
                    ele.tooltipster('open');
                }
            },
            unhighlight: function (element, errorClass, validClass) {
              $(element)
                  .removeClass("formError")
                  .removeClass(errorClass)
                  .addClass(validClass)
                  .tooltipster('close');
            },
            submitHandler: function (form) {
            }
        })
    }

    configRsvp() {
        let inputs         = document.querySelectorAll('.informacoes input[type="password"]');
        let objRsvp        = {};
        objRsvp.title      = this.props.eventOrganizer.items.EVENTO.name;
        objRsvp.subtitle   = $('.subtitle-rsvp').text();
        objRsvp.salutation =  $('#text-salutation').html();
        objRsvp.date_time  = this.props.eventOrganizer.items.EVENTO.date + ' ' +  this.props.eventOrganizer.items.EVENTO.hour;
        objRsvp.thanks     = $('#text-thanks').html();
        objRsvp.pass       = $('#password').val();
        objRsvp.image      = $('#img-rsvp').attr('src');

        this.props.fetchSetRsvp(this.props.match.params.id, objRsvp);   
    }

    updateSalutationRsvp() {
        let textSalutation = $('#textarea-salutation').val();

        if($('#textarea-salutation').val() !== '') {
            $('#text-salutation').html(textSalutation);
        }
    }
    
    updateThanksRsvp() {
        let textThanks = $('#textarea-thanks').val();

        if($('#textarea-thanks').val() !== '') {
            $('#text-thanks').html(textThanks);
        }
    }

    render() {
        const { eventOrganizer, getInvite } = this.props;
        if (eventOrganizer.items.length !== 0) {
            var day   = moment(eventOrganizer.items.EVENTO.date).format('ll').split(' ')[0];
            var month = moment(eventOrganizer.items.EVENTO.date).format('ll').split(' ')[2];
            var slug  = eventOrganizer.items.EVENTO.slug;
        }

        return (
            <div className="convidados-3">
                <div className="container">
                <div className="summary without-divider">
                    <div className="left">
                        <h2 className="title">Configurar RSVP</h2>
                        <button className="hide-desk gradient fullcolor" id="editar-rsvp">Editar RSVP</button>
                    </div>
                </div>

                <div className="flex flex-space my50">
                    <div className="config">
                        <div className="modal-title">
                            <div className="flex flex-space flex-center">
                                <p>Editar RSVP</p>
                                <div className="exit-modal"><i className="ng-cancel"></i></div>
                            </div>
                        </div>

                        <form className="config-accordion">
                            <div className="config-item">
                                <div className="config-item-title flex flex-center flex-space">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p>Foto do cabeçalho</p>
                                    <i className="ng-down-open"></i>
                                </div>
                                <div className="config-item-content cabecalho">
                                    <div className="divider"></div>
                                    <p className="blue-small">Fotos</p>
                                    <button className="fullcolor gradient fileup-btn mT10"><i className="ng-uploading"></i>Enviar arquivo
                                        <input type="file" id="upload-rsvp" multiple accept="image/*" />
                                    </button>
                                    <div id="upload-rsvp-preview" className="queue"></div>

                                </div>
                            </div>

                            <div className="config-item disabled">
                                <div className="config-item-title flex flex-center flex-space">
                                    <p>Título</p>
                                </div>
                            </div>

                            <div className="config-item disabled">
                                <div className="config-item-title flex flex-center flex-space">
                                    <p>Sub-título</p>
                                </div>
                            </div>

                            <div className="config-item">
                                <div className="config-item-title flex flex-center flex-space">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p>Mensagem de saudação</p>
                                    <i className="ng-down-open"></i>
                                </div>
                                <div className="config-item-content saudacao">
                                    <div className="divider"></div>
                                    <p className="blue-small">Texto</p>
                                    { undefined !== getInvite.items[0] && getInvite.items[0].salutation.length !== 0 ?
                                        <textarea className="bd-black" id="textarea-salutation" name="textarea_salutation" required>{ getInvite.items[0].salutation}</textarea> : ''
                                    }
                                    <button className="fullcolor gradient w100 flex" onClick={() => this.updateSalutationRsvp()}>Atualizar <span className="nb-spinner"></span></button>
                                </div>
                            </div>

                            <div className="config-item disabled">
                                <div className="config-item-title flex flex-center flex-space">
                                    <p>Data e hora</p>
                                </div>
                            </div>

                            <div className="config-item">
                                <div className="config-item-title flex flex-center flex-space">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p>Mensagem de agradecimento</p>
                                    <i className="ng-down-open"></i>
                                </div>
                                <div className="config-item-content agradecimento">
                                    <div className="divider"></div>
                                    <p className="blue-small">Texto</p>
                                    { undefined !== getInvite.items[0] && getInvite.items[0].salutation.length !== 0 ?
                                        <textarea id="textarea-thanks" className="bd-black" name="textarea_thanks" required>{ getInvite.items[0].thanks }</textarea> : ''
                                    }
                                    <button className="fullcolor gradient w100 flex" onClick={() => this.updateThanksRsvp()}>Atualizar<span className="nb-spinner"></span></button>
                                </div>
                            </div>

                            <div className="config-content">
                            </div>
                            <div className="config-item">
                                <div className="config-item-title flex flex-center flex-space">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p>Senha</p>
                                    <i className="ng-down-open"></i>
                                </div>
                                <div className="config-item-content senha">
                                    <div className="divider"></div>
                                    <div className="password-exist">
                                        <p className="gray">O acesso ao RSVP já está protegido por uma senha.</p>
                                        <a href="#" className="cyan">Alterar senha</a>
                                    </div>
                                    <div className="password-new">
                                        <p className="gray">Cadastre uma senha e garanta que somente os seus convidados terão acesso ao RSVP.</p>
                                        <p className="blue-small">Digite sua senha</p>
                                        <input type="password" id="password" name="password"className="bd-black" defaultValue={getInvite.items.length !== 0 ? getInvite.items[0].pass : '' } required />
                                        <p className="blue-small">Repita sua senha</p>
                                        <input type="password" id="repeat_password" name="repeat_password" className="bd-black" defaultValue={getInvite.items.length !== 0 ? getInvite.items[0].pass : '' } required />

                                        <button className="fullcolor gradient w100 mT20 flex">Atualizar<span className="nb-spinner"></span></button>
                                    </div>
                                </div>
                            </div>

                            <button className="fullcolor gradient w100 desk flex" onClick={() => this.configRsvp()}>Salvar alterações <span className="nb-spinner"></span></button>

                            <div className="config-content">
                            </div>

                            <div className="save-modal">
                                <button className="fullcolor gradient w100 flex" onClick={() => this.configRsvp()}>Salvar alterações<span className="nb-spinner"></span></button>
                            </div>
                        </form>
                    </div>

                    <div className="preview-config flex">
                        <div className="card-preview rsvp carregar-mais">
                            <div className="hide-desk">
                                <img src={mktPreview} alt="" />
                            </div>

                            <div className="mkt">
                                <table align="center" width="600" cellPadding="0" cellSpacing="0" style={{backgroundImage: 'url( "' + headerImg + '")', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right'}}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <table align="center" width="600" cellPadding="0" cellSpacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td width="62">&nbsp;</td>
                                                            <td width="190" valign="bottom"><img src={logo} alt="logo" style={{width: 179 + 'px', display: 'block'}} /></td>
                                                            <td width="346" align="right">
                                                                <Link to={"/festa/" + slug}>
                                                                    <img src={verSite} alt="logo" style={{display: 'block'}} />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <table align="center" width="600" cellPadding="0" cellSpacing="0" style={{fontFamily: 'Helvetica'}}>
                                                    <tbody>
                                                        <tr>
                                                            <td width="62">&nbsp;</td>
                                                            <td width="206">
                                                                <h3 style={{textTransform: 'uppercase', margin: 0, color: '#a0a0a0',  fontWeight: 30,fontSize: 14 + 'px'}}>{eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.category.name : ''}</h3>
                                                                <p style={{textTransform: 'uppercase', margin: 0, color: '#a0a0a0', fontWeight: 300, fontSize: 14 + 'px', height: 7 + 'px'}}>&nbsp;</p>
                                                                <h1 style={{fontSize: 41 + 'px', lineHeight: 35 + 'px', letterSpacing: -1 + 'px', margin: 0}}>{eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.name : ''}</h1>
                                                                <p style={{textTransform: 'uppercase', margin: 0, color: '#a0a0a0', fontWeight: 300, fontSize: 14 + 'px', height: 7 + 'px'}}>&nbsp;</p>
                                                                <p className="subtitle-rsvp" style={{color: '#636466', letterSpacing: 0.3 + 'px'}}>Faltam <strong style={{color: '#636466'}}>152</strong> dias<br /> para o grande dia.</p>
                                                            </td>
                                                            <td width="330" align="right">
                                                                <img src={
                                                                        getInvite.items.length !== 0 ? 
                                                                        getInvite.items[0].url !== null ?
                                                                        getInvite.items[0].url : ''
                                                                        : ''
                                                                    } 
                                                                    alt="Foto da festa" id="img-rsvp" style={{width: 236 + 'px', height: 236 + 'px', borderRadius: 200 + 'px', marginRight: 50 + 'px', marginTop: 39 + 'px'}} 
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td height="162" style={{verticalAlign: 'bottom'}}>
                                                <table align="center" width="600" cellPadding="0" cellSpacing="0" style={{fontFamily: 'Helvetica'}}>
                                                    <tbody>
                                                        <tr>
                                                            <td width="62" height="29">&nbsp;</td>
                                                            <td width="474" valign="top">
                                                                <p style={{fontSize: 35 + 'px', margin: 0}}>Convidado e familiares</p>
                                                            </td>
                                                            <td width="62">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td height="90">&nbsp;</td>
                                                            <td>
                                                                <p id="text-salutation" style={{lineHeight: 24 + 'px', letterSpacing: 0.1 +'px'}}>{getInvite.items.length !== 0 ? getInvite.items[0].salutation : ''}</p>
                                                            </td>
                                                            <td>&nbsp;
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td height="159">
                                                <table align="center" width="600" cellPadding="0" cellSpacing="0" height="138" style={{fontFamily: 'Helvetica'}}>
                                                    <tbody>
                                                        <tr>
                                                            <td width="62">&nbsp;
                                                            </td>
                                                            <td width="134" align="center" style={{backgroundColor: '#ebebeb', borderRadius: 5 + 'px'}}>
                                                                <p style={{backgroundColor: '#478afa', width: 65 + 'px', textAlign: 'center', color: 'white',margin: 0, fontWeight: 700, borderTopLeftRadius: 5 + 'px', borderTopRightRadius: 5 + 'px',fontSize: 12 + 'px', borderTop: '3px solid #478afa', borderBottom: '3px solid #478afa'}}>{month}</p>
                                                                <p style={{width: 65 + 'px', textAlign: 'center', fontWeight: 700, fontSize: 35 + 'px', margin: 0, backgroundColor: '#fff', padding: 8 + 'px', paddingBottom: 0 + 'px'}}>{day}</p>
                                                                <img src={dobraCalendario} alt="" />
                                                            </td>

                                                            <td width="346" height="138" style={{border: '1px solid #ebebeb', borderRadius: 5 + 'px'}}>
                                                                <h1 style={{fontSize: 17 + 'px'}}>&nbsp;&nbsp;&nbsp;&nbsp; <img src={blueStyle} alt="" />&nbsp;&nbsp;{eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.name : ''}</h1>
                                                                <p style={{fontSize: 13 + 'px', letterSpacing: 0.1 + 'px'}}>&nbsp;&nbsp;&nbsp;&nbsp;<img src={calendarioIcon} alt="calendário icon" style={{width: 12 + 'px', marginLeft: 2 + 'px'}} />&nbsp;&nbsp;&nbsp;{eventOrganizer.items.length !== 0 ? moment(eventOrganizer.items.EVENTO.date).format('L') : ''}</p>
                                                                <span>&nbsp;&nbsp;&nbsp;&nbsp;<img src={sinoIcon} alt=""/>&nbsp;&nbsp;{eventOrganizer.items.length !== 0 ? eventOrganizer.items.EVENTO.hour : ''}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <a href="" style={{color: '#757575',fontSize: 13 + 'px'}}>Adicionar à agenda »</a>
                                                            </td>
                                                            <td width="56">&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td height="394">
                                                <table align="center" width="600" cellPadding="0" cellSpacing="0" style={{fontFamily: 'Helvetica'}}>
                                                    <tbody>
                                                        <tr>
                                                            <td width="62" height="165">&nbsp;</td>
                                                            <td width="485">
                                                                <p id="text-thanks" style={{lineHeight: 24 + 'px', letterSpacing: 0.1 + 'px'}}>{getInvite.items.length !== 0 ? getInvite.items[0].thanks: ''}</p>
                                                            </td>
                                                            <td width="51">&nbsp;</td>
                                                        </tr>
                                                        <tr>
                                                            <td height="110">&nbsp;</td>
                                                            <td>
                                                                <a href="#">
                                                                    <img src={confirmarPresenca} alt="confirmar presença" />
                                                                </a>
                                                            </td>
                                                            <td>&nbsp;
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="109">&nbsp;</td>
                                                            <td>
                                                                <p style={{textAlign: 'center', letterSpacing: 0.1 + 'px', fontSize: 13 + 'px'}}>Caso não esteja visualizando este email corretamente <a href="">clique aqui</a></p>
                                                            </td>
                                                            <td>&nbsp;</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <button className="btn-large">Mostrar email de confirmação</button>
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

const mapStateToProps = state => ({
    eventOrganizer: state.eventOrganizer,
    setRsvp: state.setRsvp,
    getInvite: state.getInvite 
})

export default connect(mapStateToProps, {fetchGetEvent, fetchSetRsvp, fetchGetInvite})(ConfigurarRsvp);