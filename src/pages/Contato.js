import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPage } from "../actions";

import HeaderDefault from "../components/HeaderDefault";
import FooterDesloged from "../components/FooterDesloged";

import $ from 'jquery';
import validate from 'jquery-validation';
import setTooltipster, { setMessages } from '../assets/js/plugins';

import '../assets/css/snackbar.min.css';

class Contato extends Component {
    componentDidMount() {
        this.props.dispatch(fetchPage(182, ''));
        setTooltipster();
    }

    render() {
        const { error, loading, page } = this.props;
        const { items } = page;

        $('.contato header').css({
            'background-image': 'url(' + items.thumbnail + ')'
        });

        $('.content > .header-content .subtitle').html(items.post_content);

        return(
            <main className="contato">
                <header className="default">
                    <div className="container lg">
                        <HeaderDefault />
                    </div>

                        <div className="container flex flex-space content content-mob">
                            <div className="flex flex-column header-content">
                                <div>
                                    <h2 className="title">{items.post_title}</h2>
                                    <p className="subtitle"></p>
                                </div>

                                <div className="nossos-termos">
                                    <p>Nossos termos</p>
                                    <div className="flex flex-column">
                                        <Link to="/termos-de-servico">Termos de Serviço</Link>
                                        <Link to="/politica-de-privacidade">Política de Privacidade</Link>
                                    </div>
                                </div>
                            </div>

                            <form className="card-purple"  name="contato">
                                <div className="flex flex-column">
                                    <div className="flex flex-column">
                                        <label for="tipo">Você é</label>
                                        <div className="column-2">
                                            <input type="radio" id="organizador" name="type" checked value="organizador" />
                                            <label for="organizador" className="fullcolor gradient">
                                            Organizador(a)
                                            </label>
                                            <input type="radio" id="convidado" name="type" value="convidado" />
                                            <label for="convidado" className="gradient border white">
                                            Convidado(a)
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex flex-column">
                                        <label for="nome">Nome</label>
                                        <input type="text" name="name" id="nome" placeholder="Digite seu nome" required />
                                    </div>
                                    <div className="flex flex-column">
                                        <label for="email">Email</label>
                                        <input type="email" name="email" id="email" placeholder="Digite seu email" required />
                                    </div>
                                    <div className="flex flex-column">
                                        <label for="mensagem">Mensagem</label>
                                        <textarea name="message" id="mensagem" placeholder="Digite sua mensagem" required minlength="5"></textarea>
                                    </div>
                                </div>
                                <div className="flex flex-column">
                                    <button className="gradient fullcolor comecar-festa">
                                        <span>Enviar mensagem</span><i className="ng-right-arrow-extend"></i>
                                        <span class="nb-spinner"></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                </header>

                <div className="container md content waves-mob termos-wrapper-mob">
                    <div className="flex flex-space flex-end">

                        <div className="nossos-termos nossos-termos-mob">
                            <p>Nossos termos</p>
                            <div className="flex flex-column">
                                <Link to="/termos-de-servico">Termos de Serviço</Link>
                                <Link to="/politica-de-privacidade">Política de Privacidade</Link>
                            </div>
                        </div>

                    </div>
                </div>
                <FooterDesloged />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    page: state.page
})
  

export default connect(mapStateToProps)(Contato);