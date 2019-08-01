import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../../components/input';
import { post } from '../../config/actions';
import swal from 'sweetalert2';

function register(values) {

    return post('receita/salvar', 'registro', { param: values });
}

function validate(values) {

    const errors = {};

    if (!values.refeicao) {
        errors.receita = 'Receita é obrigatório.';
    }

   
    return errors;
}

class ReceitaForm extends Component {

    componentDidMount() {
        const { dispatch, form, receita } = this.props;

        dispatch(initialize(form, receita));
    }

    cancelar() {
        const { cancelar, dispatch, form, receita } = this.props;
        
        dispatch(initialize(form, receita));
        cancelar();
    }

    render() {
        const { handleSubmit, registro } = this.props;

        if (registro && registro.stack) {
            swal.fire('Erro ao tentar registrar!', 'O sistema acionou uma exceção ao tentar registrar uma receita.', 'error');
        }

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="receita" component={Input} type="text" placeholder="Digite o nome da Receita" popoverPosition="top" style={{width: '100%'}}/>
                    
                    {/* <input type="submit" className="btn btn-primary btn-lg btn-block" value="Cadastrar" /> */}
                </div>
                    <div className="btn btn-info" onClick={this.cancelar.bind(this)}><i className="fa fa-search" /> Pesquisar</div>
                    <div className="btn btn-light" onClick={this.cancelar.bind(this)}><i className="fa fa-eraser" /> Limpar</div>
                    <div className="btn btn-success" onClick={this.cancelar.bind(this)}><i className="fa fa-plus" /> Nova Receita</div>
               
            </form>
        );
    }
}

export default bindReduxForm('receita', 'registro')(register)(validate)(ReceitaForm);