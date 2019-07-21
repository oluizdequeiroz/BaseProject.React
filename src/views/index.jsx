import React, { Component } from 'react';
import swal from 'sweetalert2';

import Login from './home/login';
import { bindDefault } from '../stores/binders';

class Index extends Component {

    componentDidMount() {
        debugger;
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
        debugger;
        const { session, sweetalert } = this.props;

        if (session) {
            if (session.sucesso) {
                sessionStorage.setItem('session', JSON.stringify(session));
            }
        }

        if (sweetalert) {
            swal.fire(sweetalert.title, sweetalert.message, sweetalert.type);
        }
    }

    render() {
        const { session } = this.props;
        debugger;
        return session ? this.props.children : <Login />;
    }
}

export default bindDefault('session', 'sweetalert')(Index);