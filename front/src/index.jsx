import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Index from './components';
import Menu from './components/menu';
import Panel from './components/panel';
import Loading from './components/divers/loading';

import routes from './components/routes';

import configureStore from './config/store';
import DevTools from './config/devtools';

import './assets/css/material-dashboard.css';
import './index.css';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Router>
            <Index>
                <Menu />
                <Panel>
                    <Switch>
                        {routes.map((route, index) =>
                            <Route exact={route.exact} key={index} path={route.path} component={route.component} />
                        )}
                    </Switch>
                </Panel>
            </Index>
            <Loading />
            {process.env.NODE_ENV !== 'production' ? <DevTools /> : ''}
        </Router>
    </Provider>, document.getElementById('root'));