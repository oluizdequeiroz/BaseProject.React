import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';

import Input from '../../components/input';

import { Field } from 'redux-form';
import { post } from '../../config/actions';

function login(values) {

    return post('usuario/login', 'session', { param: values });
}

function validate(values) {

    const errors = {};

    if (!values.usuario) {
        errors.usuario = 'Usuário/E-mail obrigatório.';
    }

    if (!values.senha) {
        errors.senha = 'Senha obrigatória.';
    }

    return errors;
}

class Login extends Component {

    render() {

        return (
            <div className="content-centered">
                <div className="card">
                    <div className="card-header card-header-primary">
                        <h4 className="card-title">Entrada</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.props.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <Field name="usuario" component={Input} type="text" placeholder="Usuário ou e-mail" />
                                </div>
                                <div className="col-md-12">
                                    <Field name="senha" component={Input} type="password" placeholder="Senha" />
                                </div>
                            </div>
                            <input type="submit" className="btn btn-primary pull-right" value="Entrar" />
                            <div className="clearfix"></div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default bindReduxForm()(login)(validate)(Login);