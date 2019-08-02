import { put } from 'redux-saga/effects';

const API = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_API_DEVELOP : process.env.REACT_APP_API_PRODUCT;

export default function* _fetch(endpoint,
    returnReduceKey,
    parametros = {},
    treatment,
    callback) {

    let retorno;

    try {
        const url = `${API}/${endpoint}`;
        const data = yield fetch(url, parametros);
        retorno = yield data.json();

        if (callback) {
            yield put(callback);
        }
    } catch (error) {
        
        retorno = error;
        yield put(callback[0]);
    }

    yield put({ type: 'set_value', payload: { key: returnReduceKey, value: retorno, treatment } });
}