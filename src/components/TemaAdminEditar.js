import React, { Component } from "react";
import CreatableSelect from 'react-select/creatable';
import '../assets/js/fileup';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { editThemes, fetchTheme, addThemes } from "../actions/themesActions";
import { fetchCategories, fetchSetCategories } from "../actions/categoriesActions";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import Select from 'react-select';
import Loader from "./Loader";

import $ from 'jquery';

import {bgImage, bgColor, displayNone, defaultStyle} from "./styleFunctions";

import template from "../assets/imgs/thumb-template.svg";
import "../assets/css/theme-editor.css";

class TemaAdminEditar extends Component {

    componentDidMount(){
        require( '../assets/js/theme-editor.js' );
        const id = this.props.match.params.id;    
        this.props.dispatch(fetchTheme(id)).then((res) => {
            console.log(res)
            $("input[name=tema-thematics]").val(res.thematics[0].thematic_id);
            if(res.thematics[0].thematic_id == 5){
                $(".theme-site-casamento-welcome").show(500).css("display", "flex");
                $(".theme-site-casamento-about").show(500);
                $(".theme-site-about").hide(500);
                $(".theme-site-casamento-padrinhos").show(500).css("display", "flex");
                $("#titulo-header").text("Zian e Hana");
            }
        });
        this.props.dispatch( fetchCategories( 'categories' ) );
        this.props.dispatch( fetchCategories( 'thematics' ) );
    }

    state = {
        current_categories: [],
        current_thematics: [],
        available_categories: [],
        available_thematics: {},
    };

