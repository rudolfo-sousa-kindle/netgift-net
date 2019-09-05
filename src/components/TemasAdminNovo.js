import React, { Component } from "react";
import '../assets/js/fileup';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { addThemes } from "../actions/themesActions";
import { fetchCategories, fetchSetCategories } from "../actions/categoriesActions";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import Loader from "./Loader";

import $ from 'jquery';

import {bgImage, bgColor, displayNone, defaultStyle} from "./styleFunctions";

import template from "../assets/imgs/thumb-template.svg";
import galeriaTemplate from "../assets/imgs/header-galeria-de-templates.png";
import buscarFesta from "../assets/imgs/header-buscar-festa.png";
import "../assets/css/theme-editor.css";

class TemasAdminNovo extends Component {

		submit = (values) => {

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

				values["header_background_image"] = $("input[name='background_header_image']").val();
				values["header_background_image_mobile"] = $("input[name='background_header_image_mobile']").val();
				values["about_background_image"] = $("input[name='background_about_image']").val();
				values["about_background_image_mobile"] = $("input[name='background_about_image_mobile']").val();
				values["casamento_welcome_background_image"] = $("input[name='background_casamento_welcome_imagem']").val();
				values["casamento_welcome_background_image_mobile"] = $("input[name='background_casamento_welcome_imagem_mobile']").val();
				values["casamento_about_background_image"] = $("input[name='background_casamento_about_image']").val();
				values["casamento_about_background_image_mobile"] = $("input[name='background_casamento_about_image_mobile']").val();
				values["casamento_padrinhos_background_image"] = $("input[name='background_casamento_padrinhos_image']").val();
				values["casamento_padrinhos_background_image_mobile"] = $("input[name='background_casamento_padrinhos_image_mobile']").val();
				values["address_background_image"] = $("input[name='background_address_image']").val();
				values["address_background_image_mobile"] = $("input[name='background_address_image_mobile']").val();
				values["album_background_image"] = $("input[name='background_album_image']").val();
				values["album_background_image_mobile"] = $("input[name='background_album_image_mobile']").val();
				values["footer_background_image"] = $("input[name='background_footer_image']").val();
				values["footer_background_image_mobile"] = $("input[name='background_footer_image_mobile']").val();

				// console.log(values)
				this.props.dispatch(addThemes(values)).then( ( res ) => {
					console.log( res )
				});
			}

	componentDidMount(){
		$( '.dialog' ).addClass( 'hidden' );
		require( '../assets/js/theme-editor.js' );
		this.props.dispatch( fetchCategories( 'categories' ) );
		this.props.dispatch( fetchCategories( 'thematics' ) );
	}

	state = {
		current_categories: [],
		current_thematics: [],
		available_categories: [],
		available_thematics: {},
	};

	handleChangeCategories = (newValue: any, actionMeta: any ) => {
		// console.group('Value Changed');
		let cat = 0;
		if(newValue != null){
			newValue.map((item) => {
				cat = cat + "," + item.value;
			})
		}

		$("input[name=tema-categoria]").val(cat);

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
		// console.log( actionMeta );
		// console.log(`action: ${actionMeta.action}`);
		// console.groupEnd();
	}

