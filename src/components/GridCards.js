import React, { Component } from 'react';
import Loader from "./Loader";

class GrifCards extends Component{

    componentDidMount(){

    }
    
    render(){
        const {loading, label, value, porcentagem, value_old, pre_values, arrow} = this.props;
        return(
            <div className="card-dash">
                <small>{label}</small>
                {
                    loading ? <Loader /> :
                <div className="flex flex-center">
                    <p className="number">{pre_values} { value }</p>
                    <p className={"taxa " + arrow}>{porcentagem}% <span></span></p>
                    <div className={"triangle triangle-" + arrow}></div>
                </div>
                }
                <p className="historico">Semana anterior: <span>{pre_values} {value_old}</span></p>
            </div>
        )
    }

}


export default GrifCards;