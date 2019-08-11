import React, { Component } from 'react';
// import RefeicaoTable from './table';
import PesquisarRefeicaoForm from "./PesquisarRefeicaoForm";
// import EditarSalvarForm from "./EditarSalvarForm";
import { bindDefault } from '../../config/binders';
import { formatDate } from '../../utils';

class Refeicao extends Component {

    state = {
        novaRefeicao: false,
        visible: false
    };

    render() {
        const { refeicao, clienteComRefeicoes } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Gerenciamento de Refeições</h4>
                            </div>
                            <div className="card-body">
                                <PesquisarRefeicaoForm key={refeicao && refeicao.codigo} />
                                <div style={{ marginTop: '40px', marginBottom: '50px' }}>
                                    {/* Grid para cardapio */}
                                    <div>
                                        {/* Clintes */}
                                        <div className="gridCliente">
                                            <div>{clienteComRefeicoes && clienteComRefeicoes.nome}</div>
                                        </div>
                                        {clienteComRefeicoes && clienteComRefeicoes.dias && clienteComRefeicoes.dias.map(dia => (
                                            <div className="gridDia">
                                                <div className="card-header card-header-primary gridDiaSemana">
                                                    <div>{formatDate(dia.datarefeicao)}</div>
                                                    <h6>({dia.refeicoes[0].diarefeicao})</h6>
                                                </div>
                                                {dia.refeicoes ? dia.refeicoes.map(refeicao => (
                                                    <div className="btn-group pull-right group-buttons">
                                                        <div className="btn btn-link">{refeicao.tiporefeicao}</div>
                                                        <div className="btn btn-link"><i className="fa fa-edit iconEditar" /></div>
                                                        <div className="btn btn-link"><i className="fa fa-close iconFechar" /></div>
                                                    </div>
                                                )) :
                                                    <div className="refeicao" >
                                                        <div className="btn btn-block btn-add btn-success">Adicionar</div>
                                                    </div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <div className="btn btn-success" ><i className="fa fa-save" /> Salvar</div>
                                    <div className="btn btn-primary" ><i className="fa fa-print" /> Imprimir Cardápio</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default bindDefault('refeicao', 'clienteComRefeicoes')(Refeicao);