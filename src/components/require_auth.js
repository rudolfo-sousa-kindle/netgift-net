import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        var redirect_to = '/login';
        if ( '/criarFesta' === this.props.location.pathname ) {
          redirect_to = '/cadastro';
        }
        this.props.history.push( redirect_to );
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        var redirect_to = '/login';
        if ( '/criarFesta' === this.props.location.pathname ) {
          redirect_to = '/cadastro';
        }
        this.props.history.push( redirect_to );
      }
    }
    PropTypes = {
      router: PropTypes.object,
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}