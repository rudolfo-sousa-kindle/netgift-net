import React, { Component } from "react";
import { Link } from "react-router-dom";
import setSelect2 from "../assets/js/setSelect2";
import {Field, reduxForm} from 'redux-form';
import { connect } from "react-redux";
import Loader from "./Loader";
import GridCards from "./GridCards";
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import Extrato from "./ExtratoAdmin";
import {fetchUserCount, fetchUserSites} from "../actions/usersActions";
import {fetchViewCount} from "../actions/viewsActions";
import { fetchExtratoAbstract } from "../actions/extratoActions";
import { fetchExtrato } from "../actions/extratoActions";

import { fetchFinancial } from "../actions/financialActions";
import $ from "jquery";

class FinanceiroAdmin extends Component {

  componentDidMount(){
    // setSelect2();
    this.props.fetchUserCount();
    this.props.fetchViewCount();
    this.props.fetchUserSites();
    this.props.dispatch(fetchExtrato(null, null, null, null, null, null, 1, 1));
    this.props.fetchExtratoAbstract( null, null, null, null, null, null, 1, 1 );
  }

  state = {
    page:2,
    financial : [],
    dashboard : {},
    dashboard_old : {},
    revenue: { current: '--', old: '--', percent: '--' },
    receive: { current: '--', old: '--', percent: '--' },
    payments: { current: '--', old: '--', percent: '--' }
  };

    change = ( field ) => {
        let periodo = field.value;
        this.props.fetchUserCount( periodo );
        this.props.fetchExtratoAbstract( null, null, null, null, null, null, 1, periodo );
    }

    filter = () => {
        var search         = $( '#nome-usuario' ).val();
        var date_start     = $( '#inicio-periodo' ).val();
        var date_end       = $( '#fim-periodo' ).val();
        var payment_type   = $( '#select2-tipo-pagamento-container' ).val();
        var payment_method = $( '#select2-forma-pagamento-container' ).val();
        var status         = $( '#status' ).val();
        var periodo        = $( "#filter-date input[name=filter_date]" ).val();

        search     = '' === search ? null : search;
        date_start = '' === date_start ? null : date_start;
        date_end   = '' === date_end ? null : date_end;
        
        this.props.fetchExtratoAbstract( search, date_start, date_end, payment_type, payment_method, status, 1, parseInt( periodo ) );
        this.state.page = 2;
    }

    paginate = () => {
        var search         = $( '#nome-usuario' ).val();
        var date_start     = $( '#inicio-periodo' ).val();
        var date_end       = $( '#fim-periodo' ).val();
        var payment_type   = $( '#select2-tipo-pagamento-container' ).val();
        var payment_method = $( '#select2-forma-pagamento-container' ).val();
        var status         = $( '#status' ).val();
        var periodo        = $("#filter-date input[name=filter_date]").val();

        search         = '' === search ? null : search;
        date_start     = '' === date_start ? null : date_start;
        date_end       = '' === date_end ? null : date_end;
        payment_type   = '' === payment_type ? null : payment_type;
        payment_method = '' === payment_method ? null : payment_method;
        status         = '' === status ? null : status;
        periodo        = '' === periodo ? null : periodo;
        
        this.props.fetchExtratoAbstract( search, date_start, date_end, payment_type, payment_method, status, this.state.page, parseInt( periodo ) );
        this.state.page++;
    }

  render() {
    const { extrato, loading, error, extratoOld } = this.props.extrato;
    const {total, totalPassado, porcentagem, totalSites, totalSitePassado, porcentagemSites} = this.props.usersCount;
    var { financial, dashboard }     = extrato;
    this.state.dashboard             = dashboard;
    const extratoAbstract = this.props.extratoAbstract;
    
    if ( undefined !== extratoOld ) {
        this.state.dashboard_old = extratoOld.dashboard;
    }
    
    if(undefined !== extratoAbstract && undefined !== extratoAbstract.dashboard.last_period ){
        this.state.payments.old = extratoAbstract.dashboard.last_period.users.recebido.toFixed(2).replace(".", ",");
        this.state.revenue.old  = extratoAbstract.dashboard.last_period.users.disponivel.toFixed(2).replace(".", ",")
        this.state.receive.old  = extratoAbstract.dashboard.last_period.total.toFixed(2).replace(".", ",");
    }

    var last_page = true;
    if( undefined !== extratoAbstract ){
        last_page = extratoAbstract.last_page;
        this.state.financial        = extratoAbstract.financial;
        this.state.receive.current  = extratoAbstract.dashboard.total.toFixed(2).replace(".", ",")
        this.state.revenue.current  = extratoAbstract.dashboard.users.disponivel.toFixed(2).replace(".", ",")
        this.state.payments.current = extratoAbstract.dashboard.users.recebido.toFixed(2).replace(".", ",")
    }else{
        this.state.financial        = [];
        this.state.receive.current  = "--"
        this.state.revenue.current  = "--"
        this.state.payments.current = "--"
    }

    return (
        <div className="wrap-content financeiro">

        <div className="content-title">
            <div className="flex flex-baseline flex-space">
                <div>
                    <h1>Resumo financeiro</h1>
                    <h2>Você está no painel de visualização financeira: aproveite para checar as solicitações.</h2>
                    <h2 className="subtitle-mobile">Você está no painel financeiro</h2>
                </div>

                <div className="filter-admin">
                    <Select
                        onChange={this.change}
                        options={[
                            {value: 1, label: 'Diário'},
                            {value: 7, label: 'Semanal'},
                            {value: 30, label: 'Mensal'},
                        ]}
                        isSearchable={false}
                        id="filter-date"
                        className="status-filter"
                        name="filter_date"
                        closeMenuOnSelect={true}
                        placeholder="Diário"
                        noOptionsMessage={() => { return "Tipo não encontrado." }}
                    />
                </div>
            </div>
        </div>

        <div className="wrap-body">
            <div className="dash-cards grid">
                <div className="grid grid-cards">
                    <GridCards
                        label='Receita'
                        loading={loading}
                        value={dashboard ? this.state.receive.current : "--"}
                        value_old={dashboard ? this.state.receive.old : "--"}
                        pre_values="R$"
                        arrow={this.state.receive.current >= this.state.receive.old ? 'up' : 'down'}
                        porcentagem={0}
                    />

                    <GridCards
                        label='Pagamentos feitos'
                        loading={loading}
                        value={dashboard ? this.state.payments.current : "--"}
                        value_old={dashboard ? this.state.payments.old : "--"}
                        pre_values="R$"
                        arrow={this.state.payments.current >= this.state.payments.old ? 'up' : 'down'}
                        porcentagem={0}
                    />

                    <a href="https://dashboard.zoop.com.br/login" target="_blank" className="card-dash">
                        <small>NETGIFT &reg;</small>

                        <p>Acessar Extrato Financeiro</p>
                    </a>
                </div>
            </div>
        </div>

        <Extrato
            financial= {this.state.financial}
            from_class= "financial-from"
            to_class= "financial-to"
        />

      </div>
    );
  }
}


const mapStateToProps = state => ({
    financial: state.financialResume.financial,
    extrato: state.extrato,
    usersCount: state.usersCount,
    extrato: state.extrato,
    extratoAbstract : state.extrato.extratoAbstract,
    views : state.viewsCount
})

const reduxFormFilters = reduxForm({form: 'filters'})(FinanceiroAdmin);

export default connect(mapStateToProps, {fetchFinancial, fetchUserCount, fetchUserSites, fetchExtratoAbstract, fetchViewCount})(reduxFormFilters);
