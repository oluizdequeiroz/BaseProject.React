import React, { Component } from 'react';
import RefeicaoTable from './table';
import RefeicaoForm from "./form";
import { bindDefault } from '../../config/binders';
class Refeicao extends Component {
    cancelar() {
        const { setValue } = this.props;

        setValue('refeicao');
        setValue('registro');
        this.setState({ novaRefeicao: false })
    }

    render() {
        const { refeicao } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <h2>Gerenciamento de Refeições</h2>
                    <div className="col-lg-8 col-md-8">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Pesquisar Refeicao</h4>
                            </div>
                            <div className="card-body">
                                <RefeicaoTable />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="card">
                            <div className="card-header card-header-success">
                                <h4 className="card-title">{refeicao ? 'Editar Refeição' : 'Novo'} </h4>
                            </div>
                            <div className="card-body">
                                <RefeicaoForm key={refeicao && refeicao.codigo} cancelar={this.cancelar.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
           
        );
    }
}

export default bindDefault('refeicao')(Refeicao);