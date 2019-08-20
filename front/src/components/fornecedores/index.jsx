import React, { Component } from 'react';
import FornecedorTable from './table';
import FornecedorForm from "./form";
import { bindDefault } from '../../config/binders';

class Fornecedores extends Component {

    componentDidMount() {
        const { get } = this.props;

        get('fornecedor', 'fornecedores', {
            treatment: response => response.retorno
        });
    }

    cancelar() {
        const { setValue } = this.props;

        setValue('fornecedor');
        setValue('fornecedorRegistro');
    }

    render() {
        const { fornecedor } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Fornecedores</h4>
                            </div>
                            <div className="card-body">
                                <FornecedorTable />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="card">
                            <div className="card-header card-header-success">
                                <h4 className="card-title">{fornecedor ? 'Salvar' : 'Novo'} fornecedor</h4>
                            </div>
                            <div className="card-body">
                                <FornecedorForm key={fornecedor && fornecedor.codigo} cancelar={this.cancelar.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default bindDefault('fornecedor')(Fornecedores);