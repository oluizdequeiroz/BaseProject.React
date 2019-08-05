import React, { Component } from 'react';

import routes from '../routes';
import { Link } from 'react-router-dom';

const logo = require('../../assets/img/pmenosLogo.JPG');

class Menu extends Component {

    state = {
        actived: '/'
    }

    isActived = path => this.state.actived === path;
    clickRouteItem = path => this.setState({ actived: path });

    render() {

        return (
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../../assets/img/sidebar-1.jpg">
                <div className="logo" onClick={() => this.clickRouteItem('/')}>
                    <Link to="/" className="simple-text logo-normal">
                        <div className="text-center">
                            <img src={logo} alt="Alimenta Soluções" width={150} />
                        </div>
                    </Link>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {routes.map((route, index) => (
                            <li key={index} className={`nav-item ${this.isActived(route.path) && 'active'}`} onClick={() => this.clickRouteItem(route.path)}>
                                <Link className="nav-link" to={route.path}>
                                    <i className={`fa fa-${route.icon}`} />
                                    <p>{route.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;