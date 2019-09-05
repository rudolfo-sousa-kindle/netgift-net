import React, { Component } from "react";
import { connect } from "react-redux";
import ImageUploader from 'react-images-upload';
import $ from 'jquery';
import axios from "axios";

import TemaComponent from "./TemaComponent";
import {fetchThemes} from "../actions/themesActions";
import {fetchGetEvent, setThemeEvent, setSaulitationEvent, setLocalEvent} from "../actions/getEventAction";
import {fetchTheme} from "../actions/themesActions"; 

import Select from 'react-select';

const image2base64 = require('image-to-base64');

var sessions = {};

sessions['header'] = {};
sessions['header']["titulo"] = {};
sessions['header']["data"] = {};
sessions['header']["cta_presentear"] = {};
sessions['header']["cta_confirmar_presenca"] = {};
sessions['header']["faltam_n_dias"] = {};
sessions['header']["background"] = {};

sessions['saudacao'] = {};
sessions['saudacao']["titulo"] = {};
sessions['saudacao']["descricao"] = {};
sessions['saudacao']["background"] = {};

sessions['localizacao'] = {};
sessions['localizacao']["titulo"] = {};
sessions['localizacao']["data"] = {};
sessions['localizacao']["endereco"] = {};
sessions['localizacao']["background"] = {};

sessions['fotos'] = {}
sessions['fotos']["titulo"] = {};
sessions['fotos']["background"] = {};

sessions['rodape'] = {};
sessions['rodape']["titulo"] = {};
sessions['rodape']["cta_presentear"] = {};
sessions['rodape']["cta_confirmar_presenca"] = {};
sessions['rodape']["faltam_n_dias"] = {};
sessions['rodape']["background"] = {};

sessions['casamento-welcome'] = {};
sessions['casamento-welcome']["casament-welcome-titulo"] = {};
sessions['casamento-welcome']["casament-welcome-description"] = {};
sessions['casamento-welcome']["casamento-welcome-background"] = {};

sessions['casamento-about'] = {};
sessions['casamento-about']["casamento-about-titulo"] = {};
sessions['casamento-about']["casamento-about-description"] = {};
sessions['casamento-about']["casamento-about-background"] = {};

sessions['casamento-padrinhos'] = {};
sessions['casamento-padrinhos']["casamento-padrinhos-title"] = {};
sessions['casamento-padrinhos']["casamento-padrinhos-description"] = {};
sessions['casamento-padrinhos']["casamento-padrinho-titulo"] = {};
sessions['casamento-padrinhos']["casamento-padrinho-description"] = {};
sessions['casamento-padrinhos']["casamento-padrinho1-titulo"] = {};
sessions['casamento-padrinhos']["casamento-padrinho1-descricao"] = {};
sessions['casamento-padrinhos']["casamento-padrinhos-background"] = {};
sessions['casamento-padrinhos']["casamento-padrinho2-titulo"] = {};
sessions['casamento-padrinhos']["casamento-padrinho2-descricao"] = {};
sessions['casamento-padrinhos']["casamento-padrinho3-titulo"] = {};
sessions['casamento-padrinhos']["casamento-padrinho3-descricao"] = {};

class SiteFesta extends Component {
    

    constructor(props) {
        super(props);
        this.state = { pictures: [],  tituloSaudacao : "", theme: '', pictureSaudacao : [], picturesFoto : [] };
        this.onDrop = this.onDrop.bind(this);
        this.onDropSaudacao = this.onDropSaudacao.bind(this);
        this.onDropFotos = this.onDropFotos.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onInputDescricao = this.onInputDescricao.bind(this);
        this.handleChangeLocal = this.handleChangeLocal.bind(this);
    }

