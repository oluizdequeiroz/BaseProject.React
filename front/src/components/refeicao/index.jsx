import React, { Component } from 'react';
// import RefeicaoTable from './table';
import PesquisarRefeicaoForm from "./PesquisarRefeicaoForm";
// import EditarSalvarForm from "./EditarSalvarForm";
import { bindDefault } from '../../config/binders';

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

    render() {
        const { refeicao } = this.props;
        const { novaRefeicao } = this.state;

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
                                    <div style={{ marginTop: '40px', marginBottom: '50px'}}>
                                       {/* Grid para cardapio */}
                                       <div>
                                           {/* Clintes */}
                                           <div className="gridCliente">
                                                <div>cliente escolhido</div>
                                                
                                            </div>
                                            
                                           {/* Segunda */}
                                           <div className="gridDia">
                                                <div  className="card-header card-header-primary gridDiaSemana">01/02/19 <i className="fa fa-close iconFechar" /></div>
                                                <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                                
                                            </div>
                                           {/* Terça */}
                                           <div className="gridDia">
                                           <div  className="card-header card-header-primary gridDiaSemana">01/02/19 <i className="fa fa-close iconFechar" /></div>
                                           <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                            </div>
                                            
                                           {/* Quarta */}
                                           <div className="gridDia">
                                           <div  className="card-header card-header-primary gridDiaSemana">01/02/19 <i className="fa fa-close iconFechar" /></div>
                                           <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                            </div>
                                            
                                           {/* Quinta */}
                                           <div className="gridDia">
                                           <div  className="card-header card-header-primary gridDiaSemana">01/02/19 <i className="fa fa-close iconFechar" /></div>
                                           <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                            </div>
                                            
                                           {/* Sexta */}
                                           <div className="gridDia">
                                           <div  className="card-header card-header-primary gridDiaSemana">01/02/19 <i className="fa fa-close iconFechar" /></div>
                                           <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                            </div>
                                            
                                           {/* Sábado */}
                                           <div className="gridDia">
                                           <div  className="card-header card-header-primary gridDiaSemana">01/02/19 <i className="fa fa-close iconFechar" /></div>
                                           <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                                <div className="receita" >01 </div>
                                            </div>
                                            
                                           {/* Domingo */}
                                           <div className="gridDia">
                                           <div  className="card-header card-header-primary gridDiaSemana">01/02/19 <i className="fa fa-close iconFechar" /></div>
                                                <div className="receita">01 </div>
                                                <div className="receita">01 </div>
                                                <div className="receita" >01 </div>
                                            </div>
                                            
                                       </div>
                                    </div>
                                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
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