	handleChangeThematics = (newValue: any, actionMeta: any ) => {
		// console.group('Value Changed');
		console.log(newValue);
		if(newValue.label === "Casamento"){
			$(".theme-site-casamento-welcome").show(500).css("display", "flex");
			$(".theme-site-casamento-about").show(500);
			$(".theme-site-about").hide(500);
			$(".theme-site-casamento-padrinhos").show(500).css("display", "flex");
			$("#titulo-header").text("Zian e Hana");
		}else{
			$(".theme-site-casamento-welcome").hide(500);
			$(".theme-site-casamento-about").hide(500);
			$(".theme-site-casamento-padrinhos").hide(500)
			$("#titulo-header").text("Aniversário do José");
		}
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
		// console.log( actionMeta );
		// console.log(`action: ${actionMeta.action}`);
		// console.groupEnd();
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

		const {loading, message} = this.props.themes;

		if ( undefined !== this.props.categories && 0 !== this.props.categories.length ) {
				this.state.current_categories = this.props.categories;
		}

		if ( undefined !== this.props.thematics && 0 !== this.props.thematics.length ) {
				this.state.current_thematics = this.props.thematics;
		}
		
		var categ_options = [];
		var thematic_options = [];

		if ( undefined !== this.state.current_categories ) {
				this.state.current_categories.map( ( category, index ) => {
						var id = category.id;
						var name = category.name;
						categ_options.push( { value: id, label : name } );
				})
		}

		if ( undefined !== this.state.current_thematics ) {
				this.state.current_thematics.map( ( thematic, index ) => {
						var id = thematic.id;
						var name = thematic.name;
						thematic_options.push( { value: id, label : name } );
				})
		}

		return (
			<div className="wrap-content dashboard novo-tema">
				<form onSubmit={ handleSubmit(this.submit) }>

						<div className="content-title">
								<div className="flex flex-baseline flex-space">
										<div>
												<h1>Temas</h1>
												<h2>Edite, exclua ou crie novos temas</h2>
										</div>
								</div>
						</div>

						<section className="card-options">
								<div className="content-card-options grid">
										<div>
												<div className="header-card-options">
														<h2 className="title">Novo tema</h2>
														<p className="subtitle"></p>
												</div>
												<div className="line"></div>
												<div className="main-options">
														<div className="grid grid-input">
																<div className="">
																		<label htmlFor="tipo-festa" className="label-theme">Nome do tema <i className="ng-info-circled"></i></label>
																		<Field
																		name="nome_tema"
																		component= "input"
																		className="input-theme"
																		type="text"
																		placeholder="Ex: Lorem ipsum dolor sit amet"
																		id="tipo-festa"
																		required={true}
																		/>
																</div>
																<div className="">
																		<label htmlFor="descricao-tema" className="label-theme">Descrição do tema<i className="ng-info-circled"></i> </label>
																		<Field
																		name="descricao_tema"
																		component= "input"
																		className="input-theme"
																		type="text"
																		placeholder="Ex: Lorem ipsum dolor sit amet"
																		id="descricao-tema"
																		required={true}
																		/>
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
																				noOptionsMessage={() => { return "Tipo não encontrado." }}
																			/>
																			<input type="hidden" name="tema-thematics" />
																		<input type="hidden" name="tipo-de-festa" />
																</div>
																<div>
																		<label htmlFor="categoria-tema" className="label-theme">Categoria do tema <i className="ng-info-circled"></i></label>
																		
																		<Creatable
																				isMulti
																				onChange={this.handleChangeCategories}
																				options={categ_options}
																				className="selecione"
																				id="tema-categoria"
																				closeMenuOnSelect={false}
																				placeholder="Selecione"
																				formatCreateLabel={(input_text)=>{return <span>{'Adicionar "' + input_text + '" como nova categoria.'}</span>}}
																			/>
																			<input type="hidden" name="tema-categoria" />
																</div>
																<div>
																		<span className="title-input">Visualizar <i className="ng-info-circled" title="Veja como visualizar no dispositivo"></i></span>
																		<button id="desktop-view" className="type-view active" data-device="desk" title="Computador">
																				<i className="ng-desktop"></i>
																		</button>
																		<button id="mobile-view" className="type-view" data-device="mobile" title="Celular">
																				<i className="ng-mobile"></i>
																		</button>
																		<input type="hidden" name="background_header_image_mobile" />
																		<input type="hidden" name='background_about_image_mobile' />
																		<input type="hidden" name='background_casamento_welcome_imagem_mobile' />
																		<input type="hidden" name='background_casamento_about_image_mobile' />
																		<input type="hidden" name='background_casamento_padrinhos_image_mobile' />
																		<input type="hidden" name='background_address_image_mobile' />
																		<input type="hidden" name='background_album_image_mobile' />
																		<input type="hidden" name='background_footer_image_mobile' />
																</div>
																<div>
																		<span className="title-input">Status <i className="ng-info-circled"></i></span>
																		<select id="tema-status" className="custom-select bg-white">
																				<option value="1">Ativado</option>
																				<option value="0">Desativado</option>
																		</select>
																		<input type="hidden" name="tema-status"/>
																</div>
																<div>
																		<button type="submit" className="gradient fullcolor">
																				Salvar Tema
																		</button>
																</div>
														</div>
												</div>
										</div>
										<div>
												<img src={template} alt="" className="template" />
										</div>
								</div>
								{
									loading ? <Loader /> : ""
								}
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
								<div className="dialog dialog-bg-text">
										<div className="dialog-header">
												<div className="dialog-title">Cor de Fundo</div>
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
																<div className="custom-color-paleta add open-dialog" data-dialog="dialog-color-custom">+</div>
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
								<div className="dialog dialog-text">
										{/* <input type="hidden" name="identificador" /> */}
										<Field
										name="identificador"
										component= "input"
										type="hidden"
										/>

										<input type="hidden" name="header-background-color" />
										<input type="hidden" name="casamento-welcome-background-color" />
										<input type="hidden" name="casamento-about-background-color" />
										<input type="hidden" name="casamento-padrinhos-background-color" />
										<input type="hidden" name="about-background-color" />
										<input type="hidden" name="address-background-color" />
										<input type="hidden" name="album-background-color" />
										<input type="hidden" name="countdown-background-color" />

										<input type="hidden" name="titulo-header-bold" />
										<input type="hidden" name="titulo-header-itallic" />
										<input type="hidden" name="titulo-header-underline" />
										<input type="hidden" name="titulo-header-align" />
										<input type="hidden" name="titulo-header-fontStyle" />
										<input type="hidden" name="titulo-header-fontFamily" />
										<input type="hidden" name="titulo-header-fontSize" />
										<input type="hidden" name="titulo-header-fontColor" />
										<input type="hidden" name="titulo-header-bgColor" />

										<input type="hidden" name="data-header-bold" />
										<input type="hidden" name="data-header-itallic" />
										<input type="hidden" name="data-header-underline" />
										<input type="hidden" name="data-header-align" />
										<input type="hidden" name="data-header-fontStyle" />
										<input type="hidden" name="data-header-fontFamily" />
										<input type="hidden" name="data-header-fontSize" />
										<input type="hidden" name="data-header-fontColor" />
										<input type="hidden" name="data-header-bgColor" />

										<input type="hidden" name="cta-primary-header-bold" />
										<input type="hidden" name="cta-primary-header-itallic" />
										<input type="hidden" name="cta-primary-header-underline" />
										<input type="hidden" name="cta-primary-header-align" />
										<input type="hidden" name="cta-primary-header-fontStyle" />
										<input type="hidden" name="cta-primary-header-fontFamily" />
										<input type="hidden" name="cta-primary-header-fontSize" />
										<input type="hidden" name="cta-primary-header-fontColor" />
										<input type="hidden" name="cta-primary-header-bgColor" />

										<input type="hidden" name="cta-secondary-header-bold" />
										<input type="hidden" name="cta-secondary-header-itallic" />
										<input type="hidden" name="cta-secondary-header-underline" />
										<input type="hidden" name="cta-secondary-header-align" />
										<input type="hidden" name="cta-secondary-header-fontStyle" />
										<input type="hidden" name="cta-secondary-header-fontFamily" />
										<input type="hidden" name="cta-secondary-header-fontSize" />
										<input type="hidden" name="cta-secondary-header-fontColor" />
										<input type="hidden" name="cta-secondary-header-bgColor" />

										<input type="hidden" name="contagem-header-bold" />
										<input type="hidden" name="contagem-header-itallic" />
										<input type="hidden" name="contagem-header-underline" />
										<input type="hidden" name="contagem-header-align" />
										<input type="hidden" name="contagem-header-fontStyle" />
										<input type="hidden" name="contagem-header-fontFamily" />
										<input type="hidden" name="contagem-header-fontSize" />
										<input type="hidden" name="contagem-header-fontColor" />
										<input type="hidden" name="contagem-header-bgColor" />

										<input type="hidden" name="titulo-casamento-welcome-bold" />
										<input type="hidden" name="titulo-casamento-welcome-itallic" />
										<input type="hidden" name="titulo-casamento-welcome-underline" />
										<input type="hidden" name="titulo-casamento-welcome-align" />
										<input type="hidden" name="titulo-casamento-welcome-fontStyle" />
										<input type="hidden" name="titulo-casamento-welcome-fontFamily" />
										<input type="hidden" name="titulo-casamento-welcome-fontSize" />
										<input type="hidden" name="titulo-casamento-welcome-fontColor" />
										<input type="hidden" name="titulo-casamento-welcome-bgColor" />

										<input type="hidden" name="descricao-casamento-welcome-bold" />
										<input type="hidden" name="descricao-casamento-welcome-itallic" />
										<input type="hidden" name="descricao-casamento-welcome-underline" />
										<input type="hidden" name="descricao-casamento-welcome-align" />
										<input type="hidden" name="descricao-casamento-welcome-fontStyle" />
										<input type="hidden" name="descricao-casamento-welcome-fontFamily" />
										<input type="hidden" name="descricao-casamento-welcome-fontSize" />
										<input type="hidden" name="descricao-casamento-welcome-fontColor" />
										<input type="hidden" name="descricao-casamento-welcome-bgColor" />

										<input type="hidden" name="titulo-casamento-about-bold" />
										<input type="hidden" name="titulo-casamento-about-itallic" />
										<input type="hidden" name="titulo-casamento-about-underline" />
										<input type="hidden" name="titulo-casamento-about-align" />
										<input type="hidden" name="titulo-casamento-about-fontStyle" />
										<input type="hidden" name="titulo-casamento-about-fontFamily" />
										<input type="hidden" name="titulo-casamento-about-fontSize" />
										<input type="hidden" name="titulo-casamento-about-fontColor" />
										<input type="hidden" name="titulo-casamento-about-bgColor" />	

										<input type="hidden" name="descricao-casamento-about-bold" />
										<input type="hidden" name="descricao-casamento-about-itallic" />
										<input type="hidden" name="descricao-casamento-about-underline" />
										<input type="hidden" name="descricao-casamento-about-align" />
										<input type="hidden" name="descricao-casamento-about-fontStyle" />
										<input type="hidden" name="descricao-casamento-about-fontFamily" />
										<input type="hidden" name="descricao-casamento-about-fontSize" />
										<input type="hidden" name="descricao-casamento-about-fontColor" />
										<input type="hidden" name="descricao-casamento-about-bgColor" />	

										<input type="hidden" name="titulo-casamento-padrinho1-bold" />
										<input type="hidden" name="titulo-casamento-padrinho1-itallic" />
										<input type="hidden" name="titulo-casamento-padrinho1-underline" />
										<input type="hidden" name="titulo-casamento-padrinho1-align" />
										<input type="hidden" name="titulo-casamento-padrinho1-fontStyle" />
										<input type="hidden" name="titulo-casamento-padrinho1-fontFamily" />
										<input type="hidden" name="titulo-casamento-padrinho1-fontSize" />
										<input type="hidden" name="titulo-casamento-padrinho1-fontColor" />
										<input type="hidden" name="titulo-casamento-padrinho1-bgColor" />	

										<input type="hidden" name="titulo-casamento-padrinhos-bold" />
										<input type="hidden" name="titulo-casamento-padrinhos-itallic" />
										<input type="hidden" name="titulo-casamento-padrinhos-underline" />
										<input type="hidden" name="titulo-casamento-padrinhos-align" />
										<input type="hidden" name="titulo-casamento-padrinhos-fontStyle" />
										<input type="hidden" name="titulo-casamento-padrinhos-fontFamily" />
										<input type="hidden" name="titulo-casamento-padrinhos-fontSize" />
										<input type="hidden" name="titulo-casamento-padrinhos-fontColor" />
										<input type="hidden" name="titulo-casamento-padrinhos-bgColor" />	

										<input type="hidden" name="descricao-casamento-padrinhos-bold" />
										<input type="hidden" name="descricao-casamento-padrinhos-itallic" />
										<input type="hidden" name="descricao-casamento-padrinhos-underline" />
										<input type="hidden" name="descricao-casamento-padrinhos-align" />
										<input type="hidden" name="descricao-casamento-padrinhos-fontStyle" />
										<input type="hidden" name="descricao-casamento-padrinhos-fontFamily" />
										<input type="hidden" name="descricao-casamento-padrinhos-fontSize" />
										<input type="hidden" name="descricao-casamento-padrinhos-fontColor" />
										<input type="hidden" name="descricao-casamento-padrinhos-bgColor" />	

										<input type="hidden" name="titulo-casamento-padrinho2-bold" />
										<input type="hidden" name="titulo-casamento-padrinho2-itallic" />
										<input type="hidden" name="titulo-casamento-padrinho2-underline" />
										<input type="hidden" name="titulo-casamento-padrinho2-align" />
										<input type="hidden" name="titulo-casamento-padrinho2-fontStyle" />
										<input type="hidden" name="titulo-casamento-padrinho2-fontFamily" />
										<input type="hidden" name="titulo-casamento-padrinho2-fontSize" />
										<input type="hidden" name="titulo-casamento-padrinho2-fontColor" />
										<input type="hidden" name="titulo-casamento-padrinho2-bgColor" />		

										<input type="hidden" name="titulo-casamento-padrinho3-bold" />
										<input type="hidden" name="titulo-casamento-padrinho3-itallic" />
										<input type="hidden" name="titulo-casamento-padrinho3-underline" />
										<input type="hidden" name="titulo-casamento-padrinho3-align" />
										<input type="hidden" name="titulo-casamento-padrinho3-fontStyle" />
										<input type="hidden" name="titulo-casamento-padrinho3-fontFamily" />
										<input type="hidden" name="titulo-casamento-padrinho3-fontSize" />
										<input type="hidden" name="titulo-casamento-padrinho3-fontColor" />
										<input type="hidden" name="titulo-casamento-padrinho3-bgColor" />	

										<input type="hidden" name="descricao-casamento-padrinho1-bold" />
										<input type="hidden" name="descricao-casamento-padrinho1-itallic" />
										<input type="hidden" name="descricao-casamento-padrinho1-underline" />
										<input type="hidden" name="descricao-casamento-padrinho1-align" />
										<input type="hidden" name="descricao-casamento-padrinho1-fontStyle" />
										<input type="hidden" name="descricao-casamento-padrinho1-fontFamily" />
										<input type="hidden" name="descricao-casamento-padrinho1-fontSize" />
										<input type="hidden" name="descricao-casamento-padrinho1-fontColor" />
										<input type="hidden" name="descricao-casamento-padrinho1-bgColor" />

										<input type="hidden" name="descricao-casamento-padrinho2-bold" />
										<input type="hidden" name="descricao-casamento-padrinho2-itallic" />
										<input type="hidden" name="descricao-casamento-padrinho2-underline" />
										<input type="hidden" name="descricao-casamento-padrinho2-align" />
										<input type="hidden" name="descricao-casamento-padrinho2-fontStyle" />
										<input type="hidden" name="descricao-casamento-padrinho2-fontFamily" />
										<input type="hidden" name="descricao-casamento-padrinho2-fontSize" />
										<input type="hidden" name="descricao-casamento-padrinho2-fontColor" />
										<input type="hidden" name="descricao-casamento-padrinho2-bgColor" />

										<input type="hidden" name="descricao-casamento-padrinho3-bold" />
										<input type="hidden" name="descricao-casamento-padrinho3-itallic" />
										<input type="hidden" name="descricao-casamento-padrinho3-underline" />
										<input type="hidden" name="descricao-casamento-padrinho3-align" />
										<input type="hidden" name="descricao-casamento-padrinho3-fontStyle" />
										<input type="hidden" name="descricao-casamento-padrinho3-fontFamily" />
										<input type="hidden" name="descricao-casamento-padrinho3-fontSize" />
										<input type="hidden" name="descricao-casamento-padrinho3-fontColor" />
										<input type="hidden" name="descricao-casamento-padrinho3-bgColor" />	

										<input type="hidden" name="titulo-about-bold" />
										<input type="hidden" name="titulo-about-itallic" />
										<input type="hidden" name="titulo-about-underline" />
										<input type="hidden" name="titulo-about-align" />
										<input type="hidden" name="titulo-about-fontStyle" />
										<input type="hidden" name="titulo-about-fontFamily" />
										<input type="hidden" name="titulo-about-fontSize" />
										<input type="hidden" name="titulo-about-fontColor" />
										<input type="hidden" name="titulo-about-bgColor" />

										<input type="hidden" name="descricao-about-bold" />
										<input type="hidden" name="descricao-about-itallic" />
										<input type="hidden" name="descricao-about-underline" />
										<input type="hidden" name="descricao-about-align" />
										<input type="hidden" name="descricao-about-fontStyle" />
										<input type="hidden" name="descricao-about-fontFamily" />
										<input type="hidden" name="descricao-about-fontSize" />
										<input type="hidden" name="descricao-about-fontColor" />
										<input type="hidden" name="descricao-about-bgColor" />

										<input type="hidden" name="titulo-address-bold" />
										<input type="hidden" name="titulo-address-itallic" />
										<input type="hidden" name="titulo-address-underline" />
										<input type="hidden" name="titulo-address-align" />
										<input type="hidden" name="titulo-address-fontStyle" />
										<input type="hidden" name="titulo-address-fontFamily" />
										<input type="hidden" name="titulo-address-fontSize" />
										<input type="hidden" name="titulo-address-fontColor" />
										<input type="hidden" name="titulo-address-bgColor" />

										<input type="hidden" name="descricao-address-bold" />
										<input type="hidden" name="descricao-address-itallic" />
										<input type="hidden" name="descricao-address-underline" />
										<input type="hidden" name="descricao-address-align" />
										<input type="hidden" name="descricao-address-fontStyle" />
										<input type="hidden" name="descricao-address-fontFamily" />
										<input type="hidden" name="descricao-address-fontSize" />
										<input type="hidden" name="descricao-address-fontColor" />
										<input type="hidden" name="descricao-address-bgColor" />

										<input type="hidden" name="endereco-address-bold" />
										<input type="hidden" name="endereco-address-itallic" />
										<input type="hidden" name="endereco-address-underline" />
										<input type="hidden" name="endereco-address-align" />
										<input type="hidden" name="endereco-address-fontStyle" />
										<input type="hidden" name="endereco-address-fontFamily" />
										<input type="hidden" name="endereco-address-fontSize" />
										<input type="hidden" name="endereco-address-fontColor" />
										<input type="hidden" name="endereco-address-bgColor" />

										<input type="hidden" name="titulo-album-bold" />
										<input type="hidden" name="titulo-album-itallic" />
										<input type="hidden" name="titulo-album-underline" />
										<input type="hidden" name="titulo-album-align" />
										<input type="hidden" name="titulo-album-fontStyle" />
										<input type="hidden" name="titulo-album-fontFamily" />
										<input type="hidden" name="titulo-album-fontSize" />
										<input type="hidden" name="titulo-album-fontColor" />
										<input type="hidden" name="titulo-album-bgColor" />

										<input type="hidden" name="titulo-countdown-bold" />
										<input type="hidden" name="titulo-countdown-itallic" />
										<input type="hidden" name="titulo-countdown-underline" />
										<input type="hidden" name="titulo-countdown-align" />
										<input type="hidden" name="titulo-countdown-fontStyle" />
										<input type="hidden" name="titulo-countdown-fontFamily" />
										<input type="hidden" name="titulo-countdown-fontSize" />
										<input type="hidden" name="titulo-countdown-fontColor" />
										<input type="hidden" name="titulo-countdown-bgColor" />

										<input type="hidden" name="descricao-countdown-bold" />
										<input type="hidden" name="descricao-countdown-itallic" />
										<input type="hidden" name="descricao-countdown-underline" />
										<input type="hidden" name="descricao-countdown-align" />
										<input type="hidden" name="descricao-countdown-fontStyle" />
										<input type="hidden" name="descricao-countdown-fontFamily" />
										<input type="hidden" name="descricao-countdown-fontSize" />
										<input type="hidden" name="descricao-countdown-fontColor" />
										<input type="hidden" name="descricao-countdown-bgColor" />

										<input type="hidden" name="cta-primary-countdown-bold" />
										<input type="hidden" name="cta-primary-countdown-itallic" />
										<input type="hidden" name="cta-primary-countdown-underline" />
										<input type="hidden" name="cta-primary-countdown-align" />
										<input type="hidden" name="cta-primary-countdown-fontStyle" />
										<input type="hidden" name="cta-primary-countdown-fontFamily" />
										<input type="hidden" name="cta-primary-countdown-fontSize" />
										<input type="hidden" name="cta-primary-countdown-fontColor" />
										<input type="hidden" name="cta-primary-countdown-bgColor" />

										<input type="hidden" name="cta-secondary-countdown-bold" />
										<input type="hidden" name="cta-secondary-countdown-itallic" />
										<input type="hidden" name="cta-secondary-countdown-underline" />
										<input type="hidden" name="cta-secondary-countdown-align" />
										<input type="hidden" name="cta-secondary-countdown-fontStyle" />
										<input type="hidden" name="cta-secondary-countdown-fontFamily" />
										<input type="hidden" name="cta-secondary-countdown-fontSize" />
										<input type="hidden" name="cta-secondary-countdown-fontColor" />
										<input type="hidden" name="cta-secondary-countdown-bgColor" />

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
										<div className="theme-site-header" style={bgImage(galeriaTemplate)}>
												<div className="editar-background" data-bg="header" data-dialog="dialog-color">Editar fundo</div>
												<div className="container-editor">
														<p id="titulo-header" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({color:"#000000", fontSize:"48", textAlign:"center"})}>Aniversário do José</p>
														<input type="hidden" name="background_header_image" />
												</div>
												<div className="container-editor">
														<p id="data-header" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({color:"#000000", fontSize:"22", textAlign:"center"})}>10 de abril de 2019</p>
												</div>
												<div className="container-editor">
														<a id="cta-primary-header" href="#" className="element btn-cta btn-cta-primary enable-edit" data-dialog="dialog-text" style={defaultStyle({color:"#fff", fontSize:"16", textAlign:"center", backgroundColor: "#00b1ff"})} >Presentear aniversariante</a>
												</div>
												<div className="container-editor">
														<a id="cta-secondary-header" href="#" className="element btn-cta btn-cta-secondary enable-edit" data-dialog="dialog-text" style={defaultStyle({color:"#00b1ff", fontSize:"16", textAlign:"center"})}>Confirmar presença</a>
												</div>
												<div className="container-editor">
														<p id="contagem-header" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({color:"#000000", fontSize:"22", textAlign:"center"})}>Faltam 00 dias</p>
												</div>
										</div>
										<div className="theme-site-casamento-welcome">
												<div className="editar-background" data-bg="casamento-welcome" data-dialog="dialog-color">Editar fundo</div>
												<input type="hidden" name="background_casamento_welcome_imagem" />
												<div className="container-editor">
														<p id="titulo-casamento-welcome" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Seja bem vindo ao nosso site</p>
												</div>
												<div className="container-editor">
														<p id="descricao-casamento-welcome" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"16", textAlign:"center"})}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
												</div>
										</div>
										<div className="theme-site-about">
												<div className="editar-background" data-bg="about" data-dialog="dialog-color">Editar fundo</div>
												<div className="container-editor">
														<div id="avatar-about" className="element avatar" style={defaultStyle({backgroundColor:"#efefef"})}></div>
												</div>
												<input type="hidden" name="background_about_image" />
												<div className="container-editor">
														<p id="titulo-about" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Que bom que você está aqui</p>
												</div>
												<div className="container-editor">
														<p id="descricao-about" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"16", textAlign:"center"})}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem mollitia, tempore provident earum velit, illum aut maxime amet animi quam vitae sapiente aperiam reiciendis consectetur nobis magnam ipsam odit in.</p>
												</div>
										</div>
										<div className="theme-site-casamento-about">
												<div className="editar-background" data-bg="casamento-about" data-dialog="dialog-color">Editar fundo</div>
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
										<div className="theme-site-address" style={bgImage(buscarFesta)}>
												<div className="editar-background" data-bg="address" data-dialog="dialog-color">Editar fundo</div>
												<div className="container-editor">
														<p id="titulo-address" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Local da Festa</p>
												</div>
												<input type="hidden" name="background_address_image" />
												<div className="container-editor">
														<p id="descricao-address" data-dialog="dialog-text" className="element enable-edit" style={defaultStyle({fontSize:"16", textAlign:"center"})}>A festa vai acontecer no dia 10/04/2019 às 20h <br /> Quer saber onde? Confere aí!</p>
												</div>
												<div className="container-editor">
														<p id="endereco-address" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"18", textAlign:"center", border: "1px solid #00b1ff"})}><span>Casa de Festas Casamentos Perfeitos</span><span>R. Pereira da Silva, 259, Icaraí. Niterói - RJ</span></p>
												</div>
												<div className="container-editor">
														<div id="mapa-address" className="element">
																<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.54570134185!2d-43.319456984416874!3d-23.003727447121918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd0bafdf65637%3A0x5aec2654261140ac!2sShopping+Downtown!5e0!3m2!1spt-BR!2sbr!4v1554919549345!5m2!1spt-BR!2sbr" width="100%" height="450" frameBorder="0" style={defaultStyle({border: "none"})} allowFullScreen></iframe>
														</div>
												</div>
										</div>
										<div className="theme-site-album">
											<input type="hidden" name="background_album_image" />
												<div className="editar-background" data-bg="album" data-dialog="dialog-color">Editar fundo</div>
												<div className="container-editor">
														<p id="titulo-album" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Fotos do José</p>
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
										<div className="theme-site-countdown" style={bgImage(galeriaTemplate)}>
										<input type="hidden" name="background_footer_image" />
												<div className="editar-background" data-bg="countdown" data-dialog="dialog-color">Editar fundo</div>
												<div className="container-editor">
														<p id="titulo-countdown" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"36", textAlign:"center"})}>Não se esqueça...</p>
												</div>
												<div className="container-editor">
														<p id="descricao-countdown" className="element enable-edit" data-dialog="dialog-text" style={defaultStyle({fontSize:"28", textAlign:"center"})}>Faltam apenas 00 dias para a festa!</p>
												</div>
												<div className="container-editor">
														<a id="cta-primary-countdown" href="#" data-dialog="dialog-text" className="element btn-cta btn-cta-primary enable-edit" style={defaultStyle({color:"#fff", backgroundColor:"#00b1ff"})}>Presentear aniversariante</a>
												</div>
												<div className="container-editor">
														<a id="cta-secondary-countdown" href="#" data-dialog="dialog-text" className="element btn-cta btn-cta-secondary enable-edit" style={defaultStyle({color:"#00b1ff", textAlign:"center"})}>Confirmar presença</a>
												</div>
										</div>
								</div>
						</div>

				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
		return {
				errorMessage: state.themes.error,
				categories: state.themeCategories.categories,
				thematics: state.themeCategories.thematics,
				themes: state.themes
		};
	}

const reduxFormAddTheme = reduxForm({
		form: 'addtheme'
	})(TemasAdminNovo);

	export default connect(mapStateToProps, {addThemes, fetchSetCategories})(reduxFormAddTheme);
