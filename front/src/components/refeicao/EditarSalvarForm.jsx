import React, { Component } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../divers/input';
import TableItensRefeicao from './itensReceitaTable';
import { post } from '../../config/actions';
import swal from 'sweetalert2';

function register(values) {

    return post('refeicao/salvar', 'refeicaoRegistro', { param: values });
}

function validate(values) {

    const errors = {};

    if (!values.refeicao) {
        errors.receita = 'Nome da receita é obrigatório.';
    }
    if (!values.unidadeMedida) {
        errors.unidadeMedida = 'Unidade de medida é obrigatório';
    }
    if (!values.rendimento) {
        errors.rendimento = 'Rendimento é obrigatório';
    }
    if (!values.modoPreparo) {
        errors.modoPreparo = 'Modo de preparo é obrigatório';
    }

    return errors;
}

class ReceitaForm extends Component {

    componentDidMount() {
        const { dispatch, form, refeicao } = this.props;

        dispatch(initialize(form, refeicao));
    }

    voltar() {
        const { dispatch, form, refeicao, cancelar } = this.props;

        dispatch(initialize(form, refeicao));
        cancelar();
    }

    render() {
        const { handleSubmit, refeicaoRegistro } = this.props;

        if (refeicaoRegistro && refeicaoRegistro.stack) {
            swal.fire('Erro ao tentar registrar!', 'O sistema acionou uma exceção ao tentar registrar uma refeição.', 'error');
        }

        return (
            <form onSubmit={handleSubmit} >
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">DADOS GERAIS</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Row>
                                    <Col><Field name="refeicao" component={Input} type="text" placeholder="Nome da Receita" popoverPosition="top" /></Col>
                                    <Col>
                                        <Field name="unidadeMedida" component={Input} type="select" placeholder="Unidade de Medida" popoverPosition="top">
                                            <option>KG</option>
                                            <option>Litro</option>
                                        </Field>
                                    </Col>
                                    <Col><Field name="rendimento" component={Input} type="text" placeholder="Quantidade de rendimento" popoverPosition="top" /></Col>
                                </Row>
                                <Row>
                                    <Field name="modoPreparo" component={Input} type="textarea" placeholder="Descreva o modo de preparo..." popoverPosition="top" />
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                ITENS DA REFEIÇÂO
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {/* Ao clicar em pesquisar produto, abre um modal para pesquisar os produtos cadastrados e inserir na tabela abaixo */}
                                <div className="btn btn-success"><i className="fa fa-search" /> Pesquisar Produto</div>
                                <TableItensRefeicao />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <div className="btn btn-ligth" onClick={this.voltar.bind(this)}><i className="fa fa-arrow-left" /> Voltar</div>
                <button type="submit" className="btn btn-success"><i className="fa fa-save" /> Salvar</button>
            </form>
        );
    }
}

export default bindReduxForm('receita', 'receitaRegistro')(register)(validate)(ReceitaForm);