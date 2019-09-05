import React, { Component } from "react";
import $ from 'jquery';
import {Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "./Loader";
import { fetchGifts, editGift } from "../actions/giftActions";
import { fetchCategories, fetchSetCategories } from "../actions/categoriesActions";
import setSelect2 from "../assets/js/setSelect2";
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import {Field, reduxForm, change} from 'redux-form';
import "select2";

const blockStyle = {
  "display": "block"
}

class PresentesAdmin extends Component {

  componentDidMount(){
    setSelect2();
    this.props.dispatch( fetchGifts(null, null, 1) );
    this.props.dispatch( fetchCategories( 'categories', 'gift' ) );
    this.setState({
      page: 2
    })
  }

  state = {
    current_categories: [],
    page: 2
  };

  getMoreGifts( item ){
    var cat = '' === $( '#categories' ).val() ? null : $( '#categories' ).val().split( ',' );
    var search = $( '#search-gift' ).val();
    search = '' === search ? null : search;
    this.props.dispatch(fetchGifts(search, cat, this.state.page))
    .then((res) => {
      this.setState({
        page: this.state.page + 1
      })
    });
  }

  delete(id){
    var del = window.confirm("Tem certeza?");
    if(del){
      var values = {};
      values["image"] = "";
      values["nome_presente"] = "";
      values["price"] = "";
      values["description"] = "";
      values["category_id"] = "";
      this.props.dispatch(editGift(values, this.props.history, id, "delete"));
    }else{

    }
  }

  submit = ( item ) => {
    var search       = item.search;
    var category_ids = item.categories;
    category_ids     = undefined !== category_ids && 0 !== category_ids.length ? item.categories : null;
    
    this.props.dispatch( fetchGifts( search, category_ids ) );
    this.setState({
      page: 2
    })
  }

  handleChangeCategories = (newValue: any, actionMeta: any ) => {
    var last_new_option = [];

    if ( null !== newValue ) {
      newValue.map( ( current_value, index ) => {
        last_new_option.push( current_value.value );
      });
    }

    this.props.dispatch( change( "gift_filters", "categories", last_new_option ) ); 
  }

  render() {
    if ( undefined !== this.props.categories && 0 !== this.props.categories.length ) {
        this.state.current_categories = this.props.categories;
    }

    var categ_options = [];

    if ( undefined !== this.state.current_categories ) {
        this.state.current_categories.map( ( category, index ) => {
            var id = category.id;
            var name = category.name;
            categ_options.push( { value: id, label : name } );
        })
    }

    const divStyle = (src) => ({
      backgroundImage: 'url(' + src + ')'
    })
    const{ gifts, handleSubmit } = this.props;
    const {loading, error, loadingNext} = gifts;
    var { items } = gifts;
    const {giftsCategories} = gifts;
    return (
      <div className="wrap-content novo-tema presentes">

          <div className="content-title">
              <div className="flex flex-baseline flex-space">
                  <div>
                      <h1>Presentes</h1>
                      <h2>Edite, exclua ou crie novos presentes</h2>
                  </div>

                  <div>
                      <button className="gradient fullcolor novo-desk">
                        <Link to="/dashboard/presentes/novo-presente">
                          Novo presente
                        </Link>
                      </button>
                      <button className="gradient fullcolor novo-mob">+</button>
                  </div>
              </div>
          </div>

          <section className="card-options">
              <div>

                <div className="content-card-options">
                  <div className="header-card-options">
                      <h2 className="title">Buscar um presente</h2>
                      <p className="subtitle"></p>
                  </div>
                </div>

                <div className="line"></div>

                <div className="main-options">

                  <form onSubmit={handleSubmit( this.submit )} className="grid grid-input" name="theme_filter_form">
                    <div>
                        <label htmlFor="tipo-festa" className="label-theme">Nome do presente <i className="ng-info-circled"></i></label>
                        <Field
                          name={"search"}
                          component="input"
                          className={"input-theme"}
                          placeholder="Digite o nome do presente que você quer busca"
                          type="text"
                          id="search-gift"
                          />
                    </div>

                    <div className="presente-categ-mob">
                        <label htmlFor="descricao-tema" className="label-theme">Categoria do presente<i className="ng-info-circled"></i> </label>
                        <Field
                          name={"categories"}
                          component="input"
                          className={"hiden-input-theme"}
                          type="hidden"
                          id="categories"
                          />
                        <Select
                          isMulti
                          onChange={this.handleChangeCategories}
                          options={categ_options}
                          className="selecione"
                          closeMenuOnSelect={false}
                          placeholder="Selecione"
                          noOptionsMessage={() => { return "Categoria não encontrada." }}
                        />

                    </div>
                    <button className="gradient fullcolor">Buscar presente</button>

                  </form>

                </div>

              </div>
          </section>

          <div className="cards-gift flex flex-wrap">
            {
              loading ? <Loader /> :
              error ? <p>Erro no servidor</p> :
              items.map((itens, i) => {
                if(itens.length > 0 && this.state.page === 2){
                  return(
                    itens.map((item, j) => {
                      return(
                        <div key={j} className="card-gift  flex flex-column flex-space">
                          <div className="card-gift-thumb" style={divStyle(item.url)}></div>
                            <div className="flex flex-column">
                              <div className="card-gift-name">{item.name}</div>
                              <div className="card-gift-price">R${`${item.price}`.replace(".", ",")}</div>
                              <div className="card-gift-desc">{item.description.substring(0,100)}</div>
                          </div>
                          <div className="flex flex-space">
                            <div className="buttons">
                                <Link to={{
                                  pathname: `/dashboard/presentes/editar-presente/${item.id}`,
                                }} className="gradient fullcolor edit">Editar item</Link>
                                <button className="gradient border bgwhite"><span>Excluir</span></button>
                            </div>
                          </div>
                        </div>
                      )
                    })                    
                  )
                }else{
                  return(
                    <div key={i} className="card-gift  flex flex-column flex-space">
                      <div className="card-gift-thumb" style={divStyle(itens.url)}></div>
                        <div className="flex flex-column">
                          <div className="card-gift-name">{itens.name}</div>
                          <div className="card-gift-price">R${`${itens.price}`.replace(".", ",")}</div>
                          <div className="card-gift-desc">{itens.description.substring(0,100)}</div>
                      </div>
                      <div className="flex flex-space">
                        <div className="buttons">
                            <Link to={{
                              pathname: `/dashboard/presentes/editar-presente/${itens.id}`,
                            }} className="gradient fullcolor edit">Editar item</Link>
                            <button onClick={() => this.delete(itens.id)} className="gradient border bgwhite"><span>Excluir</span></button>
                        </div>
                      </div>
                    </div>
                  )
                }
                
              })
            }
            <div>
            </div>
            {loadingNext ? <Loader /> : ""}
      </div>

            <button onClick={() => this.getMoreGifts()} className="btn-large">Ver Mais</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gifts: state.gifts,
  categories: state.themeCategories.categories,
})

const reduxFormFilters = reduxForm({form: 'gift_filters'})(PresentesAdmin);

export default connect(mapStateToProps)(reduxFormFilters);
