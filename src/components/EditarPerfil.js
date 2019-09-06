import React, {Component} from "react";
import {connect} from "react-redux";

import { fetchEditProfileUser } from '../actions/editProfileUserAction';
import { fetchAddBankUser } from '../actions/addBankAction';
import { fetchGetBankUser } from '../actions/getBankAction';
import { fetchEditBankUser } from '../actions/editBankAction';
import { fetchBankDefault } from '../actions/setBankDefaultAction';
import { fetchDeleteBankUser } from '../actions/deleteBankAction';
import { fetchGetUser, editUserImage } from '../actions/getUserAction';

import ImageUploader from 'react-images-upload';

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

const image2base64 = require('image-to-base64');


class EditarPerfil extends Component {
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
         this.deletePhoto = this.deletePhoto.bind(this);
    }

    componentDidMount() {
        let id_user = localStorage.getItem('user');
        id_user     = JSON.parse(id_user);
        
        this.props.fetchGetBankUser(id_user.id);
        this.props.fetchGetUser(id_user.id);

        setSelect2();
        setValidate();
        setMask();
    }

    upImage() {
        $( '.chooseFileButton' ).click();
    }

    onDrop(picture) {
        console.log(this)
        this.setState({
            pictures: this.state.pictures.concat(picture)
        });

        var PROPS = this.props;

    
        setTimeout(() => {
            var file = this.state.pictures[0];
            var reader = new FileReader();
            if(file){
                var url = reader.readAsDataURL(file);
                reader.onloadend = function (e) {
                    $("#upload-edit-photo-preview").append("<img src=" + reader.result + " style='max-width: 100%;' />")
                    image2base64(reader.result)
                    .then((res) => {
                        $(".excluir.disabled").removeClass("disabled");
                        let id_user = localStorage.getItem('user');
                        id_user     = JSON.parse(id_user);
                        PROPS.editUserImage(id_user, res)
                    })
                }
            }
        }, 500);
        
    }

    deletePhoto(){
        this.setState({
            pictures: []
        })
        $("#upload-edit-photo-preview img").remove();
        $(".deleteImage").click();
        console.log(this.state)
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
                                <div className="flex flex-start flex-center imagem-perfil">
                                    <div className="avatar" >
                                        <div id="upload-edit-photo-preview"></div>
                                    </div>
                                    <div className="buttons flex">
                                        <ImageUploader
                                            buttonClassName="fileup-btn"
                                            buttonText="Usar outra foto"
                                            withIcon={false}
                                            onChange={( item ) => {this.onDrop( item ) } }
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            withPreview={true}
                                            singleImage={true}
                                            fileSizeError={'true'}
                                        />
                                        <label htmlFor="upload-edit-photo" onClick={this.upImage} className="upload fileup-btn">Usar outra foto</label>
                                        <button className="excluir disabled" onClick={() => this.deletePhoto()}>Excluir foto</button>
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

export default connect(mapStateToProps, {fetchEditProfileUser, fetchAddBankUser, fetchGetBankUser, fetchBankDefault, fetchEditBankUser, fetchDeleteBankUser, fetchGetUser, editUserImage})(EditarPerfil);