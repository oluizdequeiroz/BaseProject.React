import React, { useEffect } from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';
import { treatDefault as treatment } from '../../treatments';

export default bindDefault('receitaDel')(({ receita, setValue, del, receitaDel, get }) => {
    
    useEffect(() => {
        if (receitaDel) {
            if (receitaDel.sucesso) {
                get('receita', 'receitas', { treatment });
                swal.fire('Receita excluida com sucesso!', undefined, 'success');
            } else if (receitaDel.stack) {
                swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir a receita!', 'error');
            }
            setValue('receitaDel');
        }
    }, [receitaDel, get, setValue]);

    function editarReceita() {
        setValue('receitaRegistro');
        setValue('receita', receita);
        get(`itensreceitas/${receita.codigo}`, 'itensReceitas', { treatment });
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

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarReceita}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteReceita(receita.codigo)}>Excluir</div>
        </div>
    );
});