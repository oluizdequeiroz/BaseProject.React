import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import { Row } from 'react-bootstrap';
import Input from '../divers/input';
import { post } from '../../config/actions';
import swal from 'sweetalert2';

function register(values) {

    return post('produto/salvar', 'produtoRegistro', { param: values });
}

function validate(values) {

    const errors = {};

    if (!values.nome) {
        errors.nome = 'Usuário obrigatório.';
    }

    return errors;
}

class ProdutoForm extends Component {

    componentDidMount() {
        const { dispatch, form, produto } = this.props;

        dispatch(initialize(form, produto));
    }

    cancelar() {
        const { dispatch, form, produto, cancelar } = this.props;
        
        dispatch(initialize(form, produto));
        cancelar();
    }

    render() {
        const { handleSubmit, produtoRegistro } = this.props;

        if (produtoRegistro && produtoRegistro.stack) {
            swal.fire('Erro ao tentar registrar!', 'O sistema acionou uma exceção ao tentar registrar um produto.', 'error');
        }

        return (
            <form onSubmit={handleSubmit}>
                    <Row>
                        <Field name="nome" component={Input} type="text" placeholder="Nome do Produto..." popoverPosition="top" />
                    </Row>
                    <Row>
                        <Field name="fornecedor" component={Input} type="text" placeholder="Fornecedor do Produto..." popoverPosition="top" />
                        <Field name="unidademedida" component={Input} type="select" placeholder="Unidade de Medida" popoverPosition="top">
                                                <option>KG</option>
                                                <option>Litro</option>
                        </Field>
                    </Row>
                    <div className="btn btn-warning" onClick={this.cancelar.bind(this)}>Cancelar</div>
                <input type="submit" className="btn btn-primary btn-lg btn-block" value="Cadastrar" />
            </form>
        );
    }
}

export default bindReduxForm('produto', 'produtoRegistro')(register)(validate)(ProdutoForm);