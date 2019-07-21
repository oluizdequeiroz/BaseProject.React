import React, { Component } from 'react';

class Panel extends Component {

    state = {
        ishow: false,
        tshow: false
    }

    componentDidMount = () => {
        if (window.location.hash !== '/') window.location.hash = '/';
    }

    blurNavBarToggler = () => this.setState({ tshow: false });
    clickNavBarToggler = () => this.setState({ tshow: !this.state.tshow });

    blurNavItemDropdown = () => this.setState({ ishow: false });
    clickNavItemDropdown = () => this.setState({ ishow: !this.state.ishow });

    render() {
        const { ishow } = this.state;
        const { tshow } = this.state;

        if (tshow) document.getElementsByTagName('html')[0].classList.add('nav-open');
        else document.getElementsByTagName('html')[0].classList.remove('nav-open');

        return (
            <div className="main-panel">
                <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-wrapper">
                            <a className="navbar-brand" href="/me">[user name of session]</a>
                        </div>
                        <button className={`navbar-toggler ${tshow && 'toggled'}`} onClick={this.clickNavBarToggler} onBlur={this.blurNavBarToggler} type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end">
                            <ul className="navbar-nav">
                                <li className={`nav-item dropdown ${ishow && 'show'}`} onClick={this.clickNavItemDropdown} onBlur={this.blurNavItemDropdown}>
                                    <a className="nav-link" href="#/" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="material-icons">person</i>
                                        <p className="d-lg-none d-md-block">Conta</p>
                                    </a>
                                    <div className={`dropdown-menu dropdown-menu-right ${ishow && 'show'}`} aria-labelledby="navbarDropdownProfile">
                                        <a className="dropdown-item" href="#/">Perfil</a>
                                        <a className="dropdown-item" href="#/">Configurações</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#/">Sair</a>
                                    </div>
                                </li>
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

export default Panel;