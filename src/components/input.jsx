import React, { Component } from 'react';

const labelStyleError = {
    position: 'absolute',
    top: -25
};

const inputStyleError = {
    border: 'solid 1px red', 
    borderRadius: '4px'
};

class Input extends Component {

    render() {

        const { input, label, type, placeholder, meta: { touched, error, warning }, list } = this.props;
        const inputProps = { type, placeholder, list };
        const divInputProps = label ? {
            className: `input-group`
        } : undefined;

        input.style = touched && error ? inputStyleError : undefined;

        const theInput = type === "textarea" ? <textarea className="form-control" {...input} {...inputProps}></textarea> : <input className="form-control" {...input} {...inputProps} />;

        return (
            <div className="form-group">
                {touched && ((
                    error && <div className="h6 text-danger" style={labelStyleError}>{error}</div>
                ) || (
                    warning && <div className="h6 text-warning" style={labelStyleError}>{warning}</div>
                ))}
                <div {...divInputProps}>
                    {label && <label className="input-group-addon">{label}</label>}
                    {theInput}
                </div>
            </div>
        );
    }
}

export default Input;