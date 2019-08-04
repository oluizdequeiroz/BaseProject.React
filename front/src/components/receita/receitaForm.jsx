import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../divers/input';
import ItensReceitaTable from './itemReceita/itensReceitaTable';
import { post } from '../../config/actions';
import swal from 'sweetalert2';

import ModalBuscaProdutos from './itemReceita/modalBuscaProdutos';

function register(values) {

    return post('receitas/salvar', 'receitaRegistro', { param: values });
}

function validate(values) {

    const errors = {};

    if (!values.nome) {
        errors.nome = 'Nome da receita é obrigatório.';
    }
    if (!values.unidademedida) {
        errors.unidademedida = 'Unidade de medida é obrigatório';
    }
    if (!values.quantidaderendimento) {
        errors.quantidaderendimento = 'Rendimento é obrigatório';
    }
    if (!values.modopreparo) {
        errors.modopreparo = 'Modo de preparo é obrigatório';
    }

    return errors;
}

export default bindReduxForm('receita', 'receitaRegistro')(register)(validate)(({ dispatch, form, receita, cancelar, handleSubmit, receitaRegistro, get, setValue }) => {
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        dispatch(initialize(form, receita));
        if (receitaRegistro) {
            if (receitaRegistro.sucesso) {
                get('receitas', 'receitas', { treatment: (response) => response.retorno });
                swal.fire('Receita salva com sucesso!', 'Os dados da receita foram salvos com sucesso!', 'success');
            } else if (receitaRegistro.stack) {
                swal.fire('Erro ao tentar registrar!', 'O sistema acionou uma exceção ao tentar registrar uma receita.', 'error');
            }
            setValue('receitaRegistro');
        }
        // eslint-disable-next-line
    }, [receitaRegistro]);

    function voltar() {
        dispatch(initialize(form, receita));
        cancelar();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">DADOS GERAIS</Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Row>
                                    <Col><Field name="nome" component={Input} type="text" placeholder="Nome da Receita" popoverPosition="top" /></Col>
                                    <Col>
                                        <Field name="unidademedida" component={Input} type="select" placeholder="Unidade de Medida" popoverPosition="top">
                                            <option>KG</option>
                                            <option>Litro</option>
                                        </Field>
                                    </Col>
                                    <Col><Field name="quantidaderendimento" component={Input} type="text" placeholder="Quantidade de rendimento" popoverPosition="top" /></Col>
                                </Row>
                                <Row>
                                    <Field name="modopreparo" component={Input} type="textarea" placeholder="Descreva o modo de preparo..." popoverPosition="top" />
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                ITENS DA RECEITA
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {/* Ao clicar em pesquisar produto, abre um modal para pesquisar os produtos cadastrados e inserir na tabela abaixo */}
                                <div className="btn btn-success" onClick={() => setShowModal(true)}><i className="fa fa-search" /> Pesquisar Produto</div>
                                <ItensReceitaTable />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <div className="btn btn-ligth" onClick={voltar}><i className="fa fa-arrow-left" /> Voltar</div>
                <button type="submit" className="btn btn-success"><i className="fa fa-save" /> Salvar</button>
            </form>
            <ModalBuscaProdutos show={showModal} onHide={() => setShowModal(false)} />
        </div>
    );
});