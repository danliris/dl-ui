import React from 'react';

import DoItemReact from './do-item-react.jsx';
import POTextileAutoSuggestReact from '../auto-suggests/po-textile-auto-suggest-react.jsx';

'use strict';

export default class DoItemTextileReact extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handlePOTextileChange = this.handlePOTextileChange.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handlePOTextileChange(event, poTextile) {
        var value = this.state.value;
        Object.assign(value, poTextile);
        this.handleValueChange(value);
    }

    init(props) {
        var value = Object.assign({}, DoItemReact.defaultProps.value, props.value);
        var error = Object.assign({}, DoItemReact.defaultProps.error, props.error);
        var options = Object.assign({}, DoItemReact.defaultProps.options, props.options);

        this.setState({ value: value, error: error, options: options });
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    render() {
        return (
            <DoItemReact value={this.state.value} error={this.state.error} options={this.state.options} onChange={this.handleValueChange}>
                <POTextileAutoSuggestReact value={this.state.value} options={this.state.options} onChange={this.handlePOTextileChange} />
            </DoItemReact>
        )
    }
}

DoItemTextileReact.propTypes = {
    value: React.PropTypes.object,
    error: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.string]),
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool
    })
};

DoItemTextileReact.defaultProps = {
    value: {},
    error: {},
    options: {
        readOnly: false,
    }
};
