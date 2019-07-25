import { all, takeEvery } from 'redux-saga/effects';
import _fetch from '../fetchers';

function* genericFetch({ request: { method, /*api, */endpoint = '', returnReduceKey, param, treatment }, config, callback }) {

    const body = JSON.stringify(param);
    var params = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (method === 'POST' || method === 'PUT') params = { ...params, body };
    
    yield _fetch(endpoint, returnReduceKey, params, treatment, config, callback);
}

function* watchGenericFetch() {
    yield takeEvery('request', genericFetch);
}

export default function* sagas() {
    yield all([
        watchGenericFetch()
    ]);
}