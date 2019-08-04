import React, { useEffect } from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';

export default bindDefault('receitaDel')(({ receita, setValue, del, receitaDel, get }) => {
    useEffect(() => {
        if (receitaDel) {
            if (receitaDel.sucesso) {
                get('receitas', 'receitas', { treatment: (response) => response.retorno });
                swal.fire('Receita excluida com sucesso!', undefined, 'success');
            } else if (receitaDel.stack) {
                swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir a receita!', 'error');
            }
            setValue('receitaDel');
        }
        // eslint-disable-next-line
    }, [receitaDel]);

    function editarReceita() {
        setValue('receitaRegistro');
        setValue('receita', receita);
        get(`itensreceitas/${receita.codigo}`, 'itensReceitas', {
            treatment: response => response.retorno
        });
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
                del(`receitas/excluir/${codigo}`, 'receitaDel');
            }
        });
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarReceita}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteReceita(receita.codigo)}>Excluir</div>
        </div>
    );
});