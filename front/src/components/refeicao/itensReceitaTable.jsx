import React from 'react';
import { bindDefault } from '../../config/binders';

import BtnGroupActions from './actions';
import BootstrapTable from 'react-bootstrap-table-next';

export default bindDefault('refeicao')(({ refeicoes }) => {

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

    const _refeicoes = (refeicoes || []).map(refeicao => ({
        ...refeicao,
        actions: <BtnGroupActions refeicao={refeicao} />
    }));

    return <BootstrapTable striped condensed keyField="codigo" data={_refeicoes} columns={columns} noDataIndication={_refeicoes ? 'Pesquise os itens da refeição!' : <i className="fa fa-cog fa-2x fa-spin fa-fw" />} />
});