import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import iconGreen from '../assets/imgs/notification-icon-green.svg'

import { fetchNotificationsUser } from '../actions/notificationsUserAction';

class NoficicacoesOrganizador extends Component {
    componentDidMount() {        
        this.props.fetchNotificationsUser(6);
    }

    render() {
        const { notificationsUser } = this.props;
        console.log(notificationsUser);
        
        return(
            <div className="notificacoes">
                <div className="container">
                    <div className="summary without-buttons without-divider">
                        <div className="left">
                            <h2 className="title">Notificações</h2>
                            <p className="subtitle">Confira os últimos acontecimentos da sua festa!</p>
                        </div>
                    </div>

                    <div className="flex flex-column mT20 notifications-content notifications-row">
                        <div className="row flex">
                            {
                                notificationsUser.items !== 0 ? 
                                notificationsUser.items.map((item) => {
                                    return (
                                        <div className="card-notification">
                                            <div className="thumb green"><img src={iconGreen} alt="" /></div>
                                            <div className="desc"><strong>{item.from}</strong> 
                                            <p>{item.message}</p></div>
                                        </div>
                                    )
                                })
                                :''
                            }
                        </div>
                    </div>

                    <div className="my50"></div>
                    
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
        notificationsUser: state.notificationsUser
    };
}

export default connect(mapStateToProps,  {fetchNotificationsUser})(NoficicacoesOrganizador);
