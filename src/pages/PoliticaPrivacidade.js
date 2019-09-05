import React, { Component } from "react";

import HeaderDefault from "../components/HeaderDefault.js";
import FooterDesloged from "../components/FooterDesloged.js";

import '../assets/css/responsive-deslog.css';

export default class TermosSevico extends Component {
    render() {
        return (
            <div className="termos">
                <header className="default">
                    <div className="container lg">
                        <HeaderDefault  />
                    </div>
                </header>

                <main>
                    <div className="container content webdoor-content">
                        <h2 className="title">Política de privacidade</h2>
                    </div>

                    <div className="container terms-content politics-content">
                        <p className="terms-text">MATHES SITE E SERVIÇOS LTDA., inscrita no CNPJ sob o nº 27.502.091/0001-10, com sede na Praia do Flamengo nº 254 apto. 804, Flamengo, Rio de Janeiro – RJ, CEP: 22.210-065, doravante denominado simplesmente CONTRATADO, e a pessoa física identificada na página de cadastramento da NETGIFT, que para todos os efeitos, faz parte integrante deste contrato, doravante denominado simplesmente "CONTRATANTE", celebram o presente Contrato de Assinatura, Licença de Uso de Software (“contrato” ou “Termos e Condições”), que se regerá pelas cláusulas e condições abaixo:</p>

                        <h3 className="terms-title">1. OBJETO DO CONTRATO</h3>

                        <p className="terms-text">1.1 O presente instrumento tem como objeto o uso da licença de uso do software NETGIFT, bem como a prestação de serviços de software para a contratante disponibilizados no site da NETGIFT (www.netgift.com.br).</p>

                        <h3 className="terms-title">2. LICENÇA DE USO</h3>

                        <p className="terms-text">2.1 A presente licença de uso do software NETGIFT terá os aspectos da irretratabilidade e da irrevogabilidade.</p>

                        <h3 className="terms-title">3. PRESTAÇÃO DE SERVIÇOS</h3>

                        <p className="terms-text">3.1 A prestação de serviços de software compreenderá a disponibilização de um espaço virtual para que o CONTRATANTE crie sua página (site) pessoal, mediante layouts oferecidos, recursos existentes (como lista de presentes virtuais), nas condições, nos prazos e nos custos estabelecidos pela NETGIFT.</p>

                        <h3 className="terms-title">4. OBRIGAÇÕES DA CONTRATANTE</h3>

                        <p className="terms-text">4.1 A CONTRATANTE se responsabiliza por inserir conteúdo em sua página pessoal, bem como integralmente pelo teor deste, incluindo mas não se esgotando na responsabilidade pelas imagens e informações inseridas, inclusive no que concerne ao direito autoral, ao direito de imagem, à vida privada sua ou de terceiro.</p>

                        <p className="terms-text sub-item">4.1.1 A CONTRATANTE se compromete a não publicar conteúdo que possa ser ofensivo e/ou publicitário e que não respeite este instrumento ou a legislação aplicável.</p>

                        <p className="terms-text">4.2 A CONTRATANTE se responsabiliza pelos problemas decorrentes do uso incorreto do software e do site NETGIFT.</p>
                    </div>

                    <div className="container md waves-mob"></div>

                    <FooterDesloged />
                </main>
            </div>
        )
    }
}