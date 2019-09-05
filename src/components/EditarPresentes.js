import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import $ from 'jquery';
import { fetchGiftCategories } from '../actions/giftCategoriesAction';
import { fetchGifts } from "../actions/giftActions";
import { fetchAddGift, fetchRemoveGift } from "../actions/addGiftAction";
import { fetchAllGifts } from "../actions/allGiftsEventAction";

import setSelect2 from '../assets/js/setSelect2'

import ResumeOrganizer from './ResumeOrganizer';
import ResumeOrganizerMobile from './ResumeOrganizerMobile';

class EditarPresentes extends Component {
    componentDidMount() {
        this.props.fetchGiftCategories();
        this.props.fetchGifts(null, null, 1);
        this.props.fetchAllGifts(this.props.match.params.id);
        setSelect2();

    }

    filterGifts( item ) {
        console.log( item.target.id );
        var cat = '' === item.target.id ? null : [item.target.id];
        this.props.fetchGifts(null, cat, 1);
        this.setState({
            page: 2
        })
    }

    getMoreGifts( item ){
        console.log( $( '.badges-filter.active' ).attr( 'id' ) )
        var cat = undefined === $( '.badges-filter.active' ).attr( 'id' ) || '' === $( '.badges-filter.active' ).attr( 'id' ) ? null : [$( '.badges-filter.active' ).attr( 'id' )];

        this.props.fetchGifts(null, cat, this.state.page).then((res) => {
            this.setState({
                page: this.state.page + 1
            })
        });
    }

    state = {
        page: 2
    };
    
    addGift(item) {
        let objGift = {};
        objGift.gift_id  = item.id;
        objGift.event_id = this.props.match.params.id;

        this.props.fetchAddGift(objGift);
    }

    removeGift(item) {
        let objGift = {};
        objGift.gift_id  = item.id;
        objGift.event_id = this.props.match.params.id;

        this.props.fetchRemoveGift(objGift);
    }

    render() {
        const { giftCategories, gifts } = this.props;

        return(
            <div className="lista-presentes-2">
                <div className="container">
                    <div className="summary">
                        <div className="left">
                            <h2 className="title">Lista de presentes</h2>
                        </div>

                        <ResumeOrganizerMobile id_event={this.props.match.params.id} />

                        <ResumeOrganizer />
                </div>

                <div className="flex flex-space flex-center display-none">
                    <h3>Sugestões de presentes</h3>
                    <select className="ordenar">
                        <option value="maiorpreco">Maior preço</option>
                        <option value="menorpreco">Menor preço</option>
                        <option value="az">Ordem alfabética</option>
                    </select>
                </div>

                <div className="card-default my50 w100">
                    <div className="flex flex-column">

                        <div className="filtros-presentes">
                            <div className="categorias-mobile">
                                <p className="txt-categorias-mobile">Categorias</p>

                                <div className="select-categorias">
                                    <span>Todas ({giftCategories.items.length})</span>
                                    <i className="ng-down-open"></i>
                                    <div className="status-filter flex flex-center flex-space">
                                    <button onClick={( item ) => { this.filterGifts( item ) }} className="badges-filter active" title='Todas as categorias' id={null} key={null} >
                                        Todas as Categorias
                                    </button>
                                        {
                                            giftCategories.items.length !== 0 ?
                                            giftCategories.items.map((item) => {
                                                return(
                                                    <button onClick={( item ) => { this.filterGifts( item ) }} className="badges-filter" title={item.name} id={item.id} key={item.id} >
                                                        {item.name}
                                                    </button>
                                                )
                                            })
                                            : ''
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="select-ordenar">
                                <p className="txt-categorias-mobile">Ordenar por</p>
                                <select name="" id="" className="ordenar ordenar-mobile custom-select">
                                <option value="maiorpreco">Maior preço</option>
                                <option value="menorpreco">Menor preço</option>
                                <option value="az">Ordem alfabética</option>
                            </select>
                            </div>
                        </div>

                        <div className="status-filter flex flex-center flex-space">
                            {
                                giftCategories.items.length !== 0 ?
                                giftCategories.items.map((item) => {
                                    return(
                                        <button className="badges-filter" title={item.name} key={item.id}>{item.name}</button>
                                    )
                                })
                                : ''
                            }
                        </div>

                        <div className="cards-gift flex flex-wrap">
                            
                            {
                                gifts.items.length !== 0 ?
                                gifts.items.map((item) => {
                                    var price = null !== item.price ? item.price : 0;
                                    return(
                                        <div className="card-gift click flex flex-column flex-space" key={item.id}>
                                            <div className="card-gift-thumb">
                                                <img src={item.url} alt={item.name} />
                                            </div>
                                            <div className="flex flex-column">
                                                <div className="card-gift-name">{item.name}</div>
                                                <div className="card-gift-price">{price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</div>
                                                <div className="card-gift-desc" title={item.description}>{item.description}</div>
                                                <div className="flex flex-space">
                                                    <div className="buttons">
                                                        <button className="gradient fullcolor">
                                                            <span className="add" onClick={() => this.addGift(item)}>Adicionar a lista</span>
                                                            <span className="remove" onClick={() => this.removeGift(item)}>Retirar da lista</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : ''
                            }
                        </div>
                    </div>
                <button className="btn-large" onClick={( item ) => { this.getMoreGifts( item ) }} id="btn-load-more">Carregar mais...</button>
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
    gifts: state.gifts,
    addGift: state.addGift,
    giftCategories: state.giftCategories,
    allGifts: state.allGifts
})

export default connect(mapStateToProps, {fetchGiftCategories, fetchGifts, fetchAddGift, fetchRemoveGift, fetchAllGifts})(EditarPresentes);
