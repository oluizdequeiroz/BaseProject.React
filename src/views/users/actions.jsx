import React from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';

export default bindDefault('usuarioDel')(({ usuario, setValue, del, usuarioDel }) => {

    function editarUsuario() {

        setValue('registro');
        setValue('usuario', usuario);
    }

    function deleteUsuario(codigo) {

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
                del(`usuario/excluir/${codigo}`, 'usuarioDel');
            }
        });
    }

    if (usuarioDel && usuarioDel.stack) {
        swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir o usuário!', 'error');
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarUsuario}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deleteUsuario(usuario.codigo)}>Excluir</div>
        </div>
    );
});