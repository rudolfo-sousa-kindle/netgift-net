import React, { Component } from "react";
import $ from "jquery";
import { connect } from "react-redux";
import { fetchGift, fetchGiftCategories, editGift } from "../actions/giftActions";
import setSelect2 from "../assets/js/setSelect2";
import ImageUploader from 'react-images-upload';
import {defaultStyle} from "./styleFunctions";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { fetchCategories, fetchSetCategories } from "../actions/categoriesActions";
import Loader from "./Loader";

const image2base64 = require('image-to-base64');

const bgImage = {
    "backgroundImage": "url(https://havan.vteximg.com.br/arquivos/ids/3270937-1200-1200/aparelho-de-jantar-e-cha-rosas-20-pecas-biona-1-21.jpg?v=636669152638700000)"
  }

var categ_options;
var category_values;

class PresentesAdminEditar extends Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture), imgSrc: ""
        });
        var pathImg            = $('.uploadPicture').attr('src');
        var nome_presente      = $('#nome-presente').val();
        var valor_presente     = $('#valor-presente').val();
        var descricao_presente = $('#descricao_presente').val();

        $('.card-gift-name').html(nome_presente);
        $('.card-gift-price').html('R$' + valor_presente);
        $('.card-gift-desc').html(descricao_presente);
        $('.card-gift').fadeIn(200);
        $('.card-gift-thumb').append('<img src=" ' + pathImg + '" >');
    }

    submit = (e) => {
        e.preventDefault();
        var values = {};
        var file = this.state.pictures[0];
        var reader = new FileReader();
        if(file){
            var url = reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                this.setState({
                    imgSrc: [reader.result]
                });
                image2base64(this.state.imgSrc[0]) // you can also to use url
                .then(
                    (response) => {
                        values["image"] = response;
                        values["nome_presente"] = $("input[name=nome-presente]").val();
                        values["price"] = $("input[name=valor-presente]").val();
                        values["description"] = $("input[name=descricao-presente]").val();
                        values["category_id"] = $("input[name=tema-categoria]").val();
                        values["old_categories"] = $("input[name=old-categories]").val();
                        console.log( $("input[name=old-categories]").val() );
                        this.props.editGift(values, this.props.history, this.props.match.params.id);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error); //Exepection error....
                    }
                )
            }.bind(this)
        }else{
            values["nome_presente"] = $("input[name=nome-presente]").val();
            values["price"] = $("input[name=valor-presente]").val();
            values["description"] = $("input[name=descricao-presente]").val();
            values["category_id"] = $("input[name=tema-categoria]").val();
            values["old_categories"] = $("input[name=old-categories]").val();
            console.log(values)
            this.props.editGift(values, this.props.history, this.props.match.params.id);
        }

    }

    handleChangeCategories = (newValue: any, actionMeta: any ) => {
        // console.group('Value Changed');
        let cat = 0;
        if(newValue != null){
            newValue.map((item) => {
                cat = cat + "," + item.value;
            })
        }

        $("input[name=tema-categoria]").val(cat);

        if ( 'create-option' === actionMeta.action ) {
            var last_new_option;
            var last_new_index;
            newValue.map( ( current_value, index ) => {
                if ( current_value.hasOwnProperty( '__isNew__' ) ) {
                    last_new_option = current_value;
                    last_new_index  = index;
                }
            });
            this.props.fetchSetCategories( 'category', last_new_option.value, "gift" ).then( ( response ) => {
                newValue[ last_new_index ].value = response.id;
                this.props.fetchGiftCategories('categories')
                .then(res => {
                    let catNew = $("input[name=tema-categoria]").val();
                    catNew = catNew + "," + res[res.length - 1].id
                    $("input[name=tema-categoria]").val(catNew);
                });
            });
        }

        // console.log( newValue );
        // console.log( actionMeta );
        // console.log(`action: ${actionMeta.action}`);
        // console.groupEnd();
    }



  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.fetchGift(id);
    this.props.fetchGiftCategories();
  }

  state = {
    category_values : null,
    categ : null,
  }

  render() {

    category_values = null;
      const {gifts} = this.props.state;
      const {item, error, loadingOne, loadingSend, loading} = gifts;
      const {giftsCategories} = gifts;
      var gift = {};
      var bgUrl;

      if(!loading && !loadingOne){
            this.state.category_values = [];
            this.state.categ = 0;
            bgUrl = {
                "backgroundImage" : item[0].url
            }
            $('.card-gift').fadeIn(200);
            gift = item[0];
            var cat = 0;
            category_values = [];
            setSelect2(gift.category_id);
            item.map((i, j) => {
                i.categories.map((cat, index) => {
                        let default_option = {
                            value: cat.id,
                            label: cat.name,
                        };
                        category_values.push( default_option );
                    })
                    
                    category_values.map((item) => {
                        cat = cat + "," + item.value;
                    })
                })
                if(cat != 0){
                    $("input[name=tema-categoria]").val(cat);
                }
            console.log(category_values)

        }
        

        if(giftsCategories){
            categ_options = [{}];
            
            giftsCategories.map( ( category, i ) => {
                var id = category.id;
                var name = category.name;
                categ_options.push( { value: id, label : name } );
            })
        }

if (null === category_values ) {
    return( <Loader /> );
} else {
    return (
        <div className="wrap-content novo-tema presentes-2">

        <div className="content-title">
            <div className="flex flex-baseline flex-space">
                <div>
                    <h1>Presentes</h1>
                    <h2>Edite, exclua ou crie novos presentes</h2>
                </div>

                <button className="gradient fullcolor disabled">Novo presente</button>
            </div>
        </div>

        <section className="card-options">
            <div className="content-card-options grid">
                <div>
                    <form onSubmit={this.submit}>
                        <div className="header-card-options">
                            <h2 className="title">Editar presente</h2>
                            <p className="subtitle"></p>
                        </div>
                        <div className="line"></div>
                        <div className="main-options">
                            <div className="grid grid-input">

                                <div className="">
                                    <label htmlFor="tipo-festa" className="label-theme">Nome do presente <i className="ng-info-circled"></i></label>

                                    <input type="text" 
                                        className="input-theme" 
                                        name="nome-presente" 
                                        id="nome-presente" 
                                        placeholder="Digite o nome do presente" 
                                        defaultValue={loadingOne ? "" : gift.name } 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="valor-presente" className="label-theme">Valor do presente</label>

                                    <input type="text" 
                                        className="input-theme" 
                                        name="valor-presente" 
                                        id="valor-presente" 
                                        placeholder="Ex: R$350,00" 
                                        defaultValue={loadingOne ? "" : gift.price} 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="tipo-festa" className="label-theme">Categoria do presente</label>
                                    <input type="hidden" name="tema-categoria" />
                                    <CreatableSelect
                                        isMulti
                                        isClearable
                                        onChange={this.handleChangeCategories}
                                        defaultValue={this.state.category_values}
                                        options={categ_options}
                                        className="selecione"
                                        id="tema-categoria"
                                        closeMenuOnSelect={false}
                                        placeholder="Selecione"
                                        formatCreateLabel={(input_text)=>{return <span>{'Adicionar "' + input_text + '" como nova categoria.'}</span>}}
                                    />
                                </div>
                            </div>

                            <div className="div-textarea">
                                <label htmlFor="descricao-presente" className="label-theme">Descrição do presente</label>

                                <input name="descricao-presente" 
                                id="descricao_presente"
                                placeholder="Digite a descrição que aparecerá para o usuário" 
                                defaultValue={loadingOne ? "" : gift.description}></input>
                            </div>
                        </div>

                        <div className="foto-presente">
                            <div className="add-foto">
                                {/* <button className="fileup-btn">
                                    Adicionar foto
                                    <input type="file" id="upload-presente" multiple accept="image/*" />
                                </button> */}
                                <ImageUploader
                                    buttonClassName="fileup-btn"
                                    buttonText="Adicionar foto"
                                    withIcon={false}
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                    withPreview={true}
                                    singleImage={true}
                                    fileSizeError={'true'}
                                />
                                <div id="upload-presente-preview" className="queue"></div>
                            </div>

                            <button className="fullcolor gradient">Salvar e criar presente</button>
                        </div>
                        {loadingSend ? <Loader/> : ""}
                    </form>
                </div>

                <div className="card-gift flex flex-column flex-space">
                    <div className="card-gift-thumb" style={defaultStyle({backgroundImage: gift.url, backgroundSize: "cover"})}></div>
                    <div className="flex flex-column">
                        <div className="card-gift-name">{loadingOne ? "" : gift.name }</div>
                        <div className="card-gift-price">{loadingOne ? "" : "R$" + gift.price }</div>
                        <div className="card-gift-desc">{loadingOne ? "" : gift.description }</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
  }
}
}


const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps,{fetchGift,fetchGiftCategories,editGift, fetchSetCategories})(PresentesAdminEditar);
