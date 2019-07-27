import React, { Component } from 'react';

import Login from './home/login';
import { bindDefault } from '../config/binders';
import swal from 'sweetalert2';

class Index extends Component {

    componentDidMount() {
        const { setValue } = this.props;

        const session = JSON.parse(sessionStorage.getItem('session'));
        if (session && session.sucesso) {
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
            } else {
                swal.fire(session.erros.join(', '), undefined, 'warning');
            }
        }
    }

    render() {
        const { session } = this.props;
        
        return session && session.sucesso ? this.props.children : <Login />;
    }
}

export default bindDefault('session')(Index);