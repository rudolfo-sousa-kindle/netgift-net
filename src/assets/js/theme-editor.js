import $ from 'jquery';
import 'jquery-ui';
import 'select2';
import './fileup';

const image2base64 = require('image-to-base64');
const AColorPicker = require('a-color-picker');

// jQuery(document).ready(function ($) {

    var editElement;
    var editContainerElement;
    var dialogCorPaletaCustom;


    var selectStatus = $(".custom-select-editor:not(.text-style)").select2({
        tags: false,
        minimumResultsForSearch: -1,
        templateSelection: formatStatus,
        templateResult: formatStatus,

    });

    function formatStatus(status) {
        var $state = $(
            '<span  style="font-family:' + status.id + ';">' + status.text + '</span>'
        );
        return $state;
    };

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function colorLum(color) {
        let rgb = color.match(/\d+/g);
        let vermelho = rgb[0];
        let verde = rgb[1];
        let azul = rgb[2];

        let lum = (vermelho * 299 + verde * 587 + azul * 114) / 1000;

        if (lum < 128) {
            return "white";
        } else {
            return "black";
        }
    }

    AColorPicker.from('.picker')
        .on('change', (picker, color) => {
            //$(".custom-color-hash").val(rgb2hex(color)).css("backgroundColor", color);
            //$(".custom-color-hash").css("color", colorLum(color));
            //            editElement.color = color;
        })
        .on('coloradd', (picker, color) => {
            let newColor = '<div class="custom-color-paleta active" data-color="' + color + '" title="' + color + '" style="background-color: ' + color + ';"></div>';
            $("." + dialogCorPaletaCustom + " .custom-colors-paleta").append(newColor);
            console.log( dialogCorPaletaCustom );

            if (dialogCorPaletaCustom == "dialog-bg-text") {
                editElement.backgroundColor = color;
            } else if (dialogCorPaletaCustom == "dialog-color") {
                editElement.background = color;
            } else {
                editElement.color = color;
            }

            let item = $("html").find(".is-editing .editar-background").data("bg");

            $("input[name='" + item + "-background-color']").val(color);

            $(".palette .colors .color").removeClass("active");

        })
        .on('colorremove', (picker, color) => {
            console.log(color);
        });

    $(document).on('click', ".confirm-custom-color", function (e) {
        e.preventDefault();
        $( this ).parents( '.dialog-content' ).find( ".a-color-picker-palette-add" ).trigger("click");
        $("input[name=" + $("input[name=identificador]").val() + "-fontColor]").val(editElement.color)
    });



    $(document).on("click", "[data-device]", function () {
        $("[data-device]").removeClass("active");
        $(this).addClass("active");
        var device = $(this).data("device");

        if (device == "desk") {
            $(".theme-site").removeClass("mobile");
        } else {
            $(".theme-site").addClass("mobile");
        }
    });


    $(document).on( 'click', ".dialog-option", function (e) {
        e.preventDefault();
        $(".dialog-option").removeClass("active");
        $(this).addClass("active");
        $(".dialog-bg-option.bg-image").hide();
        $(".dialog-bg-option.bg-color").hide();

        if ($(this).hasClass("bg-color")) {
            $(".dialog-bg-option.bg-color").show();
        } else {
            $(".dialog-bg-option.bg-image").show();
        }
    });



    //abre a dialog

    $("#tipo-de-festa").on("change", function(){
        $("input[name=tipo-de-festa]").val($(this).val());
    });

    $("#tema-categoria").on("change", function(){
        $("input[name=tema-categoria]").val($(this).val());
    });
    
    $("#tema-status").on("change", function(){
        $("input[name=tema-status]").val($(this).val());
    });

    $(document).on("click", ".enable-edit", function (event) {

        $("input[name=identificador]").val($(this).attr("id"));

        $("input[name=fontWeight").on('change', function(){
            if($("input[name=fontWeight").is(":checked")){
                $("input[name=" + $("input[name=identificador]").val() + "-bold]").val("true")
            }else{
                $("input[name=" + $("input[name=identificador]").val() + "-bold]").val("")
            };
        });

        $("input[name=fontStyle").on('change', function(){
            if($("input[name=fontStyle").is(":checked")){
                $("input[name=" + $("input[name=identificador]").val() + "-itallic]").val("true")
            }else{
                $("input[name=" + $("input[name=identificador]").val() + "-itallic]").val("")
            }
        });

        $("input[name=textDecoration").on('change', function(){
            if($("input[name=textDecoration").is(":checked")){
                $("input[name=" + $("input[name=identificador]").val() + "-underline]").val("true")
            }else{
                $("input[name=" + $("input[name=identificador]").val() + "-underline]").val("")
            } 
        });

        $("input[name=textAlign").on('change', function(){
            if($("input[name=textAlign]:checked")){
                $("input[name=" + $("input[name=identificador]").val() + "-align]").val($(this).val())
            }else{
                $("input[name=" + $("input[name=identificador]").val() + "-align]").val("")
            }
        });

        $("select[name=fontFamily").on('change', function(){
            $("input[name=" + $("input[name=identificador]").val() + "-fontFamily]").val($(this).val())
        });

        $("select[name=textClass").on('change', function(){
            $("input[name=" + $("input[name=identificador]").val() + "-fontStyle]").val($(this).val())
        })

        $("input[name=fontSize").on('change', function(){ 
            if($("input[name=fontSize]:checked")){
                $("input[name=" + $("input[name=identificador]").val() + "-fontSize]").val($(this).val())
            }else{
                $("input[name=" + $("input[name=identificador]").val() + "-fontSize]").val("")
            }
        });

        $(document).on('click', ".text-color .paleta-cor", function(){
            $("input[name=" + $("input[name=identificador]").val() + "-fontColor]").val(editElement.color)
        });

        $(document).on('click', ".bg-color .paleta-cor", function(){
            $("input[name=" + $("input[name=identificador]").val() + "-bgColor]").val($(this).attr("data-color"))
        });

        $(".is-editing").removeClass("is-editing");
        $(this).addClass("is-editing");
        //$(".enable-edit").bind("contextmenu", function (event) {
        editElement = this.style;
        editContainerElement = $(this).parents(".container-editor");
        event.preventDefault();

        $(".dialog").addClass("hidden");

        let left = $(this)[0].offsetLeft;
        let top = $(this)[0].offsetTop;
        let width = $(this).width();
        let height = $(this).height();

        if ($(this).data("dialog")) {
            let dialog = $(this).data("dialog");

            //previne o dialog abrir fora do width da pagina
            if (left > 1025) {
                left = left - 330;
            } else {
                left = left + width + 50;
            }

            $("." + dialog).stop().removeClass("hidden").removeClass("disabled").css({
                top: top - 10 + "px",
                left: left + "px"
            });

        }

        //resgata atributos style inline e seta na dialog
        $("[name='fontWeight']").prop( "checked", false );
        if (editElement.fontWeight != "" && editElement.fontWeight == "bold") {
            $("[name='fontWeight']").prop( "checked", true );
            console.log(editElement)
        }

        $("[name='fontStyle']").prop( "checked", false );;
        if (editElement.fontStyle != "" && editElement.fontStyle == "italic") {
            $("[name='fontStyle']").prop( "checked", true );
        }

        $("[name='textDecoration']").prop( "checked", false );;
        if (editElement.textDecoration != "" && editElement.textDecoration == "underline") {
            $("[name='textDecoration']").prop( "checked", true );
        }

        $("[name='textAlign']").prop( "checked", false );;
        if (editElement.textAlign != "") {
            $("[name='textAlign'][value='" + editElement.textAlign + "']").prop( "checked", true ).trigger("change");
        } else {
            $("[name='textAlign'][value='left']").prop( "checked", true ).trigger("change");
        }

        $("[name='fontFamily'] option").prop("selected", false);
        if (editElement.fontFamily != "") {
            $("[name='fontFamily'] option[value='" + editElement.fontFamily.replace( '"', '' ).replace( '"', '' ) + "']").prop("selected", true).trigger("change");
        } else {
            $("[name='fontFamily'] option[value='Museo Sans']").prop("selected", true).trigger("change");
        }

        $("[name='fontSize'] option").prop( "checked", false );;
        if (editElement.fontSize != "") {
            $("[name='fontSize'][value='" + editElement.fontSize.replace("px", "") + "']").prop( "checked", true ).trigger("change");
        } else {
            $("[name='fontSize'][value='16']").prop( "checked", true ).trigger("change");
        }

        $(".dialog-text-options .paleta-cores.text-color .paleta-cor").removeClass("active");
        $(".dialog-color-text .palette .colors .color").removeClass("active");
        $(".dialog-color-text .custom-colors-paleta .custom-color-paleta").removeClass("active");

        if (editElement.color != "") {
            $(".dialog-text-options .paleta-cores.text-color .paleta-cor[data-color='" + rgb2hex(editElement.color) + "']").addClass("active");
            $(".dialog-color-text .palette .colors .color[data-color='" + rgb2hex(editElement.color) + "']").addClass("active");
            $(".dialog-color-text .custom-colors-paleta .custom-color-paleta[data-color='" + rgb2hex(editElement.color) + "']").addClass("active");
        }

        $(".dialog-text-options .paleta-cores.bg-color .paleta-cor").removeClass("active");
        $(".dialog-bg-text .palette .colors .color").removeClass("active");
        $(".dialog-bg-text .custom-colors-paleta .custom-color-paleta").removeClass("active");

        if (editElement.backgroundColor != "") {
            $(".dialog-text-options .paleta-cores.bg-color .paleta-cor[data-color='" + rgb2hex(editElement.backgroundColor) + "']").addClass("active");
            $(".dialog-bg-text .palette .colors .color[data-color='" + rgb2hex(editElement.backgroundColor) + "']").addClass("active");
            $(".dialog-bg-text .custom-colors-paleta .custom-color-paleta[data-color='" + rgb2hex(editElement.backgroundColor) + "']").addClass("active");
        }

    });

    //abre a dialog de acordo com o data do botao
    $(document).on('click', ".open-dialog", function ( event ) {
        event.preventDefault();
        let dialogAbrir = $(this).data("dialog");
        let dialogAberto = $(this).parents(".dialog").attr('class').split(' ')[1];

        let dialogAbertoLeft = parseInt($(".dialog." + dialogAberto).css("left"));
        let dialogAbertoTop = parseInt($(".dialog." + dialogAberto).css("top"));
        let dialogAbertoWidth = $(".dialog." + dialogAberto).width();
        let dialogAbertoHeight = $(".dialog." + dialogAberto).height();

        let dialogAbrirWidth = $(".dialog." + dialogAbrir).width();
        let dialogAbrirHeight = $(".dialog." + dialogAbrir).height();

        if (dialogAbrir == "dialog-color-text" || dialogAbrir == "dialog-bg-text") {
            //abre dialog cor texto
            $(".dialog.dialog-text").addClass("disabled");
            $(".dialog.dialog-text").removeClass("hidden");

            if (dialogAbertoLeft < 310) {
                $("." + dialogAbrir).css("left", dialogAbertoLeft + dialogAbertoWidth).css("top", dialogAbertoTop + dialogAbertoHeight - dialogAbrirHeight);
            } else {
                $("." + dialogAbrir).css("left", dialogAbertoLeft - dialogAbrirWidth).css("top", dialogAbertoTop + dialogAbertoHeight - dialogAbrirHeight);
            }
        } else if (dialogAbrir == "dialog-color-custom") {
            //abre dialog custom color
            $(".dialog.dialog-text").addClass("hidden");
            dialogCorPaletaCustom = dialogAberto;

            if (dialogAbertoLeft > 950) {
                $("." + dialogAbrir).css("left", dialogAbertoLeft - dialogAbrirWidth).css("top", dialogAbertoTop + dialogAbertoHeight - dialogAbrirHeight);
            } else {
                $("." + dialogAbrir).css("left", dialogAbertoLeft + dialogAbertoWidth).css("top", dialogAbertoTop + dialogAbertoHeight - dialogAbrirHeight);
            }

        } else {
            editElement = this.style;
        }

        if ($(this).data("dialog")) {
            let dialog = $(this).data("dialog");
            $("." + dialog).toggleClass("hidden");
        }
    });

    //fecha dialog
    $(document).on('click', ".dialog-close", function () {
        $(this).parents(".dialog").addClass("hidden");

        if ($(this).parents(".dialog").hasClass("dialog-color-custom")) {

            if (dialogCorPaletaCustom != "dialog-color") {
                $(".dialog.dialog-text").removeClass("hidden");
            }

        }

        if ($(this).parents(".dialog").hasClass("dialog-color-text") || $(this).parents(".dialog").hasClass("dialog-bg-text")) {
            $(".dialog.dialog-text").removeClass("disabled");
            $(".dialog.dialog-text").removeClass("hidden");
            $(".dialog.dialog-color-custom").addClass("hidden");
        }

        if ($(this).parents(".dialog").hasClass("dialog-text")) {
            $(".is-editing").removeClass("is-editing");
            $(".dialog.dialog-color-text").addClass("hidden");
            $(".dialog.dialog-text").removeClass("disabled");
        }

    });

    //arrastavel
    // $(".dialog").draggable({
    //     handle: $(".dialog-header"),
    //     opacity: 0.5,
    //     containment: $(".wrap-editor")
    // });



    /* FUNCOES EDITOR TEXTO */


    //COR DO TEXTO CUSTOM CUSTOM
    $(document).on("click", ".dialog-color-text .custom-colors-paleta .custom-color-paleta", function () {
        $(".dialog-color-text .custom-colors-paleta .custom-color-paleta").removeClass("active");
        $(this).addClass("active");

        let cor = $(this).data("color");

        if (!$(this).hasClass("open-dialog")) {
            editElement.color = cor;
        }
    });

    //COR DO TEXTO CUSTOM
    $(document).on('click', ".dialog-color-text .palette .colors .color", function () {
        $(".dialog-color-text .custom-colors-paleta .custom-color-paleta").removeClass("active");
        $(".dialog-color-text .palette .colors .color").removeClass("active");
        $(this).addClass("active");
        let cor = $(this).data("color");
        editElement.color = cor;
    });

    //BG DO TEXTO CUSTOM CUSTOM
    $(document).on("click", ".dialog-bg-text .custom-colors-paleta .custom-color-paleta", function () {
        $(".dialog-bg-text .custom-colors-paleta .custom-color-paleta").removeClass("active");
        $(this).addClass("active");

        let cor = $(this).data("color");

        if (!$(this).hasClass("open-dialog")) {
            editElement.backgroundColor = cor;
        }
    });

    //BG DO TEXTO CUSTOM
    $(document).on('click', ".dialog-bg-text .palette .colors .color", function () {
        $(".dialog-bg-text .custom-colors-paleta .custom-color-paleta").removeClass("active");
        $(".dialog-bg-text .palette .colors .color").removeClass("active");
        $(this).addClass("active");
        let cor = $(this).data("color");
        editElement.backgroundColor = cor;
    });

    //COR DO TEXTO
    $(document).on('click', ".dialog-text-options .paleta-cores.text-color .paleta-cor", function () {
        $(".dialog-text-options .paleta-cores.text-color .paleta-cor").removeClass("active");
        $(this).addClass("active");

        if (!$(this).hasClass("open-dialog")) {
            let cor = $(this).data("color");
            editElement.color = cor;
        }
    });

    //BACKGROUND COLOR DO TEXTO
    $(document).on( 'click', ".dialog-text-options .paleta-cores.bg-color .paleta-cor",function () {
        $(".dialog-text-options .paleta-cores.bg-color .paleta-cor").removeClass("active");
        $(this).addClass("active");

        if (!$(this).hasClass("open-dialog")) {
            let cor = $(this).data("color");
            editElement.backgroundColor = cor;
        }
    });

    //NEGRITO fontWeight
    $(document).on('change', "[name='fontWeight']", function () {
        var value = $(this).val();
        console.log( editElement );
        if (editElement.fontWeight == value) {
            editElement.fontWeight = "400";
        } else {
            editElement.fontWeight = value;
        }
    });

    //ITALICO fontStyle
    $(document).on('change', "[name='fontStyle']", function () {
        var value = $(this).val();
        if (editElement.fontStyle == value) {
            editElement.fontStyle = "normal";
        } else {
            editElement.fontStyle = value;
        }
    });

    //SUBLINHADO textDecoration
    $(document).on('change', "[name='textDecoration']", function () {
        var value = $(this).val();
        if (editElement.textDecoration == value) {
            editElement.textDecoration = "none";
        } else {
            editElement.textDecoration = value;
        }
    });

    //ALINHAMENTO textAlign
    $(document).on('change', "[name='textAlign']", function () {
        var value = $(this).val();
        editElement.textAlign = value;
        editContainerElement.css("textAlign", value);
    });

    //fontSize
    $(document).on('change', "[name='fontSize']",function () {
        var value = $(this).val();
        editElement.fontSize = value + "px";
    });

    //fontFamily
    $(document).on('change', "[name='fontFamily']", function () {
        var value = $(this).val();
        editElement.fontFamily = value;
    });


    /* EDIT BACKGROUND */

    //BG CUSTOM
    $(document).on( 'click', ".dialog-color .palette .colors .color", function () {
        $(".dialog-color .custom-colors-paleta .custom-color-paleta").removeClass("active");
        $(".dialog-color .palette .colors .color").removeClass("active");
        $(this).addClass("active");
        let cor = $(this).data("color");
        editElement.backgroundColor = cor;
        editElement.backgroundImage = "";
        let item = $("html").find(".is-editing .editar-background").data("bg");
        $("input[name='" + item + "-background-color']").val(editElement.backgroundColor);
    });

    //BG CUSTOM CUSTOM
    $(".dialog-color .custom-colors-paleta").on("click", ".custom-color-paleta", function () {
        $(".dialog-color .custom-colors-paleta .custom-color-paleta").removeClass("active");
        $(this).addClass("active");

        let cor = $(this).data("color");

        if (!$(this).hasClass("open-dialog")) {
            editElement.backgroundColor = cor;
        }

    });

    $(document).on('click', ".editar-background", function (e) {
        e.preventDefault();
        $(".is-editing").removeClass("is-editing");
        $(this).parent().addClass("is-editing");

        editElement = $(this).parent()[0].style;
        var bg = $(this).data("bg");
        console.log(bg)

        $("#bg-" + bg + "-dropzone").click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $("#bg-" + bg).trigger("click");
        });

        $(".dialog").addClass("hidden");

        if ($(this).data("dialog")) {
            let dialog = $(this).data("dialog");

            let width = $(this).parent().width();
            let height = $(this).parent().height();

            let widthDialog = $("." + dialog).width();
            let heightDialog = $("." + dialog).height();

            let top = $(this).parent()[0].offsetTop;
            let left = $(this).parent()[0].offsetLeft;

            $("." + dialog).stop().removeClass("hidden").removeClass("disabled").css({
                top: top + height - heightDialog - 65 + "px",
                left: left + width - widthDialog - 20 + "px"
            });
        }

        $(".dialog-bg-option.bg-image > div").hide();
        $("#bg-" + bg + "-dropzone").show();
        $("#bg-" + bg + "-preview").show();

        $(".dialog-color .palette .colors .color").removeClass("active");
        $(".dialog-color .custom-colors-paleta .custom-color-paleta").removeClass("active");

        if (editElement.backgroundColor != "") {
            $(".dialog-color .palette .colors .color[data-color='" + rgb2hex(editElement.backgroundColor) + "']").addClass("active");
            $(".dialog-color .custom-colors-paleta .custom-color-paleta[data-color='" + rgb2hex(editElement.backgroundColor) + "']").addClass("active");
        }

    });



    /* file up */

    // $(document).on("click", ".fileup-remove", function(){
    //     var dataId = $(this).attr('data-id').toString();
    //     var dataAction = $(this).attr('data-action').toString();
    //     var dataFileNum = $(this).attr('data-file-num').toString();
    //     console.log(dataId, dataAction, dataFileNum);
    //     $.fileup(dataId, dataAction, dataFileNum);
    // });

    $(document).on("click", '.type-view', function (e) {
        let device = $(this).attr("id");
        console.log(device)
        if(device === "mobile-view"){
            if(window.location.pathname === "/dashboard/temas/novo-tema"){
                $(".theme-site-header").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_header_image_mobile']").val() + ")")
                $(".theme-site-about").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_about_image_mobile']").val() + ")")
                $(".theme-site-address").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_address_image_mobile']").val() + ")")
                $(".theme-site-album").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_album_image_mobile']").val() + ")")
                $(".theme-site-countdown").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_countdown_image_mobile']").val() + ")")
                $(".theme-site-casamento-welcome").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_casamento_welcome_imagem_mobile']").val() + ")")
                $(".theme-site-casamento-about").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_casamento_about_image_mobile']").val() + ")")
                $(".theme-site-casamento-padrinhos").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_casamento_padrinhos_image_mobile']").val() + ")")
            }else{
                $(".theme-site-header").attr("style", "background-image: url(" + $("input[name='background_header_image_mobile']").val() + ")")
                $(".theme-site-about").attr("style", "background-image: url(" + $("input[name='background_about_image_mobile']").val() + ")")
                $(".theme-site-address").attr("style", "background-image: url(" + $("input[name='background_address_image_mobile']").val() + ")")
                $(".theme-site-album").attr("style", "background-image: url(" + $("input[name='background_album_image_mobile']").val() + ")")
                $(".theme-site-countdown").attr("style", "background-image: url(" + $("input[name='background_countdown_image_mobile']").val() + ")")
                $(".theme-site-casamento-welcome").attr("style", "background-image: url(" + $("input[name='background_casamento_welcome_image_mobile']").val() + ")")
                $(".theme-site-casamento-about").attr("style", "background-image: url(" + $("input[name='background_casamento_about_image_mobile']").val() + ")")
                $(".theme-site-casamento-padrinhos").attr("style", "background-image: url(" + $("input[name='background_casamento_padrinhos_image_mobile']").val() + ")")
            }
        }
        if(device === "desktop-view"){
            if(window.location.pathname === "/dashboard/temas/novo-tema"){
                console.log($("input[name='background_casamento_welcome_imagem']").val())
                $(".theme-site-header").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_header_image']").val() + ")")
                $(".theme-site-about").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_about_image']").val() + ")")
                $(".theme-site-address").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_address_image']").val() + ")")
                $(".theme-site-album").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_album_image']").val() + ")")
                $(".theme-site-countdown").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_countdown_image']").val() + ")")
                $(".theme-site-casamento-welcome").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_casamento_welcome_imagem']").val() + ")")
                $(".theme-site-casamento-about").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_casamento_about_image']").val() + ")")
                $(".theme-site-casamento-padrinhos").attr("style", "background-image: url(data:image/gif;base64," + $("input[name='background_casamento_padrinhos_image']").val() + ")")
            }else{
                $(".theme-site-header").attr("style", "background-image: url(" + $("input[name='background_header_image']").val() + ")")
                $(".theme-site-about").attr("style", "background-image: url(" + $("input[name='background_about_image']").val() + ")")
                $(".theme-site-address").attr("style", "background-image: url(" + $("input[name='background_address_image']").val() + ")")
                $(".theme-site-album").attr("style", "background-image: url(" + $("input[name='background_album_image']").val() + ")")
                $(".theme-site-countdown").attr("style", "background-image: url(" + $("input[name='background_countdown_image']").val() + ")")
                $(".theme-site-casamento-welcome").attr("style", "background-image: url(" + $("input[name='background_casamento_welcome_imagem']").val() + ")")
                $(".theme-site-casamento-about").attr("style", "background-image: url(" + $("input[name='background_casamento_about_image']").val() + ")")
                $(".theme-site-casamento-padrinhos").attr("style", "background-image: url(" + $("input[name='background_casamento_padrinhos_image']").val() + ")")
            }
        }
    })

    
        if(window.location.pathname === "/dashboard/temas/novo-tema" || window.location.pathname.indexOf("/dashboard/temas/editar-tema/") !== -1 ){

            setInterval(function(){ 
                var filer = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-header',
                    queueID: 'bg-header-preview',
                    dropzoneID: 'bg-header-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
                if (filer != undefined){
                    filer.select(function (file, file_number) {
                        setTimeout(function () {
                            var pathImg = $('#bg-header-preview img').attr('src');
                            image2base64(pathImg) // you can also to use url
                            .then(
                                (response) => {
                                    if($("#mobile-view").hasClass("active")){
                                        $("input[name='background_header_image_mobile']").val("");
                                        $("input[name='background_header_image_mobile']").val(response);   
                                        console.log(  $("input[name='background_header_image_mobile']").val()) 
                                    }else{
                                        console.log(false)
                                        $("input[name='background_header_image']").val("");
                                        $("input[name='background_header_image']").val(response);
                                        console.log($("input[name='background_header_image']").val())
                                    }
                                    editElement.backgroundImage = "url(" + pathImg + ")";
                                }
                            )
                        }, 300);
                    })
                    .remove(function (file, file_number) {
                        editElement.backgroundImage = "";
                    })
                    .success(function (response, file_number, file) {
                        //
                    })
                    .error(function (event, file, file_number) {
                        //
                    })
                    .dragEnter(function (event) {
                        $(event.target).addClass('over');
                    })
                    .dragLeave(function (event) {
                        $(event.target).removeClass('over');
                    })
                    .dragEnd(function (event) {
                        $(event.target).removeClass('over');
                    });
                }
                
                var filerAbout = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-about',
                    queueID: 'bg-about-preview',
                    dropzoneID: 'bg-about-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
        
            if(filerAbout != undefined){
                filerAbout.select(function (file, file_number) {
                    setTimeout(function () {
                        var pathImg = $('#bg-about-preview img').attr('src');
                        editElement.backgroundImage = "url(" + pathImg + ")";
                        image2base64(pathImg) // you can also to use url
                        .then(
                            (response) => {
                                if($("#mobile-view").hasClass("active")){
                                    $("input[name='background_about_image_mobile']").val("");
                                    $("input[name='background_about_image_mobile']").val(response);   
                                    console.log(  $("input[name='background_about_image_mobile']").val()) 
                                }else{
                                    console.log(false)
                                    $("input[name='background_about_image']").val("");
                                    $("input[name='background_about_image']").val(response);
                                    console.log($("input[name='background_about_image']").val())
                                }
                                editElement.backgroundImage = "url(" + pathImg + ")";
                                console.log($("input[name='background_about_image']").val())
                            }
                        )
                    }, 300);
                })
                .remove(function (file, file_number) {
                    editElement.backgroundImage = "";
                })
                .success(function (response, file_number, file) {
                    //
                })
                .error(function (event, file, file_number) {
                    //
                })
                .dragEnter(function (event) {
                    $(event.target).addClass('over');
                })
                .dragLeave(function (event) {
                    $(event.target).removeClass('over');
                })
                .dragEnd(function (event) {
                    $(event.target).removeClass('over');
                });
            }
                
        
           var filerAddress = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-address',
                    queueID: 'bg-address-preview',
                    dropzoneID: 'bg-address-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
    
                if(filerAddress != undefined){
                    filerAddress.select(function (file, file_number) {
                        setTimeout(function () {
                            var pathImg = $('#bg-address-preview img').attr('src');
                            editElement.backgroundImage = "url(" + pathImg + ")";
                            image2base64(pathImg) // you can also to use url
                            .then(
                                (response) => {
                                    if($("#mobile-view").hasClass("active")){
                                        $("input[name='background_address_image_mobile']").val("");
                                        $("input[name='background_address_image_mobile']").val(response);   
                                        console.log(  $("input[name='background_address_image_mobile']").val()) 
                                    }else{
                                        console.log(false)
                                         $("input[name='background_address_image']").val("");
                                         $("input[name='background_address_image']").val(response);
                                        console.log( $("input[name='background_address_image']").val())
                                    }
                                    editElement.backgroundImage = "url(" + pathImg + ")";
                                }
                            )
                        }, 300);
                    })
                    .remove(function (file, file_number) {
                        editElement.backgroundImage = "";
                    })
                    .success(function (response, file_number, file) {
                        //
                    })
                    .error(function (event, file, file_number) {
                        //
                    })
                    .dragEnter(function (event) {
                        $(event.target).addClass('over');
                    })
                    .dragLeave(function (event) {
                        $(event.target).removeClass('over');
                    })
                    .dragEnd(function (event) {
                        $(event.target).removeClass('over');
                    });
                }
        
           var filerAlbum = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-album',
                    queueID: 'bg-album-preview',
                    dropzoneID: 'bg-album-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
                if(filerAlbum != undefined){
                    filerAlbum.select(function (file, file_number) {
                        setTimeout(function () {
                            var pathImg = $('#bg-album-preview img').attr('src');
                            editElement.backgroundImage = "url(" + pathImg + ")";
                            image2base64(pathImg) // you can also to use url
                            .then(
                                (response) => {
                                    if($("#mobile-view").hasClass("active")){
                                       $("input[name='background_album_image_mobile']").val("");
                                       $("input[name='background_album_image_mobile']").val(response);   
                                        console.log( $("input[name='background_album_image_mobile']").val()) 
                                    }else{
                                        console.log(false)
                                         $("input[name='background_album_image']").val("");
                                         $("input[name='background_album_image']").val(response);
                                        console.log( $("input[name='background_album_image']").val())
                                    }
                                    editElement.backgroundImage = "url(" + pathImg + ")";
                                }
                            )
                        }, 300);
                    })
                    .remove(function (file, file_number) {
                        editElement.backgroundImage = "";
                    })
                    .success(function (response, file_number, file) {
                        //
                    })
                    .error(function (event, file, file_number) {
                        //
                    })
                    .dragEnter(function (event) {
                        $(event.target).addClass('over');
                    })
                    .dragLeave(function (event) {
                        $(event.target).removeClass('over');
                    })
                    .dragEnd(function (event) {
                        $(event.target).removeClass('over');
                    });
                }
                
        
            var filerCountdown = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-countdown',
                    queueID: 'bg-countdown-preview',
                    dropzoneID: 'bg-countdown-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
                if(filerCountdown != undefined){
                    filerCountdown.select(function (file, file_number) {
                        setTimeout(function () {
                            var pathImg = $('#bg-countdown-preview img').attr('src');
                            editElement.backgroundImage = "url(" + pathImg + ")";
                            image2base64(pathImg) // you can also to use url
                            .then(
                                (response) => {
                                    if($("#mobile-view").hasClass("active")){
                                        $("input[name='background_footer_image_mobile']").val("");
                                        $("input[name='background_footer_image_mobile']").val(response);   
                                         console.log( $("input[name='background_footer_image_mobile']").val()) 
                                     }else{
                                         console.log(false)
                                           $("input[name='background_footer_image']").val("");
                                           $("input[name='background_footer_image']").val(response);
                                         console.log(  $("input[name='background_footer_image']").val())
                                     }
                                    editElement.backgroundImage = "url(" + pathImg + ")";
                                }
                            )
                        }, 300);
                    })
                    .remove(function (file, file_number) {
                        editElement.backgroundImage = "";
                    })
                    .success(function (response, file_number, file) {
                        //
                    })
                    .error(function (event, file, file_number) {
                        //
                    })
                    .dragEnter(function (event) {
                        $(event.target).addClass('over');
                    })
                    .dragLeave(function (event) {
                        $(event.target).removeClass('over');
                    })
                    .dragEnd(function (event) {
                        $(event.target).removeClass('over');
                    });
                }
            
               var filerCasamentoWelcome = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-casamento-welcome',
                    queueID: 'bg-casamento-welcome-preview',
                    dropzoneID: 'bg-casamento-welcome-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
                if(filerCasamentoWelcome != undefined){
                    filerCasamentoWelcome.select(function (file, file_number) {
                        setTimeout(function () {
                            var pathImg = $('#bg-casamento-welcome-preview img').attr('src');
                            editElement.backgroundImage = "url(" + pathImg + ")";
                            image2base64(pathImg) // you can also to use url
                            .then(
                                (response) => {
                                    if($("#mobile-view").hasClass("active")){
                                         $("input[name='background_casamento_welcome_imagem_mobile']").val("");
                                         $("input[name='background_casamento_welcome_imagem_mobile']").val(response);   
                                         console.log(  $("input[name='background_casamento_welcome_imagem_mobile']").val()) 
                                     }else{
                                         console.log(false)
                                           $("input[name='background_casamento_welcome_imagem']").val("");
                                           $("input[name='background_casamento_welcome_imagem']").val(response);
                                         console.log(  $("input[name='background_casamento_welcome_imagem']").val())
                                     }
                                    editElement.backgroundImage = "url(" + pathImg + ")";
                                }
                            )
                        }, 300);
                    })
                    .remove(function (file, file_number) {
                        editElement.backgroundImage = "";
                    })
                    .success(function (response, file_number, file) {
                        //
                    })
                    .error(function (event, file, file_number) {
                        //
                    })
                    .dragEnter(function (event) {
                        $(event.target).addClass('over');
                    })
                    .dragLeave(function (event) {
                        $(event.target).removeClass('over');
                    })
                    .dragEnd(function (event) {
                        $(event.target).removeClass('over');
                    });
                }
                
    
               var filerCasamentoAbout = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-casamento-about',
                    queueID: 'bg-casamento-about-preview',
                    dropzoneID: 'bg-casamento-about-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
                if(filerCasamentoAbout != undefined){
                    filerCasamentoAbout.select(function (file, file_number) {
                        setTimeout(function () {
                            var pathImg = $('#bg-casamento-about-preview img').attr('src');
                            editElement.backgroundImage = "url(" + pathImg + ")";
                            image2base64(pathImg) // you can also to use url
                            .then(
                                (response) => {
                                    if($("#mobile-view").hasClass("active")){
                                        $("input[name='background_casamento_about_image_mobile']").val("");
                                        $("input[name='background_casamento_about_image_mobile']").val(response);   
                                        console.log(  $("input[name='background_casamento_about_image_mobile']").val()) 
                                    }else{
                                        console.log(false)
                                          $("input[name='background_casamento_about_image']").val("");
                                          $("input[name='background_casamento_about_image']").val(response);
                                        console.log(  $("input[name='background_casamento_about_image']").val())
                                    }
                                    editElement.backgroundImage = "url(" + pathImg + ")";
                                }
                            )
                        }, 300);
                    })
                    .remove(function (file, file_number) {
                        editElement.backgroundImage = "";
                    })
                    .success(function (response, file_number, file) {
                        //
                    })
                    .error(function (event, file, file_number) {
                        //
                    })
                    .dragEnter(function (event) {
                        $(event.target).addClass('over');
                    })
                    .dragLeave(function (event) {
                        $(event.target).removeClass('over');
                    })
                    .dragEnd(function (event) {
                        $(event.target).removeClass('over');
                    });
                }
                
                
               var filerCasamentoPadrinhos = $.fileup({
                    url: '/file/upload',
                    inputID: 'bg-casamento-padrinhos',
                    queueID: 'bg-casamento-padrinhos-preview',
                    dropzoneID: 'bg-casamento-padrinhos-dropzone',
                    lang: 'ptbr',
                    autostart: true,
                    files: {},
                    filesLimit: 1
                })
                if(filerCasamentoPadrinhos != undefined){
                    filerCasamentoPadrinhos.select(function (file, file_number) {
                        setTimeout(function () {
                            var pathImg = $('#bg-casamento-padrinhos-preview img').attr('src');
                            editElement.backgroundImage = "url(" + pathImg + ")";
                            image2base64(pathImg) // you can also to use url
                            .then(
                                (response) => {
                                    if($("#mobile-view").hasClass("active")){
                                       $("input[name='background_casamento_padrinhos_image_mobile']").val("");
                                       $("input[name='background_casamento_padrinhos_image_mobile']").val(response);   
                                        console.log( $("input[name='background_casamento_padrinhos_image_mobile']").val()) 
                                    }else{
                                        console.log(false)
                                         $("input[name='background_casamento_padrinhos_image']").val("");
                                         $("input[name='background_casamento_padrinhos_image']").val(response);
                                        console.log( $("input[name='background_casamento_padrinhos_image']").val())
                                    }
                                    editElement.backgroundImage = "url(" + pathImg + ")";
                                }
                            )
                        }, 300);
                    })
                    .remove(function (file, file_number) {
                        editElement.backgroundImage = "";
                    })
                    .success(function (response, file_number, file) {
                        //
                    })
                    .error(function (event, file, file_number) {
                        //
                    })
                    .dragEnter(function (event) {
                        $(event.target).addClass('over');
                    })
                    .dragLeave(function (event) {
                        $(event.target).removeClass('over');
                    })
                    .dragEnd(function (event) {
                        $(event.target).removeClass('over');
                    });
                }
            }, 500);

                

        }

// });
