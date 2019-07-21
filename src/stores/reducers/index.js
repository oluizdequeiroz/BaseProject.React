const initialState = {};

export default function genericReducer(state = initialState, action) {
    switch (action.type) {
        case 'set_value':
            const value = {};
            value[action.payload.key] = action.payload.value;
            return { ...state, ...value };
        case 'clear_values':
            return initialState;
        default:
            return state;
    }
}