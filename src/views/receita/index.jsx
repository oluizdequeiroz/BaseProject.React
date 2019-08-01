import React, { Component } from 'react';
import ReceitaTable from './table';
//import ReceitaForm from "./form";
import PesquisarReceitaForm from "./PesquisarReceitaForm";
import EditarSalvarForm from "./EditarSalvarForm";
import { bindDefault } from '../../config/binders';
class Receita extends Component {
    
    cancelar() {
        const { setValue } = this.props;

        setValue('receita');
        setValue('registro');
        this.setState({ novaReceita: false })
    }

    render() {
        const { receita } = this.props;
        
        return (
            <div className="container-fluid">
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Gerenciamento de Receitas</h4>
                            </div>
                            <div className="card-body">
                                <PesquisarReceitaForm key={receita && receita.codigo} cancelar={this.cancelar.bind(this)} />
                                <div style={{marginTop: '40px'}}>
                                    <ReceitaTable />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    {/* <div  className="col-md-12">
                     <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Receitas</h4>
                            </div>
                            <div className="card-body">
                                <ReceitaTable />
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-lg-4 col-md-4">
                        <div className="card">
                            <div className="card-header card-header-success">
                                <h4 className="card-title">{receita ? 'Editar Refeição' : 'Novo'} </h4>
                            </div>
                            <div className="card-body">
                           
                                <ReceitaForm key={receita && receita.codigo} cancelar={this.cancelar.bind(this)} />
                            </div>
                        </div>
                    </div> */}
                </div>
{/* tela de cadastrar receitas */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Cadastrar/Editar Receita</h4>
                            </div>
                            <div className="card-body">
                                <EditarSalvarForm key={receita && receita.codigo} cancelar={this.cancelar.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
           
        );
    }
}

export default bindDefault('receita')(Receita);