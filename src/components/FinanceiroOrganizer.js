import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import HtmlToPdf from './PDFGen'
import HtmlToXml from './XMLGen'
import { CSVLink, CSVDownload } from "react-csv";

import { fetchResumeFinancial } from '../actions/resumeFinancialAction';
import setSelect2 from "../assets/js/setSelect2";

import "../assets/css/jquery-ui.css";

class FinanceiroOrganizer extends Component {
    componentDidMount() {
        this.props.fetchResumeFinancial(43, 10, 1);
        setSelect2();
    }

    render() {

        const { resumeFinancial } = this.props;

        var price = 0;
        var retido = [];
        var receita = [];
        var confirmado = [];
        var csv        = [['Confirmados'], ['description','id','name','status','status_txt','type','value','zoop_id']];

        var total_confirmado = 0;
        var total_retido = 0;
        var total_receita = 0;

        if (resumeFinancial.items.length !== 0 && 0 !== Object.keys( resumeFinancial.items.financial ).length) {
            resumeFinancial.items.financial.map(item => {
                switch( item.status ) {
                    case 0:
                        retido.push( item );
                        break;
                    case 1:
                        confirmado.push( item );
                        break;
                    default:
                        receita.push( item );
                        break;
                }
            })
        }

        return (

            <div className="resumo-financeiro">
                <div className="container">
                    <div className="summary">
                        <div className="left">
                            <h2 className="title">Resumo Financeiro</h2>
                        </div>

                        <div className="select-mobile">
                            <div className="flex flex-center flex-space">
                                <p>Resumo</p>
                                <i className="ng-down-open"></i>
                            </div>

                            <div className="brief flex flex-end">
                                <div className="brief content">
                                    <p>Resumo</p>
                                    <div className="brief-card icon">
                                        <div className="brief-content">
                                            <div className="flex">
                                                <div className="brief-icon">
                                                    <i className="ng-gift c-yellow"></i>
                                                </div>
                                                <div className="flex-column">
                                                    <span>{ resumeFinancial.items.length !== 0 ? resumeFinancial.items.dashboard.total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) : 'R$ 0,00'} </span>
                                                    <p>Em presentes comprados</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="brief content">
                                    <p></p>
                                    <div className="brief-card icon">
                                        <div className="brief-content">
                                            <div className="flex">
                                                <div className="brief-icon">
                                                    <i className="ng-bars c-yellow"></i>
                                                </div>
                                                <div className="flex-column">
                                                    <span>60</span>
                                                    <p>Pessoas já presentearam</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="brief content">
                                    <p></p>
                                    <div className="brief-card icon two">
                                        <div className="brief-content flex flex-center">
                                            <div className="flex">
                                                <div className="brief-icon">
                                                    <i className="ng-bag c-yellow"></i>
                                                </div>
                                                <div className="flex-column">
                                                    <span>97</span>
                                                    <p>Adultos</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="brief-icon">
                                                    <i className="ng-ballon c-yellow"></i>
                                                </div>
                                                <div className="flex-column">
                                                    <span>23</span>
                                                    <p>Crianças</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="brief flex flex-end">
                            <div className="brief content">
                                <p>Resumo</p>
                                <div className="brief-card icon">
                                    <div className="brief-content">
                                        <div className="flex">
                                            <div className="brief-icon">
                                                <i className="ng-money-circled c-yellow"></i>
                                            </div>
                                            <div className="flex-column">
                                            <span>{ resumeFinancial.items.length !== 0 ? resumeFinancial.items.dashboard.total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) : 'R$ 0,00'} </span>
                                                <p>Em presentes comprados</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="brief content">
                                <p></p>
                                <div className="brief-card icon">
                                    <div className="brief-content">
                                        <div className="flex">
                                            <div className="brief-icon">
                                                <i className="ng-money-circled c-yellow"></i>
                                            </div>
                                            <div className="flex-column">
                                                <span>{ resumeFinancial.items.length !== 0 ? resumeFinancial.items.dashboard.recebido.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) : 'R$ 0,00'}</span>
                                                <p>Em pagamentos efetuados</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="brief content">
                                <p>Financeiro</p>
                                <div className="brief-card icon">
                                    <div className="brief-content">
                                        <div className="flex">
                                            <div className="brief-icon">
                                                <i className="ng-money-circled c-yellow"></i>
                                            </div>
                                            <div className="flex-column">
                                                <span>{ resumeFinancial.items.length !== 0 ? resumeFinancial.items.dashboard.disponivel.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) : 'R$ 0,00'}</span>
                                                <p>Em pagamentos a receber</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-space mB50 table-prices">
                        <div className="filtro">
                            <div className="config">
                                <div className="config-accordion without-toggle">

                                    <div className="config-item">
                                        <div className="config-item-title flex flex-center flex-space">
                                            <p className="fz20">Filtro</p>
                                            <i className="ng-down-open"></i>
                                        </div>
                                        <div className="config-item-content">
                                            <div className="divider"></div>

                                            <form>
                                                <p className="filtro-title">Por lançamentos</p>

                                                <div className="flex flex-column w100">
                                                    <label htmlFor="lancamentos">Lançamentos</label>
                                                    <select className="custom-select uppercase bg-white flat w100" id="lancamentos" name="lancamentos" required>

                                                    <option value="3">Últimos 3 dias</option>
                                                    <option value="7">Últimos 7 dias</option>
                                                    <option value="30">Últimos 30 dias</option>
                                                    <option value="60">Últimos 60 dias</option>
                                                    <option value="90">Últimos 90 dias</option>
                                                </select>
                                                </div>

                                                <p className="filtro-title mT40">Por período</p>

                                                <div className="flex flex-column">
                                                    <label htmlFor="periodo-from">Início</label>
                                                    <input type="text" id="periodo-from" className="custom-date-from w100" name="periodo_from" />
                                                </div>

                                                <div className="flex flex-column">
                                                    <label htmlFor="periodo-to">Término</label>
                                                    <input type="text" id="periodo-to" className="custom-date-to w100" name="periodo_to" />
                                                </div>

                                                <button className="fullcolor gradient w100 mT30">Buscar</button>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="historico">
                            <div className="flex mB50">
                                <button className="pill status green"><span>Recebido</span></button>
                            </div>

                            <div className="pX30 columns-4 mB15 title-grid">
                                <div className="title">Data</div>
                                <div className="title">Código</div>
                                <div className="title">Descrição</div>
                                <div className="title">Valor</div>
                            </div>
                            
                            {
                                confirmado.length !== 0 && 0 !== Object.keys( confirmado ).length ? 
                                confirmado.map((item) => {
                                    total_confirmado += item.value;
                                    csv.push( [item.description, item.id, item.name, item.status, item.status_txt, item.type, item.value, item.zoop_id] );
                                    return (
                                        
                                        <div className="card bgwhite" key={item.id}>
                                            <div className="pX30 columns-4 w100">
                                                <p></p>
                                                <p className="zoop-id" title={item.zoop_id}>{item.zoop_id}</p>
                                                <p>{item.description}</p>
                                                <p>{item.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                                            </div>
                                        </div>

                                    )
                                })
                                : ''
                            }


                            <div className="pX30 w100 flex jc-end columns-4 total">
                                <p>Saldo do período</p>
                                <p>{total_confirmado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                            </div>


                            <div className="flex mB50">
                                <button className="pill status yellow"><span>Receita</span></button>
                            </div>

                            <div className="pX30 columns-4 mB15 title-grid">
                                <div className="title">Data</div>
                                <div className="title">Código</div>
                                <div className="title">Descrição</div>
                                <div className="title">Valor</div>
                            </div>
                            <div className="card bgwhite">
                                {
                                    receita.length !== 0 && 0 !== Object.keys( receita ).length ? 
                                    receita.map((item, index) => {
                                        if ( 0 === index ) {
                                            csv.push( ['Receita'] )
                                            csv.push( ['description','id','name','status','status_txt','type','value','zoop_id'] )
                                        }
                                        total_receita += item.value;
                                        csv.push( [item.description, item.id, item.name, item.status, item.status_txt, item.type, item.value, item.zoop_id] );
                                        return (
                                            <div className="pX30 columns-4 w100">
                                                <p></p>
                                                <p className="zoop-id" title={item.zoop_id}>{item.zoop_id}</p>
                                                <p>{item.description}</p>
                                                <p className="negative">-{item.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                                            </div>
                                        )
                                    })
                                    : ''
                                }
                            </div>


                            <div className="pX30 w100 flex jc-end columns-4 total">
                                <p>Receita do período</p>
                                <p>{total_receita.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                            </div>

                            <div className="flex mB50">
                                <button className="pill status blue"><span>Retido</span></button>
                            </div>

                            <div className="pX30 columns-4 mB15 title-grid">
                                <div className="title">Data</div>
                                <div className="title">Código</div>
                                <div className="title">Descrição</div>
                                <div className="title">Valor</div>
                            </div>
                            <div className="card bgwhite">
                                {
                                    retido.length !== 0 && 0 !== Object.keys( retido ).length ? 
                                    retido.map((item, index) => {
                                        if ( 0 === index ) {
                                            csv.push( ['Retido'] )
                                            csv.push( ['description','id','name','status','status_txt','type','value','zoop_id'] )
                                        }
                                        total_retido += item.value;
                                        csv.push( [item.description, item.id, item.name, item.status, item.status_txt, item.type, item.value, item.zoop_id] );
                                        return (
                                            <div className="pX30 columns-4 w100">
                                                <p></p>
                                                <p className="zoop-id" title={item.zoop_id}>{item.zoop_id}</p>
                                                <p>{item.description}</p>
                                                <p>{item.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                                            </div>
                                        )
                                    })
                                    : ''
                                }
                            </div>
                            <div className="pX30 w100 flex jc-end columns-4 total">
                                <p>Retido do período</p>
                                <p>{total_retido.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                            </div>

                            <div className="export">
                                <HtmlToPdf 
                                    confirmado={confirmado}
                                    retido={retido}
                                    receita={receita}
                                /> <span>|</span>
                                <CSVLink data={csv} className="text-gradient underline">Exportar extrato financeiro (CSV)</CSVLink> <span>|</span>
                                <HtmlToXml
                                    confirmado={confirmado}
                                    retido={retido}
                                    receita={receita}
                                />
                            </div>


                        </div>
                    </div>

                    <div className="footer-logged">
                        <p>&copy; 2018-2019 NETGIFT - CNPJ 99.304.41/0001-00</p>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        resumeFinancial: state.resumeFinancial,
    };
}

export default connect(mapStateToProps,  {fetchResumeFinancial})(FinanceiroOrganizer);