import React, { Component } from 'react';

import Login from './home/login';
import { bindDefault } from '../stores/binders';

class Index extends Component {

    componentDidMount() {
        const { setValue } = this.props;

        const session = JSON.parse(sessionStorage.getItem('session'));
        if (session) {
            setValue('session', session);
        }

        if (window.location.hash !== '/') {
            window.location.hash = '/';
        }
    }

    componentDidUpdate() {
        const { session } = this.props;

        if (session) {
            if (session.sucesso) {
                sessionStorage.setItem('session', JSON.stringify(session));
            }
        }
    }

    render() {
        const { session } = this.props;
        
        return session ? this.props.children : <Login />;
    }
}

export default bindDefault('session')(Index);