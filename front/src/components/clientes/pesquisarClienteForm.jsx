import React from 'react';
import { bindDefault } from '../../config/binders';

import { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

export default bindDefault()(({ onNovoCliente, searchProps }) => {
    let searchClientes;

    return (
        <div>
            <div>
                <SearchBar ref={input => searchClientes = input} placeholder="Digite o nome do Cliente" {...searchProps} />
            </div>
            <div className="btn btn-light" onClick={() => searchClientes.props.onClear()}><i className="fa fa-eraser" /> Limpar</div>
            <div className="btn btn-success" onClick={() => onNovoCliente(true)}><i className="fa fa-plus" /> Novo Cliente</div>
        </div>
    );
});