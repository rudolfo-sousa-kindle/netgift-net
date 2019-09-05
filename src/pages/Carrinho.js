import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import HeaderCarrinho from '../components/HeaderCarrinho'
import FooterCarrinho from '../components/FooterCarrinho';
import {  fetchGetEvent, fetchGetCart, fetchAddCart } from '../actions';
import {  fetchDeleteCart } from '../actions/deleteCartAction';

import '../assets/js/script';
import $ from 'jquery';

import '../assets/css/style.css';

import cifrao from '../assets/imgs/cifrao.png';

class Carrinho extends Component {

    componentDidMount() {
        let id_user = localStorage.getItem('id_user')
        let id_event = localStorage.getItem('id_event');

        this.props.dispatch(fetchGetEvent(this.props.match.params.id));
        this.props.dispatch(fetchGetCart( { id_user, id_event } ));
    }

    objGift = {};
    addOnCart(param, item) {
        var id_user = localStorage.getItem('id_user') ? localStorage.getItem('id_user') : document.getElementById( 'id_user' ).value;
        var id_event = localStorage.getItem('id_event') ? localStorage.getItem('id_event') : document.getElementById( 'id_event' ).value;
        var gift_id = item.id;

        this.objGift['qty'] = 1;
        this.objGift['gift_id'] = gift_id;

        this.props.fetchAddCart( { id_user, id_event }, this.objGift );
    }

    deleteCart(param, item) {
        if(param.target.className === 'diminuir' && $('.numero-quantidade').html() === '1') {
            return false;
        }
        var id_user = localStorage.getItem('id_user') ? localStorage.getItem('id_user') : document.getElementById( 'id_user' ).value;
        var id_event = localStorage.getItem('id_event') ? localStorage.getItem('id_event') : document.getElementById( 'id_event' ).value;
        var gift_id = item.id;
        var cart_gift_id = item.cart_gift_id;

        this.props.fetchDeleteCart( { id_user, id_event, cart_gift_id } );
    }   

    render() {
        const { error, loading, getCart, getEvent } = this.props;
        const { items } = getCart;
        const { id } = this.props.match.params;
        const event_gifts_link = "/festa/" + id + "/lista-de-presentes";
        const event_payment_link = "/festa/" + id + "/pagamento";
        let hasPropertyItem = getCart.hasOwnProperty('item');
        let valor_total = '';

        if(hasPropertyItem) {
            var hasPropertyCart = getCart.item.hasOwnProperty('cart');
            if(hasPropertyCart) {
                var item = getCart.item;
            }
        }

        if(getCart.item !== undefined) {
            valor_total = getCart.item.valor_total;
        }

        if(getEvent.getEvent.event !==  undefined) {
            var name = getEvent.getEvent.event.EVENTO.owners[0].name;
        }

      return (
        
        <div className="area-convidado pagamento-1" >
            <HeaderCarrinho page="carrinho" nameHeader={name} />

            <main>
                <div className="container">
                    <div className="nav-etapas">
                        <div className="etapa flex-center">
                            <div className="number flex flex-center active">
                                <span>1</span>
                            </div >
                            <p>Carrinho</p>
                        </div>

                        <div className="etapa flex-center">
                            <div className="number flex flex-center">
                                <span>2</span>
                            </div>
                            <p>Pagamento</p>
                        </div>

                        <div className="etapa flex-center">
                            <div className="number flex flex-center">
                                <span>3</span>
                            </div>
                            <p>Confirmação</p>
                        </div>
                    </div>

                    <div className="intro-main">
                        <h2>Carrinho</h2>

                        <p className="subtitulo">Confira as informações dos itens que você vai presentear</p>
                    </div>

                    <div className="info-itens">
                        {
                            hasPropertyCart === true ? 
                                <div className="titulo-item">
                                    <p className="foto-presente">Foto</p>
                                    <p className="nome-presente">Item</p>
                                    <p className="valor-unitario">Valor unitário</p>
                                    <p className="quantidade">Quantidade</p>
                                    <p className="valor-final">Valor final</p>
                                </div>
                            : ''
                        }

                        {
                            hasPropertyCart === true ? item.cart.map((item) => {
                                return(
                                    <div key={item.id} className="item flex flex-center">
                                        <div className="foto-presente">
                                            <img src={item.url} alt={item.picture_path} />
                                        </div>

                                        <div className="nome-presente">
                                            <p className="">{item.name}</p>

                                            <div className="valor-final valor-final-mobile">
                                                <img src={cifrao} alt="" />
                                                <span><span className="numero-final mobile">  {item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></span>
                                            </div>
                                        </div>

                                        <div className="valor-unitario">
                                            <p><span className="numero-unitario">{item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>
                                        </div>

                                        <div className="quantidade">
                                            <div className="mudar-quantidade">
                                                <button className="diminuir" onClick={(className) => this.deleteCart(className, item)}>-</button>
                                                <span className="pipe pipe-left">|</span>
                                                <span className="numero-quantidade">1</span>
                                                <span className="pipe pipe-right">|</span>
                                                <button className="aumentar" onClick={(className) => this.addOnCart(className, item)}>+</button>
                                            </div>
                                        </div>

                                        <div className="valor-final  valor-final-desk">
                                            <img src={cifrao} alt="valor" />&nbsp;
                                            <span className="numero-final desk"> {item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                        </div>

                                        <button className="btn-close" onClick={(className) => this.deleteCart(className, item)}>
                                            <i className="ng-cancel"></i>
                                        </button>
                                    </div>
                                )
                            })
                            : 'Nenhum presente no carrinho.'
                        }
                    </div>

                    <div className="footer-carrinho">
                        <div>
                            <Link to={event_gifts_link}>
                                <button className="btn-escolher-presentes gradient border">
                                    <i className="ng-left-open-big"></i>
                                </button>
                                <button className="btn-escolher-presentes btn-escolher-presentes-text text-gradient"> Escolher mais presentes</button>
                            </Link>
                        </div>

                        <div className="total">
                            {
                                hasPropertyCart === true ?
                                <p>Total: <span></span> <span className="numero-total"> {valor_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}  
                                </span></p>
                                : ''
                            }

                            {
                                hasPropertyCart === true ?
                                <Link to={event_payment_link} className="btn-pagamento gradient fullcolor flex flex-center flex-space">Ir para o pagamento <i className="ng-right-arrow-extend"></i></Link>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </main>
            
            <div className="carrinho-mobile flex flex-space flex-center">
                <div>
                    <p className="number-gift-cart">total</p>
                    {
                        hasPropertyCart === true ?
                        <p className="price-gift-cart numero-total">{valor_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        : ''
                    }
                </div>
                <div>
                    <Link to={event_payment_link} className="gradient fullcolor add-cart">
                        <span className="add">
                            Ir para o pagamento
                        </span>
                    </Link>
                </div>
            </div>

            <FooterCarrinho />
        </div>

      )
    }
}

const mapStateToProps = state => ({
    getEvent: state,
    state: state.gifts.giftsOnCart,
    getCart: state.getCart,
    deleteCart: state.deleteCart
})
  
export default connect(mapStateToProps, {fetchGetCart, fetchAddCart, fetchDeleteCart})(Carrinho);