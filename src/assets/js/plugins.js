import $ from 'jquery';
let width = $(document).width();

export function autocompleteCep() {
    //Quando o campo cep perde o foco.
    
}

export default function setTooltipster() {
    $('form[name="contato"] input').tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $('form[name="contato"] textarea').tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });
    
    $('#criar-festa input').tooltipster({
        animation: 'fade',
        theme: 'tooltipster-criarfesta',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $('#criar-festa select').tooltipster({
        animation: 'fade',
        theme: 'tooltipster-criarfesta',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $('form[name="buscar-festa"] input').tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    })

    $('form[name="buscar-festa"] select').tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $('form[name="confirmar-presenca"] input').tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $('form[name="confirmar-presenca"] select').tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    
}

export function setMask() {
    $('.nascimento, #data-festa, #nascimento-pessoa-1').mask('00/00/0000');
    $('.area-convidado input[name="tel"]').mask('00000-0000');
    $('[name="cep"]').mask('00000-000');
}

export function setMessages() {
    $.extend($.validator.messages, {
        // Core
        required: "Campo obrigat&oacuterio",
        equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente",
        email: "Por favor, insira um email válido",
        maxlength: $.validator.format("Por favor, forne&ccedil;a n&atilde;o mais que {0} caracteres"),
        minlength: $.validator.format("Por favor, forne&ccedil;a ao menos {0} caracteres"),
        rangelength: $.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1} caracteres de comprimento"),
        range: $.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1}"),
        max: $.validator.format("Por favor, forne&ccedil;a um valor menor ou igual a {0}"),
        min: $.validator.format("Por favor, forne&ccedil;a um valor maior ou igual a {0}"),
        step: $.validator.format("Por favor, forne&ccedil;a um valor m&uacute;ltiplo de {0}"),
    });

    $.validator.addMethod("cartaoCredito", function (value, element) {
        if (this.optional(element)) {
            return "dependency-mismatch";
        }
        if (/[^0-9 \-]+/.test(value)) {
            return false;
        }
        var nCheck = 0,
            nDigit = 0,
            bEven = false,
            n, cDigit;
        value = value.replace(/\D/g, "");
        if (value.length < 13 || value.length > 19) {
            return false;
        }
        for (n = value.length - 1; n >= 0; n--) {
            cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) === 0;
    }, "Cartão inválido");

    
    $.validator.addMethod("dtNascimento", function (value) {
        value = value.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "");
        if (value.length !== 8) {
            return false;
        }
    
        var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02]) [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
    
        var year = value.slice(4, 8);
    
        if (year < 1900) {
            return false;
        } else {
    
            if (!((value.match(RegExPattern)) && (value != ''))) {
                return false;
            } else {
                return true;
            }
    
        }
        return false;
    }, "Data inválida");

    
    $.validator.addMethod("maiorIdade", function (value, element) {
        value = value.replace(/([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "");
        var retorno = false;
    
        var day = value.slice(0, 2);
        var month = value.slice(2, 4);
        var year = value.slice(4, 8);
    
        var dataNascimento = new Date(parseInt(year),
            parseInt(month) - 1,
            parseInt(day));
    
        var diferenca = Date.now() - dataNascimento.getTime();
        var idade = new Date(diferenca);
    
        var a = new Date().getFullYear();
    
        if (year > a) {
            return false;
        } else {
            if (Math.abs(idade.getUTCFullYear() - 1970) >= 18) {
                return true;
            } else {
                return false;
            }
        }
    }, "Necessário ter 18 anos");

    $.validator.addMethod("cpf", function (value, element) {
        value = $.trim(value);
    
        value = value.replace('.', '');
        value = value.replace('.', '');
        var cpf = value.replace('-', '');
        while (cpf.length < 11) cpf = "0" + cpf;
        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
        var a = [];
        var b = new Number;
        var c = 11;
        var x;
        for (var i = 0; i < 11; i++) {
            a[i] = cpf.charAt(i);
            if (i < 9) b += (a[i] * --c);
        }
        if ((x = b % 11) < 2) {
            a[9] = 0
        } else {
            a[9] = 11 - x
        }
        b = 0;
        c = 11;
        for (var y = 0; y < 10; y++) b += (a[y] * c--);
        if ((x = b % 11) < 2) {
            a[10] = 0;
        } else {
            a[10] = 11 - x;
        }
    
        var retorno = true;
        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;
    
        return this.optional(element) || retorno;
    
    }, "Informe um CPF válido");
}

function updateObject(validator, obj) {
    if( $('form').is('#criar-festa') ) {
        if( $("input[name='tipo_festa']:checked").attr("id") ===  'casamento' || $("input[name='tipo_festa']:checked").attr("id") ===  'adulto') {
            Object.assign(validator.settings.rules.nascimento_1, obj);
            Object.assign(validator.settings.rules.nascimento_2, obj);
        } else {
            delete validator.settings.rules.nascimento_1.maiorIdade;
            delete validator.settings.rules.nascimento_2.maiorIdade;
        }
    }
}

export function setValidate() {
    var validateMaiorIdade = {  maiorIdade: true }

    var validator = $("#criar-festa").validate({
        rules: {
            nome_1: {
                required: true,
            },
            nome_2: {
                required: true,
            },
            nascimento_1: {
                required: true,
                dtNascimento: true,
            },
            nascimento_2: {
                required: true,
                dtNascimento: true,
            },
            sexo_1: {
                required: true,
            },
            sexo_2: {
                required: true,
            }
        },
        errorPlacement: function (error, element) {
            var ele = element,
                err = error.text();
                
            if (err != null && err !== '') {
                setTooltipster();
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ( $(element).hasClass( 'tooltipstered' ) ) {
                $(element).removeClass(errorClass).addClass(validClass).tooltipster('close');
            }
        },
        submitHandler: function (form) {
            //funcao se tudo estiver ok
        }
    });

    $('form[name="confirmar-presenca"]').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true
            },
            telefone: {
                required: true,
                minlength: 8
            },
            ddd: {
                required: true,
                minlength: 2
            },
            adulto: {
                required: true
            },
            crianca: {
                required: true
            }
        },
        messages: {
            telefone: {
                minlength: "Telefone inválido",
            },
        },
        errorPlacement: function (error, element) {
            var ele = element,
                err = error.text();

            if (err != null && err !== '') {
                setTooltipster();
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ( $(element).hasClass( 'tooltipstered' ) ) {
                $(element).removeClass(errorClass).addClass(validClass).tooltipster('close');
            }
        },
        submitHandler: function (form) {
            //funcao se tudo estiver ok
        }
    });

    $('form[name="editar-perfil"]').validate({
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            telephone: {
                required: true,
                minlength: 8
            },
            ddd: {
                required: true,
                minlength: 2
            },
            cpf: {
                required: true,
                minlength: 11
            }
        },
        errorPlacement: function (error, element) {
            var ele = element,
                err = error.text();
                element.addClass('formError');
            // if (err != null && err !== '') {
            //     ele.tooltipster('content', err);
            //     ele.tooltipster('open');
            // }

        },
        unhighlight:  function (element, errorClass, validClass) {
            if ( $(element).hasClass( 'tooltipstered' ) ) {
                $(element).removeClass(errorClass).removeClass('formError').addClass(validClass).tooltipster('close');
            }
        },
        submitHandler: function (form) {

        }
    });

    $('form[name="nova-conta"]').validate({
        rules: {
            num_agencia: {
                required: true,
            },
            num_conta: {
                required: true,
            },
            digito: {
                required: true,
                maxlength: 1
            },
        },
        
        errorPlacement: function (error, element) {
            var ele = element,
                err = error.text();
                
            ele.addClass('formError');
        },
        
        unhighlight:  function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).removeClass('formError').addClass(validClass);
        },
        submitHandler: function (form) {
            //funcao se tudo estiver ok
        }
    });

    $('form[name="editar-conta"]').validate({
        rules: {
            num_agencia: {
                required: true,
            },
            num_conta: {
                required: true,
            },
            digito: {
                required: true,
                maxlength: 1
            },
        },
        
        errorPlacement: function (error, element) {
            var ele = element,
                err = error.text();
                
            ele.addClass('formError');
        },
        
        unhighlight:  function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).removeClass('formError').addClass(validClass);
        },
        submitHandler: function (form) {
            //funcao se tudo estiver ok
        }
    });

    updateObject(validator, validateMaiorIdade);

    /* página de pagamento-2 */
   
    
}