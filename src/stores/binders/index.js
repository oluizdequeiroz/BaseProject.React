import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

export function bindDefault(...reducerKeys) {
    const selectState = state => {
        let reducers = {};
        reducerKeys.forEach(key => reducers[key] = state.reducers[key]);
        return reducers;
    };

    const selectDispatch = dispatch => bindActionCreators({ ...Actions }, dispatch);

    return (formComponent) => connect(selectState, selectDispatch)(formComponent);
}

export function bindReduxForm(...reducerKeys) {
    const selectState = state => {
        let reducers = {};
        reducerKeys.forEach(key => reducers[key] = state.reducers.reducerKeys[key]);
        return reducers;
    };

    return (...actions) => {
        let _actions = {};
        actions.forEach(action => _actions[JSON.stringify(_actions) === "{}" ? 'onSubmit' : action.name] = action);
        _actions = { ..._actions, ...Actions };
        const selectDispatch = dispatch => bindActionCreators(_actions, dispatch);

        return (validate = undefined, warns = undefined) => {
            return (formComponent) => {
                const form = `${formComponent.name.toLowerCase()}Form`;

                const createReduxForm = reduxForm({
                    form,
                    validate,
                    warns
                });

                formComponent = createReduxForm(formComponent);
                return connect(selectState, selectDispatch)(formComponent);
            };
        };
    }
}