import React, { Component } from "react";
import ImageUploader from 'react-images-upload';
import $ from 'jquery';
import { connect } from 'react-redux';
import "../assets/js/presenteNovo";
import { sendGift, fetchGiftCategories } from "../actions/giftActions";
import { fetchCategories, fetchSetCategories } from "../actions/categoriesActions";
import setSelect2 from "../assets/js/setSelect2";
import CreatableSelect from 'react-select/creatable';
import Loader from "./Loader";

const image2base64 = require('image-to-base64');

const bgImage = {
  "backgroundImage": "url(https://havan.vteximg.com.br/arquivos/ids/3270937-1200-1200/aparelho-de-jantar-e-cha-rosas-20-pecas-biona-1-21.jpg?v=636669152638700000)"
}

class PresentesAdminNovo extends Component {

    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount(){
        setSelect2();
        this.props.fetchGiftCategories();
    }

    onDrop(picture) {
        // console.log(picture)
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

    state = {
        current_categories: [],
        current_thematics: [],
        available_categories: [],
        available_thematics: {},
    };

    handleChangeCategories = (newValue: any, actionMeta: any ) => {
        // console.group('Value Changed');

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
                this.props.fetchGiftCategories('categories')
                .then(res => {

                    let catNew = $("input[name=tema-categoria]").val();
                    catNew = catNew + "," + res[res.length - 1].id
                    $("input[name=tema-categoria]").val(catNew);
                    newValue[ last_new_index ].value = res[res.length - 1].id;
                });
            });
        }

        let cat = 0;
        if(newValue != null){
            newValue.map((item) => {
                cat = cat + "," + item.value;
            })
        }

        $("input[name=tema-categoria]").val(cat);
        console.log( actionMeta );
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
                image2base64(this.state.imgSrc[0])
                .then(
                    (response) => {
                        values["image"] = response;
                        values["nome_presente"] = $("input[name=nome-presente]").val();
                        values["price"] = $("input[name=valor-presente]").val();
                        values["description"] = $("textarea[name=descricao-presente]").val();
                        values["category_id"] = $("input[name=tema-categoria]").val();
                        this.props.sendGift(values, this.props.history);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
            }.bind(this)
            
        }else{
            values["nome_presente"] = $("input[name=nome-presente]").val();
            values["price"] = $("input[name=valor-presente]").val();
            values["description"] = $("textarea[name=descricao-presente]").val();
            values["category_id"] = $("input[name=tema-categoria]").val();
            this.props.sendGift(values, this.props.history);
        }


    }

  render() {
      const{ gifts } = this.props;
      const {loading, success, items, error} = gifts;
      const {giftsCategories} = gifts;

    if ( undefined !== giftsCategories && 0 !== giftsCategories.length ) {
            this.state.current_categories = giftsCategories;
    }
    
    var categ_options   = [];
    var category_values = [];

    if ( undefined !== this.state.current_categories ) {
        this.state.current_categories.map( ( category, index ) => {
            var id = category.id;
            var name = category.name;
            categ_options.push( { value: id, label : name } );
            if(giftsCategories){
                giftsCategories.map( ( categ ) => {
                    if ( categ.category_id === id ) {
                        var default_option = {
                            value: id,
                            label: name,
                        };
                        category_values.push( default_option );
                    }
                });
            }
        })
    }

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
                                <h2 className="title">Novo Presente</h2>
                                <p className="subtitle"></p>
                            </div>
                            <div className="line"></div>
                            <div className="main-options">
                                <div className="grid grid-input">

                                    <div className="">
                                        <label htmlFor="tipo-festa" className="label-theme">Nome do presente <i className="ng-info-circled"></i></label>

                                        <input type="text" className="input-theme" name="nome-presente" id="nome-presente" placeholder="Digite o nome do presente" />
                                    </div>

                                    <div>
                                        <label htmlFor="valor-presente" className="label-theme">Valor do presente</label>

                                        <input type="text" className="input-theme" name="valor-presente" id="valor-presente" placeholder="Ex: R$350,00" />
                                    </div>

                                    <div>
                                        <label htmlFor="tipo-festa" className="label-theme">Categoria do presente</label>
                                        <input type="hidden" name="tema-categoria" />
                                        <CreatableSelect
                                            isMulti
                                            isClearable
                                            onChange={this.handleChangeCategories}
                                            defaultValue={category_values}
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

                                    <textarea name="descricao-presente" id="descricao_presente" cols="30" rows="5" placeholder="Digite a descrição que aparecerá para o usuário"></textarea>
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
                                {loading ? <Loader /> : ""}
                                {success ? <p className="alert-success">Prensete Adicionado!</p> : ""}
                            </div>
                        </form>
                    </div>

                    <div className="card-gift  flex flex-column flex-space">
                        <div className="card-gift-thumb" style={bgImage}></div>
                        <div className="flex flex-column">
                            <div className="card-gift-name">Aparelho de jantar</div>
                            <div className="card-gift-price">R$3.343,60</div>
                            <div className="card-gift-desc">Mauris sit amet pulvinar purus, id efficitur tellus. Curabitur facilisis enim quis nisl aliqua</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
  }
}

const mapStateToProps = state => ({
    gifts: state.gifts
  })

export default connect(mapStateToProps, {sendGift,fetchGiftCategories, fetchSetCategories, fetchCategories})(PresentesAdminNovo);
