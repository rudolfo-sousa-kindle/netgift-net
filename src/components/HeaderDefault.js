import React, { Component } from "react";
import { Link } from "react-router-dom";

import LogoColor from "../assets/imgs/logo-color.png";
import Logo from "../assets/imgs/logo.png";

export default class HeaderDefault extends Component {

    render() {
        let classMenu = 'menu-desk';
        let classMenuMobile;
        let logoDesk = 'logo-mob';
        let logoMob = 'logo-desk';

        if (this.props.themeLight) {
            classMenu += ' light';
        } else {
            classMenu += ' dark';
        }

        if(this.props.homePage) {
            classMenuMobile = 'menu-icon';
            logoDesk = 'logo-desk';
            logoMob = 'logo-mob';
        } else {
            classMenuMobile = 'menu-icon menu-icon-purple';
            logoDesk = 'logo-mob';
            logoMob = 'logo-desk';
        }

        return (
            <div className="flex flex-space">
                <div className="logo">
                    <Link to="/">
                        <img src={LogoColor} className={logoDesk} alt="NetGift" />
                        <img src={Logo} className={logoMob} alt="NetGift" />
                    </Link>
                </div>
                <nav className={classMenu}>
                    <ul>
                        <li><Link to="/sobre">Sobre a NetGift</Link></li>
                        <li><Link to="/templates">Galeria de templates</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                        <li><Link to="/buscar-festa" className="gradient border hover-animation"><i className="ng-search"></i><span>Buscar festa</span></Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><a href="/criarFesta" className="criar-festa">Criar festa</a></li>
                    </ul>
                </nav>
                <nav className="light menu-mob">
                    <div className="menu-button menu-mobile open-menu">
                        <span className={ classMenuMobile }></span>
                    </div>
                    <ul className="menu-itens-mob">
                        <li><Link to="/sobre">Sobre a NetGift</Link></li>
                        <li><Link to="/templates">Galeria de templates</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                        <li><Link to="/buscar-festa" className="gradient border hover-animation"><i className="ng-search"></i><span>Buscar festa</span></Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><a href="/criarFesta" className="criar-festa">Criar festa</a></li>
                    </ul>
                </nav>
            </div>
        );
  }
}
