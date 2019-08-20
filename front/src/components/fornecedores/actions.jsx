import React from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';

export default bindDefault('fornecedorDel')(({ fornecedor, setValue, del, fornecedorDel }) => {

    function editarFornecedor() {

        setValue('fornecedorRegistro');
        setValue('fornecedor', fornecedor);
    }

    function deleteFornecedor(codigo) {

        swal.fire({
            type: 'question',
            title: 'Confirma a exclusão de usuários?',
            text: 'Tem certeza de que deseja excluir o usuários?',
            showCancelButton: true,
            cancelButtonText: 'Não',
            showConfirmButton: true,
            confirmButtonText: 'Sim'
        }).then(({ value }) => {
            if (value) {
                del(`fornecedor/excluir/${codigo}`, 'fornecedorDel');
            }
        });
    }

    if (fornecedorDel && fornecedorDel.stack) {
        swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir o usuário!', 'error');
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarFornecedor}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteFornecedor(fornecedor.codigo)}>Excluir</div>
        </div>
    );
});