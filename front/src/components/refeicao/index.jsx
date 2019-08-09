import React, { Component } from 'react';
// import RefeicaoTable from './table';
import PesquisarRefeicaoForm from "./PesquisarRefeicaoForm";
// import EditarSalvarForm from "./EditarSalvarForm";
import { bindDefault } from '../../config/binders';
var data = new Date();
class Refeicao extends Component {

    state = {
        novaRefeicao: false,
        visible: false
    };

    cancelar() {
        const { setValue } = this.props;

        setValue('refeicao');
        setValue('refeicaoRegistro');
        this.setNovaRefeicao(false);
    }

    setNovaRefeicao(flag) {
        this.setState({ novaRefeicao: flag });
    }
    pesquisar() {
        let grids = [];

        for (let i = 0; i < 7; i++) {
            grids.push(
                <div className="gridDia">
                    <div className="card-header card-header-primary gridDiaSemana">{new Date() + i} <i className="fa fa-close iconFechar" /></div>
                    <div className="receita" >cliente {i} </div>
                    <div className="receita" >01 </div>
                </div>
            );
        }

        return grids;
    }
    render() {
        const { refeicao } = this.props;
        const { novaRefeicao } = this.state;

        const clienteComRefeicoes = {
            nomeCliente: 'Teste',
            dias: [
                {
                    data: new Date().getDate(),
                    refeicoes: [
                        {
                            nome: `refeição ${new Date().getDay()}`
                        }
                    ]
                },
                {
                    data: new Date().getDate(),
                    refeicoes: [
                        {
                            nome: `refeição ${new Date().getDay() + 1}`
                        }
                    ]
                },
                {
                    data: new Date().getDate(),
                    refeicoes: [
                        {
                            nome: `refeição ${new Date().getDay() + 2}`
                        }
                    ]
                },
                {
                    data: new Date().getDate(),
                    refeicoes: [
                        {
                            nome: `refeição ${new Date().getDay() + 3}`
                        }
                    ]
                },
                {
                    data: new Date().getDate(),
                    refeicoes: undefined
                    // [
                    //     {
                    //         nome: `refeição ${new Date().getDay() + 4}` 
                    //     }
                    // ]
                },
                {
                    data: new Date().getDate(),
                    refeicoes: undefined
                    // [
                    //     {
                    //         nome: `refeição ${new Date().getDay() + 4}` 
                    //     }
                    // ]
                },
                {
                    data: new Date().getDate(),
                    refeicoes: undefined
                    // [
                    //     {
                    //         nome: `refeição ${new Date().getDay() + 4}` 
                    //     }
                    // ]
                }
            ]
        };

        const propsCollapse = {
            style: (novaRefeicao || refeicao) && { cursor: 'pointer' },
            onClick: (novaRefeicao || refeicao) && (() => this.setState({ visible: !this.state.visible }))
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary" {...propsCollapse}>
                                <h4 className="card-title">Gerenciamento de Refeições</h4>
                            </div>
                            {(!novaRefeicao && !refeicao) || this.state.visible ?
                                <div className="card-body">
                                    <PesquisarRefeicaoForm key={refeicao && refeicao.codigo} onNovaReceita={this.setNovaRefeicao.bind(this)} />
                                    <div style={{ marginTop: '40px', marginBottom: '50px' }}>
                                        {/* Grid para cardapio */}
                                        <div>
                                            {/* Clintes */}
                                            <div className="gridCliente">
                                                <div>cliente escolhido: {clienteComRefeicoes.nomeCliente}</div>

                                            </div>
                                            {clienteComRefeicoes.dias && clienteComRefeicoes.dias.map(dia => (
                                                <div className="gridDia">
                                                    <div className="card-header card-header-primary gridDiaSemana">{dia.data} </div>
                                                    {dia.refeicoes ? dia.refeicoes.map(refeicao => (
                                                        <div className="receita" >
                                                            {refeicao.nome} 
                                                            <i className="fa fa-edit iconEditar" />
                                                            <i className="fa fa-close iconFechar" />
                                                          </div>
                                                    )) :
                                                        <div className="receita" >
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
                                : <div className="card-body" />}
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default bindDefault('refeicao')(Refeicao);