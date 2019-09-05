import React, { Component } from 'react';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import { fetchExtrato } from "../actions/extratoActions";
import setSelect2 from "../assets/js/setSelect2";
import setMask from "../assets/js/mask";
import setDatePicker from '../assets/js/date-picker';
import { fetchExtratoAbstract } from "../actions/extratoActions";
import $ from "jquery";
import Loader from "./Loader";

class Extrato extends Component{

    componentDidMount(){
        setSelect2();
        setMask();
    }

    state = {
        page:2,
        financial: []
    }

    submit = () => {
        var search         = $( '#nome-usuario' ).val();
        var date_start     = $( '#inicio-periodo' ).val();
        var date_end       = $( '#fim-periodo' ).val();
        var payment_type   = $( '#select2-tipo-pagamento-container' ).val();
        var payment_method = $( '#select2-forma-pagamento-container' ).val();
        var status         = $( '#status' ).val();
        var periodo        = $("#filter-date input[name=filter_date]").val();

        search     = '' === search ? null : search;
        date_start = '' === date_start ? null : date_start;
        date_end   = '' === date_end ? null : date_end;
        
        this.props.fetchExtratoAbstract( search, date_start, date_end, payment_type, payment_method, status, 1, parseInt( periodo ) );
        this.setState({
            page: 2
        })
    }

    paginate = () => {
        var search         = $( '#nome-usuario' ).val();
        var date_start     = $( '#inicio-periodo' ).val();
        var date_end       = $( '#fim-periodo' ).val();
        var payment_type   = $( '#select2-tipo-pagamento-container' ).val();
        var payment_method = $( '#select2-forma-pagamento-container' ).val();
        var status         = $( '#status' ).val();
        var periodo        = $("#filter-date input[name=filter_date]").val();

        search         = '' === search ? null : search;
        date_start     = '' === date_start ? null : date_start;
        date_end       = '' === date_end ? null : date_end;
        payment_type   = '' === payment_type ? null : payment_type;
        payment_method = '' === payment_method ? null : payment_method;
        status         = '' === status ? null : status;
        periodo        = '' === periodo ? null : periodo;
        
        this.props.fetchExtratoAbstract( search, date_start, date_end, payment_type, payment_method, status, this.state.page, parseInt( periodo ) );
        this.state.page++;
    }

