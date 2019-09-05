import React, { Component } from "react";

export default class Progresso extends Component {

  render() {
    return (
      <div className="progresso">
          <div className="barra-progresso"></div>

          <div className="txt-progresso">
              <p className="active">1. Criar conta</p>
              <p>2. Escolher festa</p>
          </div>
      </div>
    );
  }
}
