import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import { Col, Row } from 'react-bootstrap';
import Input from '../divers/input';
import { get } from '../../config/actions';
import { treatDefault as treatment } from '../../treatments';

function search(values) {

    return get(`cliente/refeicoes/${values.clienteRefeicao}/${values.dataInicial}/${values.dataFinal}`, 'clienteComRefeicoes', { treatment });
}

function validate(values) {

    const errors = {};

    if (!values.clienteRefeicao) {
        errors.clienteRefeicao = 'Informe o cliente.';
    }

    if (!values.dataInicial) {
        errors.dataInicial = 'Informe a data inicial.';
    }

    if (!values.dataFinal) {
        errors.dataFinal = 'Informe a data inicial.';
    }

    return errors;
}

class PesquisarRefeicaoForm extends Component {

    componentDidMount() {
        const { get } = this.props;

        get('cliente', 'clientes', { treatment });
    }

    limpar() {
        const { dispatch, form } = this.props;

        dispatch(initialize(form, { }));
    }

    render() {
        const { handleSubmit, clientes } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col style={{ float: 'left', maxWidth: '30%' }}>
                        <Field name="clienteRefeicao" component={Input} type="select" placeholder="Cliente" popoverPosition="top">
                            {clientes && clientes.map((cliente, index) => (
                                <option key={index} value={cliente.numsequencial}>{cliente.nome}</option>
                            ))}
                        </Field>
                    </Col>
                    <Col style={{ float: 'left', maxWidth: '30%' }}>
                        <Col style={{ float: 'left', maxWidth: '50%' }}>
                            <Field name="dataInicial" component={Input} type="date" popoverPosition="top" style={{ float: 'left', maxWidth: '50%' }} />
                        </Col>
                        <Col style={{ float: 'left', maxWidth: '50%' }}>
                            <Field name="dataFinal" component={Input} type="date" popoverPosition="top" style={{ float: 'left', maxWidth: '50%' }} />
                        </Col>
                    </Col>
                </Row>
                <button type="submit" className="btn btn-info" ><i className="fa fa-search" /> Pesquisar</button>
                <div className="btn btn-light" onClick={this.limpar.bind(this)}><i className="fa fa-eraser" /> Limpar</div>
            </form>
        );
    }
}

export default bindReduxForm('clientes')(search)(validate)(PesquisarRefeicaoForm);