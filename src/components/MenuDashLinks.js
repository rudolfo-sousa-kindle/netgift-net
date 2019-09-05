import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { signOutAction } from '../actions';

class MenuDashLinks extends Component {

    render(){
        return (
            <nav>
                <ul>
                    <div className="flex flex-column">
                        <div>
                            <li>
                                <NavLink activeClassName="active" className="flex flex-center" to="/dashboard/home">
                                    <i className="ng-admin-home"></i>
                                    Visão Geral
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" className="flex flex-center" to="/dashboard/usuarios">
                                    <i className="ng-admin-usuarios"></i>
                                    Usuários
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" className="flex flex-center" to="/dashboard/financeiro">
                                    <i className="ng-admin-financeiro"></i>
                                    Financeiro
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" className="flex flex-center" to="/dashboard/temas">
                                    <i className="ng-admin-temas"></i>
                                    Temas
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" className="flex flex-center" to="/dashboard/presentes">
                                    <i className="ng-admin-presentes"></i>
                                    Presentes
                                </NavLink>
                            </li>
                        </div>
                        <div>
                            <li>
                                <NavLink to="" onClick={() => signOutAction()} activeClassName="active" className="flex flex-center">
                                    <i className="ng-logout"></i>
                                    Logout
                                </NavLink>
                            </li>
                        </div>
                    </div>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
  }

export default connect(mapStateToProps, {signOutAction})(MenuDashLinks);