    submit = () => {
        var values = {};

        values["nome_tema"] = $("input[name=nome-tema]").val();
        values["descricao_tema"] = $("input[name=descricao-tema]").val();
        
        values["tema_categoria"] =  $("input[name=tema-categoria]").val()
        values["tema_thematics"] =  $("input[name=tema-thematics]").val()
        values["tema_status"] =  $("input[name=tema-status]").val()

        values["titulo_header_bold"] = $("input[name=titulo-header-bold]").val()
        values["titulo_header_itallic"] = $("input[name=titulo-header-itallic]").val()
        values["titulo_header_underline"] = $("input[name=titulo-header-underline]").val()
        values["titulo_header_align"] = $("input[name=titulo-header-align]").val()
        values["titulo_header_fontStyle"] = $("input[name=titulo-header-fontStyle]").val()
        values["titulo_header_fontFamily"] = $("input[name=titulo-header-fontFamily]").val()
        values["titulo_header_fontSize"] = $("input[name=titulo-header-fontSize]").val()
        values["titulo_header_fontColor"] = $("input[name=titulo-header-fontColor]").val()
        values["titulo_header_bgColor"] = $("input[name=titulo-header-bgColor]").val()

        values["data_header_bold"] = $("input[name=data-header-bold]").val()
        values["data_header_itallic"] = $("input[name=data-header-itallic]").val()
        values["data_header_underline"] = $("input[name=data-header-underline]").val()
        values["data_header_align"] = $("input[name=data-header-align]").val()
        values["data_header_fontStyle"] = $("input[name=data-header-fontStyle]").val()
        values["data_header_fontFamily"] = $("input[name=data-header-fontFamily]").val()
        values["data_header_fontSize"] = $("input[name=data-header-fontSize]").val()
        values["data_header_fontColor"] = $("input[name=data-header-fontColor]").val()
        values["data_header_bgColor"] = $("input[name=data-header-bgColor]").val()

        values["cta_primary_header_bold"] = $("input[name=cta-primary-header-bold]").val()
        values["cta_primary_header_itallic"] = $("input[name=cta-primary-header-itallic]").val()
        values["cta_primary_header_underline"] = $("input[name=cta-primary-header-underline]").val()
        values["cta_primary_header_align"] = $("input[name=cta-primary-header-align]").val()
        values["cta_primary_header_fontStyle"] = $("input[name=cta-primary-header-fontStyle]").val()
        values["cta_primary_header_fontFamily"] = $("input[name=cta-primary-header-fontFamily]").val()
        values["cta_primary_header_fontSize"] = $("input[name=cta-primary-header-fontSize]").val()
        values["cta_primary_header_fontColor"] = $("input[name=cta-primary-header-fontColor]").val()
        values["cta_primary_header_bgColor"] = $("input[name=cta-primary-header-bgColor]").val()

        values["cta_secondary_header_bold"] = $("input[name=cta-secondary-header-bold]").val()
        values["cta_secondary_header_itallic"] = $("input[name=cta-secondary-header-itallic]").val()
        values["cta_secondary_header_underline"] = $("input[name=cta-secondary-header-underline]").val()
        values["cta_secondary_header_align"] = $("input[name=cta-secondary-header-align]").val()
        values["cta_secondary_header_fontStyle"] = $("input[name=cta-secondary-header-fontStyle]").val()
        values["cta_secondary_header_fontFamily"] = $("input[name=cta-secondary-header-fontFamily]").val()
        values["cta_secondary_header_fontSize"] = $("input[name=cta-secondary-header-fontSize]").val()
        values["cta_secondary_header_fontColor"] = $("input[name=cta-secondary-header-fontColor]").val()
        values["cta_secondary_header_bgColor"] = $("input[name=cta-secondary-header-bgColor]").val()

        values["contagem_header_bold"] = $("input[name=contagem-header-bold]").val()
        values["contagem_header_itallic"] = $("input[name=contagem-header-itallic]").val()
        values["contagem_header_underline"] = $("input[name=contagem-header-underline]").val()
        values["contagem_header_align"] = $("input[name=contagem-header-align]").val()
        values["contagem_header_fontStyle"] = $("input[name=contagem-header-fontStyle]").val()
        values["contagem_header_fontFamily"] = $("input[name=contagem-header-fontFamily]").val()
        values["contagem_header_fontSize"] = $("input[name=contagem-header-fontSize]").val()
        values["contagem_header_fontColor"] = $("input[name=contagem-header-fontColor]").val()
        values["contagem_header_bgColor"] = $("input[name=contagem-header-bgColor]").val()

        values["titulo_casamento_welcome_bold"] = $("input[name=titulo-casamento-welcome-bold]").val();
        values["titulo_casamento_welcome_itallic"] = $("input[name=titulo-casamento-welcome-itallic]").val();
        values["titulo_casamento_welcome_underline"] = $("input[name=titulo-casamento-welcome-underline]").val();
        values["titulo_casamento_welcome_align"] = $("input[name=titulo-casamento-welcome-align]").val();
        values["titulo_casamento_welcome_fontStyle"] = $("input[name=titulo-casamento-welcome-fontStyle]").val();
        values["titulo_casamento_welcome_fontFamily"] = $("input[name=titulo-casamento-welcome-fontFamily]").val();
        values["titulo_casamento_welcome_fontSize"] = $("input[name=titulo-casamento-welcome-fontSize]").val();
        values["titulo_casamento_welcome_fontColor"] = $("input[name=titulo-casamento-welcome-fontColor]").val();
        values["titulo_casamento_welcome_bgColor"] = $("input[name=titulo-casamento-welcome-bgColor]").val();

        values["titulo_casamento_about_bold"] = $("input[name=titulo-casamento-about-bold]").val();
        values["titulo_casamento_about_itallic"] = $("input[name=titulo-casamento-about-itallic]").val();
        values["titulo_casamento_about_underline"] = $("input[name=titulo-casamento-about-underline]").val();
        values["titulo_casamento_about_align"] = $("input[name=titulo-casamento-about-align]").val();
        values["titulo_casamento_about_fontStyle"] = $("input[name=titulo-casamento-about-fontStyle]").val();
        values["titulo_casamento_about_fontFamily"] = $("input[name=titulo-casamento-about-fontFamily]").val();
        values["titulo_casamento_about_fontSize"] = $("input[name=titulo-casamento-about-fontSize]").val();
        values["titulo_casamento_about_fontColor"] = $("input[name=titulo-casamento-about-fontColor]").val();
        values["titulo_casamento_about_bgColor"] = $("input[name=titulo-casamento-about-bgColor]").val();

        values["descricao_casamento_welcome_bold"] = $("input[name=descricao-casamento-welcome-bold]").val();
        values["descricao_casamento_welcome_itallic"] = $("input[name=descricao-casamento-welcome-itallic]").val();
        values["descricao_casamento_welcome_underline"] = $("input[name=descricao-casamento-welcome-underline]").val();
        values["descricao_casamento_welcome_align"] = $("input[name=descricao-casamento-welcome-align]").val();
        values["descricao_casamento_welcome_fontStyle"] = $("input[name=descricao-casamento-welcome-fontStyle]").val();
        values["descricao_casamento_welcome_fontFamily"] = $("input[name=descricao-casamento-welcome-fontFamily]").val();
        values["descricao_casamento_welcome_fontSize"] = $("input[name=descricao-casamento-welcome-fontSize]").val();
        values["descricao_casamento_welcome_fontColor"] = $("input[name=descricao-casamento-welcome-fontColor]").val();
        values["descricao_casamento_welcome_bgColor"] = $("input[name=descricao-casamento-welcome-bgColor]").val();

        values["descricao_casamento_about_bold"] = $("input[name=descricao-casamento-about-bold]").val();
        values["descricao_casamento_about_itallic"] = $("input[name=descricao-casamento-about-itallic]").val();
        values["descricao_casamento_about_underline"] = $("input[name=descricao-casamento-about-underline]").val();
        values["descricao_casamento_about_align"] = $("input[name=descricao-casamento-about-align]").val();
        values["descricao_casamento_about_fontStyle"] = $("input[name=descricao-casamento-about-fontStyle]").val();
        values["descricao_casamento_about_fontFamily"] = $("input[name=descricao-casamento-about-fontFamily]").val();
        values["descricao_casamento_about_fontSize"] = $("input[name=descricao-casamento-about-fontSize]").val();
        values["descricao_casamento_about_fontColor"] = $("input[name=descricao-casamento-about-fontColor]").val();
        values["descricao_casamento_about_bgColor"] = $("input[name=descricao-casamento-about-bgColor]").val();

        values["titulo_casamento_padrinhos_bold"] = $("input[name=titulo-casamento-padrinhos-bold]").val();
        values["titulo_casamento_padrinhos_itallic"] = $("input[name=titulo-casamento-padrinhos-itallic]").val();
        values["titulo_casamento_padrinhos_underline"] = $("input[name=titulo-casamento-padrinhos-underline]").val();
        values["titulo_casamento_padrinhos_align"] = $("input[name=titulo-casamento-padrinhos-align]").val();
        values["titulo_casamento_padrinhos_fontStyle"] = $("input[name=titulo-casamento-padrinhos-fontStyle]").val();
        values["titulo_casamento_padrinhos_fontFamily"] = $("input[name=titulo-casamento-padrinhos-fontFamily]").val();
        values["titulo_casamento_padrinhos_fontSize"] = $("input[name=titulo-casamento-padrinhos-fontSize]").val();
        values["titulo_casamento_padrinhos_fontColor"] = $("input[name=titulo-casamento-padrinhos-fontColor]").val();
        values["titulo_casamento_padrinhos_bgColor"] = $("input[name=titulo-casamento-padrinhos-bgColor]").val();

        values["descricao_casamento_padrinhos_bold"] = $("input[name=descricao-casamento-padrinhos-bold]").val();
        values["descricao_casamento_padrinhos_itallic"] = $("input[name=descricao-casamento-padrinhos-itallic]").val();
        values["descricao_casamento_padrinhos_underline"] = $("input[name=descricao-casamento-padrinhos-underline]").val();
        values["descricao_casamento_padrinhos_align"] = $("input[name=descricao-casamento-padrinhos-align]").val();
        values["descricao_casamento_padrinhos_fontStyle"] = $("input[name=descricao-casamento-padrinhos-fontStyle]").val();
        values["descricao_casamento_padrinhos_fontFamily"] = $("input[name=descricao-casamento-padrinhos-fontFamily]").val();
        values["descricao_casamento_padrinhos_fontSize"] = $("input[name=descricao-casamento-padrinhos-fontSize]").val();
        values["descricao_casamento_padrinhos_fontColor"] = $("input[name=descricao-casamento-padrinhos-fontColor]").val();
        values["descricao_casamento_padrinhos_bgColor"] = $("input[name=descricao-casamento-padrinhos-bgColor]").val();

        values["titulo_casamento_padrinho1_bold"] = $("input[name=titulo-casamento-padrinho1-bold]").val();
        values["titulo_casamento_padrinho1_itallic"] = $("input[name=titulo-casamento-padrinho1-itallic]").val();
        values["titulo_casamento_padrinho1_underline"] = $("input[name=titulo-casamento-padrinho1-underline]").val();
        values["titulo_casamento_padrinho1_align"] = $("input[name=titulo-casamento-padrinho1-align]").val();
        values["titulo_casamento_padrinho1_fontStyle"] = $("input[name=titulo-casamento-padrinho1-fontStyle]").val();
        values["titulo_casamento_padrinho1_fontFamily"] = $("input[name=titulo-casamento-padrinho1-fontFamily]").val();
        values["titulo_casamento_padrinho1_fontSize"] = $("input[name=titulo-casamento-padrinho1-fontSize]").val();
        values["titulo_casamento_padrinho1_fontColor"] = $("input[name=titulo-casamento-padrinho1-fontColor]").val();
        values["titulo_casamento_padrinho1_bgColor"] = $("input[name=titulo-casamento-padrinho1-bgColor]").val();

        values["titulo_casamento_padrinho2_bold"] = $("input[name=titulo-casamento-padrinho2-bold]").val();
        values["titulo_casamento_padrinho2_itallic"] = $("input[name=titulo-casamento-padrinho2-itallic]").val();
        values["titulo_casamento_padrinho2_underline"] = $("input[name=titulo-casamento-padrinho2-underline]").val();
        values["titulo_casamento_padrinho2_align"] = $("input[name=titulo-casamento-padrinho2-align]").val();
        values["titulo_casamento_padrinho2_fontStyle"] = $("input[name=titulo-casamento-padrinho2-fontStyle]").val();
        values["titulo_casamento_padrinho2_fontFamily"] = $("input[name=titulo-casamento-padrinho2-fontFamily]").val();
        values["titulo_casamento_padrinho2_fontSize"] = $("input[name=titulo-casamento-padrinho2-fontSize]").val();
        values["titulo_casamento_padrinho2_fontColor"] = $("input[name=titulo-casamento-padrinho2-fontColor]").val();
        values["titulo_casamento_padrinho2_bgColor"] = $("input[name=titulo-casamento-padrinho2-bgColor]").val();
        
        values["titulo_casamento_padrinho3_bold"] = $("input[name=titulo-casamento-padrinho3-bold]").val();
        values["titulo_casamento_padrinho3_itallic"] = $("input[name=titulo-casamento-padrinho3-itallic]").val();
        values["titulo_casamento_padrinho3_underline"] = $("input[name=titulo-casamento-padrinho3-underline]").val();
        values["titulo_casamento_padrinho3_align"] = $("input[name=titulo-casamento-padrinho3-align]").val();
        values["titulo_casamento_padrinho3_fontStyle"] = $("input[name=titulo-casamento-padrinho3-fontStyle]").val();
        values["titulo_casamento_padrinho3_fontFamily"] = $("input[name=titulo-casamento-padrinho3-fontFamily]").val();
        values["titulo_casamento_padrinho3_fontSize"] = $("input[name=titulo-casamento-padrinho3-fontSize]").val();
        values["titulo_casamento_padrinho3_fontColor"] = $("input[name=titulo-casamento-padrinho3-fontColor]").val();
        values["titulo_casamento_padrinho3_bgColor"] = $("input[name=titulo-casamento-padrinho3-bgColor]").val();

        values["descricao_casamento_padrinho1_bold"] = $("input[name=descricao-casamento-padrinho1-bold]").val();
        values["descricao_casamento_padrinho1_itallic"] = $("input[name=descricao-casamento-padrinho1-itallic]").val();
        values["descricao_casamento_padrinho1_underline"] = $("input[name=descricao-casamento-padrinho1-underline]").val();
        values["descricao_casamento_padrinho1_align"] = $("input[name=descricao-casamento-padrinho1-align]").val();
        values["descricao_casamento_padrinho1_fontStyle"] = $("input[name=descricao-casamento-padrinho1-fontStyle]").val();
        values["descricao_casamento_padrinho1_fontFamily"] = $("input[name=descricao-casamento-padrinho1-fontFamily]").val();
        values["descricao_casamento_padrinho1_fontSize"] = $("input[name=descricao-casamento-padrinho1-fontSize]").val();
        values["descricao_casamento_padrinho1_fontColor"] = $("input[name=descricao-casamento-padrinho1-fontColor]").val();
        values["descricao_casamento_padrinho1_bgColor"] = $("input[name=descricao-casamento-padrinho1-bgColor]").val();

        values["descricao_casamento_padrinho2_bold"] = $("input[name=descricao-casamento-padrinho2-bold]").val();
        values["descricao_casamento_padrinho2_itallic"] = $("input[name=descricao-casamento-padrinho2-itallic]").val();
        values["descricao_casamento_padrinho2_underline"] = $("input[name=descricao-casamento-padrinho2-underline]").val();
        values["descricao_casamento_padrinho2_align"] = $("input[name=descricao-casamento-padrinho2-align]").val();
        values["descricao_casamento_padrinho2_fontStyle"] = $("input[name=descricao-casamento-padrinho2-fontStyle]").val();
        values["descricao_casamento_padrinho2_fontFamily"] = $("input[name=descricao-casamento-padrinho2-fontFamily]").val();
        values["descricao_casamento_padrinho2_fontSize"] = $("input[name=descricao-casamento-padrinho2-fontSize]").val();
        values["descricao_casamento_padrinho2_fontColor"] = $("input[name=descricao-casamento-padrinho2-fontColor]").val();
        values["descricao_casamento_padrinho2_bgColor"] = $("input[name=descricao-casamento-padrinho2-bgColor]").val();
        
        values["descricao_casamento_padrinho3_bold"] = $("input[name=descricao-casamento-padrinho3-bold]").val();
        values["descricao_casamento_padrinho3_itallic"] = $("input[name=descricao-casamento-padrinho3-itallic]").val();
        values["descricao_casamento_padrinho3_underline"] = $("input[name=descricao-casamento-padrinho3-underline]").val();
        values["descricao_casamento_padrinho3_align"] = $("input[name=descricao-casamento-padrinho3-align]").val();
        values["descricao_casamento_padrinho3_fontStyle"] = $("input[name=descricao-casamento-padrinho3-fontStyle]").val();
        values["descricao_casamento_padrinho3_fontFamily"] = $("input[name=descricao-casamento-padrinho3-fontFamily]").val();
        values["descricao_casamento_padrinho3_fontSize"] = $("input[name=descricao-casamento-padrinho3-fontSize]").val();
        values["descricao_casamento_padrinho3_fontColor"] = $("input[name=descricao-casamento-padrinho3-fontColor]").val();
        values["descricao_casamento_padrinho3_bgColor"] = $("input[name=descricao-casamento-padrinho3-bgColor]").val();

        values["titulo_about_bold"] = $("input[name=titulo-about-bold]").val()
        values["titulo_about_itallic"] = $("input[name=titulo-about-itallic]").val()
        values["titulo_about_underline"] = $("input[name=titulo-about-underline]").val()
        values["titulo_about_align"] = $("input[name=titulo-about-align]").val()
        values["titulo_about_fontStyle"] = $("input[name=titulo-about-fontStyle]").val()
        values["titulo_about_fontFamily"] = $("input[name=titulo-about-fontFamily]").val()
        values["titulo_about_fontSize"] = $("input[name=titulo-about-fontSize]").val()
        values["titulo_about_fontColor"] = $("input[name=titulo-about-fontColor]").val()
        values["titulo_about_bgColor"] = $("input[name=titulo-about-bgColor]").val()

        values["descricao_about_bold"] = $("input[name=descricao-about-bold]").val()
        values["descricao_about_itallic"] = $("input[name=descricao-about-itallic]").val()
        values["descricao_about_underline"] = $("input[name=descricao-about-underline]").val()
        values["descricao_about_align"] = $("input[name=descricao-about-align]").val()
        values["descricao_about_fontStyle"] = $("input[name=descricao-about-fontStyle]").val()
        values["descricao_about_fontFamily"] = $("input[name=descricao-about-fontFamily]").val()
        values["descricao_about_fontSize"] = $("input[name=descricao-about-fontSize]").val()
        values["descricao_about_fontColor"] = $("input[name=descricao-about-fontColor]").val()
        values["descricao_about_bgColor"] = $("input[name=descricao-about-bgColor]").val()

        values["titulo_address_bold"] = $("input[name=titulo-address-bold]").val()
        values["titulo_address_itallic"] = $("input[name=titulo-address-itallic]").val()
        values["titulo_address_underline"] = $("input[name=titulo-address-underline]").val()
        values["titulo_address_align"] = $("input[name=titulo-address-align]").val()
        values["titulo_address_fontStyle"] = $("input[name=titulo-address-fontStyle]").val()
        values["titulo_address_fontFamily"] = $("input[name=titulo-address-fontFamily]").val()
        values["titulo_address_fontSize"] = $("input[name=titulo-address-fontSize]").val()
        values["titulo_address_fontColor"] = $("input[name=titulo-address-fontColor]").val()
        values["titulo_address_bgColor"] = $("input[name=titulo-address-bgColor]").val()

        values["descricao_address_bold"] = $("input[name=descricao-address-bold]").val()
        values["descricao_address_itallic"] = $("input[name=descricao-address-itallic]").val()
        values["descricao_address_underline"] = $("input[name=descricao-address-underline]").val()
        values["descricao_address_align"] = $("input[name=descricao-address-align]").val()
        values["descricao_address_fontStyle"] = $("input[name=descricao-address-fontStyle]").val()
        values["descricao_address_fontFamily"] = $("input[name=descricao-address-fontFamily]").val()
        values["descricao_address_fontSize"] = $("input[name=descricao-address-fontSize]").val()
        values["descricao_address_fontColor"] = $("input[name=descricao-address-fontColor]").val()
        values["descricao_address_bgColor"] = $("input[name=descricao-address-bgColor]").val()

        values["endereco_address_bold"] = $("input[name=endereco-address-bold]").val()
        values["endereco_address_itallic"] = $("input[name=endereco-address-itallic]").val()
        values["endereco_address_underline"] = $("input[name=endereco-address-underline]").val()
        values["endereco_address_align"] = $("input[name=endereco-address-align]").val()
        values["endereco_address_fontStyle"] = $("input[name=endereco-address-fontStyle]").val()
        values["endereco_address_fontFamily"] = $("input[name=endereco-address-fontFamily]").val()
        values["endereco_address_fontSize"] = $("input[name=endereco-address-fontSize]").val()
        values["endereco_address_fontColor"] = $("input[name=endereco-address-fontColor]").val()
        values["endereco_address_bgColor"] = $("input[name=endereco-address-bgColor]").val()

        values["titulo_album_bold"] = $("input[name=titulo-album-bold]").val()
        values["titulo_album_itallic"] = $("input[name=titulo-album-itallic]").val()
        values["titulo_album_underline"] = $("input[name=titulo-album-underline]").val()
        values["titulo_album_align"] = $("input[name=titulo-album-align]").val()
        values["titulo_album_fontStyle"] = $("input[name=titulo-album-fontStyle]").val()
        values["titulo_album_fontFamily"] = $("input[name=titulo-album-fontFamily]").val()
        values["titulo_album_fontSize"] = $("input[name=titulo-album-fontSize]").val()
        values["titulo_album_fontColor"] = $("input[name=titulo-album-fontColor]").val()
        values["titulo_album_bgColor"] = $("input[name=titulo-album-bgColor]").val()

        values["titulo_countdown_bold"] = $("input[name=titulo-countdown-bold]").val()
        values["titulo_countdown_itallic"] = $("input[name=titulo-countdown-itallic]").val()
        values["titulo_countdown_underline"] = $("input[name=titulo-countdown-underline]").val()
        values["titulo_countdown_align"] = $("input[name=titulo-countdown-align]").val()
        values["titulo_countdown_fontStyle"] = $("input[name=titulo-countdown-fontStyle]").val()
        values["titulo_countdown_fontFamily"] = $("input[name=titulo-countdown-fontFamily]").val()
        values["titulo_countdown_fontSize"] = $("input[name=titulo-countdown-fontSize]").val()
        values["titulo_countdown_fontColor"] = $("input[name=titulo-countdown-fontColor]").val()
        values["titulo_countdown_bgColor"] = $("input[name=titulo-countdown-bgColor]").val()

        values["descricao_countdown_bold"] = $("input[name=descricao-countdown-bold]").val()
        values["descricao_countdown_itallic"] = $("input[name=descricao-countdown-itallic]").val()
        values["descricao_countdown_underline"] = $("input[name=descricao-countdown-underline]").val()
        values["descricao_countdown_align"] = $("input[name=descricao-countdown-align]").val()
        values["descricao_countdown_fontStyle"] = $("input[name=descricao-countdown-fontStyle]").val()
        values["descricao_countdown_fontFamily"] = $("input[name=descricao-countdown-fontFamily]").val()
        values["descricao_countdown_fontSize"] = $("input[name=descricao-countdown-fontSize]").val()
        values["descricao_countdown_fontColor"] = $("input[name=descricao-countdown-fontColor]").val()
        values["descricao_countdown_bgColor"] = $("input[name=descricao-countdown-bgColor]").val()

        values["cta_primary_countdown_bold"] = $("input[name=cta-primary-countdown-bold]").val()
        values["cta_primary_countdown_itallic"] = $("input[name=cta-primary-countdown-itallic]").val()
        values["cta_primary_countdown_underline"] = $("input[name=cta-primary-countdown-underline]").val()
        values["cta_primary_countdown_align"] = $("input[name=cta-primary-countdown-align]").val()
        values["cta_primary_countdown_fontStyle"] = $("input[name=cta-primary-countdown-fontStyle]").val()
        values["cta_primary_countdown_fontFamily"] = $("input[name=cta-primary-countdown-fontFamily]").val()
        values["cta_primary_countdown_fontSize"] = $("input[name=cta-primary-countdown-fontSize]").val()
        values["cta_primary_countdown_fontColor"] = $("input[name=cta-primary-countdown-fontColor]").val()
        values["cta_primary_countdown_bgColor"] = $("input[name=cta-primary-countdown-bgColor]").val()

        values["cta_secondary_countdown_bold"] = $("input[name=cta-secondary-countdown-bold]").val()
        values["cta_secondary_countdown_itallic"] = $("input[name=cta-secondary-countdown-itallic]").val()
        values["cta_secondary_countdown_underline"] = $("input[name=cta-secondary-countdown-underline]").val()
        values["cta_secondary_countdown_align"] = $("input[name=cta-secondary-countdown-align]").val()
        values["cta_secondary_countdown_fontStyle"] = $("input[name=cta-secondary-countdown-fontStyle]").val()
        values["cta_secondary_countdown_fontFamily"] = $("input[name=cta-secondary-countdown-fontFamily]").val()
        values["cta_secondary_countdown_fontSize"] = $("input[name=cta-secondary-countdown-fontSize]").val()
        values["cta_secondary_countdown_fontColor"] = $("input[name=cta-secondary-countdown-fontColor]").val()
        values["cta_secondary_countdown_bgColor"] = $("input[name=cta-secondary-countdown-bgColor]").val()

        values["header_background_color"] = $("input[name=header-background-color]").val();
        values["about_background_color"] = $("input[name=about-background-color]").val();
        values["casamento_welcome_background_color"] = $("input[name='casamento-welcome-background-color']").val();
        values["casamento_about_background_color"] = $("input[name='casamento-about-background-color']").val();
        values["casamento_padrinhos_background_color"] = $("input[name='casamento-padrinhos-background-color']").val();
        values["address_background_color"] = $("input[name=address-background-color]").val();
        values["album_background_color"] = $("input[name=album-background-color]").val();
        values["countdown_background_color"] = $("input[name=countdown-background-color]").val();

        if($("input[name='background_header_image']").val().indexOf(".png") != -1){
            values["header_background_image"] = $("input[name='background_header_image']").val();
        }
        if($("input[name='background_about_image']").val().indexOf(".png") != -1){
            values["about_background_image"] = $("input[name='background_about_image']").val();
        }
        if($("input[name='background_casamento_welcome_imagem']").val().indexOf(".png") != -1){
            values["casamento_welcome_background_image"] = $("input[name='background_casamento_welcome_imagem']").val();
        }
        if($("input[name='background_casamento_about_image']").val().indexOf(".png") != -1){
            values["casamento_about_background_image"] = $("input[name='background_casamento_about_image']").val();
        }
        if($("input[name='background_casamento_padrinhos_image']").val().indexOf(".png") != -1){
            values["casamento_padrinhos_background_image"] = $("input[name='background_casamento_padrinhos_image']").val();
        }
        if($("input[name='background_address_image']").val().indexOf(".png") != -1){
            values["address_background_image"] = $("input[name='background_address_image']").val();
        }
        if($("input[name='background_album_image']").val().indexOf(".png") != -1){
            values["album_background_image"] = $("input[name='background_album_image']").val();
        }
        if($("input[name='background_countdown_image']").val().indexOf(".png") != -1){
            values["footer_background_image"] = $("input[name='background_countdown_image']").val();
        }

        values["header_background_image_mobile"] = $("input[name='background_header_image_mobile']").val();
        values["about_background_image_mobile"] = $("input[name='background_about_image_mobile']").val();
        values["casamento_welcome_background_image_mobile"] = $("input[name='background_casamento_welcome_image_mobile']").val();
        values["casamento_about_background_image_mobile"] = $("input[name='background_casamento_about_image_mobile']").val();
        values["casamento_padrinhos_background_image_mobile"] = $("input[name='background_casamento_padrinhos_image_mobile']").val();
        values["address_background_image_mobile"] = $("input[name='background_address_image_mobile']").val();
        values["album_background_image_mobile"] = $("input[name='background_album_image_mobile']").val();
        values["footer_background_image_mobile"] = $("input[name='background_countdown_image_mobile']").val();

        this.props.dispatch(addThemes(values, this.props.match.params.id, true));

        console.log(values["tema_thematics"])

    }

