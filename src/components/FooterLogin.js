import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class FooterLogin extends Component {

    render() {
        return (
            <footer>
              <div className="flex flex-column ">
                  <div className="flex flex-space">
                      <div className="menu-footer"><Link to="/">Home</Link><span>|</span><Link to="/duvidas">Dúvidas</Link><span>|</span><Link to="/contato">Contato</Link></div>
                      <div className="copyright">® 2019 NETGIFT - CPNJ 99.304.401/0001-00 - <Link to="/termos">TERMOS DE SERVIÇO</Link>.</div>

                      <p className="copyright copyright-mobile">® 2019 NETGIFT - CPNJ 99.304.401/0001-00</p>
                  </div>
              </div>
          </footer>
        )
    }
}