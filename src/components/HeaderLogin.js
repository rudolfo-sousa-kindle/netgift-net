import React, { Component } from "react";
import { Link } from "react-router-dom";

import Progresso from "./Progresso";

import Logo from "../assets/imgs/logo.png";

export default class HeaderLogin extends Component {

  render() {
    return (
      <header>
          <div className="logo">
              <Link to="/">
                  <img src={Logo} alt="" />
              </Link>
          </div>

          {this.props.page === "cadastro" ? <Progresso /> : ''}

          <div className="div-btn-contato">
              <Link to="/contato" className="btn-contato">CONTATO</Link>
          </div>
      </header>
    );
  }
}
