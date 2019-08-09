import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';

import Input from '../divers/input';

import { Field } from 'redux-form';
import { post, get } from '../../config/actions';
import { treatUserName } from '../../treatments';

const logo = require('../../assets/img/pmenosLogo.JPG');

function login(values) {
    
    return post('usuario/login', 'session', { 
        param: values, 
        callback: get(`usuario/pornome/${values.usuario}`, 'username', {
            treatment: treatUserName
        })
    });
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

class Login extends Component {

    render() {

        return (
            <div className="bodyblue">
                <div className="content-centered">
                    <div className="card card-with-shadow">
                        <div className="card-header">
                            <div className="text-center">
                                <img src={logo} alt="Alimenta Soluções" width={250} />
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.props.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <Field name="usuario" component={Input} type="text" placeholder="Usuário" />
                                    </div>
                                    <div className="col-md-12">
                                        <Field name="senha" component={Input} type="password" placeholder="Senha" />
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-primary btn-block btn-lg" value="Entrar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default bindReduxForm()(login)(validate)(Login);