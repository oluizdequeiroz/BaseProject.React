import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actionsReceita';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator';

export default bindDefault('receitas')(({ receitas, baseProps }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código',
            sort: true
        },
        {
            dataField: 'nome',
            text: 'Receita',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: 120 }
        }
    ];

    const _receitas = (receitas || []).map(receita => ({
        ...receita,
        actions: <BtnGroupActions receita={receita} />
    }));

    const tableProps = {
        ...baseProps,
        keyField: "codigo",
        data: _receitas,
        columns: columns
    };

    return <BootstrapTable
        striped
        condensed
        noDataIndication={_receitas ? 'Não há receitas!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />}
        pagination={paginationFactory({
            sizePerPageList: [{
                text: '5',
                value: 5
            }]
        })}
        {...tableProps}
    />
});