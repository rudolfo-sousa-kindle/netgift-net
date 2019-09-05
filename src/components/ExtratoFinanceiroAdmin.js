import React, { Component } from "react";



class ExtratoFinanceiroAdmin extends Component {

  componentDidMount(){
    
  }

  render() {
    return (
      <div className="wrap-content financeiro extrato-financeiro">

        <div className="content-title">
            <div className="flex flex-baseline flex-space">
                <div>
                    <h1>Extrato financeiro</h1>
                    <h2>Você está no painel de visualização financeira: aproveite para checar as solicitações.</h2>
                    <h2 className="subtitle-mobile">Você está no painel de extrato financeiro</h2>
                </div>

                <div className="filter-admin">
                    <select name="filter_date" id="" className="select-filter-admin select-filter-date">
                        <option value="day">Diário</option>
                        <option value="week" defaultValue>Semanal</option>
                        <option value="month">Mensal</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="extrato">
            <div className="extrato-header">
                <h3>Extrato de financeiro</h3>

                <div className="form-extrato grid flex-center">
                    <div className="input-extrato">
                        <label htmlFor="">Período</label>

                        <select name="" id="" className="custom-select bg-white">
                            <option value="" hidden>Último 3 dias</option>
                            <option value="">Último 7 dias</option>
                            <option value="">Pagamento negado</option>
                        </select>
                    </div>

                    <div className="input-extrato">
                        <label htmlFor="inicio-periodo">Início do período</label>

                        <div className="form-date">
                            <input type="text" className="custom-date-from" name="inicio-periodo" id="inicio-periodo" defaultValue="18/02/2019" required />
                            <img src="../assets/imgs/calendar.svg" alt="" />
                        </div>
                    </div>

                    <div className="input-extrato">
                        <label htmlFor="fim-periodo">Fim do período</label>

                        <div className="form-date">
                            <input type="text" className="custom-date-to" name="fim-periodo" id="fim-periodo" defaultValue="25/02/2019" required />
                            <img src="../assets/imgs/calendar.svg" alt="" />
                        </div>
                    </div>


                    <div className="input-extrato">
                        <label htmlFor="">Status</label>

                        <div className="grid">
                            <select name="" id="" className="custom-select bg-white">
                                <option value="" hidden>Todos</option>
                                <option value="">Aprovado</option>
                                <option value="">Pgto. negado</option>
                            </select>

                            <button className="gradient fullcolor">Buscar</button>
                        </div>
                    </div>
                </div>

                <div className="divisor flex flex-center">
                    <div className="line"></div>
                    <div className="more">
                        <span className="btn-resultados"></span>
                        <span className="text-resultados"><span className="refinar">Refinar resultados</span><span className="ocultar">Ocultar</span></span>
                    </div>
                </div>
            </div>

            <div className="grid grid-box">
                <div className="card-box green">
                    <span>Revenue share no período
                        <i className="ng-info-circled tooltip-revenue"></i>
                    </span>

                    <h2>R$9,00</h2>
                </div>

                <div className="card-box blue">
                    <span>Pagamentos no período
                        <i className="ng-info-circled tooltip-pagamentos"></i>
                    </span>

                    <h2>R$278,85</h2>
                </div>

                <div className="card-box yellow">
                    <span>Valores bloqueados no período
                        <i className="ng-info-circled tooltip-valores"></i>
                    </span>

                    <h2>R$150,00</h2>
                </div>
            </div>

            <div className="main-grid">
                <div className="title-main-grid grid multi-grid">
                    <h6>Data</h6>
                    <h6>Código</h6>
                    <h6>Origem</h6>
                    <h6>Descrição</h6>
                    <h6>Evento</h6>
                    <h6>valor</h6>
                </div>

                <div className="grid-item">
                    <div className="grid multi-grid flex-center">
                        <div className="status-mobile">
                            <div className="flex flex-space">
                                <span className="nome-mobile">Letícia Aragão Cataldo</span>

                                <p className="evento green">Revenue Share</p>
                            </div>

                            <div className="line"></div>
                        </div>

                        <p>13/01/2019</p>

                        <p className="codigo">#0123456789</p>

                        <span className="origem-mobile">Recebimento de taxa</span>

                        <div className="valor-total">
                            <span className="title-mobile">valor</span>
                            <p className="txt-green">R$5,70</p>
                        </div>

                        <p className="descricao">Revenue share de Letícia Cataldo</p>

                        <p className="evento green">Revenue Share</p>

                        <p className="txt-green">R$5,70</p>

                        <button className="btn-detalhes">detalhes</button>

                        <div className="transacao-mobile">
                            <div className="line"></div>

                            <div className="transacao-row-1">
                                <div>
                                    <span className="title-mobile">data</span>
                                    <p>13/01/2019</p>
                                </div>

                                <div>
                                    <span className="title-mobile">Código</span>
                                    <p className="codigo">#0123456789</p>
                                </div>
                            </div>

                            <div>
                                <span className="title-mobile">Status</span>
                                <p>Recebimento de taxa</p>
                            </div>

                            <div>
                                <span className="title-mobile">Descrição</span>
                                <p>Revenue share de Letícia Cataldo</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-item">
                    <div className="grid multi-grid flex-center">
                        <div className="status-mobile">
                            <div className="flex flex-space">
                                <span className="nome-mobile">Letícia Aragão Cataldo</span>

                                <p className="evento blue">Pagamento</p>
                            </div>

                            <div className="line"></div>
                        </div>

                        <p>13/01/2019</p>

                        <p className="codigo">#0123456789</p>

                        <span className="origem-mobile">Pagamento para usuário</span>

                        <div className="valor-total">
                            <span className="title-mobile">valor</span>
                            <p className="txt-green">R$5,70</p>
                        </div>

                        <p className="descricao">Revenue share de Letícia Cataldo</p>

                        <p className="evento green">Revenue Share</p>

                        <p className="txt-green">R$5,70</p>

                        <button className="btn-detalhes">detalhes</button>

                        <div className="transacao-mobile">
                            <div className="line"></div>

                            <div className="transacao-row-1">
                                <div>
                                    <span className="title-mobile">data</span>
                                    <p>13/01/2019</p>
                                </div>

                                <div>
                                    <span className="title-mobile">Código</span>
                                    <p className="codigo">#0123456789</p>
                                </div>
                            </div>

                            <div>
                                <span className="title-mobile">Status</span>
                                <p>Recebimento de taxa</p>
                            </div>

                            <div>
                                <span className="title-mobile">Descrição</span>
                                <p>Revenue share de Letícia Cataldo</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-item">
                    <div className="grid multi-grid flex-center">
                        <div className="status-mobile">
                            <div className="flex flex-space">
                                <span className="nome-mobile">Letícia Aragão Cataldo</span>

                                <p className="evento yellow">Valor Bloqueado</p>
                            </div>

                            <div className="line"></div>
                        </div>

                        <p>13/01/2019</p>

                        <p className="codigo">#0123456789</p>

                        <span className="origem-mobile">Pagamento para usuário</span>

                        <div className="valor-total">
                            <span className="title-mobile">valor</span>
                            <p className="txt-green">R$5,70</p>
                        </div>

                        <p className="descricao">Revenue share de Letícia Cataldo</p>

                        <p className="evento green">Revenue Share</p>

                        <p className="txt-green">R$5,70</p>

                        <button className="btn-detalhes">detalhes</button>

                        <div className="transacao-mobile">
                            <div className="line"></div>

                            <div className="transacao-row-1">
                                <div>
                                    <span className="title-mobile">data</span>
                                    <p>13/01/2019</p>
                                </div>

                                <div>
                                    <span className="title-mobile">Código</span>
                                    <p className="codigo">#0123456789</p>
                                </div>
                            </div>

                            <div>
                                <span className="title-mobile">Status</span>
                                <p>Recebimento de taxa</p>
                            </div>

                            <div>
                                <span className="title-mobile">Descrição</span>
                                <p>Revenue share de Letícia Cataldo</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-item">
                    <div className="grid multi-grid flex-center">
                        <div className="status-mobile">
                            <div className="flex flex-space">
                                <span className="nome-mobile">Letícia Aragão Cataldo</span>

                                <p className="evento green">Revenue Share</p>
                            </div>

                            <div className="line"></div>
                        </div>

                        <p>13/01/2019</p>

                        <p className="codigo">#0123456789</p>

                        <span className="origem-mobile">Pagamento para usuário</span>

                        <div className="valor-total">
                            <span className="title-mobile">valor</span>
                            <p className="txt-green">R$5,70</p>
                        </div>

                        <p className="descricao">Revenue share de Letícia Cataldo</p>

                        <p className="evento green">Revenue Share</p>

                        <p className="txt-green">R$5,70</p>

                        <button className="btn-detalhes">detalhes</button>

                        <div className="transacao-mobile">
                            <div className="line"></div>

                            <div className="transacao-row-1">
                                <div>
                                    <span className="title-mobile">data</span>
                                    <p>13/01/2019</p>
                                </div>

                                <div>
                                    <span className="title-mobile">Código</span>
                                    <p className="codigo">#0123456789</p>
                                </div>
                            </div>

                            <div>
                                <span className="title-mobile">Status</span>
                                <p>Pagamento para usuário</p>
                            </div>

                            <div>
                                <span className="title-mobile">Descrição</span>
                                <p>Revenue share de Letícia Cataldo</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-item">
                    <div className="grid multi-grid flex-center">
                        <div className="status-mobile">
                            <div className="flex flex-space">
                                <span className="nome-mobile">Letícia Aragão Cataldo</span>

                                <p className="evento green">Revenue Share</p>
                            </div>

                            <div className="line"></div>
                        </div>

                        <p>13/01/2019</p>

                        <p className="codigo">#0123456789</p>

                        <span className="origem-mobile">Compra pelo site</span>

                        <div className="valor-total">
                            <span className="title-mobile">valor</span>
                            <p className="txt-green">R$5,70</p>
                        </div>

                        <p className="descricao">Revenue share de Letícia Cataldo</p>

                        <p className="evento green">Revenue Share</p>

                        <p className="txt-green">R$5,70</p>

                        <button className="btn-detalhes">detalhes</button>

                        <div className="transacao-mobile">
                            <div className="line"></div>

                            <div className="transacao-row-1">
                                <div>
                                    <span className="title-mobile">data</span>
                                    <p>13/01/2019</p>
                                </div>

                                <div>
                                    <span className="title-mobile">Código</span>
                                    <p className="codigo">#0123456789</p>
                                </div>
                            </div>

                            <div>
                                <span className="title-mobile">Status</span>
                                <p>Compra pelo site</p>
                            </div>

                            <div>
                                <span className="title-mobile">Descrição</span>
                                <p>Revenue share de Letícia Cataldo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  gifts: state.gifts
})


export default ExtratoFinanceiroAdmin;
