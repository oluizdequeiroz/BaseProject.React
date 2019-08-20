import React from 'react';
import { bindDefault } from '../../../../config/binders';

import BootstrapTable from 'react-bootstrap-table-next';

import paginationFactory from 'react-bootstrap-table2-paginator';

export default bindDefault('produtos')(({ produtos, buscando, setValue, whenSelect }) => {

    const columns = [
        {
            dataField: 'codigo',
            text: 'Código do Produto',
            sort: true
        },
        {
            dataField: 'nome',
            text: 'Nome do Produto',
            sort: true
        },
        {
            dataField: 'unidademedida',
            text: 'Unidade de Medida',
            sort: true
        }
    ];

    function onSelect(row, isSelect) {
        if (isSelect) {
            const novoItem = {
                codigo: 'NOVO',
                codigoProduto: row.codigo,
                produto: row.nome
            };
            setValue('novoItem', novoItem);
            whenSelect();
        } else {
            setValue('novoItem');
        }
    }

    const options = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: '#00BFFF',
        onSelect
    };

    return <BootstrapTable
        striped
        condensed
        keyField="codigo"
        data={produtos || []}
        columns={columns}
        noDataIndication={buscando ? <i className="fa fa-cog fa-2x fa-spin fa-fw" /> : 'Pesquise os produtos!'}
        pagination={paginationFactory({
            sizePerPageList: [{
                text: '5',
                value: 5
            }]
        })}
        selectRow={options}
    />
});