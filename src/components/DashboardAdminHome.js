import React, { Component } from "react";
import setSelect2 from "../assets/js/setSelect2";
import { connect } from "react-redux";
import Extrato from "./ExtratoAdmin";
import GridCards from "./GridCards";
import {fetchUserCount, fetchUserSites} from "../actions/usersActions";
import {fetchViewCount} from "../actions/viewsActions";
import { fetchExtratoAbstract } from "../actions/extratoActions";
import Select from 'react-select';

import $ from "jquery";

class Dashboard extends Component {

    componentDidMount(){
        // setSelect2();
        this.props.fetchUserCount();
        this.props.fetchViewCount();
        this.props.fetchUserSites();
        this.props.fetchExtratoAbstract(null, null, null, null, null, null, 1, 1);
    }

    change = ( field ) => {
        let periodo = field.value;
        this.props.fetchUserCount( periodo );
        this.props.fetchViewCount();
        this.props.fetchUserSites( periodo );
        this.props.fetchExtratoAbstract( null, null, null, null, null, null, 1, periodo );
    }

    state = {
        views: { current: '--', old: '--', percent: '--' },
        users: { current: '--', old: '--', percent: '--' },
        sites: { current: '--', old: '--', percent: '--' },
        receive: { current: '--', old: '--', percent: '--' },
        payments: { current: '--', old: '--', percent: '--' },
        financial:{}
    }


    render() {
        const {total, totalPassado, loading, error, porcentagem, totalSites, totalSitePassado, porcentagemSites} = this.props.usersCount;
        const loadingExtrato = this.props.extrato.loading;
        const {extrato} = this.props.extrato;
        const {dashboard} = extrato;
        const {extratoOld} = this.props.extrato;
        const extratoAbstract = this.props.extratoAbstract;
        var recebidoOld

        if ( undefined !== this.props.views ) {
            this.state.views.current = this.props.views.total;
            this.state.views.old = this.props.views.totalPassado;
            this.state.views.percent = parseFloat(this.state.views.current*(this.state.views.old/100));
        }

        this.state.users.current = total;
        this.state.users.old     = totalPassado;
        this.state.users.percent = parseFloat(this.state.users.current*(this.state.users.old/100));
        
        if(undefined !== extratoAbstract && undefined !== extratoAbstract.dashboard.last_period ){
            this.state.payments.old = extratoAbstract.dashboard.last_period.netgift.recebido.toFixed(2).replace(".", ",");
            this.state.receive.old  = extratoAbstract.dashboard.last_period.total.toFixed(2).replace(".", ",");
        }

        if(undefined !== extratoAbstract){
            this.state.financial= extratoAbstract.financial;
            this.state.receive.current = extratoAbstract.dashboard.total.toFixed(2).replace(".", ",")
            this.state.payments.current = extratoAbstract.dashboard.netgift.recebido.toFixed(2).replace(".", ",")
        }else{
            this.state.financial = {};
            this.state.receive.current  = "--"
            this.state.payments.current = "--"
        }

        return (
            <div className="wrap-content home">
                <div className="content-title">
                    <div className="flex flex-baseline flex-space">
                        <div>
                            <h1>Dashboard</h1>
                            <h2>Você está no painel principal</h2>
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
                        <GridCards
                            label='Visitas'
                            value={this.state.views.current}
                            value_old={this.state.views.old}
                            porcentagem={this.state.views.percent ? this.state.views.percent : "--"}
                            pre_values=""
                            arrow={this.state.views.current >= this.state.views.old ? 'up' : 'down'}
                            loading={loading}
                        />
                        <GridCards
                            label='Novos Usuários'
                            value={total}
                            value_old={totalPassado}
                            porcentagem={porcentagem ? porcentagem : "--"}
                            pre_values=""
                            arrow={total >= totalPassado ? 'up' : 'down'}
                            loading={loading}
                        />
                        <GridCards
                            label='Novos Sites'
                            value={totalSites ? totalSites : "--"}
                            value_old={totalSitePassado ? totalSitePassado : "--"}
                            porcentagem={porcentagemSites ? porcentagemSites : "--"}
                            pre_values=""
                            arrow={totalSites >= totalSitePassado ? 'up' : 'down'}
                            loading={loading}
                        />
                        <GridCards
                            label='Faturamento'
                            loading={loading}
                            value={dashboard ? this.state.receive.current : "--"}
                            value_old={dashboard ? this.state.receive.old : "--"}
                            pre_values="R$"
                            arrow={this.state.receive.current >= this.state.receive.old ? 'up' : 'down'}
                            porcentagem={0}
                        />
                        <GridCards
                            label='Pagamentos'
                            loading={loading}
                            value={dashboard ? this.state.payments.current : "--"}
                            value_old={dashboard ? this.state.payments.old : "--"}
                            pre_values="R$"
                            arrow={this.state.payments.current >= this.state.payments.old ? 'up' : 'down'}
                            porcentagem={0 ? 0 : "--"}
                        />
                    </div>
                </div>
                <Extrato
                    financial= {this.state.financial}
                    from_class= "dashboard-from"
                    to_class= "dashboard-to"
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    extrato: state.extrato,
    usersCount: state.usersCount,
    extrato: state.extrato,
    extratoAbstract : state.extrato.extratoAbstract,
    views : state.viewsCount
  })

export default connect(mapStateToProps, {fetchUserCount, fetchUserSites, fetchExtratoAbstract, fetchViewCount})(Dashboard);
