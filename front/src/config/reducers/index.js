const initialState = {};

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
        default:
            return state;
    }
}