import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import HeaderCarrinho from '../components/HeaderCarrinho';
import FooterCarrinho from '../components/FooterCarrinho';
import {  fetchGetEvent, fetchGetCart } from '../actions';

import '../assets/js/script';

import '../assets/css/style.css';

class Checkout extends Component {
    componentDidMount() {
        let id_user = localStorage.getItem('id_user');
        let id_event = localStorage.getItem('id_event');
        this.props.dispatch(fetchGetEvent(this.props.match.params.id));
        this.props.dispatch(fetchGetCart( { id_user, id_event } ));
    }
    
    render() {
        const { error, loading, getCart, getEvent } = this.props;
        let total = localStorage.getItem('total');
        let pagamento = localStorage.getItem('pagamento');
        let parcelas = localStorage.getItem('parcelas');
        let objGifts = JSON.parse(localStorage.getItem('objGifts'));

        switch(parcelas) {
            case '1': parcelas = '1x (uma vez)';
                break;
            case '2': parcelas = '2x (duas vezes)';
                break;
            case '3': parcelas = '3x (três vezes)';
                break;
            case '4': parcelas = '4x (quatro vezes)';
                break;
            default: 
        }

        if(getEvent.getEvent.event !==  undefined) {
            var name = getEvent.getEvent.event.EVENTO.owners[0].name;
        }
        
        return (
            <div className="area-convidado pagamento-3">
                <HeaderCarrinho page="checkout" nameHeader={name} />

                <main>
                    <div className="container grid flex-space">
                        <div className="nav-etapas">
                            <div className="etapa flex-center">
                                <div className="number flex flex-center active">
                                    <span>1</span>
                                </div>
                                <p>Carrinho</p>
                            </div>

                            <div className="etapa flex-center">
                                <div className="number flex flex-center active">
                                    <span>2</span>
                                </div>
                                <p>Pagamento</p>
                            </div>

                            <div className="etapa flex-center">
                                <div className="number flex flex-center active">
                                    <span>3</span>
                                </div>
                                <p>Confirmação</p>
                            </div>
                        </div>

                        <div className="intro-main flex">
                            <h2>Falta muito pouco para Davi & Letícia receberam seu presente</h2>

                            <p className="subtitulo">Sed malesuada metus ipsum, id dignissim massa scelerisque sit amet. Nam in arcu in purus fringilla posuere sed id magna.</p>
                            
                            <div>
                                {
                                    pagamento === 'Boleto'? 
                                        <Link to="#" className="link-boleto gradient fullcolor flex flex-center flex-space">Clique aqui para visualizar o boleto</Link>
                                    : ''
                                }
                                <Link to="/convidado" className="gradient fullcolor flex flex-center flex-space">Ir para o o site do casal <i className="ng-right-arrow-extend"></i></Link>
                            </div>

                            
                        </div>

                        <div className="resumo-compra">
                            <div className="title-resumo-compra">
                                <p>Resumo da transação</p>
                                <div className="line"></div>
                            </div>

                            <div className="section-transacao">
                                <p className="title-transacao">Número da transição</p>
                                <p className="text-transacao">NG012345</p>
                            </div>

                            <div className="section-transacao">
                                <p className="title-transacao">Valor da Compra</p>
                                <p className="text-transacao">{total.replace('&nbsp;', ' ')}</p>
                            </div>

                            <div className="section-transacao">
                                <p className="title-transacao">Forma de pagamento</p>
                                <p className="text-transacao">{pagamento}</p>
                            </div>

                            {
                                pagamento !== 'Boleto' ?
                                    <div className="section-transacao">
                                        <p className="title-transacao">Parcelas</p>
                                        <p className="text-transacao">{parcelas}</p>
                                    </div>
                                : ''       
                            }    

                            <div className="title-resumo-compra second-title">
                                <p>Resumo da compra</p>
                                <div className="line"></div>
                            </div>
                            {
                                objGifts.map((item) => {
                                    return (
                                        <div className="produto flex-center" key={item.id}>
                                            <p>{item.name}</p>

                                            <div className="value">
                                                <i className="ng-money-circled"></i>
                                                <span className="price">{item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                            </div>
                                        </div>   
                                    )
                                })
                            }
                        </div>
                    </div>
                </main>


                <FooterCarrinho />
            </div>
        )

    }
}

const mapStateToProps = state => ({
    getEvent: state,
    getCart: state.getCart
})
  
export default connect(mapStateToProps, {fetchGetEvent, fetchGetCart})(Checkout);