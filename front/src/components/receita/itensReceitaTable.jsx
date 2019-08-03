import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actionsItemReceita';
import BootstrapTable from 'react-bootstrap-table-next';

export default bindDefault('itensReceitas')(({ itensReceitas }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código do Produto',
            sort: true
        },
        {
            dataField: 'produto',
            text: 'Nome do Produto',
            sort: true
        },
        {
            dataField: 'quantidadeliquida',
            text: 'Quantidade Liquida',
            sort: true
        },
        {
            dataField: 'percentualperda',
            text: '% Perda Bruta',
            sort: true
        },
        {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: 120 }
        }
    ];

    const _itensReceitas = (itensReceitas || []).map(itemReceita => ({
        ...itemReceita,
        actions: <BtnGroupActions itemReceita={itemReceita} />
    }));

    return <BootstrapTable 
        striped 
        condensed 
        keyField="codigo" 
        data={_itensReceitas} 
        columns={columns} 
        noDataIndication={_itensReceitas ? 'Pesquise os itens da receita!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} 
    />
});