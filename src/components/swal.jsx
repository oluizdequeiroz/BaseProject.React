import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import _swal from 'sweetalert2';

import { bindDefault } from '../stores/binders';

const SweetAlert = withSwalInstance(_swal);

class Swal extends Component {

    render() {
        const { sweetalert } = this.props;

        return (
            <SweetAlert
                show={sweetalert.show}
                title={sweetalert.title}
                text={sweetalert.message}
                type={sweetalert.type}
            />
        );
    }
}

export default bindDefault('sweetalert')(Swal);