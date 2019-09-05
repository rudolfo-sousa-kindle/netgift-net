import React, { Component } from "react";
import { Link } from "react-router-dom";

import HeaderLogin from "../components/HeaderLogin";
import FooterLogin from '../components/FooterLogin';

export default class CadastroConcluido extends Component {
  render() {
    return (
        <body class="login tipo-cadastro cadastro-concluido bg-login responsive">
            <div class="container">
                <HeaderLogin />

                <main>
                    <div class="txt-login">
                        <h2 class="title-mobile">Cadastro concluído.</h2>
                        <h1 class="titulo">Seu cadastro foi <br /> <span class="titulo-bold">concluído com sucesso.</span></h1>

                        <h2 class="subtitulo">Agora, é só fazer a festa!</h2>
                    </div>

                    <div class="festas ball">
                        <div class="line-festa">
                            <div class="box-festa">
                                <div class="circle"></div>
                                <p class="title-festa">Infantil</p>
                            </div>

                            <div class="box-festa">
                                <div class="circle"></div>
                                <p class="title-festa">Teen</p>
                            </div>

                            <div class="box-festa">
                                <div class="circle"></div>
                                <p class="title-festa">Casamento</p>
                            </div>

                            <div class="box-festa">
                                <div class="circle"></div>
                                <p class="title-festa">Pet</p>
                            </div>

                            <div class="box-festa">
                                <div class="circle"></div>
                                <p class="title-festa">Chá de Bebê</p>
                            </div>

                            <div class="box-festa">
                                <div class="circle"></div>
                                <p class="title-festa">Adulto</p>
                            </div>
                        </div>

                        <div class="line-festa margin-festa">

                        </div>

                        <Link to="#" class="cyan">Criar minha festa depois</Link>
                    </div>
                </main>

                <p class="login-mobile">Já tem uma conta? <Link to="login.html" class="cyan">Faça login</Link></p>

                <FooterLogin />
            </div>
        </body>
    )
  }
}