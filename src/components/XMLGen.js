import React, { Component } from 'react';

class HtmlToXml extends Component {
  export() {
    var convert = require('xml-js');
    console.log( this.props.confirmado )

    var json = {
      'Confirmados': this.props.confirmado,
      'Retidos': this.props.retido,
      'Receita': this.props.receita,
    }
    var options = {compact: true, ignoreComment: true, spaces: 4};
    var result = convert.json2xml(json, options);

    var xmltext = result;
    var pom = document.createElement('a');

    var filename = "Resumo-financeiro.xml";
    var pom = document.createElement('a');
    var bb = new Blob([xmltext], {type: 'text/plain'});

    pom.setAttribute('href', window.URL.createObjectURL(bb));
    pom.setAttribute('download', filename);

    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true; 
    pom.classList.add('dragout');

    pom.click();
  }

  render() {
    return (
      <a onClick={() => {this.export()}}>Exportar extrato financeiro (XML)</a>
    );
  }
}

export default HtmlToXml;