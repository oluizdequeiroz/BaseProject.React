import { put } from 'redux-saga/effects';
// import swal from 'sweetalert2';

const API = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_API_DEVELOP : process.env.REACT_APP_API_PRODUCT;

export default function* _fetch({ request }) {
    const { endpoint, returnReduceKey, param = '', method = 'GET', withProccess = false, msgProccess, withSuccessedAlert = false, msgSuccessedAlert, withWarningAlert = true, msgWarningAlert, withFailedAlert = true, msgFailedAlert = 'Tente revalidar a sessão para continuar usando o sistema.', withErrorAlert = true, msgErrorAlert = 'Erro interno no serviço.' } = request;

    try {
        const url = `${API}/${endpoint}`;
        var params = {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('session') !== null ? JSON.parse(sessionStorage.getItem('session')).token : ''}`
            },
            mode: 'no-cors'
        };
        if (method === 'POST' || method === 'PUT') params = { ...params, body: JSON.stringify(param) };

        const response = yield fetch(url, params);
        let json = null;

        if (withProccess) yield put({ type: 'set_value', payload: { key: 'loading', value: { in: true, text: msgProccess } } });

        if (response.ok) {
            if (response.status === 200)
                json = yield response.json();
        } else {
            if (response.status === 401) {
                // se houver alguma consulta na página inicial após entrar no sistema /// TODO
                if (window.location.hash === '') {
                    sessionStorage.clear();
                    yield put({ type: 'clear_values' });
                }

                if (withFailedAlert) yield put({ type: 'set_value', payload: { key: 'sweetalert', value: { title: 'Sessão inválida para a operação ou expirada!', message: msgFailedAlert, type: 'info' } } });

                window.location.hash = '/';

                json = {};
            } else {
                throw new Error(JSON.stringify(response));
            }
        }

        yield put({ type: 'set_value', payload: { key: returnReduceKey, value: json } });
        if (json.status < 0) {
            if (withWarningAlert) yield put({ type: 'set_value', payload: { key: 'sweetalert', value: { title: json.message, message: msgWarningAlert, type: 'warning' } } });

            console.error(json.message);
        } else {

            if (withSuccessedAlert) yield put({ type: 'set_value', payload: { key: 'sweetalert', value: { title: json.message, message: msgSuccessedAlert, type: 'success' } } });
        }

        if (withProccess)
            yield put({ type: 'set_value', payload: { key: 'loading', value: { in: false, text: '' } } });
    } catch (error) {
        yield put({ type: 'set_value', payload: { key: returnReduceKey } });

        if (withErrorAlert) yield put({ type: 'set_value', payload: { key: 'sweetalert', value: { title: msgErrorAlert, message: `Entre em contato com o suporte. (${error})`, type: 'error' } } });
        if (withProccess) yield put({ type: 'set_value', payload: { key: 'loading', value: { in: false, text: '' } } });
    }
};