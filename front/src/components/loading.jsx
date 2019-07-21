import React from 'react';
import { bindDefault } from '../stores/binders';
export default bindDefault('loading')(
    props => (
        <span className={`fade ${props.loading && (props.loading.in && 'in')}`}>
            <i className='fa fa-cog fa-spin fa-fw' /> <i className='h6'>{props.loading && props.loading.text}</i>
        </span>
    )
);