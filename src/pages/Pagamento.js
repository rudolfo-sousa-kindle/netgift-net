import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Field, reduxForm} from 'redux-form';

import { fetchParcel } from '../actions/parcelAction';
import { fetchGetEvent, fetchGetCart } from '../actions';
import { fetchCheckoutCart } from '../actions/checkoutCartAction';
import { fetchCheckoutBillet } from '../actions/checkoutBilletAction';

import HeaderCarrinho from '../components/HeaderCarrinho';
import FooterCarrinho from '../components/FooterCarrinho';
import setTooltipster from '../assets/js/plugins';
import setSelect2 from "../assets/js/setSelect2";
import setCard from "../assets/js/setCard";
import setMask from '../assets/js/mask';

import $ from 'jquery';
import '../assets/js/script';
import '../assets/js/plugins';
import 'tippy.js/themes/light.css'

import '../assets/css/style.css';

import card from '../assets/imgs/card.svg';
import boleto from '../assets/imgs/boleto.svg';
import checked from '../assets/imgs/checked.png';


class Pagamento extends Component {
    componentDidMount() {
        setSelect2();
        setCard();
        setMask();

        let id_user = localStorage.getItem('id_user');
        let id_event = localStorage.getItem('id_event');
        this.props.dispatch(fetchGetEvent(this.props.match.params.id));
        this.props.dispatch(fetchGetCart( { id_user, id_event } ));
        this.props.dispatch(fetchParcel());

        $.extend($.validator.messages, {
            required: "Campo obrigat&oacuterio",
            equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente",
            minlength: $
                .validator
                .format("Por favor, forne&ccedil;a ao menos {0} caracteres")
        });

        $.validator.addMethod("email", function 
        (value) {
            var RegExPattern = /^([a-zA-Z0-9._]{2,})+@([a-zA-Z0-9-]{2,})+(\.[a-zA-Z0-9-]+){1,3}$/;

            if (!((value.match(RegExPattern)) && (value != ''))) {
                return false;
            } else {
                return true;
            }
            return false;
        }, "Email inválido");

        $('form[name="form-cartao"] input').tooltipster({
            animation: 'fade',
            updateAnimation: 'null',
            trigger: 'custom',
            position: 'bottom'
        });
    
        $('form[name="form-cartao"] select').tooltipster({
            animation: 'fade',
            updateAnimation: 'null',
            trigger: 'custom',
            position: 'bottom'
        });

        $('form[name="form-cartao"]').validate({
            rules: {
                card_num: {
                    required: true,
                    minlength: 14,
                    cartaoCredito: true
                },
                card_name: {
                    required: true,
                    minlength: 2
                },
                card_val: {
                    required: true,
                    minlength: 4
                },
                card_cvc: {
                    required: true,
                    minlength: 3
                },
                addr_cep: {
                    required: true,
                    minlength: 8
                },
                addr_nume: {
                    required: true
                },
                msg_tele: {
                    required: true,
                    minlength: 10
                },
                msg_nome: {
                    required: true,
                    minlength: 2 
                },
                msg_email: {
                    required: true,
                },
                msg_mens: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                number: {
                    minlength: "Cartão inválido"
                }
            },
            errorPlacement: function (error, element) {
                var ele = element,
                    err = error.text();
    
                // if (err != null && err !== '') {
                //     setTooltipster();
                //     ele.tooltipster('content', err);
                //     ele.tooltipster('open');
                // }

                ele.addClass('formError')
            },
            unhighlight: function (element, errorClass, validClass) {
                if ( $(element).hasClass( 'tooltipstered' ) ) {
                    $(element).removeClass(errorClass).removeClass('formError').addClass(validClass);
                }
            },
            submitHandler: function (form) {
            }
        });

        $('form[name="form-boleto"]').validate({
            rules: {
                bol_nome: {
                    required: true,
                    minlength: 2
                },
                bol_cpf: {
                    required: true,
                    minlength: 11
                },
                bol_email: {
                    required: true
                },
                msg_nome: {
                    required: true,
                    minlength: 2
                },
                msg_tele: {
                    required: true,
                },
                msg_mens: {
                    required: true,
                    minlength: 5
                }
            },
            errorPlacement: function (error, element) {
                var ele = element,
                    err = error.text();
                    ele.addClass('formError')
                // if (err != null && err !== '') {
                //     ele.tooltipster('content', err);
                //     ele.tooltipster('open');
                // }
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).removeClass('formError')
                if ( $(element).hasClass( 'tooltipstered' ) ) {
                }
            },
            submitHandler: function (form) {
            }
        })

