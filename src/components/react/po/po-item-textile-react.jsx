import React from 'react';

import PoItemReact from './po-item-react.jsx';
import TextileAutoSuggestReact from '../auto-suggests/textile-auto-suggest-react.jsx';

'use strict';

export default class PoItemTextileReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleValueChange(value) {
        this.setState({ value: value });
        if (this.props.onChange)
            this.props.onChange(value);
    }

    handleProductChange(event, product) {
        var value = this.state.value;
        value.product = product;
        value.defaultMeasurement = product.uom;
        this.handleValueChange(value);
    }

    handleRemove(value) {
        if (this.props.onRemove)
            this.props.onRemove(value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || {}, error: this.props.error || {}, options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || {}, error: props.error || {}, options: props.options || {} });
    }

    render() {
        var readOnlyOptions = { readOnly: this.state.options.readOnly || this.state.options.isSplit };
        return (
            <PoItemReact value={this.state.value} error={this.props.error} options={this.state.options} onChange={this.handleValueChange} onRemove={this.handleRemove}>
                <TextileAutoSuggestReact value={this.state.value.product} options={readOnlyOptions} onChange={this.handleProductChange}/>
            </PoItemReact>
        )
    }
} 