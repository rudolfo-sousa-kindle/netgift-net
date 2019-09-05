import React, { Component } from "react";
import {Link } from "react-router-dom";
import $ from 'jquery';
import { connect } from "react-redux";
import { fetchThemes } from "../actions/themesActions";
import { fetchCategories, fetchSetCategories } from "../actions/categoriesActions";
import {Field, reduxForm} from 'redux-form';
import Loader from "./Loader";

import "../assets/js/themes-filters.js";

import {bgImage, bgColor, displayNone, defaultStyle} from "./styleFunctions";


class TemasAdmin extends Component {

  componentDidMount(){
    this.props.dispatch(fetchThemes(null, null, null, null, null, 1));
    this.props.dispatch( fetchCategories( 'categories' ) );
    this.setState({
        page: 2
    })
  }

    submit = ( item ) => {
        var category_ids = [];
        var search       = item.search;

        if ( undefined !== item.categories ) {
            item.categories.map( ( categ, index ) => {
                if ( categ ) {
                    category_ids.push( index );
                } 
            });
        }

        var d = new Date();
        var date_start = null;
        var date_end   = null;

        var one_day    = 86400000;

        switch ( item.period ) {
            case 'hoje':
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-' + d.getDate();
                d          = new Date( d.getTime() + one_day );
                month      = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'ontem':
                d          = new Date( d.getTime() - one_day );
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-' + d.getDate();
                d          = new Date( d.getTime() + one_day );
                month      = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'semana':
                d          = new Date( d.getTime() + one_day );
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                d          = new Date( d.getTime() - ( d.getDay() * one_day ) );
                month      = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'mes':
                d          = new Date( d.getTime() + one_day );
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-01';
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'custom':
                date_start = item.custom_date_from;
                date_end   = item.custom_date_to;
                break;
        }

        category_ids = 0 !== category_ids.length ? category_ids : null;
        
        this.props.dispatch( fetchThemes( search, category_ids, date_start, date_end, null, 1 ) );
        this.setState({
            page: 2
        })
    }

    getMoreThemes(){
        // var cat = '' === $( '#categories' ).val() ? null : $( '#categories' ).val().split( ',' );
        var cat = [];
        $( '.categories' ).map( ( index, category ) => {
            if ( category.checked ) {
                cat.push( $( category ).attr( 'id' ) );
            }
        });
        cat = 0 === cat.length ? null : cat;
        var search = $( '#search-field' ).val();
        search = '' === search ? null : search;

        var d = new Date();
        var date_start = null;
        var date_end   = null;

        var one_day    = 86400000;

        switch ( $( 'input[name=period]:checked' ).val() ) {
            case 'hoje':
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-' + d.getDate();
                d          = new Date( d.getTime() + one_day );
                month      = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'ontem':
                d          = new Date( d.getTime() - one_day );
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-' + d.getDate();
                d          = new Date( d.getTime() + one_day );
                month      = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'semana':
                d          = new Date( d.getTime() + one_day );
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                d          = new Date( d.getTime() - ( d.getDay() * one_day ) );
                month      = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'mes':
                d          = new Date( d.getTime() + one_day );
                var month  = d.getMonth() + 1;
                month      = 10 > month ? '0' + month : month;
                date_start = d.getFullYear() + '-' + month + '-01';
                date_end   = d.getFullYear() + '-' + month + '-' + d.getDate();
                break;
            case 'custom':
                date_start = $( '#custom-date-from' );
                date_end   = $( '#custom-date-to' );
                break;
        }
    console.log( 'teste' );
        this.props.dispatch(fetchThemes(search, cat, date_start, date_end, null, this.state.page))
        .then((res) => {
            this.setState({
                page: this.state.page + 1
              })
        });
      }

    state = {
        current_categories: [],
        page: 2,
    };

