import React, { useEffect } from 'react';
import { bindDefault } from '../../config/binders';

import swal from 'sweetalert2';
import { treatDefault as treatment } from '../../treatments';

export default bindDefault('clienteDel')(({ cliente, setValue, del, clienteDel, get }) => {
    
    useEffect(() => {
        if (clienteDel) {
            if (clienteDel.sucesso) {
                get('cliente', 'clientes', { treatment });
                swal.fire('cliente excluida com sucesso!', undefined, 'success');
            } else if (clienteDel.stack) {
                swal.fire('Erro ao tentar excluir!', 'O sistema acionou uma exceção na tentativa de excluir a cliente!', 'error');
            }
            setValue('clienteDel');
        }
    }, [clienteDel, get, setValue]);

    function editarcliente() {
        setValue('clienteRegistro');
        setValue('cliente', cliente);
        get(`itensclientes/${cliente.codigo}`, 'itensclientes', { treatment });
    }

    function deletecliente(codigo) {
        swal.fire({
            type: 'question',
            title: 'Confirma a exclusão da cliente?',
            text: 'Tem certeza de que deseja excluir a cliente?',
            showCancelButton: true,
            cancelButtonText: 'Não',
            showConfirmButton: true,
            confirmButtonText: 'Sim'
        }).then(({ value }) => {
            if (value) {
                del(`cliente/excluir/${codigo}`, 'clienteDel');
            }
        });
    }

    return (
        <div className="btn-group btn-actions">
            <div className="btn btn-primary btn-sm" onClick={editarcliente}>Editar</div>
            <div className="btn btn-danger btn-sm" onClick={() => deletecliente(cliente.codigo)}>Excluir</div>
        </div>
    );
});