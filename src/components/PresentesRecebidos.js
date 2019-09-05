import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from 'moment';

import { fetchListGifts } from '../actions/listGiftsAction';

import ResumeOrganizer from './ResumeOrganizer';
import ResumeOrganizerMobile from './ResumeOrganizerMobile';


class PresentesRecebidos extends Component {
    componentDidMount() {
        this.props.fetchListGifts(this.props.match.params.id);
    }

    render() {
        const { listGifts } = this.props;

        return(
            <div className="lista-presentes-3">
                <div className="container">
                    <div className="summary">
                        <div className="left">
                            <h2 className="title">Presentes recebidos</h2>
                            <div className="buttons">
                                <Link to={"/convidados/" + this.props.match.params.id}>
                                    <button className="gradient border">
                                        <span>Buscar convidado</span>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <ResumeOrganizerMobile id_event={this.props.match.params.id} />

                        <ResumeOrganizer id_event={this.props.match.params.id} />
                    </div>

                    <div className="card-default my50 mT20 w100 hide-desk">
                        <div className="flex flex-column">
            
                            <div className="flex flex-space">
                                <div className="status-filter flex flex-center">
                                    <button className="badges-filter">Aprovado</button>
                                    <button className="badges-filter">Em aprovação</button>
                                </div>
                            </div>

                            <div className="items-lista">

                                {
                                    listGifts.items.length !== 0 ? listGifts.items.deram_presentes.gifts.map((item) => {
                                        return (
                                            <div className="item-lista flex flex-space" key={item.id}>
                                                <div className="flex flex-column">
                                                    <p className="convidado">{item.quem_deu}</p>
                                                    <p className="presente">{item.name}</p>
                                                </div>
                                                <div className="flex flex-column flex-end">
                                                    <p className="data">{moment(item.date).format('L')}</p>
                                                    <p className="preco">{item.price}</p>
                                                    <div className="tags tag-yellow">
                                                        <p>Em aprovação</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : ''
                                }

                                <div className="item-lista flex flex-space">
                                    <div className="flex flex-column">
                                        <p className="convidado">Rafael e Família</p>
                                        <a href="#" className="presente">Aparelho de Jantar c/ 12 peças</a>
                                    </div>
                                    <div className="flex flex-column flex-end">
                                        <p className="data">01/10/2018</p>
                                        <p className="preco">R$129,00</p>
                                        <div className="tags tag-green">
                                            <p>Aprovado</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn-large" id="btn-load-more">Carregar mais...</button>

                            </div>

                        </div>
                    </div>

                    <div className="card-table w100 carregar-mais">
                        <table width="100%" className="custom-table">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Item</th>
                                    <th>Convidados</th>
                                    <th>Valor bruto</th>
                                    <th>Valor líquido</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listGifts.items.length !== 0 ? listGifts.items.deram_presentes.gifts.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{moment(item.date).format('L')}</td>
                                                <td className="desc-item">
                                                    {item.name}
                                                </td>
                                                <td>{item.quem_deu}</td>
                                                <td>{item.price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
                                                <td>R$119,90</td>
                                                <td>
                                                    <div className="tags tag-yellow">
                                                        <p>Em aprovação</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : ''
                                }
                                <tr>
                                    <td></td>
                                    <td className="desc-item">
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <button className="btn-large" id="btn-load-more">Carregar mais...</button>
                    </div>

                    <div className="footer-logged">
                        <p>&copy; 2018-2019 NETGIFT - CNPJ 99.304.41/0001-00</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    listGifts: state.listGifts
})

export default connect(mapStateToProps, {fetchListGifts})(PresentesRecebidos);