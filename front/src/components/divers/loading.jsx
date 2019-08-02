import React from 'react';
import { Modal } from 'react-bootstrap';
import { bindDefault } from '../../config/binders';

export default bindDefault('loading')(
    props => {
        return (
            <Modal show={props.loading && props.loading.show}>
                <Modal.Body className={`${props.loading && props.loading.className} rounded`}>
                    <i className={props.loading && props.loading.icon} /> {props.loading && props.loading.message}
                </Modal.Body>
            </Modal>
        );
    }
);