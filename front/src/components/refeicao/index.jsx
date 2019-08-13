import React from 'react';
import GridRefeicoesDeCliente from './grid';
import PesquisarRefeicaoForm from "./pesquisarRefeicaoForm";

export default () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-header-primary">
                        <h4 className="card-title">Gerenciamento de Refeições</h4>
                    </div>
                    <div className="card-body">
                        <PesquisarRefeicaoForm />
                        <GridRefeicoesDeCliente />
                    </div>
                    <div className="col-md-12">
                        <hr />
                        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <div className="btn btn-primary" ><i className="fa fa-print" /> Imprimir Cardápio</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);