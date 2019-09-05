import React, {Component} from "react";
import {connect} from "react-redux";

import { fetchEditProfileUser } from '../actions/editProfileUserAction';
import { fetchAddBankUser } from '../actions/addBankAction';
import { fetchGetBankUser } from '../actions/getBankAction';
import { fetchEditBankUser } from '../actions/editBankAction';
import { fetchBankDefault } from '../actions/setBankDefaultAction';
import { fetchDeleteBankUser } from '../actions/deleteBankAction';
import { fetchGetUser } from '../actions/getUserAction';

import setMask from '../assets/js/mask';
import setSelect2 from "../assets/js/setSelect2";

import $ from 'jquery';

import banco from '../assets/imgs/nova-conta.svg';
import bancoDoBrasil from '../assets/imgs/banco-do-brasil.png';
import bradesco from '../assets/imgs/bradesco.png';
import santander from '../assets/imgs/santander.png';
import itau from '../assets/imgs/itau.png';
import caixa from '../assets/imgs/caixa.png';

import { setValidate } from '../assets/js/plugins'


class EditarPerfil extends Component {
    componentDidMount() {
        let id_user = localStorage.getItem('user');
        id_user     = JSON.parse(id_user);
        
        this.props.fetchGetBankUser(id_user.id);
        this.props.fetchGetUser(id_user.id);

        setSelect2();
        setValidate();
        setMask();
    }

    editUser() {
        const { getBankUser } = this.props;
        let id_user = localStorage.getItem('user');
        id_user     = JSON.parse(id_user);
        let inputs  = document.querySelectorAll('.form-add-user input');
        let objEditUser = {};
        let userStorage = JSON.parse(localStorage.getItem('user'));

        inputs = Array.from(inputs);
        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if (arrayInputs) {
            objEditUser.email = $('.form-add-user [name="email"]').val();
            objEditUser.first_name = $('.form-add-user [name="first_name"]').val();
            objEditUser.last_name = $('.form-add-user [name="last_name"]').val();
            objEditUser.facebook_id = userStorage.facebook_id;
            objEditUser.telephone_ddd = $('.form-add-user [name="ddd"]').val();
            objEditUser.telephone = $('.form-add-user [name="telephone"]').val();
            objEditUser.cpf       = $('#cpf').val().replace( '.', '' ).replace( '.', '' ).replace( '-', '' ); 
            objEditUser.admin = 0;

            $('.flex .nb-spinner').show();
            this.props.fetchEditProfileUser(userStorage.id, objEditUser);
        }

        getBankUser.items.map((item) => {
            if(item.id === parseInt($('#dados-bancarios').val())) {
                this.props.fetchBankDefault(id_user.id, item.id);
            }
        })
    }

    addBank() {
        let id_user = localStorage.getItem('user');
        id_user     = JSON.parse(id_user);
        let inputs  = document.querySelectorAll('[name="nova-conta"] input');
        let objBank = {}
        let bankNum = $('[name="nova-conta"] .banco.active [type="radio"]').attr('numero') !== undefined ? $('[name="nova-conta"] .banco.active [type="radio"]').attr('numero') : $('#select-bank').val();
        
        let bankName = $('[name="nova-conta"] .banco.active [type="radio"]').attr('id')  !== undefined ? $('[name="nova-conta"] .banco.active [type="radio"]').attr('id') : $('#select-bank option:selected').text().split('-');

        inputs = Array.from(inputs);
        let arrayInputs = inputs.every((item) => {
            return $(item).val() !== '';
        });

        if (arrayInputs) {
            objBank.bank_num  = bankNum; 
            objBank.bank_name = bankName.toString(); 
            objBank.agency    = $('[data-open="nova-conta"] #num_agencia').val(); 
            objBank.account   = $('[data-open="nova-conta"] #num_conta').val() +'-'+$('[data-open="nova-conta"] #digito').val();
            objBank.type      = $('#select-count').val();
            objBank.cpf       = $('#cpf').val().replace( '.', '' ).replace( '.', '' ).replace( '-', '' ); 
            console.log(objBank)
            this.props.fetchAddBankUser(id_user.id, objBank);
        }
    }

