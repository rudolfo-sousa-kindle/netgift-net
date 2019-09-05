import React, {Component} from "react";
import {bgImage, defaultStyle, setStyle} from "./styleFunctions";
import galeriaTemplate from "../assets/imgs/header-galeria-de-templates.png";
import buscarFesta from "../assets/imgs/header-buscar-festa.png";

class TemaComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        var {propriedades} = this.props
        return(
            <div className="card-default w100 theme-site">
                <div className="theme-site-header" style={bgImage(propriedades ? propriedades.header.background.imagem : "")}>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.header.titulo.alinhamento} : "")}>
                                <p id="titulo-header" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.header.titulo : "")}>Aniversário do José</p>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.header.data.alinhamento} : "")}>
                                <p id="data-header" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.header.data : "")}>10 de abril de 2019</p>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.header.cta_presentear.alinhamento} : "")}>
                                <a id="cta-primary-header" href="#" className="element btn-cta btn-cta-primary enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.header.cta_presentear : "")} >Presentear aniversariante</a>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.header.cta_confirmar_presenca.alinhamento} : "")}> 
                                <a id="cta-secondary-header" href="#" className="element btn-cta btn-cta-secondary enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.header.cta_confirmar_presenca : "")}>Confirmar presença</a>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.header.faltam_n_dias.alinhamento} : "")}>
                                <p id="contagem-header" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.header.faltam_n_dias : "")}>Faltam 00 dias</p>
                        </div>
                </div>
                <div className="theme-site-casamento-welcome" style={bgImage(propriedades ? propriedades.saudacao.background.imagem : "")}>
                        <div className="container-editor">
                                <p id="titulo-casamento-welcome" className="element enable-edit" data-dialog="dialog-text" style={setStyle({fontSize:"28", textAlign:"center"})}>Seja bem vindo ao nosso site</p>
                        </div>
                        <div className="container-editor">
                                <p id="descricao-casamento-welcome" className="element enable-edit" data-dialog="dialog-text" style={setStyle({fontSize:"16", textAlign:"center"})}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                        </div>
                </div>
                <div className="theme-site-about" style={bgImage(propriedades ? propriedades.saudacao.background.imagem : "")}>
                        <div className="container-editor">
                            <div id="avatar-about" className="element avatar"></div>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.saudacao.titulo.alinhamento} : "")}>
                                <p id="titulo-about" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.saudacao.titulo : "")}>Que bom que você está aqui!</p>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.saudacao.descricao.alinhamento} : "")}>
                                <p id="descricao-about" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.saudacao.descricao : "")}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                        </div>
                </div>
                <div className="theme-site-casamento-about">
                        <input type="hidden" name="background_casamento_about_image" />
                        <div className="container-editor">
                                <div id="avatar-casamento-about" className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                <div id="avatar-casamento-about2" className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                        </div>
                        <input type="hidden" name="background_about_image" />
                        <div className="container-editor">
                                <p id="titulo-casamento-about" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Nossa História</p>
                        </div>
                        <div className="container-editor">
                                <p id="descricao-casamento-about" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"16", textAlign:"center"})}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                        </div>
                </div>
                <div className="theme-site-casamento-padrinhos">
                        <div className="editar-background" data-bg="casamento-padrinhos" data-dialog="dialog-color">Editar fundo</div>
                        <input type="hidden" name="background_casamento_padrinhos_image" />
                        <div className="container-editor">
                                <p id="titulo-casamento-padrinhos" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Nossos Padrinhos</p>
                        </div>
                        <div className="container-editor">
                                <p id="descricao-casamento-padrinhos" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"16", textAlign:"center"})}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                        </div>

                        
                        <div className="theme-padrinhos-grid">
                            <div className="padrinhos-grid">
                                <div className="container-editor">
                                    <div className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                    <div className="element avatar avatar-segundo" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                </div>
                                <div className="container-editor">
                                    <h3 id="titulo-casamento-padrinho1" className="padrinhos-nome element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"30", color: "#3d3d3d", textAlign:"center"})}>Victor e Luiza</h3>
                                </div>
                                <div className="container-editor">
                                    <p id="descricao-casamento-padrinho1" data-dialog="dialog-text" className="element enable-edit" style={defaultStyle({fontSize:"16", color: "#000000", textAlign:"center"})}>Lorem ipsum dolor amet</p>
                                </div>
                            </div>
                            <div className="padrinhos-grid">
                                <div className="container-editor">
                                    <div className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                    <div className="element avatar avatar-segundo" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                </div>
                                <div className="container-editor">
                                    <h3 id="titulo-casamento-padrinho2" className="padrinhos-nome element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"30", color: "#3d3d3d", textAlign:"center"})}>Fred e Bárbara</h3>
                                </div>
                                <div className="container-editor">
                                    <p id="descricao-casamento-padrinho2" data-dialog="dialog-text" className="element enable-edit" style={defaultStyle({fontSize:"16", color: "#000000", textAlign:"center"})}>Lorem ipsum dolor amet</p>
                                </div>
                            </div>
                            <div className="padrinhos-grid">
                                <div className="container-editor">
                                    <div className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                    <div className="element avatar avatar-segundo" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                </div>
                                <div className="container-editor">
                                    <h3 id="titulo-casamento-padrinho3" className="padrinhos-nome element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"30", color: "#3d3d3d", textAlign:"center"})}>Afonso e Carlos</h3>
                                </div>
                                <div className="container-editor">
                                    <p id="descricao-casamento-padrinho3" data-dialog="dialog-text" className="element enable-edit" style={defaultStyle({fontSize:"16", color: "#000000", textAlign:"center"})}>Lorem ipsum dolor amet</p>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="theme-site-address" style={bgImage(propriedades ? propriedades.localizacao.background.imagem : "")}>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.localizacao.titulo.alinhamento} : "")}>
                                <p id="titulo-address" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.localizacao.titulo : "")}>Local da Festa</p>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.localizacao.data.alinhamento} : "")}>
                                <p id="descricao-address" data-dialog="dialog-text" className="element enable-edit" style={setStyle(propriedades ? propriedades.localizacao.data : "")}>A festa vai acontecer no dia <span>10/04/2019</span> às 20h <br /> Quer saber onde? Confere aí!</p>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.localizacao.endereco.alinhamento} : "")}>
                                <p id="endereco-address" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.localizacao.endereco : "")}><span>Casa de Festas Casamentos Perfeitos</span><span id="enderecoEscrito">R. Pereira da Silva, 259, Icaraí. Niterói - RJ</span></p>
                        </div>
                        <div className="container-editor">
                                <div id="mapa-address" className="element">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.54570134185!2d-43.319456984416874!3d-23.003727447121918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd0bafdf65637%3A0x5aec2654261140ac!2sShopping+Downtown!5e0!3m2!1spt-BR!2sbr!4v1554919549345!5m2!1spt-BR!2sbr" width="100%" height="450" frameBorder="0" style={defaultStyle({border: "none"})} allowFullScreen></iframe>
                                </div>
                        </div>
                </div>
                <div className="theme-site-album" style={bgImage(propriedades ? propriedades.fotos.background.imagem : "")}>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.fotos.titulo.alinhamento} : "")}>
                                <p id="titulo-album" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.fotos.titulo : "")}>Fotos do José</p>
                        </div>
                        <div className="container-editor">
                                <div id="grid-album" className="element">
                                        <div className="photo-album" style={bgImage("https://st3.depositphotos.com/5377682/16271/v/600/depositphotos_162716710-stock-video-young-man-sits-inside-office.jpg")}></div>
                                        <div className="photo-album" style={bgImage("https://image.freepik.com/fotos-gratis/pessoa-africana-business-american-man_1303-2149.jpg")}></div>
                                        <div className="photo-album" style={bgImage("https://png.pngtree.com/thumb_back/fw800/photos/md/2017-11-13/nature_outdoor_person_washington_man_.jpg")}></div>
                                        <div className="photo-album" style={bgImage("https://bluelabyrinths.files.wordpress.com/2015/03/pf2co57.png?w=625&h=390&crop=1")}></div>
                                        <div className="photo-album" style={bgImage("https://images.unsplash.com/photo-1499998543866-f0515d09ed09?ixlib=rb-1.2.1&w=1000&q=80")}></div>
                                        <div className="photo-album" style={bgImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzJYjuR_lh6k8gG8JfMAn4Axo4lr-TAR80CHUVXy-ZJ5MYXJoUQ")}></div>
                                </div>
                        </div>
                </div>
                <div className="theme-site-countdown" style={bgImage(propriedades ? propriedades.rodape.background.imagem : "")}>
                <input type="hidden" name="background_footer_image" />
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.rodape.titulo.alinhamento} : "")}>
                                <p id="titulo-countdown" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.rodape.titulo : "")}>Não se esqueça...</p>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.rodape.faltam_n_dias.alinhamento} : "")}>
                                <p id="descricao-countdown" className="element enable-edit" data-dialog="dialog-text" style={setStyle(propriedades ? propriedades.rodape.faltam_n_dias : "")}>Faltam apenas 00 dias para a festa!</p>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.rodape.cta_presentear.alinhamento} : "")}>
                                <a id="cta-primary-countdown" href="#" data-dialog="dialog-text" className="element btn-cta btn-cta-primary enable-edit" style={setStyle(propriedades ? propriedades.rodape.cta_presentear : "")}>Presentear aniversariante</a>
                        </div>
                        <div className="container-editor" style={setStyle(propriedades ? {alinhamento: propriedades.rodape.cta_confirmar_presenca.alinhamento} : "")}>
                                <a id="cta-secondary-countdown" href="#" data-dialog="dialog-text" className="element btn-cta btn-cta-secondary enable-edit" style={setStyle(propriedades ? propriedades.rodape.cta_confirmar_presenca : "")}>Confirmar presença</a>
                        </div>
                </div>
        </div>
        )
    }

}

export default TemaComponent;