        $("#cep").blur(function () {
            //Nova variável "cep" somente com dígitos.
            var cep = $(this).val().replace(/\D/g, '');
            //Verifica se campo cep possui valor informado.
            if (cep != "") {
                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;
                //Valida o formato do CEP.
                if (validacep.test(cep)) {
                    //Preenche os campos com "..." enquanto consulta webservice.
                    $("#rua, [name='addr_ende']").val("...");
                    $("#bairro, [name='addr_bair']").val("...");
                    $("#cidade, [name='addr_cida']").val("...");
                    $("#uf, [name='addr_esta']").val("...");
                    //Consulta o webservice viacep.com.br/
                    $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
                        if (!("erro" in dados)) {
                            $("#rua, [name='addr_ende']").val(dados.logradouro);
                            $("#bairro, [name='addr_bair']").val(dados.bairro);
                            $("#cidade, [name='addr_cida']").val(dados.localidade);
                            $("#uf, [name='addr_esta']").val(dados.uf);
                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulário_cep();
                            // $("#cep").tooltipster('content', "CEP não encontrado");
                            // $("#cep").tooltipster('open');
                        }
                    });
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    // $(this).tooltipster('content', "CEP inválido");
                    // $(this).tooltipster('open');
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        });
        
        
        $("#cep").focus(function () {
            //$(this).tooltipster('close');
        });    
    
