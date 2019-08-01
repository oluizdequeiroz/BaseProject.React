import React from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';

export default bindDefault('refeicaoDel')(({ refeicao, setValue, del, refeicaoDel }) => {

    function editarRefeicao() {

        setValue('registro');
        setValue('refeicao', refeicao);
    }

    function deleteRefeicao(codigo) {

        swal.fire({
            type: 'question',
            title: 'Confirma a exclusão da refeição?',
            text: 'Tem certeza de que deseja excluir a refeição?',
            showCancelButton: true,
            cancelButtonText: 'Não',
            showConfirmButton: true,
            confirmButtonText: 'Sim'
        }).then(({ value }) => {
            if (value) {
                del(`refeicao/excluir/${codigo}`, 'refeicaoDel');
            }
        });
    }

    if (refeicaoDel && refeicaoDel.stack) {
        swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir a refeição!', 'error');
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarRefeicao}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteRefeicao(refeicao.codigo)}>Excluir</div>
        </div>
    );
});