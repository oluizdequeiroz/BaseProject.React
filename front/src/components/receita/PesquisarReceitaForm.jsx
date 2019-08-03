import React from 'react';
import { bindDefault } from '../../config/binders';

import { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

export default bindDefault()(({ onNovaReceita, searchProps }) => {
    let searchReceitas;

    return (
        <div>
            <div>
                <SearchBar ref={input => searchReceitas = input} placeholder="Digite o nome da Receita" {...searchProps} />
            </div>
            <div className="btn btn-light" onClick={() => searchReceitas.props.onClear()}><i className="fa fa-eraser" /> Limpar</div>
            <div className="btn btn-success" onClick={() => onNovaReceita(true)}><i className="fa fa-plus" /> Nova Receita</div>
        </div>
    );
});