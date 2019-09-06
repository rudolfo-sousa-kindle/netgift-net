import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Field, reduxForm} from 'redux-form';

import ConfirmarPresenca from '../components/ConfirmarPresenca';
import { fetchFilterByCategory, fetchGetEvent, fetchGifts, fetchAddCart } from '../actions';
import { fetchDeleteCart } from '../actions/deleteCartAction';
import { fetchDeleteGifts } from '../actions/deleteCartAction';
import { fetchThemeConfigurations } from '../actions/themeConfigurationsAction';
import { addGiftCart } from "../actions/carrinhoAction";
import { bgImage, defaultStyle } from "../components/styleFunctions";

import $ from 'jquery';

import setSelect2 from "../assets/js/setSelect2";

import '../assets/js/script';
import '../assets/js/plugins';

import '../assets/css/style.css';
import '../assets/css/style-theme.css';


import logo from '../assets/imgs/logo.png';
import presente from '../assets/imgs/presente.png';
import iconClose from '../assets/imgs/icon-close.svg';

class ListaPresentes extends Component {
    state = {
        event_id : 0,
        gifts: [],
    };
    componentDidMount() {
        setSelect2();

        this.props.dispatch(fetchFilterByCategory());
        this.props.dispatch(fetchThemeConfigurations());
        this.props.dispatch(fetchGetEvent(this.props.match.params.id)).then( ( response ) => {
            this.state.event_id = response.EVENTO.id;
            this.props.dispatch(fetchGifts(response.EVENTO.id, '')).then( (response) => {
                    this.setState({
                        gifts: response.adicionados,
                    });
                });;
        });
    }

    submit = (item) => {
        var search = item.search;
        
        if ( 0 !== this.state.event_id ) {
            this.props.dispatch(fetchGifts(this.state.event_id, search)).then( (response) => {
                this.setState({
                    gifts: response.adicionados,
                });
            } );
        } else {
            this.props.dispatch(fetchGetEvent(this.props.match.params.id)).then( ( response ) => {
                this.props.dispatch(fetchGifts(response.EVENTO.id, search)).then( (response) => {
                    this.setState({
                        gifts: response.adicionados,
                    });
                });
            });
        }
        
    }

    deleteCart(item) {
        var id_user = localStorage.getItem('id_user') ? localStorage.getItem('id_user') : document.getElementById( 'id_user' ).value;
        var id_event = localStorage.getItem('id_event') ? localStorage.getItem('id_event') : document.getElementById( 'id_event' ).value;
        var gift_id = item.id;
        var cart_gift_id = item.id;

        this.props.dispatch(fetchDeleteGifts( {id_user, id_event, cart_gift_id} ));
        this.props.fetchDeleteCart( { id_user, id_event, cart_gift_id } );
    }  

