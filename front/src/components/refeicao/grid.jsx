import React, { useState, useEffect } from 'react';
import { bindDefault } from '../../config/binders';
import { formatDate } from '../../utils';
import ModalRefeicaoForm from './modalRefeicaoForm';
import swal from 'sweetalert2';

let count = 0;

export default bindDefault('clienteComRefeicoes', 'refeicaoRegistro')(({ clienteComRefeicoes, setValue, refeicaoRegistro }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => () => {
        setValue('clienteComRefeicoes');
    }, [setValue]);

    useEffect(() => {
        if (refeicaoRegistro) {
            if (refeicaoRegistro.sucesso) {
                swal.fire('Refeição salva com sucesso!', 'Os dados da refeição foram salvos com sucesso!', 'success');
            } else if (refeicaoRegistro.stack) {
                swal.fire('Erro ao tentar salvar!', 'O sistema acionou uma exceção ao tentar salvar uma refeição.', 'error');
            }
            setValue('refeicaoRegistro');
        }
    }, [refeicaoRegistro, setValue]);

    function abrirFormRefeicao(refeicao) {
        setShowModal(true);
        setValue('refeicao', refeicao)
    }

    const clienteView = (
        <div style={{ marginTop: '40px', marginBottom: '50px' }}>
            {/* Grid para cardapio */}
            <div>
                {/* Clintes */}
                <div className="gridCliente">
                    <div>{clienteComRefeicoes && clienteComRefeicoes.nome}</div>
                </div>
                {clienteComRefeicoes && clienteComRefeicoes.dias && clienteComRefeicoes.dias.map((dia, index) => {
                    count++;

                    const diaView = (
                        <>
                            <div key={index} className="gridDia">
                                <div className="card-header card-header-primary gridDiaSemana">
                                    {formatDate(dia.datarefeicao)}
                                </div>
                                {dia.refeicoes && dia.refeicoes.map((refeicao, jndex) => (
                                    <div key={jndex} className="btn-group pull-right group-buttons">
                                        <div className="btn btn-link">{refeicao.tiporefeicao}</div>
                                        <div className="btn btn-link" onClick={() => abrirFormRefeicao(refeicao)}><i className="fa fa-edit iconEditar" /></div>
                                        <div className="btn btn-link"><i className="fa fa-close iconFechar" /></div>
                                    </div>
                                ))}
                                <div className="card-body">
                                    <div className="btn btn-add btn-add-block btn-success" onClick={() => abrirFormRefeicao({
                                        datarefeicao: dia.datarefeicao,
                                        cliente: clienteComRefeicoes.numsequencial
                                    })}>Adicionar</div>
                                </div>
                            </div>
                            {count === 7 &&
                                <div className="col-md-12 content-is-hr">
                                    <hr />
                                </div>}
                        </>
                    );

                    count = count === 7 ? 0 : count;
                    return diaView;
                })}
            </div>
            {showModal && <ModalRefeicaoForm show={showModal} onHide={() => setShowModal(false)} />}
        </div>
    );

    count = 0;
    return clienteView;
});