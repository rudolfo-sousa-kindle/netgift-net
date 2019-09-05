import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {signInAction} from '../actions';

import FooterLogin from "../components/FooterLogin";
import HeaderLogin from "../components/HeaderLogin";

import $ from 'jquery';
import validate from 'jquery-validation';
import 'tooltipster';

import '../assets/css/tooltipster.min.css';

import Facebook from "../assets/imgs/facebook-logo.svg";

class Login extends Component {

    submit = (values) => {
        this.props.signInAction(values, this.props.history);
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

    componentDidMount() {
        $.extend($.validator.messages, {
            required: "Campo obrigat&oacuterio",
            equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente",
            minlength: $
                .validator
                .format("Por favor, forne&ccedil;a ao menos {0} caracteres")
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

        $('form[name="login"] input').tooltipster({animation: 'fade', updateAnimation: 'null', trigger: 'custom', position: 'bottom'});

        $('form[name="login"]').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                email: {
                    minlength: "Email inválido"
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

    render() {
        const {handleSubmit} = this.props;
        return (
            <main className="login bg-login responsive">
                <div className="container">
                    <HeaderLogin/>
                    <main>
                        <div className="txt-login">
                            <h1 className="titulo title-mobile">Acesse sua conta</h1>
                            <h2 className="subtitulo">Bem-vindo de volta!</h2>
                            <div className=" icon rounded yellow shadow-20">
                                <i className="ng-user-alt"></i>
                            </div>
                            <p className="p-1">Ainda não tem uma conta?</p>
                            <p className="p-2">Crie sua conta agora mesmo.</p>

                            <Link
                                to="/cadastro"
                                className="gradient border hover-animation btn-criar-conta">
                                <span className="btn-txt-link-criar-conta">Criar conta</span>
                            </Link>
                        </div>

                        <div className="form">
                            <form onSubmit={handleSubmit(this.submit)} className="card-purple" name="login">
                                <label className="label-login">Digite seu email</label>
                                <Field
                                    name="email"
                                    component="input"
                                    className="input-login shadow-20"
                                    type="email"
                                    placeholder="exemplo@email.com.br"
                                    required={true}/>

                                <label className="label-login">Digite a sua senha</label>
                                <Field
                                    name="password"
                                    component="input"
                                    className="input-login shadow-20"
                                    type="password"
                                    required={true}/>

                                <button className="gradient fullcolor comecar-festa">
                                    <span>Entrar</span>
                                    <i className="ng-right-arrow-extend"></i>
                                </button>
                            </form>

                            <div className="div-facebook">
                                <button className="btn-facebook shadow-20">
                                    <img src={Facebook} alt="" className="facebook-svg"/>
                                    <span>Entrar com o facebook</span>
                                </button>
                            </div>

                            <div className="div-esqueceu-senha">
                                <Link to="/recuperar-senha" className="esqueceu-senha cyan">Esqueceu a sua senha? Receba uma nova no seu email</Link>
                            </div>
                        </div>
                    </main>

                    <p className="login-mobile">
                        <span>Ainda não tem uma conta?
                        </span>
                        <Link to="/cadastro" className="cyan">Criar conta</Link>
                    </p>

                    <FooterLogin/>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({form: 'signin'})(Login);

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);
