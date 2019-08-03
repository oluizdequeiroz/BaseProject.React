import { all, takeEvery } from 'redux-saga/effects';
import _fetch from '../fetchers';

function* genericFetch({ request: { API, method, endpoint = '', returnReduceKey, param, treatment }, callback }) {

    const session = sessionStorage.getItem('session');
    const retorno = session && JSON.parse(session).retorno;
    const bearer = retorno && `Bearer ${retorno}`;
    
    const body = JSON.stringify(param);
    var params = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
        }
    };
    if (method === 'POST' || method === 'PUT') params = { ...params, body };
    
    yield _fetch(API, endpoint, returnReduceKey, params, treatment, callback);
}

function* watchGenericFetch() {
    yield takeEvery('request', genericFetch);
}

export default function* sagas() {
    yield all([
        watchGenericFetch()
    ]);
}