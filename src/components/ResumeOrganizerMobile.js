import React, { Component } from "react";
import { connect } from 'react-redux';
import $ from "jquery";

import { fetchGiftEvent } from '../actions/giftEventAction';
import { fetchResumeFinancial } from '../actions/resumeFinancialAction';
import { fetchInvited } from '../actions/invitedAction';


class ResumeOrganizerMobile extends Component {
    componentDidMount() {
        this.props.fetchInvited(this.props.id_event);
        this.props.fetchGiftEvent(this.props.id_event);
        this.props.fetchResumeFinancial(this.props.id_event, 1, 1);        
    }

    render() {
        const { giftEvent, resumeFinancial, invited } = this.props;
        return(
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
                                        <span>{resumeFinancial.items.length !== 0 ?  resumeFinancial.items.dashboard.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : ''}</span>
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
                                        <span>{giftEvent.items.length !== 0 ? giftEvent.items.deram_presentes.qtd_presentes : ''}</span>
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
                                        <span>{invited.items.length !== 0 ? invited.items.adultos : ''}</span>
                                        <p>Adultos</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="brief-icon">
                                        <i className="ng-ballon c-yellow"></i>
                                    </div>
                                    <div className="flex-column">
                                        <span>{invited.items.length !== 0 ? invited.items.criancas : ''}</span>
                                        <p>Crianças</p>
                                    </div>
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
    resumeFinancial: state.resumeFinancial,
    invited: state.invited,
})

export default connect(mapStateToProps, {fetchGiftEvent, fetchResumeFinancial, fetchInvited})(ResumeOrganizerMobile);