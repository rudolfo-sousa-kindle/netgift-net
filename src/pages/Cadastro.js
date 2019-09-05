import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { signInActionRegister } from '../actions';

import Facebook from "../assets/imgs/facebook-logo.svg";

import HeaderLogin from "../components/HeaderLogin";
import FooterLogin from '../components/FooterLogin';

import $ from 'jquery';
import setMask from '../assets/js/mask';

const styleNone = {
  "opacity": 0,
  "position": 'absolute'
}

class Cadastro extends Component {
  componentDidMount() {
    setMask();
    $.extend($.validator.messages, {
        required: "Campo obrigat&oacuterio",
        equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente",
        minlength: $.validator.format("Por favor, forne&ccedil;a ao menos {0} caracteres"),
    });

    $( 'body' ).removeClass( 'page-criar-festa' );
    
    $.validator.addMethod("email", function (value) {
    var RegExPattern = /^([a-zA-Z0-9._]{2,})+@([a-zA-Z0-9-]{2,})+(\.[a-zA-Z0-9-]+){1,3}$/;

    if (!((value.match(RegExPattern)) && (value != ''))) {
        return false;
    } else {
        return true;
    }
    return false;
    }, "Email inválido");

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

    $('form[name="cadastro"] input').tooltipster({
        animation: 'fade',
        updateAnimation: 'null',
        trigger: 'custom',
        position: 'bottom'
    });

    $('form[name="cadastro"]').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            cpf: {
                required: true,
                cpf: true
            },
            first_name: {
                required: true,
                minlength: 2
            },
            last_name: {
                required: true,
                minlength: 2
            },
            password: {
                required: true
            },
            confirm_password : {
                equalTo : "#password"
            },
            field_checkbox: {
                required: true
            }
        },
        messages: {
            email: {
              minlength: "Email inválido",
            }
        },
        errorPlacement: function (error, element) {
            element.addClass("formError");
            var ele = element,
                err = error.text();
            if (err != null && err !== '') {
                ele.tooltipster('content', err);
                ele.tooltipster('open');
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element)
                .removeClass("formError")
                .removeClass(errorClass)
                .addClass(validClass)
                .tooltipster('close');
        },
        submitHandler: function (form) {

        }
    })
  }

    submit = (values) => {
        if ( $('form[name="cadastro"]').valid() ) {
            this.props.signInActionRegister(values, this.props.history);
        }
    }

    errorMessage() {
        if (this.props.errorMessage) {
            return (
            <div className="info-red">
                {this.props.errorMessage}
            </div>
            );
        }
    }

  
  render() {
    const { handleSubmit } = this.props;
    return (
      <main className="login tipo-cadastro cadastrar bg-login responsive">
        <div className="container">
        <HeaderLogin page="cadastro" />
          <main>
            <div className="txt-login">
                <h1 className="titulo">Falta pouco para você <br /> fazer parte do <span className="titulo-bold">melhor <br /> site de presentes do <br /> Brasil!</span></h1>

                <div className="icon rounded yellow shadow-20">
                    <i className="ng-user-alt"></i>
                </div>

                <p className="p-1">Já tem uma conta?</p>
                <p className="txt-facebook"><Link to="/login" className="faca-login">Faça login</Link> ou entre <br /> com o <Link to="#" className="cyan">Facebook.</Link></p>
            </div>

            <div className="form">
                <form onSubmit={ handleSubmit(this.submit) } className="card-purple ball-top" name="cadastro">
                    <label for="email" className="label-login">Email</label>
                    <Field
                        name="email"
                        component="input"
                        id="email"
                        className="input-login shadow-20"
                        type="email"
                        placeholder="exemplo@email.com.br"
                        required={true}
                    />

                    <label className="label-login" htmlFor="cpf">CPF</label>
                    <Field
                        name="cpf"
                        id="cpf"
                        component="input"
                        className="input-login shadow-20"
                        type="text"
                        required={true}/>

                    <div className="column-form">
                        <div>
                            <label for="first_name" className="label-login">Nome</label>
                            <Field
                                name="first_name"
                                component= "input"
                                id="first_name"
                                className="input-login shadow-20"
                                type="text"
                                placeholder="Digite seu nome"
                                required={true}
                            />
                        </div>

                        <div>
                            <label for="last_name" className="label-login">Sobrenome</label>
                            <Field
                                name="last_name"
                                id="last_name"
                                component= "input"
                                className="input-login shadow-20"
                                type="text"
                                placeholder="Digite seu sobrenome"
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="column-form">
                        <div>
                            <label for="password" className="label-login">Senha</label>
                            <Field
                                name="password"
                                component= "input"
                                className="input-login shadow-20"
                                type="password"
                                id="password"
                                placeholder="Digite uma senha"
                                required={true}
                            />
                        </div>

                        <div>
                            <label for="confirm_password" className="label-login">Repita a senha</label>
                            <Field
                                name="confirm_password"
                                component= "input"
                                className="input-login shadow-20"
                                id="confirm_password"
                                type="password"
                                placeholder="Digite a senha digitada"
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="checkbox">
                        <Field
                            name="field_checkbox"
                            component="input"
                            className="label-checkbox inp-cbx"
                            type="checkbox"
                            id="field_checkbox"
                            required={true}
                            style={styleNone}
                        />

                        <label for="field_checkbox" className="label-checkbox cbx">
                            <span className="checkbox-span">
                                <svg width="12px" height="10px" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </svg>
                            </span>
                            Li e <span className="label-none">estou de acordo com</span> <span className="label-visible-mobile">aceito</span> os <a className="cyan" href="/termos-de-servico" target="_blank">Termos e Condições.</a>
                        </label>

                    </div>

                    <button className="gradient fullcolor comecar-festa"><span>Cadastrar e começar uma festa</span><i className="ng-right-arrow-extend"></i></button>

                    {this.errorMessage()}
                </form>

                <div className="div-facebook">
                    <button className="btn-facebook shadow-20">
                        <img src={Facebook} alt="" className="facebook-svg" />
                        <span>Registrar com o facebook</span>
                    </button>
                </div>
            </div>
          </main>

          <FooterLogin />

        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
  }

const reduxFormSignin = reduxForm({
    form: 'signin'
})(Cadastro);

export default connect(mapStateToProps, {signInActionRegister})(reduxFormSignin);
