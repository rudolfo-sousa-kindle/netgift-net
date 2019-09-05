import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPage } from "../actions";
import { fetchCategories } from "../actions/categoriesActions";

import HeaderDefault from "../components/HeaderDefault";
import FooterDesloged from "../components/FooterDesloged";
import Templates from "../components/Template";

import $ from 'jquery';

import "../assets/css/select2.min.css";

class GaleriaTemplates extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPage(187, ''));
        this.props.dispatch( fetchCategories( 'categories' ) );
        this.props.dispatch( fetchCategories( 'thematics' ) );

        $('.custom-select').select2({
            minimumResultsForSearch: -1
        });

        var STATE = this;

        $( document ).on( 'submit', '#filterTemplates', function( event ) {
            event.preventDefault();

            $("html, body").animate({ scrollTop: $('#search-wrapper').offset().top }, 1000);

            STATE.setState({
                current_category: $( 'select[name=categoria_festa]' ).val(),
                current_thematic: $( 'select[name=tema_festa]' ).val(),
            });

        });
    }

    state = {
        categories: [],
        thematics: [],
        current_category: null,
        current_thematic: null,
    }

    render() {
        const { error, loading, page, categories, thematics } = this.props;
        const { items } = page;
        const { meta_fields } = items;

        if ( undefined !== categories && 0 !== categories.length ) {
            this.state.categories = categories;
        }

        if ( undefined !== thematics && 0 !== thematics.length ) {
            this.state.thematics = thematics;
        }

        $('.galeria-de-templates header.wave').css({
            'background-image': 'url(' + items.thumbnail + ')'
        });

        if ( undefined !== meta_fields && items.ID == 187 ) {
            $('.obs').html(meta_fields.ntgift_hint[0]);

            $('.flex-center .icon-text .text-editable').html(meta_fields.ntgift_templates_ntgift_description[0]);

            $('.flex-center .icon-text .icon').html( meta_fields.ntgift_templates_ntgift_icon[0] );

            $('.flex-end .icon-text .icon').html(meta_fields.ntgift_start_party_ntgift_icon[0]);
            
            $('.ntgift_start_party_ntgift_description').html(meta_fields.ntgift_start_party_ntgift_description[0]);
        }

        return ( 
            <main className="galeria-de-templates">
                <header className="default wave">
                    <div className="container lg">
                        <HeaderDefault /> 
                    </div>

                    <div className="container content webdoor-content">
                        <div className="flex flex-column header-content">
                            <h2 className="title">{items.post_title}</h2>
                            <p className="subtitle">{items.post_content}</p>
                        </div>
                    </div>

                    <div className="container content form-categ-template form-categ-template-desk">
                        <div className="flex flex-column header-content">
                            <form className="card-purple card-purple-mob" id="filterTemplates">
                                <div className="flex flex-space columns-2">
                                    <div className="flex flex-column">
                                        <label for="categoria_festa">Escolha a categoria da festa</label>
                                        <select id="" name="categoria_festa" className="custom-select bg-white">
                                            <option value="null" hidden>Todas as categorias</option>
                                            {
                                                0 !== this.state.categories.length ?
                                                this.state.categories.map( ( categ ) => {
                                                    return(
                                                        <option value={categ.id}>{categ.name}</option>
                                                    )
                                                }) : ''
                                            }
                                        </select>
                                    </div>
                                    <div className="flex flex-column">
                                        <label for="tema_festa">Escolha um dos temas</label>
                                        <select id="" name="tema_festa" className="custom-select bg-white">
                                            <option value="null" selected>Todos os temas</option>
                                            {
                                                0 !== this.state.thematics.length ?
                                                this.state.thematics.map( ( thematic ) => {
                                                    return(
                                                        <option value={thematic.id}>{thematic.name}</option>
                                                    )
                                                }) : ''
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-column">
                                    <button className="gradient fullcolor comecar-festa"><span>Procurar template</span><i className="ng-right-arrow-extend"></i></button>
                                    <p className="obs"></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </header>

                <div className="container content form-categ-template form-categ-template-mob">
                        <div className="flex flex-column header-content">
                            <form className="card-purple card-purple-mob" action="">
                                <div className="flex flex-space columns-2">
                                    <div className="flex flex-column">
                                        <label for="categoria_festa">Escolha a categoria da festa</label>
                                        <select id="" name="categoria_festa" className="custom-select bg-white">
                                            <option value="all" hidden>Todas as categorias</option>
                                            <option value="festa 1">festa 1</option>
                                            <option>festa 2</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-column">
                                        <label for="tema_festa">Escolha um dos temas</label>
                                        <select id="" name="tema_festa" className="custom-select bg-white">
                                            <option value="all" selected>Todos os temas</option>
                                            <option>tema 1</option>
                                            <option>tema 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-column">
                                    <button className="gradient fullcolor comecar-festa"><span>Procurar template</span><i className="ng-right-arrow-extend"></i></button>
                                    <p className="obs"></p>
                                </div>
                            </form>
                        </div>
                    </div>

                <div className="container md content sect-templates">
                    <div className="flex flex-space flex-center">
                        <div className="flex flex-column icon-text lg">
                            <div className="icon shadow-20 rounded gradient-roxo">
                            </div>

                            <div className="text-editable" id="search-wrapper"></div>
                        </div>
                    </div>

                    <Templates 
                        category_id={this.state.current_category}
                        thematic_id={this.state.current_thematic}
                    />
                </div>
                
                <div className="container md content waves-mob">
                    <div className="flex flex-space flex-end">

                        <div className="flex flex-column icon-text lg">
                            <div className="icon shadow-20 rounded gradient-roxo">
                            </div>
                            <p className="title ntgift_start_party_ntgift_description"></p>
                            <p className="subtitle"></p>
                            <Link to="/login">
                                <button className="gradient fullcolor comecar-festa"><span>Começar uma festa</span><i className="ng-right-arrow-extend"></i></button>
                            </Link>
                        </div>

                    </div>
                </div>

                <FooterDesloged />
            </main>
        )
    }
}

const mapStateToProps = state => ({
    page: state.page,
    categories: state.themeCategories.categories,
    thematics: state.themeCategories.thematics,
})
  

export default connect(mapStateToProps)(GaleriaTemplates);