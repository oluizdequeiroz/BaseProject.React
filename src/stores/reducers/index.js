const initialState = {
    sweetalert: {
        show: false
    }
};

export default function genericReducer(state = initialState, action) {
    switch (action.type) {
        case 'set_value':
            const values = {};
            values[action.payload.key] = action.payload.value;
            if (action.payload.treatment) {
                values[action.payload.key] = action.payload.treatment(action.payload.value, state, action);
            }
            return { ...state, ...values };
        case 'clear_values':
            return initialState;
        case 'fetch_process':
            return process(state, action);
        case 'fetch_failed':
            return failed(state, action);
        case 'fetch_success':
            return success(state, action);
        default:
            return state;
    }
}

function process(state, action) {

    const titleProcess = (action.payload && action.payload.titleProcess) || "Em processamento...";
    const messageProcess = (action.payload && action.payload.messageProcess) || "Aguarde, sistema em processamento.";

    return {
        ...state,
        sweetalert: swal(action.payload, titleProcess, messageProcess, 'info')
    };
}

function failed(state, action) {

    const titleFailed = (action.payload && action.payload.titleFailed) || "Falha!";
    const messageFailed = (action.payload && action.payload.messageFailed) || "Falha no processamento.";

    return {
        ...state,
        sweetalert: swal(action.payload, titleFailed, messageFailed, 'error')
    };
}

function success(state, action) {

    const titleSuccess = (action.payload && action.payload.titleSuccess) || "Sucesso!";
    const messageSuccess = (action.payload && action.payload.messageSuccess) || "Sucesso no processamento.";

    return {
        ...state,
        sweetalert: swal(action.payload, titleSuccess, messageSuccess, 'success')
    };
}

function swal(payload, title, message, type) {
    return { show: payload ? true : false, title, message, type };
}