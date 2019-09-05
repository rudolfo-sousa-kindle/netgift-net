import jQuery from 'jquery';
import 'jquery-ui';
import datepickerFactory from 'jquery-datepicker';
import DataTable from 'datatables';
//import Modernizr from 'Modernizr';
import SecretNav from './jquery.secretnav';
import {TweenMax, Power1} from "gsap/TweenMax";
import {setMasonry} from "./setMasonry";
import Swiper from "swiper";
import Card from "card";
import fileup from 'fileup';
import tippy from 'tippy.js'
import 'select2';

import './dataTables.pageLoadMore.min.js'

jQuery(document).ready(function ($) {
    datepickerFactory($);

    setTimeout(() => {
        setMasonry();
    }, 500);

    var width = $(window).width();
    var $doc = $('html, body');
    
    $(document).on('click', '.scroll-link', function() {
        $doc.animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });

    //menu-mobile - lista-de-presentes
    if ($('.area-convidado').hasClass('lista-de-presentes') || $('.area-convidado').hasClass('convidado')) {
        
        if (width <= 1110) {
            TweenMax.set($('nav ul'), {
                display: 'none',
            });
        }

        $(document).on('click', '.area-convidado .menu-mobile', function (event) {
            event.stopPropagation();

            $('.menu-icon').toggleClass('active');

            
            if (!$('nav ul').hasClass('active')) {
                TweenMax.set($('nav ul'), {
                    display: 'block',
                })
                $('nav ul').toggleClass('active');
                $('.webdoor nav ul').addClass('active');

                $('body').css('overflowY', 'hidden');

            } else {
                $('.webdoor nav ul').removeClass('active');
                $('body').css('overflowY', 'scroll');
                TweenMax.set($('nav ul'), {
                    delay: .3,
                    display: 'none',
                });

            }
        });

        //corrigindo o menu desktop e adição da borda no botão de confirmar de presença - lista-de-presentes
        if (width > 1160) {
            $('nav ul').css('display', 'flex');
            $('.toggle-modal-confirmar-presenca').removeClass('gradient').removeClass('border').removeClass('fullcolor');
        } else {
            $('.toggle-modal-confirmar-presenca').addClass('gradient').addClass('border').addClass('fullcolor');
        }

        $(window).resize(function () {
            var width = $(this).width();
            if (width > 1160) {
                $('nav ul').css('display', 'flex');
                $('.toggle-modal-confirmar-presenca').removeClass('gradient').removeClass('border').removeClass('fullcolor');
            } else {
                $('nav ul').css('display', 'block');
                $('.toggle-modal-confirmar-presenca').addClass('gradient').addClass('border').addClass('fullcolor');
            }
        })


        $(window).click(function () {
            var width = $(this).width();
            var nav = $('nav ul');
            $('.webdoor nav ul').removeClass('active');
            $('.menu-icon').removeClass('active');
            $('body').css('overflowY', 'scroll');
            if (!nav.hasClass('active') && width <= 1160) {
                TweenMax.set(nav, {
                    delay: .3,
                    display: 'none',
                })
            }
        })

        $('nav ul').click(function (event) {
            event.stopPropagation();
        })
    }


    if ($("#menu-mobile").length > 0) {
        $('#root > div').SecretNav({
            navSelector: '#menu-mobile', // selector of the nav tag
            openSelector: '.open-menu', // selector of the menu's opener
            position: 'left' // left | top
        });
    }

    $(document).on('click', '.menu-button', function () {
        $('.menu-itens-mob').toggleClass('active');
        $('.sobre header.wave, .galeria-de-templates header.wave, .buscar-festa header.wave').toggleClass('no-mask');
        $('.menu-icon').toggleClass('menu-icon-purple');
        $('body').toggleClass('no-scroll');
    });

    $(document).on('click', '#filter', function () {
        $(this).toggleClass('active');
        $('#form-filters-mob').slideToggle();
    });


    if ($(".modal.confirmar-presenca").length > 0) {
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.modal-content').length) {
                $('.modal.confirmar-presenca').removeClass("active");

                if( $('div').hasClass('tooltipster-base') ) {
                    $('.tooltipstered').tooltipster('close');
                }
            }
        });

        $(document).on('click', '[data-modal="confirmar-presenca"]', function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(".modal.confirmar-presenca").toggleClass("active");
        });
    }


    if ($(".fileup-btn").length > 0) {
        //https://shabuninil.github.io/fileup/
        $.fileup({
            url: 'https://github.com?file_upload=1',
            inputID: 'upload-cabecalho',
            queueID: 'upload-cabecalho-preview',
            autostart: true,
            filesLimit: 3,
            lang: 'ptbr',
            onSelect: function (file) {
                $(this).parents(".config-item").css("height", "auto");
            },
            onRemove: function (file, total) {
                $(this).parents(".config-item").css("height", "auto");
            },
            onSuccess: function (response, file_number, file) {
                //                alert("Enviado com sucesso");
            },
            onError: function (event, file, file_number) {
                //                alert("Erro ao enviar");
            }
        });

        $.fileup({
            url: 'https://github.com?file_upload=1',
            inputID: 'upload-saudacao',
            queueID: 'upload-saudacao-preview',
            autostart: true,
            filesLimit: 1,
            lang: 'ptbr',
            onSelect: function (file) {
                $(this).parents(".config-item").css("height", "auto");
            },
            onRemove: function (file, total) {
                $(this).parents(".config-item").css("height", "auto");
            },
            onSuccess: function (response, file_number, file) {
                //                alert("Enviado com sucesso");
            },
            onError: function (event, file, file_number) {
                //                alert("Erro ao enviar");
            }
        });

        $.fileup({
            url: 'https://github.com?file_upload=1',
            inputID: 'upload-fotos',
            queueID: 'upload-fotos-preview',
            autostart: true,
            filesLimit: 6,
            lang: 'ptbr',
            onSelect: function (file) {
                $(this).parents(".config-item").css("height", "auto");
            },
            onRemove: function (file, total) {
                $(this).parents(".config-item").css("height", "auto");
            },
            onSuccess: function (response, file_number, file) {
                //                alert("Enviado com sucesso");
            },
            onError: function (event, file, file_number) {
                //                alert("Erro ao enviar");
            }
        });

        $.fileup({
            inputID: 'upload-rsvp',
            queueID: 'upload-rsvp-preview',
            autostart: true,
            filesLimit: 1,
            lang: 'ptbr',
            onSelect: function (file) {
                $('.config-item-content.cabecalho').css("height", "auto");
                setTimeout(function(){
                    var pathImg = $('.fileup-preview img').attr('src');
                    $('#img-rsvp').fadeIn().attr('src', pathImg);
                }, 1000)
            },
            onRemove: function (file, total) {
                $(this).parents(".config-item-content").css("height", "auto");
            }
        });

        $(document).on('click', '.cabecalho .fileup-remove', function() {
            $(this).parents('.cabecalho').find('.fileup-file').remove();
            $('#img-rsvp').fadeOut().attr('src', '');
        })

        $.fileup({
            inputID: 'upload-photo',
            queueID: 'upload-photo-preview',
            autostart: true,
            filesLimit: 1,
            lang: 'ptbr',
            onSelect: function () {
                $('.novo-usuario .buttons .excluir').removeClass('disabled');
            }
        });

        $.fileup({
            inputID: 'upload-edit-photo',
            queueID: 'upload-edit-photo-preview',
            autostart: true,
            filesLimit: 1,
            lang: 'ptbr',
            onSelect: function () {
                $('.edit-photo .buttons .excluir').removeClass('disabled');
            }
        });

        $('.editar-perfil .buttons .excluir').click(function() {
            $(this).parents('.edit-photo').find('.fileup-file').remove();
            $(this).addClass('disabled');
        })
    }

    //ACCORDION SITE DO ANIVERSARIO
    if ($(".config-accordion").length > 0) {
        $(document).on('click', '.config-item .config-item-title', function (e) {
            $(this).parent().toggleClass("active");
            $(this).parent().find(".config-item-content").stop().slideDown();
            
            if (!$(this).parent().hasClass("active")) {
                $(this).parent().find(".config-item-content").stop().slideUp();
            }
        });

        $(document).on('change', '.config-item [type="checkbox"]', function() {
            if ( $(this).prop('checked') ) {
                $(this).parents('.config-item').find('.config-item-content').stop().slideDown();
            } else {
                $(this).parents('.config-item').find('.config-item-content').stop().slideUp();
                $(this).parents('.config-item').find('input').removeAttr('value');
                $(this).parents('.config-item').find('textarea').val('');
            }
        });

        $('.config-accordion .fullcolor').click(function() {
            $(this).find('.nb-spinner').show();

            setTimeout(() => {
                $(this).find('.nb-spinner').hide();
            }, 1000);
        })
    }

    $(".fullcolor.gradient.fileup-btn").click(function () {
        $(this).parents(".config-item").css("height", "auto");
    });

    if ($("header.roxo").length > 0) {

        $(document).on("click", ".user-info", function () {
            $(this).toggleClass("active");
        });

        $(document).on("click", ".user-infos", function (e) {
            e.stopPropagation();
        });

        $(document).on("click", ".notification", function () {
            $(this).toggleClass("active");
        });

        $(document).on("click", ".notifications", function (e) {
            e.stopPropagation();
        });

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.user-info').length) {
                $('.user-info').removeClass("active");
            }

            if (!$(event.target).closest('.notification').length) {
                $('.notification').removeClass("active");
            }

        });

    }

    //MENU DE CONTEXTO DOTS CARD
    //    if ($(".dashboard-home").length > 0) {

    //    $(".dots").click(function (e) {
    //        var p = $(this).parents(".card-convidados");
    //
    //        var a = p.hasClass("active");
    //        $(".card-convidados").removeClass("active");
    //
    //        if (a != true) {
    //            p.addClass("active");
    //        }
    //
    //    });
    //
    //    $(document).on('click', function (event) {
    //        if (!$(event.target).closest('.dots').length) {
    //            $('.card-convidados').removeClass("active");
    //        }
    //    });


    $(document).on('click', '.copy-link .gradient', function(e) {
        e.preventDefault();
    })

    $(document).on('click', '.dots', function (e) {
        var a = $(this).hasClass("active");
        $(".dots").removeClass("active");

        if (a != true) {
            $(this).addClass("active");
        }
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.dots').length) {

            $(".dots").removeClass("active");
        }
    });

    $(document).on('click', '.context-menu .item, #edit-1, #edit-2', function(e) {
        e.preventDefault();
    })

    $(document).on('click', '.card-convidados-user .excluir', function() {
        $(this).parents('.card').fadeOut(500);
        setTimeout(() => {
            $(this).parents('.card').remove();
        }, 700);
    });

    $(document).on('click', '.card-user-modal .excluir', function() {
        $(this).parents('.card-user-modal').fadeOut(500);
        setTimeout(() => {
            $(this).parents('.card-user-modal').remove();
        }, 700);
    });


    $(window).scroll(function () {
        $('.phone').each(function () {
            if (isScrolledIntoView($(this))) {
                $(this).addClass('start');
            }
        });
    });

    $(document).on('mouseenter', '.cards-options-template .card-option',function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        if ($(".middle-waves .phone-img").length > 0) {
            $(".middle-waves .phone-img").removeClass().addClass("phone-img");
            $(".middle-waves .phone-img").addClass($(this).data("tipo"));
        }
    });

    function isScrolledIntoView(elem) {
        var $elem = $(elem);
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();
        var elemMiddle = elemTop + $elem.height() / 2;

        return ((elemMiddle <= docViewBottom) && (elemTop >= docViewTop));
    }


    //ABRIR CRIAR FESTA
    $(".swiper-criar-festa .swiper-slide").click(function () {
        $(this).toggleClass("active");
        $(this).siblings().removeClass("active");
    });


    // DATE PICKER


    var dayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    var dayNamesMin = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
    var dayNamesShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    var monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var monthNamesShort = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    // $('.custom-date').datepicker({
    //     dateFormat: 'dd/mm/yy',
    //     dayNames: dayNames,
    //     dayNamesMin: dayNamesMin,
    //     dayNamesShort: dayNamesShort,
    //     monthNames: monthNames,
    //     monthNamesShort: monthNamesShort,
    //     nextText: 'Próximo',
    //     prevText: 'Anterior'
    // });

    var dateFormat = 'dd/mm/yy',
        from = $(".custom-date-from")
        .datepicker({
            dateFormat: 'dd/mm/yy - DD',
            dayNames: dayNames,
            dayNamesMin: dayNamesMin,
            dayNamesShort: dayNamesShort,
            monthNames: monthNames,
            monthNamesShort: monthNamesShort,
            nextText: 'Próximo',
            prevText: 'Anterior'
        })
        .on("change", function () {
            to.datepicker("option", "minDate", getDate(this));
        }),
        to = $(".custom-date-to").datepicker({
            dateFormat: 'dd/mm/yy - DD',
            dayNames: dayNames,
            dayNamesMin: dayNamesMin,
            dayNamesShort: dayNamesShort,
            monthNames: monthNames,
            monthNamesShort: monthNamesShort,
            nextText: 'Próximo',
            prevText: 'Anterior'
        })
        .on("change", function () {
            from.datepicker("option", "maxDate", getDate(this));
        });

    function getDate(element) {
        var day = element.value;
        day = day.substring(0, 10);

        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, day);
        } catch (error) {
            date = null;
        }

        return date;
    }


    //EDITAR INFORMAÇÕES

    if ($(".informacoes").length > 0) {

        $("#edit-1").click(function (e) {
            e.preventDefault();
            $(this).hide();
            $("#save-1").show();

            $(".form-1").find("input[readonly]").removeAttr("readonly");
            $(".form-1").find("select[readonly]").removeAttr("readonly");
        });

        $("#edit-2").click(function (e) {
            e.preventDefault();
            $(this).hide();
            $("#save-2").show();

            $(".form-2").find("input[readonly]").removeAttr("readonly");
            $(".form-2").find("select[readonly]").removeAttr("readonly");
        });

        // $('.informacoes .gradient.fullcolor.bgwhite').click(function(e) {
        //     e.preventDefault();
        // })
    }


    //ABRIR MAPA
    if ($("#mostrar-mapa").length > 0) {
        $("#mostrar-mapa").click(function (e) {
            e.preventDefault();

            var end = $("#endereco-festa").val();

            window.open("https://www.google.com/maps/place/" + end, "_blank");
        });
    }


    //TABELA COM SORT

    if ($(".custom-table").length > 0) {
        var table = $('.custom-table').DataTable({
            dom: 'frt',
            pageLength: 6,
            searching: false,
            order: [
                [0, "desc"]
            ],
            drawCallback: function () {
                $('#btn-load-more').toggle(this.api().page.hasMore());
            }
        });

        $('#btn-load-more').on('click', function () {
            table.page.loadMore();
        });

        var spanSorting = '<span class="sort-icon sort_both">&nbsp;&nbsp;&nbsp;</span>',
            spanAsc = '<span class="sort-icon sort_asc">&nbsp;&nbsp;&nbsp;</span>',
            spanDesc = '<span class="sort-icon sort_desc">&nbsp;&nbsp;&nbsp;</span>';

        $(".custom-table").on('click', 'th', function () {
            $(".custom-table thead th").each(function (i, th) {
                $(th).find('.sort-icon').remove();
                var html = $(th).html(),
                    cls = $(th).attr('class');
                switch (cls) {
                    case 'sorting_asc':
                        $(th).html(html + spanAsc);
                        break;
                    case 'sorting_desc':
                        $(th).html(html + spanDesc);
                        break;
                    default:
                        $(th).html(html + spanSorting);
                        break;
                }
            });
        });

        $(".custom-table th").first().click().click();
    }

    // ADICIONAR PRESENTE A LISTA
    $(document).on('click', '.card-gift .gradient', function () {
        $(this).parents('.card-gift').toggleClass("added");
    });


    var cartItems = [];
    var btnAdded;
    var preco;

    function formatRS(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    $('.icon-close').click(function () {
        $('.modal-carrinho, .confirmar-presenca').removeClass('active');
        $('.tooltipstered').tooltipster('close');
    });

    $(document).on('click', '.card-gift .add-cart', function (event) {
        event.stopPropagation();
        preco = parseFloat($(this).data("price"));

        if ($(this).hasClass("added")) {
            var index = cartItems.indexOf(preco);
            if (index > -1) {
                cartItems.splice(index, 1);
            }

            $(this).removeClass("added");

            atualizaStatusCart();
        } else {
            var width = $(window).width();

            if (width > 1140) {
                cartItems.push(preco);
                $(this).addClass("added");
                atualizaStatusCart(preco);
            } else {
                
                btnAdded = $(this);
                $('.modal-carrinho').toggleClass('active');

                $(document).on('click', function (event) {
                    if (!$(event.target).closest('.modal-content-carrinho').length) {
                        $('.modal-carrinho').removeClass('active');
                    }
                });
            }
        }
    });

    function atualizaStatusCart() {

        if (cartItems.length === 0) {
            $("#status-cart").addClass("disabled");

            $(".price-gift-cart").html("");
            $(".number-gift-cart").html("Nenhum presente");

            TweenMax.to('.carrinho-mobile', .2, {
                y: '85px'
            });
        }

        if (cartItems.length === 1) {
            $("#status-cart").removeClass("disabled");
            $(".price-gift-cart").html("(" + formatRS(preco) + ")");
            $(".number-gift-cart").html("1 presente");
        }

        if (cartItems.length > 1) {

            var precoSoma = cartItems.reduce(function (acc, cur) {
                return acc + cur;
            });

            $(".price-gift-cart").html("(" + formatRS(precoSoma) + ")");
            $(".number-gift-cart").html(cartItems.length + " presentes");
        }
    }

    $(document).on('click', '.modal-content-carrinho', function (event) {
        event.stopPropagation();
    })

    $(document).on('click', '.modal-content-carrinho .fullcolor', function () {
        var width = $(window).width();
        
        if (width <= 1140) {
            cartItems.push(preco);
            atualizaStatusCart();
        }
        
        $('.modal-carrinho').removeClass('active');

        btnAdded.addClass('added');
        TweenMax.to('.carrinho-mobile', .2, {
            y: '0px'
        });
    })
    

    // REDIRECIONA O CLICK DOS BUTTONS
    $("button").on("click", (e) => {
        if ($(e.currentTarget).attr('data-href') !== undefined) {
            window.location.replace($(e.currentTarget).attr('data-href'));
        }
    });


    //SELECT2
    $('.ordenar:not(.ordenar-mobile)').select2({
        minimumResultsForSearch: -1,
        templateSelection: function (data) {
            return $("<span>Ordenar por</span>&ensp;<strong>" + data.text + "</strong>");
        }
    });



    $('.custom-select').select2({
        minimumResultsForSearch: -1,
    });

    $('.custom-select.search').select2({});


    //SELEÇÃO ORDERNAR POR
    // $(".btn-filter").on('click', (e) => {
    //   $(e.currentTarget).siblings().slideToggle(200);
    // });
    //
    // $(document).on('click', function(event) {
    //   if (!$(event.target).closest('.btn-filter').length) {
    //     $('.btn-filter').siblings().slideUp(200);
    //   }
    // });

    //FILTRAR POR STATUS
    // $(".status-filter .badges-filter").on("click", (e) => {
    //   $(e.currentTarget).siblings().removeClass("active");
    //   $(e.currentTarget).addClass("active");
    // });

    //FILTRAR POR CATEGORIA
    // $(".badges-filter").on("click", (e) => {
    //   //pega count de todos irmaos -1: (ele proprio) -1: (botao todos)
    //   var t = $(e.currentTarget).siblings().length - 2;
    //
    //   $(e.currentTarget).toggleClass("active");
    //
    //   if ($(e.currentTarget).hasClass("all")) {
    //     //se for botao todos
    //
    //     if ($(e.currentTarget).hasClass("active")) {
    //       //se tiver ativo
    //       $(e.currentTarget).siblings().addClass("active");
    //       //seta todos como ativos
    //     } else {
    //       $(e.currentTarget).siblings().removeClass("active");
    //       //senao desativa todos
    //     }
    //
    //   } else {
    //     if ($(e.currentTarget).siblings('.active').length == t) {
    //
    //       //opcional
    //       // $(e.currentTarget).removeClass("active");
    //       // $(e.currentTarget).siblings('.active').removeClass("active");
    //       //fim opcional
    //
    //       $(e.currentTarget).siblings('.all').addClass("active");
    //     } else {
    //       $(e.currentTarget).parent().find(".all").removeClass("active");
    //     }
    //     //se nao for botao todos desativa o botao todos
    //   }
    // });

    $(document).on('click', '.badges-filter', function () {
        $('.badges-filter').removeClass('active');
        $(this).toggleClass("active");
    });

    function centerItVariableWidth(target, outer) {
        var out = $(outer);
        var tar = $(target);
        var x = out.width();
        var y = tar.outerWidth(true);
        var z = tar.index();
        var q = 0;
        var m = out.find('li');
        for (var i = 0; i < z; i++) {
            q += $(m[i]).outerWidth(true);
        }
        out.scrollLeft(Math.max(0, q - (x - y) / 2));

    }

    //Coloca o elemento li do menu no centro quando está no mobile
    $(window).resize(function () {
        if ($(window).width() < 1148) {
            centerItVariableWidth($("nav ul li.active"), $("nav"));
            verifyActiveMenu();
        }
    });

    if ($(window).width() < 1148) {
        centerItVariableWidth($("nav ul li.active"), $("nav"));
    }

    //MARCADOR ITEM ATIVO, MENU HEADER ROXO
    function verifyActiveMenu() {
        if ($("header.roxo nav ul li").hasClass('active')) {
            var offset = $("header nav ul li.active a").offset();
            var center = $("header nav ul li.active a").innerWidth() / 2;
            $("header .menu-indicator").stop().animate({
                left: offset.left + center - 20
            }, 300, "linear")
        }
    }
    verifyActiveMenu();

    $("header.roxo nav ul li a").hover(function () {
        var offset = $(this).offset();
        var center = $(this).innerWidth() / 2;

        $("header.roxo .menu-indicator").stop().animate({
            left: offset.left + center - 20
        }, 250, "linear")
    }, verifyActiveMenu);

    $(document).on('click', 'header.roxo nav ul li a', function() {
        $('header.roxo nav ul li').removeClass('active');
        $(this).parent().addClass('active');
    })

    $(document).on('click', '.select-mobile', function () {
        $(this).toggleClass('active');

        if ($('.select-mobile').hasClass('active')) {
            $('.ng-down-open').addClass('active');
            $('.select-mobile').animate({
                height: '350px'
            }, 500);
        } else {
            $('.select-mobile').animate({
                height: '58px'
            }, 500);

            $('.ng-down-open').removeClass('active');
        }
    });

    //função que habilita e desabilita o checkbox azul
    $(document).on('change', '[data-checked="blue"]', function () {
        $('.config-taxa.blue').toggleClass('disable');
        $('.config-taxa.blue .title-config-mobile').toggleClass('disable');
        $('.config-taxa.blue .txt-config-mobile').toggleClass('disable');
    })

    //função que habilita e desabilita o checkbox verde
    $(document).on('change', '[data-checked="green"]', function () {
        $('.config-taxa.green').toggleClass('disable');
        $('.config-taxa.green .title-config-mobile').toggleClass('disable');
        $('.config-taxa.green .txt-config-mobile').toggleClass('disable');

        if ($('.config-taxa.green').hasClass('disable')) {
            TweenMax.to('.textarea-mensagem', .1, {
                height: 0,
                display: 'none'
            })

            TweenMax.to('.config-taxa small', .1, {
                display: 'none'
            })

            $('.btn-salvar').css('display', 'none');
            $('.btn-editar-mensagem').addClass('disabled').css({
                'width': '248.17px'
            });

        } else {
            $('.btn-editar-mensagem').removeClass('disabled').css({});
        }
    });

    //função para abrir o textearea ao clicar no botão de editar mensagem
    $(document).on('click', '.btn-editar-mensagem', function (e) {
        e.preventDefault();
        $(this).animate({
            width: '55%',
            marginLeft: 0
        }, 100);

        $(this).addClass('active').addClass('disabled');

        setTimeout(function () {
            $('.btn-salvar').fadeIn().css({
                'display': 'inline-block'
            });
        }, 200);

        setTimeout(function () {
            TweenMax.to('.textarea-mensagem', .4, {
                height: 120,
                display: 'block'
            })

            TweenMax.to('.config-taxa small', .5, {
                display: 'block'
            })

        }, 300);

        setTimeout(function () {
            $('.textarea-mensagem').addClass('active');
        }, 700)
    })

    //contador de caracteres
    $(function () {
        $(".textarea-mensagem").keyup(function () {
            var tamanho = $(this).val().length;
            $(".count-js").html(tamanho);
        });
    });

    //RSVP
    if ($('.rsvp').length >= 1) {

        $(document).on('click', '.rsvp .btn-large', function () {
            $(this).fadeOut();
            $(this).parents(".rsvp").animate({
                height: 1120
            }, 700);
        });

        $("#editar-rsvp").click(function () {
            $(".convidados-3 .container .config").css("zIndex", "99999");

            $("body").css("overflow", "hidden");

            TweenMax.to('.convidados-3 .container .config', .3, {
                x: "0%"
            });

            TweenMax.to('.convidados-3 .container .save-modal', .3, {
                y: "0%"
            });

        });

        $(".exit-modal").click(function () {
            setTimeout(function () {
                $("body").css("overflow", "");

                $(".convidados-3 .container .config").css("zIndex", "");
            }, 500);

            TweenMax.to('.convidados-3 .container .config', .3, {
                x: "-100%"
            });

            TweenMax.to('.convidados-3 .container .save-modal', .3, {
                y: "105%"
            });

        });
    }

    //select categorias
    var categorias = $('.status-filter');

    $(document).on('click', '.select-categorias', function () {
        $(this).toggleClass('active');

        if ($('.select-categorias').hasClass('active')) {
            setTimeout(function () {
                $('.categorias-mobile .status-filter').slideToggle();
            }, 300);

            if (width > 500) {
                $(this).animate({
                    width: '420px'
                }, 300);
            } else if (width <= 465 && width >= 436) {
                $(this).animate({
                    width: '408px'
                }, 300);
            } else if (width <= 435 && width >= 381) {
                $(this).animate({
                    width: '325px'
                }, 300);
            } else if (width <= 380) {
                $(this).animate({
                    width: '275px'
                }, 300);
            }
        } else {
            $('.categorias-mobile .status-filter').slideToggle();
            if (width <= 340) {
                setTimeout(function () {
                    $('.select-categorias').animate({
                        width: '100px'
                    }, 300);
                }, 300)
            } else {
                setTimeout(function () {
                    $('.select-categorias').animate({
                        width: '120px'
                    }, 300);
                }, 300)
            }
        }

    })

    $(document).on('click', '.status-filter .badges-filter', function (event) {
        event.stopPropagation();
    })

    $(document).on('click', '.add-usuario-content .buttons button', function (event) {
        var parentForm = $(this).parents('.informacoes-gerais');
        var inputs = Array.from($(parentForm).find('input'));

        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            event.preventDefault();
        }
    });

    $(document).on('click', '.informacoes-gerais .buttons button', function (e) {
        var parentForm = $(this).parents('.informacoes-gerais');
        var inputs = Array.from($(parentForm).find('input'));

        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            e.preventDefault();
        }
    });

    $(document).on('click', '.card-default .buttons button', function (e) {
        var parentForm = $(this).parents('.card-default');
        var inputs = Array.from($(parentForm).find('input'));

        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            e.preventDefault();
        }
    });


    $(document).on('click', 'form[name="nova-conta"] button', function (e) {
        var parentForm = $(this).parents('form[name="nova-conta"]');
        var inputs = Array.from($(parentForm).find('input'));
        
        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            e.preventDefault();
        }
    });
    
    //aumentar ou diminuir a quantidade e aplicar a soma
    var valorUnitario;
    var valorFinal;
    var valorTotal;
    var quantidade;
    var value;

   $(document).on('click', '.diminuir', function () {
    var width = $(window).width();
        quantidade = parseInt($(this).parent().find('.numero-quantidade').html());
        valorUnitario = parseInt($(this).parent().find('.numero-unitario').html());
        valorFinal = parseInt($(this).parent().find('.numrto-final').html());
        
        if( quantidade > 1 ) {
            --quantidade;

            valorUnitario = $(this).parents('.info-itens').find('.numero-unitario').html().replace('R$&nbsp;', '');
            valorUnitario = parseFloat(valorUnitario.replace(',', '.'));
            $(this).parent().find('.numero-quantidade').html(quantidade);

            if(width > 600) {
                valorFinal = $(this).parents('.item').find('.numero-final.desk').html().replace('R$', '').replace('R$&nbsp;', '').replace(',', '.');
                valorFinal = valorFinal.replace('.', ',').replace('R$', '').replace('&nbsp;', '');
                valorFinal = parseFloat(valorFinal.replace(',', '.'));
                valorFinal = valorFinal - valorUnitario;

                $(this).parents('.item').find('.numero-final.desk').html(formatRS(valorFinal));

                var total = parseFloat($('.numero-total').html().replace('R$&nbsp;', '').replace(',', '.')) - valorUnitario;
                $('.numero-total').html(formatRS(total));
    
            } else {
                valorFinal = $(this).parents('.item').find('.numero-final.mobile').html().replace('R$', '').replace('R$&nbsp;', '').replace(',', '.');
                valorFinal = valorFinal.replace('.', ',').replace('R$', '').replace('&nbsp;', '');
                valorFinal = parseFloat(valorFinal.replace(',', '.'));
                valorFinal = valorFinal - valorUnitario;

                $(this).parents('.item').find('.numero-final.mobile').html(formatRS(valorFinal));

                var total = parseFloat($('.price-gift-cart.numero-total').html().replace('R$&nbsp;', '').replace(',', '.')) - valorUnitario;
                $('.price-gift-cart.numero-total').html(formatRS(total));
            }
        }

   });

   $(document).on('click', '.aumentar', function () {
        var width = $(window).width();
        quantidade = parseInt($(this).parent().find('.numero-quantidade').html());
        ++quantidade;
        var arrayValorDesk = Array.from($('.numero-final.desk'));
        var arrayValorMobile = Array.from($('.numero-final.mobile'));

        $(this).parent().find('.numero-quantidade').html(quantidade);
        
        valorUnitario = $(this).parents('.info-itens').find('.numero-unitario').html().replace('R$&nbsp;', '');
        valorUnitario = parseFloat(valorUnitario.replace(',', '.'));
        
        value = 0;
        if(width > 600) {
            valorFinal = $(this).parents('.item').find('.numero-final.desk').html().replace('R$', '').replace('R$&nbsp;', '').replace(',', '.');
            valorFinal = valorFinal.replace('.', ',').replace('R$', '').replace('&nbsp;', '');
            valorFinal = parseFloat(valorFinal.replace(',', '.'));
            valorFinal = valorFinal + valorUnitario;
            
            $(this).parents('.item').find('.numero-final.desk').html(formatRS(valorFinal));

            $(arrayValorDesk).map(function(index, item) {
                item = $(item).html().replace('&nbsp;', '').replace('R$', '').replace('.', '');
                item = parseFloat(item.replace(',', '.'));
                value = value + item;
                return value;
            })
            
            $('.numero-total').html(formatRS(value));
        } else {
            valorFinal = $(this).parents('.item').find('.numero-final.mobile').html().replace('R$', '').replace('R$&nbsp;', '').replace(',', '.');
            valorFinal = valorFinal.replace('.', ',').replace('R$', '').replace('&nbsp;', '');
            valorFinal = parseFloat(valorFinal.replace(',', '.'));
            valorFinal = valorFinal + valorUnitario;

            $(this).parents('.item').find('.numero-final.mobile').html(formatRS(valorFinal));

            $(arrayValorMobile).map(function(index, item) {
                item = $(item).html().replace('&nbsp;', '').replace('R$', '').replace('.', '');
                item = parseFloat(item.replace(',', '.'));
                value = value + item;
                return value;
            });

            $('.price-gift-cart.numero-total').html(formatRS(value));
        }
   });


    //excluir um item 
    $(document).on('click', '.btn-close', function () {
        width = $(document).width();
        var total = parseFloat($('.numero-total').html().replace('R$&nbsp;', '').replace(',', '.'));

        if(width => 768) {
            var valor = parseFloat($(this).parents('.item').find('.numero-final.desk').html().replace('R$&nbsp;', '').replace(',', '.'));
        } else {
            var valor = parseFloat($(this).parents('.item').find('.numero-final.mobile').html().replace('R$&nbsp;', '').replace(',', '.'));
        }
        total = total - valor;
        $('.numero-total').html(formatRS(total));
        $(this).parents('.item').remove();
    });


    // fadeIn no form do boleto - pagamento-2
    $(document).on('click', '.boleto', function () {
        localStorage.setItem('id_payment', 'boleto');
        $('.opcao-pagamento .active').removeClass('active');
        $(this).addClass('active');
        $('.boleto svg').addClass('active');
        $('.form-pagamento-cartao').fadeOut();
        setTimeout(function () {
            $('.form-pagamento-boleto').fadeIn();
        }, 300);
    });

    // fadeIn no form do cartão - pagamento-2
    $(document).on('click', '.card', function () {
        localStorage.setItem('id_payment', 'cartão');
        $('.opcao-pagamento .active').removeClass('active');
        $(this).addClass('active');
        $('.form-pagamento-boleto').fadeOut();
        setTimeout(function () {
            $('.form-pagamento-cartao').fadeIn();
        }, 300);
    });

    let elementVal = $('.pagamento-2 .validade');
    let elementCVC = $('.pagamento-2 .cvc');
    
    $(window).resize(function() {
        let windowWidth = $(window).width() + 15;
        if(windowWidth <= 600) {
            elementVal = $('.pagamento-2 .validade').remove();
            elementCVC = $('.pagamento-2 .cvc').remove();
            $('.grid-input-mobile').append(elementVal);
            $('.grid-input-mobile').append(elementCVC);
        } else {
            $('.input-cvc-desk').append(elementCVC);
            $('.input-expiry-desk').append(elementVal);
        }
    })
    
    // $('input[name="expiry"]').removeAttr('maxlength');
    // $('input[name="expiry-mobile"]').removeAttr('maxlength');
    
    
    //abrir modal da página de editar perfil 1
    var modalContent = $('.modal-content');
    $(document).on('click', '.open-modal', function (e) {
        e.stopPropagation();
        e.preventDefault();

        var dataOpen = $(this).data('modal');
        $('[data-open= ' + dataOpen + ']').addClass('active');

        TweenMax.fromTo(modalContent, .3, {
            opacity: 0,
            scale: 0
        }, {
            opacity: 1,
            scale: 1
        });
    });

    $(document).on('click', '.card-convidados-user .editar', function (e) {
        e.stopPropagation();

        $('.modal-invited').addClass('active');

        TweenMax.fromTo(modalContent, .3, {
            opacity: 0,
            scale: 0
        }, {
            opacity: 1,
            scale: 1
        });
    });



    $(document).on('click', '.modal-close .ng-cancel, .modal-white .cancelar, .modal-invited .open-users, [data-open="editar-conta"] .btn-exclude', function (event) {
        event.preventDefault();

        $('.modal').removeClass("active");
        TweenMax.to(modalContent, .3, {
            opacity: 0,
            scale: 0
        })
    })

    if ($('.modal').length > 0) {

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.modal-content').length) {
                $('.modal').removeClass("active");

                if ($('.modal').hasClass('.confirmar-presenca')) {
                    TweenMax.to(modalContent, .3, {
                        opacity: 0,
                        scale: 0
                    });
                }

                if ($(".modal-content .usuarios-row").length > 0) {

                    TweenMax.to($(".modal-content .usuarios-row"), .0, {
                        x: 0
                    });
                }
            }
        });
    }



    $('.banco').click(function () {
        $('.banco').removeClass('active');
        $(this).addClass('active');
    });

    //EDITAR USUARIO A PARTIR DA MODAL
    $('.open-user-add').click(function () {

        $(".add-usuario-content").css("display", "inline-block");

        var a = $(".modal-content .usuarios-row");
        TweenMax.to(a, .3, {
            ease: Power1.easeOut,
            x: -540
        });

        $('.informacoes-gerais .fullcolor').html('Adicionar usuário');

        $('.informacoes-gerais input').each(function(index, item) {
            $(item).val('');
        })
    });


    $('.open-users').click(function () {
        var a = $(".modal-content .usuarios-row");
        TweenMax.to(a, .3, {
            ease: Power1.easeOut,
            x: 0
        });
        $('.informacoes-gerais .fullcolor').html('adicionar usuário');
        $(".add-usuario-content").css("display", "");
    });


    $(document).on('click', '.card-user-modal .editar', function() {
        $(".add-usuario-content").css("display", "inline-block");
        $('.informacoes-gerais .fullcolor').html('Salvar alterações');

        TweenMax.to('.modal-content .usuarios-row', .3, {
            ease: Power1.easeOut,
            x: -540
        });
    })


    $(".toggle-troca-festa").click(function () {
        $(this).addClass("troca-festa-active");
        $(".troca-festa").addClass("active");
    });

    if ($(".toggle-troca-festa").length > 0) {

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.toggle-troca-festa').length) {
                $(".toggle-troca-festa").removeClass("troca-festa-active");
                $(".troca-festa").removeClass("active");
            }
        });
    }


    // tooltip cvc - pagamento-2

    tippy('.cvc .ng-help-circled', {
        content: '<p style="font-size: 11px;">Códido de verificação do cartão que está inserido atrás do cartão</p>',
        arrow: true,
        theme: 'light',
        placement: 'right',
        maxWidth: '185px'
    });

});