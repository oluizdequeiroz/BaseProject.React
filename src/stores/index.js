import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistState } from 'redux-devtools';
import { reducer as form } from 'redux-form';
import multi from 'redux-multi';

import reducers from './reducers';
import DevTools from './devtools';

import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const enhacer = compose(
    DevTools.instrument(),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        )
    )
);

export default function configureStore() {
    const store = applyMiddleware(sagaMiddleware, multi)(createStore)(
        combineReducers({ reducers, form }),
        enhacer
    );

    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default)
        );
    }

    sagaMiddleware.run(sagas);
    return store;
}