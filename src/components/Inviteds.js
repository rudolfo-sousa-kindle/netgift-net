import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchInvited } from '../actions/invitedAction';
import { fetchDeleteInvited } from '../actions/deleteInvitedAction';

import $ from 'jquery';

class Inviteds extends Component {
    state = {
        inviteds: []
    }
    componentDidMount() {
        this.props.fetchInvited(this.props.id_event, this.props.order_by, this.props.order);
    }

    deleteInvited(item) {
        var event_id = this.props.id_event;
        var invited_id = item.id;
        this.props.fetchDeleteInvited({event_id, invited_id});
    }

    editInvited(item) {
        $('.modal-invited').attr('id', item.id);
        $('.modal-invited [name="email"]').val(item.email);
        $('.modal-invited [name="first_name"]').val(item.first_name);
        $('.modal-invited [name="last_name"]').val(item.last_name);
        $('.modal-invited [name="ddd"]').val(item.ddd);
        $('.modal-invited [name="telephone"]').val(item.telephone);
        $('.modal-invited [name="ddd"]').val(item.telephone_ddd);
        $('.modal-invited [name="description"]').val(item.description);
    }

    render() {
        const { invited } = this.props;
        const { items } = invited;
        console.log(invited)
        const { invites, invites_confirmados, invites_nao_comparecera, invites_nao_confirmados } = items;

        switch ( this.props.filter ) {
            case 'todos':
                this.state.inviteds = invites;
                break;
            case 'confirmados':
                this.state.inviteds = invites_confirmados;
                break;
            case 'nao-comparecera':
                this.state.inviteds = invites_nao_comparecera;
                break;
            case 'respondeu':
                this.state.inviteds = invites_nao_confirmados;
                break;
        }

        if ( this.state.inviteds !== undefined ) {
        return (
            <div className="list-cards">
                <div className="card-convidados-sizer"></div>
                {
                    this.state.inviteds.map((item) => {

                        return(
                            <div className={item.confirmed + " card card-convidados"} key={item.id} data-id={item.id} >
                                <div className="card-convidados-user">
                                    <div className="flex flex-center flex-space">
                                        <div className="card-convidados-name">
                                            <p>{item.first_name}</p>
                                            {
                                                item.group_id === 1 ?
                                                <span>Família</span> : ''
                                            }
    
                                            {
                                                item.group_id === 2 ?
                                                <span>Conhecidos</span> : ''
                                            }
    
                                            {
                                                item.group_id === 3 ?
                                                <span>Colegas de trabalho</span> : ''
                                            }
    
                                            {
                                                item.group_id === 4 ?
                                                <span>Amigos</span> : ''
                                            }
                                        </div>
                                        <div className="dots">
                                            <i className="ng-more"></i>
                                            <div className="context-menu">
                                                <button className="item editar" onClick={() => this.editInvited(item)}data-modal="convidados"><i className="ng-compose-alt" ></i>Editar</button>
                                                <button className="item excluir" onClick={() => this.deleteInvited(item)}><i className="ng-trash"></i>Excluir</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    item.telephone !== undefined ? 
                                        <div className="card-convidados-infos display-none content-telephone">
                                            <p className="text-telephone">({item.telephone_ddd}) {item.telephone}</p>
                                        </div>
                                    :''
                                }
    
                                {
                                    item.email !== undefined ? 
                                    <div className="card-convidados-infos content-email">
                                        <div className="flex flex-center flex-space display-none">
                                            <p className="text-email">{item.email}</p>
                                            <i className="ng-email display-none"></i>
                                        </div>
                                    </div>
                                    :''
                                }
                                
                                <div className="card-convidados-infos">
                                    <p><span>{item.escort_adult} adultos</span>, <span>{item.escort_child} crianças</span></p>
                                </div>
    
                                {
                                    item.confirmed === 'Não respondeu' ? 
                                        <div className={"card-convidados-infos tags flex flex-center tag-yellow"}>
                                            <p>{item.confirmed}</p>
                                        </div>
                                    : ''
                                }
    
                                {
                                    item.confirmed === 'Confirmados' ? 
                                        <div className={"card-convidados-infos tags flex flex-center tag-green"}>
                                            <p>{item.confirmed}</p>
                                        </div>
                                    : ''
                                
                                }
    
                                {
                                    item.confirmed === 'Não comparecerá' ? 
                                        <div className={"card-convidados-infos tags flex flex-center tag-red"}>
                                            <p>{item.confirmed}</p>
                                        </div>
                                    : ''
                                }
                                
                            </div>
                        )
                    })
                }
            </div>
        )
        } else {
            return( 'Não há convidados' )
        }
    }
}

const mapStateToProps = state => ({
    deleteInvited: state.deleteInvited,
    invited: state.invited
})

export default connect(mapStateToProps, {fetchInvited, fetchDeleteInvited})(Inviteds);