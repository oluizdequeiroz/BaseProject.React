import React, { Component } from 'react';
import UsersTable from './table';
import UserForm from "./form";
import { bindDefault } from '../../config/binders';

class Produtos extends Component {

    componentDidMount() {
        const { get } = this.props;

        get('produto', 'produtos', {
            treatment: response => response.retorno
        });
    }

    cancelar() {
        const { setValue } = this.props;

        setValue('produto');
        setValue('produtoRegistro');
    }

    render() {
        const { produto } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Usuários do sistema</h4>
                            </div>
                            <div className="card-body">
                                <UsersTable />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="card">
                            <div className="card-header card-header-success">
                                <h4 className="card-title">{produto ? 'Salvar' : 'Novo'} usuário</h4>
                            </div>
                            <div className="card-body">
                                <UserForm key={produto && produto.codigo} cancelar={this.cancelar.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default bindDefault('produto')(Produtos);