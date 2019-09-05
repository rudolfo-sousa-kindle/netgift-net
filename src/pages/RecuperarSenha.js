import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { retrievePassAction } from '../actions';

import HeaderLogin from "../components/HeaderLogin";
import FooterLogin from '../components/FooterLogin';

import Facebook from "../assets/imgs/facebook-logo.svg";

class RecuperarSenha extends Component {

  submit = (values) => {
    this.props.retrievePassAction(values, this.props.history);
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
      <body className="login recuperar-senha bg-login responsive">
        <div className="container">
        <HeaderLogin />
          <main>

            <div className="txt-login">
                <h1 className="titulo title-mobile">Ih, esqueceu a sua <br/> senha?</h1>

                <h2 className="subtitulo">Vamos te ajudar a recuperá-la!</h2>

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
                <form onSubmit={ handleSubmit(this.submit) } className="card-purple">
                    <label for="" className="label-login">Digite seu email</label>
                    <Field
                      name="email"
                      component= "input"
                      className="input-login shadow-20"
                      type="email"
                      placeholder="exemplo@email.com.br"
                      required={true}
                    />

                    <button className="gradient fullcolor comecar-festa"><span>Iniciar recuperação de senha</span><i className="ng-right-arrow-extend"></i></button>
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
  return { errorMessage: state.retrievePass.error };
}

const reduxFormRetrievePass = reduxForm({
  form: 'retrievePass'
})(RecuperarSenha);

export default connect(mapStateToProps, {retrievePassAction})(reduxFormRetrievePass);
