import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actions';
import BootstrapTable from 'react-bootstrap-table-next';

export default bindDefault('usuarios')(({ usuarios }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código',
            sort: true
        },
        {
            dataField: 'nome',
            text: 'Usuário',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: 120 }
        }
    ];

    const _usuarios = (usuarios || []).map(usuario => ({
        ...usuario,
        actions: <BtnGroupActions usuario={usuario} />
    }));

    return <BootstrapTable striped condensed keyField="codigo" data={_usuarios} columns={columns} noDataIndication={_usuarios ? 'Não há usuários!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} />
});