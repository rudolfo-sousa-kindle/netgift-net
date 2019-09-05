import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchThemes } from "../actions/themesActions";
import {bgImage, bgColor, displayNone, defaultStyle, backgroundSize} from "../components/styleFunctions";

class Template extends Component {
    componentDidMount(){
        var category = null === this.state.category ? null : [this.state.category];
        var thematic = null === this.state.thematic ? null : [this.state.thematic];

        this.props.dispatch(fetchThemes( null, category, null, null, thematic ));
    }

    getThemes() {
        var category = null === this.state.category || "null" === this.state.category ? null : [parseInt( this.state.category )];
        var thematic = null === this.state.thematic || "null" === this.state.thematic ? null : [parseInt( this.state.thematic )];

        this.props.dispatch(fetchThemes( null, category, null, null, thematic ));   
    }

    state = {
        category: null,
        thematic: null,
    }

    render() {
        const { error, loading, themes } = this.props;
        const {items} = themes;

        var is_change = false;

        if ( this.state.category !== this.props.category_id ) {
            this.state.category = this.props.category_id;
            is_change = true;
        }

        if ( this.state.thematic !== this.props.thematic_id ) {
            this.state.thematic = this.props.thematic_id;
            is_change = true;
        }

        if ( is_change ) {
            this.getThemes();
        }

        console.log( items )

        return (
            <div className="templates">
                {
                    0 !== items.length ?
                    items.map((item) => {
                        var bg_color = '';
                        var bg_img   = '';
                        if ( 0 !== item.sessions[0].sub_sessions[5].features.length ) {
                            item.sessions[0].sub_sessions[5].features.map( ( feature, ) => {
                                if ( 'fundo_cor' === feature.name ) {
                                    bg_color = feature.value;
                                }

                                if ( 'imagem' === feature.name ) {
                                    bg_img = feature.value;
                                }
                            });

                        }
                        return (
                            <div className="template" style={defaultStyle({bgColor: bg_color, backgroundImage: bg_img, backgroundSize: "contain"})}>
                                <div className="info">
                                    <p className="title">{item.category_name}</p>
                                    <p className="desc">{item.description}</p>
                                    <Link to="/criarFesta">
                                        <button className="gradient fullcolor">Criar festa</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }) : "Não foram encontrados templates com estas características"
                }
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    themes: state.themes
})
  

export default connect(mapStateToProps)(Template);