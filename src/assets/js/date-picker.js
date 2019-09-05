import jQuery from 'jquery';
import 'jquery-ui';
import datepickerFactory from 'jquery-datepicker';

import './dataTables.pageLoadMore.min.js'

export default function setDatePicker($, datepicker_from, datepicker_to) {
    datepickerFactory($);

    console.log( datepicker_from );

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
        from = $(datepicker_from)
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
        to = $(datepicker_to).datepicker({
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

    setTimeout(() => {
        $(document).on('focus', '.hasDatepicker', function() {
            console.log($('body').find('.ui-datepicker-title'))
        })
        
    }, 1000);

};
