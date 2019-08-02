import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actions';
import BootstrapTable from 'react-bootstrap-table-next';

export default bindDefault('receitas')(({ receitas }) => {

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
            dataField: 'medida',
            text: 'Unidade de Medida',
            sort: true
        },
        {
            dataField: 'qtdliquida',
            text: 'Quantidade Liquida',
            sort: true
        },
        {
            dataField: 'perdaBruta',
            text: '% Perda Bruta',
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

    return <BootstrapTable striped condensed keyField="codigo" data={_receitas} columns={columns} noDataIndication={_receitas ? 'Pesquise os itens da receita!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} />
});