    handleChangeCategories = (newValue: any, actionMeta: any ) => {
        // console.group('Value Changed');
        var cat = 0;
        if(newValue != null){
            newValue.map((item) => {
                cat = cat + "," + item.value;
            })
        }
        $("#tema-categoria-control").val(cat);

        if ( 'create-option' === actionMeta.action ) {
            var last_new_option;
            var last_new_index;
            newValue.map( ( current_value, index ) => {
                    if ( current_value.hasOwnProperty( '__isNew__' ) ) {
                            last_new_option = current_value;
                            last_new_index  = index;
                    }
            });
            this.props.fetchSetCategories( 'category', last_new_option.value ).then( ( response ) => {
                    newValue[ last_new_index ].value = response.id;

                    this.props.dispatch( fetchCategories( 'categories' ) );
            });
        }
    }

    handleChangeThematics = (newValue: any, actionMeta: any ) => {
        // console.group('Value Changed');
        $("input[name=tema-thematics]").val(newValue.value);
        
        if ( 'create-option' === actionMeta.action ) {
            var last_new_option;
            var last_new_index;
            if ( newValue.hasOwnProperty( '__isNew__' ) ) {
                last_new_option = newValue.value;
            }
            this.props.fetchSetCategories( 'thematic', last_new_option ).then( ( response ) => {
                    newValue.value = response.id;

                    this.props.dispatch( fetchCategories( 'thematics' ) );
            });
        }
    }

