import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actions';
import BootstrapTable from 'react-bootstrap-table-next';
// import receita from './';

export default bindDefault('receitas')(({ receitas = require('./mock.json').receitas /* TODO: lista de usuários mockada */ }) => {

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

    return <BootstrapTable striped condensed keyField="codigo" data={_receitas} columns={columns} noDataIndication={_receitas ? 'Não há receitas!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} />
});