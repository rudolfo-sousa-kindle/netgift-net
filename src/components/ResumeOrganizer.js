import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchGiftEvent } from '../actions/giftEventAction';
import { fetchResumeFinancial } from '../actions/resumeFinancialAction';


class ResumeOrganizer extends Component {
    componentDidMount() {
        this.props.fetchGiftEvent(this.props.id_event);
        this.props.fetchResumeFinancial(this.props.id_event, 1, 1);
    }

    render() {
        const { giftEvent, resumeFinancial } = this.props;
        
        return(
            <div className="brief flex flex-end">
                <div className="brief content">
                    <p>Lista de presentes</p>
                    <div className="brief-card icon">
                        <div className="brief-content">
                            <div className="flex">
                                <div className="brief-icon">
                                    <i className="ng-gift c-yellow"></i>
                                </div>
                                <div className="flex-column">
                                    <span>{resumeFinancial.items.length !== 0 ?  resumeFinancial.items.dashboard.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}</span>
                                    <p>Em presentes comprados</p>

                                    <Link to={'/dashboard/financeiro/' + this.props.id_event}>
                                        <button className="gradient fullcolor">Acessar relatório</button>
                                    </Link>
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
                                    <span>{giftEvent.items.length !== 0 ? giftEvent.items.deram_presentes.qtd_presentes : ''}</span>
                                    <p>Pessoas já presentearam</p>

                                    <Link to={'/dashboard/lista-de-presentes/' + this.props.id_event}>
                                        <button className="gradient fullcolor">Gerenciar lista</button>
                                    </Link>
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
                                    <span>{resumeFinancial.items.length !== 0 ?  resumeFinancial.items.dashboard.aconfirmar.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}</span>
                                    <p></p>
                                    
                                    <Link to={'/dashboard/financeiro/' + this.props.id_event}>
                                        <button className="gradient fullcolor">Acessar relatório</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    giftEvent: state.giftEvent,
    resumeFinancial: state.resumeFinancial
})

export default connect(mapStateToProps, {fetchGiftEvent, fetchResumeFinancial})(ResumeOrganizer);