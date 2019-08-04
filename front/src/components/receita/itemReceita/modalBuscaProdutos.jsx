import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { bindReduxForm } from '../../../config/binders';
import { get } from '../../../config/actions';

import { Field, initialize } from 'redux-form';
import Input from '../../divers/input';

import ProdutosTable from './produto/produtosTable';

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

export default bindReduxForm('itensReceitas', 'novoItem')(pesquisar)()(({ show, onHide, handleSubmit, dispatch, form, itensReceitas, novoItem, setValue }) => {
    const [ buscando, setBuscando ] = useState(false);
    const [ selecionado, setSelecionado ] = useState(false);

    let qtdLiquida, perPerda;

    function adicionarItem() {
        const item = { 
            ...novoItem,            
            quantidadeliquida: qtdLiquida.value,
            percentualperda: perPerda.value,
            receita: itensReceitas[0].receita 
        };
        const itens = [ item, ...itensReceitas ];
        setValue('novoItem');
        setValue('itensReceitas', itens);
        onHide();
    }

    return (
        <Modal show={show} centered size="lg" onHide>
            <Modal.Header className="alert-primary">
                <Modal.Title>Adicionar item na Receita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-inline">
                        <Field name="codigo" component={Input} type="text" placeholder="código do produto" />
                        <Field name="nome" component={Input} type="text" placeholder="nome do produto" />
                        <div className="btn btn-warning" onClick={() => dispatch(initialize(form, {}))}><i className="fa fa-eraser" /> Limpar</div>
                        <button type="submit" className="btn btn-primary pull-right" onClick={() => setBuscando(true)}><i className="fa fa-search" /> Pesquisar</button>
                    </div>
                    <hr />
                    <ProdutosTable buscando={buscando} whenSelect={() => setSelecionado(true)} />
                </form>
                <div style={{ display: selecionado ? 'block' : 'none' }}>
                    <input type="text" className="form-control" ref={input => qtdLiquida = input} placeholder="quantidade líquida" />
                    <input type="text" className="form-control" ref={input => perPerda = input} placeholder="percentual de perda" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="btn btn-warning" onClick={onHide}><i className="fa fa-arrow-left" /> Voltar</div>
                <div className="btn btn-primary" onClick={adicionarItem}><i className="fa fa-plus" /> Adicionar</div>
            </Modal.Footer>
        </Modal>
    );
});