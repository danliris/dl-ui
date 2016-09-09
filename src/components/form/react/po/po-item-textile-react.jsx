import React from 'react';
 
import PoItemReact from './po-item-react.jsx';
import TextileAutoSuggestReact from '../auto-suggests/textile-auto-suggest-react.jsx'; 

'use strict';

export default class PoItemTextileReact extends React.Component {
    constructor(props) {
        super(props);

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);

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
        value.defaultMeasurement = product.uom.unit;
        this.handleValueChange(value);
    }

    componentWillMount() {
        this.setState({ value: this.props.value || '', options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value, options: this.props.options || {} });
    }

    render() {
        return (
            <PoItemReact value={this.state.value} error={this.props.error} onChange={this.handleValueChange} options={this.state.options} >
                <TextileAutoSuggestReact value={this.state.value.product} onChange={this.handleProductChange} options={this.state.options} />
            </PoItemReact>
        )
    }
} 