import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../divers/input';
import { post } from '../../config/actions';
import swal from 'sweetalert2';

function register(values) {

    return post('usuario/salvar', 'usuarioRegistro', { param: values });
}

function validate(values) {

    const errors = {};

    if (!values.usuario) {
        errors.usuario = 'Usuário obrigatório.';
    }

    if (!values.senha) {
        errors.senha = 'Senha obrigatória.';
    }

    return errors;
}

class UserForm extends Component {

    componentDidMount() {
        const { dispatch, form, usuario } = this.props;

        dispatch(initialize(form, usuario));
    }

    cancelar() {
        const { dispatch, form, usuario, cancelar } = this.props;
        
        dispatch(initialize(form, usuario));
        cancelar();
    }

    render() {
        const { handleSubmit, usuarioRegistro } = this.props;

        if (usuarioRegistro && usuarioRegistro.stack) {
            swal.fire('Erro ao tentar registrar!', 'O sistema acionou uma exceção ao tentar registrar um usuário.', 'error');
        }

        return (
            <form onSubmit={handleSubmit}>
                <div className="form-inline">
                    <Field name="usuario" component={Input} type="text" placeholder="Usuário" popoverPosition="top" />
                    <Field name="senha" component={Input} type="password" placeholder="Senha" popoverPosition="top" />
                    <div className="btn btn-warning" onClick={this.cancelar.bind(this)}>Cancelar</div>
                </div>
                <input type="submit" className="btn btn-primary btn-lg btn-block" value="Cadastrar" />
            </form>
        );
    }
}

export default bindReduxForm('usuario', 'usuarioRegistro')(register)(validate)(UserForm);