        function limpa_formulário_cep() {
            // Limpa valores do formulário de cep.
            $("#uf, [name='addr_esta']").val("");
            $("#cidade, [name='addr_cida']").val("");
            $("#bairro, [name='addr_bair']").val("");
            $("#rua, [name='addr_ende']").val("");
        }
    }

    sendStorage() {
        localStorage.setItem('objGifts', JSON.stringify(this.props.getCart.item.cart));
    }

    paymentCard() {
        let inputs = document.querySelectorAll('form[name="form-cartao"] input[required]');
        inputs = Array.from(inputs);

        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            this.sendStorage();

            let objPaymentCart = {};
            objPaymentCart.card_num = $('[name="card_num"]').val();
            objPaymentCart.card_name = $('[name="card_name"]').val();
            objPaymentCart.card_val = $('[name="card_val"]').val();
            objPaymentCart.card_cvc = $('[name="card_cvc"]').val();
            objPaymentCart.qty_parcel = $('.select2-selection__rendered').html();
            objPaymentCart.addr_cep = $('[name="addr_cep"]').val();
            objPaymentCart.addr_ende = $('[name="addr_ende"]').val();
            objPaymentCart.addr_comp = $('[name="addr_comp"]').val();
            objPaymentCart.addr_bair = $('[name="addr_bair"]').val();
            objPaymentCart.addr_cida = $('[name="addr_cida"]').val();
            objPaymentCart.addr_esta = $('[name="addr_esta"]').val();
            objPaymentCart.msg_nome = $('[name="msg_nome"]').val();
            objPaymentCart.msg_email = $('[name="msg_email"]').val();
            objPaymentCart.msg_tele = $('[name="msg_tele"]').val();
            objPaymentCart.msg_mens = $('[name="msg_mens"]').val();

            let id_user = localStorage.getItem('id_user');
            let id_event = localStorage.getItem('id_event');
            
            this.props.fetchCheckoutCart( { id_user, id_event }, objPaymentCart, this.props.history );

            let total  = document.querySelector('#total').innerHTML
            let pagamento = document.querySelector('.pagamento.active img').alt;
            let parcelas = document.querySelector('#select2--container').innerHTML;
            localStorage.setItem('total', total);
            localStorage.setItem('pagamento', pagamento);
            localStorage.setItem('parcelas', parcelas);
        }  
    }

    paymentBillet() {
        let inputs = document.querySelectorAll('form[name="form-boleto"] input[required]');
        inputs = Array.from(inputs);

        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if(arrayInputs) {
            this.sendStorage();
            let objPaymentBillet = {};

            objPaymentBillet.bol_nome = $('[name="bol_nome"]').val();
            objPaymentBillet.bol_cpf = $('[name="bol_cpf"]').val();
            objPaymentBillet.bol_email = $('[name="bol_email"]').val();
            objPaymentBillet.msg_nome = $('[name="msg_nome"]').val();
            objPaymentBillet.msg_email = $('[name="msg_email"]').val();
            objPaymentBillet.msg_tele = $('[name="msg_tele"]').val();
            objPaymentBillet.msg_mens = $('[name="msg_mens"]').val();

            let id_user = localStorage.getItem('id_user');
            let id_event = localStorage.getItem('id_event');
            
            this.props.fetchCheckoutBillet( { id_user, id_event }, objPaymentBillet, this.props.history );

            let total = document.querySelector('#total').innerHTML;
            let pagamento = document.querySelector('.pagamento.active img').alt;
            localStorage.setItem('total', total);
            localStorage.setItem('pagamento', pagamento);
        }
    }
    
    render() {
        // this.validateForm()

        const { error, loading, parcel, getCart, getEvent  } = this.props;
        const { items } = parcel;
        const { id } = this.props.match.params;
        const event_checkout_link = "/festa/" + id + "/confirmacao";
        const hasProperty = getCart.hasOwnProperty('item');
        const $keys = Object.keys(items);
        const id_payment = localStorage.getItem('id_payment');
        let valor_total = '';

        localStorage.getItem('id_user');
        localStorage.getItem('id_event');
        
        if(id_payment === 'boleto') {
            $('.boleto').trigger('click');
        }

        if(getCart.item !== undefined) {
            valor_total = getCart.item.valor_total;
        }

        if(getEvent.getEvent.event !==  undefined) {
            var name = getEvent.getEvent.event.EVENTO.owners[0].name;
        }

        return (
            <div className="area-convidado pagamento-1 pagamento-2">
                <HeaderCarrinho page="pagamento" nameHeader={name} />

                <main>
                    <div className="container grid grid-left-bigger">
                        <div className="nav-etapas">
                            <div className="etapa flex-center">
                                <div className="number flex flex-center active">
                                    <img src={checked} alt="" />
                                </div>
                                <p>Carrinho</p>
                            </div>

                            <div className="etapa flex-center">
                                <div className="number flex flex-center active">
                                    <span>2</span>
                                </div>
                                <p>Pagamento</p>
                            </div>

                            <div className="etapa flex-center">
                                <div className="number flex flex-center">
                                    <span>3</span>
                                </div>
                                <p>Confirmação</p>
                            </div>
                        </div>

                        <div className="intro-main intro-main-mobile">
                            <h2>Pagamento</h2>

                            <p className="subtitulo">Escolha a forma de pagamento</p>
                        </div>

                        <div className="form-pagamento">
                            <div className="intro-main">
                                <h2>Pagamento</h2>

                                <p className="subtitulo">Escolha a forma de pagamento</p>

                                <small>Como deseja pagar?</small>
                            </div>
                            <div className="opcao-pagamento">
                                <div className="pagamento card active">
                                    <img src={card} alt="Cartão de crédito" />
                                </div>

                                <div className="pagamento boleto">
                                    <img src={boleto} alt="Boleto" />
                                </div>
                            </div>

                            <div className="form-pagamento-cartao">
                                <div>
                                    <p className="subtitulo first">Preencha os dados do cartão</p>
                                    <form className="form" name="form-cartao" onSubmit={() => this.paymentCard()}>
                                        <div className='card-wrapper'></div>
                                        <div className="form-cartao">
                                            <div>
                                                <label htmlFor="number" className="label-first">Número do cartão</label>
                                                <Field
                                                    name="card_num"
                                                    id="number"
                                                    component="input"
                                                    type="text"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="grid grid-left-bigger input-expiry-desk">
                                                <div>
                                                    <label htmlFor="name">Nome impresso no cartão</label>
                                                    <Field
                                                        name="card_name"
                                                        id="name"
                                                        component="input"
                                                        type="text"
                                                        required={true}
                                                    />
                                                </div>

                                                <div className="validade">
                                                    <label htmlFor="expiry">Validade</label>
                                                   <Field
                                                        name="card_val"
                                                        id="expiry"
                                                        component="input"
                                                        type="text"
                                                        maxLength="7"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-middle grid-input-mobile">

                                            </div>

                                            <div className="grid grid-right-bigger input-cvc-desk">
                                                <div className="cvc">
                                                    <label htmlFor="">cvc <i className="ng-help-circled"></i></label>
                                                    <Field
                                                        name="card_cvc"
                                                        id="cvc"
                                                        component="input"
                                                        type="text"
                                                        required={true}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="">Parcelas</label>
                                                    <select name="qty_parcel" id="" className="custom-select bg-white">
                                                        {
                                                            $keys.map((parcel) => {
                                                                return <option value={items[parcel]}  key={items[parcel]} >{items[parcel]}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-endereco form-width">
                                            <p className="subtitulo">Agora o endereço de cobrança do cartão de crédito</p>

                                            <div>
                                                <label htmlFor="cep" className="label-first">CEP</label>

                                                <Field
                                                    name="addr_cep"
                                                    id="cep"
                                                    component="input"
                                                    type="text"
                                                    required={true}
                                                    maxLength="8"
                                                />
                                            </div>

                                            <div className="grid grid-left-bigger">
                                                <div>
                                                    <label htmlFor="endereco">Endereço</label>
                                                    <Field
                                                        name="addr_ende"
                                                        id="endereco"
                                                        component="input"
                                                        type="text"
                                                        required={true}
                                                        disabled={true}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="numero_casa">Número</label>
                                                    <Field
                                                        name="addr_nume"
                                                        id="numero_casa"
                                                        component="input"
                                                        type="text"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-right-bigger">
                                                <div>
                                                    <label htmlFor="complemento">Complemento</label>
                                                    <Field
                                                        name="addr_comp"
                                                        id="complemento"
                                                        component="input"
                                                        type="text"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="bairro">Bairro</label>
                                                    <Field
                                                        name="addr_bair"
                                                        id="bairro"
                                                        component="input"
                                                        type="text"
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-left-bigger">
                                                <div>
                                                    <label htmlFor="cidade">Cidade</label>
                                                    <Field
                                                        name="addr_cida"
                                                        id="cidade"
                                                        component="input"
                                                        type="text"
                                                        disabled={true}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="estado">Estado</label>
                                                    <Field
                                                        name="addr_esta"
                                                        id="estado"
                                                        component="input"
                                                        type="text"
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-mensagem form-width">
                                            <p className="subtitulo">Para finalizar, envie uma mensagem aos noivos</p>

                                            <div>
                                                <label htmlFor="nome_convidado" className="label-first">Nome do convidado</label>
                                                <Field
                                                    name="msg_nome"
                                                    id="nome_convidado"
                                                    component="input"
                                                    type="text"
                                                    required={true}
                                                />
                                            </div>

                                            <div className="grid grid-left-bigger">
                                                <div>
                                                    <label htmlFor="email_convidado">email</label>
                                                    <Field
                                                        name="msg_email"
                                                        id="email_convidado"
                                                        component="input"
                                                        type="email"
                                                        required={true}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="telefone">telefone</label>
                                                    <Field
                                                        name="msg_tele"
                                                        id="telefone"
                                                        component="input"
                                                        type="tel"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="mensagem">Deixe uma mensagem</label>
                                                <Field
                                                    name="msg_mens"
                                                    id="mensagem"
                                                    component="textarea"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-width flex jc-end">
                                            <button className="gradient fullcolor flex flex-center flex-space btn-pagamento" onClick={() => this.sendStorage()}>Pagar e prensentear <i className="ng-right-arrow-extend"></i></button>
                                           
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="form-pagamento-boleto">
                                <form className="form" name="form-boleto" onSubmit={() => this.paymentBillet()}>
                                    <div className="grid grid-middle">
                                        <div>
                                            <label htmlFor="nome">Nome completo</label>
                                            <Field
                                                name="bol_nome"
                                                id="nome"
                                                component="input"
                                                type="text"
                                                required={true}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="cpf">cpf</label>
                                            <Field
                                                name="bol_cpf"
                                                id="cpf"
                                                component="input"
                                                type="text"
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            name="bol_email"
                                            id="email"
                                            component="input"
                                            type="email"
                                            required={true}
                                        />
                                    </div>

                                    <div className="form-mensagem form-width">
                                        <p className="subtitulo">Para finalizar, envie uma mensagem aos noivos</p>

                                        <div>
                                            <label htmlFor="nome_convidado_boleto" className="label-first">Nome do convidado</label>
                                            <Field
                                                name="msg_nome"
                                                id="nome_convidado_boleto"
                                                component="input"
                                                type="text"
                                                required={true}
                                            />
                                        </div>

                                        <div className="grid grid-left-bigger">
                                            <div>
                                                <label htmlFor="email_convidado_boleto">email</label>
                                                <Field
                                                    name="msg_email"
                                                    id="email_convidado_boleto"
                                                    component="input"
                                                    type="email"
                                                    required={true}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="telefone_convidado">telefone</label>
                                                <Field
                                                    name="msg_tele"
                                                    id="telefone_convidado"
                                                    component="input"
                                                    type="tel"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="mensagem_convidado">Deixe uma mensagem</label>
                                            <Field
                                                name="msg_mens"
                                                id="mensagem_convidado"
                                                component="textarea"
                                                type="text"
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-width flex jc-end">
                                        <button className="gradient fullcolor flex flex-center flex-space">Imprimir boleto</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="resumo-compra flex-start">
                            <div className="title-resumo-compra">
                                <p>Resumo da compra</p>
                                <div className="line"></div>
                            </div>
                            {
                                hasProperty === true ? getCart.item.cart.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <div className="produto flex-center">
                                                <p>{item.name}</p>

                                                <div className="value">
                                                    <i className="ng-money-circled"></i>
                                                    <span className="price">{item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                                </div>
                                            </div>
                                        </div>    
                                    )
                                })
                                :'nenhum presente no carrinho.'
                            }
                            <div className="valor-total flex">
                                <span>Total: &nbsp;</span>
                                <span id="total">{valor_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                </span>
                            </div>
                            
                        </div>

                        <small className="small-mobile">Como deseja pagar?</small>
                    </div>
                </main>

                <FooterCarrinho />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    getEvent: state,
    parcel: state.parcel,
    getCart: state.getCart,
    checkoutCart: state.checkoutCart,
    checkoutBillet: state.checkoutBillet,
})
  
const reduxFormPayment = reduxForm({form: 'checkoutCart'})(Pagamento);

export default connect(mapStateToProps, {fetchParcel, fetchGetEvent, fetchCheckoutCart, fetchCheckoutBillet})(reduxFormPayment);