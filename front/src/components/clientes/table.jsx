import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actionsClientes';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator';

export default bindDefault('clientes')(({ clientes, baseProps }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código',
            sort: true
        },
        {
            dataField: 'nome',
            text: 'cliente',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: 120 }
        }
    ];

    const _clientes = (clientes || []).map(cliente => ({
        ...cliente,
        actions: <BtnGroupActions cliente={cliente} />
    }));

    const tableProps = {
        ...baseProps,
        keyField: "codigo",
        data: _clientes,
        columns: columns
    };

    return <BootstrapTable
        striped
        condensed
        noDataIndication={_clientes ? 'Não há clientes!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />}
        pagination={paginationFactory({
            sizePerPageList: [{
                text: '5',
                value: 5
            }]
        })}
        {...tableProps}
    />
});