    componentDidMount(){
        this.props.fetchThemes( null, null, null, null, null, 1);
        this.props.fetchGetEvent(this.props.match.params.id)
        .then((res) => {
            this.props.fetchTheme(res.EVENTO.theme_id).then((res) => {
                var sessions = {};

                sessions['header'] = {};
                sessions['header']["titulo"] = {};
                sessions['header']["data"] = {};
                sessions['header']["cta_presentear"] = {};
                sessions['header']["cta_confirmar_presenca"] = {};
                sessions['header']["faltam_n_dias"] = {};
                sessions['header']["background"] = {};

                sessions['saudacao'] = {};
                sessions['saudacao']["titulo"] = {};
                sessions['saudacao']["descricao"] = {};
                sessions['saudacao']["background"] = {};

                sessions['localizacao'] = {};
                sessions['localizacao']["titulo"] = {};
                sessions['localizacao']["data"] = {};
                sessions['localizacao']["endereco"] = {};
                sessions['localizacao']["background"] = {};

                sessions['fotos'] = {}
                sessions['fotos']["titulo"] = {};
                sessions['fotos']["background"] = {};

                sessions['rodape'] = {};
                sessions['rodape']["titulo"] = {};
                sessions['rodape']["cta_presentear"] = {};
                sessions['rodape']["cta_confirmar_presenca"] = {};
                sessions['rodape']["faltam_n_dias"] = {};
                sessions['rodape']["background"] = {};

                sessions['casamento-welcome'] = {};
                sessions['casamento-welcome']["casament-welcome-titulo"] = {};
                sessions['casamento-welcome']["casament-welcome-description"] = {};
                sessions['casamento-welcome']["casamento-welcome-background"] = {};

                sessions['casamento-about'] = {};
                sessions['casamento-about']["casamento-about-titulo"] = {};
                sessions['casamento-about']["casamento-about-description"] = {};
                sessions['casamento-about']["casamento-about-background"] = {};

                sessions['casamento-padrinhos'] = {};
                sessions['casamento-padrinhos']["casamento-padrinhos-title"] = {};
                sessions['casamento-padrinhos']["casamento-padrinhos-description"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho-titulo"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho-description"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho1-titulo"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho1-descricao"] = {};
                sessions['casamento-padrinhos']["casamento-padrinhos-background"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho2-titulo"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho2-descricao"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho3-titulo"] = {};
                sessions['casamento-padrinhos']["casamento-padrinho3-descricao"] = {};

                this.state = {
                    ...this.state,
                    sessions
                };

                res.sessions.map((sess) => {

                    sess.sub_sessions.map((subSess) => {
                        subSess.features.map( ( feature ) => {
                            sessions[sess.session][subSess.sub_session][feature.name] = feature.value;
                        });
                    })
                })

                this.setState(() => {
                    return sessions
                })
                    })
                })
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });
        setTimeout(() => {
            var preview = $(".uploadPicture").attr("src");
            console.log(preview)
            this.state.header.background.imagem = preview;
            console.log(this.state.header.background.imagem)
            sessions.header.background.imagem = preview;
            this.setState(() => {
                return sessions
            })
        }, 500);
    }

    onDropSaudacao(picture){
        this.setState({
            pictureSaudacao: this.state.pictureSaudacao.concat(picture)
        });
        setTimeout(() => { 
          $(".theme-site-about #avatar-about").css('background-image', 'url(' + $(".config-item-content.saudacao .uploadPictureContainer img").attr("src") + ')')
          $(".theme-site-about #avatar-about").css('background-position', 'center');
          $(".theme-site-about #avatar-about").css('background-size', 'cover');
        }, 500);
    }

    onDropFotos(picture){
        this.setState({
            picturesFoto : picture
        })
        setTimeout(() => {
            console.log(this.state.picturesFoto);
        }, 500);
    }

    onInput(){
        $("#titulo-about").text($("#tituloSaudacao").val().toString());
    }

    onInputDescricao(){
        $("#descricao-about").text($("#saudacaoDescricao").val());
    }

    handleSetTema(){
        this.props.setThemeEvent(this.props.match.params.id, this.state.theme);
    }

    handleSetSaudacao(){
        var tituloSaudacao = $("#tituloSaudacao").val().toString();
        var descricaoSaudacao = $("#saudacaoDescricao").val();
        var imagem = $(".config-item-content.saudacao .uploadPictureContainer img").attr("src");
        // console.log(imagem)
        var file = this.state.pictureSaudacao[0];
        var reader = new FileReader();
        
        if(file){
        var url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
                this.setState({
                    pictureSaudacao: [reader.result]
                });
                image2base64(this.state.pictureSaudacao[0])
                .then(
                    (response) => {
                        this.props.setSaulitationEvent(this.props.match.params.id, tituloSaudacao, descricaoSaudacao, response);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
            }.bind(this)
            
        }
    }
    
    handleSetLocal(){
        var local = $("#endereco").val();
        local = local.split(",");
        this.props.setLocalEvent(this.props.match.params.id, local);
    }

    handleChangeLocal(){
        $("#enderecoEscrito").text($("#endereco").val())
    }

    handleChange = (newValue: any, actionMeta: any ) => {

        this.state = {
            ...this.state,
            sessions
        };

        this.setState({
            theme : newValue.value
        })

        newValue.object.sessions.map((sess) => {

            sess.sub_sessions.map((subSess) => {
                subSess.features.map( ( feature ) => {
                    sessions[sess.session][subSess.sub_session][feature.name] = feature.value;
                });
            })
        })

        this.setState(() => {
            return sessions
        })
        
        console.log(this.state);

        $("#btn1").removeClass("disabled");
        $(".config-cabecalho").removeClass("disabled");
	}

    render() {
        const {items} = this.props.themes;
        const {EVENTO} = this.props.event.items
        console.log(EVENTO)

        if(EVENTO){
            $("#enderecoEscrito").text(EVENTO.address.street);
            var date = EVENTO.date;
            date = date.split('-');
            $("#descricao-address span").text(date[2] + "/" + date[1] + "/" + date[0] )
        }
        

        var categories_options = [];
        var categories_default_options = [];

		if ( undefined !== items ) {
            items.map( ( theme ) => {
                    var id = theme.id;
                    var name = theme.name;
                    categories_options.push( { value: id, label : name, object : theme } );
                })
            }
            if(EVENTO){             
                categories_default_options.push({
                    value : EVENTO.theme.id,
                    name: EVENTO.theme.name
                })
                $("#titulo-about").text(EVENTO.salutation.title);
                $("#descricao-about").text(EVENTO.salutation.text);
            }
        return(
            <div className="site-aniversario">
                <div className="container">
                    <div className="summary without-divider">
                        <div className="left">
                            <h2 className="title">Site da Festa</h2>
                            <p className="subtitle"></p>
                        </div>
                    </div>

                    <div className="flex flex-space my50">

                        <div className="config">
                            <div className="config-accordion without-toggle">

                                <div className="config-item">

                                    <div className="config-item-title flex flex-center flex-space">
                                        <p>Tema</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <div className="config-item-content tema">
                                        <div className="divider"></div>
                                        <p className="blue-small">Você está usando</p>
                                        <p className="title">{EVENTO ? EVENTO.theme.name : "--"}</p>
                                        <div className="flex flex-space flex-end">
                                            <div className="flex flex-column w56p">
                                                <label htmlFor="alterar-tema" className="blue-small">Alterar o tema</label>
                                                
                                                <Select
                                                    onChange={this.handleChange}
                                                    options={categories_options}
                                                    defaultValue={categories_default_options}
                                                    className="selecione"
                                                    closeMenuOnSelect={false}
                                                    id={"alterar-tema"}
                                                    placeholder="Selecione"
                                                    noOptionsMessage={() => { return "Tipo não encontrado." }}
                                                    isMulti={false}
                                                />
                                            </div>
                                            <button onClick={() => this.handleSetTema()} id='btn1' className="fullcolor gradient disabled">Atualizar</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="config-item config-cabecalho">
                                    <div className="config-item-title flex flex-center flex-space">
                                        <p>Cabeçalho</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <div className="config-item-content cabecalho">
                                        <div className="divider"></div>
                                        <p className="gray">Adicione até <strong>3 fotos</strong> para serem exibidas em formato de slide show.</p>
                                        <p className="blue-small">Fotos</p>

                                        {/* <button className="fullcolor gradient fileup-btn">
                                            <i className="ng-uploading"></i>Enviar arquivo
                                            <input type="file" id="upload-cabecalho" multiple accept="image/*" />
                                        </button> */}
                                            <ImageUploader
                                                buttonClassName="fileup-btn"
                                                id="upload-cabecalho"
                                                buttonText="Enviar Arquivo"
                                                withIcon={false}
                                                onChange={this.onDrop}
                                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                maxFileSize={5242880}
                                                withPreview={true}
                                                singleImage={false}
                                                fileSizeError={'true'}
                                            />

                                        <div id="upload-cabecalho-preview" className="queue"></div>
                                        <p className="gray mT20">Caso você opte por não adicionar nenhuma foto, a NETGIFT® exibirá algumas fotos genéricas</p>
                                    </div>
                                </div>

                                <div className="config-item config-saudacao">
                                    <div className="config-item-title flex flex-center flex-space">
                                        <p>Saudação</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <div className="config-item-content saudacao">
                                        <div className="divider"></div>
                                        <p className="gray">Apresente a festa para que seus convidados entendam um pouco mais sobre o evento.</p>
                                        <p className="blue-small">Fotos</p>
                                        
                                        {/* <button className="fullcolor gradient fileup-btn">
                                            <i className="ng-uploading"></i>Enviar arquivo
                                            <input type="file" id="upload-saudacao" multiple accept="image/*" />
                                        </button> */}

                                        <ImageUploader
                                            buttonClassName="fileup-btn"
                                            id="upload-saudacao"
                                            buttonText="Enviar Arquivo"
                                            withIcon={false}
                                            onChange={this.onDropSaudacao}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            withPreview={true}
                                            singleImage={true}
                                            fileSizeError={'true'}
                                        />

                                        <div id="upload-saudacao-preview" className="queue"></div>
                                        <p className="blue-small mT20">Título</p>
                                        <input onInput={() => this.onInput()} type="text" placeholder="Que bom que você está aqui!" className="bd-black" id="tituloSaudacao" defaultValue={EVENTO ? EVENTO.salutation.title : ""} />
                                        <p className="blue-small">Texto</p>
                                        <textarea onInput={() => this.onInputDescricao()} id="saudacaoDescricao" name="name" className="bd-black" defaultValue={EVENTO ? EVENTO.salutation.text : ""}></textarea>
                                        <button onClick={() => this.handleSetSaudacao()} className="fullcolor gradient w100">Atualizar</button>
                                    </div>
                                </div>

                                <div className="config-item config-local">
                                    <div className="config-item-title flex flex-center flex-space">
                                        <p>Local da Festa</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <div className="config-item-content local-da-festa">
                                        <div className="divider"></div>
                                        <p className="gray">Apresente a festa para que os seus convidados entendam um pouco mais sobre o evento.
                                        <br /> Separe Rua, Número, Cidade e Estado por vírgula</p>
                                        <p className="blue-small">Local da Festa</p>
                                        <input onInput={() => this.handleChangeLocal()} id="endereco" type="text" placeholder="R. Pereira da Silva, 259, Icaraí, Niterói - RJ" className="bd-black" />
                                        <p className="blue-small">Exibir Mapa</p>
                                        <div className="flex flex-center flex-space mT20">
                                            <label className="switch">
                                                <input type="checkbox" checked="" />
                                                <span className="slider round"></span>
                                            </label>
                                            <p>Exibindo Mapa</p>
                                            <img src="../assets/imgs/arrow-down.svg" alt="Ver mais" width="8px" />
                                        </div>
                                        <button onClick={() => this.handleSetLocal()} className="fullcolor gradient w100 mT20">Atualizar</button>
                                    </div>
                                </div>

                                <div className="config-item config-fotos">
                                    <div className="config-item-title flex flex-center flex-space">
                                        <p>Fotos</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <div className="config-item-content fotos">
                                        <div className="divider"></div>
                                        <p className="gray">Escolha até <strong>6 fotos</strong> que representem o seu motivo de festajar para compor o seu mural.</p>
                                        <p className="blue-small">Fotos</p>
                                        {/* <button className="fullcolor gradient fileup-btn"><i className="ng-uploading"></i>Enviar arquivo
                                        <input type="file" id="upload-fotos" multiple accept="image/*" /></button> */}
                                        <ImageUploader
                                            buttonClassName="fileup-btn"
                                            id="upload-fotos"
                                            buttonText="Enviar Arquivo"
                                            withIcon={false}
                                            onChange={this.onDropFotos}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            withPreview={true}
                                            singleImage={false}
                                            fileSizeError={'true'}
                                        />
                                        <div id="upload-fotos-preview" className="queue"></div>
                                    </div>
                                </div>

                                <div className="config-item config-contagem disabled">
                                    <div className="config-item-title flex flex-center flex-space">
                                        <p>Contagem Regressiva</p>
                                        <i className="ng-down-open"></i>
                                    </div>
                                    <div className="config-item-content contagem-regressiva">
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="preview-config flex">
                            <div className="card-preview window">
                                <div className="title">
                                    <div className="buttons-window">
                                        <div className="red"></div>
                                        <div className="yellow"></div>
                                        <div className="green"></div>
                                    </div>
                                </div>
                                {
                                    this.state.header ? 
                                    <TemaComponent
                                        propriedades = {this.state}
                                    />
                                    : <TemaComponent />
                                }

                                {
                                    this.state.tituloSaudacao != "" ? 
                                    <TemaComponent
                                        tituloSaudacao = {this.state.tituloSaudacao}
                                    />
                                    : ""
                                }
                                
                            </div>
                        </div>

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
    themes: state.themes,
    event: state.eventOrganizer
})
export default connect(mapStateToProps, {fetchThemes, fetchGetEvent, setThemeEvent, setSaulitationEvent, fetchTheme, setLocalEvent})(SiteFesta);