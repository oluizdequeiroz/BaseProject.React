import { all, takeEvery } from 'redux-saga/effects';
import _fetch from '../fetchers';

function* watchGenericFetch() {
    yield takeEvery('request', _fetch);
}

export default function* sagas() {
    yield all([
        watchGenericFetch()
    ]);
}