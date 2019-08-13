import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

const selects = (reducerKeys, form, ...formValues) => state => {
    let reducers = {
        formValues: form && formValueSelector(form)(state, formValues)
    };
    reducerKeys.forEach(key => reducers[key] = state.reducers[key]);
    return reducers;
};

export function bindDefault(...reducerKeys) {
    const selectDispatch = dispatch => bindActionCreators({ ...Actions }, dispatch);
    return (formComponent) => connect(selects(reducerKeys), selectDispatch)(formComponent);
}

export function bindWithActions(...reducerKeys) {
    return (...actions) => {
        const selectDispatch = dispatch => bindActionCreators({ ...Actions, ...actions }, dispatch);
        return (formComponent) => connect(selects(reducerKeys), selectDispatch)(formComponent);
    }
}

export function bindReduxForm(...reducerKeys) {
    return (...actions) => {
        let _actions = {};
        actions.forEach(action => _actions[JSON.stringify(_actions) === "{}" ? 'onSubmit' : action.name] = action);
        _actions = { ..._actions, ...Actions };
        const selectDispatch = dispatch => bindActionCreators(_actions, dispatch);

        return (validate = undefined, warns = undefined) => {
            return (formComponent, ...formValues) => {
                const form = `${formComponent.name.toLowerCase()}Form`;

                const createReduxForm = reduxForm({
                    form,
                    validate,
                    warns
                });

                formComponent = createReduxForm(formComponent);
                return connect(selects(reducerKeys, form, formValues), selectDispatch)(formComponent);
            };
        };
    }
}