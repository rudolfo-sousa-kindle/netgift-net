import React, { Component } from "react";
import { Link } from "react-router-dom";

import HeaderLogin from "../components/HeaderLogin";
import FooterLogin from '../components/FooterLogin';

import Facebook from "../assets/imgs/facebook-logo.svg";


export default class TipoCadastro extends Component {

  render() {
    return (
        <div className="login tipo-cadastro cadastro-concluido bg-login responsive">
            <div className="container">
                <HeaderLogin />
                <main>
                    <div className="txt-login">
                        <h1 className="titulo">Que bom ter você <br /> por aqui!</h1>

                        <h2 className="subtitulo">Como deseja se cadastrar?</h2>

                        <div className=" icon rounded yellow shadow-20">
                            <i className="ng-user-alt"></i>
                        </div>

                        <p className="p-1">Já tem uma conta?</p>
                        <p className="txt-facebook"><Link to="/login" className="faca-login">Faça login</Link> ou entre <br /> com o <Link to="#" className="cyan">Facebook.</Link></p>
                    </div>

                    <div className="form">
                        <form className="card-purple ball-top">
                            <button className="gradient fullcolor comecar-festa">Cadastrar usando em endereço de email</button>

                            <button className="btn-facebook shadow-20">
                                <img src={Facebook} alt="facebook" className="facebook-svg" />
                                <span>Cadastrar usando o facebook</span>
                            </button>

                            <p className="txt-redes-sociais">Fique tranquilo: não vamos postar nada na sua redes sociais.</p>
                        </form>
                    </div>                
                </main>

                <p className="login-mobile">Já tem uma conta? <Link to="/login" className="cyan">Faça login</Link></p>

                <FooterLogin />
            </div>
        </div>
    )
  }
}