import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { bindReduxForm } from '../../config/binders';
import { get } from '../../config/actions';

import { Field } from 'redux-form';
import Input from '../divers/input';

import ProdutosTable from './produtosTable';

function pesquisar(values) {

    const treatment = response => response.retorno;

    if (values.codigo) {
        return get(`produtos/${values.codigo}`, 'produtos', { treatment });
    } else if (values.nome) {
        return get(`produtos/pornome/${values.nome}`, 'produtos', { treatment });
    } else {
        return get('produtos', 'produtos', { treatment });
    }
}

export default bindReduxForm()(pesquisar)()(({ show, onHide, handleSubmit }) => {
    const [ buscando, setBuscando ] = useState(0);

    function adicionarItens() {

    }

    function limpar() {

    }

    return (
        <Modal show={show} centered size="lg">
            <Modal.Header className="alert-primary">
                <Modal.Title>Adicionar item na Receita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-inline">
                        <Field name="codigo" component={Input} type="text" placeholder="código do produto" />
                        <Field name="nome" component={Input} type="text" placeholder="nome do produto" />
                        <div className="btn btn-warning" onClick={limpar}><i className="fa fa-eraser" /> Limpar</div>
                        <button type="submit" className="btn btn-primary pull-right" onClick={() => setBuscando(true)}><i className="fa fa-search" /> Pesquisar</button>
                    </div>
                    <hr />
                    <ProdutosTable buscando={buscando} />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div className="btn btn-warning" onClick={onHide}><i className="fa fa-arrow-left" /> Voltar</div>
                <div className="btn btn-primary" onClick={adicionarItens}><i className="fa fa-plus" /> Adicionar</div>
            </Modal.Footer>
        </Modal>
    );
});