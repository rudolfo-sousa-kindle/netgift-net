import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/imgs/logo.png";


export default class FooterCarrinho extends Component {
    render() {
        return(
            <footer>
                <div className="footer-pagamento container flex flex-space flex-center">
                    <div>
                        <img src={logo} alt="NetGift" />
                    </div>

                    <div className="copyright">® 2019 NETGIFT - CPNJ 99.304.401/0001-00 - <Link to="#">TERMOS DE SERVIÇO</Link> e <Link to="#">Política de privacidade</Link>.</div>

                    <div className="copyright copyright-mobile">
                        <p>® 2019 NETGIFT</p>
                        <p>CPNJ 99.304.401/0001-00</p>
                    </div>
                </div>
            </footer>
        )
    }
}