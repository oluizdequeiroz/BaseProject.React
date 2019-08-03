import React from 'react';
import { Popover } from 'reactstrap';

export default ({ input, type, placeholder, meta: { touched, error, warning }, list, popoverPosition, children }) => {
    const inputProps = { type, placeholder, list };

    input.id = input.name;

    const theInput =
        type === "textarea" ? <textarea className="form-control" {...input} {...inputProps}></textarea>
            : (type === "select" ? <select className="form-control" {...input} {...inputProps}>
                <option value="">-- {placeholder} --</option>
                {children}
            </select>
                : <input className="form-control" {...input} {...inputProps} />);

    return (
        <div className={type === "textarea" ? 'container-fluid' : 'form-group'}>
            {theInput}
            {<Popover placement={popoverPosition || 'right'} target={input.id} isOpen={touched && error}>
                <div style={{ padding: 10 }}>
                    <span className="h6 text-danger">{error || warning}</span>
                </div>
            </Popover>}
        </div>
    );
};