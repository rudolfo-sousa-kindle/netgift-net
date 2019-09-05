import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import Snackbar from 'node-snackbar';

import Logo from "../assets/imgs/logo-vertical.png";

export default class FooterDesloged extends Component {
    componentDidMount() {
        $( document ).on( 'submit', '#newsletter-form', function( event ) {
            event.preventDefault();

            var form = document.forms.namedItem( 'newsletter_form' );
            var fd   = new FormData( form );
            let $settings = {
                "url": "http://www.localkindle.com.br/netgift_api/wp-json/ntgift/api/send_newsletter",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "data": fd,
                beforeSend: function (ele) {
                    $('.nb-spinner').show();
                    $('.contato .ng-right-arrow-extend').hide();
                }
            }

            $.ajax( $settings )
            .done( function ( $response ) {
                $('.nb-spinner').hide();
                $('.contato .ng-right-arrow-extend').show();
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Cadastro realizado com sucesso.',
                    backgroundColor: '#8332f5',
                    showAction: false,
                    duration: 5000
                });
            })
            .fail( function() {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Erro no cadastro. Tente novamente mais tarde.',
                    backgroundColor: '#f20d21',
                    showAction: false,
                    duration: 5000
                });
            })
        });
    }

    render() {
        return(
                <footer>
                    <div className="flex flex-column container">
                        <div className="flex flex-space cadastre-wrapper">
                            <div className="flex flex-column logo-social">
                                <img src={Logo} alt="NetGift" />
                                <div className="flex flex-space">
                                    <Link to="#" className="icon-social shadow-10 rounded gradient-azul">
                                        <i className="ng-facebook"></i>
                                    </Link>
                                    <Link to="#" className="icon-social shadow-10 rounded gradient-azul">
                                        <i className="ng-instagram"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-column newsletter">
                                <p><strong>Cadastre-se</strong> e fique por dentro <br />de todas as nossas novidades</p>
                                <form id="newsletter-form" name="newsletter_form">
                                    <input type="email" name="email" placeholder="Cadastre o seu melhor email" required /><button className="fullcolor gradient"><i className="ng-right-arrow-extend"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="flex flex-space copyright-desk">
                            <div className="menu-footer"><Link to="/buscar-festa">Buscar uma festa</Link><span>|</span>
                            <Link to="/contato">Contato</Link></div>
                            <div className="copyright">® 2019 NETGIFT - CPNJ 99.304.401/0001-00 - <Link to="#">TERMOS DE SERVIÇO</Link> E <Link to="#">POLÍTICA DE PRIVACIDADE</Link>.</div>
                        </div>

                        <div className="flex flex-space copyright-mob">
                            <div className="menu-footer">
                                <ul>
                                    <li className="li-button"><Link to="/buscar-festa" className="footer-menu-itens gradient border hover-animation" id="buscar-festa"><i className="ng-search"></i>Buscar festa</Link></li>
                                    <li><Link to="/contato" className="footer-menu-itens">Contato</Link></li>
                                </ul>
                            </div>
                            <div className="copyright">® 2019 NETGIFT - CPNJ 99.304.401/0001-00<br/><br/><Link to="#">TERMOS DE SERVIÇO</Link> E <Link to="#">POLÍTICA DE PRIVACIDADE</Link>.</div>
                        </div>
                    </div>
                </footer>
        );
    }
}