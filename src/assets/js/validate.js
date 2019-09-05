import $ from 'jquery';
import setTooltipster , { setMessages } from './plugins';
import Snackbar from 'node-snackbar';

$(window).ready(function () {

    $('form[name="contato"]').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        errorPlacement: function (error, element) {
            var ele = element,
                err = error.text();
                
            ele.addClass('formError');
            if (err != null && err !== '') {
                setTooltipster();
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ( $(element).hasClass( 'tooltipstered' ) ) {
                $(element).removeClass('formError').addClass(validClass).tooltipster('close');
            }
        },
        submitHandler: function (form) {
            var form = document.forms.namedItem( 'contato' );
            var fd   = new FormData( form );
            let $settings = {
                "url": "http://www.localkindle.com.br/netgift_api/wp-json/ntgift/api/send_email",
                "method": "POST",
                "processData": false,
                "contentType": false,
                "data": fd,
                beforeSend: function (ele) {
                    $('.nb-spinner').show();
                    $('.contato .ng-right-arrow-extend').hide();
                }
            }

            $.ajax( $settings )
            .done( function ( $response ) {
                $('.nb-spinner').hide();
                $('.contato .ng-right-arrow-extend').show();
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Mensagem enviada com sucesso.',
                    backgroundColor: '#8332f5',
                    showAction: false,
                    duration: 5000
                });
            })
            .fail( function() {
                Snackbar.show({
                    pos: 'bottom-center',
                    text: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.',
                    backgroundColor: '#f20d21',
                    showAction: false,
                    duration: 5000
                });
            })
        }
    });
    
    $('form[name="buscar-festa"]').validate({
        rules: {
            nome: {
                required: true,
                minlength: 4
            },
            data: {
                required: true,
                dtNascimento: true,
            },
        },
        errorPlacement: function (error, element) {
            var ele = element,
                err = error.text();
            ele.addClass('formError')
            if (err != null && err !== '') {
                setTooltipster();
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ( $(element).hasClass( 'tooltipstered' ) ) {
                $(element).removeClass('formError').addClass(validClass).tooltipster('close');
            }
        },
        submitHandler: function (form) {
            console.log( 'teste' );
        }
    })
    
    $('form[name="dado-convidado"]').validate({
        rules: {
            nome_convidado: {
                required: true,
                minlength: 2
            },
            email_convidado: {
                required: true,
                minlength: 4
            },
            telefone_convidado: {
                required: true,
                minlength: 10
            }
        },
        
        errorPlacement: function (error, element) {
            element.addClass("formError");
        },
        
        unhighlight:  function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).removeClass('formError').addClass(validClass);
        },
        submitHandler: function (form) {
            //funcao se tudo estiver ok
        }
    });
})
