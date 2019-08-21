import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actions';
import BootstrapTable from 'react-bootstrap-table-next';

export default bindDefault('produtos')(({ produtos }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código',
            sort: true
        },
        {
            dataField: 'nome',
            text: 'Produto',
            sort: true
        },
        {
            dataField: 'fornecedor',
            text: 'Fornecedor',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: 120 }
        }
    ];

    const _produtos = (produtos || []).map(produto => ({
        ...produto,
        actions: <BtnGroupActions produto={produto} />
    }));

    return <BootstrapTable striped condensed keyField="codigo" data={_produtos} columns={columns} noDataIndication={_produtos ? 'Não há produtos!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} />
});