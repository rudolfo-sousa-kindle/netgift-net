import $ from 'jquery';
import  setTooltipster, { setValidate, setMessages, setMask } from './plugins';

$(document).ready(function ($) {
    var width = $(document).width();
    var checkPoint = "etapa-1";
    var camposUsers = 1;

    setMessages();
    setMask();
    setValidate();

    function scrollToElement(element, parent) {
        $(parent)[0].scrollIntoView(true);
        $(parent).animate({
            scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top
        }, {
            duration: 250,
            easing: 'swing'
        });
    }

    /* masks */
    $('#hora-festa').mask('00:00', {
        reverse: false
    });
    
    $('.nome:not(#nome-festa):not(#endereco-festa)').mask('Z', {
        translation: {
            'Z': {
                pattern: /[A-zÀ-ú' ]/,
                recursive: true
            }
        }
    });

    $("body.page-criar-festa button.comecar-festa").click(function (e) {
        e.preventDefault();
        
        if ($("#criar-festa").valid()) {
            $("#personalizada").removeAttr('checked');
            switch (checkPoint) {
                case "etapa-1":
                    checkPoint = "etapa-2";
                    break;
                case "etapa-2":
                    checkPoint = "etapa-3";
                    break;
                case "etapa-3":
                    checkPoint = "etapa-4";
                    break;
                case "etapa-4":
                    checkPoint = "etapa-5";
                    break;
            }
            
            progress();
        }
    });

    $(".personalizada").click(function(e) {
        e.preventDefault();

        if ($("#criar-festa").valid()) {
            
            $("input[name='tipo_festa']").removeAttr('checked');
            $('#personalizada').attr('checked', 'checked');

            switch (checkPoint) {
                case "etapa-1":
                    checkPoint = "etapa-2";
                    break;
                case "etapa-2":
                    checkPoint = "etapa-3";
                    break;
                case "etapa-3":
                    checkPoint = "etapa-4";
                    break;
                case "etapa-4":
                    checkPoint = "etapa-5";
                    break;
            }

            progress();
        }
    })


    if ($(".config-accordion").length > 0) {
        $(".config-item").click(function (e) {
            $(this).toggleClass("active");
            if (!$(e.target).closest('.config-item-content').length && !$(e.target).closest('label.switch').length) {
                $(this).toggleClass("active");
                $(this).find(".config-item-content").stop().slideDown();

                if (!$(this).hasClass("active")) {
                    $(this).find(".config-item-content").stop().slideUp();
                }
            }
        });
    }

    // gerar campos
    $(".adicionar-campo.add").click(function () {
        camposUsers++;
        
        if( $("input[name='tipo_festa']:checked").attr("id") ===  'adulto' ||  $("input[name='tipo_festa']:checked").attr("id") ===  'teen' ||  $("input[name='tipo_festa']:checked").attr("id") ===  'personalizada' ) {

            var novoCampo = '<div class="linha linha-' + camposUsers + '"> <div class="section-inputs"> <div class="campo campo-nome"> <label for="nome-' + camposUsers + '">Nome</label> <input type="text" id="nome-' + camposUsers + '" class="nome" placeholder="Nome completo" name="nome_' + camposUsers + '" required/> </div><div class="campo campo-email"> <label for="email-' + camposUsers + '">Email</label> <input type="email" id="email-' + camposUsers + '" class="email" placeholder="" name="email_' + camposUsers + '" required/> </div></div><div class="section-inputs"> <div class="campo campo-nascimento"> <label for="nascimento-' + camposUsers + '">Nascimento</label> <input type="text" id="nascimento-' + camposUsers + '" class="nascimento" placeholder="00/00/0000" name="nascimento_' + camposUsers + '" required/> </div><div class="campo campo-sexo"> <label for="sexo-' + camposUsers + '">Sexo</label> <select id="sexo-' + camposUsers + '" class="sexo" name="sexo_' + camposUsers + '" required> <option value="" hidden>Selecione</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option> </select> </div></div></div>';
            
        } else if( $("input[name='tipo_festa']:checked").attr("id") ===  'casamento'  ) {

            novoCampo = '<div class="linha linha-' + camposUsers + '"> <div class="section-inputs"> <div class="campo campo-nome"> <label for="nome-' + camposUsers + '">Nome do(a) noivo(a)</label> <input type="text" id="nome-' + camposUsers + '" class="nome" placeholder="Nome completo" name="nome_' + camposUsers + '" required/> </div><div class="campo campo-email"> <label for="email-' + camposUsers + '">Email</label> <input type="email" id="email-' + camposUsers + '" class="email" placeholder="" name="email_' + camposUsers + '" required/> </div></div><div class="section-inputs"> <div class="campo campo-nascimento"> <label for="nascimento-' + camposUsers + '">Nascimento</label> <input type="text" id="nascimento-' + camposUsers + '" class="nascimento" placeholder="00/00/0000" name="nascimento_' + camposUsers + '" required/> </div><div class="campo campo-sexo"> <label for="sexo-' + camposUsers + '">Sexo</label> <select id="sexo-' + camposUsers + '" class="sexo" name="sexo_' + camposUsers + '" required> <option value="" hidden>Selecione</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option> </select> </div></div></div>';
            
        } else if( $("input[name='tipo_festa']:checked").attr("id") ===  'pet' ) {

            novoCampo = '<div class="linha linha-' + camposUsers + '"><div class="campo campo-nome"><label for="nome-' + camposUsers + '">Nome</label><input required type="text" id="nome-' + camposUsers + '" name="nome_' + camposUsers + '" class="nome" placeholder="Nome completo"></div><div class="campo campo-nascimento"><label for="nascimento-' + camposUsers + '">Nascimento</label><input required type="text" id="nascimento-' + camposUsers + '" name="nascimento_' + camposUsers + '" class="nascimento" placeholder="00/00/0000"></div>';

        } else {

            novoCampo = '<div class="linha linha-' + camposUsers + '"><div class="campo campo-nome"><label for="nome-' + camposUsers + '">Nome</label><input required type="text" id="nome-' + camposUsers + '" name="nome_' + camposUsers + '" class="nome" placeholder="Nome completo"></div><div class="campo campo-nascimento"><label for="nascimento-' + camposUsers + '">Nascimento</label><input required type="text" id="nascimento-' + camposUsers + '" name="nascimento_' + camposUsers + '" class="nascimento" placeholder="00/00/0000"></div><div class="campo campo-sexo"><label for="sexo-' + camposUsers + '">Sexo</label><select required id="sexo-' + camposUsers + '" name="sexo_' + camposUsers + '" class="sexo"><option value="" hidden>Selecione</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div></div>';
        }
        

        $(".etapa-2 .campos").append(novoCampo);

        scrollToElement($(".etapa-2 .campos .linha-" + camposUsers), $(".etapa-2 .campos"));

        $(".etapa-2 .adicionar-campo").css("top", parseInt($(".etapa-2 .adicionar-campo").css("top")) + $(".etapa-2 .campos .linha-" + camposUsers).height() + 25);

        if( $("input[name='tipo_festa']:checked").attr("id") ===  'casamento' ) {
            $(".etapa-2 .adicionar-campo").css("top", parseInt($(".etapa-2 .adicionar-campo").css("top")) + $(".etapa-2 .campos .linha-" + camposUsers).height() + 35);
        }

        $(".adicionar-campo.trash").show();

    });

    $(document).on('change', '.linha .label-checkbox', function() {
        var storageUser = localStorage.getItem('user');
        if($(this).prop('checked')) {
            $(this).parents('.linha-1').find('input[type="email"]').val(JSON.parse(storageUser).email);
        } else {
            $(this).parents('.linha-1').find('input[type="email"]').val('');
        }
        
    });

    $(".adicionar-campo.trash").click(function() {
        var arr = Array.from($('.etapa-2 .campos .linha'));
        
        $(arr[arr.length - 1]).remove();

        $(".etapa-2 .adicionar-campo").css("top", parseInt($(".etapa-2 .adicionar-campo").css("top")) - ($('.etapa-2 .campos .linha').height() + 25) );

        if( $("input[name='tipo_festa']:checked").attr("id") ===  'casamento' ) {
            $(".etapa-2 .adicionar-campo").css("top", parseInt($(".etapa-2 .adicionar-campo").css("top")) - ($('.etapa-2 .campos .linha').height() ) );
        }

        if(arr.length <= 2) {
            $(this).hide();
        }
        
        if( $('.etapa-2').hasClass('casamento') && arr.length <= 3 ) {
            $(this).hide();
        }
    })

    $(".dados-crumb div").click(function () {
        checkPoint = "etapa-" + $(this).attr("class").slice(-1);
        
        progress();
    });

    // $(".dados-crumb .dados-1").click(function() {
    //     $('#criar-festa input[type="text"]').each(function(index, item) {
    //         $(item).val('');
    //     })
    // })

    function progress() {
        if ($(window).width() < 999) {
            setTimeout(function () {
                $(".dados-crumb").scrollLeft(1000);
            }, 500);
        }

        $('.tooltipstered').tooltipster("close");
        $(".progress-icon").removeClass("active");
        $(".progress-icon." + checkPoint).addClass("active");
        $("#progress-bar").removeClass().addClass(checkPoint);

        $("main .etapa.active").removeClass("active").fadeOut(250, function () {
            $("main ." + checkPoint).fadeIn(250).addClass("active");

            switch (checkPoint) {
                case "etapa-1":
                    $('.header > .title').html('Escolha o tipo de festa');
                    $('.header > .subtitle').html('Ou crie uma festa personalizada');

                    break;
                case "etapa-2":
                    $(".dados-1").css('display', 'inline-block').hide().fadeIn(50).html($("input[name='tipo_festa']:checked").val());
                    $('.header > .subtitle').html('');

                    if( $("input[name='tipo_festa']:checked").attr("id") === 'infantil' || $("input[name='tipo_festa']:checked").attr("id") === 'adulto'  || $("input[name='tipo_festa']:checked").attr("id") === 'teen' || $("input[name='tipo_festa']:checked").attr("id") === 'personalizada' ) {
                        $('.header > .title').html('Quem está comemorando?');
                    }

                    if( $("input[name='tipo_festa']:checked").attr("id") ===  'cha-bebe' ) {
                        $('.header > .title').html('Nos conte um pouco sobre o bebê');
                    }

                    if( $("input[name='tipo_festa']:checked").attr("id") ===  'pet' ) {
                        $('.header > .title').html('Cadastre o seu amigo(a) pet');
                    }

                    if( $("input[name='tipo_festa']:checked").attr("id") ===  'adulto' ||  $("input[name='tipo_festa']:checked").attr("id") ===  'teen' ||  $("input[name='tipo_festa']:checked").attr("id") ===  'personalizada' ) {

                        var novoCampo = '<div class="linha linha-' + camposUsers + '"> <div class="section-inputs"> <div class="campo campo-nome"> <label for="nome-' + camposUsers + '">Nome</label> <input type="text" id="nome-' + camposUsers + '" class="nome" placeholder="Nome completo" name="nome_' + camposUsers + '" required/> </div><div class="campo campo-email"> <label for="email-' + camposUsers + '">Email</label> <input type="email" id="email-' + camposUsers + '" class="email" placeholder="" name="email_' + camposUsers + '" required/> <div class="checkbox"> <input type="checkbox" name="checkbox-' + camposUsers + '" id="checkbox-' + camposUsers + '" class="label-checkbox inp-cbx" style="display: none;"/> <label for="checkbox-' + camposUsers + '" class="label-checkbox cbx"> <span class="checkbox-span"> <svg width="12px" height="10px" viewbox="0 0 12 10"> <polyline points="1.5 6 4.5 9 10.5 1"></polyline> </svg> </span> <span class="label-none">mesmo email de cadastro</span> </label> </div> </div></div><div class="section-inputs"> <div class="campo campo-nascimento"> <label for="nascimento-' + camposUsers + '">Nascimento</label> <input type="text" id="nascimento-' + camposUsers + '" class="nascimento" placeholder="00/00/0000" name="nascimento_' + camposUsers + '" required/> </div><div class="campo campo-sexo"> <label for="sexo-' + camposUsers + '">Sexo</label> <select id="sexo-' + camposUsers + '" class="sexo" name="sexo_' + camposUsers + '" required> <option value="" hidden>Selecione</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option> </select> </div></div></div>';

                    } else if ( $("input[name='tipo_festa']:checked").attr("id") ===  'casamento' ) {

                        var novoCampo = '<div class="linha linha-' + camposUsers + '"> <div class="section-inputs"> <div class="campo campo-nome"> <label for="nome-' + camposUsers + '">Nome do(a) noivo(a)</label> <input type="text" id="nome-' + camposUsers + '" class="nome" placeholder="Nome completo" name="nome_' + camposUsers + '" required/> </div><div class="campo campo-email"> <label for="email-' + camposUsers + '">Email</label> <input type="email" id="email-' + camposUsers + '" class="email" placeholder="" name="email_' + camposUsers + '" required/> <div class="checkbox"> <input type="checkbox" name="checkbox-' + camposUsers + '" id="checkbox-' + camposUsers + '" class="label-checkbox inp-cbx" style="display: none;"/> <label for="checkbox-' + camposUsers + '" class="label-checkbox cbx"> <span class="checkbox-span"> <svg width="12px" height="10px" viewbox="0 0 12 10"> <polyline points="1.5 6 4.5 9 10.5 1"></polyline> </svg> </span> <span class="label-none">mesmo email de cadastro</span> </label> </div> </div></div><div class="section-inputs"> <div class="campo campo-nascimento"> <label for="nascimento-' + camposUsers + '">Nascimento</label> <input type="text" id="nascimento-' + camposUsers + '" class="nascimento" placeholder="00/00/0000" name="nascimento_' + camposUsers + '" required/> </div><div class="campo campo-sexo"> <label for="sexo-' + camposUsers + '">Sexo</label> <select id="sexo-' + camposUsers + '" class="sexo" name="sexo_' + camposUsers + '" required> <option value="" hidden>Selecione</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option> </select> </div></div></div>';

                    } else if( $("input[name='tipo_festa']:checked").attr("id") ===  'pet' ) {

                        if(width <= 650) {
                            $(".etapa-2 .adicionar-campo").css("top", "29px");
                        }
                        
                        novoCampo = '<div class="linha linha-' + camposUsers + '"><div class="campo campo-nome"><label for="nome-' + camposUsers + '">Nome</label><input required type="text" id="nome-' + camposUsers + '" name="nome_' + camposUsers + '" class="nome" placeholder="Nome completo"></div><div class="campo campo-nascimento"><label for="nascimento-' + camposUsers + '">Nascimento</label><input required type="text" id="nascimento-' + camposUsers + '" name="nascimento_' + camposUsers + '" class="nascimento" placeholder="00/00/0000"></div>';  

                    } else {

                        if(width <= 650) {
                            $(".etapa-2 .adicionar-campo").css("top", "29px");
                        }
                        
                        novoCampo = '<div class="linha linha-' + camposUsers + '"><div class="campo campo-nome"><label for="nome-' + camposUsers + '">Nome</label><input required type="text" id="nome-' + camposUsers + '" name="nome_' + camposUsers + '" class="nome" placeholder="Nome completo"></div><div class="campo campo-nascimento"><label for="nascimento-' + camposUsers + '">Nascimento</label><input required type="text" id="nascimento-' + camposUsers + '" name="nascimento_' + camposUsers + '" class="nascimento" placeholder="00/00/0000"></div><div class="campo campo-sexo"><label for="sexo-' + camposUsers + '">Sexo</label><select required id="sexo-' + camposUsers + '" name="sexo_' + camposUsers + '" class="sexo"><option value="" hidden>Selecione</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div></div>';
                    }

                    $(".etapa-2 .inputs-area").html(novoCampo);

                    if( $("input[name='tipo_festa']:checked").attr("id") ===  'adulto' ||  $("input[name='tipo_festa']:checked").attr("id") ===  'teen' ) {
                        $(".etapa-2 .adicionar-campo").css("top", "112px");

                        if(width <= 650) {
                            $(".etapa-2 .adicionar-campo").css("top", "252px");
                        }

                    } else if( $("input[name='tipo_festa']:checked").attr("id") ===  'casamento' ) {
                        $('.header > .title').html('Cadastre os noivos');


                        $(".etapa-2 .adicionar-campo").css("top", "290px");

                        if(width <= 650) {
                            $(".etapa-2 .adicionar-campo").css("top", "578px");
                        }

                        var arr = Array.from($('.etapa-2 .campos .linha'));
                        if(arr.length <= 1) {
                            camposUsers++;
                            novoCampo = '<div class="linha linha-' + camposUsers + '"> <div class="section-inputs"> <div class="campo campo-nome"> <label for="nome-' + camposUsers + '">Nome do(a) noivo(a)</label> <input type="text" id="nome-' + camposUsers + '" class="nome" placeholder="Nome completo" name="nome_' + camposUsers + '" required/> </div><div class="campo campo-email"> <label for="email-' + camposUsers + '">Email</label> <input type="email" id="email-' + camposUsers + '" class="email" placeholder="" name="email_' + camposUsers + '" required/> <div class="checkbox"> <input type="checkbox" name="checkbox-' + camposUsers + '" id="checkbox-' + camposUsers + '" class="label-checkbox inp-cbx" style="display: none;"/> <label for="checkbox-' + camposUsers + '" class="label-checkbox cbx"> <span class="checkbox-span"> <svg width="12px" height="10px" viewbox="0 0 12 10"> <polyline points="1.5 6 4.5 9 10.5 1"></polyline> </svg> </span> <span class="label-none">mesmo email de cadastro</span> </label> </div> </div></div><div class="section-inputs"> <div class="campo campo-nascimento"> <label for="nascimento-' + camposUsers + '">Nascimento</label> <input type="text" id="nascimento-' + camposUsers + '" class="nascimento" placeholder="00/00/0000" name="nascimento_' + camposUsers + '" required/> </div><div class="campo campo-sexo"> <label for="sexo-' + camposUsers + '">Sexo</label> <select id="sexo-' + camposUsers + '" class="sexo" name="sexo_' + camposUsers + '" required> <option value="" hidden>Selecione</option> <option value="Masculino">Masculino</option> <option value="Feminino">Feminino</option> </select> </div></div></div>';

                            $(".etapa-2 .inputs-area").append(novoCampo);
                        }
                    } else {
                        var arr = Array.from($('.etapa-2 .campos .linha'));
                        $(".etapa-2 .adicionar-campo").css("top", "30px");
                    }

                    $("#mapa").hide();

                    break;
                case "etapa-3":
                    $(".dados-2").css('display', 'inline-block').hide().fadeIn(50).html($("#nome-1").val());
                    $('.header > .title').html('Registre os dados da festa');
                    $('.header > .subtitle').html('Nos conte um pouco sobre a festa...');
                    $("#mapa").hide();
                    break;
                case "etapa-4":
                    $(".peoples").addClass("move");

                    setTimeout(function () {
                        $("#mapa").show();
                    }, 500);

                    $(".dados-3").css('display', 'inline-block').hide().fadeIn(50).html($("#data-festa").val() + ", " + $("#hora-festa").val());
                    break;
                case "etapa-5":
                    break;
                default: {

                }
            }
        });
    }

    $(document).on('change', '.campo .label-checkbox' ,function() {
        if( $(this)[0].checked ) {
            $(this).parent().parent().find('input[type="email"]').attr('disabled', 'disabled').addClass('disabled');
        } else {
            $(this).parent().parent().find('input[type="email"]').removeAttr('disabled').removeClass('disabled');
        }
    })

    function pesquisaMapa() {
        let embed = '<iframe width="800" height="450" id="gmap_canvas" src="https://maps.google.com/maps?q=' + $("#endereco-festa").val() + '&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
        $("#mapa").show().html(embed);

        $(".loader").show();
    };


    var _changeInterval = null;
    $("#endereco-festa").keyup(function () {
        clearInterval(_changeInterval);
        _changeInterval = setInterval(function () {
            clearInterval(_changeInterval);
            pesquisaMapa();
            $(".loader").hide();
        }, 1000);
    });
});
