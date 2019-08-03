import React, { Component } from 'react';
import { bindDefault } from '../config/binders';

class Panel extends Component {

    state = {
        ishow: false,
        tshow: false
    }

    componentDidMount = () => {
        if (window.location.hash !== '/') window.location.hash = '/';
    }

    clickNavBarToggler = () => this.setState({ tshow: !this.state.tshow });
    blurNavBarToggler = () => this.setState({ tshow: false });
    onSair = () => {
        const { clearValues } = this.props;
        sessionStorage.clear();
        clearValues();
    }

    render() {
        const { tshow } = this.state;

        if (tshow) document.getElementsByTagName('html')[0].classList.add('nav-open');
        else document.getElementsByTagName('html')[0].classList.remove('nav-open');

        return (
            <div className="main-panel">
                <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-wrapper">
                            <a className="navbar-brand" href="/me">Bem vindo, {this.props.username}</a>
                        </div>
                        <button className={`navbar-toggler ${tshow && 'toggled'}`} onClick={this.clickNavBarToggler} onBlur={this.blurNavBarToggler} type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end">
                            <ul className="navbar-nav">
                                <a className="btn btn-danger btn-sm" href="/" onClick={this.onSair}>Sair</a>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default bindDefault('username')(Panel);