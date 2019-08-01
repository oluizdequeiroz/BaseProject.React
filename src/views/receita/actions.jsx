import React from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';

export default bindDefault('refeicaoDel')(({ receita, setValue, del, receitaDel }) => {

    function editarReceita() {

        setValue('registro');
        setValue('receita', receita);
    }

    function deleteReceita(codigo) {

        swal.fire({
            type: 'question',
            title: 'Confirma a exclusão da receita?',
            text: 'Tem certeza de que deseja excluir a receita?',
            showCancelButton: true,
            cancelButtonText: 'Não',
            showConfirmButton: true,
            confirmButtonText: 'Sim'
        }).then(({ value }) => {
            if (value) {
                del(`receita/excluir/${codigo}`, 'receitaDel');
            }
        });
    }

    if (receitaDel && receitaDel.stack) {
        swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir a receita!', 'error');
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarReceita}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteReceita(receita.codigo)}>Excluir</div>
        </div>
    );
});