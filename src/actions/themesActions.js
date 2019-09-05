import axios from "axios";
import { textAlign } from "../components/styleFunctions";
import Snackbar from 'node-snackbar';
const URL   = "http://51.15.99.120:4700";
const urlWP = "https://www.localkindle.com.br/netgift_api/wp-json/ntgift/api";

export const FETCH_THEMES_BEGIN   = 'FETCH_THEMES_BEGIN';
export const FETCH_THEMES_SUCCESS = 'FETCH_THEMES_SUCCESS';
export const FETCH_THEME_SUCCESS = 'FETCH_THEME_SUCCESS';
export const FETCH_THEMES_FAILURE = 'FETCH_THEMES_FAILURE';
export const SEND_THEME_SUCCESS = 'SEND_THEME_SUCCESS';
export const FETCH_THEME_BEGIN_NEXT = 'FETCH_THEME_BEGIN_NEXT'

const config = {
  headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*"},
}

export function addThemes(values, id = null, edit = false){

    return async dispatch => {

      dispatch(fetchThemesBegin());

      var items = [];
      
      var header_background_color = values.header_background_color;
      var casamento_welcome_background_color = values.casamento_welcome_background_color;
      var casamento_about_background_color = values.casamento_about_background_color;
      var casamento_padrinhos_background_color = values.casamento_padrinhos_background_color;
      var about_background_color = values.about_background_color;
      var address_background_color = values.address_background_color;
      var album_background_color = values.album_background_color;
      var countdown_background_color = values.countdown_background_color;

      var header_background_image = values.header_background_image;  
      var header_background_image_mobile = values.header_background_image_mobile;  
      var casamento_welcome_background_image = values.casamento_welcome_background_image;
      var casamento_welcome_background_image_mobile = values.casamento_welcome_background_image_mobile;
      var casamento_about_background_image = values.casamento_about_background_image;
      var casamento_about_background_image_mobile = values.casamento_about_background_image_mobile;
      var casamento_padrinhos_background_image = values.casamento_padrinhos_background_image;
      var casamento_padrinhos_background_image_mobile = values.casamento_padrinhos_background_image_mobile;
      var about_background_image = values.about_background_image;
      var about_background_image_mobile = values.about_background_image_mobile;     
      var address_background_image = values.address_background_image;
      var address_background_image_mobile = values.address_background_image_mobile;  
      var album_background_image = values.album_background_image;  
      var album_background_image_mobile = values.album_background_image_mobile;  
      var footer_background_image = values.footer_background_image;
      var footer_background_image_mobile = values.footer_background_image_mobile;  

      var titulo_header_bold = values.titulo_header_bold;
      var titulo_header_itallic = values.titulo_header_itallic;
      var titulo_header_underline = values.titulo_header_underline;
      var titulo_header_align = values.titulo_header_align ? values.titulo_header_align : "center";
      var titulo_header_fontStyle = values.titulo_header_fontStyle;
      var titulo_header_fontFamily = values.titulo_header_fontFamily ? values.titulo_header_fontFamily : "Museo Sans";
      var titulo_header_fontSize = values.titulo_header_fontSize ? values.titulo_header_fontSize : "48";
      var titulo_header_fontColor = values.titulo_header_fontColor ? values.titulo_header_fontColor : "#000000";
      var titulo_header_bgColor = values.titulo_header_bgColor;

      var data_header_bold = values.data_header_bold;
      var data_header_itallic = values.data_header_itallic;
      var data_header_underline = values.data_header_underline;
      var data_header_align = values.data_header_align ? values.data_header_align : "center";
      var data_header_fontStyle = values.data_header_fontStyle;
      var data_header_fontFamily = values.data_header_fontFamily ? values.data_header_fontFamily : "Museo Sans";
      var data_header_fontSize = values.data_header_fontSize ? values.data_header_fontSize : "22";
      var data_header_fontColor = values.data_header_fontColor ? values.data_header_fontColor : "#000000";
      var data_header_bgColor = values.data_header_bgColor;

      var titulo_casamento_welcome_bold = values.titulo_casamento_welcome_bold;
      var titulo_casamento_welcome_itallic = values.titulo_casamento_welcome_itallic;
      var titulo_casamento_welcome_underline = values.titulo_casamento_welcome_underline;
      var titulo_casamento_welcome_align = values.titulo_casamento_welcome_align ? values.titulo_casamento_welcome_align : "center";
      var titulo_casamento_welcome_fontStyle = values.titulo_casamento_welcome_fontStyle;
      var titulo_casamento_welcome_fontFamily = values.titulo_casamento_welcome_fontFamily ? values.titulo_casamento_welcome_fontFamily : "Museo Sans";
      var titulo_casamento_welcome_fontSize = values.titulo_casamento_welcome_fontSize ? values.titulo_casamento_welcome_fontSize : "30";
      var titulo_casamento_welcome_fontColor = values.titulo_casamento_welcome_fontColor ? values.titulo_casamento_welcome_fontColor : "#000000";
      var titulo_casamento_welcome_bgColor = values.titulo_casamento_welcome_bgColor;

      var descricao_casamento_welcome_bold = values.descricao_casamento_welcome_bold;
      var descricao_casamento_welcome_itallic = values.descricao_casamento_welcome_itallic;
      var descricao_casamento_welcome_underline = values.descricao_casamento_welcome_underline;
      var descricao_casamento_welcome_align = values.descricao_casamento_welcome_align ? values.descricao_casamento_welcome_align : "center";
      var descricao_casamento_welcome_fontStyle = values.descricao_casamento_welcome_fontStyle;
      var descricao_casamento_welcome_fontFamily = values.descricao_casamento_welcome_fontFamily ? values.descricao_casamento_welcome_fontFamily : "Museo Sans";
      var descricao_casamento_welcome_fontSize = values.descricao_casamento_welcome_fontSize ? values.descricao_casamento_welcome_fontSize : "16";
      var descricao_casamento_welcome_fontColor = values.descricao_casamento_welcome_fontColor ? values.descricao_casamento_welcome_fontColor : "#000000";
      var descricao_casamento_welcome_bgColor = values.descricao_casamento_welcome_bgColor;

      var titulo_casamento_about_bold = values.titulo_casamento_about_bold;
      var titulo_casamento_about_itallic = values.titulo_casamento_about_itallic;
      var titulo_casamento_about_underline = values.titulo_casamento_about_underline;
      var titulo_casamento_about_align = values.titulo_casamento_about_align ? values.titulo_casamento_about_align : "center";
      var titulo_casamento_about_fontStyle = values.titulo_casamento_about_fontStyle;
      var titulo_casamento_about_fontFamily = values.titulo_casamento_about_fontFamily ? values.titulo_casamento_about_fontFamily : "Museo Sans";
      var titulo_casamento_about_fontSize = values.titulo_casamento_about_fontSize ? values.titulo_casamento_about_fontSize : "30";
      var titulo_casamento_about_fontColor = values.titulo_casamento_about_fontColor;
      var titulo_casamento_about_bgColor = values.titulo_casamento_about_bgColor;

      var descricao_casamento_about_bold = values.descricao_casamento_about_bold;
      var descricao_casamento_about_itallic = values.descricao_casamento_about_itallic;
      var descricao_casamento_about_underline = values.descricao_casamento_about_underline;
      var descricao_casamento_about_align = values.descricao_casamento_about_align ? values.descricao_casamento_about_align : "center";
      var descricao_casamento_about_fontStyle = values.descricao_casamento_about_fontStyle;
      var descricao_casamento_about_fontFamily = values.descricao_casamento_about_fontFamily ? values.descricao_casamento_about_fontFamily : "Museo Sans";
      var descricao_casamento_about_fontSize = values.descricao_casamento_about_fontSize ? values.descricao_casamento_about_fontSize : "16";
      var descricao_casamento_about_fontColor = values.descricao_casamento_about_fontColor;
      var descricao_casamento_about_bgColor = values.descricao_casamento_about_bgColor;

      var titulo_casamento_padrinhos_bold = values.titulo_casamento_padrinhos_bold;
      var titulo_casamento_padrinhos_itallic = values.titulo_casamento_padrinhos_itallic;
      var titulo_casamento_padrinhos_underline = values.titulo_casamento_padrinhos_underline;
      var titulo_casamento_padrinhos_align = values.titulo_casamento_padrinhos_align ? values.titulo_casamento_padrinhos_align : "center";
      var titulo_casamento_padrinhos_fontStyle = values.titulo_casamento_padrinhos_fontStyle;
      var titulo_casamento_padrinhos_fontFamily = values.titulo_casamento_padrinhos_fontFamily ? values.titulo_casamento_padrinhos_fontFamily : "Museo Sans";
      var titulo_casamento_padrinhos_fontSize = values.titulo_casamento_padrinhos_fontSize ? values.titulo_casamento_padrinhos_fontSize : "30";
      var titulo_casamento_padrinhos_fontColor = values.titulo_casamento_padrinhos_fontColor;
      var titulo_casamento_padrinhos_bgColor = values.titulo_casamento_padrinhos_bgColor;

      var descricao_casamento_padrinhos_bold = values.descricao_casamento_padrinhos_bold;
      var descricao_casamento_padrinhos_itallic = values.descricao_casamento_padrinhos_itallic;
      var descricao_casamento_padrinhos_underline = values.descricao_casamento_padrinhos_underline;
      var descricao_casamento_padrinhos_align = values.descricao_casamento_padrinhos_align ? values.descricao_casamento_padrinhos_align : "center";
      var descricao_casamento_padrinhos_fontStyle = values.descricao_casamento_padrinhos_fontStyle;
      var descricao_casamento_padrinhos_fontFamily = values.descricao_casamento_padrinhos_fontFamily ? values.descricao_casamento_padrinhos_fontFamily : "Museo Sans";
      var descricao_casamento_padrinhos_fontSize = values.descricao_casamento_padrinhos_fontSize ? values.descricao_casamento_padrinhos_fontSize : "16";
      var descricao_casamento_padrinhos_fontColor = values.descricao_casamento_padrinhos_fontColor;
      var descricao_casamento_padrinhos_bgColor = values.descricao_casamento_padrinhos_bgColor;

      var titulo_casamento_padrinho1_bold = values.titulo_casamento_padrinho1_bold;
      var titulo_casamento_padrinho1_itallic = values.titulo_casamento_padrinho1_itallic;
      var titulo_casamento_padrinho1_underline = values.titulo_casamento_padrinho1_underline;
      var titulo_casamento_padrinho1_align = values.titulo_casamento_padrinho1_align ? values.titulo_casamento_padrinho1_align : "center";
      var titulo_casamento_padrinho1_fontStyle = values.titulo_casamento_padrinho1_fontStyle;
      var titulo_casamento_padrinho1_fontFamily = values.titulo_casamento_padrinho1_fontFamily ? values.titulo_casamento_padrinho1_fontFamily : "Museo Sans";
      var titulo_casamento_padrinho1_fontSize = values.titulo_casamento_padrinho1_fontSize ? values.titulo_casamento_padrinho1_fontSize : "30";
      var titulo_casamento_padrinho1_fontColor = values.titulo_casamento_padrinho1_fontColor ? values.titulo_casamento_padrinho1_fontColor : "#000000";
      var titulo_casamento_padrinho1_bgColor = values.titulo_casamento_padrinho1_bgColor;

      var descricao_casamento_padrinho1_bold = values.descricao_casamento_padrinho1_bold;
      var descricao_casamento_padrinho1_itallic = values.descricao_casamento_padrinho1_itallic;
      var descricao_casamento_padrinho1_underline = values.descricao_casamento_padrinho1_underline;
      var descricao_casamento_padrinho1_align = values.descricao_casamento_padrinho1_align ? values.descricao_casamento_padrinho1_align : "center";
      var descricao_casamento_padrinho1_fontStyle = values.descricao_casamento_padrinho1_fontStyle;
      var descricao_casamento_padrinho1_fontFamily = values.descricao_casamento_padrinho1_fontFamily ? values.descricao_casamento_padrinho1_fontFamily : "Museo Sans";
      var descricao_casamento_padrinho1_fontSize = values.descricao_casamento_padrinho1_fontSize ? values.descricao_casamento_padrinho1_fontSize : "16";
      var descricao_casamento_padrinho1_fontColor = values.descricao_casamento_padrinho1_fontColor ? values.descricao_casamento_padrinho1_fontColor : "#000000";
      var descricao_casamento_padrinho1_bgColor = values.descricao_casamento_padrinho1_bgColor;

      var titulo_casamento_padrinho2_bold = values.titulo_casamento_padrinho2_bold;
      var titulo_casamento_padrinho2_itallic = values.titulo_casamento_padrinho2_itallic;
      var titulo_casamento_padrinho2_underline = values.titulo_casamento_padrinho2_underline;
      var titulo_casamento_padrinho2_align = values.titulo_casamento_padrinho2_align ? values.titulo_casamento_padrinho2_align : "center";
      var titulo_casamento_padrinho2_fontStyle = values.titulo_casamento_padrinho2_fontStyle;
      var titulo_casamento_padrinho2_fontFamily = values.titulo_casamento_padrinho2_fontFamily ? values.titulo_casamento_padrinho2_fontFamily : "Museo Sans";
      var titulo_casamento_padrinho2_fontSize = values.titulo_casamento_padrinho2_fontSize ? values.titulo_casamento_padrinho2_fontSize : "30";
      var titulo_casamento_padrinho2_fontColor = values.titulo_casamento_padrinho2_fontColor ? values.titulo_casamento_padrinho2_fontColor : "#000000";
      var titulo_casamento_padrinho2_bgColor = values.titulo_casamento_padrinho2_bgColor;

      var descricao_casamento_padrinho2_bold = values.descricao_casamento_padrinho2_bold;
      var descricao_casamento_padrinho2_itallic = values.descricao_casamento_padrinho2_itallic;
      var descricao_casamento_padrinho2_underline = values.descricao_casamento_padrinho2_underline;
      var descricao_casamento_padrinho2_align = values.descricao_casamento_padrinho2_align ? values.descricao_casamento_padrinho2_align : "center";
      var descricao_casamento_padrinho2_fontStyle = values.descricao_casamento_padrinho2_fontStyle;
      var descricao_casamento_padrinho2_fontFamily = values.descricao_casamento_padrinho2_fontFamily ? values.descricao_casamento_padrinho2_fontFamily : "Museo Sans";
      var descricao_casamento_padrinho2_fontSize = values.descricao_casamento_padrinho2_fontSize ? values.descricao_casamento_padrinho2_fontSize : "16";
      var descricao_casamento_padrinho2_fontColor = values.descricao_casamento_padrinho2_fontColor ? values.descricao_casamento_padrinho2_fontColor : "#000000";
      var descricao_casamento_padrinho2_bgColor = values.descricao_casamento_padrinho2_bgColor;

      var titulo_casamento_padrinho3_bold = values.titulo_casamento_padrinho3_bold;
      var titulo_casamento_padrinho3_itallic = values.titulo_casamento_padrinho3_itallic;
      var titulo_casamento_padrinho3_underline = values.titulo_casamento_padrinho3_underline;
      var titulo_casamento_padrinho3_align = values.titulo_casamento_padrinho3_align ? values.titulo_casamento_padrinho3_align : "center";
      var titulo_casamento_padrinho3_fontStyle = values.titulo_casamento_padrinho3_fontStyle;
      var titulo_casamento_padrinho3_fontFamily = values.titulo_casamento_padrinho3_fontFamily ? values.titulo_casamento_padrinho3_fontFamily : "Museo Sans";
      var titulo_casamento_padrinho3_fontSize = values.titulo_casamento_padrinho3_fontSize ? values.titulo_casamento_padrinho3_fontSize : "30";
      var titulo_casamento_padrinho3_fontColor = values.titulo_casamento_padrinho3_fontColor ? values.titulo_casamento_padrinho3_fontColor : "#000000";
      var titulo_casamento_padrinho3_bgColor = values.titulo_casamento_padrinho3_bgColor;

      var descricao_casamento_padrinho3_bold = values.descricao_casamento_padrinho3_bold;
      var descricao_casamento_padrinho3_itallic = values.descricao_casamento_padrinho3_itallic;
      var descricao_casamento_padrinho3_underline = values.descricao_casamento_padrinho3_underline;
      var descricao_casamento_padrinho3_align = values.descricao_casamento_padrinho3_align ? values.descricao_casamento_padrinho3_align : "center";
      var descricao_casamento_padrinho3_fontStyle = values.descricao_casamento_padrinho3_fontStyle;
      var descricao_casamento_padrinho3_fontFamily = values.descricao_casamento_padrinho3_fontFamily ? values.descricao_casamento_padrinho3_fontFamily : "Museo Sans";
      var descricao_casamento_padrinho3_fontSize = values.descricao_casamento_padrinho3_fontSize ? values.descricao_casamento_padrinho3_fontSize : "16";
      var descricao_casamento_padrinho3_fontColor = values.descricao_casamento_padrinho3_fontColor ? values.descricao_casamento_padrinho3_fontColor : "#000000";
      var descricao_casamento_padrinho3_bgColor = values.descricao_casamento_padrinho3_bgColor;


      var cta_primary_header_bold = values.cta_primary_header_bold;
      var cta_primary_header_itallic = values.cta_primary_header_itallic;
      var cta_primary_header_underline = values.cta_primary_header_underline;
      var cta_primary_header_align = values.cta_primary_header_align ? values.cta_primary_header_align : "center";
      var cta_primary_header_fontStyle = values.cta_primary_header_fontStyle;
      var cta_primary_header_fontFamily = values.cta_primary_header_fontFamily ? values.cta_primary_header_fontFamily : "Museo Sans";
      var cta_primary_header_fontSize = values.cta_primary_header_fontSize ? values.cta_primary_header_fontSize : "16";
      var cta_primary_header_fontColor = values.cta_primary_header_fontColor ? values.cta_primary_header_fontColor : "#ffffff";
      var cta_primary_header_bgColor = values.cta_primary_header_bgColor ? values.cta_primary_header_bgColor : "rgb(0, 177, 255)";

     var cta_secondary_header_bold = values.cta_secondary_header_bold;
     var cta_secondary_header_itallic = values.cta_secondary_header_itallic;
     var cta_secondary_header_underline = values.cta_secondary_header_underline;
     var cta_secondary_header_align = values.cta_secondary_header_align ? values.cta_secondary_header_align : "center";
     var cta_secondary_header_fontStyle = values.cta_secondary_header_fontStyle;
     var cta_secondary_header_fontFamily = values.cta_secondary_header_fontFamily ? values.cta_secondary_header_fontFamily : "Museo Sans";
     var cta_secondary_header_fontSize = values.cta_secondary_header_fontSize ? values.cta_secondary_header_fontSize : "16";
     var cta_secondary_header_fontColor = values.cta_secondary_header_fontColor ? values.cta_secondary_header_fontColor : "rgb(0, 177, 255)";
     var cta_secondary_header_bgColor = values.cta_secondary_header_bgColor;

    var contagem_header_bold = values.contagem_header_bold;
    var contagem_header_itallic = values.contagem_header_itallic;
    var contagem_header_underline = values.contagem_header_underline;
    var contagem_header_align = values.contagem_header_align ? values.contagem_header_align : "center";
    var contagem_header_fontStyle = values.contagem_header_fontStyle;
    var contagem_header_fontFamily = values.contagem_header_fontFamily ? values.contagem_header_fontFamily : "Museo Sans";
    var contagem_header_fontSize = values.contagem_header_fontSize ? values.contagem_header_fontSize : "22";
    var contagem_header_fontColor = values.contagem_header_fontColor ? values.contagem_header_fontColor : "#000000";
    var contagem_header_bgColor = values.contagem_header_bgColor;

    var titulo_about_bold = values.titulo_about_bold;
    var titulo_about_itallic = values.titulo_about_itallic;
    var titulo_about_underline = values.titulo_about_underline;
    var titulo_about_align = values.titulo_about_align ? values.titulo_about_align : "center";
    var titulo_about_fontStyle = values.titulo_about_fontStyle;
    var titulo_about_fontFamily = values.titulo_about_fontFamily ? values.titulo_about_fontFamily : "Museo Sans";
    var titulo_about_fontSize = values.titulo_about_fontSize ? values.titulo_about_fontSize : "30";
    var titulo_about_fontColor = values.titulo_about_fontColor ? values.titulo_about_fontColor : "#000000";
    var titulo_about_bgColor = values.titulo_about_bgColor;

    var descricao_about_bold = values.descricao_about_bold;
    var descricao_about_itallic = values.descricao_about_itallic;
    var descricao_about_underline = values.descricao_about_underline;
    var descricao_about_align = values.descricao_about_align ? values.descricao_about_align : "center";
    var descricao_about_fontStyle = values.descricao_about_fontStyle;
    var descricao_about_fontFamily = values.descricao_about_fontFamily ? values.descricao_about_fontFamily : "Museo Sans";
    var descricao_about_fontSize = values.descricao_about_fontSize ? values.descricao_about_fontSize : "16";
    var descricao_about_fontColor = values.descricao_about_fontColor ? values.descricao_about_fontColor : "#000000";
    var descricao_about_bgColor = values.descricao_about_bgColor;

    var titulo_address_bold = values.titulo_address_bold;
    var titulo_address_itallic = values.titulo_address_itallic;
    var titulo_address_underline = values.titulo_address_underline;
    var titulo_address_align = values.titulo_address_align ? values.titulo_address_align : "center";
    var titulo_address_fontStyle = values.titulo_address_fontStyle;
    var titulo_address_fontFamily = values.titulo_address_fontFamily ? values.titulo_address_fontFamily : "Museo Sans";
    var titulo_address_fontSize = values.titulo_address_fontSize ? values.titulo_address_fontSize : "30";
    var titulo_address_fontColor = values.titulo_address_fontColor ? values.titulo_address_fontColor : "#000000";
    var titulo_address_bgColor = values.titulo_address_bgColor;

    var descricao_address_bold = values.descricao_address_bold;
    var descricao_address_itallic = values.descricao_address_itallic;
    var descricao_address_underline = values.descricao_address_underline;
    var descricao_address_align = values.descricao_address_align ? values.descricao_address_align : "center";
    var descricao_address_fontStyle = values.descricao_address_fontStyle;
    var descricao_address_fontFamily = values.descricao_address_fontFamily ? values.descricao_address_fontFamily : "Museo Sans";
    var descricao_address_fontSize = values.descricao_address_fontSize ? values.descricao_address_fontSize : "16";
    var descricao_address_fontColor = values.descricao_address_fontColor ? values.descricao_address_fontColor : "#000000";
    var descricao_address_bgColor = values.descricao_address_bgColor;

    var endereco_address_bold = values.endereco_address_bold;
    var endereco_address_itallic = values.endereco_address_itallic;
    var endereco_address_underline = values.endereco_address_underline;
    var endereco_address_align = values.endereco_address_align ? values.endereco_address_align : "center";
    var endereco_address_fontStyle = values.endereco_address_fontStyle;
    var endereco_address_fontFamily = values.endereco_address_fontFamily ? values.endereco_address_fontFamily : "Museo Sans";
    var endereco_address_fontSize = values.endereco_address_fontSize ? values.endereco_address_fontSize : "18";
    var endereco_address_fontColor = values.endereco_address_fontColor ? values.endereco_address_fontColor : "#000000";
    var endereco_address_bgColor = values.endereco_address_bgColor;

    var titulo_album_bold = values.titulo_album_bold;
    var titulo_album_itallic = values.titulo_album_itallic;
    var titulo_album_underline = values.titulo_album_underline;
    var titulo_album_align = values.titulo_album_align ? values.titulo_album_align : "center";
    var titulo_album_fontStyle = values.titulo_album_fontStyle;
    var titulo_album_fontFamily = values.titulo_album_fontFamily ? values.titulo_album_fontFamily : "Museo Sans";
    var titulo_album_fontSize = values.titulo_album_fontSize ? values.titulo_album_fontSize : "30";
    var titulo_album_fontColor = values.titulo_album_fontColor ? values.titulo_album_fontColor : "#000000";
    var titulo_album_bgColor = values.titulo_album_bgColor;

    var titulo_countdown_bold = values.titulo_countdown_bold;
    var titulo_countdown_itallic = values.titulo_countdown_itallic;
    var titulo_countdown_underline = values.titulo_countdown_underline;
    var titulo_countdown_align = values.titulo_countdown_align ? values.titulo_countdown_align : "center";
    var titulo_countdown_fontStyle = values.titulo_countdown_fontStyle;
    var titulo_countdown_fontFamily = values.titulo_countdown_fontFamily ? values.titulo_countdown_fontFamily : "Museo Sans";
    var titulo_countdown_fontSize = values.titulo_countdown_fontSize ? values.titulo_countdown_fontSize : "36";
    var titulo_countdown_fontColor = values.titulo_countdown_fontColor ? values.titulo_countdown_fontColor : "#000000";
    var titulo_countdown_bgColor = values.titulo_countdown_bgColor;

    var descricao_countdown_bold = values.descricao_countdown_bold;
    var descricao_countdown_itallic = values.descricao_countdown_itallic;
    var descricao_countdown_underline = values.descricao_countdown_underline;
    var descricao_countdown_align = values.descricao_countdown_align ? values.descricao_countdown_align : "center";
    var descricao_countdown_fontStyle = values.descricao_countdown_fontStyle;
    var descricao_countdown_fontFamily = values.descricao_countdown_fontFamily ? values.descricao_countdown_fontFamily : "Museo Sans";
    var descricao_countdown_fontSize = values.descricao_countdown_fontSize ? values.descricao_countdown_fontSize : "30";
    var descricao_countdown_fontColor = values.descricao_countdown_fontColor ? values.descricao_countdown_fontColor : "#000000";
    var descricao_countdown_bgColor = values.descricao_countdown_bgColor;

    var cta_primary_countdown_bold = values.cta_primary_countdown_bold;
    var cta_primary_countdown_itallic = values.cta_primary_countdown_itallic;
    var cta_primary_countdown_underline = values.cta_primary_countdown_underline;
    var cta_primary_countdown_align = values.cta_primary_countdown_align ? values.cta_primary_countdown_align : "center";
    var cta_primary_countdown_fontStyle = values.cta_primary_countdown_fontStyle;
    var cta_primary_countdown_fontFamily = values.cta_primary_countdown_fontFamily ? values.cta_primary_countdown_fontFamily : "Museo Sans";
    var cta_primary_countdown_fontSize = values.cta_primary_countdown_fontSize ? values.cta_primary_countdown_fontSize : "16";
    var cta_primary_countdown_fontColor = values.cta_primary_countdown_fontColor ? values.cta_primary_countdown_fontColor : "#ffffff";
    var cta_primary_countdown_bgColor = values.cta_primary_countdown_bgColor ? values.cta_primary_countdown_bgColor : "#00b1ff";

    var cta_secondary_countdown_bold = values.cta_secondary_countdown_bold;
    var cta_secondary_countdown_itallic = values.cta_secondary_countdown_itallic;
    var cta_secondary_countdown_underline = values.cta_secondary_countdown_underline;
    var cta_secondary_countdown_align = values.cta_secondary_countdown_align ? values.cta_secondary_countdown_align : "center";
    var cta_secondary_countdown_fontStyle = values.cta_secondary_countdown_fontStyle;
    var cta_secondary_countdown_fontFamily = values.cta_secondary_countdown_fontFamily ? values.cta_secondary_countdown_fontFamily : "Museo Sans";
    var cta_secondary_countdown_fontSize = values.cta_secondary_countdown_fontSize ? values.cta_secondary_countdown_fontSize : "16";
    var cta_secondary_countdown_fontColor = values.cta_secondary_countdown_fontColor ? values.cta_secondary_countdown_fontColor : "rgb(0, 177, 255)";
    var cta_secondary_countdown_bgColor = values.cta_secondary_countdown_bgColor;

    var categoria;
    var thematics;

    if(values.tema_categoria == null || values.tema_categoria == ""){
      categoria = 1
    }else{
      categoria = values.tema_categoria
    }

    if(values.tema_thematics == null || values.tema_thematics == ""){
      thematics = 1
    }else{
      thematics = values.tema_thematics
    }

    categoria = categoria.split(",");
    thematics = thematics.split(",");


    var sectionHeader = [];
    sectionHeader.push( { header: [] } );
    sectionHeader[0].header.push(
      [
        {
          title: {
            sub_sess_id: 1,
            features: [
              {
                value: titulo_header_bold,
                feature_id: 1
              },
              {
                value: titulo_header_itallic,
                feature_id: 2
              },
              {
                value: titulo_header_underline,
                feature_id: 3
              },
              {
                value: titulo_header_align,
                feature_id: 4
              },
              {
                value: titulo_header_fontStyle,
                feature_id: 5
              },
              {
                value: titulo_header_fontSize,
                feature_id: 6
              },
              {
                value: titulo_header_fontColor,
                feature_id: 7
              },
              {
                value: titulo_header_bgColor,
                feature_id: 8
              },
              {
                value: titulo_header_fontFamily,
                feature_id: 11
              }
            ]
          },
          data: {
            sub_sess_id: 2,
            features: [
              {
                value: data_header_bold,
                feature_id: 1
              },
              {
                value: data_header_itallic,
                feature_id: 2
              },
              {
                value: data_header_underline,
                feature_id: 3
              },
              {
                value: data_header_align,
                feature_id: 4
              },
              {
                value: data_header_fontStyle,
                feature_id: 5
              },
              {
                value: data_header_fontSize,
                feature_id: 6
              },
              {
                value: data_header_fontColor,
                feature_id: 7
              },
              {
                value: data_header_bgColor,
                feature_id: 8
              },
              {
                value: data_header_fontFamily,
                feature_id: 11
              }
            ]
          },
          ctaPrimary: {
            sub_sess_id: 3,
            features: [
              {
                value: cta_primary_header_bold,
                feature_id: 1
              },
              {
                value: cta_primary_header_itallic,
                feature_id: 2
              },
              {
                value: cta_primary_header_underline,
                feature_id: 3
              },
              {
                value: cta_primary_header_align,
                feature_id: 4
              },
              {
                value: cta_primary_header_fontStyle,
                feature_id: 5
              },
              {
                value: cta_primary_header_fontSize,
                feature_id: 6
              },
              {
                value: cta_primary_header_fontColor,
                feature_id: 7
              },
              {
                value: cta_primary_header_bgColor,
                feature_id: 8
              },
              {
                value: cta_primary_header_fontFamily,
                feature_id: 11
              }
            ]
          },
          ctaSecondary: {
            sub_sess_id: 4,
            features: [
              {
                value: cta_secondary_header_bold,
                feature_id: 1
              },
              {
                value: cta_secondary_header_itallic,
                feature_id: 2
              },
              {
                value: cta_secondary_header_underline,
                feature_id: 3
              },
              {
                value: cta_secondary_header_align,
                feature_id: 4
              },
              {
                value: cta_secondary_header_fontStyle,
                feature_id: 5
              },
              {
                value: cta_secondary_header_fontSize,
                feature_id: 6
              },
              {
                value: cta_secondary_header_fontColor,
                feature_id: 7
              },
              {
                value: cta_secondary_header_bgColor,
                feature_id: 8
              },
              {
                value: cta_secondary_header_fontFamily,
                feature_id: 11
              }
            ]
          },
          contagemHeader: {
            sub_sess_id: 5,
            features: [
              {
                value: contagem_header_bold,
                feature_id: 1
              },
              {
                value: contagem_header_itallic,
                feature_id: 2
              },
              {
                value: contagem_header_underline,
                feature_id: 3
              },
              {
                value: contagem_header_align,
                feature_id: 4
              },
              {
                value: contagem_header_fontStyle,
                feature_id: 5
              },
              {
                value: contagem_header_fontSize,
                feature_id: 6
              },
              {
                value: contagem_header_fontColor,
                feature_id: 7
              },
              {
                value: contagem_header_bgColor,
                feature_id: 8
              },
              {
                value: contagem_header_fontFamily,
                feature_id: 11
              }
            ]
          },
          headerBackgroundColor: {
            sub_sess_id: 6,
            features: [
              {
                value: header_background_color,
                feature_id: 9
              },
              {
                value: header_background_image,
                feature_id: 10
              },
              {
                value: header_background_image_mobile,
                feature_id: 14
              }
            ]
          }
        }
      ]
    )

    var sectionAbout = [];
    sectionAbout.push({about: []});
    sectionAbout[0].about.push(
      [
        {
          titleAbout:{
            sub_sess_id: 7,
            features: [
              {
                value: titulo_about_bold,
                feature_id: 1
              },
              {
                value: titulo_about_itallic,
                feature_id: 2
              },
              {
                value: titulo_about_underline,
                feature_id: 3
              },
              {
                value: titulo_about_align,
                feature_id: 4
              },
              {
                value: titulo_about_fontStyle,
                feature_id: 5
              },
              {
                value: titulo_about_fontSize,
                feature_id: 6
              },
              {
                value: titulo_about_fontColor,
                feature_id: 7
              },
              {
                value: titulo_about_bgColor,
                feature_id: 8
              },
              {
                value: titulo_about_fontFamily,
                feature_id: 11
              }
            ]
          },
          descricaoAbout: {
            sub_sess_id: 8,
            features: [
              {
                value: descricao_about_bold,
                feature_id: 1
              },
              {
                value: descricao_about_itallic,
                feature_id: 2
              },
              {
                value: descricao_about_underline,
                feature_id: 3
              },
              {
                value: descricao_about_align,
                feature_id: 4
              },
              {
                value: descricao_about_fontStyle,
                feature_id: 5
              },
              {
                value: descricao_about_fontSize,
                feature_id: 6
              },
              {
                value: descricao_about_fontColor,
                feature_id: 7
              },
              {
                value: descricao_about_bgColor,
                feature_id: 8
              },
              {
                value: descricao_about_fontFamily,
                feature_id: 11
              }
            ]
          },
          aboutBackgroundColor: {
            sub_sess_id: 9,
            features: [
              {
                value: about_background_color,
                feature_id: 9
              },
              {
                value: about_background_image,
                feature_id: 10
              },
              {
                value: about_background_image_mobile,
                feature_id: 14
              }
            ]
          }
        }
      ]
    )

    var sectionAddress = [];
    sectionAddress.push({address: []});
    sectionAddress[0].address.push(
      [
        {
          tituloAddress: {
            sub_sess_id: 10,
            features: [
              {
                value: titulo_address_bold,
                feature_id: 1
              },
              {
                value: titulo_address_itallic,
                feature_id: 2
              },
              {
                value: titulo_address_underline,
                feature_id: 3
              },
              {
                value: titulo_address_align,
                feature_id: 4
              },
              {
                value: titulo_address_fontStyle,
                feature_id: 5
              },
              {
                value: titulo_address_fontSize,
                feature_id: 6
              },
              {
                value: titulo_address_fontColor,
                feature_id: 7
              },
              {
                value: titulo_address_bgColor,
                feature_id: 8
              },
              {
                value: titulo_address_fontFamily,
                feature_id: 11
              }
            ]
          },
          dataAddress: {
            sub_sess_id: 11,
            features: [
              {
                value: descricao_address_bold,
                feature_id: 1
              },
              {
                value: descricao_address_itallic,
                feature_id: 2
              },
              {
                value: descricao_address_underline,
                feature_id: 3
              },
              {
                value: descricao_address_align,
                feature_id: 4
              },
              {
                value: descricao_address_fontStyle,
                feature_id: 5
              },
              {
                value: descricao_address_fontSize,
                feature_id: 6
              },
              {
                value: descricao_address_fontColor,
                feature_id: 7
              },
              {
                value: descricao_address_bgColor,
                feature_id: 8
              },
              {
                value: descricao_address_fontFamily,
                feature_id: 11
              }
            ]
          },
          enderecoAddress: {
            sub_sess_id: 12,
            features: [
              {
                value: endereco_address_bold,
                feature_id: 1
              },
              {
                value: endereco_address_itallic,
                feature_id: 2
              },
              {
                value: endereco_address_underline,
                feature_id: 3
              },
              {
                value: endereco_address_align,
                feature_id: 4
              },
              {
                value: endereco_address_fontStyle,
                feature_id: 5
              },
              {
                value: endereco_address_fontSize,
                feature_id: 6
              },
              {
                value: endereco_address_fontColor,
                feature_id: 7
              },
              {
                value: endereco_address_bgColor,
                feature_id: 8
              },
              {
                value: endereco_address_fontFamily,
                feature_id: 11
              }
            ]
          },
          addressBackgroundColor: {
            sub_sess_id: 13,
            features: [
              {
                value: address_background_color,
                feature_id: 9
              },
              {
                value: address_background_image,
                feature_id: 10
              },
              {
                value: address_background_image_mobile,
                feature_id: 14
              }
            ]
          }
        }
      ]
    )

    var sectionAlbum = [];
    sectionAlbum.push({album: []});
    sectionAlbum[0].album.push(
      [
        {
          tituloAlbum: {
            sub_sess_id: 14,
            features:[
              {
                value: titulo_album_bold,
                feature_id: 1
              },
              {
                value: titulo_album_itallic,
                feature_id: 2
              },
              {
                value: titulo_album_underline,
                feature_id: 3
              },
              {
                value: titulo_album_align,
                feature_id: 4
              },
              {
                value: titulo_album_fontStyle,
                feature_id: 5
              },
              {
                value: titulo_album_fontSize,
                feature_id: 6
              },
              {
                value: titulo_album_fontColor,
                feature_id: 7
              },
              {
                value: titulo_album_bgColor,
                feature_id: 8
              },
              {
                value: titulo_album_fontFamily,
                feature_id: 11
              }
            ]
          },
          albumBackgroundColor: {
            sub_sess_id: 15,
            features: [
              {
                value: album_background_color,
                feature_id: 9
              },
              {
                value: album_background_image,
                feature_id: 10
              },
              {
                value: album_background_image_mobile,
                feature_id: 14
              }
            ]
          }
        }
      ]
    )

    var sectionCountdown = [];
    sectionCountdown.push({countdown: []});
    sectionCountdown[0].countdown.push(
      [
        {
          tituloCountdown: {
            sub_sess_id: 16,
            features:[
              {
                value: titulo_countdown_bold,
                feature_id: 1
              },
              {
                value: titulo_countdown_itallic,
                feature_id: 2
              },
              {
                value: titulo_countdown_underline,
                feature_id: 3
              },
              {
                value: titulo_countdown_align,
                feature_id: 4
              },
              {
                value: titulo_countdown_fontStyle,
                feature_id: 5
              },
              {
                value: titulo_countdown_fontSize,
                feature_id: 6
              },
              {
                value: titulo_countdown_fontColor,
                feature_id: 7
              },
              {
                value: titulo_countdown_bgColor,
                feature_id: 8
              },
              {
                value: titulo_countdown_fontFamily,
                feature_id: 11
              }
            ]
          },
          descricaoCountdown: {
            sub_sess_id: 17,
            features:[
              {
                value: descricao_countdown_bold,
                feature_id: 1
              },
              {
                value: descricao_countdown_itallic,
                feature_id: 2
              },
              {
                value: descricao_countdown_underline,
                feature_id: 3
              },
              {
                value: descricao_countdown_align,
                feature_id: 4
              },
              {
                value: descricao_countdown_fontStyle,
                feature_id: 5
              },
              {
                value: descricao_countdown_fontSize,
                feature_id: 6
              },
              {
                value: descricao_countdown_fontColor,
                feature_id: 7
              },
              {
                value: descricao_countdown_bgColor,
                feature_id: 8
              },
              {
                value: descricao_countdown_fontFamily,
                feature_id: 11
              }
            ]
          },
          ctaPrimaryCountdown: {
            sub_sess_id: 18,
            features:[
              {
                value: cta_primary_countdown_bold,
                feature_id: 1
              },
              {
                value: cta_primary_countdown_itallic,
                feature_id: 2
              },
              {
                value: cta_primary_countdown_underline,
                feature_id: 3
              },
              {
                value: cta_primary_countdown_align,
                feature_id: 4
              },
              {
                value: cta_primary_countdown_fontStyle,
                feature_id: 5
              },
              {
                value: cta_primary_countdown_fontSize,
                feature_id: 6
              },
              {
                value: cta_primary_countdown_fontColor,
                feature_id: 7
              },
              {
                value: cta_primary_countdown_bgColor,
                feature_id: 8
              },
              {
                value: cta_primary_countdown_fontFamily,
                feature_id: 11
              }
            ]
          },
          ctaSecondaryCountdown: {
            sub_sess_id: 19,
            features:[
              {
                value: cta_secondary_countdown_bold,
                feature_id: 1
              },
              {
                value: cta_secondary_countdown_itallic,
                feature_id: 2
              },
              {
                value: cta_secondary_countdown_underline,
                feature_id: 3
              },
              {
                value: cta_secondary_countdown_align,
                feature_id: 4
              },
              {
                value: cta_secondary_countdown_fontStyle,
                feature_id: 5
              },
              {
                value: cta_secondary_countdown_fontSize,
                feature_id: 6
              },
              {
                value: cta_secondary_countdown_fontColor,
                feature_id: 7
              },
              {
                value: cta_secondary_countdown_bgColor,
                feature_id: 8
              },
              {
                value: cta_secondary_countdown_fontFamily,
                feature_id: 11
              }
            ]
          },
          countdownBackgroundColor: {
            sub_sess_id: 20,
            features: [
              {
                value: countdown_background_color,
                feature_id: 9
              },
              {
                value: footer_background_image,
                feature_id: 10
              },
              {
                value: footer_background_image_mobile,
                feature_id: 14
              }
            ]
          }
        }
      ]
    )
      if(thematics == 5){

        var sectionCasamentoWelcome = [];
        sectionCasamentoWelcome.push( {casamento_welcome: []});
        sectionCasamentoWelcome[0].casamento_welcome.push(
          [
            {
              tituloCasamentoWelcome: {
                sub_sess_id: 32,
                features: [
                  {
                    value: titulo_casamento_welcome_bold,
                    feature_id: 1
                  },
                  {
                    value: titulo_casamento_welcome_itallic,
                    feature_id: 2
                  },
                  {
                    value: titulo_casamento_welcome_underline,
                    feature_id: 3
                  },
                  {
                    value: titulo_casamento_welcome_align,
                    feature_id: 4
                  },
                  {
                    value: titulo_casamento_welcome_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: titulo_casamento_welcome_fontSize,
                    feature_id: 6
                  },
                  {
                    value: titulo_casamento_welcome_fontColor,
                    feature_id: 7
                  },
                  {
                    value: titulo_casamento_welcome_bgColor,
                    feature_id: 8
                  },
                  {
                    value: titulo_casamento_welcome_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              descricaoCasamentoWelcome: {
                sub_sess_id: 33,
                features: [
                  {
                    value: descricao_casamento_welcome_bold,
                    feature_id: 1
                  },
                  {
                    value: descricao_casamento_welcome_itallic,
                    feature_id: 2
                  },
                  {
                    value: descricao_casamento_welcome_underline,
                    feature_id: 3
                  },
                  {
                    value: descricao_casamento_welcome_align,
                    feature_id: 4
                  },
                  {
                    value: descricao_casamento_welcome_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: descricao_casamento_welcome_fontSize,
                    feature_id: 6
                  },
                  {
                    value: descricao_casamento_welcome_fontColor,
                    feature_id: 7
                  },
                  {
                    value: descricao_casamento_welcome_bgColor,
                    feature_id: 8
                  },
                  {
                    value: descricao_casamento_welcome_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              casamentoWelcomeBackgoundColor: {
                sub_sess_id: 40,
                features: [
                  {
                    value: casamento_welcome_background_color,
                    feature_id: 9
                  },
                  {
                    value: casamento_welcome_background_image,
                    feature_id: 10
                  },
                  {
                    value: casamento_welcome_background_image_mobile,
                    feature_id: 14
                  }
                ]
              }
            }
          ]
        )

        var sectionCasamentoAbout = [];
        sectionCasamentoAbout.push({casamento_about: []});
        sectionCasamentoAbout[0].casamento_about.push(
          [
            {
              tituloCasamentoAbout: {
                sub_sess_id: 34,
                features: [
                    {
                      value: titulo_casamento_about_bold,
                      feature_id: 1
                    },
                    {
                      value: titulo_casamento_about_itallic,
                      feature_id: 2
                    },
                    {
                      value: titulo_casamento_about_underline,
                      feature_id: 3
                    },
                    {
                      value: titulo_casamento_about_align,
                      feature_id: 4
                    },
                    {
                      value: titulo_casamento_about_fontStyle,
                      feature_id: 5
                    },
                    {
                      value: titulo_casamento_about_fontSize,
                      feature_id: 6
                    },
                    {
                      value: titulo_casamento_about_fontColor,
                      feature_id: 7
                    },
                    {
                      value: titulo_casamento_about_bgColor,
                      feature_id: 8
                    },
                    {
                      value: titulo_casamento_about_fontFamily,
                      feature_id: 11
                    }
                ]
              },
              descricaoCasamentoAbout: {
                sub_sess_id: 35,
                features: [
                  {
                    value: descricao_casamento_about_bold,
                    feature_id: 1
                  },
                  {
                    value: descricao_casamento_about_itallic,
                    feature_id: 2
                  },
                  {
                    value: descricao_casamento_about_underline,
                    feature_id: 3
                  },
                  {
                    value: descricao_casamento_about_align,
                    feature_id: 4
                  },
                  {
                    value: descricao_casamento_about_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: descricao_casamento_about_fontSize,
                    feature_id: 6
                  },
                  {
                    value: descricao_casamento_about_fontColor,
                    feature_id: 7
                  },
                  {
                    value: descricao_casamento_about_bgColor,
                    feature_id: 8
                  },
                  {
                    value: descricao_casamento_about_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              casamentoAboutBackgoundColor: {
                sub_sess_id: 41,
                features: [
                  {
                    value: casamento_about_background_color,
                    feature_id: 9
                  },
                  {
                    value: casamento_about_background_image,
                    feature_id: 10
                  },
                  {
                    value: casamento_about_background_image_mobile,
                    feature_id: 14
                  }
                ]
              }
            }
          ]
        )

        var sectionCasamentoPadrinhos = [];
        sectionCasamentoPadrinhos.push({casamento_padrinhos: []});
        sectionCasamentoPadrinhos[0].casamento_padrinhos.push(
          [
            {
              tituloCasamentoPadrinhos: {
                sub_sess_id: 36,
                features: [
                  {
                    value: titulo_casamento_padrinhos_bold,
                    feature_id: 1
                  },
                  {
                    value: titulo_casamento_padrinhos_itallic,
                    feature_id: 2
                  },
                  {
                    value: titulo_casamento_padrinhos_underline,
                    feature_id: 3
                  },
                  {
                    value: titulo_casamento_padrinhos_align,
                    feature_id: 4
                  },
                  {
                    value: titulo_casamento_padrinhos_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: titulo_casamento_padrinhos_fontSize,
                    feature_id: 6
                  },
                  {
                    value: titulo_casamento_padrinhos_fontColor,
                    feature_id: 7
                  },
                  {
                    value: titulo_casamento_padrinhos_bgColor,
                    feature_id: 8
                  },
                  {
                    value: titulo_casamento_padrinhos_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              descricaoCasamentoPadrinhos: {
                sub_sess_id: 37,
                features: [
                  {
                    value: descricao_casamento_padrinhos_bold,
                    feature_id: 1
                  },
                  {
                    value: descricao_casamento_padrinhos_itallic,
                    feature_id: 2
                  },
                  {
                    value: descricao_casamento_padrinhos_underline,
                    feature_id: 3
                  },
                  {
                    value: descricao_casamento_padrinhos_align,
                    feature_id: 4
                  },
                  {
                    value: descricao_casamento_padrinhos_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: descricao_casamento_padrinhos_fontSize,
                    feature_id: 6
                  },
                  {
                    value: descricao_casamento_padrinhos_fontColor,
                    feature_id: 7
                  },
                  {
                    value: descricao_casamento_padrinhos_bgColor,
                    feature_id: 8
                  },
                  {
                    value: descricao_casamento_padrinhos_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              tituloCasamentoPadrinho1: {
                sub_sess_id: 42,
                features: [
                  {
                    value: titulo_casamento_padrinho1_bold,
                    feature_id: 1
                  },
                  {
                    value: titulo_casamento_padrinho1_itallic,
                    feature_id: 2
                  },
                  {
                    value: titulo_casamento_padrinho1_underline,
                    feature_id: 3
                  },
                  {
                    value: titulo_casamento_padrinho1_align,
                    feature_id: 4
                  },
                  {
                    value: titulo_casamento_padrinho1_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: titulo_casamento_padrinho1_fontSize,
                    feature_id: 6
                  },
                  {
                    value: titulo_casamento_padrinho1_fontColor,
                    feature_id: 7
                  },
                  {
                    value: titulo_casamento_padrinho1_bgColor,
                    feature_id: 8
                  },
                  {
                    value: titulo_casamento_padrinho1_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              descricaoCasamentoPadrinho1: {
                sub_sess_id: 42,
                features: [
                  {
                    value: descricao_casamento_padrinho1_bold,
                    feature_id: 1
                  },
                  {
                    value: descricao_casamento_padrinho1_itallic,
                    feature_id: 2
                  },
                  {
                    value: descricao_casamento_padrinho1_underline,
                    feature_id: 3
                  },
                  {
                    value: descricao_casamento_padrinho1_align,
                    feature_id: 4
                  },
                  {
                    value: descricao_casamento_padrinho1_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: descricao_casamento_padrinho1_fontSize,
                    feature_id: 6
                  },
                  {
                    value: descricao_casamento_padrinho1_fontColor,
                    feature_id: 7
                  },
                  {
                    value: descricao_casamento_padrinho1_bgColor,
                    feature_id: 8
                  },
                  {
                    value: descricao_casamento_padrinho1_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              tituloCasamentoPadrinho2: {
                sub_sess_id: 45,
                features: [
                  {
                    value: titulo_casamento_padrinho2_bold,
                    feature_id: 1
                  },
                  {
                    value: titulo_casamento_padrinho2_itallic,
                    feature_id: 2
                  },
                  {
                    value: titulo_casamento_padrinho2_underline,
                    feature_id: 3
                  },
                  {
                    value: titulo_casamento_padrinho2_align,
                    feature_id: 4
                  },
                  {
                    value: titulo_casamento_padrinho2_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: titulo_casamento_padrinho2_fontSize,
                    feature_id: 6
                  },
                  {
                    value: titulo_casamento_padrinho2_fontColor,
                    feature_id: 7
                  },
                  {
                    value: titulo_casamento_padrinho2_bgColor,
                    feature_id: 8
                  },
                  {
                    value: titulo_casamento_padrinho2_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              descricaoCasamentoPadrinho2: {
                sub_sess_id: 46,
                features: [
                  {
                    value: descricao_casamento_padrinho2_bold,
                    feature_id: 1
                  },
                  {
                    value: descricao_casamento_padrinho2_itallic,
                    feature_id: 2
                  },
                  {
                    value: descricao_casamento_padrinho2_underline,
                    feature_id: 3
                  },
                  {
                    value: descricao_casamento_padrinho2_align,
                    feature_id: 4
                  },
                  {
                    value: descricao_casamento_padrinho2_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: descricao_casamento_padrinho2_fontSize,
                    feature_id: 6
                  },
                  {
                    value: descricao_casamento_padrinho2_fontColor,
                    feature_id: 7
                  },
                  {
                    value: descricao_casamento_padrinho2_bgColor,
                    feature_id: 8
                  },
                  {
                    value: descricao_casamento_padrinho2_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              tituloCasamentoPadrinho3: {
                sub_sess_id: 47,
                features: [
                  {
                    value: titulo_casamento_padrinho3_bold,
                    feature_id: 1
                  },
                  {
                    value: titulo_casamento_padrinho3_itallic,
                    feature_id: 2
                  },
                  {
                    value: titulo_casamento_padrinho3_underline,
                    feature_id: 3
                  },
                  {
                    value: titulo_casamento_padrinho3_align,
                    feature_id: 4
                  },
                  {
                    value: titulo_casamento_padrinho3_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: titulo_casamento_padrinho3_fontSize,
                    feature_id: 6
                  },
                  {
                    value: titulo_casamento_padrinho3_fontColor,
                    feature_id: 7
                  },
                  {
                    value: titulo_casamento_padrinho3_bgColor,
                    feature_id: 8
                  },
                  {
                    value: titulo_casamento_padrinho3_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              descricaoCasamentoPadrinho3: {
                sub_sess_id: 48,
                features: [
                  {
                    value: descricao_casamento_padrinho3_bold,
                    feature_id: 1
                  },
                  {
                    value: descricao_casamento_padrinho3_itallic,
                    feature_id: 2
                  },
                  {
                    value: descricao_casamento_padrinho3_underline,
                    feature_id: 3
                  },
                  {
                    value: descricao_casamento_padrinho3_align,
                    feature_id: 4
                  },
                  {
                    value: descricao_casamento_padrinho3_fontStyle,
                    feature_id: 5
                  },
                  {
                    value: descricao_casamento_padrinho3_fontSize,
                    feature_id: 6
                  },
                  {
                    value: descricao_casamento_padrinho3_fontColor,
                    feature_id: 7
                  },
                  {
                    value: descricao_casamento_padrinho3_bgColor,
                    feature_id: 8
                  },
                  {
                    value: descricao_casamento_padrinho3_fontFamily,
                    feature_id: 11
                  }
                ]
              },
              casamentoPadrinhosBackgoundColor: {
                sub_sess_id: 44,
                features: [
                  {
                    value: casamento_padrinhos_background_color,
                    feature_id: 9
                  },
                  {
                    value: casamento_padrinhos_background_image,
                    feature_id: 10
                  },
                  {
                    value: casamento_padrinhos_background_image_mobile,
                    feature_id: 14
                  }
                ]
              }
            }
          ]
        )

      }

      if(edit){
        axios.put(`${URL}/theme/` + id, {"name": values.nome_tema, "description": values.descricao_tema}, config)
        .then((res) => {

          const dataId = res.data.id;
          
          for(let i = 1; i <= categoria.length; i++){
            let cat = categoria[i];
            axios.post(`${URL}/theme/` + dataId + `/category/` + cat, config)
            .then((res) => {
              console.log(res)
            })
          }
    
        if(values.tema_status != null){
          axios.put(`${URL}/theme/` + dataId + `/deactive`, config)
          .then((res) => {
            console.log(res)
          })
        }
    
        axios.post(`${URL}/theme/` + dataId + `/thematic/` + thematics, config)
        .then((res) => {
          console.log(res)
        })
    
          for(var i = 0; i < sectionHeader.length; i++){
            var item = sectionHeader[i];
            var {header} = item;
            header = header[0];
            
            
            header.map((sess) => {
              let data = sess.data;
              let title = sess.title;
              let ctaPrimary = sess.ctaPrimary;
              let ctaSecondary = sess.ctaSecondary;
              let contagemHeader = sess.contagemHeader;
              let headerBackgroundColor = sess.headerBackgroundColor;
    
              title.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": title.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": title.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                      if ( 0 === index ) {
                              Snackbar.show({
                                    pos: 'bottom-center',
                                    text: 'Atualizando Configurações do Header',
                                    backgroundColor: '#8332f5',
                                    showAction: false,
                                    duration: 5000
                              });
                        }
                    })
                  })
              data.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": data.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              ctaPrimary.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaPrimary.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              ctaSecondary.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaSecondary.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              contagemHeader.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": contagemHeader.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              headerBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": headerBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
            })
            
          }
    
            
          for(let i = 0; i < sectionAbout.length; i++){
            let item = sectionAbout[i];
            let {about} = item;
            about = about[0];
    
            about.map((sess) => {
              let titleAbout = sess.titleAbout;
              let descricaoAbout = sess.descricaoAbout;
              let aboutBackgroundColor = sess.aboutBackgroundColor;
    
              titleAbout.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": titleAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Atualizando Configurações da Saudação',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })
    
              descricaoAbout.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res);
                })
              })
    
              aboutBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": aboutBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res);
                })
              })
    
            })
    
          }
          
          if(thematics == 5){
            
            for(let i = 0; i < sectionCasamentoWelcome.length; i++){
              let item = sectionCasamentoWelcome[i];
              let{casamento_welcome} = item;
              casamento_welcome = casamento_welcome[0];
              
              casamento_welcome.map((sess) => {
                let tituloCasamentoWelcome = sess.tituloCasamentoWelcome;
                let descricaoCasamentoWelcome = sess.descricaoCasamentoWelcome;
                let casamentoWelcomeBackgoundColor = sess.casamentoWelcomeBackgoundColor;
      
                tituloCasamentoWelcome.features.map((fet, index) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoWelcome.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    if ( 0 === index ) {
                          Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Atualizando Configurações dos Noivos',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                        }
                  })
                })
      
                descricaoCasamentoWelcome.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoWelcome.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                casamentoWelcomeBackgoundColor.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": casamentoWelcomeBackgoundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
              })
            }
      
            for(let i = 0; i < sectionCasamentoAbout.length; i++){
              let item = sectionCasamentoAbout[i];
              let{casamento_about} = item;
              casamento_about = casamento_about[0];
              
              casamento_about.map((sess) => {
                let tituloCasamentoAbout = sess.tituloCasamentoAbout;
                let descricaoCasamentoAbout = sess.descricaoCasamentoAbout;
                let casamentoAboutBackgoundColor = sess.casamentoAboutBackgoundColor;
      
                tituloCasamentoAbout.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                descricaoCasamentoAbout.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                casamentoAboutBackgoundColor.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": casamentoAboutBackgoundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
              })
            }
      
            
            for(let i = 0; i < sectionCasamentoPadrinhos.length; i++){
              let item = sectionCasamentoPadrinhos[i];
              let{casamento_padrinhos} = item;
              casamento_padrinhos = casamento_padrinhos[0];
              
              casamento_padrinhos.map((sess) => {
                let tituloCasamentoPadrinhos = sess.tituloCasamentoPadrinhos;
                let descricaoCasamentoPadrinhos = sess.descricaoCasamentoPadrinhos;
                let casamentoPadrinhosBackgoundColor = sess.casamentoPadrinhosBackgoundColor;
                let tituloCasamentoPadrinho1 = sess.tituloCasamentoPadrinho1;
                let descricaoCasamentoPadrinho1 = sess.descricaoCasamentoPadrinho1;
                let tituloCasamentoPadrinho2 = sess.tituloCasamentoPadrinho2;
                let descricaoCasamentoPadrinho2 = sess.descricaoCasamentoPadrinho2;
                let tituloCasamentoPadrinho3 = sess.tituloCasamentoPadrinho3;
                let descricaoCasamentoPadrinho3 = sess.descricaoCasamentoPadrinho3;
      
                tituloCasamentoPadrinhos.features.map((fet, index) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinhos.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    if ( 0 === index ) {
                          Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Atualizando Configurações dos Padrinhos',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                        }
                  })
                })
      
                descricaoCasamentoPadrinhos.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinhos.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                casamentoPadrinhosBackgoundColor.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": casamentoPadrinhosBackgoundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                tituloCasamentoPadrinho1.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinho1.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                descricaoCasamentoPadrinho1.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinho1.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                tituloCasamentoPadrinho2.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinho2.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                descricaoCasamentoPadrinho2.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinho2.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                tituloCasamentoPadrinho3.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinho3.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
                descricaoCasamentoPadrinho3.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinho3.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })
      
              })
            }
          }
    
            
          for(let i = 0; i < sectionAddress.length; i++){
            let item = sectionAddress[i];
            let {address} = item;
            address = address[0];
    
            address.map((sess) => {
              console.log(sess)
              let tituloAddress = sess.tituloAddress;
              let dataAddress = sess.dataAddress;
              let enderecoAddress = sess.enderecoAddress;
              let addressBackgroundColor = sess.addressBackgroundColor;
    
              tituloAddress.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloAddress.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Atualizando Configurações do Endereço',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })
    
              dataAddress.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": dataAddress.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
    
              enderecoAddress.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": enderecoAddress.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
    
              addressBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": addressBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
    
            })
          }
    
            
          for(let i = 0; i < sectionAlbum.length; i++){
            let item = sectionAlbum[i];
            let {album} = item;
            album = album[0];
    
            album.map((sess) => {
              let tituloAlbum = sess.tituloAlbum;
              let albumBackgroundColor = sess.albumBackgroundColor;
    
              tituloAlbum.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloAlbum.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Atualizando Configurações das Fotos',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })
    
              albumBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": albumBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
    
            })
          }
    
            
          for(let i = 0; i < sectionCountdown.length; i++){
            let item = sectionCountdown[i];
            let {countdown} = item;
            countdown = countdown[0];
    
            countdown.map((sess) => {
              let tituloCountdown = sess.tituloCountdown;
              let descricaoCountdown = sess.descricaoCountdown;
              let ctaPrimaryCountdown = sess.ctaPrimaryCountdown;
              let ctaSecondaryCountdown = sess.ctaSecondaryCountdown;
    
              tituloCountdown.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Atualizando Configurações do Rodapé',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })
    
              descricaoCountdown.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                })
              })
    
              ctaPrimaryCountdown.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaPrimaryCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                })
              })
    
              ctaSecondaryCountdown.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaSecondaryCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                    dispatch(sendThemeSuccess());
                })
              })
    
            })
          }
    
        })
      }else{
        axios.post(`${URL}/theme`, {"name": values.nome_tema, "description": values.descricao_tema}, config)
        .then((res) => {

          const dataId = res.data.id;
          
          for(let i = 1; i <= categoria.length; i++){
          let cat = categoria[i];
          axios.post(`${URL}/theme/` + dataId + `/category/` + cat, config)
          .then((res) => {
            console.log(res)
          })
        }

        if(values.tema_status != null){
          axios.put(`${URL}/theme/` + dataId + `/deactive`, config)
          .then((res) => {
            console.log(res)
          })
        }

        axios.post(`${URL}/theme/` + dataId + `/thematic/` + thematics, config)
        .then((res) => {
          console.log(res)
        })

            
          for(var i = 0; i < sectionHeader.length; i++){
            var item = sectionHeader[i];
            var {header} = item;
            header = header[0];
            
            
            header.map((sess) => {
              let data = sess.data;
              let title = sess.title;
              let ctaPrimary = sess.ctaPrimary;
              let ctaSecondary = sess.ctaSecondary;
              let contagemHeader = sess.contagemHeader;
              let headerBackgroundColor = sess.headerBackgroundColor;

              console.log(sess) 

              title.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": title.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": title.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                      if ( 0 === index ) {
                            Snackbar.show({
                                    pos: 'bottom-center',
                                    text: 'Salvando Configurações do Header',
                                    backgroundColor: '#8332f5',
                                    showAction: false,
                                    duration: 5000
                              });
                        }
                    })
                  })
              data.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": data.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              ctaPrimary.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaPrimary.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              ctaSecondary.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaSecondary.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              contagemHeader.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": contagemHeader.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
              headerBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": headerBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })
            })
            
          }

            
          for(let i = 0; i < sectionAbout.length; i++){
            let item = sectionAbout[i];
            let {about} = item;
            about = about[0];

            about.map((sess) => {
              let titleAbout = sess.titleAbout;
              let descricaoAbout = sess.descricaoAbout;
              let aboutBackgroundColor = sess.aboutBackgroundColor;

              titleAbout.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": titleAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Salvando Configurações de Saudação',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })

              descricaoAbout.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res);
                })
              })

              aboutBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": aboutBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res);
                })
              })

            })

          }

          if(thematics == 5){
            
            for(let i = 0; i < sectionCasamentoWelcome.length; i++){
              let item = sectionCasamentoWelcome[i];
              let{casamento_welcome} = item;
              casamento_welcome = casamento_welcome[0];
              
              casamento_welcome.map((sess) => {
                let tituloCasamentoWelcome = sess.tituloCasamentoWelcome;
                let descricaoCasamentoWelcome = sess.descricaoCasamentoWelcome;
                let casamentoWelcomeBackgoundColor = sess.casamentoWelcomeBackgoundColor;

                tituloCasamentoWelcome.features.map((fet, index) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoWelcome.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    if ( 0 === index ) {
                              Snackbar.show({
                                    pos: 'bottom-center',
                                    text: 'Salvando Configurações dos Noivos',
                                    backgroundColor: '#8332f5',
                                    showAction: false,
                                    duration: 5000
                              });
                        }
                  })
                })

                descricaoCasamentoWelcome.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoWelcome.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                casamentoWelcomeBackgoundColor.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": casamentoWelcomeBackgoundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

              })
            }


            for(let i = 0; i < sectionCasamentoAbout.length; i++){
              let item = sectionCasamentoAbout[i];
              let{casamento_about} = item;
              casamento_about = casamento_about[0];
              
              casamento_about.map((sess) => {
                let tituloCasamentoAbout = sess.tituloCasamentoAbout;
                let descricaoCasamentoAbout = sess.descricaoCasamentoAbout;
                let casamentoAboutBackgoundColor = sess.casamentoAboutBackgoundColor;

                tituloCasamentoAbout.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                descricaoCasamentoAbout.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoAbout.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                casamentoAboutBackgoundColor.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": casamentoAboutBackgoundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

              })
            }

            
            for(let i = 0; i < sectionCasamentoPadrinhos.length; i++){
              let item = sectionCasamentoPadrinhos[i];
              let{casamento_padrinhos} = item;
              casamento_padrinhos = casamento_padrinhos[0];
              
              casamento_padrinhos.map((sess) => {
                let tituloCasamentoPadrinhos = sess.tituloCasamentoPadrinhos;
                let descricaoCasamentoPadrinhos = sess.descricaoCasamentoPadrinhos;
                let casamentoPadrinhosBackgoundColor = sess.casamentoPadrinhosBackgoundColor;
                let tituloCasamentoPadrinho1 = sess.tituloCasamentoPadrinho1;
                let descricaoCasamentoPadrinho1 = sess.descricaoCasamentoPadrinho1;
                let tituloCasamentoPadrinho2 = sess.tituloCasamentoPadrinho2;
                let descricaoCasamentoPadrinho2 = sess.descricaoCasamentoPadrinho2;
                let tituloCasamentoPadrinho3 = sess.tituloCasamentoPadrinho3;
                let descricaoCasamentoPadrinho3 = sess.descricaoCasamentoPadrinho3;

                tituloCasamentoPadrinhos.features.map((fet, index) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinhos.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    if ( 0 === index ) {
                              Snackbar.show({
                                    pos: 'bottom-center',
                                    text: 'Salvando Configurações dos Padrinhos',
                                    backgroundColor: '#8332f5',
                                    showAction: false,
                                    duration: 5000
                              });
                        }
                  })
                })

                descricaoCasamentoPadrinhos.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinhos.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                casamentoPadrinhosBackgoundColor.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": casamentoPadrinhosBackgoundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                tituloCasamentoPadrinho1.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinho1.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                descricaoCasamentoPadrinho1.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinho1.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                tituloCasamentoPadrinho2.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinho2.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                descricaoCasamentoPadrinho2.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinho2.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                tituloCasamentoPadrinho3.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCasamentoPadrinho3.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

                descricaoCasamentoPadrinho3.features.map((fet) => {
                  axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCasamentoPadrinho3.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                  .then((res) => {
                    console.log(res);
                  })
                })

              })
            }

          }

            
          for(let i = 0; i < sectionAddress.length; i++){
            let item = sectionAddress[i];
            let {address} = item;
            address = address[0];

            address.map((sess) => {
              let tituloAddress = sess.tituloAddress;
              let dataAddress = sess.dataAddress;
              let enderecoAddress = sess.enderecoAddress;
              let addressBackgroundColor = sess.addressBackgroundColor;

              tituloAddress.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloAddress.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Salvando Configurações de Endereço',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })

              dataAddress.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": dataAddress.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })

              enderecoAddress.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": enderecoAddress.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })

              addressBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": addressBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })

            })
          }

            
          for(let i = 0; i < sectionAlbum.length; i++){
            let item = sectionAlbum[i];
            let {album} = item;
            album = album[0];

            album.map((sess) => {
              let tituloAlbum = sess.tituloAlbum;
              let albumBackgroundColor = sess.albumBackgroundColor;

              tituloAlbum.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloAlbum.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Salvando Configurações das Fotos',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })

              albumBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": albumBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })

            })
          }

            
          for(let i = 0; i < sectionCountdown.length; i++){
            let item = sectionCountdown[i];
            let {countdown} = item;
            countdown = countdown[0];

            countdown.map((sess) => {
              let tituloCountdown = sess.tituloCountdown;
              let descricaoCountdown = sess.descricaoCountdown;
              let ctaPrimaryCountdown = sess.ctaPrimaryCountdown;
              let ctaSecondaryCountdown = sess.ctaSecondaryCountdown;
              let countdownBackgroundColor = sess.countdownBackgroundColor;

              tituloCountdown.features.map((fet, index) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": tituloCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                  if ( 0 === index ) {
                        Snackbar.show({
                              pos: 'bottom-center',
                              text: 'Salvando Configurações do Rodapé',
                              backgroundColor: '#8332f5',
                              showAction: false,
                              duration: 5000
                        });
                  }
                })
              })

              descricaoCountdown.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": descricaoCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })

              ctaPrimaryCountdown.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaPrimaryCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })

              ctaSecondaryCountdown.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": ctaSecondaryCountdown.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                      dispatch(sendThemeSuccess());
                })
              })

              countdownBackgroundColor.features.map((fet) => {
                axios.post(`${URL}/theme/` + dataId + `/config`, {"theme_ss_id": countdownBackgroundColor.sub_sess_id, "theme_feature_id": fet.feature_id, "value": fet.value}, config)
                .then((res) => {
                  console.log(res)
                })
              })

            })
          }

            var {data} = res;
            dispatch(fetchThemeSuccess(data));
            return data;

        })
      }

    

      
    }
  
}

