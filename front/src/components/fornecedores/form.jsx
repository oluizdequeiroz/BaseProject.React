import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../divers/input';
import { post } from '../../config/actions';
import swal from 'sweetalert2';

function register(values) {

    return post('fornecedor/salvar', 'fornecedorRegistro', { param: values });
}

function validate(values) {

    const errors = {};

    if (!values.nome) {
        errors.nome = 'Usuário obrigatório.';
    }

    if (!values.senha) {
        errors.senha = 'Senha obrigatória.';
    }

    return errors;
}

class FornecedorForm extends Component {

    componentDidMount() {
        const { dispatch, form, fornecedor } = this.props;

        dispatch(initialize(form, fornecedor));
    }

    cancelar() {
        const { dispatch, form, fornecedor, cancelar } = this.props;
        
        dispatch(initialize(form, fornecedor));
        cancelar();
    }

    render() {
        const { handleSubmit, fornecedorRegistro } = this.props;

        if (fornecedorRegistro && fornecedorRegistro.stack) {
            swal.fire('Erro ao tentar registrar!', 'O sistema acionou uma exceção ao tentar registrar um fornecedor.', 'error');
        }

        return (
            <form onSubmit={handleSubmit}>
                <div className="form-inline">
                    <Field name="nome" component={Input} type="text" placeholder="Fornecedor" popoverPosition="top" />
                    <Field name="endereco" component={Input} type="text" placeholder="Endereço" popoverPosition="top" />
                    <div className="btn btn-warning" onClick={this.cancelar.bind(this)}>Cancelar</div>
                </div>
                <input type="submit" className="btn btn-primary btn-lg btn-block" value="Cadastrar" />
            </form>
        );
    }
}

export default bindReduxForm('fornecedor', 'fornecedorRegistro')(register)(validate)(FornecedorForm);