  render() {
    $(document).on("click", "#mobile-view", function(){
        if($("input[name=tema-thematics]").val() == 5){
            $(".theme-site-casamento-welcome").show(500).css("display", "flex");
            $(".theme-site-casamento-about").show(500);
            $(".theme-site-about").hide(500);
            $(".theme-site-casamento-padrinhos").show(500).css("display", "flex");
        }
    })
    $(document).on("click", "#desktop-view", function(){
        if($("input[name=tema-thematics]").val() == 5){
            $(".theme-site-casamento-welcome").show(500).css("display", "flex");
            $(".theme-site-casamento-about").show(500);
            $(".theme-site-about").hide(500);
            $(".theme-site-casamento-padrinhos").show(500).css("display", "flex");
        }
    })
    
    const { handleSubmit } = this.props;

    if ( undefined !== this.props.categories && 0 !== this.props.categories.length ) {
            this.state.current_categories = this.props.categories;
    }

    if ( undefined !== this.props.thematics && 0 !== this.props.thematics.length ) {
            this.state.current_thematics = this.props.thematics;
    }
    
    var categ_options = [];
    var thematic_options = [];

    const{ error, theme } = this.props;
    const {item, loading} = theme;
    
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

    var category_values = []
    var thematic_values = []
    
    if(item){
        // setSelect2(item.category_id);
    }

    
    if(item){
        item.sessions.map((sess) => {

            sess.sub_sessions.map((subSess) => {
                subSess.features.map( ( feature ) => {
                    sessions[sess.session][subSess.sub_session][feature.name] = feature.value;
                });
            })
        })
        
    }

    if ( undefined !== this.state.current_categories ) {
            this.state.current_categories.map( ( category, index ) => {
                    var id = category.id;
                    var name = category.name;
                    categ_options.push( { value: id, label : name } );
                    if(item){
                        item.categories.map( ( categ ) => {
                            if ( categ.category_id === id ) {
                                var default_option = {
                                    value: id,
                                    label: name,
                                };
                                category_values.push( default_option );
                            }
                        });
                    }
            })
    }

    if ( undefined !== this.state.current_thematics ) {
            this.state.current_thematics.map( ( thematic, index ) => {
                    var id = thematic.id;
                    var name = thematic.name;
                    thematic_options.push( { value: id, label : name } );
                    if(item){
                        item.thematics.map( ( themat ) => {
                            if ( themat.thematic_id === id ) {
                                var default_option = {
                                    value: id,
                                    label: name,
                                };
                                thematic_values.push( default_option );
                            }
                        });
                    }
            })
    }
if ( 0 === category_values.length ) {
    return( <Loader /> );
} else {
    var catInitial = 0;
    category_values.map((item) => {
        catInitial = catInitial + "," + item.value;
    })
    setTimeout( () => { $( '.react-draggable' ).addClass( 'hidden' ); $("#tema-categoria-control").val(catInitial); }, 2000 );
    if(loading){
        return( <Loader /> )
    }else{
    return (
        <div className="wrap-content dashboard novo-tema">
        <form onSubmit={ handleSubmit(this.submit) }>

            <div className="content-title">
                <div className="flex flex-baseline flex-space">
                    <div>
                        <h1>{item ? item.slug : "Tema"}</h1>
                        <h2>Edite, exclua ou crie novos temas</h2>
                    </div>
                </div>
            </div>

            <section className="card-options">
                <div className="content-card-options grid">
                    <div>
                        <div className="header-card-options">
                            <h2 className="title" id="editar">Editar tema</h2>
                            <p className="subtitle"></p>
                        </div>
                        <div className="line"></div>
                        <div className="main-options">
                            <div className="grid grid-input">
                                <div className="">
                                    <label htmlFor="tipo-festa" className="label-theme">Nome do tema <i className="ng-info-circled"></i></label>
                                    <input name="nome-tema" className="input-theme" type="text" placeholder="Ex: Lorem ipsum dolor sit amet" id="tipo-festa" defaultValue={item ? item.slug : ""} />
                                </div>
                                <div className="">
                                    <label htmlFor="descricao-tema" className="label-theme">Descrição do tema<i className="ng-info-circled"></i> </label>
                                    <input name="descricao-tema" className="input-theme" type="text" placeholder="Ex: Lorem ipsum dolor sit amet" id="descricao-tema" defaultValue={item ? item.description : ""}  />
                                </div>
                            </div>
                            <div className="line"></div>
                            <div className="grid grid-input">
                                <div className="">
                                    <label htmlFor="nome-festa" className="label-theme">Tipo da festa <i className="ng-info-circled"></i></label>
                                    <Select
                                        onChange={this.handleChangeThematics}
                                        options={thematic_options}
                                        className="selecione"
                                        closeMenuOnSelect={false}
                                        placeholder="Selecione"
                                        defaultValue={thematic_values}
                                        noOptionsMessage={() => { return "Tipo não encontrado." }}
                                    />
                                    <input type="hidden" name="tema-thematics" />
                                    <input type="hidden" name="tipo-de-festa" />
                                </div>
                                <div>
                                    <label htmlFor="categoria-tema" className="label-theme">Categoria do tema <i className="ng-info-circled"></i></label>
                                    <CreatableSelect
                                        isMulti
                                        isClearable
                                        onChange={this.handleChangeCategories}
                                        defaultValue={category_values}
                                        options={categ_options}
                                        className="selecione"
                                        id="tema-categoria"
                                        closeMenuOnSelect={false}
                                        placeholder="Selecione"
                                        formatCreateLabel={(input_text)=>{return <span>{'Adicionar "' + input_text + '" como nova categoria.'}</span>}}
                                    />
                                    <input type="hidden" id="tema-categoria-control" name="tema-categoria" />
                                </div>
                                <div>
                                    <span className="title-input">Visualizar <i className="ng-info-circled" title="Veja como visualizar no dispositivo"></i></span>
                                    <button id="desktop-view" className="type-view active" data-device="desk" title="Computador">
                                        <i className="ng-desktop"></i>
                                    </button>
                                    <button id="mobile-view" className="type-view" data-device="mobile" title="Celular">
                                        <i className="ng-mobile"></i>
                                    </button>
                                </div>
                                <div>
                                    <span className="title-input">Status <i className="ng-info-circled"></i></span>
                                    <select id="tema-status" className="custom-select bg-white">
                                        <option value="ativado">Ativado</option>
                                        <option value="desativado">Desativado</option>
                                    </select>
                                    <input type="hidden" name="tema-status" />
                                </div>
                            </div>
                            <button type="submit" className="gradient fullcolor">
                                    Salvar Tema
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src={template} alt="" className="template" />
                    </div>
                </div>
            </section>

            <div className="wrap-editor">
                <Draggable
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="dialog dialog-color">
                    <div className="dialog-header">
                        <div className="dialog-title">Plano de Fundo</div>
                        <div className="dialog-close">×</div>
                    </div>
                    <div className="dialog-content">
                        <div className="dialog-options">
                            <button className="dialog-option bg-color active">Cor de Fundo</button>
                            <button className="dialog-option bg-image">Imagem de Fundo</button>
                        </div>  
                        <div className="dialog-bg-option bg-color">
                            <div className="palette">  
                                <div className="colors">
                                    <div className="color" style={bgColor("b4b4b4")} data-color="#b4b4b4"></div>
                                    <div className="color" style={bgColor("fababd")} data-color="#fababd"></div>
                                    <div className="color" style={bgColor("c0c1de")} data-color="#c0c1de"></div>
                                    <div className="color" style={bgColor("d7edd6")} data-color="#d7edd6"></div>
                                    <div className="color" style={bgColor("fffccc")} data-color="#fffccc"></div>
                                    <div className="color" style={bgColor("999999")} data-color="#999999"></div>
                                    <div className="color" style={bgColor("f4777c")} data-color="#f4777c"></div>
                                    <div className="color" style={bgColor("8e8fc4")} data-color="#8e8fc4"></div>
                                    <div className="color" style={bgColor("a3d69f")} data-color="#a3d69f"></div>
                                    <div className="color" style={bgColor("fff64c")} data-color="#fff64c"></div>
                                    <div className="color" style={bgColor("707070")} data-color="#707070"></div>
                                    <div className="color" style={bgColor("ed1c24")} data-color="#ed1c24"></div>
                                    <div className="color" style={bgColor("2e3192")} data-color="#2e3192"></div>
                                    <div className="color" style={bgColor("7cc576")} data-color="#7cc576"></div>
                                    <div className="color" style={bgColor("fff200")} data-color="#fff200"></div>
                                    <div className="color" style={bgColor("333333")} data-color="#333333"></div>
                                    <div className="color" style={bgColor("af1519")} data-color="#af1519"></div>
                                    <div className="color" style={bgColor("141157")} data-color="#141157"></div>
                                    <div className="color" style={bgColor("38663a")} data-color="#38663a"></div>
                                    <div className="color" style={bgColor("7c790b")} data-color="#7c790b"></div>
                                    <div className="color" style={bgColor("000000")} data-color="#000000"></div>
                                    <div className="color" style={bgColor("5e0000")} data-color="#5e0000"></div>
                                    <div className="color" style={bgColor("000036")} data-color="#000036"></div>
                                    <div className="color" style={bgColor("043112")} data-color="#043112"></div>
                                    <div className="color" style={bgColor("3b3a00")} data-color="#3b3a00"></div>
                                </div>
                            </div> 
                            <div className="custom-color">
                                <div className="custom-color-title">Cor personalizada</div>
                                <div className="custom-colors-paleta">
                                    <div className="custom-color-paleta add open-dialog" data-dialog="dialog-color-custom" data-dialogcustomcolor="text">+</div>
                                </div>
                            </div>
                        </div>  
                        <div className="dialog-bg-option bg-image" style={displayNone}>
                            <input type="file" id="bg-header" style={displayNone} />
                            <input type="file" id="bg-about" style={displayNone} />
                            <input type="file" id="bg-address" style={displayNone} />
                            <input type="file" id="bg-album" style={displayNone} />
                            <input type="file" id="bg-countdown" style={displayNone} />
                            <input type="file" id="bg-casamento-welcome" style={displayNone} />
                            <input type="file" id="bg-casamento-about" style={displayNone} />
                            <input type="file" id="bg-casamento-padrinhos" style={displayNone} />

                            <div id="bg-header-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-about-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-address-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-album-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-countdown-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-casamento-welcome-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-casamento-about-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-casamento-padrinhos-dropzone" style={displayNone} className="drag-drop">Arraste o arquivo ou clique aqui</div>
                            <div id="bg-header-preview" className="queue" style={displayNone}></div>
                            <div id="bg-about-preview" className="queue" style={displayNone}></div>
                            <div id="bg-address-preview" className="queue" style={displayNone}></div>
                            <div id="bg-album-preview" className="queue" style={displayNone}></div>
                            <div id="bg-countdown-preview" className="queue" style={displayNone}></div>
                            <div id="bg-casamento-welcome-preview" className="queue" style={displayNone}></div>
                            <div id="bg-casamento-about-preview" className="queue" style={displayNone}></div>
                            <div id="bg-casamento-padrinhos-preview" className="queue" style={displayNone}></div>
                        </div>                   
                    </div>
                </div>
                </Draggable>
                <Draggable
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="dialog dialog-color-text">
                    <div className="dialog-header">
                        <div className="dialog-title">Cor do Texto</div>
                        <div className="dialog-close">×</div>
                    </div>
                    <div className="dialog-content">
                        <div className="palette">
                           <div className="colors">
                                <div className="color" style={bgColor("b4b4b4")} data-color="#b4b4b4"></div>
                                <div className="color" style={bgColor("fababd")} data-color="#fababd"></div>
                                <div className="color" style={bgColor("c0c1de")} data-color="#c0c1de"></div>
                                <div className="color" style={bgColor("d7edd6")} data-color="#d7edd6"></div>
                                <div className="color" style={bgColor("fffccc")} data-color="#fffccc"></div>
                                <div className="color" style={bgColor("999999")} data-color="#999999"></div>
                                <div className="color" style={bgColor("f4777c")} data-color="#f4777c"></div>
                                <div className="color" style={bgColor("8e8fc4")} data-color="#8e8fc4"></div>
                                <div className="color" style={bgColor("a3d69f")} data-color="#a3d69f"></div>
                                <div className="color" style={bgColor("fff64c")} data-color="#fff64c"></div>
                                <div className="color" style={bgColor("707070")} data-color="#707070"></div>
                                <div className="color" style={bgColor("ed1c24")} data-color="#ed1c24"></div>
                                <div className="color" style={bgColor("2e3192")} data-color="#2e3192"></div>
                                <div className="color" style={bgColor("7cc576")} data-color="#7cc576"></div>
                                <div className="color" style={bgColor("fff200")} data-color="#fff200"></div>
                                <div className="color" style={bgColor("333333")} data-color="#333333"></div>
                                <div className="color" style={bgColor("af1519")} data-color="#af1519"></div>
                                <div className="color" style={bgColor("141157")} data-color="#141157"></div>
                                <div className="color" style={bgColor("38663a")} data-color="#38663a"></div>
                                <div className="color" style={bgColor("7c790b")} data-color="#7c790b"></div>
                                <div className="color" style={bgColor("000000")} data-color="#000000"></div>
                                <div className="color" style={bgColor("5e0000")} data-color="#5e0000"></div>
                                <div className="color" style={bgColor("000036")} data-color="#000036"></div>
                                <div className="color" style={bgColor("043112")} data-color="#043112"></div>
                                <div className="color" style={bgColor("3b3a00")} data-color="#3b3a00"></div>
                           </div>
                        </div>
                        <div className="custom-color">
                            <div className="custom-color-title">Cor personalizada</div>
                            <div className="custom-colors-paleta">
                                <div className="custom-color-paleta add open-dialog" data-dialog="dialog-color-custom" data-dialogcustomcolor="text">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                </Draggable>
                <Draggable
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="dialog dialog-color-custom">
                    <div className="dialog-header">
                        <div className="dialog-title">Cor Personalizada</div>
                        <div className="dialog-close">×</div>
                    </div>
                    <div className="dialog-content">
                        <div className="picker" acp-color="#6087a7" acp-show-alpha="no" acp-show-hsl="no" acp-palette-editable="">
                        </div>
                        <button className="gradient fullcolor confirm-custom-color dialog-close">Usar cor</button>
                    </div>
                </div>
                </Draggable>
                <Draggable
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="dialog dialog-bg-text">
                    <div className="dialog-header">
                        <div className="dialog-title">Cor do Texto</div>
                        <div className="dialog-close">×</div>
                    </div>
                    <div className="dialog-content">
                        <div className="palette">
                           <div className="colors">
                                <div className="color" style={bgColor("b4b4b4")} data-color="#b4b4b4"></div>
                                <div className="color" style={bgColor("fababd")} data-color="#fababd"></div>
                                <div className="color" style={bgColor("c0c1de")} data-color="#c0c1de"></div>
                                <div className="color" style={bgColor("d7edd6")} data-color="#d7edd6"></div>
                                <div className="color" style={bgColor("fffccc")} data-color="#fffccc"></div>
                                <div className="color" style={bgColor("999999")} data-color="#999999"></div>
                                <div className="color" style={bgColor("f4777c")} data-color="#f4777c"></div>
                                <div className="color" style={bgColor("8e8fc4")} data-color="#8e8fc4"></div>
                                <div className="color" style={bgColor("a3d69f")} data-color="#a3d69f"></div>
                                <div className="color" style={bgColor("fff64c")} data-color="#fff64c"></div>
                                <div className="color" style={bgColor("707070")} data-color="#707070"></div>
                                <div className="color" style={bgColor("ed1c24")} data-color="#ed1c24"></div>
                                <div className="color" style={bgColor("2e3192")} data-color="#2e3192"></div>
                                <div className="color" style={bgColor("7cc576")} data-color="#7cc576"></div>
                                <div className="color" style={bgColor("fff200")} data-color="#fff200"></div>
                                <div className="color" style={bgColor("333333")} data-color="#333333"></div>
                                <div className="color" style={bgColor("af1519")} data-color="#af1519"></div>
                                <div className="color" style={bgColor("141157")} data-color="#141157"></div>
                                <div className="color" style={bgColor("38663a")} data-color="#38663a"></div>
                                <div className="color" style={bgColor("7c790b")} data-color="#7c790b"></div>
                                <div className="color" style={bgColor("000000")} data-color="#000000"></div>
                                <div className="color" style={bgColor("5e0000")} data-color="#5e0000"></div>
                                <div className="color" style={bgColor("000036")} data-color="#000036"></div>
                                <div className="color" style={bgColor("043112")} data-color="#043112"></div>
                                <div className="color" style={bgColor("3b3a00")} data-color="#3b3a00"></div>
                           </div>
                        </div>
                        <div className="custom-color">
                            <div className="custom-color-title">Cor personalizada</div>
                            <div className="custom-colors-paleta">
                                <div className="custom-color-paleta add open-dialog" data-dialog="dialog-color-custom" data-dialogcustomcolor="text">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                </Draggable>
                <Draggable
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="dialog dialog-bg-custom">
                    <div className="dialog-header">
                        <div className="dialog-title">Cor Personalizada</div>
                        <div className="dialog-close">×</div>
                    </div>
                    <div className="dialog-content">
                        <div className="picker" acp-color="#6087a7" acp-show-alpha="no" acp-show-hsl="no" acp-palette-editable="">
                        </div>
                        <button className="gradient fullcolor confirm-custom-color dialog-close">Usar cor</button>
                    </div>
                </div>
                </Draggable>
                <Draggable
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="dialog dialog-text">
                    {/* <input type="hidden" name="identificador" /> */}
                    <Field
                    name="identificador"
                    component= "input"
                    type="hidden"
                    />

                    <input type="hidden" name="header-background-color" defaultValue={sessions['header']['background']['fundo_cor']} />
                    <input type="hidden" name="about-background-color" defaultValue={sessions['saudacao']['background']['fundo_cor']} />
                    <input type="hidden" name="address-background-color" defaultValue={sessions['localizacao']['background']['fundo_cor']} />
                    <input type="hidden" name="album-background-color" defaultValue={sessions['fotos']['background']['fundo_cor']} />
                    <input type="hidden" name="countdown-background-color" defaultValue={sessions['rodape']['background']['fundo_cor']} />
                    <input type="hidden" name="casamento-welcome-background-color" defaultValue={sessions['casamento-welcome']['casamento-welcome-background']['fundo_cor']} />
                    <input type="hidden" name="casamento-about-background-color" defaultValue={sessions['casamento-about']['casamento-about-background']['fundo_cor']} />
                    <input type="hidden" name="casamento-padrinhos-background-color" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-background']['fundo_cor']} />

                    <input type="hidden" name="background_header_image" defaultValue={sessions['header']['background']['imagem']} />
                    <input type="hidden" name="background_about_image" defaultValue={sessions['saudacao']['background']['imagem']} />
                    <input type="hidden" name="background_address_image" defaultValue={sessions['localizacao']['background']['imagem']} />
                    <input type="hidden" name="background_album_image" defaultValue={sessions['fotos']['background']['imagem']} />
                    <input type="hidden" name="background_countdown_image" defaultValue={sessions['rodape']['background']['imagem']} />
                    <input type="hidden" name="background_casamento_welcome_imagem" defaultValue={sessions['casamento-welcome']['casamento-welcome-background']['imagem']} />
                    <input type="hidden" name="background_casamento_about_image" defaultValue={sessions['casamento-about']['casamento-about-background']['imagem']} />
                    <input type="hidden" name="background_casamento_padrinhos_image" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-background']['imagem']} />

                    <input type="hidden" name="background_header_image_mobile" defaultValue={sessions['header']['background']['image_mobile']} />
                    <input type="hidden" name="background_about_image_mobile" defaultValue={sessions['saudacao']['background']['image_mobile']} />
                    <input type="hidden" name="background_address_image_mobile" defaultValue={sessions['localizacao']['background']['image_mobile']} />
                    <input type="hidden" name="background_album_image_mobile" defaultValue={sessions['fotos']['background']['image_mobile']} />
                    <input type="hidden" name="background_countdown_image_mobile" defaultValue={sessions['rodape']['background']['image_mobile']} />
                    <input type="hidden" name="background_casamento_welcome_image_mobile" defaultValue={sessions['casamento-welcome']['casamento-welcome-background']['image_mobile']} />
                    <input type="hidden" name="background_casamento_about_image_mobile" defaultValue={sessions['casamento-about']['casamento-about-background']['image_mobile']} />
                    <input type="hidden" name="background_casamento_padrinhos_image_mobile" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-background']['image_mobile']} />

                    <input type="hidden" name="titulo-header-bold" defaultValue={ sessions['header']['titulo']['negrito'] } />
                    <input type="hidden" name="titulo-header-itallic" defaultValue={ sessions['header']['titulo']['italico'] } />
                    <input type="hidden" name="titulo-header-underline" defaultValue={ sessions['header']['titulo']['sublinhado'] } />
                    <input type="hidden" name="titulo-header-align" defaultValue={ sessions['header']['titulo']['alinhamento'] } />
                    <input type="hidden" name="titulo-header-fontStyle" defaultValue={ sessions['header']['titulo']['font'] } />
                    <input type="hidden" name="titulo-header-fontSize" defaultValue={ sessions['header']['titulo']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="titulo-header-fontFamily" defaultValue={sessions['header']['titulo']['font']} />
                    <input type="hidden" name="titulo-header-fontColor" defaultValue={ sessions['header']['titulo']['texto_fonte_cor'] } />
                    <input type="hidden" name="titulo-header-bgColor" defaultValue={ sessions['header']['titulo']['texto_fundo_cor'] } />
                    
                    <input type="hidden" name="data-header-bold" defaultValue={ sessions['header']['data']['negrito'] } />
                    <input type="hidden" name="data-header-itallic" defaultValue={ sessions['header']['data']['italico'] } />
                    <input type="hidden" name="data-header-underline" defaultValue={ sessions['header']['data']['sublinhado'] } />
                    <input type="hidden" name="data-header-align" defaultValue={ sessions['header']['data']['alinhamento'] } />
                    <input type="hidden" name="data-header-fontStyle" defaultValue={ sessions['header']['data']['font'] } />
                    <input type="hidden" name="data-header-fontSize" defaultValue={ sessions['header']['data']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="data-header-fontFamily" defaultValue={sessions['header']['data']['font']} />
                    <input type="hidden" name="data-header-fontColor" defaultValue={ sessions['header']['data']['texto_fonte_cor'] } />
                    <input type="hidden" name="data-header-bgColor" defaultValue={ sessions['header']['data']['texto_fundo_cor'] } />

                    <input type="hidden" name="cta-primary-header-bold" defaultValue={ sessions['header']['cta_presentear']['negrito'] } />
                    <input type="hidden" name="cta-primary-header-itallic" defaultValue={ sessions['header']['cta_presentear']['italico'] } />
                    <input type="hidden" name="cta-primary-header-underline" defaultValue={ sessions['header']['cta_presentear']['sublinhado'] } />
                    <input type="hidden" name="cta-primary-header-align" defaultValue={ sessions['header']['cta_presentear']['alinhamento'] } />
                    <input type="hidden" name="cta-primary-header-fontStyle" defaultValue={ sessions['header']['cta_presentear']['font'] } />
                    <input type="hidden" name="cta-primary-header-fontSize" defaultValue={ sessions['header']['cta_presentear']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="cta-primary-header-fontFamily" defaultValue={sessions['header']['cta_presentear']['font']} />
                    <input type="hidden" name="cta-primary-header-fontColor" defaultValue={ sessions['header']['cta_presentear']['texto_fonte_cor'] } />
                    <input type="hidden" name="cta-primary-header-bgColor" defaultValue={ sessions['header']['cta_presentear']['texto_fundo_cor'] } />

                    <input type="hidden" name="cta-secondary-header-bold" defaultValue={ sessions['header']['cta_confirmar_presenca']['negrito'] } />
                    <input type="hidden" name="cta-secondary-header-itallic" defaultValue={ sessions['header']['cta_confirmar_presenca']['italico'] } />
                    <input type="hidden" name="cta-secondary-header-underline" defaultValue={ sessions['header']['cta_confirmar_presenca']['sublinhado'] } />
                    <input type="hidden" name="cta-secondary-header-align" defaultValue={ sessions['header']['cta_confirmar_presenca']['alinhamento'] } />
                    <input type="hidden" name="cta-secondary-header-fontStyle" defaultValue={ sessions['header']['cta_confirmar_presenca']['font'] } />
                    <input type="hidden" name="cta-secondary-header-fontSize" defaultValue={ sessions['header']['cta_confirmar_presenca']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="cta-secondary-header-fontFamily" defaultValue={sessions['header']['cta_confirmar_presenca']['font']} />
                    <input type="hidden" name="cta-secondary-header-fontColor" defaultValue={ sessions['header']['cta_confirmar_presenca']['texto_fonte_cor'] } />
                    <input type="hidden" name="cta-secondary-header-bgColor" defaultValue={ sessions['header']['cta_confirmar_presenca']['texto_fundo_cor'] } />

                    <input type="hidden" name="contagem-header-bold" defaultValue={ sessions['header']['faltam_n_dias']['negrito'] } />
                    <input type="hidden" name="contagem-header-itallic" defaultValue={ sessions['header']['faltam_n_dias']['italico'] } />
                    <input type="hidden" name="contagem-header-underline" defaultValue={ sessions['header']['faltam_n_dias']['sublinhado'] } />
                    <input type="hidden" name="contagem-header-align" defaultValue={ sessions['header']['faltam_n_dias']['alinhamento'] } />
                    <input type="hidden" name="contagem-header-fontStyle" defaultValue={ sessions['header']['faltam_n_dias']['font'] } />
                    <input type="hidden" name="contagem-header-fontSize" defaultValue={ sessions['header']['faltam_n_dias']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="contagem-header-fontFamily" defaultValue={sessions['header']['faltam_n_dias']['font']} />
                    <input type="hidden" name="contagem-header-fontColor" defaultValue={ sessions['header']['faltam_n_dias']['texto_fonte_cor'] } />
                    <input type="hidden" name="contagem-header-bgColor" defaultValue={ sessions['header']['faltam_n_dias']['texto_fundo_cor'] } />

                    <input type="hidden" name="titulo-casamento-welcome-bold" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['negrito']}/>
                    <input type="hidden" name="titulo-casamento-welcome-itallic" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['italico']}/>
                    <input type="hidden" name="titulo-casamento-welcome-underline" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['sublinhado']}/>
                    <input type="hidden" name="titulo-casamento-welcome-align" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['alinhamento']}/>
                    <input type="hidden" name="titulo-casamento-welcome-fontStyle" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['estilo']}/>
                    <input type="hidden" name="titulo-casamento-welcome-fontFamily" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['font']}/>
                    <input type="hidden" name="titulo-casamento-welcome-fontSize" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="titulo-casamento-welcome-fontColor" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['texto_fonte_cor']}/>
                    <input type="hidden" name="titulo-casamento-welcome-bgColor" defaultValue={sessions['casamento-welcome']['casament-welcome-titulo']['texto_fundo_cor']}/>

                    <input type="hidden" name="descricao-casamento-welcome-bold" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-welcome-itallic" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['italico']}/>
                    <input type="hidden" name="descricao-casamento-welcome-underline" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['sublinhado']}/>
                    <input type="hidden" name="descricao-casamento-welcome-align" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['alinhamento']}/>
                    <input type="hidden" name="descricao-casamento-welcome-fontStyle" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['estilo']}/>
                    <input type="hidden" name="descricao-casamento-welcome-fontFamily" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['font']}/>
                    <input type="hidden" name="descricao-casamento-welcome-fontSize" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="descricao-casamento-welcome-fontColor" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['texto_fonte_cor']}/>
                    <input type="hidden" name="descricao-casamento-welcome-bgColor" defaultValue={sessions['casamento-welcome']['casament-welcome-description']['texto_fundo_cor']}/>

                    <input type="hidden" name="titulo-casamento-about-bold" defaultValue={sessions['casamento-about']['casamento-about-titulo']['negrito']}/>
                    <input type="hidden" name="titulo-casamento-about-itallic" defaultValue={sessions['casamento-about']['casamento-about-titulo']['italico']}/>
                    <input type="hidden" name="titulo-casamento-about-underline" defaultValue={sessions['casamento-about']['casamento-about-titulo']['sublinhado']}/>
                    <input type="hidden" name="titulo-casamento-about-align" defaultValue={sessions['casamento-about']['casamento-about-titulo']['alinhamento']}/>
                    <input type="hidden" name="titulo-casamento-about-fontStyle" defaultValue={sessions['casamento-about']['casamento-about-titulo']['estilo']}/>
                    <input type="hidden" name="titulo-casamento-about-fontFamily" defaultValue={sessions['casamento-about']['casamento-about-titulo']['font']}/>
                    <input type="hidden" name="titulo-casamento-about-fontSize" defaultValue={sessions['casamento-about']['casamento-about-titulo']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="titulo-casamento-about-fontColor" defaultValue={sessions['casamento-about']['casamento-about-titulo']['texto_fonte_cor']}/>
                    <input type="hidden" name="titulo-casamento-about-bgColor" defaultValue={sessions['casamento-about']['casamento-about-titulo']['texto_fundo_cor']}/>	

                    <input type="hidden" name="descricao-casamento-about-bold" defaultValue={sessions['casamento-about']['casamento-about-description']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-about-itallic" defaultValue={sessions['casamento-about']['casamento-about-description']['italico']}/>
                    <input type="hidden" name="descricao-casamento-about-underline" defaultValue={sessions['casamento-about']['casamento-about-description']['sublinhado']}/>
                    <input type="hidden" name="descricao-casamento-about-align" defaultValue={sessions['casamento-about']['casamento-about-description']['alinhamento']}/>
                    <input type="hidden" name="descricao-casamento-about-fontStyle" defaultValue={sessions['casamento-about']['casamento-about-description']['estilo']}/>
                    <input type="hidden" name="descricao-casamento-about-fontFamily" defaultValue={sessions['casamento-about']['casamento-about-description']['font']}/>
                    <input type="hidden" name="descricao-casamento-about-fontSize" defaultValue={sessions['casamento-about']['casamento-about-description']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="descricao-casamento-about-fontColor" defaultValue={sessions['casamento-about']['casamento-about-description']['texto_fonte_cor']}/>
                    <input type="hidden" name="descricao-casamento-about-bgColor" defaultValue={sessions['casamento-about']['casamento-about-description']['texto_fundo_cor']}/>	

                    <input type="hidden" name="titulo-casamento-padrinho1-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['negrito']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['italico']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['sublinhado']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['alinhamento']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['estilo']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['font']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['texto_fonte_cor']}/>
                    <input type="hidden" name="titulo-casamento-padrinho1-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['texto_fundo_cor']}/>	

                    <input type="hidden" name="descricao-casamento-padrinho1-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['italico']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['sublinhado']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['alinhamento']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['estilo']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['font']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['texto_fonte_cor']}/>
                    <input type="hidden" name="descricao-casamento-padrinho1-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['texto_fundo_cor']}/>

                    <input type="hidden" name="titulo-casamento-padrinhos-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['negrito']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['italico']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['sublinhado']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['alinhamento']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['estilo']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['font']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['texto_fonte_cor']}/>
                    <input type="hidden" name="titulo-casamento-padrinhos-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-title']['texto_fundo_cor']}/>	

                    <input type="hidden" name="descricao-casamento-padrinhos-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['italico']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['sublinhado']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['alinhamento']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['estilo']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['font']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['texto_fonte_cor']}/>
                    <input type="hidden" name="descricao-casamento-padrinhos-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinhos-description']['texto_fundo_cor']}/>	

                    <input type="hidden" name="titulo-casamento-padrinho2-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['negrito']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['italico']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['sublinhado']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['alinhamento']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['estilo']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['font']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['texto_fonte_cor']}/>
                    <input type="hidden" name="titulo-casamento-padrinho2-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['texto_fundo_cor']}/>

                    <input type="hidden" name="descricao-casamento-padrinho2-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho2-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito']}/>		

                    <input type="hidden" name="titulo-casamento-padrinho3-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['negrito']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['italico']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['sublinhado']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['alinhamento']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['estilo']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['font']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['texto_fonte_cor']}/>
                    <input type="hidden" name="titulo-casamento-padrinho3-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['texto_fundo_cor']}/>	

                    <input type="hidden" name="descricao-casamento-padrinho3-bold" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['negrito']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-itallic" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['italico']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-underline" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['sublinhado']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-align" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['alinhamento']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-fontStyle" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['estilo']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-fontFamily" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['font']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-fontSize" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['texto_fonte_tamanho']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-fontColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['texto_fonte_cor']}/>
                    <input type="hidden" name="descricao-casamento-padrinho3-bgColor" defaultValue={sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['texto_fundo_cor']}/>

                    <input type="hidden" name="titulo-about-bold" defaultValue={ sessions['saudacao']['titulo']['negrito'] } />
                    <input type="hidden" name="titulo-about-itallic" defaultValue={ sessions['saudacao']['titulo']['italico'] } />
                    <input type="hidden" name="titulo-about-underline" defaultValue={ sessions['saudacao']['titulo']['sublinhado'] } />
                    <input type="hidden" name="titulo-about-align" defaultValue={ sessions['saudacao']['titulo']['alinhamento'] } />
                    <input type="hidden" name="titulo-about-fontStyle" defaultValue={ sessions['saudacao']['titulo']['font'] } />
                    <input type="hidden" name="titulo-about-fontSize" defaultValue={ sessions['saudacao']['titulo']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="titulo-about-fontFamily" defaultValue={sessions['saudacao']['titulo']['font']} />
                    <input type="hidden" name="titulo-about-fontColor" defaultValue={ sessions['saudacao']['titulo']['texto_fonte_cor'] } />
                    <input type="hidden" name="titulo-about-bgColor" defaultValue={ sessions['saudacao']['titulo']['texto_fundo_cor'] } />

                    <input type="hidden" name="descricao-about-bold" defaultValue={ sessions['saudacao']['descricao']['negrito'] } />
                    <input type="hidden" name="descricao-about-itallic" defaultValue={ sessions['saudacao']['descricao']['italico'] } />
                    <input type="hidden" name="descricao-about-underline" defaultValue={ sessions['saudacao']['descricao']['sublinhado'] } />
                    <input type="hidden" name="descricao-about-align" defaultValue={ sessions['saudacao']['descricao']['alinhamento'] } />
                    <input type="hidden" name="descricao-about-fontStyle" defaultValue={ sessions['saudacao']['descricao']['font'] } />
                    <input type="hidden" name="descricao-about-fontSize" defaultValue={ sessions['saudacao']['descricao']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="decricao-about-fontFamily" defaultValue={sessions['saudacao']['descricao']['font']} />
                    <input type="hidden" name="descricao-about-fontColor" defaultValue={ sessions['saudacao']['descricao']['texto_fonte_cor'] } />
                    <input type="hidden" name="descricao-about-bgColor" defaultValue={ sessions['saudacao']['descricao']['texto_fundo_cor'] } />
                    
                    <input type="hidden" name="titulo-address-bold" defaultValue={ sessions['localizacao']['titulo']['negrito'] } />
                    <input type="hidden" name="titulo-address-itallic" defaultValue={ sessions['localizacao']['titulo']['italico'] } />
                    <input type="hidden" name="titulo-address-underline" defaultValue={ sessions['localizacao']['titulo']['sublinhado'] } />
                    <input type="hidden" name="titulo-address-align" defaultValue={ sessions['localizacao']['titulo']['alinhamento'] } />
                    <input type="hidden" name="titulo-address-fontStyle" defaultValue={ sessions['localizacao']['titulo']['font'] } />
                    <input type="hidden" name="titulo-address-fontSize" defaultValue={ sessions['localizacao']['titulo']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="titulo-address-fontFamily" defaultValue={sessions['localizacao']['titulo']['font']} />
                    <input type="hidden" name="titulo-address-fontColor" defaultValue={ sessions['localizacao']['titulo']['texto_fonte_cor'] } />
                    <input type="hidden" name="titulo-address-bgColor" defaultValue={ sessions['localizacao']['titulo']['texto_fundo_cor'] } />

                    <input type="hidden" name="descricao-address-bold" defaultValue={ sessions['localizacao']['data']['negrito'] } />
                    <input type="hidden" name="descricao-address-itallic" defaultValue={ sessions['localizacao']['data']['italico'] } />
                    <input type="hidden" name="descricao-address-underline" defaultValue={ sessions['localizacao']['data']['sublinhado'] } />
                    <input type="hidden" name="descricao-address-align" defaultValue={ sessions['localizacao']['data']['alinhamento'] } />
                    <input type="hidden" name="descricao-address-fontStyle" defaultValue={ sessions['localizacao']['data']['font'] } />
                    <input type="hidden" name="descricao-address-fontSize" defaultValue={ sessions['localizacao']['data']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="descricao-address-fontFamily" defaultValue={sessions['localizacao']['data']['font']} />
                    <input type="hidden" name="descricao-address-fontColor" defaultValue={ sessions['localizacao']['data']['texto_fonte_cor'] } />
                    <input type="hidden" name="descricao-address-bgColor" defaultValue={ sessions['localizacao']['data']['texto_fundo_cor'] } />

                    <input type="hidden" name="endereco-address-bold" defaultValue={ sessions['localizacao']['endereco']['negrito'] } />
                    <input type="hidden" name="endereco-address-itallic" defaultValue={ sessions['localizacao']['endereco']['italico'] } />
                    <input type="hidden" name="endereco-address-underline" defaultValue={ sessions['localizacao']['endereco']['sublinhado'] } />
                    <input type="hidden" name="endereco-address-align" defaultValue={ sessions['localizacao']['endereco']['alinhamento'] } />
                    <input type="hidden" name="endereco-address-fontStyle" defaultValue={ sessions['localizacao']['endereco']['font'] } />
                    <input type="hidden" name="endereco-address-fontSize" defaultValue={ sessions['localizacao']['endereco']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="endereco-address-fontFamily" defaultValue={sessions['localizacao']['endereco']['font']} />
                    <input type="hidden" name="endereco-address-fontColor" defaultValue={ sessions['localizacao']['endereco']['texto_fonte_cor'] } />
                    <input type="hidden" name="endereco-address-bgColor" defaultValue={ sessions['localizacao']['endereco']['texto_fundo_cor'] } />

                    <input type="hidden" name="titulo-album-bold" defaultValue={ sessions['fotos']['titulo']['negrito'] } />
                    <input type="hidden" name="titulo-album-itallic" defaultValue={ sessions['fotos']['titulo']['italico'] } />
                    <input type="hidden" name="titulo-album-underline" defaultValue={ sessions['fotos']['titulo']['sublinhado'] } />
                    <input type="hidden" name="titulo-album-align" defaultValue={ sessions['fotos']['titulo']['alinhamento'] } />
                    <input type="hidden" name="titulo-album-fontStyle" defaultValue={ sessions['fotos']['titulo']['font'] } />
                    <input type="hidden" name="titulo-album-fontSize" defaultValue={ sessions['fotos']['titulo']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="titulo-album-fontFamily" defaultValue={sessions['fotos']['titulo']['font']} />
                    <input type="hidden" name="titulo-album-fontColor" defaultValue={ sessions['fotos']['titulo']['texto_fonte_cor'] } />
                    <input type="hidden" name="titulo-album-bgColor" defaultValue={ sessions['fotos']['titulo']['texto_fundo_cor'] } />

                    <input type="hidden" name="titulo-countdown-bold" defaultValue={ sessions['rodape']['titulo']['negrito'] } />
                    <input type="hidden" name="titulo-countdown-itallic" defaultValue={ sessions['rodape']['titulo']['italico'] } />
                    <input type="hidden" name="titulo-countdown-underline" defaultValue={ sessions['rodape']['titulo']['sublinhado'] } />
                    <input type="hidden" name="titulo-countdown-align" defaultValue={ sessions['rodape']['titulo']['alinhamento'] } />
                    <input type="hidden" name="titulo-countdown-fontStyle" defaultValue={ sessions['rodape']['titulo']['font'] } />
                    <input type="hidden" name="titulo-countdown-fontSize" defaultValue={ sessions['rodape']['titulo']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="titulo-countdown-fontFamily" defaultValue={sessions['rodape']['titulo']['font']} />
                    <input type="hidden" name="titulo-countdown-fontColor" defaultValue={ sessions['rodape']['titulo']['texto_fonte_cor'] } />
                    <input type="hidden" name="titulo-countdown-bgColor" defaultValue={ sessions['rodape']['titulo']['texto_fundo_cor'] } />

                    <input type="hidden" name="descricao-countdown-bold" defaultValue={ sessions['rodape']['faltam_n_dias']['negrito'] } />
                    <input type="hidden" name="descricao-countdown-itallic" defaultValue={ sessions['rodape']['faltam_n_dias']['italico'] } />
                    <input type="hidden" name="descricao-countdown-underline" defaultValue={ sessions['rodape']['faltam_n_dias']['sublinhado'] } />
                    <input type="hidden" name="descricao-countdown-align" defaultValue={ sessions['rodape']['faltam_n_dias']['alinhamento'] } />
                    <input type="hidden" name="descricao-countdown-fontStyle" defaultValue={ sessions['rodape']['faltam_n_dias']['font'] } />
                    <input type="hidden" name="descricao-countdown-fontSize" defaultValue={ sessions['rodape']['faltam_n_dias']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="descricao-countdown-fontFamily" defaultValue={sessions['rodape']['faltam_n_dias']['font']} />
                    <input type="hidden" name="descricao-countdown-fontColor" defaultValue={ sessions['rodape']['faltam_n_dias']['texto_fonte_cor'] } />
                    <input type="hidden" name="descricao-countdown-bgColor" defaultValue={ sessions['rodape']['faltam_n_dias']['texto_fundo_cor'] } />

                    <input type="hidden" name="cta-primary-countdown-bold" defaultValue={ sessions['rodape']['cta_presentear']['negrito'] } />
                    <input type="hidden" name="cta-primary-countdown-itallic" defaultValue={ sessions['rodape']['cta_presentear']['italico'] } />
                    <input type="hidden" name="cta-primary-countdown-underline" defaultValue={ sessions['rodape']['cta_presentear']['sublinhado'] } />
                    <input type="hidden" name="cta-primary-countdown-align" defaultValue={ sessions['rodape']['cta_presentear']['alinhamento'] } />
                    <input type="hidden" name="cta-primary-countdown-fontStyle" defaultValue={ sessions['rodape']['cta_presentear']['font'] } />
                    <input type="hidden" name="cta-primary-countdown-fontSize" defaultValue={ sessions['rodape']['cta_presentear']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="cta_primary-countdown-fontFamily" defaultValue={sessions['rodape']['cta_presentear']['font']} />
                    <input type="hidden" name="cta-primary-countdown-fontColor" defaultValue={ sessions['rodape']['cta_presentear']['texto_fonte_cor'] } />
                    <input type="hidden" name="cta-primary-countdown-bgColor" defaultValue={ sessions['rodape']['cta_presentear']['texto_fundo_cor'] } />

                    <input type="hidden" name="cta-secondary-countdown-bold" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['negrito'] } />
                    <input type="hidden" name="cta-secondary-countdown-itallic" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['italico'] } />
                    <input type="hidden" name="cta-secondary-countdown-underline" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['sublinhado'] } />
                    <input type="hidden" name="cta-secondary-countdown-align" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['alinhamento'] } />
                    <input type="hidden" name="cta-secondary-countdown-fontStyle" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['font'] } />
                    <input type="hidden" name="cta-secondary-countdown-fontSize" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['texto_fonte_tamanho'] } />
                    <input type="hidden" name="cta-secondary-countdown-fontFamily" defaultValue={sessions['header']['cta_confirmar_presenca']['font']} />
                    <input type="hidden" name="cta-secondary-countdown-fontColor" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['texto_fonte_cor'] } />
                    <input type="hidden" name="cta-secondary-countdown-bgColor" defaultValue={ sessions['rodape']['cta_confirmar_presenca']['texto_fundo_cor'] } />

                    {/* <Field
                    name="titulo-header-bold"
                    component= "input"
                    type="text"
                    /> */}
                    <div className="dialog-header">
                        <div className="dialog-title">Editar Texto</div>
                        <div className="dialog-close">×</div>
                    </div>
                    <div className="dialog-content">
                        <div className="dialog-options dialog-text-options">
                            <div className="flex flex-space w100 text-style-icons">
                                <div>
                                    <input type="checkbox" name="fontWeight" value="bold" id="fwb" />
                                    <label htmlFor="fwb">N</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="fontStyle" value="italic" id="fsi" />
                                    <label htmlFor="fsi">I</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="textDecoration" value="underline" id="tdu" />
                                    <label htmlFor="tdu">S</label>
                                </div>
                                <div>
                                    <label className="whitespace"></label>
                                </div>
                                <div>
                                    <input type="radio" name="textAlign" value="left" id="tal" />
                                    <label htmlFor="tal" className="textAlign textAlignLeft"></label>
                                </div>
                                <div>
                                    <input type="radio" name="textAlign" value="center" id="tac" />
                                    <label htmlFor="tac" className="textAlign textAlignCenter"></label>
                                </div>
                                <div>
                                    <input type="radio" name="textAlign" value="right" id="tar" />
                                    <label htmlFor="tar" className="textAlign textAlignRight"></label>
                                </div>
                            </div>
                        </div>
                        <div className="dialog-options dialog-text-options">
                            <label htmlFor="textClass">Estilo</label>
                            <select name="textClass" id="textClass" className="custom-select custom-select-editor bg-white text-style">
                                <option value="p1">Parágrafo 1</option>
                                <option value="p2">Parágrafo 2</option>
                                <option value="p3">Parágrafo 3</option>
                            </select>
                        </div>
                        <div className="dialog-options dialog-text-options">
                            <label htmlFor="fontFamily">Fonte</label>
                            <select name="fontFamily" id="fontFamily" className="custom-select custom-select-editor bg-white">
                                <option value="Museo Sans">Museo Sans</option>
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                            </select>
                        </div>
                        <div className="dialog-options dialog-text-options">
                            <label htmlFor="">Tamanho</label>
                            <div className="fontSize-row flex flex-space w100">
                                <div className="fontSize-field">
                                    <input type="radio" name="fontSize" value="14" id="fz14" />
                                    <label htmlFor="fz14">14</label>
                                </div>
                                <div className="fontSize-field">
                                    <input type="radio" name="fontSize" value="16" id="fz16" />
                                    <label htmlFor="fz16">16</label>
                                </div>
                                <div className="fontSize-field">
                                    <input type="radio" name="fontSize" value="18" id="fz18" />
                                    <label htmlFor="fz18">18</label>
                                </div>
                                <div className="fontSize-field">
                                    <input type="radio" name="fontSize" value="22" id="fz22" />
                                    <label htmlFor="fz22">22</label>
                                </div>
                                <div className="fontSize-field">
                                    <input type="radio" name="fontSize" value="30" id="fz30" defaultChecked={true} />
                                    <label htmlFor="fz30">30</label>
                                </div>
                                <div className="fontSize-field">
                                    <input type="radio" name="fontSize" value="36" id="fz36" />
                                    <label htmlFor="fz36">36</label>
                                </div>
                                <div className="fontSize-field">
                                    <input type="radio" name="fontSize" value="48" id="fz48" />
                                    <label htmlFor="fz48">48</label>
                                </div>
                            </div>
                        </div>
                        <div className="dialog-options dialog-text-options">
                            <div className="flex flex-center flex-space w100">
                                <div className="flex flex-column">
                                    <label htmlFor="">Cor do Texto</label>
                                    <div className="paleta-cores text-color">
                                        <div className="paleta-cor" style={bgColor("ffffff")} data-color="#ffffff"></div>
                                        <div className="paleta-cor" style={bgColor("f4777c")} data-color="#f4777c"></div>
                                        <div className="paleta-cor" style={bgColor("8e8fc4")} data-color="#8e8fc4"></div>
                                        <div className="paleta-cor" style={bgColor("a3d69f")} data-color="#a3d69f"></div>
                                        <div className="paleta-cor" style={bgColor("bd8cbf")} data-color="#bd8cbf"></div>
                                        <div className="paleta-cor" style={bgColor("fbaf5d")} data-color="#fbaf5d"></div>
                                        <div className="paleta-cor" style={bgColor("c7b299")} data-color="#c7b299"></div>
                                        <div className="paleta-cor open-dialog" style={bgColor("ebebeb")} data-color="#ebebeb" data-dialog="dialog-color-text"><span>+</span></div>
                                    </div>
                                </div>
                                <div className="flex flex-column">
                                    <label htmlFor="">Cor de Fundo</label>
                                    <div className="paleta-cores bg-color">
                                        <div className="paleta-cor transparent" style={bgColor("fff")} data-color="transparent"></div>
                                        <div className="paleta-cor" style={bgColor("f4777c")} data-color="#f4777c"></div>
                                        <div className="paleta-cor" style={bgColor("8e8fc4")} data-color="#8e8fc4"></div>
                                        <div className="paleta-cor" style={bgColor("a3d69f")} data-color="#a3d69f"></div>
                                        <div className="paleta-cor" style={bgColor("bd8cbf")} data-color="#bd8cbf"></div>
                                        <div className="paleta-cor" style={bgColor("fbaf5d")} data-color="#fbaf5d"></div>
                                        <div className="paleta-cor" style={bgColor("c7b299")} data-color="#c7b299"></div>
                                        <div className="paleta-cor open-dialog" style={bgColor("ebebeb")} data-color="#ebebeb" data-dialog="dialog-bg-text"><span>+</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Draggable>
                <div className="card-default w100 theme-site">
                    <div className="theme-site-header" style={defaultStyle({backgroundColor: sessions['header']['background']['fundo_cor'], backgroundImage: sessions['header']['background']['imagem']})}>
                        <div className="editar-background" data-bg="header" data-dialog="dialog-color">Editar fundo</div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['header']['titulo']['alinhamento']})}>
                            <p id="titulo-header" className="element enable-edit" data-dialog="dialog-text"
                            style={defaultStyle({
                                color: sessions['header']['titulo']['texto_fonte_cor'],
                                backgroundColor: sessions['header']['titulo']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['header']['titulo']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['header']['titulo']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['header']['titulo']['italico'] ? 'italic' : '',
                                fontFamily: sessions['header']['titulo']['font'],
                                fontSize: sessions['header']['titulo']['texto_fonte_tamanho'] ? sessions['header']['titulo']['texto_fonte_tamanho'] : "48",
                                textAlign: sessions['header']['titulo']['alinhamento']
                            })}
                            >Aniversário do José</p>
                            <input type="hidden" name="background_header_image" />
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['header']['data']['alinhamento']})}>
                            <p id="data-header" className="element enable-edit" data-dialog="dialog-text"
                            style={{
                                color: sessions['header']['data']['texto_fonte_cor'],
                                backgroundColor: sessions['header']['data']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['header']['data']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['header']['data']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['header']['data']['italico'] ? 'italic' : '',
                                fontFamily: sessions['header']['data']['font'],
                                fontSize: sessions['header']['data']['texto_fonte_tamanho'],
                                textAlign: sessions['header']['data']['alinhamento']
                            }}>10 de abril de 2019</p>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['header']['cta_presentear']['alinhamento']})}>
                            <a id="cta-primary-header" href="#" className="element btn-cta btn-cta-primary enable-edit" data-dialog="dialog-text" 
                            style={{
                                color: sessions['header']['cta_presentear']['texto_fonte_cor'],
                                backgroundColor: sessions['header']['cta_presentear']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['header']['cta_presentear']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['header']['cta_presentear']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['header']['cta_presentear']['italico'] ? 'italic' : '',
                                fontFamily: sessions['header']['cta_presentear']['font'],
                                fontSize: sessions['header']['cta_presentear']['texto_fonte_tamanho'],
                                textAlign: sessions['header']['cta_presentear']['alinhamento']
                            }} >Presentear aniversariante</a>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['header']['cta_confirmar_presenca']['alinhamento']})}>
                            <a id="cta-secondary-header" href="#" className="element btn-cta btn-cta-secondary enable-edit" data-dialog="dialog-text" 
                            style={{
                                color: sessions['header']['cta_confirmar_presenca']['texto_fonte_cor'],
                                backgroundColor: sessions['header']['cta_confirmar_presenca']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['header']['cta_confirmar_presenca']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['header']['cta_confirmar_presenca']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['header']['cta_confirmar_presenca']['italico'] ? 'italic' : '',
                                fontFamily: sessions['header']['cta_confirmar_presenca']['font'],
                                fontSize: sessions['header']['cta_confirmar_presenca']['texto_fonte_tamanho'],
                                textAlign: sessions['header']['cta_confirmar_presenca']['alinhamento']
                            }}>Confirmar presença</a>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['header']['faltam_n_dias']['alinhamento'], fontSize: sessions['header']['faltam_n_dias']['texto_fonte_tamanho']})}>
                            <p id="contagem-header" className="element enable-edit" data-dialog="dialog-text" 
                            style={{
                                color: sessions['header']['faltam_n_dias']['texto_fonte_cor'],
                                backgroundColor: sessions['header']['faltam_n_dias']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['header']['faltam_n_dias']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['header']['faltam_n_dias']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['header']['faltam_n_dias']['italico'] ? 'italic' : '',
                                fontFamily: sessions['header']['faltam_n_dias']['font'],
                                fontSize: sessions['header']['faltam_n_dias']['texto_fonte_tamanho'],
                                textAlign: sessions['header']['faltam_n_dias']['alinhamento']
                            }}>Faltam 00 dias</p>
                        </div>
                    </div>

                    <div className="theme-site-casamento-welcome" style={defaultStyle({backgroundColor: sessions['casamento-welcome']['casamento-welcome-background']['fundo_cor'], backgroundImage: sessions['casamento-welcome']['casamento-welcome-background']['imagem']})}>
                            <div className="editar-background" data-bg="casamento-welcome" data-dialog="dialog-color">Editar fundo</div>
                            <input type="hidden" name="background_casamento_welcome_imagem" />
                            <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-welcome']['casament-welcome-titulo']['alinhamento']})}>
                                    <p id="titulo-casamento-welcome" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-welcome']['casament-welcome-titulo']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-welcome']['casament-welcome-titulo']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-welcome']['casament-welcome-titulo']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-welcome']['casament-welcome-titulo']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-welcome']['casament-welcome-titulo']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-welcome']['casament-welcome-titulo']['font'],
                                        fontSize: sessions['casamento-welcome']['casament-welcome-titulo']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-welcome']['casament-welcome-titulo']['alinhamento']
                                    })}>Seja bem vindo ao nosso site</p>
                            </div>
                            <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-welcome']['casament-welcome-description']['alinhamento']})}>
                                    <p id="descricao-casamento-welcome" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-welcome']['casament-welcome-description']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-welcome']['casament-welcome-description']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-welcome']['casament-welcome-description']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-welcome']['casament-welcome-description']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-welcome']['casament-welcome-description']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-welcome']['casament-welcome-description']['font'],
                                        fontSize: sessions['casamento-welcome']['casament-welcome-description']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-welcome']['casament-welcome-description']['alinhamento']
                                    })}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                            </div>
                    </div>

                    <div className="theme-site-about" style={defaultStyle({backgroundColor: sessions['saudacao']['background']['fundo_cor'], backgroundImage: sessions['saudacao']['background']['imagem']})}>
                        <div className="editar-background" data-bg="about" data-dialog="dialog-color">Editar fundo</div>
                        <div className="container-editor">
                            <div id="avatar-about" className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                            <input type="hidden" name="background_about_image" />
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['saudacao']['titulo']['alinhamento']})}>
                            <p id="titulo-about" className="element enable-edit" data-dialog="dialog-text" 
                            style={{
                                color: sessions['saudacao']['titulo']['texto_fonte_cor'],
                                backgroundColor: sessions['saudacao']['titulo']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['saudacao']['titulo']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['saudacao']['titulo']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['saudacao']['titulo']['italico'] ? 'italic' : '',
                                fontFamily: sessions['saudacao']['titulo']['font'],
                                fontSize: sessions['saudacao']['titulo']['texto_fonte_tamanho'],
                                textAlign: sessions['saudacao']['titulo']['alinhamento']
                            }}>Que bom que você está aqui</p>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['saudacao']['descricao']['alinhamento']})}>
                            <p id="descricao-about" className="element enable-edit" data-dialog="dialog-text" 
                            style={{
                                color: sessions['saudacao']['descricao']['texto_fonte_cor'],
                                backgroundColor: sessions['saudacao']['descricao']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['saudacao']['descricao']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['saudacao']['descricao']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['saudacao']['descricao']['italico'] ? 'italic' : '',
                                fontFamily: sessions['saudacao']['descricao']['font'],
                                fontSize: sessions['saudacao']['descricao']['texto_fonte_tamanho'],
                                textAlign: sessions['saudacao']['descricao']['alinhamento']
                            }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                        </div>
                    </div>

                    <div className="theme-site-casamento-about" style={defaultStyle({backgroundColor: sessions['casamento-about']['casamento-about-background']['fundo_cor'], backgroundImage: sessions['casamento-about']['casamento-about-background']['imagem']})}>
                            <div className="editar-background" data-bg="casamento-about" data-dialog="dialog-color">Editar fundo</div>
                            <input type="hidden" name="background_casamento_about_image" />
                            <div className="container-editor">
                                    <div id="avatar-casamento-about" className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                    <div id="avatar-casamento-about2" className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                            </div>
                            <input type="hidden" name="background_about_image" />
                            <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-about']['casamento-about-titulo']['alinhamento']})}>
                                    <p id="titulo-casamento-about" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-about']['casamento-about-titulo']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-about']['casamento-about-titulo']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-about']['casamento-about-titulo']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-about']['casamento-about-titulo']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-about']['casamento-about-titulo']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-about']['casamento-about-titulo']['font'],
                                        fontSize: sessions['casamento-about']['casamento-about-titulo']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-about']['casamento-about-titulo']['alinhamento']
                                    })}>Nossa História</p>
                            </div>
                            <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-about']['casamento-about-description']['alinhamento']})}>
                                    <p id="descricao-casamento-about" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-about']['casamento-about-description']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-about']['casamento-about-description']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-about']['casamento-about-description']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-about']['casamento-about-description']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-about']['casamento-about-description']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-about']['casamento-about-description']['font'],
                                        fontSize: sessions['casamento-about']['casamento-about-description']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-about']['casamento-about-description']['alinhamento']
                                    })}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                            </div>
                    </div>
                    <div className="theme-site-casamento-padrinhos" style={defaultStyle({backgroundColor: sessions['casamento-padrinhos']['casamento-padrinhos-background']['fundo_cor'], backgroundImage: sessions['casamento-padrinhos']['casamento-padrinhos-background']['imagem']})}>
                            <div className="editar-background" data-bg="casamento-padrinhos" data-dialog="dialog-color">Editar fundo</div>
                            <input type="hidden" name="background_casamento_padrinhos_image" />
                            <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinhos-title']['alinhamento']})}>
                                    <p id="titulo-casamento-padrinhos" className="element enable-edit" data-dialog="dialog-text"
                                    style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinhos-title']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinhos-title']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinhos-title']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinhos-title']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinhos-title']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinhos-title']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinhos-title']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinhos-title']['alinhamento']
                                    })}>Nossos Padrinhos</p>
                            </div>
                            <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinhos-description']['alinhamento']})}>
                                    <p id="descricao-casamento-padrinhos" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinhos-description']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinhos-description']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinhos-description']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinhos-description']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinhos-description']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinhos-description']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinhos-description']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinhos-description']['alinhamento']
                                    })}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
                            </div>

                            
                            <div className="theme-padrinhos-grid">
                                <div className="padrinhos-grid">
                                    <div className="container-editor">
                                        <div className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                        <div className="element avatar avatar-segundo" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                    </div>
                                    <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['alinhamento'], fontSize: sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['texto_fonte_tamanho']})}>
                                        <h3 id="titulo-casamento-padrinho1" className="padrinhos-nome element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinho1-titulo']['alinhamento']
                                    })}>Victor e Luiza</h3>
                                    </div>
                                    <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['alinhamento']})}>
                                        <p id="descricao-casamento-padrinho1" data-dialog="dialog-text" className="element enable-edit" style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['alinhamento']
                                    })}>Lorem ipsum dolor amet</p>
                                    {console.log(sessions['casamento-padrinhos']['casamento-padrinho1-descricao']['texto_fonte_tamanho'])}
                                    </div>
                                </div>
                                <div className="padrinhos-grid">
                                    <div className="container-editor">
                                        <div className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                        <div className="element avatar avatar-segundo" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                    </div>
                                    <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['alinhamento']})}>
                                        <h3 id="titulo-casamento-padrinho2" className="padrinhos-nome element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinho2-titulo']['alinhamento']
                                    })}>Fred e Bárbara</h3>
                                    </div>
                                    <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['alinhamento']})}>
                                        <p id="descricao-casamento-padrinho2" data-dialog="dialog-text" className="element enable-edit" style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinho2-descricao']['alinhamento']
                                    })}>Lorem ipsum dolor amet</p>
                                    </div>
                                </div>
                                <div className="padrinhos-grid">
                                    <div className="container-editor">
                                        <div className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                        <div className="element avatar avatar-segundo" style={defaultStyle({backgroundColor:"#efefef"})}></div>
                                    </div>
                                    <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['alinhamento']})}>
                                        <h3 id="titulo-casamento-padrinho3" className="padrinhos-nome element enable-edit" data-dialog="dialog-text" style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinho3-titulo']['alinhamento']
                                    })}>Afonso e Carlos</h3>
                                    </div>
                                    <div className="container-editor" style={defaultStyle({textAlign: sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['alinhamento']})}>
                                        <p id="descricao-casamento-padrinho3" data-dialog="dialog-text" className="element enable-edit" style={defaultStyle({
                                        color: sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['texto_fonte_cor'],
                                        backgroundColor: sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['texto_fundo_cor'],
                                        fontWeight: 'true' === sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['negrito'] ? 'bold' : '',
                                        textDecoration: 'true' === sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['sublinhado'] ? 'underline' : '',
                                        fontStyle: 'true' === sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['italico'] ? 'italic' : '',
                                        fontFamily: sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['font'],
                                        fontSize: sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['texto_fonte_tamanho'],
                                        textAlign: sessions['casamento-padrinhos']['casamento-padrinho3-descricao']['alinhamento']
                                    })}>Lorem ipsum dolor amet</p>
                                    </div>
                                </div>
                            </div>
                    </div>


                    <div className="theme-site-address" style={defaultStyle({backgroundColor: sessions['localizacao']['background']['fundo_cor'], backgroundImage: sessions['localizacao']['background']['imagem']})}>
                        <div className="editar-background" data-bg="address" data-dialog="dialog-color">Editar fundo</div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['localizacao']['titulo']['alinhamento']})}>
                        <input type="hidden" name="background_address_image" />
                            <p id="titulo-address" className="element enable-edit" data-dialog="dialog-text" 
                            style={defaultStyle({
                                color: sessions['localizacao']['titulo']['texto_fonte_cor'],
                                backgroundColor: sessions['localizacao']['titulo']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['localizacao']['titulo']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['localizacao']['titulo']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['localizacao']['titulo']['italico'] ? 'italic' : '',
                                fontFamily: sessions['localizacao']['titulo']['font'],
                                fontSize: sessions['localizacao']['titulo']['texto_fonte_tamanho'],
                                textAlign: sessions['localizacao']['titulo']['alinhamento']
                            })}>Local da Festa</p>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['localizacao']['data']['alinhamento']})}>
                            <p id="descricao-address" data-dialog="dialog-text" className="element enable-edit" 
                            style={defaultStyle({
                                color: sessions['localizacao']['data']['texto_fonte_cor'],
                                backgroundColor: sessions['localizacao']['data']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['localizacao']['data']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['localizacao']['data']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['localizacao']['data']['italico'] ? 'italic' : '',
                                fontFamily: sessions['localizacao']['data']['font'],
                                fontSize: sessions['localizacao']['data']['texto_fonte_tamanho'],
                                textAlign: sessions['localizacao']['data']['alinhamento']
                            })}>A festa vai acontecer no dia 10/04/2019 às 20h <br /> Quer saber onde? Confere aí!</p>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['localizacao']['endereco']['alinhamento']})}>
                            <p id="endereco-address" className="element enable-edit" data-dialog="dialog-text" 
                            style={defaultStyle({
                                color: sessions['localizacao']['endereco']['texto_fonte_cor'],
                                backgroundColor: sessions['localizacao']['endereco']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['localizacao']['endereco']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['localizacao']['endereco']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['localizacao']['endereco']['italico'] ? 'italic' : '',
                                fontFamily: sessions['localizacao']['endereco']['font'],
                                fontSize: sessions['localizacao']['endereco']['texto_fonte_tamanho'],
                                textAlign: sessions['localizacao']['endereco']['alinhamento']
                            })}><span>Casa de Festas Casamentos Perfeitos</span><span>R. Pereira da Silva, 259, Icaraí. Niterói - RJ</span></p>
                        </div>
                        <div className="container-editor">
                            <div id="mapa-address" className="element">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.54570134185!2d-43.319456984416874!3d-23.003727447121918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd0bafdf65637%3A0x5aec2654261140ac!2sShopping+Downtown!5e0!3m2!1spt-BR!2sbr!4v1554919549345!5m2!1spt-BR!2sbr" width="100%" height="450" frameBorder="0" style={defaultStyle({border: "none"})} allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="theme-site-album" style={defaultStyle({backgroundColor: sessions['fotos']['background']['fundo_cor'], backgroundImage: sessions['fotos']['background']['imagem']})}>
                        <div className="editar-background" data-bg="album" data-dialog="dialog-color">Editar fundo</div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['fotos']['titulo']['alinhamento']})}>
                        <input type="hidden" name="background_album_image" />
                            <p id="titulo-album" className="element enable-edit" data-dialog="dialog-text" 
                            style={defaultStyle({
                                color: sessions['fotos']['titulo']['texto_fonte_cor'],
                                backgroundColor: sessions['fotos']['titulo']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['fotos']['titulo']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['fotos']['titulo']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['fotos']['titulo']['italico'] ? 'italic' : '',
                                fontFamily: sessions['fotos']['titulo']['font'],
                                fontSize: sessions['fotos']['titulo']['texto_fonte_tamanho'],
                                textAlign: sessions['fotos']['titulo']['alinhamento']
                            })}>Fotos do José</p>
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
                    <div className="theme-site-countdown" style={defaultStyle({backgroundColor: sessions['rodape']['background']['fundo_cor'], backgroundImage: sessions['rodape']['background']['imagem']})}>
                        <div className="editar-background" data-bg="countdown" data-dialog="dialog-color">Editar fundo</div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['rodape']['titulo']['alinhamento']})}>
                            <p id="titulo-countdown" className="element enable-edit" data-dialog="dialog-text" 
                            style={defaultStyle({
                                color: sessions['rodape']['titulo']['texto_fonte_cor'],
                                backgroundColor: sessions['rodape']['titulo']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['rodape']['titulo']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['rodape']['titulo']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['rodape']['titulo']['italico'] ? 'italic' : '',
                                fontFamily: sessions['rodape']['titulo']['font'],
                                fontSize: sessions['rodape']['titulo']['texto_fonte_tamanho'],
                                textAlign: sessions['rodape']['titulo']['alinhamento']
                            })}>Não se esqueça...</p>
                            <input type="hidden" name="background_countdown_image" />
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['rodape']['faltam_n_dias']['alinhamento']})}>
                            <p id="descricao-countdown" className="element enable-edit" data-dialog="dialog-text" 
                            style={defaultStyle({
                                color: sessions['rodape']['faltam_n_dias']['texto_fonte_cor'],
                                backgroundColor: sessions['rodape']['faltam_n_dias']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['rodape']['faltam_n_dias']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['rodape']['faltam_n_dias']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['rodape']['faltam_n_dias']['italico'] ? 'italic' : '',
                                fontFamily: sessions['rodape']['faltam_n_dias']['font'],
                                fontSize: sessions['rodape']['faltam_n_dias']['texto_fonte_tamanho'],
                                textAlign: sessions['rodape']['faltam_n_dias']['alinhamento']
                            })}>Faltam apenas 00 dias para a festa!</p>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['rodape']['cta_presentear']['alinhamento']})}>
                            <a id="cta-primary-countdown" href="#" data-dialog="dialog-text" className="element btn-cta btn-cta-primary enable-edit" 
                            style={defaultStyle({
                                color: sessions['rodape']['cta_presentear']['texto_fonte_cor'],
                                backgroundColor: sessions['rodape']['cta_presentear']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['rodape']['cta_presentear']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['rodape']['cta_presentear']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['rodape']['cta_presentear']['italico'] ? 'italic' : '',
                                fontFamily: sessions['rodape']['cta_presentear']['font'],
                                fontSize: sessions['rodape']['cta_presentear']['texto_fonte_tamanho'],
                                textAlign: sessions['rodape']['cta_presentear']['alinhamento']
                            })}>Presentear aniversariante</a>
                        </div>
                        <div className="container-editor" style={defaultStyle({textAlign: sessions['rodape']['cta_confirmar_presenca']['alinhamento']})}>
                            <a id="cta-secondary-countdown" href="#" data-dialog="dialog-text" className="element btn-cta btn-cta-secondary enable-edit" 
                            style={defaultStyle({
                                color: sessions['rodape']['cta_confirmar_presenca']['texto_fonte_cor'],
                                backgroundColor: sessions['rodape']['cta_confirmar_presenca']['texto_fundo_cor'],
                                fontWeight: 'true' === sessions['rodape']['cta_confirmar_presenca']['negrito'] ? 'bold' : '',
                                textDecoration: 'true' === sessions['rodape']['cta_confirmar_presenca']['sublinhado'] ? 'underline' : '',
                                fontStyle: 'true' === sessions['rodape']['cta_confirmar_presenca']['italico'] ? 'italic' : '',
                                fontFamily: sessions['rodape']['cta_confirmar_presenca']['font'],
                                fontSize: sessions['rodape']['cta_confirmar_presenca']['texto_fonte_tamanho'],
                                textAlign: sessions['rodape']['cta_confirmar_presenca']['alinhamento']
                            })}>Confirmar presença</a>
                        </div>
                    </div>
                </div>
            </div>

        </form>
      </div>
    );
    }
    }
  }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.themes.error,
        theme: state.themes,
        categories: state.themeCategories.categories,
        thematics: state.themeCategories.thematics
    };
  }

const reduxFormEditTheme = reduxForm({
    form: 'editTheme'
  })(TemaAdminEditar);

  export default connect(mapStateToProps, {fetchTheme, fetchSetCategories})(reduxFormEditTheme);