export const fetchThemesBegin = () => ({
type: FETCH_THEMES_BEGIN
});

export const fetchThemesBeginNextLine = () => ({
  type: FETCH_THEME_BEGIN_NEXT
});

export const fetchThemesSuccess = themes => ({
    type: FETCH_THEMES_SUCCESS,
    payload: { themes }
});

export const fetchThemeSuccess = theme => ({
  type: FETCH_THEME_SUCCESS,
  payload: { theme }
});

export const sendThemeSuccess = () => ({
  type: SEND_THEME_SUCCESS
});

export const fetchThemesFailure = error => ({
    type: FETCH_THEMES_FAILURE,
    payload: { error }
});

var count = 0;
var themes = [];

export function fetchThemes( search = null, category_id = null, date_start = null, date_end = null, thematic_id = null, count = 1 ){
    var data_send = {};

    if ( search ) {
      data_send['busca'] = search;
    }

    if ( date_start ) {
      data_send['data_ini'] = date_start;
    }

    if ( date_end ) {
      data_send['data_fim'] = date_end;
    }

    if ( category_id ) {
      data_send['category_id'] = category_id;
    }

    if ( thematic_id ) {
      data_send['thematic_id'] = thematic_id;
    }

    return dispatch => {
      if(count < 1){
        dispatch(fetchThemesBegin());
      }else{
        dispatch(fetchThemesBeginNextLine());
      }
      return axios.post(`${URL}/theme/search/10/` + count ,data_send, config)
        .then((response) => {
          var {data} = response;
          // var {GIFTS} = data;
          if(data == ""){
            data = [];
          }
          if ( count === 1 ) {
            themes = [];
          }
          data.map( (theme) => {
            themes.push( theme );
          });
          // console.log(themes)
          dispatch(fetchThemesSuccess(themes));
          return data;
        })
        .catch(error => dispatch(fetchThemesFailure(error)));
    }
}

export function fetchTheme(id){
  return dispatch => {
    dispatch(fetchThemesBegin());
    return axios.get(`${URL}/theme/` + id + `/config`, config)
      .then((response) => {
        var {data} = response;
        dispatch(fetchThemeSuccess(data));
        return data;
      })
      .catch(error => dispatch(fetchThemesFailure(error)));
  }
}

export function editThemes(values, id){
  return dispatch => {
    dispatch(fetchThemesBegin());
    console.log(values, id)
    dispatch(sendThemeSuccess());
  }
}