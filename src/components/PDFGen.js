import React, { Component } from 'react';

class HtmlToPdf extends Component {
  convertHtmlToPdf(e) {
    var total_confirmado = 0;
    var total_receita    = 0;
    var total_retido     = 0;
    var HTML = '<table><thead><tr style="border-top: 1px solid #000;"><th>Confirmado</th></tr></thead><tr style="border-top: 1px solid #000;"><td>Data</td><td>Código</td><td>Descrição</td><td>Valor</td></tr>';
      HTML += this.props.confirmado.length !== 0 && 0 !== Object.keys( this.props.confirmado ).length ? 
      this.props.confirmado.map((item) => {
          total_confirmado += item.value;

        return( '<tr style="border-top: 1px solid #000;"><td></td><td>' + item.zoop_id + '</td><td>' + item.description + '</td><td>' + item.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})+ '</td></tr>' );
      })
      : '';

      HTML += '<tr style="border-top: 1px solid #000;"><td><p>Saldo do período</p><p>' + total_confirmado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) + '</p></td></tr></table><br><hr><br><table><thead><tr style="border-top: 1px solid #000;"><th>Receita</th></tr></thead><tr style="border-top: 1px solid #000;"><td>Data</td><td>Código</td><td>Descrição</td><td>Valor</td></tr>';
      HTML += this.props.receita.length !== 0 && 0 !== Object.keys( this.props.receita ).length ? 
      this.props.receita.map((item) => {
          total_receita += item.value;
          return (
              '<tr style="border-top: 1px solid #000;"><td></td><td>' + item.zoop_id + '</td><td>' + item.description + '</td><td>-' + item.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})+ '</td></tr>'
          );
      })
      : '';
      HTML += '<tr style="border-top: 1px solid #000;"><td><p>Receita do período</p><p>' + total_receita.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) + '</p></td></tr></table><br><hr><br><table><thead><tr style="border-top: 1px solid #000;"><th>Retido</th></tr></thead><tr style="border-top: 1px solid #000;"><td>Data</td><td>Código</td><td>Descrição</td><td>Valor</td></tr>';
      HTML += this.props.retido.length !== 0 && 0 !== Object.keys( this.props.retido ).length ? 
          this.props.retido.map((item) => {
              total_retido += item.value;
              return (
                  '<tr style="border-top: 1px solid #000;"><td></td><td>' + item.zoop_id + '</td><td>' + item.description + '</td><td>' + item.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})+ '</td></tr>'
              )
          })
          : '';
      HTML += '<tr style="border-top: 1px solid #000;"><td><p>Retido do período</p><p>' + total_retido.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) + '</p></td></tr></table><br><hr><br>';  

    fetch("https://v2018.api2pdf.com/wkhtmltopdf/html", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': '169907da-c49b-4406-a1fd-4495575d807c' //Get your API key from https://portal.api2pdf.com
      },
      body: JSON.stringify( {
        "html": HTML,
        "inlinePdf": true,
        "fileName": "Resumo-financeiro.pdf",
        "options": {
          "orientation": "landscape",
          "pageSize": "A4"
        }
      } )
      
    }).then(res=>res.json())
      .then(( res ) => {
        console.log(res.pdf)
        window.open( res.pdf, '_blank' );
      });
  }
  render() {
    return (
      <a onClick={this.convertHtmlToPdf.bind(this)}>Exportar extrato financeiro (PDF)</a>
    );
  }
}

export default HtmlToPdf;