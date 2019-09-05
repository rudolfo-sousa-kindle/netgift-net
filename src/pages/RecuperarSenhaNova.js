import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { makeRetrievePassAction } from '../actions';
import $ from 'jquery';

import HeaderLogin from "../components/HeaderLogin";
import FooterLogin from "../components/FooterLogin";
import Facebook from "../assets/imgs/facebook-logo.svg";

class RecuperarSenhaNova extends Component {

  submit = (values) => {
    var form_data = {
      user_id: $( '#user_id' ).val(),
      password: $( '#password' ).val()
    }
    this.props.makeRetrievePassAction(form_data, this.props.history);
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
    var user_id = this.props.location.search.split( '?user_id=' );
    return (
      <body class="login recuperar-senha bg-login responsive">
        <div className="container">
        <HeaderLogin />
          <main>

            <div className="txt-login">
                <h1 className="titulo title-mobile">Você está quase lá!</h1>

                <h2 className="subtitulo">Cadastre sua nova senha</h2>

                <div className=" icon rounded yellow shadow-20">
                    <i className="ng-user-alt"></i>
                </div>

                <p className="p-1">Lembrou?</p>
                <p className="p-2">Faça o login na sua conta.</p>

                <Link to="/login" className="gradient border hover-animation btn-criar-conta">
                    <span className="btn-txt-link-criar-conta">Entrar</span>
                </Link>
            </div>

            <div className="form">
                <form className="card-purple" onSubmit={ handleSubmit(this.submit) }>
                    <input type="hidden" className="input-login shadow-20" name="user_id" id="user_id" value={user_id[1]} required />
                    <label for="password" className="label-login">Digite sua nova senha</label>
                    <input type="password" className="input-login shadow-20" name="password" id="password" required />

                    <label for="repeat-password" className="label-login">Repita sua nova senha</label>
                    <input type="password" id="repeat-password" className="input-login shadow-20" name="repeat_password" required />

                    <button className="gradient fullcolor comecar-festa"><span>Salvar e criar nova senha</span><i className="ng-right-arrow-extend"></i></button>
                </form>
            </div>

          </main>

          <p className="login-mobile">Já tem uma conta? <Link to="/login" className="cyan">Faça login</Link></p>

          <FooterLogin />

        </div>
      </body>
    );
  }
}
function mapStateToProps(state) {
  return { errorMessage: state.makeRetrievePass.error };
}

const reduxFormMakeRetrievePass = reduxForm({
  form: 'makeRetrievePass'
})(RecuperarSenhaNova);

export default connect(mapStateToProps, {makeRetrievePassAction})(reduxFormMakeRetrievePass);
