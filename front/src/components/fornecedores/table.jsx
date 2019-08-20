import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actions';
import BootstrapTable from 'react-bootstrap-table-next';

export default bindDefault('fornecedores')(({ fornecedores }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código',
            sort: true
        },
        {
            dataField: 'nome',
            text: 'Fornecedor',
            sort: true
        },
        {
            dataField: 'endereco',
            text: 'Endereço',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: 120 }
        }
    ];

    const _fornecedores = (fornecedores || []).map(fornecedor => ({
        ...fornecedor,
        actions: <BtnGroupActions fornecedor={fornecedor} />
    }));

    return <BootstrapTable striped condensed keyField="codigo" data={_fornecedores} columns={columns} noDataIndication={_fornecedores ? 'Não há Fornecedores!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} />
});