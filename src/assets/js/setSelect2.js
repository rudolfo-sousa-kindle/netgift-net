import jQuery from 'jquery';
import 'jquery-ui';
import './select2.custom';

export default function setSelect2(id){
jQuery(document).ready(function ($) {

    $(".select-filter-date").select2({
        minimumResultsForSearch: -1,
        templateSelection: function (data) {
            return $("<img src='../assets/imgs/icon-select-filter-date.svg'>&ensp;<span>" + data.text + "</span>");
        },
        dropdownParent: $('.filter-admin')
    });

    $('.custom-select:not(.categoria-tema), .ordenar').select2({
        minimumResultsForSearch: -1,
    });
        
    if(id){
        var str = id;
        var res = str.toString();
        $(".categoria-tema").select2().select2('val', res);
    }else{

    }

    var catTema = $('.categoria-tema').select2({
        placeholder: "Buscar uma categoria",
        closeOnSelect: false,
        selectOnClose: false,
        allowClear: false,
        tags: true,
        createTag: function (params) {
            return {
                id: params.term,
                text: params.term,
                new: true,
            }
        },
        templateResult: function (data) {
            var $result = $("<span></span>");

            $result.text(data.text);

            if (data.new) {
                $result.append(" <em> Novo</em>");
                $result.text('Adicionar "' + data.text + '" como nova categoria');
                data.new = false;
            }

            return $result;
        },
        dropdownParent: $('.dropdown-categoria-tema'),
    }).on('change', function () {
        var $selected = $(this).find('option:selected');
        var $container = $('.tags-categorias');

        if ($selected.length > 0) {
            $('.item-categorias').show();
        } else {
            $('.item-categorias').hide();
        }

        var $list = $('<ul>');
            $selected.each(function (k, v) {
                var $li = $('<li class="tag-selected">' + $(v).text() + '<a class="destroy-tag-selected">×</a></li>');
                $li.children('a.destroy-tag-selected')
                    .off('click.select2-copy')
                    .on('click.select2-copy', function (e) {
                        var $opt = $(this).data('select2-opt');
                        $opt.attr('selected', false);
                        $opt.parents('select').trigger('change');
                    }).data('select2-opt', $(v));
                $list.append($li);
            });
            $container.html('').append($list);
        }).trigger('change')
        .on("select2:close", function (e) {
            e.preventDefault();
            e.stopPropagation();

            if ($('.selecione').hasClass("active")) {
                catTema.select2("open");
            }
        });

    $('.selecione').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.main-categorias').addClass("active");

            //bug not scroll
            $(".dashboard .content .wrap .wrap-content").css("overflow", "hidden");
            catTema.select2("open");
            $(".dashboard .content .wrap .wrap-content").css("overflow", "auto");

        } else {
            $(this).removeClass('active');
            $('.main-categorias').removeClass("active");

            setTimeout(function () {
                $('.categoria-tema').select2("close");
            }, 500);
        }
    });

    $(".select-filter-date").select2({
        minimumResultsForSearch: -1,
        templateSelection: function (data) {
            return $("<img src='../assets/imgs/icon-select-filter-date.svg'>&ensp;<span>" + data.text + "</span>");
        },
        dropdownParent: $('.filter-admin')
    });


    $(".select-filter-admin:not(.select-filter-date)").select2({
        minimumResultsForSearch: -1,
        dropdownParent: $('.filter-admin')
    });


    var selectStatus = $(".select-filter-status").select2({
        tags: false,
        minimumResultsForSearch: -1,
        dropdownParent: $('.filter-admin'),
        templateResult: formatStatus

    });

    function formatStatus(status) {
        var $state = $(
            '<span class="' + status.id + '">' + status.text + '</span>'
        );
        return $state;
    };

    $(".select-filter-status").on('select2:close', function () {
        var uldiv = $(this).siblings('span.select2').find('ul')
        var count = $(this).select2('data').length
        if (count == 0) {
            uldiv.html("<li>Status (0) <span class='select2-selection__arrow' role='presentation'><b role='presentation'></b></span></li>")
        } else {
            uldiv.html("<li>Status (" + count + ") <span class='select2-selection__arrow' role='presentation'><b role='presentation'></b></span></li>")
        }
    });


    setTimeout(function () {
        selectStatus.select2("open");
        selectStatus.select2("close");
    }, 5);



    $(".filter").on("click", () => {
        $(".filter-dropdonw").slideDown(200);
    });

    $(".alerts-contents .filters button").click(function () {
        $(this).toggleClass("unchecked");
    });

    $(".alerts-tags.atividades-filtros button").click(function () {
        $(this).parents(".atividades-filtros").find("button").removeClass("active");
        $(this).addClass("active");

        var c = $(this).attr("class");

        $(this).parents(".alerts-header").siblings(".main-content-aside").find(".alerts-wrap").removeClass('left center right').addClass(c);

    });

});

}