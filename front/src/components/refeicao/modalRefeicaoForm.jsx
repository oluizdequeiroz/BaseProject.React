import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { bindReduxForm } from '../../config/binders';

import { Field, initialize } from 'redux-form';
import Input from '../divers/input';

import { formatDate } from '../../utils';
import { setValue as actionSetValue } from '../../config/actions';

function validate(values) {
    const errors = {};

    if (!values.tiporefeicao) {
        errors.tiporefeicao = 'Informe o tipo de refeição.';
    }

    return errors;
}

const updateClienteComRefeicao = (clienteComRefeicoes, refeicao, tiporefeicao) => ({
    ...clienteComRefeicoes,
    dias: clienteComRefeicoes.dias.map(dia => {
        if (dia.datarefeicao === refeicao.datarefeicao) {
            const refeicoes = dia.refeicoes ? dia.refeicoes.filter(r => r.numsequencial !== refeicao.numsequencial) : [];
            refeicoes.push({
                ...refeicao,
                tiporefeicao
            });
            return { ...dia, refeicoes };
        } else {
            return dia;
        }
    })
});

export default bindReduxForm('refeicao', 'clienteComRefeicoes')()(validate)(({ show, onHide, dispatch, form, refeicao, clienteComRefeicoes, put, formValues, setValue }) => {
    useEffect(() => {
        if (refeicao) {
            dispatch(initialize(form, refeicao));
        }

        return () => {
            setValue('refeicao');
        };
    }, [dispatch, form, refeicao, setValue]);

    function salvar(e) {
        e.preventDefault();
        const { cliente, datarefeicao } = refeicao;
        const tiporefeicao = formValues;
        const url = refeicao.numsequencial ?
            `refeicao/${cliente}/${datarefeicao}/${refeicao.numsequencial}`
            : `refeicao/${cliente}/${datarefeicao}`;

        put(url, 'refeicaoRegistro', {
            param: { ...refeicao, tiporefeicao },
            callback: actionSetValue('clienteComRefeicoes', updateClienteComRefeicao(clienteComRefeicoes, refeicao, tiporefeicao))
        });
        onHide();
    }

    return (
        <Modal show={show} centered>
            <Modal.Header className="alert-primary">
                <Modal.Title>Adicionar refeição ao dia {formatDate(refeicao.datarefeicao)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={salvar}>
                    <Field name="tiporefeicao" component={Input} type="select" placeholder="Tipo de Refeição">
                        <option>Café da manhã</option>
                        <option>Almoço</option>
                        <option>Jantar</option>
                    </Field>
                    <hr />
                    <div className="btn btn-warning" onClick={onHide}><i className="fa fa-arrow-left" /> Voltar</div>
                    <button type="submit" className="btn btn-primary"><i className="fa fa-plus" /> Adicionar</button>
                </form>
            </Modal.Body>
        </Modal>
    );
}, 'tiporefeicao');