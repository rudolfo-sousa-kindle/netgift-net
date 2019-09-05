import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import checked from '../assets/imgs/checked.png';

import { fetchGetEvent } from '../actions';

class HeaderCarrinho extends Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchGetEvent(this.props.match.params.id));
    // }

    render() {
        let classActive;
        if (this.props.page === "carrinho" || this.props.page === "pagamento") {
            classActive = 'number flex flex-center active';
        } else {
            classActive = 'number flex flex-center';
        }
        
        // const { id } = this.props.match.params;
        // const event_cart_link = "/festa/" + id + "/carrinho";

        return(
            <header>
                <div className="container">
                    <div className="menu flex flex-space flex-center">
                        <h1 className="title-menu">{this.props.nameHeader}</h1>

                        <div className="nav-etapas">
                            <div className="etapa flex-center">
                                <div className={classActive}>
                                    {this.props.page === "pagamento" || this.props.page === "checkout" ? <img src={checked} alt="checked" /> : <span>1</span>}
                                </div>
                                <p>Carrinho</p>
                            </div>

                            <div className="etapa flex-center">
                                <div className={classActive}>
                                {this.props.page === "checkout" ? <img src={checked} alt="checked" /> : <span>2</span>}
                                </div>
                                <p>Pagamento</p>
                            </div>

                            <div className="etapa flex-center">
                                <div className="number flex flex-center">
                                {this.props.page === "checkout" ? <img src={checked} alt="checked" /> : <span>3</span>}
                                </div>
                                <p>Confirmação</p>
                            </div>
                        </div>

                        <div className="nav-right flex flex-center">
                            <Link to="lista-de-presentes" className="btn gradient border hover-animation">
                                <span>Lista de presentes</span>
                            </Link>
                            <Link to="carrinho" className="btn-carrinho gradient fullcolor">
                                <i className="ng-shopping-cart-alt"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    event: state.getEvent.event,
})
  
export default connect(mapStateToProps, {})(HeaderCarrinho);