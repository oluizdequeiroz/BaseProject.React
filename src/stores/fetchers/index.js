import { put } from 'redux-saga/effects';

const API = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_API_DEVELOP : process.env.REACT_APP_API_PRODUCT;

export default function* _fetch(endpoint,
    returnReduceKey,
    parametros = {},
    treatment,
    config,
    callback) {

    try {
        const url = `${API}/${endpoint}`;
        const data = yield fetch(url, parametros);
        const jsonData = yield data.json();
        if (data.status < 200 || data.status >= 300) {
            console.log(jsonData);
            if (jsonData !== null && typeof jsonData === 'object' && jsonData.StackTraceString && jsonData.Message && jsonData.Message !== 'Unexpected end of JSON input') {
                const err = jsonData;

                yield put({ type: 'fetch_failed', payload: err });
            }

            throw new Error(JSON.stringify(jsonData));
        }

        yield put({ type: 'set_value', payload: { key: returnReduceKey, value: jsonData, treatment } });
        yield put({ type: 'fetch_success', payload: config });
        if (callback) {
            yield put(callback);
        }
    } catch (error) {

        yield put({ type: 'fetch_failed', payload: error });
    }
}