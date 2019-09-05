import React, { Component }  from "react";
import { Link } from "react-router-dom";
import MenuDashLinks from "./MenuDashLinks";
import Avatar from "../assets/imgs/avatar-admin.png";
import Logo from "../assets/imgs/logo.png";

export default class MenuDash extends Component {

    constructor(props) {
        super(props);
        this.state = {
          avatar: Avatar,
          bank: [],
          events: [],
          user: []
        }
      }

      componentWillMount(){
        var user = localStorage.getItem('user');
        var banks = localStorage.getItem('banks');
        var events = localStorage.getItem('events');
        user = JSON.parse(user);
        console.log(this.state.user)
        

        if(user) {
            this.setState({
                bank: banks,
                events: events,
                user: user
            })
        }

    }

    render() {
        const {first_name, last_name, picture_path, admin} = this.state.user;
        return(
            <div className="menu">

                <div className="flex flex-column flex-center admin-infos">
                    <a href="/">
                        <img src={Logo} alt="NetGift" width="150" />
                    </a>
                    <div className="flex flex-center admin-info">
                        <div className="flex flex-column">
                            <p>Olá, {first_name + " " + last_name}</p>
                            <small>{ admin ? "Administrador" : "Organizador"}</small>
                        </div>
                    </div>
                </div>

                <div className="input-search">
                    <i className="ng-lupa"></i>
                    <input type="search" placeholder="Buscar usuário ou festa" />
                </div>

                <div className="line"></div>

                <MenuDashLinks />

            </div>
        )
    }
}
