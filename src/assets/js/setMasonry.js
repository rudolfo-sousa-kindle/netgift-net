import $ from 'jquery';
import Masonry from "masonry-layout";
import Isotope from "isotope-layout";

export function setMasonry(){

    if ($('.usuarios').length > 0) {
        var grid = document.querySelector('.grid-festas');
        var $gridFestas = new Masonry( grid, {
            itemSelector: '.box-festas',
            gutter: 55,
            horizontalOrder: true,
            columnWidth: '.box-festas-sizer',
            percentPosition: true
        });
        $gridFestas = new Masonry('layout');

    }

    //MANSORY CARDS LISTA DE CONVIDADOS
    if ($('.list-cards').length >= 1) {
        var listCards = document.querySelector('.list-cards');
        var cards = new Isotope( listCards, {
            masonry: {
                itemSelector: '.card-convidados',
                gutter: 5,
                horizontalOrder: true,
                columnWidth: '.card-convidados-sizer',
                percentPosition: true
            },
        });

        // $('.badges-filter').click(function() {
        //     var filterValue = $(this).attr('data-filter');

        //     if (filterValue === 'todos') {
        //         console.log(filterValue);
        //         new Isotope( listCards, {
        //             filter: '*'
        //         });
        //     } else if (filterValue === 'confirmados') {
        //         console.log(filterValue);
        //         new Isotope( listCards, {
        //             filter: '.card.card-convidados.confirmado',
        //         });
        //     } else if (filterValue === 'respondeu') {
        //         return new Isotope( listCards, {
        //             filter: '.Não.respondeu.card.card-convidados',
        //         });
        //     } else {
        //         return new Isotope( listCards, {
        //             filter: '.card.card-convidados.nao-comparecera',
        //         });
        //     }
        // })
    }

    // var $grid = $('.cards').isotope({
    //     // options

    //     masonry: {
    //         columnWidth: '.grid-sizer',
    //         itemSelector: '.card',
    //         gutter: 15,
    //         fitWidth: true

    //     }
    // });

    // filter items on button click
}

export function reloadUsuariosCard() {
    if ($('.usuarios').length > 0) {
        var grid = document.querySelector('.grid-festas');
        var $gridFestas = new Masonry( grid, {
            itemSelector: '.box-festas',
            gutter: 55,
            horizontalOrder: true,
            columnWidth: '.box-festas-sizer',
            percentPosition: true
        });
        $gridFestas = new Masonry('layout');

    }
    
    if ($("body").hasClass("usuarios")) {
        if ($(".dashboard").hasClass("aside-active")) {
            setTimeout(function () {
                $gridFestas = new Masonry('layout');
                $gridFestas = new Masonry({
                    gutter: 38
                });
                
            }, 350);
        } else {
            setTimeout(function () {
                $gridFestas = new Masonry('layout');
                $gridFestas = new Masonry({
                    gutter: 55
                });
            }, 350);
        }
    }
}