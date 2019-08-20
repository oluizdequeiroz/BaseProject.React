import React, { Component } from 'react';
import MapaProducaoForm from "./form";
import GerarMapa from "./relatorio/gerarMapa";
import { bindDefault } from '../../config/binders';
 
class MapaProducao extends Component {
   
    render() {
       
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Gerenciamento de Mapa de Produção</h4>
                            </div>
                            <div className="card-body">
                                <MapaProducaoForm />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default bindDefault('mapaProducao')(MapaProducao);