    render(){
        const { handleSubmit, financial } = this.props;
        const {extrato, loading, error, extratoAbstract } = this.props.extrato;
        setDatePicker( $, '.' + this.props.from_class, '.' + this.props.to_class );

        this.state.financial = financial;
        var last_page = true;
        if ( undefined !== extratoAbstract ) {
            last_page = extratoAbstract.last_page;
        }

        return(
            <div className="extrato">
                <div className="extrato-header">
                    <h3>Extrato de transações</h3>

                    <form name="form-financial" onSubmit={handleSubmit(this.submit)}>
                        <div className="form-extrato grid flex-center">
                            <div className="input-extrato">
                                <label htmlFor="nome-usuario">Nome do usuário</label>

                                <input type="text" name="nome-usuario" id="nome-usuario" placeholder="Digite o nome do usuário" required />

                            </div>

                            <div className="input-extrato">
                                <label htmlFor="inicio-periodo">Início do período</label>

                                <div className="form-date">
                                    <input type="text" className={ this.props.from_class + " custom-date-from" } name="inicio-periodo" id="inicio-periodo" placeholder="18/02/2019" required />
                                    <img src="../assets/imgs/calendar.svg" alt="" />
                                </div>
                            </div>

                            <div className="input-extrato">
                                <label htmlFor="fim-periodo">Fim do período</label>

                                <div className="form-date">
                                    <input type="text" className={ this.props.to_class + " custom-date-to" } name="fim-periodo" id="fim-periodo" placeholder="25/02/2019" required />
                                    <img src="../assets/imgs/calendar.svg" alt="" />
                                </div>
                            </div>

                            <div className="input-extrato">
                                <label htmlFor="">Tipo</label>

                                <select name="" id="tipo-pagamento" className="custom-select bg-white">
                                    <option value="" hidden>Todas</option>
                                    <option value="2">Aprovado</option>
                                    <option value="3">Pagamento negado</option>
                                </select>
                            </div>

                            <div className="input-extrato">
                                <label htmlFor="">Forma de pagamento</label>

                                <select name="" id="forma-pagamento" className="custom-select bg-white">
                                    <option value="" hidden>Todas</option>
                                    <option value="credito">crédito</option>
                                    <option value="debito">débito</option>
                                    <option value="boleto">boleto</option>
                                </select>
                            </div>

                            <div className="input-extrato">
                                <label htmlFor="">Status</label>

                                <div className="grid">
                                    <select name="" id="status" className="custom-select bg-white">
                                        <option value="" hidden>Todos</option>
                                        <option value="0">Pgtp. Processamento</option>
                                        <option value="1">Pgto. Realizado</option>
                                        <option value="2">Pgto. Disponível</option>
                                        <option value="4">Pgto. Negado</option>
                                    </select>

                                    <button type="submit" className="gradient fullcolor">Buscar</button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="divisor flex flex-center">
                        <div className="line"></div>
                        <div className="more">
                            <span className="btn-resultados"></span>
                            <span className="text-resultados"><span className="refinar">Refinar resultados</span><span className="ocultar">Ocultar</span></span>
                        </div>
                    </div>
                </div>

                <div className="main-grid">
                    <div className="title-main-grid grid multi-grid">
                        <p className="data-mobile">11/01/2018</p>
                        <h6>Data</h6>
                        <h6>Tipo</h6>
                        <h6>para</h6>
                        <h6>Descrição</h6>
                        <h6>V .total</h6>
                        <h6>taxas</h6>
                        <h6>pagamento</h6>
                        <h6>status</h6>
                        <h6>Liberação</h6>
                        <div></div>
                    </div>

                    { loading ? <Loader /> : 
                        error ? <p>Erro no servidor</p> :
                        ! $.isEmptyObject( this.state.financial ) && 0 !== this.state.financial.length ? this.state.financial.map((item, i) => {
                            var total = item.total;
                            total = total.toFixed(2);
                            total = total.replace(".", ",");
                            var taxa = item.netgift_tax;
                            taxa = taxa.toFixed(2);
                            taxa = taxa.replace(".", ",");
                            return (
                                <div key={i} id={item.id} className="grid-item">
                                    <div className="grid multi-grid flex-center">
                                        <div className="pill status green status-mobile">
                                            <span className="nome-mobile">{item.buyer}</span>

                                            <div className="line"></div>
                                        </div>

                                        <p>{new Date( item.date ).toLocaleDateString( 'pt-br' )}</p>

                                        <p>Crédito</p>

                                        <p>{item.buyer}</p>

                                        <p>Presente pelo site</p>

                                        <div className="valor-total">
                                            <span className="title-mobile">v. total</span>
                                            <p>R${`${total}`}</p>
                                        </div>

                                        <p className="taxas">R${`${taxa}`}</p>

                                        <div className="pagamento">
                                            <span className="title-mobile">pagamento</span>
                                            <p>{item.type}</p>
                                        </div>

                                        <div className="pill status green">
                                            <span>{item.status ? "Efetuado" : "Pendente"}</span>
                                        </div>

                                        <p>{new Date( item.possible_date ).toLocaleDateString( 'pt-br' )}</p>

                                        <button className="btn-detalhes">detalhes</button>

                                        <div className="transacao-mobile">
                                            <div className="line"></div>
                                            <div className="flex-space">
                                                <div>
                                                    <span className="title-mobile">data</span>
                                                    <p>13/01/2019</p>
                                                </div>

                                                <div>
                                                    <span className="title-mobile">Descrição</span>
                                                    <p>Presente pelo site</p>
                                                </div>

                                                <div>
                                                    <span className="title-mobile">Taxas</span>
                                                    <p className="taxas">R$13,00</p>
                                                </div>

                                                <div>
                                                    <span className="title-mobile">Status</span>
                                                    <p>Efetuado</p>
                                                </div>

                                                <div>
                                                    <span className="title-mobile">Liberação</span>
                                                    <p>13/02/19</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : "Nenhuma transação encontrada"
                    }

                    <div className="title-main-grid multi-grid data-content-mobile">
                        <p className="data-mobile">11/01/2018</p>
                    </div>

                    {
                        last_page ? "" : <button className="btn-large" onClick={this.paginate}>Ver Mais</button>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    extrato: state.extrato,
})


const reduxFormSetFilter = reduxForm({
    form: 'setfilter'
})(Extrato);

export default connect(mapStateToProps, {fetchExtratoAbstract})(reduxFormSetFilter);
