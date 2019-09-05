import $ from 'jquery';

export default function setMask() {
    //mask
    $('[name="cep"], [name="addr_cep"]').mask('00000-000');
    $('[name="cpf"], [name="bol_cpf"]').mask('000.000.000-00');
    $('[name="fim-periodo"], [name="inicio-periodo"]').mask('00/00/0000');
    $( '[name=valor-presente], [name=valor-presente]' ).mask( '000.000.000.000.000,00', {reverse: true} );
    var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };
    
    $('[name="telefone"], [name="telefone_convidado"], [name="msg_tele"]').mask(SPMaskBehavior, spOptions);

    var singlePhone = function (val) {
            return val.replace(/\D/g, '').length === 9 ? '00000-0000' : '0000-00009';
        },
        singlePhoneOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(singlePhone.apply({}, arguments), options);
            }
        };
    
    $('.editar-perfil .telefone').mask(singlePhone, singlePhoneOptions);
}
