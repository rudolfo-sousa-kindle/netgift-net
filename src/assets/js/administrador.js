import jQuery from 'jquery';
import 'jquery-ui';
import {TweenMax, TimelineMax} from "gsap";
import {reloadUsuariosCard} from "./setMasonry";
import tippy from "tooltipster";
import 'select2';
import "selectize";
import './fileup';

jQuery(document).ready(function ($) {

    //menu-mobile 
    $('.dashboard .menu-mobile').click(function () {
        $('.menu, .menu-mobile, .menu-icon').toggleClass('active');
    })

    if ($(window).width() <= 1850 && $("body").is(".dashboard.home")) {
        setTimeout(function () {
            $(".dashboard .content .header .notificacoes button").trigger("click");
        }, 5);
    }


    $('#busca').selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    });

    // animações com box-aside
    function animaBox() {
        const tl = new TimelineMax();

        TweenMax.staggerFromTo('.border-notifications', .3, {
            opacity: 0,
            scale: 0
        }, {
            opacity: 1,
            scale: 1,
        }, .2);
    }

    animaBox();

    $(document).on( 'click', '.toggle-aside', function (e) {
        e.stopPropagation();

        var statusBtn = false;

        if ($(this).hasClass("active")) {
            statusBtn = true;
        }

        $('.toggle-aside').removeClass('active');

        if (statusBtn) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }


        var dataOpen = $(this).data('open');
        var dataAside = $('[data-aside=' + dataOpen + ']');

        var status = false;

        if (dataAside.hasClass("active")) {
            status = true;
        }

        $(".dashboard").removeClass("aside-active");
        $('[data-aside].active').removeClass("active");

        if (status) {
            dataAside.removeClass('active');
            $(".dashboard").removeClass("aside-active");
        } else {
            dataAside.addClass('active');
            $(".dashboard").addClass("aside-active");
        }

        reloadUsuariosCard();

    });

    // $(document).on( 'click', '.notificar .buttons button, .ng-left-arrow-extend', function (e) {
    //     e.stopPropagation();

    //     if ($(".dashboard").hasClass("aside-active")) {
    //         $(".dashboard").toggleClass("aside-active");
    //         $('.btn-ver-detalhes').removeClass('active');
    //         $('[data-aside]').removeClass("active");

    //         reloadUsuariosCard();
    //         $(".select-filter-status").select2("close");

    //     }

    // });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.box-aside').length) {
            if ($(".dashboard").hasClass("aside-active")) {
                $(".dashboard").toggleClass("aside-active");
                $('.btn-ver-detalhes').removeClass('active');
                $('[data-aside]').removeClass("active");

                if ($(".dashboard").hasClass("usuarios")) {
                    reloadUsuariosCard();
                }
                $(".select-filter-status").select2("close");

            }
        }
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


    // var dateFormat = 'dd/mm/y',
    //     from = $(".custom-date-from")
    //     .datepicker({
    //         dateFormat: 'dd/mm/y',
    //         dayNames: dayNames,
    //         dayNamesMin: dayNamesMin,
    //         dayNamesShort: dayNamesShort,
    //         monthNames: monthNames,
    //         monthNamesShort: monthNamesShort,
    //         nextText: 'Próximo',
    //         prevText: 'Anterior'
    //     })
    //     .on("change", function () {
    //         to.datepicker("option", "minDate", getDate(this));
    //     }),
    //     to = $(".custom-date-to").datepicker({
    //         dateFormat: 'dd/mm/y',
    //         dayNames: dayNames,
    //         dayNamesMin: dayNamesMin,
    //         dayNamesShort: dayNamesShort,
    //         monthNames: monthNames,
    //         monthNamesShort: monthNamesShort,
    //         nextText: 'Próximo',
    //         prevText: 'Anterior'
    //     })
    //     .on("change", function () {
    //         from.datepicker("option", "maxDate", getDate(this));
    //     });

    // function getDate(element) {
    //     var day = element.value;
    //     var date;

    //     try {
    //         date = $.datepicker.parseDate(dateFormat, day);
    //     } catch (error) {
    //         date = null;
    //     }

    //     return date;
    // }



    //excluir presente - página presente
    $('.presentes button.gradient.border').click(function () {
        var cardGift = $(this).parent().parent().parent().parent();
        cardGift.addClass('desactive')

        TweenMax.to(cardGift, .3, {
            scale: 0,
            opacity: 0
        });

        TweenMax.to(cardGift, .3, {
            display: 'none'
        });
    })


    //botão de visualizar dispositivo ativo
    $(document).on("click", '.type-view', function (e) {
        e.preventDefault();
        $('.type-view').removeClass('active');
        $(this).addClass('active');
    });

    $(window).on("resize", function(){
        if($(window).width() <= 600){
            $(".type-view[title=Celular]").click();
        }else{
            $(".type-view[title=Computador]").click();
        }
    })

    if($(window).width() <= 500){
        $(".type-view[title=Celular]").click();
    }

    // $('.custom-select:not(.categoria-tema)').select2({
    //     minimumResultsForSearch: -1,
    // });


    //    $('.custom-select+.select2-container').click(function (event) {
    //        //        event.stopPropagation();
    //
    //        if (!$(this).hasClass('active')) {
    //            $(this).addClass('active');
    //        } else {
    //            $(this).removeClass('active');
    //        }
    //    });


    // $('.selecione').click(function () {
    //     if (!$(this).hasClass('active')) {
    //         $(this).addClass('active');
    //         $('.main-categorias').addClass("active");

    //         //bug not scroll
    //         $(".dashboard .content .wrap .wrap-content").css("overflow", "hidden");
    //         catTema.select2("open");
    //         $(".dashboard .content .wrap .wrap-content").css("overflow", "auto");

    //     } else {
    //         $(this).removeClass('active');
    //         $('.main-categorias').removeClass("active");

    //         setTimeout(function () {
    //             $('.categoria-tema').select2("close");
    //         }, 500);
    //     }
    // });


    /* captura de nova categoria: http://jsfiddle.net/jnw96phd/ */

    // var catTema = $('.categoria-tema').select2({
    //         placeholder: "Buscar uma categoria",
    //         closeOnSelect: false,
    //         selectOnClose: false,
    //         allowClear: false,
    //         tags: true,
    //         createTag: function (params) {
    //             return {
    //                 id: params.term,
    //                 text: params.term,
    //                 new: true,
    //             }
    //         },
    //         templateResult: function (data) {
    //             var $result = $("<span></span>");

    //             $result.text(data.text);

    //             if (data.new) {
    //                 $result.append(" <em> Novo</em>");
    //                 $result.text('Adicionar "' + data.text + '" como nova categoria');
    //                 data.new = false;
    //             }

    //             return $result;
    //         },
    //         dropdownParent: $('.dropdown-categoria-tema'),
    //     }).on('change', function () {
    //         var $selected = $(this).find('option:selected');
    //         var $container = $('.tags-categorias');

    //         if ($selected.length > 0) {
    //             $('.item-categorias').show();
    //         } else {
    //             $('.item-categorias').hide();
    //         }

    //         var $list = $('<ul>');
    //         $selected.each(function (k, v) {
    //             var $li = $('<li class="tag-selected">' + $(v).text() + '<a class="destroy-tag-selected">×</a></li>');
    //             $li.children('a.destroy-tag-selected')
    //                 .off('click.select2-copy')
    //                 .on('click.select2-copy', function (e) {
    //                     var $opt = $(this).data('select2-opt');
    //                     $opt.attr('selected', false);
    //                     $opt.parents('select').trigger('change');
    //                 }).data('select2-opt', $(v));
    //             $list.append($li);
    //         });
    //         $container.html('').append($list);
    //     }).trigger('change')
    //     .on("select2:close", function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();

    //         if ($('.selecione').hasClass("active")) {
    //             catTema.select2("open");
    //         }
    //     });

    /* slideToggle de extrato de transações página dashboard, financeiro */
    $(document).on( 'click', '.extrato .more', function () {

        $(this).toggleClass("open");

        if (!$('.form-extrato').hasClass('active')) {
            setTimeout(function () {
                $('.form-extrato').addClass('active');
            }, 300);

            TweenMax.to('.form-extrato', 0.3, {
                delay: 0.3,
                opacity: 1
            })
        } else {
            TweenMax.to('.form-extrato', 0.3, {
                delay: 0.3,
                opacity: 0
            })

            $('.form-extrato').animate({
                height: 'toggle'
            }, 300)
            setTimeout(function () {
                $('.form-extrato').removeClass('active');
            }, 300);
        }

    });

    $(document).on( 'click', '.btn-detalhes', function () {
        var transicaoExpanded = $(this).parent().find('.transacao-mobile');
        var btnDetalhes = transicaoExpanded.parent().find('.btn-detalhes');

        $(window).resize(function () {
            var width = $(this).width();

            if (width > 1024) {
                $(transicaoExpanded).css('display', 'none');
                
                $('.extrato-financeiro .title-main-grid').css('display', 'grid');
                $('.grid.multi-grid.flex-center').css('display', 'grid');
            } else {
                if(transicaoExpanded.hasClass('active')) {  
                    $(transicaoExpanded).css('display', 'block');
                }
                $('.grid.multi-grid.flex-center').css('display', 'block');
            }
        })

        if (!$(transicaoExpanded).hasClass('active')) {
            $('.extrato-financeiro .multi-grid').css('display', 'block');
            $(transicaoExpanded).slideToggle();
            setTimeout(function () {
                $(transicaoExpanded).addClass('active');
            }, 300);

            TweenMax.to(transicaoExpanded, 0.3, {
                delay: 0.3,
                opacity: 1
            });

            $(btnDetalhes).html('fechar');
        } else {
            TweenMax.to(transicaoExpanded, 0.3, {
                delay: 0.3,
                opacity: 0
            })

            $(transicaoExpanded).animate({
                height: 'toggle'
            }, 300)
            setTimeout(function () {
                $(transicaoExpanded).removeClass('active');
            }, 300);

            $(btnDetalhes).html('detalhes');
        }
    })


    /* tooltip */
    if ($('.dashboard').hasClass('extrato-financeiro')) {
        tippy('.tooltip-revenue', {
            content: '<p style="text-align: left; font-size: 12px; font-weight: 600">Revenue share</p> <p style="font-size: 10.53px; text-align: left; opacity: .6; line-height: 12px; margin-top: 3px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, eum itaque natus aliquid</p>',
            arrow: true,
            theme: 'light',
            placement: 'right',
            maxWidth: '185px'
        });

        tippy('.tooltip-pagamentos', {
            content: '<p style="text-align: left; font-size: 12px; font-weight: 600">Pagamentos no período</p> <p style="font-size: 10.53px; text-align: left; opacity: .6; line-height: 12px; margin-top: 3px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, eum itaque natus aliquid</p>',
            arrow: true,
            theme: 'light',
            placement: 'right',
            maxWidth: '185px'
        });

        tippy('.tooltip-valores', {
            content: '<p style="text-align: left; font-size: 12px; font-weight: 600">Valores bloqueados</p> <p style="font-size: 10.53px; text-align: left; opacity: .6; line-height: 12px; margin-top: 3px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, eum itaque natus aliquid</p>',
            arrow: true,
            theme: 'light',
            placement: 'right',
            maxWidth: '185px'
        });



        $('.span-footer').click(function () {
            $('.select-exibir').slideToggle().toggleClass('active');

            if ($('.select-exibir').hasClass('active')) {

            }
        })
    }
    
    if ($('.dashboard').hasClass('presentes-2')) {
        tippy('.ng-info-circled', {
            content: '<p style="font-size: 10.53px; text-align: left; opacity: .6; line-height: 12px; margin-top: 3px">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, eum itaque natus aliquid</p>',
            arrow: true,
            theme: 'light',
            placement: 'right',
            maxWidth: '200px'
        });
    }


    //MASONRY CARDS USUARIOS


    // upload de imagem - página de presentes-2
    // if ($('.presentes-2').length > 0) {
    //     $.fileup({
    //         url: 'https://github.com?file_upload=1',
    //         inputID: 'upload-presente',
    //         queueID: 'upload-presente-preview',
    //         autostart: true,
    //         filesLimit: 1,
    //         lang: 'ptbr',
    //         onSelect: function (file) {
    //             setTimeout(function () {
    //                 var pathImg            = $('.fileup-preview img').attr('src');
    //                 var nome_presente      = $('#nome-presente').val();
    //                 var valor_presente     = $('#valor-presente').val();
    //                 var descricao_presente = $('#descricao_presente').val();

    //                 $('.card-gift-name').html(nome_presente);
    //                 $('.card-gift-price').html('R$' + valor_presente);
    //                 $('.card-gift-desc').html(descricao_presente);
    //                 $('.card-gift').fadeIn(200);
    //                 $('.card-gift-thumb').append('<img src=" ' + pathImg + '" >');
                    
    //                 $('.gradient.fullcolor').removeClass('disabled');
    //             }, 1000);

    //             $('.fileup-btn').hide();
    //         },
    //         onRemove: function (file, total) {
    //             $('.card-gift-thumb img').remove();
    //             $('.card-gift').fadeOut(200);
    //             $('.gradient.fullcolor').addClass('disabled');

    //             $('.fileup-btn').show();
    //         },
    //         onSuccess: function (response, file_number, file) {
    //             //alert("Enviado com sucesso");
    //         },
    //         onError: function (event, file, file_number) {
    //             //                alert("Erro ao enviar");
    //         }
    //     });
    // }

    $('.fileup-remove').click(function () {
        $('.fileup-preview img').remove();
        alert('error')
    })
});
