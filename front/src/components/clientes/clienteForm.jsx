import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { bindReduxForm } from '../../config/binders';
import { Field, initialize } from 'redux-form';
import Input from '../divers/input';

import { post, setValue } from '../../config/actions';
import swal from 'sweetalert2';

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
                                    <Col><Field name="CPF" component={Input} type="text" placeholder="CPF da cliente" popoverPosition="top" /></Col>
                                    <Col><Field name="cnpj" component={Input} type="text" placeholder="CNPJ da cliente" popoverPosition="top" /></Col>
                                   
                                </Row>
                                <Row>
                                  <Col><Field name="representante" component={Input} type="text" placeholder="Representante do cliente" popoverPosition="top" /></Col>
                                  <Col><Field name="valorRefeicao" component={Input} type="text" placeholder="Valor da Refeição" popoverPosition="top" /></Col>
                                  <Col><Field name="qtdRefeicoes" component={Input} type="text" placeholder="Qtd Refeições" popoverPosition="top" /></Col>
                                </Row>
                                <Row>
                                 <Col><Field name="contrato" component={Input} type="text" placeholder="Contrato do cliente" popoverPosition="top" /></Col>
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                               ENDEREÇO DA EMPRESA
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Row>
                                    <Col><Field name="logradouro" component={Input} type="text" placeholder="Logradouro da cliente" popoverPosition="top" /></Col>
                                    <Col><Field name="mumero" component={Input} type="text" placeholder="Nº" popoverPosition="top" /></Col>
                                    <Col><Field name="complemento" component={Input} type="text" placeholder="Complemento" popoverPosition="top" /></Col>
                                   
                                </Row>
                                <Row>
                                    <Col><Field name="bairro" component={Input} type="text" placeholder="Bairro" popoverPosition="top" /></Col>
                                    <Col><Field name="cep" component={Input} type="text" placeholder="CEP" popoverPosition="top" /></Col>
                                    <Col><Field name="cidade" component={Input} type="text" placeholder="Cidade" popoverPosition="top" /></Col>
                                    <Col><Field name="estado" component={Input} type="text" placeholder="Estado" popoverPosition="top" /></Col>
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <div className="btn btn-ligth" onClick={voltar}><i className="fa fa-arrow-left" /> Voltar</div>
                <button type="submit" className="btn btn-success"><i className="fa fa-save" /> Salvar</button>
            </form>
        </div>
    );
});