import React from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';

export default bindDefault('produtoDel')(({ produto, setValue, del, produtoDel }) => {

    function editarProduto() {

        setValue('produtoRegistro');
        setValue('produto', produto);
    }

    function deleteProduto(codigo) {

        swal.fire({
            type: 'question',
            title: 'Confirma a exclusão de produto?',
            text: 'Tem certeza de que deseja excluir o produto?',
            showCancelButton: true,
            cancelButtonText: 'Não',
            showConfirmButton: true,
            confirmButtonText: 'Sim'
        }).then(({ value }) => {
            if (value) {
                del(`produto/excluir/${codigo}`, 'produtoDel');
            }
        });
    }

    if (produtoDel && produtoDel.stack) {
        swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir o produto!', 'error');
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarProduto}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteProduto(produto.codigo)}>Excluir</div>
        </div>
    );
});