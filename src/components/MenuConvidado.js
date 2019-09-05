import React, { Component } from "react";
import { Link } from "react-router-dom";

import { fetchGetEvent } from '../actions';

import logo from '../assets/imgs/logo.png';

export default class MenuConvidado extends Component {
    componentDidMount() {
        this.props.dispatch(fetchGetEvent(this.props.match.params.id));
    }

    render() {
        const { id } = this.props.match.params;
        console.log(this.props.match.params)
        const event_location_link = "/festa/" + id + "/#localizacao";
        const event_pictures_link = "/festa/" + id + "/#fotos";
        const event_gifts_link = "/festa/" + id + "/lista-de-presentes";
        const event_cart_link = "/festa/" + id + "/carrinho";

        return (
            <div className="menu flex flex-space flex-center">
                <nav className="flex">
                    <Link to="/convidado" className="logo"><img src={logo} alt="NetGift" /></Link>
                    <ul className="flex">
                        <li><a href="#" className="white-underline link-menu">Nossa História</a></li>
                        <li><a href="#" className="white-underline link-menu">Padrinhos</a></li>
                        <li><Link to={event_location_link} className="white-underline link-menu">Local da Festa</Link></li>
                        <li><Link to={event_pictures_link} className="white-underline link-menu">Nossas fotos</Link></li>
                        
                        <li className="logo-list">
                            <Link to="/">
                                <img src={logo} alt="NetGift" />
                            </Link>
                        </li>
                    </ul>
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

        )
    }
}