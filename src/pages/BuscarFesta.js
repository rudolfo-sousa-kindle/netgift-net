import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPage } from "../actions";
import { fetchCategories } from "../actions/categoriesActions";

import HeaderDefault from "../components/HeaderDefault";
import FooterDesloged from "../components/FooterDesloged";
import Festa from "../components/Festa";
import setTooltipster , { setMessages } from '../assets/js/plugins';
import Snackbar from 'node-snackbar';
import Select from 'react-select';

import $ from 'jquery';
import validate from 'jquery-validation';
import mask from 'jquery-mask-plugin';
import "../assets/js/validate";
import CityState from "../assets/js/city_state";

class BuscarFesta extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPage(139));
        this.props.dispatch( fetchCategories( 'categories', 'event' ) );
        
        $('.custom-select').select2({
            minimumResultsForSearch: -1
        });

        $('#data-festa, #data-festa-mobile').mask('00/00/0000');

        $( document ).on( 'input', '#nome-festa, #data-festa', function() {
            $( '#' + $( this ).attr( 'id' ) + '-mobile' ).val( $( this ).val() );
        })

        $( document ).on( 'input', '#nome-festa-mobile, #data-festa-mobile', function() {
            var id = $( this ).attr( 'id' ).replace( '-mobile', '' );
            $( '#' + id ).val( $( this ).val() );
        })

        var STATE = this;

        $('form[name="buscar-festa"]').validate({
            rules: {
                nome: {
                    required: true,
                    minlength: 4
                },
                data: {
                    required: true,
                    dtNascimento: true,
                },
            },
            errorPlacement: function (error, element) {
                var ele = element,
                    err = error.text();
                ele.addClass('formError')
                if (err != null && err !== '') {
                    setTooltipster();
                    ele.tooltipster('content', err);
                    ele.tooltipster('open');
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if ( $(element).hasClass( 'tooltipstered' ) ) {
                    $(element).removeClass('formError').addClass(validClass).tooltipster('close');
                }
            },
            submitHandler: function (form) {
                var quem = $( '#nome-festa' ).val();
                var data = $( '#data-festa' ).val();

                $("html, body").animate({ scrollTop: $('.ng-eye').offset().top }, 1000);

                STATE.setState({
                    quem: quem,
                    data: data,
                });
            }
        })

        $( document ).on( 'submit', '.filter-events-form', function( event ) {
            event.preventDefault();

            var form = $( this ).hasClass( 'form-mob' ) ? '-mob' : '';
                console.log( $( '#tipo-mob' ).val() );

            STATE.setState({
                tipo: $( '#tipo' + form ).val(),
                estado: $( '#estado' + form ).val(),
                cidade: $( '#cidade' + form ).val(),
            });
        });
    }

    state = {
        quem: null,
        data: null,
        tipo: null,
        estado: null,
        cidade: null,
        cidades: [
            {value: null, label: 'Todas as cidades'}
        ],
        thematics: [
            {value: null, label: 'Todos os Tipos'}
        ]
    };

    selectState( item, id ) {
        var cidades = [
            {value: null, label: 'Todas as cidades'}
        ];

        item.cidades.map( ( cidade ) => {
            cidades.push({
                value: cidade,
                label: cidade
            });
        });

        var id = id.replace( 'select-', '' );
        $( '#' + id ).val( item.value );

        this.setState({
            cidades: cidades
        });
    }

    setValue( item, id ) {
        var id = id.replace( 'select-', '' );

        $( '#' + id ).val( item.value );
    }

    render() {
        let is_mob = 'desk';
        if (this.props.templateMobile) {
            is_mob = 'mob';
        }

        const { error, loading, page, thematics } = this.props;
        const { items } = page;
        const { meta_fields } = items;

        console.log( thematics )

        $('header.wave').css({
            'background-image': 'url(' + items.thumbnail + ')',
            'background-position': 'center'
        });

        if ( undefined !== meta_fields && items.ID == 139 ) {
            $('#another_events_description').html(meta_fields.another_events_description[0]);
            $('#ntgift_start_party_description').html(meta_fields.ntgift_start_party_description[0]);
            $('.flex-column > .icon-text .icon').html(meta_fields.another_events_icon);
            $('.flex-end > .icon-text .icon').html(meta_fields.ntgift_start_party_icon);
        }

        var tipos = [
            {value: null, label: 'Todas os Tipos'}
        ];

        if ( undefined !== thematics ) {
            thematics.map( ( item ) => {
                tipos.push({ value: item.id, label: item.name });
            });
        }

        this.state.thematics = tipos;

        var estados = CityState.city_state.estados;

        return(
            <main className="buscar-festa">
                <header className="default wave">
                    <div className="container lg">
                        <HeaderDefault />
                    </div>

                    <div className="container content">
                        <div className="flex flex-column header-content">
                            <h2 className="title">{items.post_title}</h2>
                            <p className="subtitle">{items.post_content}</p>
                        </div>
                    </div>

                    <div className="container content form-categ-template">
                        <div className="flex flex-column header-content">
                            <form className="card-purple card-purple-mob search-event" name="buscar-festa">
                                <div className="flex flex-space columns-2">
                                    <div className="flex flex-column">
                                        <label for="nome-festa">Quem está festejando?</label>

                                        <input type="text" id="nome-festa" name="name" placeholder="Digite o nome que deseja buscar" required/>
                                    </div>

                                    <div className="flex flex-column">
                                        <label for="data-festa" >Selecione uma data</label>
                  
                                        <input id="data-festa" type="text" name="data" placeholder="DD/MM/AA" required/>
                                    </div>
                                </div>
                                <div className="flex flex-column">
                                    <button className="gradient fullcolor comecar-festa"><span>Buscar festa</span><i className="ng-right-arrow-extend"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </header>

                <div className="container content form-categ-template form-categ-template-mob">
                    <div className="flex flex-column header-content">
                        <form className="card-purple card-purple-mob search-event">
                            <div className="flex flex-space columns-2">
                                <div className="flex flex-column">
                                    <label for="nome-festa-mobile">Quem está festejando?</label>

                                    <input type="text" id="nome-festa-mobile" placeholder="Digite o nome que deseja buscar" required/>
                                </div>

                                <div className="flex flex-column">
                                    <label for="data-festa-mobile" >Selecione uma data</label>
            
                                    <input id="data-festa-mobile" type="text" placeholder="DD/MM/AA" required/>
                                </div>
                            </div>
                            <div className="flex flex-column">
                                <button className="gradient fullcolor comecar-festa"><span>Buscar festa</span><i className="ng-right-arrow-extend"></i></button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="container md content sect-filter">
                    <div className="flex flex-space flex-column">
                        <div className="flex flex-column icon-text lg">
                            <div className="icon shadow-20 rounded gradient-roxo">
                            </div>
                            <p className="title" id="another_events_description"></p>
                        </div>
                        <form className="menu-filtros-festas flex flex-space filter-events-form" name="filter_events_form">
                            <div className="column-1 flex flex-space flex-end">
                                <div className="flex flex-column">
                                    <label for="tipo-festa">Tipo de Festa</label>
                                    <input type="hidden" id="tipo" />
                                    <Select
                                        options={this.state.thematics}
                                        className="select-filter"
                                        id="select-tipo"
                                        isSearchable={false}
                                        placeholder={'Selecione o Tipo'}
                                        onChange={(item) => {this.setValue(item, 'select-tipo')}}
                                    />
                                </div>
                                <div className="flex flex-column">
                                    <label for="estado-festa">Estado da Festa</label>
                                    <input type="hidden" id="estado" />
                                    <Select
                                        options={estados}
                                        className="select-filter"
                                        id="select-estado"
                                        isSearchable={false}
                                        placeholder={'Selecione o estado'}
                                        onChange={(item) => {this.selectState(item, 'select-estado')}}
                                    />
                                </div>
                                <div className="flex flex-column">
                                    <label for="cidade-festa">Cidade</label>
                                    <input type="hidden" id="cidade" />
                                    <Select
                                        options={this.state.cidades}
                                        className="select-filter"
                                        id="select-cidade"
                                        isSearchable={false}
                                        placeholder={'Selecione o cidade'}
                                        onChange={(item) => {this.setValue(item, 'select-cidade')}}
                                    />
                                </div>
                                <button className="gradient fullcolor"><span>Buscar festa</span><i className="ng-right-arrow-extend"></i></button>
                            </div>
                            <div className="column-2">
                                <p className="result">Resultado</p>
                                <p className="result-info">Exibindo todas <br/>as festas</p>
                            </div>
                        </form>
                        <div className="menu-filtros-festas menu-filtros-festas-mob flex flex-space">
                            <form class="filter-events-form form-mob" name="filter_events_form_mob">
                                <div className="select-filter-categ card">
                                    <p className="filtrar" id="filter">Filtrar <i className="ng-down-open"></i><button className="apply-filters">APLICAR</button></p>
                                </div>
                                <div className="column-1 flex flex-space flex-end form-filters-mob" id="form-filters-mob">
                                    <div className="flex flex-column">
                                        <label for="tipo-festa">Tipo de Festa</label>
                                        <input type="hidden" id="tipo-mob" />
                                        <Select
                                            options={this.state.thematics}
                                            className="select-filter"
                                            id="select-tipo-mob"
                                            isSearchable={false}
                                            placeholder={'Selecione o Tipo'}
                                            onChange={(item) => {this.setValue(item, 'select-tipo-mob')}}
                                        />
                                    </div>
                                    <div className="flex flex-column column-2">
                                        <div className="flex flex-column">
                                            <label for="estado-festa">Estado da Festa</label>
                                            <input type="hidden" id="estado-mob" />
                                            <Select
                                                options={estados}
                                                className="select-filter"
                                                id="select-estado-mob"
                                                isSearchable={false}
                                                placeholder={'Selecione o estado'}
                                                onChange={(item) => {this.selectState(item, 'select-estado-mob')}}
                                            />
                                        </div>
                                        <div className="flex flex-column">
                                            <label for="cidade-festa">Cidade</label>
                                            <input type="hidden" id="cidade-mob" />
                                            <Select
                                                options={this.state.cidades}
                                                className="select-filter"
                                                id="select-cidade-mob"
                                                isSearchable={false}
                                                placeholder={'Selecione o cidade'}
                                                onChange={(item) => {this.setValue(item, 'select-cidade-mob')}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <Festa 
                        quem={this.state.quem}
                        data={this.state.data}
                        tipo={this.state.tipo}
                        estado={this.state.estado}
                        cidade={this.state.cidade}
                    />
                </div>

                <div className="container md content waves-mob">
                    <div className="flex flex-space flex-end">

                        <div className="flex flex-column icon-text lg">
                            <div className="icon shadow-20 rounded gradient-roxo">
                                
                            </div>
                            <p className="title" id="ntgift_start_party_description"></p>
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
    thematics: state.themeCategories.categories,
})
  

export default connect(mapStateToProps)(BuscarFesta);