    showInfoBank() {
        const { getBankUser } = this.props;
        
        if(getBankUser.items !== 0) {
            getBankUser.items.map((item) => {
                if (item.first == 1) {
                    $('[data-open="editar-conta"] option[value="'+ item.type +'"]').attr('selected', 'selected');
                    $('[data-open="editar-conta"] #num_agencia').val(item.agency);
                    $('[data-open="editar-conta"] #num_conta').val(item.account.split('-')[0]);
                    $('[data-open="editar-conta"] #digito').val(item.account.split('-')[1]);
                    
                }
            })
        }
    }

    deleteBank(element) {
        element.preventDefault();

        const { getBankUser } = this.props;
        let id_user = localStorage.getItem('user');
        id_user     = JSON.parse(id_user);

        getBankUser.items.map((item) => {
            if(item.id === parseInt($('#dados-bancarios').val())) {
                this.props.fetchDeleteBankUser(id_user.id, item.id);
            }
        });
    }

    render() {
        const { getBankUser, user } = this.props;
        console.log(user)
        return (
            <div className="editar-perfil">
                <div className="modal modal-white" data-open="nova-conta">
                    <div className="modal-content">
                        <div className="modal-close">
                            <i className="ng-cancel"></i>
                        </div>
                        <div className="header-modal flex flex-column flex-center">
                            <img src={banco} alt="conta"/>

                            <h4 className="title-modal">Nova conta</h4>

                            <p className="subtitle-modal">Adicione uma nova conta e comece a <br/> receber seus pagamentos</p>
                        </div>

                        <div className="line"></div>
                        <div className="main-modal">
                            <form name="nova-conta">
                                <p className="title-main-modal">Selecione o banco</p>

                                <div className="bancos-grid grid">
                                    <label className="banco" htmlFor="Banco do Brasil">
                                        <img src={bancoDoBrasil} alt="Banco do Brasil" />
                                        <input type="radio" id="Banco do Brasil" numero="001"/>
                                    </label>

                                    <label className="banco" htmlFor="Bradesco">
                                        <img src={bradesco} alt="Bradesco" />
                                        <input type="radio" id="Bradesco" numero="237"/>
                                    </label>

                                    <label className="banco" htmlFor="Itau">
                                        <img src={itau} alt="Itaú" />
                                        <input type="radio" id="Itau" numero="341"/>
                                    </label>

                                    <label className="banco" htmlFor="Santander">
                                        <img src={santander} alt="santander" />
                                        <input type="radio" id="Santander" numero="033"/>
                                    </label>

                                    <label className="banco" htmlFor="Caixa">
                                        <img src={caixa} alt="Caixa" />
                                        <input type="radio" id="Caixa" numero="104"/>
                                    </label>
                                </div>

                                <select id="select-bank" className="custom-select bg-white">
                                    <option>Selecionar outros bancos</option>
                                    <option value="246">246 – Banco ABC Brasil S.A.</option>
                                    <option value="025">025 – Banco Alfa S.A.</option>
                                    <option value="641">641 – Banco Alvorada S.A.</option>
                                    <option value="029">029 – Banco Banerj S.A.</option>
                                    <option value="038">038 – Banco Banestado S.A.</option>
                                    <option value="000">000 – Banco Bankpar S.A.</option>
                                    <option value="740">740 – Banco Barclays S.A.</option>
                                    <option value="107">107 – Banco BBM S.A.</option>
                                    <option value="031">031 – Banco Beg S.A.</option>
                                    <option value="096">096 – Banco BM&F de Serviços de Liquidação e Custódia S.A</option>
                                    <option value="318">318 – Banco BMG S.A.</option>
                                    <option value="752">752 – Banco BNP Paribas Brasil S.A.</option>
                                    <option value="248">248 – Banco Boavista Interatlântico S.A.</option>
                                    <option value="036">036 – Banco Bradesco BBI S.A.</option>
                                    <option value="204">204 – Banco Bradesco Cartões S.A.</option>
                                    <option value="225">225 – Banco Brascan S.A.</option>
                                    <option value="044">044 – Banco BVA S.A.</option>
                                    <option value="263">263 – Banco Cacique S.A.</option>
                                    <option value="473">473 – Banco Caixa Geral – Brasil S.A.</option>
                                    <option value="222">222 – Banco Calyon Brasil S.A.</option>
                                    <option value="040">040 – Banco Cargill S.A.</option>
                                    <option value="M08">M08 – Banco Citicard S.A.</option>
                                    <option value="M19">M19 – Banco CNH Capital S.A.</option>
                                    <option value="215">215 – Banco Comercial e de Investimento Sudameris S.A.</option>
                                    <option value="756">756 – Banco Cooperativo do Brasil S.A. – BANCOOB</option>
                                    <option value="748">748 – Banco Cooperativo Sicredi S.A.</option>
                                    <option value="505">505 – Banco Credit Suisse (Brasil) S.A.</option>
                                    <option value="229">229 – Banco Cruzeiro do Sul S.A.</option>
                                    <option value="003">003 – Banco da Amazônia S.A.</option>
                                    <option value="083-3">083-3 – Banco da China Brasil S.A.</option>
                                    <option value="707">707 – Banco Daycoval S.A.</option>
                                    <option value="M06">M06 – Banco de Lage Landen Brasil S.A.</option>
                                    <option value="024">024 – Banco de Pernambuco S.A. – BANDEPE</option>
                                    <option value="456">456 – Banco de Tokyo-Mitsubishi UFJ Brasil S.A.</option>
                                    <option value="214">214 – Banco Dibens S.A.</option>
                                    <option value="047">047 – Banco do Estado de Sergipe S.A.</option>
                                    <option value="037">037 – Banco do Estado do Pará S.A.</option>
                                    <option value="041">041 – Banco do Estado do Rio Grande do Sul S.A.</option>
                                    <option value="004">004 – Banco do Nordeste do Brasil S.A.</option>
                                    <option value="265">265 – Banco Fator S.A.</option>
                                    <option value="M03">M03 – Banco Fiat S.A.</option>
                                    <option value="224">224 – Banco Fibra S.A.</option>
                                    <option value="626">626 – Banco Ficsa S.A.</option>
                                    <option value="394">394 – Banco Finasa BMC S.A.</option>
                                    <option value="M18">M18 – Banco Ford S.A.</option>
                                    <option value="223">233 – Banco GE Capital S.A.</option>
                                    <option value="734">734 – Banco Gerdau S.A.</option>
                                    <option value="M07">M07 – Banco GMAC S.A.</option>
                                    <option value="612">612 – Banco Guanabara S.A.</option>
                                    <option value="M22">M22 – Banco Honda S.A.</option>
                                    <option value="063">063 – Banco Ibi S.A. Banco Múltiplo</option>
                                    <option value="M11">M11 – Banco IBM S.A.</option>
                                    <option value="604">604 – Banco Industrial do Brasil S.A.</option>
                                    <option value="320">320 – Banco Industrial e Comercial S.A.</option>
                                    <option value="653">653 – Banco Indusval S.A.</option>
                                    <option value="630">630 – Banco Intercap S.A.</option>
                                    <option value="249">249 – Banco Investcred Unibanco S.A.</option>
                                    <option value="184">184 – Banco Itaú BBA S.A.</option>
                                    <option value="479">479 – Banco ItaúBank S.A</option>
                                    <option value="M09">M09 – Banco Itaucred Financiamentos S.A.</option>
                                    <option value="376">376 – Banco J. P. Morgan S.A.</option>
                                    <option value="074">074 – Banco J. Safra S.A.</option>
                                    <option value="217">217 – Banco John Deere S.A.</option>
                                    <option value="065">065 – Banco Lemon S.A.</option>
                                    <option value="600">600 – Banco Luso Brasileiro S.A.</option>
                                    <option value="755">755 – Banco Merrill Lynch de Investimentos S.A.</option>
                                    <option value="746">746 – Banco Modal S.A.</option>
                                    <option value="151">151 – Banco Nossa Caixa S.A.</option>
                                    <option value="045">045 – Banco Opportunity S.A.</option>
                                    <option value="623">623 – Banco Panamericano S.A.</option>
                                    <option value="611">611 – Banco Paulista S.A.</option>
                                    <option value="643">643 – Banco Pine S.A.</option>
                                    <option value="638">638 – Banco Prosper S.A.</option>
                                    <option value="747">747 – Banco Rabobank International Brasil S.A.</option>
                                    <option value="M16">M16 – Banco Rodobens S.A.</option>
                                    <option value="072">072 – Banco Rural Mais S.A.</option>
                                    <option value="250">250 – Banco Schahin S.A.</option>
                                    <option value="749">749 – Banco Simples S.A.</option>
                                    <option value="366">366 – Banco Société Générale Brasil S.A.</option>
                                    <option value="637">637 – Banco Sofisa S.A.</option>
                                    <option value="464">464 – Banco Sumitomo Mitsui Brasileiro S.A.</option>
                                    <option value="082-5">082-5 – Banco Topázio S.A.</option>
                                    <option value="M20">M20 – Banco Toyota do Brasil S.A.</option>
                                    <option value="634">634 – Banco Triângulo S.A.</option>
                                    <option value="208">208 – Banco UBS Pactual S.A.</option>
                                    <option value="M14">M14 – Banco Volkswagen S.A.</option>
                                    <option value="655">655 – Banco Votorantim S.A.</option>
                                    <option value="610">610 – Banco VR S.A.</option>
                                    <option value="370">370 – Banco WestLB do Brasil S.A.</option>
                                    <option value="021">021 – BANESTES S.A. Banco do Estado do Espírito Santo</option>
                                    <option value="719">719 – Banif-Banco Internacional do Funchal (Brasil)S.A.</option>
                                    <option value="073">073 – BB Banco Popular do Brasil S.A.</option>
                                    <option value="078">078 – BES Investimento do Brasil S.A.-Banco de Investimento</option>
                                    <option value="069">069 – BPN Brasil Banco Múltiplo S.A.</option>
                                    <option value="070">070 – BRB – Banco de Brasília S.A.</option>
                                    <option value="477">477 – Citibank N.A.</option>
                                    <option value="081-7">081-7 – Concórdia Banco S.A.</option>
                                    <option value="487">487 – Deutsche Bank S.A. – Banco Alemão</option>
                                    <option value="751">751 – Dresdner Bank Brasil S.A. – Banco Múltiplo</option>
                                    <option value="062">062 – Hipercard Banco Múltiplo S.A.</option>
                                    <option value="492">492 – ING Bank N.V.</option>
                                    <option value="488">488 – JPMorgan Chase Bank</option>
                                    <option value="409">409 – UNIBANCO – União de Bancos Brasileiros S.A.</option>
                                    <option value="230">230 – Unicard Banco Múltiplo S.A.</option>
                                </select>

                                <div className="box-cpf margin-bottom-modal">
                                    <p>O CPF do titular da conta bancária deve ser o mesmo CPF cadastrado em sua conta NETGIFT®</p>
                                </div>

                                <p className="title-main-modal">Tipo de Conta</p>

                                <select id="select-count" className="custom-select bg-white">
                                    <option>Selecione</option>
                                    <option value="Conta corrente">Conta corrente</option>
                                    <option value="Conta poupança">Conta poupança</option>
                                </select>

                                <div className="form-modal grid">
                                    <div>
                                        <label htmlFor="num_agencia" className="title-main-modal display-none">Número da agência</label>

                                        <label
                                            htmlFor="num_agencia"
                                            className="title-main-modal title-main-modal-mobile">N° Agência</label>
                                        <input
                                            type="text"
                                            className="input-modal"
                                            id="num_agencia"
                                            name="num_agencia"
                                            required/>
                                    </div>

                                    <div>
                                        <label htmlFor="num_conta" className="title-main-modal">Número da conta</label>
                                        <input type="text" className="input-modal" id="num_conta" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="digito" className="title-main-modal">Díg.</label>
                                        <input type="text" id="digito" name="digito" className="input-modal digito-conta"/>
                                    </div>
                                </div>

                                <div className="footer-modal flex flex-space w100">
                                    <button className="text-gradient grey cancelar">Cancelar</button>
                                    <button className="gradient fullcolor" onClick={() => this.addBank()}>Cadastrar nova conta</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal modal-white" data-open="editar-conta">
                    <div className="modal-content">
                        <div className="modal-close">
                            <i className="ng-cancel"></i>
                        </div>

                        <div className="header-modal">
                            <h4 className="title-modal">Editar conta</h4>

                            <div className="line"></div>
                        </div>

                        <div className="main-modal">
                            
                            <div className="box-cpf margin-bottom-modal">
                                <p>O CPF do titular da conta bancária deve ser o mesmo CPF cadastrado em sua conta NETGIFT®</p>
                            </div>

                            <form name="editar-conta">
                                <p className="title-main-modal">Tipo de conta</p>
                                <select className="custom-select bg-white">
                                    <option hidden>Selecione</option>
                                    <option value="Conta corrente">Conta corrente</option>
                                    <option value="Conta poupança">Conta poupança</option>
                                </select>

                                <div className="form-modal grid">
                                    <div>
                                        <label htmlFor="num_agencia" className="title-main-modal display-none">Número da agência</label>
                                        <label
                                            htmlFor="num_agencia"
                                            className="title-main-modal title-main-modal-mobile">N° agência</label>
                                        <input type="tel" className="input-modal" id="num_agencia" name="num_agencia"/>
                                    </div>

                                    <div>
                                        <label htmlFor="num_conta" className="title-main-modal">Número da conta</label>
                                        <input type="tel" className="input-modal" id="num_conta" name="num_conta"/>
                                    </div>

                                    <div>
                                        <label htmlFor="digito" className="title-main-modal">Díg.</label>
                                        <input
                                            type="text"
                                            className="input-modal digito-conta"
                                            id="digito"
                                            name="digito"/>
                                    </div>
                                </div>

                                <div className="footer-modal flex flex-space w100">
                                    <button className="btn-exclude" onClick={(element) => this.deleteBank(element)}>Excluir conta</button>

                                    <div>
                                        <button className="text-gradient grey cancelar">Cancelar</button>
                                        <button className="gradient fullcolor">Salvar alterações</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal modal-white" data-open="prazos-tarifas">
                    <div className="modal-content">
                        <div className="modal-close">
                            <i className="ng-cancel"></i>
                        </div>

                        <div class="header-modal">
                            <h4 class="title-modal">Prazos e tarifas</h4>
                            <div class="line"></div>
                        </div>

                        <div className="main-modal">
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"</p>

                            <p>aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                            <p>Officia culpa pariatur officia culpa. Aliqua et minim culpa excepteur quis sit cupidatat culpa dolore excepteur. Incididunt irure ut id ex nisi ut aute anim anim officia ipsum cupidatat qui. Culpa nisi irure cupidatat aute tempor voluptate Lorem tempor commodo est. Fugiat sit sit aliqua veniam ad laboris quis velit incididunt non occaecat.</p>

                            <p>Pariatur dolore ea pariatur amet sit consectetur dolor eiusmod quis ullamco nisi cillum occaecat pariatur. Minim proident eu excepteur fugiat ut exercitation consectetur voluptate. Enim qui cupidatat ut sint excepteur aliquip eu excepteur adipisicing do dolore aute minim exercitation</p>
                        </div>
                    </div>
                </div>
                
                <div className="container">
                    <div className="summary without-divider">
                        <div className="left">
                            <h2 className="title">Editar perfil</h2>
                            <p className="subtitle">Edite seu nome, seu email ou adicione seus dados bancários</p>
                        </div>
                    </div>

                    <div className="flex flex-space flex-column my50">
                        <div className="card-default shadow-77 p30 w100">
                            <div className="edit-photo">
                                <div className="flex flex-start flex-center">
                                    <div className="avatar">
                                        <div id="upload-edit-photo-preview"></div>
                                    </div>
                                    <div className="buttons flex">
                                        <label htmlFor="upload-edit-photo" className="upload fileup-btn">Usar outra foto</label>
                                        <button className="excluir disabled">Excluir foto</button>
                                    </div>
                                    <input id="upload-edit-photo" type="file" hidden/>
                                </div>
                            </div>
                        </div>

                        <form className="card-default mT20 shadow-77 p30 w100" name="editar-perfil">
                            <div className="flex form-info">
                                <div className="form-add-user">

                                    <div className="flex flex-center">
                                        <p className="title">Informações gerais</p>
                                    </div>

                                    <div className="flex flex-space form-1">
                                        <div className="flex flex-column">
                                            <label htmlFor="first_name">Nome</label>
                                            <input
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                defaultValue={user.items.length !== 0 ? user.items.user[0].first_name : ''}
                                                required/>
                                        </div>
                                        <div className="flex flex-column">
                                            <label htmlFor="last_name">Sobrenome</label>
                                            <input
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                defaultValue={user.items.length !== 0 ? user.items.user[0].last_name : ''}
                                                required/>
                                        </div>
                                    </div>

                                    <div className="flex flex-space form-2">
                                        <div className="flex flex-column">
                                            <label>Telefone</label>
                                            <div className="columns-2">
                                                <input
                                                    type="text"
                                                    className="ddd"
                                                    id="ddd"
                                                    name="ddd"
                                                    maxLength="2"
                                                    defaultValue={user.items.length !== 0 ? user.items.user[0].telephone_ddd : ''}
                                                    required/>
                                                <input
                                                    type="text"
                                                    className="telefone"
                                                    id="telephone"
                                                    name="telephone"
                                                    defaultValue={user.items.length !== 0 ? user.items.user[0].telephone : ''}
                                                    required/>
                                            </div>
                                        </div>

                                        <div className="flex flex-column">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="email"
                                                id="email"
                                                name="email"
                                                defaultValue={user.items.length !== 0 ? user.items.user[0].email : ''}
                                                required/>
                                        </div>
                                    </div>

                                    <div className="flex flex-space">
                                        <div className="flex flex-column cpf-field">
                                            <label htmlFor="cpf">cpf</label>
                                            <input
                                                type="text"
                                                className="cpf"
                                                id="cpf"
                                                name="cpf"
                                                defaultValue={user.items.length !== 0 ? user.items.user[0].cpf : ''}
                                                required />
                                        </div>
                                    </div>

                                    <div className="flex flex-space w100">
                                        <div className="flex flex-column w100">
                                            <label htmlFor="dados-bancarios">Dados bancários ativos</label>
                                            <select
                                                className="custom-select uppercase bg-white flat w100"
                                                id="dados-bancarios">
                                                {
                                                    getBankUser.items !== 0 ?
                                                    getBankUser.items.map((item) => {
                                                        return (
                                                            <option value={item.id} key={item.id}>{item.bank_name} ({item.agency}/{item.account})</option>
                                                        )
                                                    })
                                                    : ''
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="informacoes-bancarias">
                                    <p className="form-title">Informações bancárias</p>

                                    <div className="flex">

                                        <div className="square prazos-tarifas">
                                            <div className="text">
                                                <div className="title-square">Prazos e Tarifas</div>
                                                <div className="subtitle-square">Donec suscipit varius tortor ut tempor. Vivamus ornare id velit a tincidunt. Duis egestas leo at tincidunt auctor.</div>
                                            </div>

                                            <button className="text-gradient underline open-modal" data-modal="prazos-tarifas">Veja mais sobre prazos e tarifas</button>
                                        </div>

                                        <div className="square">
                                            <div className="icon-square"><img src="../assets/imgs/banco-itau.png" alt=""/></div>

                                            <div className="text">
                                                <div className="title-square">
                                                    {
                                                        getBankUser.items !== 0 ?
                                                        getBankUser.items.map((item) => {
                                                            return(
                                                                item.first === 1 ?
                                                                item.bank_name : ''
                                                            )
                                                        })
                                                        : ''
                                                    }
                                                </div>
                                                <div className="subtitle-square">
                                                    {
                                                        getBankUser.items !== 0 ?
                                                        getBankUser.items.map((item) => {
                                                            return(
                                                                item.first === 1 ?
                                                                item.agency : ''
                                                            )
                                                        })
                                                        : ''
                                                    } /
                                                    {
                                                        getBankUser.items !== 0 ?
                                                        getBankUser.items.map((item) => {
                                                            return(
                                                                item.first == 1 ?
                                                                item.account : ''
                                                            )
                                                        })
                                                        : ''
                                                    }
                                                </div>

                                                <div className="info-banco-mobile display-none">
                                                    <div>
                                                        <div className="title-square">
                                                            {
                                                                getBankUser.items !== 0 ?
                                                                getBankUser.items.map((item) => {
                                                                    return(
                                                                        item.first == 1 ?
                                                                        item.bank_name : ''
                                                                    )
                                                                })
                                                                : ''
                                                            }
                                                        </div>
                                                        <div className="subtitle-square">
                                                            {
                                                                getBankUser.items !== 0 ?
                                                                getBankUser.items.map((item) => {
                                                                    return(
                                                                        item.first === 1 ?
                                                                        item.agency : ''
                                                                    )
                                                                })
                                                                : ''
                                                            } /
                                                            {
                                                                getBankUser.items !== 0 ?
                                                                getBankUser.items.map((item) => {
                                                                    return(
                                                                        item.first == 1 ?
                                                                        item.account : ''
                                                                    )
                                                                })
                                                                : ''
                                                            }
                                                        </div>
                                                    </div>

                                                    <span
                                                        className="text-gradient underline open-modal display-none"
                                                        data-modal="editar-conta" onClick={() => this.showInfoBank()}>Editar Informações
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-gradient underline open-modal" data-modal="editar-conta" onClick={() => this.showInfoBank()}>Editar Informações</span>
                                        </div>

                                        <div className="square">
                                            <div className="icon-square"><img src={banco} alt="conta"/></div>
                                            <div className="text">
                                                <div className="title-square">Nova conta</div>
                                                <div className="subtitle-square">Adicione uma nova conta para receber pagamentos</div>

                                                <div className="info-banco-mobile display-none">
                                                    <div>
                                                        <div className="title-square">Nova conta</div>
                                                        <div className="subtitle-square">Adicione uma nova conta para receber pagamentos</div>
                                                    </div>

                                                    <span className="text-gradient underline open-modal display-none" data-modal="nova-conta">Adicionar nova conta</span>
                                                </div>
                                            </div>
                                            <span className="text-gradient underline open-modal" data-modal="nova-conta">Adicionar nova conta</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="buttons-action flex jc-end flex-end">
                                <div className="buttons flex">
                                    <button className="text-gradient">Cancelar</button>
                                    <button className="gradient fullcolor flex" onClick={() => this.editUser()}>Salvar informações <span className="nb-spinner"></span> </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="footer-logged">
                        <p>&copy; 2018-2019 NETGIFT - CNPJ 99.304.41/0001-00</p>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        editProfileUser: state.editProfileUser,
        addBankUser: state.addBankUser,
        getBankUser: state.getBankUser,
        bankDefault: state.bankDefault,
        editBank: state.editBank,
        deleteBank: state.deleteBank,
        user: state.user
    };
}

export default connect(mapStateToProps, {fetchEditProfileUser, fetchAddBankUser, fetchGetBankUser, fetchBankDefault, fetchEditBankUser, fetchDeleteBankUser, fetchGetUser})(EditarPerfil);