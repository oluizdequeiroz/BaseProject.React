import React, { Component } from 'react';
import clienteTable from './table';
import PesquisarClienteForm from "./pesquisarClienteForm";
import ClienteForm from "./clienteForm";
import { bindDefault } from '../../config/binders';

import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { treatDefault as treatment } from '../../treatments';

class Clientes extends Component {

    state = {
        novoCliente: false,
        visible: false
    };

    componentDidMount() {
        const { get } = this.props;

        get('cliente', 'clientes', { treatment });
    }

    cancelar() {
        const { setValue } = this.props;

        setValue('cliente');
        setValue('clienteRegistro');
        this.setNovoCliente(false);
    }

    setNovoCliente(flag) {
        this.setState({ novoCliente: flag });
    }

    render() {
        const { cliente } = this.props;
        const { novoCliente } = this.state;

        const propsCollapse = {
            style: (novoCliente || cliente) && { cursor: 'pointer' },
            onClick: (novoCliente || cliente) && (() => this.setState({ visible: !this.state.visible }))
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary" {...propsCollapse}>
                                <h4 className="card-title">Gerenciamento de clientes</h4>
                            </div>
                            {(!novoCliente && !cliente) || this.state.visible ?
                                <div className="card-body">
                                    <ToolkitProvider search>{props => (
                                        <div>
                                            <PesquisarClienteForm key={cliente && cliente.codigo} onNovoCliente={this.setNovoCliente.bind(this)} searchProps={props.searchProps} />
                                            <div style={{ marginTop: '40px' }}>
                                                <clienteTable baseProps={props.baseProps} />
                                            </div>
                                        </div>
                                    )}</ToolkitProvider>
                                </div>
                                : <div className="card-body" />}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">{(novoCliente || cliente) ? `${novoCliente ? 'Cadastrar' : 'Editar'} cliente` : 'Selecione um cliente acima ou clique em Novo cliente...'}</h4>
                            </div>
                            <div className="card-body">
                                {(novoCliente || cliente) && <clienteForm key={cliente && cliente.codigo} cancelar={this.cancelar.bind(this)} onNovoCliente={this.setNovoCliente.bind(this)} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default bindDefault('cliente')(Clientes);