  render() {
    if ( undefined !== this.props.categories && 0 !== this.props.categories.length ) {
        this.state.current_categories = this.props.categories;
    }

    const{ themes, handleSubmit } = this.props;
    const {items, error, loading, loadingNext} = themes;

    
    var current_themes = '' !== items ? items : [];
    console.log(current_themes)

    return (
      <div className="wrap-content dashboard temas">

        <div>
            <div className="content-title">
                <div className="flex flex-end flex-space">
                    <div>
                        <h1>Temas</h1>
                        <h2>Edite, exclua ou crie novos temas</h2>
                    </div>
                    <button className="gradient fullcolor">
                        <Link to="temas/novo-tema">
                            Novo tema
                        </Link>    
                    </button>
                </div>
            </div>

            <div className="wrap-body">
                <form onSubmit={handleSubmit( this.submit )} className="sidebar refinar flex flex-column theme-filter-form" name="theme_filter_form">
                        <button id="submit-form-button-hidden" hidden>Filtrar</button>
                        <div className="title black">Refinar por</div>

                        <div className="sidebar-item">
                            <div className="title">Nome</div>
                            <Field
                                name="search"
                                component="input"
                                className="search"
                                id="search-field"
                                type="text"
                                placeholder="Digite o nome do template"
                                />
                        </div>

                        <div className="sidebar-item">
                            <div className="title">Categorias</div>
                            {
                                this.state.current_categories.map( ( category, i ) => {
                                    var id = category.id;
                                    var name = category.name;
                                    return(
                                        <div key={i} className="filter-item">
                                            <Field
                                                name={"categories[" + id + "]" }
                                                component="input"
                                                className={"categories category-" + id}
                                                type="checkbox"
                                                id={id}
                                                value={id}
                                                />
                                        
                                            <label htmlFor={id}><span>{name}</span><span className="count"></span></label>
                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className="sidebar-item">
                            <div className="title">Data de Adição</div>

                            <div className="filter-item">
                                <Field
                                    name={"period"}
                                    component="input"
                                    className={"periods period-hoje"}
                                    type="radio"
                                    id="hoje"
                                    value="hoje"
                                    />
                                <label htmlFor="hoje"><span>Hoje</span></label>
                            </div>

                            <div className="filter-item">
                                <Field
                                    name={"period"}
                                    component="input"
                                    className={"periods period-ontem"}
                                    type="radio"
                                    id="ontem"
                                    value="ontem"
                                    />
                                <label htmlFor="ontem"><span>Ontem</span></label>
                            </div>

                            <div className="filter-item">
                                <Field
                                    name={"period"}
                                    component="input"
                                    className={"periods period-semana"}
                                    type="radio"
                                    id="semana"
                                    value="semana"
                                    />
                                <label htmlFor="semana"><span>Essa semana</span></label>
                            </div>

                            <div className="filter-item">
                                <Field
                                    name={"period"}
                                    component="input"
                                    className={"periods period-mes"}
                                    type="radio"
                                    id="mes"
                                    value="mes"
                                    />
                                <label htmlFor="mes"><span>Esse mês</span></label>
                            </div>

                            <div className="filter-item">
                                <Field
                                    name={"period"}
                                    component="input"
                                    className={"periods period-custom"}
                                    type="radio"
                                    id="custom"
                                    value="custom"
                                    />
                                <label htmlFor="custom" id="custom-period-label"><span>Período Personalizado</span></label>
                            </div>

                            <div className="filter-item last date">
                                <div className="columns-2">
                                    <Field
                                        name={"custom_date_from"}
                                        component="input"
                                        className={"periods period-custom-text"}
                                        type="date"
                                        id="custom-date-from"
                                        placeholder="De"
                                        value="custom-date-from"
                                        />
                                    <Field
                                        name={"custom_date_to"}
                                        component="input"
                                        className={"periods period-custom-text"}
                                        type="date"
                                        id="custom-date-to"
                                        placeholder="Para"
                                        value="custom-date-to"
                                        />
                                </div>
                            </div>


                        </div>

                </form>
                <div className="showcase temas">
                    {
                        loading ? <Loader /> : <div className="templates">
                        {
                            current_themes.map((theme) => {
                                    var bg_color = '';
                                    var bg_img   = '';
                                    if ( 0 !== theme.sessions[0].sub_sessions[5].features.length ) {
                                        theme.sessions[0].sub_sessions[5].features.map( ( feature, ) => {
                                            if ( 'fundo_cor' === feature.name ) {
                                                bg_color = feature.value;
                                            }

                                            if ( 'imagem' === feature.name ) {
                                                bg_img = feature.value;
                                            }
                                        });

                                    }
                                    return (
                                    <div key={theme.id} className="template" style={defaultStyle({bgColor: bg_color, backgroundImage: bg_img})}>
                                        <div className="info">
                                            <p className="title">{theme.slug}</p>
                                            <p className="desc">{theme.description}</p>
                                            <Link to={{
                                                    pathname: `/dashboard/temas/editar-tema/${theme.id}`,
                                                }} className="gradient fullcolor">Editar</Link>
                                        </div>
                                    </div>
                                    ) 
                                
                                
                            })
                        }
                    </div>
                    }
                    {loadingNext ? <Loader /> : ""}
                    <button onClick={() => this.getMoreThemes()} className="btn-large">Ver Mais</button>
                </div>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    themes: state.themes,
    categories: state.themeCategories.categories,
    thematics: state.themeCategories.thematics,
  })

const reduxFormFilters = reduxForm({form: 'filters'})(TemasAdmin);

export default connect(mapStateToProps, {fetchThemes})(reduxFormFilters);
