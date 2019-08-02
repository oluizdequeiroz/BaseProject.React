import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../divers/input';
import { get, setValue } from '../../config/actions';

const receitas = require('./mock.json').receitas; /* TODO: lista de receitas mockada */

function search(values) {

    // return get(`receita/nome/${values.nomeReceita}`, 'receitas', { param: values });
    return setValue('receitas', receitas.filter(receita => receita.receita === values.nomeReceita)); /* TODO: lista de receitas mockada */
}

// function validate(values) {

//     const errors = {};

//     if (!values.nomeReceita) {
//         errors.nomeReceita = 'Nome da receita é obrigatório.';
//     }

//     return errors;
// }

class PesquisarReceitaForm extends Component {

    recarregarTable = () => this.props.setValue('receitas', receitas); /* TODO: lista de receitas mockada */

    limpar() {
        const { dispatch, form } = this.props;

        dispatch(initialize(form, { nomeReceita: '' }));
        this.recarregarTable();
    }

    digitando({ target: { value }}) {
        if (value === '') {
            this.recarregarTable();
        }
    }

    render() {
        const { handleSubmit, onNovaReceita } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="nomeReceita" component={Input} type="text" placeholder="Digite o nome da Receita" popoverPosition="top" style={{ width: '100%' }} onKeyUp={this.digitando.bind(this)} />
                </div>
                <button type="submit" className="btn btn-info"><i className="fa fa-search" /> Pesquisar</button>
                <div className="btn btn-light" onClick={this.limpar.bind(this)}><i className="fa fa-eraser" /> Limpar</div>
                <div className="btn btn-success" onClick={() => onNovaReceita(true)}><i className="fa fa-plus" /> Nova Receita</div>
            </form>
        );
    }
}

export default bindReduxForm()(search)()(PesquisarReceitaForm);