    objGift = {};
    addOnCart(param ,item, history) {
        var id_user = localStorage.getItem('id_user') ? localStorage.getItem('id_user') : document.getElementById( 'id_user' ).value;

        var id_event = localStorage.getItem('id_event') ? localStorage.getItem('id_event') : document.getElementById( 'id_event' ).value;
        var gift_id = item.id;

        this.objGift['qty'] = 1;
        this.objGift['gift_id'] = gift_id;
        localStorage.setItem('id_user', id_user);
        localStorage.setItem('id_event', id_event);        

        if(param.target.className === 'add' || param.target.className === 'add add-mobile') {
            
            this.props.fetchAddCart( { id_user, id_event }, this.objGift );

        } else if (param.target.className === 'text-gradient one-click' ) {
            
            this.props.fetchAddCart( { id_user, id_event }, this.objGift );
            setTimeout(() => {
                history.push("/festa/"+ id_event +"/pagamento");
            }, 500);

        } else if (param.target.className === 'btn-modal') {
            var id = param.target.id;
            localStorage.setItem('id_payment', id);
            setTimeout(() => {
                history.push("/festa/"+ id_event +"/pagamento");
            }, 300);
        } else {
            this.deleteCart(item);
        }

    } 

    
    render() {

        var id_user = Math.floor(Math.random() * 1000000);

        let { error, loading, filterByCategory, getEvent, gifts, event, handleSubmit } = this.props;
        const { items } = gifts;
        const { id } = this.props.match.params;
        const event_home_link       = "/festa/" + id;
        const event_history_link    = "/festa/" + id + "/#nossa-historia";
        const event_location_link   = "/festa/" + id + "/#localizacao";
        const event_pictures_link   = "/festa/" + id + "/#fotos";
        const event_godparents_link = "/festa/" + id + "/#padrinhos";
        const event_gifts_link      = "/festa/" + id + "/lista-de-presentes";
        const event_cart_link       = "/festa/" + id + "/carrinho";
        const event_payment_link    = "/festa/" + id + "/pagamento";
        let id_event;

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
        
        if(undefined !== event && event.template !== undefined) {
          event.template.sessions.map((sess) => {

              sess.sub_sessions.map((subSess) => {
                  subSess.features.map( ( feature ) => {
                      sessions[sess.session][subSess.sub_session][feature.name] = feature.value;
                  });
              })
          })
        }
        console.log( gifts );


        if(this.props.getEvent !== undefined) {
            event = this.props.event;

            if(event !== undefined) {
                id_event = event.EVENTO.id;

                var textAlignTitle           = event.template.sessions[0].sub_sessions[0].features[3].value;
                var fontSizeTitle            = event.template.sessions[0].sub_sessions[0].features[5].value;
                var colorTitle               = event.template.sessions[0].sub_sessions[0].features[6].value;
                var backgroundColorTitle     = event.template.sessions[0].sub_sessions[0].features[7].value;
                var fontFamilyTitle          = event.template.sessions[0].sub_sessions[0].features[8].value;

            }
        }

        function MenuFesta(props) {
            if(event !== undefined) {
                var tipoFesta = props.tipoFesta[0].thematic_id;
            }
            
            if (tipoFesta === 5) {
              return <ul className="flex">
                        <li><a href="#nossa-historia" className="white-underline link-menu">Nossa História</a></li>

                        <li><a href={event_godparents_link} className="white-underline link-menu ">Padrinhos</a></li>
                        
                        <li><Link href={event_location_link} className="white-underline link-menu ">Local da Festa</Link></li>

                        <li><a href={event_pictures_link} className="white-underline link-menu ">Nossas fotos</a></li>

                        <li className="logo-list">
                            <Link to={event_home_link}>
                                <img src={logo} alt="NetGift" />
                            </Link>
                        </li>
                    </ul>;
            }
            return <ul className="flex">
                        <li><Link to={event_home_link} className="white-underline link-menu">Início</Link></li>

                        <li><a href={event_location_link} className="white-underline link-menu ">Local da Festa</a></li>

                        <li><a href={event_pictures_link} className="white-underline link-menu ">Nossas fotos</a></li>

                        <li className="logo-list">
                            <Link to={event_home_link}>
                                <img src={logo} alt="NetGift" />
                            </Link>
                        </li>
                    </ul>;
        }

        return (
            <div className="area-convidado lista-de-presentes">
                <input type="hidden" id="id_user" value={id_user} />
                <input type="hidden" id="id_event" value={id_event} />


                <ConfirmarPresenca />

                <header className="webdoor" style={defaultStyle({backgroundImage:sessions.header.background.imagem, backgroundColor: sessions.header.background.fundo_cor})}>
                    <div className="container">
                        <div className="menu flex flex-space flex-center">
                            <nav className="flex">
                                <Link to={event_home_link} className="logo"><img src={logo} alt="NetGift" /></Link>
                                <MenuFesta tipoFesta={event !== undefined ? event.template.thematics: ''} />
                            </nav>

                            <div className="nav-right flex flex-center">
                                <button className="btn toggle-modal-confirmar-presenca" data-modal="confirmar-presenca"><span className="link-menu">Confirmar presença</span></button>
                                <Link to={event_gifts_link} className="btn gradient border hover-animation"><span>Lista de presentes</span></Link>

                                <Link to={event_cart_link} className="btn-carrinho gradient fullcolor" >
                                        <i className="ng-shopping-cart-alt"></i>
                                </Link>
                                
                                <div className="menu-mobile open-menu">
                                    <span className="menu-icon"></span>
                                </div>
                            </div>
                        </div>

                        <div className="intro-header flex flex-center">
                            <h1 className="title-header" id="titulo-header"
                                style={defaultStyle({fontSize: sessions.header.titulo.texto_fonte_tamanho, textAlign: sessions.header.titulo.alinhamento, color: sessions.header.titulo.texto_fonte_cor, backgroundColor: sessions.header.titulo.texto_fundo_cor, fontFamily: sessions.header.titulo.estilo, fontWeight: sessions.header.titulo.negrito})}
                            >
                                {event !== undefined ? event.EVENTO.name: ''}
                            </h1>

                            <p className="txt-header" style={defaultStyle({fontSize: sessions.header.titulo.texto_fonte_tamanho, textAlign: sessions.header.titulo.alinhamento, color: sessions.header.titulo.texto_fonte_cor, backgroundColor: sessions.header.titulo.texto_fundo_cor, fontFamily: sessions.header.titulo.estilo, fontWeight: sessions.header.titulo.negrito})}>{event !== undefined ? event.template.description: ''}</p>

                            <div className="link-presente flex flex-center">
                                <img src={presente} alt="lista de presentes" />
                                <span>Lista de presentes</span>
                            </div>
                        </div>
                    </div>
                </header>
                
                <main>
                    <div className="container">
                        <div className="summary flex-end">
                            <div className="menu-filtros-festas flex flex-space w100">
                                <form onSubmit={handleSubmit( this.submit )} className="column-1 flex flex-space flex-end" >
                                    <div className="flex flex-column">
                                        <label htmlFor="filtro-nome">Filtre pelo nome do presente</label>

                                        <Field
                                            name="search"
                                            component="input"
                                            id="filtro-nome"
                                            type="text"
                                            required={true}
                                            placeholder="Digite o nome do presente que você deseha dar"
                                        />
                                    </div>

                                    <div className="flex flex-column">
                                        <label htmlFor="filtro-departamento">Filtre por departamento</label>
                                        <label htmlFor="filtro-departamento" className="filtro-departamento label-mobile">Departamento</label>
                                        <select name="filter_department" id="filtro-departamento" className="custom-select bg-white">
                                            {
                                                filterByCategory.items.map((item) => {
                                                    return (
                                                        <option value={item.id}  key={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="flex flex-column">
                                        <label htmlFor="filtro-preco">Filtre por preço</label>
                                        <label htmlFor="filtro-preco" className="label-mobile">Faixa de preço</label>
                                        <select name="filtro_preco" id="filtro-preco" className="custom-select bg-white">
                                            <option value="all">Todas as faixas de preço</option>
                                        </select>
                                    </div>

                                    <button className="gradient fullcolor flex flex-center"><span>Filtrar</span><i className="ng-search"></i></button>
                                </form>

                                <div className="column-2 flex jc-end flex-end">
                                    <Link to={event_cart_link} id="status-cart" className="disabled gradient fullcolor flex flex-center flex-space">
                                        <div><span className="number-gift-cart">Nenhum presente</span> no carrinho <span className="price-gift-cart"></span></div>
                                        <i className="ng-right-arrow-extend"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {
                            this.state.gifts.length > 0 ? 
                            <div className="cards-gift flex flex-wrap">
                            {
                                this.state.gifts.map((item) => {
                                    return (
                                        <div>
                                            <div className="card-gift flex flex-column" key={item.id}>
                                                <div className="card-gift-thumb">
                                                    <img src={item.url} alt={item.picture_path}/>
                                                </div>
                                                <div className="flex flex-column jc-center h50">
                                                    <div className="card-gift-name">{item.name}</div>
                                                    <div className="card-gift-price"> {item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>

                                                    <div className="flex flex-space flex-column mT20">
                                                        <div className="buttons">
                                                            <button className="gradient fullcolor add-cart" data-price={item.price} onClick={(className) => this.addOnCart(className, item, this.props.history)} >
                                                                <span className="add">Adicionar ao carrinho</span>
                                                                <span className="add add-mobile">Comprar presente</span>
                                                                <span className="remove">Remover do carrinho</span>
                                                            </button>
                                                        </div>
                                                        <button className="text-gradient one-click" onClick={(className) => this.addOnCart(className, item, this.props.history)} >Comprar com 1 clique</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal-carrinho">
                                                <div className="modal-content-carrinho">
                                                    <span className="icon-close">
                                                        <img src={iconClose} alt=""/>
                                                    </span>
                                                    <h3>Adicionar ao carrinho e continuar comprando</h3>
                                                    
                                                    <button className="gradient fullcolor">
                                                        <span>Adicionar ao carrinho</span>
                                                    </button>
                                                    
                                                    <p className="text-modal-uppercase">Compra rápida</p>
                                                    <p className="text-modal">Escolha a forma de pagamento</p>
                                                    
                                                    <button className="btn-modal" id="cartao" onClick={(className) => this.addOnCart(className, item, this.props.history)}>Cartão de crédito</button>
                                                    <button className="btn-modal" id="boleto" onClick={(className) => this.addOnCart(className, item, this.props.history)}>Boleto bancário</button>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            : ''
                        }    
                        
                    </div>
                </main>
                
                <footer>
                    <div className="container">
                        <div className="flex flex-column flex-end">
                            <div className="flex flex-space">
                                <div className="copyright">® 2019 NETGIFT - CPNJ 99.304.401/0001-00 - <Link to="#">TERMOS DE SERVIÇO</Link></div>

                                <div className="copyright copyright-mobile flex-center">
                                    <p>® 2019 NETGIFT - CPNJ 99.304.401/0001-00</p>
                                    <Link to="#" className="link-mobile">Politica de privacidade</Link>
                                    <Link to="#" className="link-mobile">Termos de serviço</Link>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="carrinho-mobile flex flex-space flex-center">
                        <div>
                            <p><span className="number-gift-cart"></span> no carrinho <span className="price-gift-cart"></span></p>
                        </div>
                        <div>
                            <Link to={event_cart_link} className="gradient fullcolor add-cart">
                                <span className="add">
                                    Ver carrinho
                                </span>
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    themeConfigurations: state.themeConfigurations.items,
    event: state.getEvent.item,
    filterByCategory: state.filterByCategory,
    getEvent: state,
    gifts: state.gifts,
    deleteCart: state.deleteCart
});

const reduxFormFilters = reduxForm({form: 'filterGifts'})(ListaPresentes);
  
export default connect(mapStateToProps, {addGiftCart, fetchGifts, fetchAddCart, fetchThemeConfigurations, fetchDeleteCart})(reduxFormFilters);
