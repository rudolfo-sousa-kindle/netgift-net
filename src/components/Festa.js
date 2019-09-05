import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../actions";
import CityState from "../assets/js/city_state";

class Festa extends Component {
    componentDidMount(){
        this.props.dispatch(fetchEvents( false, this.props.quem, this.props.data, this.props.tipo, this.props.estado, this.props.cidade ));
    }

    getEvents() {
        var quem = null === this.state.quem || "null" === this.state.quem ? null : this.state.quem;
        var data = null === this.state.data || "null" === this.state.data ? null : this.state.data;
        var tipo = null === this.state.tipo || "null" === this.state.tipo ? null : this.state.tipo;
        var estado = null === this.state.estado || "null" === this.state.estado ? null : this.state.estado;
        var cidade = null === this.state.cidade || "null" === this.state.cidade ? null : this.state.cidade;

        this.props.dispatch(fetchEvents( true, quem, data, tipo, estado, cidade ));   
    }

    state = {
        quem: null,
        data: null,
        tipo: null,
        estado: null,
        cidade: null,
    }

    render() {
        const { error, loading, events } = this.props;
        const {items} = events;

        var is_change = false;

        if ( this.state.quem !== this.props.quem ) {
            this.state.quem = this.props.quem;
            is_change = true;
        }

        if ( this.state.data !== this.props.data ) {
            this.state.data = this.props.data;
            is_change = true;
        }

        if ( this.state.tipo !== this.props.tipo ) {
            this.state.tipo = this.props.tipo;
            is_change = true;
        }

        if ( this.state.estado !== this.props.estado ) {
            this.state.estado = this.props.estado;
            is_change = true;
        }

        if ( this.state.cidade !== this.props.cidade ) {
            this.state.cidade = this.props.cidade;
            is_change = true;
        }

        if ( is_change ) {
            this.getEvents();
        }

        return (
            <div className="festas">
                {
                    0 !== items.length ?
                    items.map((item) => {
                        return(
                            <div key={item.id} className="festa">
                                <div className="info">
                                    <div className="thumb"></div>
                                    <div className="categoria">Infantil</div>
                                    <p className="title">{item.name}</p>
                                    <p className="end">{item.address.street}, {item.address.neighborhood} - {item.address.city} - {item.address.state}</p>
                                    <p className="data">{item.date}</p>
                                    <button className="gradient fullcolor border bgwhite"><span>Visitar site</span></button>
                                </div>
                            </div>
                        )
                    }) : 'Não encontramos resultados para esta busca'
                }
            </div> 
        )
    }
}

const mapStateToProps = state => ({
    events: state.events
})
  

export default connect(mapStateToProps)(Festa);
