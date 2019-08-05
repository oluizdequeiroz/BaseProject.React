import React, { Component } from 'react';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import { Col,Row } from 'react-bootstrap';
import Input from '../divers/input';
import { /*get, */setValue } from '../../config/actions';

const refeicoes = require('./mock.json').refeicoes; /* TODO: lista de receitas mockada */

function search(values) {

    // return get(`receita/nome/${values.nomeReceita}`, 'receitas', { param: values });
    return setValue('refeicoes', refeicoes.filter(refeicao => refeicao.refeicao === values.nomeRefeicao)); /* TODO: lista de receitas mockada */
}

// function validate(values) {

//     const errors = {};

//     if (!values.nomeReceita) {
//         errors.nomeReceita = 'Nome da receita é obrigatório.';
//     }

//     return errors;
// }

class PesquisarRefeicaoForm extends Component {

    recarregarTable = () => this.props.setValue('refeicoes', refeicoes); /* TODO: lista de receitas mockada */

    limpar() {
        const { dispatch, form } = this.props;

        dispatch(initialize(form, { nomeRefeicao: '' }));
        this.recarregarTable();
    }

    digitando({ target: { value }}) {
        if (value === '') {
            this.recarregarTable();
        }
    }

    render() {
        const { handleSubmit, onNovaRefeicao } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col style={{float: 'left', maxWidth: '20%'}}>
                        <Field name="codigoRefeicao" component={Input} type="text" placeholder="Digite o código da Refeição" popoverPosition="top" style={{ width: '100%' }} onKeyUp={this.digitando.bind(this)} />
                    </Col>
                    <Col style={{float: 'left', maxWidth: '30%'}}>
                        <Field name="clienteRefeicao" component={Input} type="select" placeholder="Cliente" popoverPosition="top">
                                                <option>KG</option>
                                                <option>Litro</option>
                        </Field>
                    </Col>
                    <Col style={{float: 'left', maxWidth: '30%'}}>
                        <Col  style={{float: 'left', maxWidth: '50%'}}>
                            <Field name="dataInicial" component={Input} type="date"  popoverPosition="top"   style={{float: 'left', maxWidth: '50%'}}/>
                        </Col>
                        <Col  style={{float: 'left', maxWidth: '50%'}}>
                            <Field name="dataFinal" component={Input} type="date"  popoverPosition="top"   style={{float: 'left', maxWidth: '50%'}}/>
                        </Col>
                    </Col>
                    <Col style={{float: 'left', maxWidth: '20%'}}>
                        <Field name="tipoRefeicao" component={Input} type="select" placeholder="Tipo da refeição" popoverPosition="top">
                                                <option>Cafe da manha</option>
                                                <option>Almoço</option>
                        </Field>
                    </Col>
                </Row>
                <button type="submit" className="btn btn-info"><i className="fa fa-search" /> Pesquisar</button>
                <div className="btn btn-light" onClick={this.limpar.bind(this)}><i className="fa fa-eraser" /> Limpar</div>
                <div className="btn btn-success" onClick={() => onNovaRefeicao(true)}><i className="fa fa-plus" /> Nova Refeição</div>
            </form>
        );
    }
}

export default bindReduxForm()(search)()(PesquisarRefeicaoForm);