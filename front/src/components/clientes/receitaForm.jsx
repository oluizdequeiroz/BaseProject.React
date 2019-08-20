import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../divers/input';
import ItensclienteTable from './itemcliente/itensclienteTable';
import { post, setValue } from '../../config/actions';
import swal from 'sweetalert2';

import ModalBuscaProdutos from './itemcliente/modalBuscaProdutos';
import { treatDefault as treatment } from '../../treatments';

function register(values) {

    return post('cliente/salvar', 'clienteRegistro', { param: values, callback: setValue('cliente', values) });
}

function validate(values) {

    const errors = {};

    if (!values.nome) {
        errors.nome = 'Nome do cliente é obrigatório.';
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

export default bindReduxForm('cliente', 'clienteRegistro')(register)(validate)(({ dispatch, form, cliente, cancelar, handleSubmit, clienteRegistro, get, setValue }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(initialize(form, cliente));
        if (clienteRegistro) {
            if (clienteRegistro.sucesso) {
                get('cliente', 'clientes', { treatment });
                swal.fire('cliente salvo com sucesso!', 'Os dados do cliente foram salvos com sucesso!', 'success');
            } else if (clienteRegistro.stack) {
                swal.fire('Erro ao tentar registrar!', 'O sistema acionou uma exceção ao tentar registrar um cliente.', 'error');
            }
            setValue('clienteRegistro');
        }
    }, [dispatch, form, cliente, clienteRegistro, get, setValue]);

    function voltar() {
        dispatch(initialize(form, cliente));
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
                                    <Col><Field name="nome" component={Input} type="text" placeholder="Nome da cliente" popoverPosition="top" /></Col>
                                    <Col>
                                        <Field name="unidademedida" component={Input} type="select" placeholder="Unidade de Medida" popoverPosition="top">
                                            <option>KG</option>
                                            <option>Litro</option>
                                        </Field>
                                    </Col>
                                    <Col><Field name="quantidaderendimento" component={Input} type="text" placeholder="Quantidade de rendimento" popoverPosition="top" /></Col>
                                </Row>
                                <Row>
                                    <Field name="modopreparo" component={Input} type="textarea" placeholder="Descreva o modo de preparo..." popoverPosition="bottom" />
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                ITENS DA cliente
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {/* Ao clicar em pesquisar produto, abre um modal para pesquisar os produtos cadastrados e inserir na tabela abaixo */}
                                <div className="btn btn-success" onClick={() => setShowModal(true)}><i className="fa fa-search" /> Pesquisar Produto</div>
                                <ItensclienteTable />
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