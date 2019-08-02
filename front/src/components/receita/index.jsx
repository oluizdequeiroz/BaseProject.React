import React, { Component } from 'react';
import ReceitaTable from './table';
import PesquisarReceitaForm from "./PesquisarReceitaForm";
import EditarSalvarForm from "./EditarSalvarForm";
import { bindDefault } from '../../config/binders';

class Receita extends Component {

    state = {
        novaReceita: false,
        visible: false
    };

    cancelar() {
        const { setValue } = this.props;

        setValue('receita');
        setValue('receitaRegistro');
        this.setNovaReceita(false);
    }

    setNovaReceita(flag) {
        this.setState({ novaReceita: flag });
    }

    render() {
        const { receita } = this.props;
        const { novaReceita } = this.state;

        const propsCollapse = {
            style: (novaReceita || receita) && { cursor: 'pointer' },
            onClick: (novaReceita || receita) && (() => this.setState({ visible: !this.state.visible }))
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary" {...propsCollapse}>
                                <h4 className="card-title">Gerenciamento de Receitas</h4>
                            </div>
                            {(!novaReceita && !receita) || this.state.visible ?
                                <div className="card-body">
                                    <PesquisarReceitaForm key={receita && receita.codigo} onNovaReceita={this.setNovaReceita.bind(this)} />
                                    <div style={{ marginTop: '40px' }}>
                                        <ReceitaTable />
                                    </div>
                                </div>
                            : <div className="card-body" />}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">{(novaReceita || receita) ? `${novaReceita ? 'Cadastrar' : 'Editar'} Receita` : 'Selecione uma receita acima ou clique em Nova Receita...'}</h4>
                            </div>
                            <div className="card-body">
                                {(novaReceita || receita) && <EditarSalvarForm key={receita && receita.codigo} cancelar={this.cancelar.bind(this)} onNovaReceita={this.setNovaReceita.bind(this)} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default bindDefault('receita')(Receita);