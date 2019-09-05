import React, { Component } from "react";

import "../assets/css/select2.min.css";

import $ from 'jquery';


export default class SearchTemplate extends Component {

    componentDidMount() {
        $('.custom-select').select2({
            minimumResultsForSearch: -1
        });
    }

    render() {
        let classFormTemplate = 'container content form-categ-template';
        let is_mob = 'desk';
        if (this.props.templateMobile) {
            classFormTemplate += ' form-categ-template-mob';
            is_mob = 'mob';
        } else {
            classFormTemplate += ' form-categ-template-desk';
        }

        return (
            <div className={classFormTemplate}>
                <div className="flex flex-column header-content">
                    <form className="card-purple card-purple-mob" action="">
                        <div className="flex flex-space columns-2">
                            <div className="flex flex-column">
                                <label for="categoria_festa">Escolha a categoria da festa</label>
                                <select id={"categoria_festa_" + is_mob} name="categoria_festa" className="custom-select bg-white">
                                    <option value="all" hidden>Todas as categorias</option>
                                    <option value="festa 1">festa 1</option>
                                    <option>festa 2</option>
                                </select>
                            </div>
                            <div className="flex flex-column">
                                <label for="tema_festa">Escolha um dos temas</label>
                                <select id={"tema_festa_" + is_mob} name="tema_festa" className="custom-select bg-white">
                                    <option value="all" selected>Todos os temas</option>
                                    <option>tema 1</option>
                                    <option>tema 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-column">
                            <button className="gradient fullcolor comecar-festa"><span>Procurar template</span><i className="ng-right-arrow-extend"></i></button>
                            <p className="obs"><strong>Dica:</strong> você pode deixar um dos campos da busca em branco ou usar os dois para obter um resultado melhor.</p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}