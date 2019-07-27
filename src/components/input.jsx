import React, { Component } from 'react';

const labelStyleError = {
    float: 'right'
};

const inputStyleError = {
    borderBottom: 'solid 3px red',
    borderRadius: '4px'
};

class Input extends Component {

    render() {

        const { input, type, placeholder, meta: { touched, error, warning }, list } = this.props;
        const inputProps = { type, placeholder, list };

        input.style = touched && error ? inputStyleError : undefined;

        const theInput = type === "textarea" ? <textarea className="form-control" {...input} {...inputProps}></textarea> : <input className="form-control" {...input} {...inputProps} />;

        return (
            <div className="form-group">
                {theInput}
                {touched && ((
                    error && <div className="h6 text-danger" style={labelStyleError}>{error}</div>
                ) || (
                    warning && <div className="h6 text-warning" style={labelStyleError}>{warning}</div>
                ))}
            </div>
        );
    }
}

export default Input;