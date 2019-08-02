import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actions';
import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator';

export default bindDefault('receitas')(({ receitas = require('./mock.json').receitas }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código',
            sort: true
        },
        {
            dataField: 'receita',
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

    return <BootstrapTable striped condensed keyField="codigo" data={_receitas} columns={columns} noDataIndication={_receitas ? 'Não há receitas!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} pagination={paginationFactory()} />
});