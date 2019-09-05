import React, { Component } from "react";

import Avatar from "../assets/imgs/avatar-admin.png";

export default class HeaderDashboard extends Component {

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
    
        if(user) { 
            this.setState({
                bank: banks,
                events: events,
                user: user
            })
        }
        
    }

  render() {
    const {first_name, last_name, picture_path} = this.state.user;
    return (
      <div className="header flex flex-center">
          <div className="busca">
              <label className="flex flex-center">
                  <i className="ng-lupa lupa"></i>
                  <div className="cards-busca flex flex-center">
                  </div>
                  <input id="busca" type="text" placeholder="Buscar um usuário ou uma festa" />
              </label>
          </div>
          <div className="notificacoes flex flex-center">
              <button className="toggle-aside" data-open="notificacoes">
                  <i className="ng-notification"></i>
                  <p className="badges">7</p>
              </button>
              <div className="action-bio flex">
                  <div className="action-bio-content">
                      <p>{first_name + " " + last_name}</p>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
