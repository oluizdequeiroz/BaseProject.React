import React from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';

export default bindDefault('itemReceitaDel')(({ itemReceita, setValue, del, itemReceitaDel }) => {

    function editarItemReceita() {

        setValue('itemReceitaRegistro');
        setValue('itemReceita', itemReceita);
    }   

    function deleteItemReceita(codigo) {

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
                del(`receita/excluir/${codigo}`, 'itemReceitaDel');
            }
        });
    }

    if (itemReceitaDel && itemReceitaDel.stack) {
        swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir a receita!', 'error');
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarItemReceita}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteItemReceita(itemReceita.codigo)}>Excluir</div>
        </div>
    );
});