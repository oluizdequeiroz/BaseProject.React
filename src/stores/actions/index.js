export function setValue(key, value) {
    return {
        type: 'set_value',
        payload: { key, value }
    };
}

export function clearValues() {
    return { type: 'clear_values' };
}

const request = (method, /*api, */endpoint, returnReduceKey, param, treatment, config = {}, callback) => (
    [
        { type: 'fetch_process', payload: config },
        {
            type: 'request',
            request: {
                method,
                // api,
                endpoint,
                returnReduceKey,
                param,
                treatment
            },
            config,
            callback
        }
    ]);

export function post(/*api, */endpoint, returnReduceKey, { param, treatment, config, callback } = {}) {
    return request('POST', /*api, */endpoint, returnReduceKey, param, treatment, config, callback)
}

export function put(/*api, */endpoint, returnReduceKey, { param, treatment, config, callback } = {}) {
    return request('PUT', /*api, */endpoint, returnReduceKey, param, treatment, config, callback)
}

export function get(/*api, */endpoint, returnReduceKey, { treatment, config, callback } = {}) {
    return request('GET', /*api, */endpoint, returnReduceKey, undefined, treatment, config, callback)
}

export function del(/*api, */endpoint, returnReduceKey, { treatment, config, callback } = {}) {
    return request('DELETE', /*api, */endpoint, returnReduceKey, undefined, treatment, config, callback)
}

export function dispatch({ type, payload }) {
    return { type, payload };
}