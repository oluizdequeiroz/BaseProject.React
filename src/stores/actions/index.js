const request = (method, endpoint, returnReduceKey, param, { withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) => ({
    type: 'request',
    request: {
        method,
        endpoint,
        returnReduceKey,
        param,
        withProccess,
        msgProccess,
        withSuccessedAlert,
        msgSuccessedAlert,
        withWarningAlert,
        msgWarningAlert,
        withFailedAlert,
        msgFailedAlert,
        withErrorAlert,
        msgErrorAlert
    }
});

export function post(endpoint, returnReduceKey, param, configurations) {
    return request('POST', endpoint, returnReduceKey, param, configurations)
}

export function put(endpoint, returnReduceKey, param, configurations) {
    return request('PUT', endpoint, returnReduceKey, param, configurations)
}

export function get(endpoint, returnReduceKey, configurations) {
    return request('GET', endpoint, returnReduceKey, undefined, configurations)
}

export function del(endpoint, returnReduceKey, configurations) {
    return request('DELETE', endpoint, returnReduceKey, undefined, configurations)
}

export function setValue(key, value) {
    return {
        type: 'set_value',
        payload: { key, value }
    };
}

export function clearValues() {
    return { type: 'clear_values' };
}